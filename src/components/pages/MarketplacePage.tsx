import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, BookOpen, ArrowRight, Eye } from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { products, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.author && prod.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* HEADER SECTION (Rialto Editorial Light Aesthetic) */}
      <section className="py-16 lg:py-24 bg-[#F6F8FA] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
            Curated Publications
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#051449] tracking-tight">
            BTMT Publications & Books
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto font-normal">
            Explore literary works and publications published through Blissful Touch Media & Technology.
            Items are currently showcased in editorial preview format.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications by title or author..."
                className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#051449] focus:ring-1 focus:ring-[#051449]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT / BOOKS GRID */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-10 pb-4 border-b border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Showcase Catalog: <span className="text-[#051449]">{filteredProducts.length}</span> Published Titles
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-800 uppercase tracking-wider self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Preview Only · Online Ordering Disabled
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-[#F6F8FA] border border-slate-200">
            <div className="text-sm font-semibold text-slate-700">No books found matching your search.</div>
            <p className="text-xs text-slate-500">Try adjusting your search keywords.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold uppercase tracking-wider text-[#12A9DB] hover:underline"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-slate-200 hover:border-[#12A9DB] transition-all flex flex-col justify-between group p-6 shadow-xs"
              >
                <div>
                  {/* Book Cover Frame (Natural Book Aspect Ratio) */}
                  <div className="aspect-[3/4] relative overflow-hidden bg-slate-100 border border-slate-200 mb-5">
                    <img
                      src={
                        prod.imageUrl ||
                        '/assets/images/book-01.jpg'
                      }
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#051449] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                      {prod.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                      Author: <span className="font-semibold text-slate-800">{prod.author || prod.brand}</span>
                    </div>

                    <h2 className="text-xl font-bold text-[#051449] group-hover:text-[#12A9DB] transition-colors leading-snug">
                      {prod.name}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {prod.description}
                    </p>

                    {prod.publicationDetails && (
                      <div className="text-[11px] text-slate-500 font-mono pt-1">
                        {prod.publicationDetails}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-200 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {prod.statusText || 'Preview / Not Available for Purchase'}
                    </span>
                    <span className="font-bold text-[#051449] font-mono text-sm">
                      {prod.price > 0 ? `₦${prod.price.toLocaleString()}` : 'Sample'}
                    </span>
                  </div>

                  <button
                    onClick={() => navigateTo('/marketplace/:slug', { slug: prod.slug })}
                    className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#051449] bg-slate-100 hover:bg-[#051449] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Book Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AUTHORS & PUBLISHING INQUIRY */}
      <section className="py-20 bg-[#F6F8FA] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
            Publishing Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-[#051449] tracking-tight">
            Interested in Publishing or Bulk Literary Copies?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Blissful Touch Media & Technology provides end-to-end editorial design, book formatting,
            ISBN assistance, and commercial print production for authors and organizations.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#051449] bg-white border border-slate-300 hover:border-[#051449] hover:bg-slate-50 transition-colors inline-flex items-center gap-2"
            >
              <span>Enquire About Book Publishing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
