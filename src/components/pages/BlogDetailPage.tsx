import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import { SiteLink } from '../blog/SiteLink';
import { ArticleBody } from '../blog/ArticleBody';
import { applyDocumentMeta } from '../../seo/documentMeta';
import { relatedPosts, schemaKeywords } from '../../blog/query';
import { categoryPath, formatBlogDate, tagPath } from '../../blog/taxonomy';
import { SITE_NAME, SITE_ORIGIN, absoluteUrl, articleCanonical, articlePath } from '../../blog/urls';

export const BlogDetailPage: React.FC = () => {
  const { blogPosts, routeParams, showToast } = useApp();
  const post = blogPosts.find((item) => item.slug === routeParams.slug && item.isPublished);
  const related = post ? relatedPosts(post, blogPosts) : [];

  useEffect(() => {
    if (!post) {
      applyDocumentMeta({
        title: 'Article not available | BTMT Blog',
        description: 'This article is not published.',
        canonical: absoluteUrl('/blog'),
        robots: 'noindex, nofollow',
        type: 'website',
        jsonLd: null
      });
      return;
    }

    const title = post.seoTitle || `${post.title} | BTMT`;
    const description = post.seoDescription || post.excerpt;
    const canonical = articleCanonical(post.slug, post.canonicalUrl);
    const image = post.imageUrl ? absoluteUrl(post.imageUrl) : undefined;
    const imageAlt = post.imageAlt || post.title;
    const keywords = schemaKeywords(post);

    applyDocumentMeta({
      title: /btmt|blissful touch/i.test(title) ? title : `${title} | BTMT`,
      description,
      canonical,
      robots: 'index, follow',
      type: 'article',
      image,
      imageAlt,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || post.publishedAt || undefined,
      author: post.author,
      jsonLd: {
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
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_ORIGIN
            },
            datePublished: post.publishedAt || undefined,
            dateModified: post.updatedAt || post.publishedAt || undefined,
            image: image
              ? {
                  '@type': 'ImageObject',
                  url: image,
                  caption: imageAlt
                }
              : undefined,
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
      }
    });
  }, [post]);

  if (!post) {
    return (
      <div className="w-full bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-4">
          <h1 className="text-3xl font-bold text-[#051449]">This article is not available</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            It may be a draft, or the address may have changed. Drafts stay off the public site until they are published.
          </p>
          <SiteLink
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#051449] hover:text-[#12A9DB]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </SiteLink>
        </div>
      </div>
    );
  }

  const copyLink = () => {
    const url = articleCanonical(post.slug, post.canonicalUrl);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Article link copied to clipboard.', 'success');
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="border-b border-slate-100 bg-[#F6F8FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <SiteLink
            to="/blog"
            className="text-xs font-semibold text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </SiteLink>
        </div>
      </div>

      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="space-y-6 pb-8 border-b border-slate-200">
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
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                <span>·</span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
                </span>
              </>
            )}
            <span>·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#051449] text-white flex items-center justify-center font-bold text-xs">
                {post.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-[#051449]">{post.author}</div>
                {post.authorRole && <div className="text-xs text-slate-500">{post.authorRole}</div>}
              </div>
            </div>
            <button
              type="button"
              onClick={copyLink}
              className="p-2 text-slate-500 hover:text-[#051449] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </header>

        {post.imageUrl && (
          <figure className="my-8">
            <img
              src={post.imageUrl}
              alt={post.imageAlt || post.title}
              className="w-full h-auto border border-slate-200"
            />
            <figcaption className="px-1 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
              <span>BTMT Media & Editorial Archive</span>
              <span className="font-medium text-[#051449]">{post.category}</span>
            </figcaption>
          </figure>
        )}

        <ArticleBody markdown={post.content} />

        {post.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-500">Tags</span>
            {post.tags.map((tag) => (
              <SiteLink key={tag} to={tagPath(tag)} className="text-[#051449] hover:text-[#12A9DB]">
                {tag}
              </SiteLink>
            ))}
          </div>
        )}

        <div className="p-6 bg-[#F6F8FA] rounded-xl border border-slate-200 mt-8 space-y-2 text-xs">
          <div className="font-bold text-[#051449] uppercase tracking-wider">About the Editorial Desk</div>
          <p className="text-slate-600 leading-relaxed">
            Published under the editorial and technical standards of Blissful Touch Media & Technology.
            BTMT publishes research and practical commentary on enterprise software, ethical brand
            visibility, and media production.
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 bg-[#F6F8FA] border-t border-slate-200/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-xl font-bold text-[#051449]">Related Publications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs"
                >
                  {item.imageUrl && (
                    <SiteLink to="/blog/:slug" params={{ slug: item.slug }} className="aspect-16/9 relative bg-[#F6F8FA] overflow-hidden block">
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        className="w-full h-full object-contain"
                      />
                    </SiteLink>
                  )}
                  <div className="p-5 space-y-2">
                    <div className="text-[11px] font-semibold text-[#12A9DB]">
                      <time dateTime={item.publishedAt}>{formatBlogDate(item.publishedAt)}</time>
                    </div>
                    <h3 className="text-base font-bold text-[#051449] leading-snug">
                      <SiteLink to="/blog/:slug" params={{ slug: item.slug }} className="hover:text-[#12A9DB]">
                        {item.title}
                      </SiteLink>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{item.excerpt}</p>
                  </div>
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                    <SiteLink
                      to={articlePath(item.slug)}
                      className="text-xs font-semibold text-[#051449] hover:text-[#12A9DB]"
                    >
                      Read Article
                    </SiteLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
