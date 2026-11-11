import type { BlogPost } from '../types';

export function blogSearchText(post: BlogPost): string {
  return [
    post.title,
    post.excerpt,
    post.author,
    post.authorRole,
    post.category,
    post.focusKeyword,
    ...post.tags,
    ...post.keywords,
    ...(post.seoKeywords || [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function relatedPosts(post: BlogPost, posts: BlogPost[]): BlogPost[] {
  return posts
    .filter((candidate) => candidate.isPublished && candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) =>
        post.tags.some((current) => current.toLowerCase() === tag.toLowerCase())
      ).length;
      const score = (candidate.category === post.category ? 3 : 0) + sharedTags;
      return { candidate, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score || (b.candidate.publishedAt || '').localeCompare(a.candidate.publishedAt || '')
    )
    .slice(0, 2)
    .map((item) => item.candidate);
}

export function schemaKeywords(post: BlogPost): string[] {
  const seen = new Set<string>();
  const keywords: string[] = [];
  for (const value of [post.focusKeyword, ...post.keywords, ...(post.seoKeywords || []), ...post.tags]) {
    const trimmed = value?.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    keywords.push(trimmed);
  }
  return keywords;
}
