export const BLOG_CATEGORIES = [
  'Technology',
  'Business Growth',
  'Branding',
  'Digital Marketing',
  'Media',
  'Entertainment',
  'Company News'
] as const;

export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function categoryPath(category: string): string {
  return `/blog/category/${slugify(category)}`;
}

export function tagPath(tag: string): string {
  return `/blog/tag/${slugify(tag)}`;
}

export function categoryLabel(slug: string, categories: string[]): string {
  const known = BLOG_CATEGORIES.find((category) => slugify(category) === slug);
  if (known) return known;
  return categories.find((category) => slugify(category) === slug) || slug.replace(/-/g, ' ');
}

export function tagLabel(slug: string, tags: string[]): string {
  return tags.find((tag) => slugify(tag) === slug) || slug.replace(/-/g, ' ');
}

export function formatBlogDate(value?: string): string {
  if (!value) return '';
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return value;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function readingTime(markdown: string): string {
  const words = markdown
    .replace(/[#>*_[\]()`-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
