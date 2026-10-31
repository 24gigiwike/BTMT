import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ChevronRight, Clock } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogPosts, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Technology',
    'Business Growth',
    'Branding',
    'Digital Marketing',
    'Media',
    'Entertainment'
  ];

  const publishedPosts = blogPosts.filter((p) => p.isPublished);

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const featuredPost = publishedPosts.find((p) => p.featured) || publishedPosts[0];

  return (
    <div className="w-full bg-white">
      {/* HEADER SECTION */}
      <section className="py-16 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            BTMT Editorial Platform
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#051449]">
            Insights, Stories and Ideas
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Explore practical insights, educational articles, industry developments and inspiring
            stories across technology, media, entertainment and business growth.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics or authors..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#051449] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE SPOTLIGHT */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <section className="py-12 border-b border-slate-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6F8FA] rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-all grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-full bg-slate-900 overflow-hidden group">
              <img
                src={featuredPost.imageUrl || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80'}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="font-semibold text-xs text-white bg-[#051449]/90 backdrop-blur-xs px-3 py-1 rounded-md uppercase tracking-wider">
                  Featured Publication
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="font-semibold text-[#12A9DB] uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span>·</span>
                  <span>{featuredPost.publishedAt}</span>
                  <span>·</span>
                  <span className="font-mono">{featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#051449] leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="text-xs text-slate-600">
                  By <strong className="text-slate-900">{featuredPost.author}</strong> ({featuredPost.authorRole})
                </div>
                <button
                  onClick={() => navigateTo('/blog/:slug', { slug: featuredPost.slug })}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARTICLES LISTING */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-600">
            Showing <span className="font-mono text-[#051449]">{filteredPosts.length}</span> published articles
          </div>
          <div className="text-xs text-slate-500 font-mono">
            BTMT Editorial Desk
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#F6F8FA] rounded-xl border border-slate-200">
            <div className="text-sm font-semibold text-slate-700">No articles match your criteria.</div>
            <p className="text-xs text-slate-500">Try selecting another category or clearing search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs group"
              >
                <div>
                  <div className="aspect-16/10 relative bg-slate-900 overflow-hidden">
                    <img
                      src={post.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold bg-[#051449]/90 text-white px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{post.publishedAt}</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#051449] leading-snug group-hover:text-[#12A9DB] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium truncate max-w-36">
                    {post.author}
                  </span>
                  <button
                    onClick={() => navigateTo('/blog/:slug', { slug: post.slug })}
                    className="font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
