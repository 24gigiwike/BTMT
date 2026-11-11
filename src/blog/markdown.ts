import { safeHttpUrl } from './urls';

export type MdInline =
  | { type: 'text'; text: string }
  | { type: 'strong'; text: string }
  | { type: 'em'; text: string }
  | { type: 'link'; text: string; href: string };

export type MdBlock =
  | { type: 'heading'; level: 2 | 3 | 4; inlines: MdInline[] }
  | { type: 'paragraph'; inlines: MdInline[] }
  | { type: 'ul'; items: MdInline[][] }
  | { type: 'ol'; items: MdInline[][] }
  | { type: 'quote'; inlines: MdInline[] };

export function parseMarkdown(source: string): MdBlock[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: MdBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }
    if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
      index += 1;
      continue;
    }
    if (line.trim().startsWith('```')) {
      index += 1;
      const inner: string[] = [];
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        inner.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      const text = inner.join(' ').trim();
      if (text) blocks.push({ type: 'paragraph', inlines: parseInlines(text) });
      continue;
    }
    if (/^!\[[^\]]*\]\([^)]+\)\s*$/.test(line.trim())) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      const rawLevel = heading[1].length;
      const level: 2 | 3 | 4 = rawLevel <= 2 ? 2 : rawLevel === 3 ? 3 : 4;
      blocks.push({ type: 'heading', level, inlines: parseInlines(heading[2]) });
      index += 1;
      continue;
    }

    if (line.trim().startsWith('>')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quote.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push({ type: 'quote', inlines: parseInlines(quote.join(' ')) });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const list = collectList(lines, index, 'ul');
      blocks.push({ type: 'ul', items: list.items });
      index = list.next === index ? index + 1 : list.next;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const list = collectList(lines, index, 'ol');
      blocks.push({ type: 'ol', items: list.items });
      index = list.next === index ? index + 1 : list.next;
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !lines[index].trim().startsWith('>') &&
      !/^[-*]\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index]) &&
      !lines[index].trim().startsWith('```')
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'paragraph', inlines: parseInlines(paragraph.join(' ')) });
  }

  return blocks;
}

function collectList(lines: string[], start: number, kind: 'ul' | 'ol'): { items: MdInline[][]; next: number } {
  const items: string[] = [];
  let index = start;
  const pattern = kind === 'ul' ? /^[-*]\s+(.+)$/ : /^\d+\.\s+(.+)$/;
  while (index < lines.length) {
    const match = pattern.exec(lines[index]);
    if (match) {
      items.push(match[1].trim());
      index += 1;
      continue;
    }
    if (items.length && /^\s+\S/.test(lines[index]) && !lines[index].trim().startsWith('#')) {
      items[items.length - 1] += ` ${lines[index].trim()}`;
      index += 1;
      continue;
    }
    break;
  }
  return { items: items.map((item) => parseInlines(item)), next: index };
}

export function parseInlines(input: string): MdInline[] {
  const text = input.replace(/<[^>]+>/g, '').replace(/!\[[^\]]*\]\([^)]+\)/g, '');
  const nodes: MdInline[] = [];
  let buffer = '';

  const pushText = () => {
    if (!buffer) return;
    nodes.push({ type: 'text', text: buffer });
    buffer = '';
  };

  for (let i = 0; i < text.length; i += 1) {
    if (text.startsWith('**', i) || text.startsWith('__', i)) {
      const marker = text.slice(i, i + 2);
      const end = text.indexOf(marker, i + 2);
      if (end !== -1) {
        pushText();
        nodes.push({ type: 'strong', text: text.slice(i + 2, end) });
        i = end + 1;
        continue;
      }
    }

    if (text[i] === '*' || (text[i] === '_' && (i === 0 || /\s/.test(text[i - 1])))) {
      const marker = text[i];
      const end = text.indexOf(marker, i + 1);
      const next = text[end + 1] || '';
      if (end > i + 1 && (marker === '*' || next === '' || /[\s.,;:!?)\]"']/.test(next))) {
        pushText();
        nodes.push({ type: 'em', text: text.slice(i + 1, end) });
        i = end;
        continue;
      }
    }

    if (text[i] === '[') {
      const labelEnd = text.indexOf(']', i + 1);
      if (labelEnd !== -1 && text[labelEnd + 1] === '(') {
        const hrefEnd = text.indexOf(')', labelEnd + 2);
        if (hrefEnd !== -1) {
          const label = text.slice(i + 1, labelEnd);
          const href = safeHttpUrl(text.slice(labelEnd + 2, hrefEnd));
          pushText();
          if (href) nodes.push({ type: 'link', text: label, href });
          else nodes.push({ type: 'text', text: label });
          i = hrefEnd;
          continue;
        }
      }
    }

    buffer += text[i];
  }

  pushText();
  return nodes;
}

export function renderMarkdownHtml(source: string): string {
  return parseMarkdown(source).map(renderBlock).join('');
}

function renderBlock(block: MdBlock): string {
  switch (block.type) {
    case 'heading':
      return `<h${block.level}>${renderInlines(block.inlines)}</h${block.level}>`;
    case 'paragraph':
      return `<p>${renderInlines(block.inlines)}</p>`;
    case 'ul':
      return `<ul>${block.items.map((item) => `<li>${renderInlines(item)}</li>`).join('')}</ul>`;
    case 'ol':
      return `<ol>${block.items.map((item) => `<li>${renderInlines(item)}</li>`).join('')}</ol>`;
    case 'quote':
      return `<blockquote>${renderInlines(block.inlines)}</blockquote>`;
    default:
      return '';
  }
}

function renderInlines(inlines: MdInline[]): string {
  return inlines.map((inline) => {
    if (inline.type === 'strong') return `<strong>${escapeHtml(inline.text)}</strong>`;
    if (inline.type === 'em') return `<em>${escapeHtml(inline.text)}</em>`;
    if (inline.type === 'link') {
      const external = /^https?:\/\//i.test(inline.href);
      const rel = external ? ' rel="noopener noreferrer"' : '';
      const target = external ? ' target="_blank"' : '';
      return `<a href="${escapeHtml(inline.href)}"${target}${rel}>${escapeHtml(inline.text)}</a>`;
    }
    return escapeHtml(inline.text);
  }).join('');
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
