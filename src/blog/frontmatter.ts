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
      const block = blockScalarStyle(rest);
      if (block) {
        result[key] = parseBlockScalar(indent, block);
      } else if (!rest) {
        const upcoming = nextContent(index);
        if (!upcoming || upcoming.indent <= indent) {
          result[key] = '';
        } else if (lines[upcoming.index].trim().startsWith('- ')) {
          result[key] = parseList(upcoming.indent);
        } else {
          result[key] = parseMap(upcoming.indent);
        }
      } else {
        result[key] = parseScalar(continueScalar(rest, indent));
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
        if (valueRest) item[key] = parseScalar(continueScalar(valueRest, indent));
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
      result.push(parseScalar(continueScalar(rest, indent)));
    }
    return result;
  };

  // Pages CMS folds long strings onto indented lines. Those lines belong to the
  // value that is already open; they are not a new field and not a nested map.
  const continueScalar = (first: string, parentIndent: number): string => {
    let value = first;
    const quoted = value.startsWith('"') || value.startsWith("'");
    const flow = value.startsWith('[');
    while (index < lines.length) {
      if (quoted && isClosedQuote(value)) break;
      if (flow && value.endsWith(']')) break;
      const next = lines[index];
      const trimmed = next.trim();
      if (!trimmed) {
        const upcoming = nextContent(index + 1);
        if (!upcoming || upcoming.indent <= parentIndent) break;
        index += 1;
        continue;
      }
      if (indentOf(next) <= parentIndent) break;
      index += 1;
      value = `${value} ${trimmed}`;
    }
    return value;
  };

  const parseBlockScalar = (parentIndent: number, style: string): string => {
    const collected: string[] = [];
    let contentIndent: number | null = null;
    while (index < lines.length) {
      const raw = lines[index];
      if (!raw.trim()) {
        const upcoming = nextContent(index + 1);
        if (!upcoming || upcoming.indent <= parentIndent) break;
        collected.push('');
        index += 1;
        continue;
      }
      const indent = indentOf(raw);
      if (indent <= parentIndent) break;
      if (contentIndent === null) contentIndent = indent;
      if (indent < contentIndent) break;
      collected.push(raw.slice(contentIndent));
      index += 1;
    }
    if (style.startsWith('>')) {
      const paragraphs: string[] = [];
      let current: string[] = [];
      for (const line of collected) {
        if (!line.trim()) {
          if (current.length) paragraphs.push(current.join(' '));
          current = [];
        } else {
          current.push(line.trim());
        }
      }
      if (current.length) paragraphs.push(current.join(' '));
      return paragraphs.join('\n');
    }
    return collected.join('\n').replace(/\s+$/, '');
  };

  return parseMap(0);
}

function blockScalarStyle(value: string): string | null {
  return /^[|>][+-]?$/.test(value) ? value : null;
}

function isClosedQuote(value: string): boolean {
  const quote = value[0];
  if (quote !== '"' && quote !== "'") return false;
  if (quote === '"') {
    for (let i = 1; i < value.length; i += 1) {
      if (value[i] === '\\') {
        i += 1;
        continue;
      }
      if (value[i] === '"') return i === value.length - 1;
    }
    return false;
  }
  for (let i = 1; i < value.length; i += 1) {
    if (value[i] !== "'") continue;
    if (value[i + 1] === "'") {
      i += 1;
      continue;
    }
    return i === value.length - 1;
  }
  return false;
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
