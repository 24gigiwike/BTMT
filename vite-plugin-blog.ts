import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';
import { escapeHtml, renderMarkdownHtml } from './src/blog/markdown';
import { loadBlogDirectory, publicBlogPosts } from './src/blog/loadPosts';
import { categoryPath, formatBlogDate, slugify, tagPath } from './src/blog/taxonomy';
import { schemaKeywords } from './src/blog/query';
import { SITE_NAME, SITE_ORIGIN, absoluteUrl, articleCanonical, articlePath } from './src/blog/urls';
import { INITIAL_PRODUCTS, INITIAL_SERVICES } from './src/data/initialData';
import type { BlogPost } from './src/types';

const VIRTUAL_ID = 'virtual:btmt-blog';
const RESOLVED_ID = '\0virtual:btmt-blog';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/book-service',
  '/marketplace',
  '/blog',
  '/community',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/refund-policy'
];

const BLOG_DESCRIPTION =
  'Explore practical insights, educational articles, industry developments and inspiring stories across technology, media, entertainment and business growth.';

export function btmtBlogPlugin(): Plugin {
  let root = process.cwd();
  let outDir = path.resolve(process.cwd(), 'dist');

  const contentDir = () => path.join(root, 'content', 'blog');
  const readAll = () => loadBlogDirectory(contentDir());
  const readPublic = () => publicBlogPosts(readAll());

  return {
    name: 'btmt-blog',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;
      const posts = readPublic();
      return `export const posts = ${JSON.stringify(posts)};`;
    },
    configureServer(server) {
      watchContent(server, contentDir());
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/sitemap.xml') {
          next();
          return;
        }
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.end(buildSitemap(readPublic()));
      });
    },
    writeBundle() {
      const all = readAll();
      const published = publicBlogPosts(all);
      const drafts = all.length - published.length;
      console.log(`[blog] ${published.length} published article(s), ${drafts} draft(s) excluded from the site.`);

      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemap(published));
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt());

      const indexPath = path.join(outDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const indexHtml = fs.readFileSync(indexPath, 'utf8');
      writeHtml(outDir, 'blog/index.html', blogIndexDocument(indexHtml, published));

      const categories = new Map<string, BlogPost[]>();
      const tags = new Map<string, { label: string; posts: BlogPost[] }>();
      for (const post of published) {
        const categorySlug = slugify(post.category);
        categories.set(categorySlug, [...(categories.get(categorySlug) || []), post]);
        for (const tag of post.tags) {
          const tagSlug = slugify(tag);
          if (!tagSlug) continue;
          const current = tags.get(tagSlug) || { label: tag, posts: [] };
          current.posts.push(post);
          tags.set(tagSlug, current);
        }
      }

      for (const [categorySlug, posts] of categories) {
        writeHtml(
          outDir,
          `blog/category/${categorySlug}/index.html`,
          collectionDocument(indexHtml, {
            title: `${posts[0].category} | BTMT Blog`,
            description: `Articles from Blissful Touch Media & Technology filed under ${posts[0].category}.`,
            canonicalPath: `/blog/category/${categorySlug}`,
            robots: 'index, follow',
            heading: posts[0].category,
            posts
          })
        );
      }

      for (const [tagSlug, entry] of tags) {
        writeHtml(
          outDir,
          `blog/tag/${tagSlug}/index.html`,
          collectionDocument(indexHtml, {
            title: `${entry.label} | BTMT Blog`,
            description: `Published BTMT articles tagged ${entry.label}.`,
            canonicalPath: `/blog/tag/${tagSlug}`,
            robots: 'noindex, follow',
            heading: entry.label,
            posts: entry.posts
          })
        );
      }

      for (const post of published) {
        writeHtml(outDir, `blog/${post.slug}/index.html`, articleDocument(indexHtml, post));
      }
    }
  };
}

function watchContent(server: ViteDevServer, directory: string): void {
  server.watcher.add(directory);
  const reload = (file: string) => {
    if (!file.replace(/\\/g, '/').includes('/content/blog/')) return;
    const module = server.moduleGraph.getModuleById(RESOLVED_ID);
    if (module) void server.reloadModule(module);
    else server.ws.send({ type: 'full-reload' });
  };
  server.watcher.on('add', reload);
  server.watcher.on('change', reload);
  server.watcher.on('unlink', reload);
}

function writeHtml(outDir: string, relativePath: string, html: string): void {
  const destination = path.join(outDir, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
}

function buildSitemap(posts: BlogPost[]): string {
  const urls = [
    ...STATIC_ROUTES.map((route) => absoluteUrl(route)),
    ...INITIAL_SERVICES.map((service) => absoluteUrl(`/services/${service.slug}`)),
    ...INITIAL_PRODUCTS.map((product) => absoluteUrl(`/marketplace/${product.slug}`)),
    ...categoryUrls(posts),
    ...posts.map((post) => absoluteUrl(articlePath(post.slug)))
  ];
  const lastmods = new Map(posts.map((post) => [absoluteUrl(articlePath(post.slug)), lastModified(post)]));
  const body = [...new Set(urls)]
    .map((loc) => {
      const lastmod = lastmods.get(loc);
      return `  <url><loc>${escapeHtml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function categoryUrls(posts: BlogPost[]): string[] {
  return [...new Set(posts.map((post) => slugify(post.category)).filter(Boolean))].map((slug) =>
    absoluteUrl(`/blog/category/${slug}`)
  );
}

function lastModified(post: BlogPost): string {
  const updated = post.updatedAt || '';
  const published = post.publishedAt || '';
  const value = updated > published ? updated : published;
  return /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : '';
}

function robotsTxt(): string {
  return `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /login\nDisallow: /dashboard\nDisallow: /cart\nDisallow: /checkout\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

function blogIndexDocument(indexHtml: string, posts: BlogPost[]): string {
  const links = posts
    .map(
      (post) =>
        `<li><a href="${escapeHtml(articlePath(post.slug))}">${escapeHtml(post.title)}</a></li>`
    )
    .join('');
  return injectDocument(indexHtml, {
    title: 'BTMT Blog | Insights, Stories and Ideas',
    description: BLOG_DESCRIPTION,
    canonical: absoluteUrl('/blog'),
    robots: 'index, follow',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'BTMT Blog',
      url: absoluteUrl('/blog'),
      description: BLOG_DESCRIPTION,
      publisher: publisher(),
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: absoluteUrl(articlePath(post.slug)),
        datePublished: post.publishedAt || undefined
      }))
    },
    extraHead: `<script>if(location.search.indexOf('q=')!==-1){var m=document.createElement('meta');m.name='robots';m.content='noindex, follow';document.head.appendChild(m);}</script>`,
    noscript: `<main style="max-width:42rem;margin:2rem auto;padding:0 1.25rem;font-family:Roboto,sans-serif;color:#242A35;"><h1>Insights, Stories and Ideas</h1><p>${escapeHtml(BLOG_DESCRIPTION)}</p><ul>${links}</ul></main>`
  });
}

function collectionDocument(
  indexHtml: string,
  page: { title: string; description: string; canonicalPath: string; robots: string; heading: string; posts: BlogPost[] }
): string {
  const links = page.posts
    .map((post) => `<li><a href="${escapeHtml(articlePath(post.slug))}">${escapeHtml(post.title)}</a></li>`)
    .join('');
  return injectDocument(indexHtml, {
    title: page.title,
    description: page.description,
    canonical: absoluteUrl(page.canonicalPath),
    robots: page.robots,
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: page.heading,
      description: page.description,
      url: absoluteUrl(page.canonicalPath),
      isPartOf: absoluteUrl('/blog')
    },
    noscript: `<main style="max-width:42rem;margin:2rem auto;padding:0 1.25rem;font-family:Roboto,sans-serif;color:#242A35;"><h1>${escapeHtml(page.heading)}</h1><ul>${links}</ul></main>`
  });
}

function articleDocument(indexHtml: string, post: BlogPost): string {
  const title = withBrand(post.seoTitle || post.title);
  const description = post.seoDescription || post.excerpt;
  const canonical = articleCanonical(post.slug, post.canonicalUrl);
  const image = post.imageUrl ? absoluteUrl(post.imageUrl) : undefined;
  const imageAlt = post.imageAlt || post.title;
  const modified = post.updatedAt || post.publishedAt;
  return injectDocument(indexHtml, {
    title,
    description,
    canonical,
    robots: 'index, follow',
    type: 'article',
    image,
    imageAlt,
    publishedTime: post.publishedAt,
    modifiedTime: modified,
    author: post.author,
    jsonLd: articleSchema(post, description, canonical, image, imageAlt),
    noscript: articleFallback(post, description)
  });
}

function articleSchema(
  post: BlogPost,
  description: string,
  canonical: string,
  image: string | undefined,
  imageAlt: string
): Record<string, unknown> {
  const keywords = schemaKeywords(post);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description,
        author: {
          '@type': /btmt/i.test(post.author) && !/michael/i.test(post.author) ? 'Organization' : 'Person',
          name: post.author
        },
        publisher: publisher(),
        datePublished: post.publishedAt || undefined,
        dateModified: post.updatedAt || post.publishedAt || undefined,
        image: image ? { '@type': 'ImageObject', url: image, caption: imageAlt } : undefined,
        articleSection: post.category,
        keywords: keywords.length ? keywords.join(', ') : undefined,
        mainEntityOfPage: canonical,
        url: canonical,
        inLanguage: 'en'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonical }
        ]
      }
    ]
  };
}

function articleFallback(post: BlogPost, description: string): string {
  const image = post.imageUrl
    ? `<img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.imageAlt || post.title)}" style="width:100%;height:auto;" />`
    : '';
  const tags = post.tags
    .map((tag) => `<a href="${escapeHtml(tagPath(tag))}">${escapeHtml(tag)}</a>`)
    .join(', ');
  return `<article style="max-width:42rem;margin:2rem auto;padding:0 1.25rem;font-family:Roboto,sans-serif;color:#242A35;line-height:1.7;">
    <p><a href="/blog">Blog</a> · <a href="${escapeHtml(categoryPath(post.category))}">${escapeHtml(post.category)}</a></p>
    <h1>${escapeHtml(post.title)}</h1>
    <p>By ${escapeHtml(post.author)}${post.publishedAt ? ` · ${escapeHtml(formatBlogDate(post.publishedAt))}` : ''}</p>
    ${image}
    <p>${escapeHtml(description)}</p>
    ${renderMarkdownHtml(post.content)}
    ${tags ? `<p>${tags}</p>` : ''}
  </article>`;
}

function publisher(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_ORIGIN
  };
}

function withBrand(title: string): string {
  if (/btmt|blissful touch/i.test(title)) return title;
  return `${title} | BTMT`;
}

interface DocumentParts {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  type: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown>;
  extraHead?: string;
  noscript: string;
}

function injectDocument(indexHtml: string, parts: DocumentParts): string {
  let html = indexHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(parts.title)}</title>`);
  html = replaceMeta(html, 'name', 'description', parts.description);
  html = replaceMeta(html, 'property', 'og:title', parts.title);
  html = replaceMeta(html, 'property', 'og:description', parts.description);
  html = replaceMeta(html, 'property', 'og:type', parts.type);
  html = replaceMeta(html, 'name', 'twitter:card', parts.image ? 'summary_large_image' : 'summary');
  html = replaceMeta(html, 'name', 'twitter:title', parts.title);
  html = replaceMeta(html, 'name', 'twitter:description', parts.description);

  const extra = [
    `<link rel="canonical" href="${escapeHtml(parts.canonical)}" />`,
    `<meta name="robots" content="${escapeHtml(parts.robots)}" />`,
    `<meta property="og:url" content="${escapeHtml(parts.canonical)}" />`,
    parts.image ? `<meta property="og:image" content="${escapeHtml(parts.image)}" />` : '',
    parts.image ? `<meta property="og:image:alt" content="${escapeHtml(parts.imageAlt || parts.title)}" />` : '',
    parts.image ? `<meta name="twitter:image" content="${escapeHtml(parts.image)}" />` : '',
    parts.publishedTime ? `<meta property="article:published_time" content="${escapeHtml(parts.publishedTime)}" />` : '',
    parts.modifiedTime ? `<meta property="article:modified_time" content="${escapeHtml(parts.modifiedTime)}" />` : '',
    parts.author ? `<meta property="article:author" content="${escapeHtml(parts.author)}" />` : '',
    parts.jsonLd
      ? `<script id="btmt-page-schema" type="application/ld+json">${safeJson(parts.jsonLd)}</script>`
      : '',
    parts.extraHead || ''
  ]
    .filter(Boolean)
    .join('\n    ');

  html = html.replace('</head>', `    ${extra}\n  </head>`);
  const noscript = `<noscript>${parts.noscript}</noscript>`;
  if (/<div id="root">\s*<\/div>/.test(html)) {
    return html.replace(/<div id="root">\s*<\/div>/, `<div id="root"></div>\n    ${noscript}`);
  }
  return html.replace('</body>', `    ${noscript}\n  </body>`);
}

function replaceMeta(html: string, attribute: 'name' | 'property', key: string, content: string): string {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\b[^>]*\\b${attribute}=["']${key}["'][^>]*>`, 'i');
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
