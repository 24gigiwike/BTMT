import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Clock, User, Share2, ArrowRight } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { blogPosts, routeParams, navigateTo, showToast } = useApp();

  const post = blogPosts.find((p) => p.slug === routeParams.slug) || blogPosts[0];

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.isPublished)
    .slice(0, 2);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="w-full bg-white">
      {/* BREADCRUMB */}
      <div className="border-b border-slate-100 bg-[#F6F8FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigateTo('/blog')}
            className="text-xs font-semibold text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </button>
        </div>
      </div>

      {/* ARTICLE HEADER */}
      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="space-y-6 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="font-semibold text-[#12A9DB] uppercase tracking-wider">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.publishedAt}</span>
            <span>·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#051449] text-white flex items-center justify-center font-bold text-xs font-mono">
                {post.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-[#051449]">{post.author}</div>
                <div className="text-xs text-slate-500">{post.authorRole}</div>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="p-2 text-slate-500 hover:text-[#051449] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </header>

        {/* EDITORIAL HERO COVER */}
        <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-900">
          <div className="aspect-16/9 relative overflow-hidden">
            <img
              src={post.imageUrl || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80'}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 py-2.5 bg-[#F6F8FA] border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>BTMT Media & Editorial Archive</span>
            <span className="font-mono text-[#051449] font-medium">{post.category}</span>
          </div>
        </div>

        {/* ARTICLE BODY */}
        <div className="py-8 prose prose-slate max-w-none text-slate-800 leading-relaxed text-base space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-[#051449] pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n- ');
              return (
                <ul key={idx} className="space-y-2 list-disc pl-6 text-slate-700">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith('1. ')) {
              const items = paragraph.split(/\n\d+\.\s/);
              return (
                <ol key={idx} className="space-y-2 list-decimal pl-6 text-slate-700">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={idx} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* AUTHOR BIO & CORPORATE ATTRIBUTION */}
        <div className="p-6 bg-[#F6F8FA] rounded-xl border border-slate-200 mt-8 space-y-2 text-xs">
          <div className="font-bold text-[#051449] uppercase tracking-wider">
            About the Editorial Desk
          </div>
          <p className="text-slate-600 leading-relaxed">
            Published under the editorial and technical standards of Blissful Touch Media & Technology.
            BTMT publishes research and practical commentary on enterprise software, ethical brand
            visibility, and media production.
          </p>
        </div>
      </article>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#F6F8FA] border-t border-slate-200/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-xl font-bold text-[#051449]">Related Publications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all overflow-hidden flex flex-col justify-between group shadow-xs"
                >
                  <div className="aspect-16/9 relative bg-slate-900 overflow-hidden">
                    <img
                      src={rel.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold bg-[#051449]/90 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="text-[11px] font-semibold text-[#12A9DB]">{rel.publishedAt}</div>
                    <h3 className="text-base font-bold text-[#051449] line-clamp-2 group-hover:text-[#12A9DB] transition-colors">{rel.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{rel.excerpt}</p>
                  </div>
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => navigateTo('/blog/:slug', { slug: rel.slug })}
                      className="text-xs font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
