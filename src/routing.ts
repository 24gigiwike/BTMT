export interface LocationState {
  pathname: string;
  search: string;
  legacyHash: boolean;
}

export function readLocation(): LocationState {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '', legacyHash: false };
  }

  const pathname = window.location.pathname || '/';
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('/') && (pathname === '/' || pathname === '')) {
    const queryAt = hash.indexOf('?');
    return {
      pathname: queryAt === -1 ? hash : hash.slice(0, queryAt),
      search: queryAt === -1 ? '' : hash.slice(queryAt),
      legacyHash: true
    };
  }

  return {
    pathname,
    search: window.location.search || '',
    legacyHash: false
  };
}

export function matchRoute(pathname: string): { route: string; params: Record<string, string> } {
  const path = normalizePath(pathname);
  const params: Record<string, string> = {};

  if (path.startsWith('/services/') && path !== '/services') {
    params.slug = decodePathPart(path.slice('/services/'.length));
    return { route: '/services/:slug', params };
  }
  if (path.startsWith('/marketplace/') && path !== '/marketplace') {
    params.slug = decodePathPart(path.slice('/marketplace/'.length));
    return { route: '/marketplace/:slug', params };
  }
  if (path.startsWith('/blog/tag/')) {
    params.tag = decodePathPart(path.slice('/blog/tag/'.length));
    return { route: '/blog/tag/:tag', params };
  }
  if (path.startsWith('/blog/category/')) {
    params.category = decodePathPart(path.slice('/blog/category/'.length));
    return { route: '/blog/category/:category', params };
  }
  if (path.startsWith('/blog/') && path !== '/blog') {
    params.slug = decodePathPart(path.slice('/blog/'.length));
    return { route: '/blog/:slug', params };
  }

  return { route: path, params };
}

export function buildHref(path: string, params: Record<string, string> = {}): string {
  let resolved = path;
  if (resolved.includes(':slug') && params.slug) {
    resolved = resolved.replace(':slug', encodeURIComponent(params.slug));
  }
  if (resolved.includes(':tag') && params.tag) {
    resolved = resolved.replace(':tag', encodeURIComponent(params.tag));
  }
  if (resolved.includes(':category') && params.category) {
    resolved = resolved.replace(':category', encodeURIComponent(params.category));
  }

  const query = Object.entries(params).filter(
    ([key, value]) => !['slug', 'tag', 'category'].includes(key) && value
  );
  if (!query.length) return resolved;
  const search = query
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return `${resolved}?${search}`;
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const withSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withSlash.replace(/\/+$/, '') || '/';
}

function decodePathPart(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
