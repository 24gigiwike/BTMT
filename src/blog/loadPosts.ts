import fs from 'node:fs';
import path from 'node:path';
import type { BlogPost } from '../types';
import { parseYaml, splitFrontmatter, type YamlValue } from './frontmatter';
import { readingTime } from './taxonomy';
import { optionalCanonical, safeHttpUrl } from './urls';

export function loadBlogDirectory(directory: string): BlogPost[] {
  if (!fs.existsSync(directory)) return [];
  const files = fs
    .readdirSync(directory)
    .filter((name) => name.endsWith('.md') && !name.startsWith('.') && name.toLowerCase() !== 'readme.md');

  const posts: BlogPost[] = [];
  const slugs = new Map<string, string>();

  for (const file of files) {
    const source = fs.readFileSync(path.join(directory, file), 'utf8');
    const post = postFromMarkdown(file, source);
    if (!post) continue;
    const previous = slugs.get(post.slug);
    if (previous) {
      throw new Error(`Duplicate blog slug "${post.slug}" in ${previous} and ${file}.`);
    }
    slugs.set(post.slug, file);
    posts.push(post);
  }

  return posts.sort((a, b) => {
    const byDate = (b.publishedAt || '').localeCompare(a.publishedAt || '');
    return byDate || a.title.localeCompare(b.title);
  });
}

export function publicBlogPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter((post) => post.isPublished && post.status === 'Published');
}

export function postFromMarkdown(filename: string, source: string): BlogPost | null {
  const { data, body } = splitFrontmatter(source);
  const record = data ? parseYaml(data) : {};
  const seo = asRecord(record.seo);
  const status = normalizeStatus(record.status, record.published);
  const title = asString(record.title);
  const slug = asString(record.slug) || filename.replace(/\.md$/, '');
  const fileLabel = filename;

  if (status === 'Published' && (!title || !asString(record.slug))) {
    throw new Error(`Published article ${fileLabel} needs both an article title and a URL slug.`);
  }
  if (!title || !slug) return null;

  const image = asImage(record.image ?? record.imageUrl);
  const keywords = asStringList(record.keywords);
  const seoKeywords = asStringList(seo.keywords);

  return {
    id: slug,
    slug,
    title,
    category: asString(record.category) || 'Company News',
    excerpt: asString(record.excerpt),
    content: body,
    author: asString(record.author) || 'BTMT Editorial Desk',
    authorRole: asString(record.authorRole),
    publishedAt: asDate(record.publishedAt),
    updatedAt: asDate(record.updatedAt) || undefined,
    readTime: asString(record.readTime) || readingTime(body),
    status,
    isPublished: status === 'Published',
    featured: asBoolean(record.featured),
    imageUrl: image.src || undefined,
    imageAlt: asString(seo.imageAlt) || image.alt || undefined,
    tags: asStringList(record.tags),
    keywords,
    seoTitle: asString(seo.title) || undefined,
    seoDescription: asString(seo.description) || undefined,
    focusKeyword: asString(seo.focusKeyword) || undefined,
    seoKeywords,
    canonicalUrl: optionalCanonical(asString(seo.canonical)) || undefined
  };
}

function normalizeStatus(status: YamlValue | undefined, publishedFlag: YamlValue | undefined): BlogPost['status'] {
  const raw = asString(status).toLowerCase();
  if (raw === 'published' || raw === 'publish') return 'Published';
  if (!raw && asBoolean(publishedFlag)) return 'Published';
  return 'Draft';
}

function asRecord(value: YamlValue | undefined): Record<string, YamlValue> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  return {};
}

function asString(value: YamlValue | undefined): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return '';
}

function asBoolean(value: YamlValue | undefined): boolean {
  return value === true || value === 'true';
}

function asStringList(value: YamlValue | undefined): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item as YamlValue)).filter(Boolean);
  }
  const single = asString(value);
  return single ? [single] : [];
}

function asDate(value: YamlValue | undefined): string {
  const raw = asString(value);
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(raw);
  return match ? match[1] : raw;
}

function asImage(value: YamlValue | undefined): { src: string; alt: string } {
  if (typeof value === 'string') {
    const src = safeHttpUrl(value) || '';
    return { src: src.startsWith('/') || /^https?:\/\//i.test(src) ? src : '', alt: '' };
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const src = safeHttpUrl(asString(value.src ?? value.url ?? value.path)) || '';
    return {
      src: src.startsWith('/') || /^https?:\/\//i.test(src) ? src : '',
      alt: asString(value.alt)
    };
  }
  return { src: '', alt: '' };
}
