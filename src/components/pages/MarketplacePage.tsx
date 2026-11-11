import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatBookPrice } from '../../utils/formatBookPrice';
import { ExternalLink, ArrowRight } from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { products, navigateTo } = useApp();

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* HEADER SECTION (Rialto Editorial Light Format) */}
      <section className="py-16 lg:py-24 bg-[#F6F8FA] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
            Official Publications
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#051449] tracking-tight">
            BTMT Books &amp; Publications
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto font-normal">
            Explore published books by Michael C. George through Blissful Touch Media &amp; Technology.
            Select Buy Now on any book to complete checkout or access your download directly on Selar.
          </p>
        </div>
      </section>

      {/* OFFICIAL TWO-BOOK SELAR SHOWCASE */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-10 pb-4 border-b border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Published Catalogue: <span className="text-[#051449]">{products.length}</span> Official Titles
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Fulfillment &amp; Checkout via Selar
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {products.map((prod) => (
            <article
              key={prod.id}
              className="bg-white border border-slate-200 hover:border-[#12A9DB] transition-colors p-6 sm:p-8 flex flex-col justify-between shadow-xs group"
            >
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start">
                {/* Official Uncropped Selar Cover Artwork */}
                <button
                  type="button"
                  onClick={() => navigateTo('/marketplace/:slug', { slug: prod.slug })}
                  aria-label={`View details for ${prod.name}`}
                  className="w-48 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 aspect-[5/7] bg-white border border-slate-200 overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#051449]"
                >
                  <img
                    src={prod.imageUrl || '/assets/images/book-why-fake-it.jpg'}
                    alt={prod.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </button>

                {/* Book Editorial Information */}
                <div className="flex-1 space-y-3 text-left">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    {prod.format || 'Downloadable (Digital)'}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#051449] leading-snug">
                    <button
                      type="button"
                      onClick={() => navigateTo('/marketplace/:slug', { slug: prod.slug })}
                      className="text-left hover:text-[#12A9DB] transition-colors"
                    >
                      {prod.name}
                    </button>
                  </h2>

                  <div className="text-xs font-semibold text-slate-700">
                    Author: <span className="text-[#051449]">{prod.author || prod.brand}</span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {prod.description.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Direct Selar Purchase Action */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    Price
                  </div>
                  <div className="text-2xl font-bold text-[#051449] tabular-nums">
                    {formatBookPrice(prod)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigateTo('/marketplace/:slug', { slug: prod.slug })}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#051449] hover:text-[#12A9DB] transition-colors"
                  >
                    <span>Book Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {prod.selarUrl && (
                    <a
                      href={prod.selarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors inline-flex items-center gap-2 shadow-xs"
                    >
                      <span>Buy Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
