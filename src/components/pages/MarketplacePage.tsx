import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { products, navigateTo, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Branding & Print', 'Technology Solutions', 'Media Equipment', 'Publications & Books'];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-white">
      {/* HEADER SECTION */}
      <section className="py-16 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            Curated Commerce Platform
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#051449]">
            BTMT Marketplace
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Discover products from businesses and brands within our growing marketplace, all in one convenient space.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, or categories..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>
          </div>

          {/* Category Filters */}
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

      {/* PRODUCT GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-600">
            Showing <span className="font-mono text-[#051449]">{filteredProducts.length}</span> verified products
          </div>
          <div className="text-xs text-slate-500">
            All prices in Nigerian Naira (NGN ₦)
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-[#F6F8FA] rounded-xl border border-slate-200">
            <div className="text-sm font-semibold text-slate-700">No products found matching your search.</div>
            <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-semibold text-[#12A9DB] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">{prod.brand}</span>
                    <span className="text-emerald-700 font-medium">In Stock</span>
                  </div>

                  <h2 className="text-base font-bold text-[#051449] line-clamp-2 leading-snug">
                    {prod.name}
                  </h2>

                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[#051449] font-mono tabular-nums">
                      ₦{prod.price.toLocaleString()}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                        ₦{prod.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigateTo('/marketplace/:slug', { slug: prod.slug })}
                    className="text-xs font-semibold text-[#051449] hover:text-[#12A9DB] transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SELLER & BRAND ONBOARDING INVITATION */}
      <section className="py-16 bg-[#F6F8FA] border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            Brand Partnerships
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#051449]">
            Want to Showcase Your Products on the BTMT Marketplace?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            We onboard select, verified brands offering genuine tools, publications, and professional
            supplies to our growing audience across Nigeria.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-6 py-2.5 text-xs font-semibold text-[#051449] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <span>Enquire About Marketplace Placement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
