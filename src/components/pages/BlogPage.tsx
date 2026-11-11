import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ChevronRight, Clock } from 'lucide-react';
import { SiteLink } from '../blog/SiteLink';
import { applyDocumentMeta } from '../../seo/documentMeta';
import { blogSearchText } from '../../blog/query';
import {
  BLOG_CATEGORIES,
  categoryLabel,
  categoryPath,
  formatBlogDate,
  slugify,
  tagLabel,
  tagPath
} from '../../blog/taxonomy';
import { SITE_NAME, SITE_ORIGIN, absoluteUrl } from '../../blog/urls';
import type { BlogPost } from '../../types';

const BLOG_DESCRIPTION =
  'Explore practical insights, educational articles, industry developments and inspiring stories across technology, media, entertainment and business growth.';

export const BlogPage: React.FC = () => {
  const { blogPosts, currentRoute, routeParams } = useApp();
  const routeKey = `${currentRoute}:${routeParams.tag || ''}:${routeParams.category || ''}`;
  const [searchQuery, setSearchQuery] = useState(routeParams.q || '');
  const skipSearchReset = useRef(true);

  useEffect(() => {
    if (skipSearchReset.current) {
      skipSearchReset.current = false;
      return;
    }
    setSearchQuery('');
  }, [routeKey]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (searchQuery) url.searchParams.set('q', searchQuery);
    else url.searchParams.delete('q');
    const next = `${url.pathname}${url.search}`;
    const current = `${window.location.pathname}${window.location.search}`;
    if (next !== current) window.history.replaceState(null, '', next);
  }, [searchQuery]);

  const publishedPosts = blogPosts.filter((post) => post.isPublished);
  const activeTag = currentRoute === '/blog/tag/:tag' ? routeParams.tag : '';
  const activeCategory = currentRoute === '/blog/category/:category' ? routeParams.category : '';
  const categoryName = activeCategory
    ? categoryLabel(activeCategory, publishedPosts.map((post) => post.category))
    : '';
  const tagName = activeTag ? tagLabel(activeTag, publishedPosts.flatMap((post) => post.tags)) : '';

  let filteredPosts = publishedPosts;
  if (activeCategory) {
    filteredPosts = filteredPosts.filter((post) => slugify(post.category) === activeCategory);
  }
  if (activeTag) {
    filteredPosts = filteredPosts.filter((post) => post.tags.some((tag) => slugify(tag) === activeTag));
  }
  const normalizedQuery = searchQuery.trim().toLowerCase();
  if (normalizedQuery) {
    filteredPosts = filteredPosts.filter((post) => blogSearchText(post).includes(normalizedQuery));
  }

  const featuredPost = publishedPosts.find((post) => post.featured) || publishedPosts[0];
  const showSpotlight = currentRoute === '/blog' && !normalizedQuery && Boolean(featuredPost);

  const canonicalPath = activeTag
    ? `/blog/tag/${activeTag}`
    : activeCategory
      ? `/blog/category/${activeCategory}`
      : '/blog';
  const robots =
    normalizedQuery || activeTag || (activeCategory && filteredPosts.length === 0)
      ? 'noindex, follow'
      : 'index, follow';
  const title = activeTag
    ? `${tagName} | BTMT Blog`
    : activeCategory
      ? `${categoryName} | BTMT Blog`
      : 'BTMT Blog | Insights, Stories and Ideas';
  const description = activeTag
    ? `Published BTMT articles tagged ${tagName}.`
    : activeCategory
      ? `Articles from Blissful Touch Media & Technology filed under ${categoryName}.`
      : BLOG_DESCRIPTION;

  useEffect(() => {
    applyDocumentMeta({
      title,
      description,
      canonical: absoluteUrl(canonicalPath),
      robots,
      type: 'website',
      jsonLd: normalizedQuery || activeTag
        ? null
        : activeCategory
          ? {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: categoryName,
              description,
              url: absoluteUrl(canonicalPath),
              isPartOf: absoluteUrl('/blog')
            }
          : {
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'BTMT Blog',
              description: BLOG_DESCRIPTION,
              url: absoluteUrl('/blog'),
              publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                url: SITE_ORIGIN
              },
              blogPost: publishedPosts.map((post) => ({
                '@type': 'BlogPosting',
                headline: post.title,
                url: absoluteUrl(`/blog/${post.slug}`),
                datePublished: post.publishedAt || undefined
              }))
            }
    });
  }, [title, description, canonicalPath, robots, normalizedQuery, activeTag, activeCategory, categoryName, publishedPosts.length]);

  return (
    <div className="w-full bg-white">
      <section className="py-16 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            BTMT Editorial Platform
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#051449]">
            {activeTag ? tagName : activeCategory ? categoryName : 'Insights, Stories and Ideas'}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            {activeTag
              ? `Published articles tagged ${tagName}.`
              : activeCategory
                ? `Articles filed under ${categoryName}.`
                : BLOG_DESCRIPTION}
          </p>

          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search titles, excerpts, tags, or keywords"
                aria-label="Search articles"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <SiteLink
              to="/blog"
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                currentRoute === '/blog'
                  ? 'bg-[#051449] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All
            </SiteLink>
            {BLOG_CATEGORIES.map((category) => {
              const slug = slugify(category);
              const active = slug === activeCategory;
              return (
                <SiteLink
                  key={category}
                  to="/blog/category/:category"
                  params={{ category: slug }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-[#051449] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </SiteLink>
              );
            })}
          </div>

          {(activeTag || activeCategory) && (
            <div className="text-xs text-slate-500">
              <SiteLink to="/blog" className="font-semibold text-[#051449] hover:text-[#12A9DB]">
                Clear filter
              </SiteLink>
            </div>
          )}
        </div>
      </section>

      {showSpotlight && featuredPost && (
        <section className="py-12 border-b border-slate-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedArticle post={featuredPost} />
        </section>
      )}

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-600">
            Showing <span className="font-mono text-[#051449]">{filteredPosts.length}</span> published articles
          </div>
          <div className="text-xs text-slate-500 font-mono">BTMT Editorial Desk</div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#F6F8FA] rounded-xl border border-slate-200">
            <div className="text-sm font-semibold text-slate-700">No published articles match your criteria.</div>
            <p className="text-xs text-slate-500">Try another category, tag, or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const FeaturedArticle: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="bg-[#F6F8FA] rounded-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
    <SiteLink
      to="/blog/:slug"
      params={{ slug: post.slug }}
      className="lg:col-span-7 block bg-[#F6F8FA]"
    >
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          className="w-full h-auto object-contain"
        />
      )}
    </SiteLink>
    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <SiteLink to={categoryPath(post.category)} className="font-semibold text-[#12A9DB] uppercase tracking-wider">
            {post.category}
          </SiteLink>
          {post.publishedAt && (
            <>
              <span>·</span>
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            </>
          )}
          <span>·</span>
          <span className="font-mono">{post.readTime}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#051449] leading-snug">
          <SiteLink to="/blog/:slug" params={{ slug: post.slug }} className="hover:text-[#12A9DB]">
            {post.title}
          </SiteLink>
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">{post.excerpt}</p>
        <TagList tags={post.tags} />
      </div>
      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-600">
          By <strong className="text-slate-900">{post.author}</strong>
          {post.authorRole ? ` (${post.authorRole})` : ''}
        </div>
        <SiteLink
          to="/blog/:slug"
          params={{ slug: post.slug }}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors inline-flex items-center gap-1.5"
        >
          <span>Read Article</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </SiteLink>
      </div>
    </div>
  </article>
);

const ArticleCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs">
    <div>
      <SiteLink to="/blog/:slug" params={{ slug: post.slug }} className="aspect-16/10 relative bg-[#F6F8FA] overflow-hidden block">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-contain"
          />
        )}
        <span className="absolute top-3 left-3 text-[11px] font-semibold bg-[#051449]/90 text-white px-2.5 py-0.5 rounded-md">
          {post.category}
        </span>
      </SiteLink>
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#051449] leading-snug">
          <SiteLink to="/blog/:slug" params={{ slug: post.slug }} className="hover:text-[#12A9DB]">
            {post.title}
          </SiteLink>
        </h3>
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{post.excerpt}</p>
        <TagList tags={post.tags} />
      </div>
    </div>
    <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
      <span className="text-slate-500 font-medium truncate max-w-36">{post.author}</span>
      <SiteLink
        to="/blog/:slug"
        params={{ slug: post.slug }}
        className="font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
      >
        <span>Read Article</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </SiteLink>
    </div>
  </article>
);

const TagList: React.FC<{ tags: string[] }> = ({ tags }) => {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
      {tags.slice(0, 3).map((tag) => (
        <SiteLink key={tag} to={tagPath(tag)} className="hover:text-[#051449]">
          {tag}
        </SiteLink>
      ))}
    </div>
  );
};
