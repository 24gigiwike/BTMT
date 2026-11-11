import { useEffect } from 'react';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_DESCRIPTION,
  DEFAULT_TITLE,
  DEFAULT_TWITTER_DESCRIPTION,
  DEFAULT_TWITTER_TITLE,
  SITE_NAME,
  absoluteUrl
} from '../blog/urls';

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  ogDescription?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown> | null;
}

const PUBLIC_ROUTES = new Set([
  '/',
  '/about',
  '/services',
  '/book-service',
  '/marketplace',
  '/community',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/refund-policy'
]);

export function isPublicRoute(route: string): boolean {
  if (PUBLIC_ROUTES.has(route)) return true;
  return route === '/services/:slug' || route === '/marketplace/:slug';
}

export function applyDocumentMeta(meta: PageMeta): void {
  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setMeta('name', 'robots', meta.robots);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.ogDescription || meta.description);
  setMeta('property', 'og:type', meta.type || 'website');
  setMeta('property', 'og:url', meta.canonical);
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:locale', 'en_NG');
  setMeta('property', 'og:image', meta.image);
  setMeta('property', 'og:image:alt', meta.image ? meta.imageAlt || meta.title : undefined);
  setMeta('property', 'article:published_time', meta.publishedTime);
  setMeta('property', 'article:modified_time', meta.modifiedTime);
  setMeta('property', 'article:author', meta.author);
  setMeta('name', 'twitter:card', meta.image ? 'summary_large_image' : 'summary');
  setMeta('name', 'twitter:title', meta.twitterTitle || meta.title);
  setMeta('name', 'twitter:description', meta.twitterDescription || meta.description);
  setMeta('name', 'twitter:image', meta.image);
  setMeta('name', 'twitter:image:alt', meta.image ? meta.imageAlt || meta.title : undefined);
  setCanonical(meta.canonical);
  setJsonLd(meta.jsonLd);
}

export function applyDefaultDocumentMeta(route: string): void {
  const path = typeof window === 'undefined' ? '/' : window.location.pathname || '/';
  applyDocumentMeta({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    ogDescription: DEFAULT_OG_DESCRIPTION,
    twitterTitle: DEFAULT_TWITTER_TITLE,
    twitterDescription: DEFAULT_TWITTER_DESCRIPTION,
    canonical: absoluteUrl(path),
    robots: isPublicRoute(route) ? 'index, follow' : 'noindex, nofollow',
    type: 'website',
    jsonLd: null
  });
}

export function useSiteRouteMeta(route: string, routeKey: string): void {
  useEffect(() => {
    if (route === '/blog' || route.startsWith('/blog/')) return;
    applyDefaultDocumentMeta(route);
  }, [route, routeKey]);
}

function setMeta(attribute: 'name' | 'property', key: string, content?: string): void {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!content) {
    if (element?.dataset.btmt === 'true') element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    element.dataset.btmt = 'true';
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(href: string): void {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

function setJsonLd(data?: Record<string, unknown> | null): void {
  const existing = document.getElementById('btmt-page-schema');
  if (!data) {
    existing?.remove();
    return;
  }
  const script = existing || document.createElement('script');
  script.id = 'btmt-page-schema';
  (script as HTMLScriptElement).type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
}
