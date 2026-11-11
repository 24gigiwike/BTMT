export const SITE_ORIGIN = 'https://blissfultouch.ng';

export const SITE_NAME = 'Blissful Touch Media & Technology';

export const DEFAULT_TITLE =
  'Blissful Touch Media & Technology | Technology, Media & Entertainment';

export const DEFAULT_DESCRIPTION =
  'Building authentic visibility and promoting moral and ethical excellence. Professional website and software development, digital media, branding, and entertainment solutions in Nigeria.';

export const DEFAULT_OG_DESCRIPTION =
  'Building authentic visibility and promoting moral and ethical excellence across technology, media, and creative entertainment.';

export const DEFAULT_TWITTER_TITLE = 'Blissful Touch Media & Technology (BTMT)';

export const DEFAULT_TWITTER_DESCRIPTION =
  'Building authentic visibility and promoting moral and ethical excellence across technology, media, and entertainment.';

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_ORIGIN}${path}`;
}

export function safeHttpUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;
  if (/^mailto:[^\s]+$/i.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.toString();
  } catch {
    return null;
  }
  return null;
}

/** Keeps an editor-supplied canonical only when it is an http(s) URL. */
export function optionalCanonical(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return absoluteUrl(trimmed);
  try {
    const url = new URL(trimmed);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.toString();
  } catch {
    return '';
  }
  return '';
}

export function articlePath(slug: string): string {
  return `/blog/${slug}`;
}

export function articleCanonical(slug: string, customCanonical?: string): string {
  return customCanonical || absoluteUrl(articlePath(slug));
}
