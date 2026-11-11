export type YamlValue =
  | string
  | boolean
  | number
  | null
  | YamlValue[]
  | { [key: string]: YamlValue };

export function splitFrontmatter(source: string): { data: string; body: string } {
  const text = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  if (!text.startsWith('---')) return { data: '', body: text.trim() };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { data: '', body: text.trim() };
  const data = text.slice(text.startsWith('---\n') ? 4 : 3, end);
  let bodyStart = end + 4;
  if (text[bodyStart] === '\n') bodyStart += 1;
  return { data, body: text.slice(bodyStart).trim() };
}

export function parseYaml(source: string): Record<string, YamlValue> {
  const lines = source.replace(/\t/g, '  ').replace(/\r\n/g, '\n').split('\n');
  let index = 0;

  const indentOf = (line: string) => /^ */.exec(line)?.[0].length ?? 0;

  const nextContent = (from: number) => {
    for (let cursor = from; cursor < lines.length; cursor += 1) {
      const trimmed = lines[cursor].trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      return { index: cursor, indent: indentOf(lines[cursor]) };
    }
    return null;
  };

  const parseScalar = (raw: string): YamlValue => {
    const value = raw.trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      return unquote(value);
    }
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null' || value === '~' || value === '') return '';
    if (value.startsWith('[') && value.endsWith(']')) {
      return splitFlow(value.slice(1, -1)).map((part) => parseScalar(part));
    }
    return value;
  };

  const parseMap = (minIndent: number): Record<string, YamlValue> => {
    const result: Record<string, YamlValue> = {};
    while (index < lines.length) {
      const raw = lines[index];
      const trimmed = raw.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        index += 1;
        continue;
      }
      const indent = indentOf(raw);
      if (indent < minIndent || trimmed.startsWith('- ')) break;
      if (indent > minIndent) break;
      const colon = indexOfUnquotedColon(trimmed);
      if (colon === -1) break;
      const key = trimmed.slice(0, colon).trim();
      const rest = trimmed.slice(colon + 1).trim();
      index += 1;
      if (!rest || rest === '|' || rest === '>') {
        const upcoming = nextContent(index);
        if (!upcoming || upcoming.indent <= indent) {
          result[key] = '';
        } else if (lines[upcoming.index].trim().startsWith('- ')) {
          result[key] = parseList(upcoming.indent);
        } else {
          result[key] = parseMap(upcoming.indent);
        }
      } else {
        result[key] = parseScalar(rest);
      }
    }
    return result;
  };

  const parseList = (minIndent: number): YamlValue[] => {
    const result: YamlValue[] = [];
    while (index < lines.length) {
      const raw = lines[index];
      const trimmed = raw.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        index += 1;
        continue;
      }
      const indent = indentOf(raw);
      if (indent < minIndent || !trimmed.startsWith('- ')) break;
      if (indent > minIndent) break;
      const rest = trimmed.slice(2).trim();
      index += 1;
      if (!rest) {
        const upcoming = nextContent(index);
        if (!upcoming || upcoming.indent <= indent) result.push('');
        else if (lines[upcoming.index].trim().startsWith('- ')) result.push(parseList(upcoming.indent));
        else result.push(parseMap(upcoming.indent));
        continue;
      }
      const colon = indexOfUnquotedColon(rest);
      if (colon > 0 && !rest.startsWith('[') && !rest.startsWith('"') && !rest.startsWith("'")) {
        const key = rest.slice(0, colon).trim();
        const valueRest = rest.slice(colon + 1).trim();
        const item: Record<string, YamlValue> = {};
        if (valueRest) item[key] = parseScalar(valueRest);
        else {
          const upcoming = nextContent(index);
          if (!upcoming || upcoming.indent <= indent) item[key] = '';
          else if (lines[upcoming.index].trim().startsWith('- ')) item[key] = parseList(upcoming.indent);
          else item[key] = parseMap(upcoming.indent);
        }
        const nested = nextContent(index);
        if (nested && nested.indent > indent && !lines[nested.index].trim().startsWith('- ')) {
          Object.assign(item, parseMap(nested.indent));
        }
        result.push(item);
        continue;
      }
      result.push(parseScalar(rest));
    }
    return result;
  };

  return parseMap(0);
}

function unquote(value: string): string {
  const quote = value[0];
  const inner = value.slice(1, -1);
  if (quote === "'") return inner.replace(/''/g, "'");
  return inner.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

function indexOfUnquotedColon(input: string): number {
  let quote: string | null = null;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quote) {
      if (char === quote && input[i - 1] !== '\\') quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === ':') return i;
  }
  return -1;
}

function splitFlow(input: string): string[] {
  const parts: string[] = [];
  let current = '';
  let quote: string | null = null;
  for (const char of input) {
    if (quote) {
      current += char;
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === ',') {
      parts.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}
