import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatBookPrice } from '../../utils/formatBookPrice';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, routeParams, navigateTo } = useApp();

  const product = products.find((p) => p.slug === routeParams.slug) || products[0];

  const otherBooks = products.filter((p) => p.id !== product.id);

  if (!product) {
    return null;
  }

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* BREADCRUMB */}
      <div className="border-b border-slate-200 bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            type="button"
            onClick={() => navigateTo('/marketplace')}
            className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Books</span>
          </button>
        </div>
      </div>

      {/* BOOK MAIN SHOWCASE */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Uncropped Official Selar Cover */}
          <div className="lg:col-span-5">
            <div className="max-w-sm mx-auto lg:max-w-full border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="aspect-[5/7] relative bg-white overflow-hidden">
                <img
                  src={product.imageUrl || '/assets/images/book-why-fake-it.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 bg-[#F6F8FA] border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
                <span>{product.format || 'Downloadable (Digital)'}</span>
                <span className="text-[#051449] font-semibold">Selar Official Listing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Official Selar Details & Direct Checkout Link */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                Author: {product.author || product.brand}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#051449] tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="text-xs text-slate-500 font-mono pt-1">
                Format: {product.format || 'Downloadable (Digital)'}
              </div>
            </div>

            {/* Price Block */}
            <div className="pb-5 border-b border-slate-200">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                Listing Price
              </div>
              <div className="text-3xl font-bold text-[#051449] tabular-nums">
                {formatBookPrice(product)}
              </div>
            </div>

            {/* Official Description */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                About This Book
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                {product.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Listing Facts */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Product Information
                </div>
                <ul className="space-y-2">
                  {product.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#12A9DB] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Selar Checkout Action */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              {product.selarUrl && (
                <a
                  href={product.selarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Buy Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <p className="text-xs text-slate-500">
                Clicking Buy Now opens the official Selar product page in a new tab to complete your order securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER AVAILABLE BOOK */}
      {otherBooks.length > 0 && (
        <section className="py-16 bg-[#F6F8FA] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-xl font-bold text-[#051449] uppercase tracking-wide">
              More by {product.author || product.brand}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {otherBooks.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white border border-slate-200 hover:border-[#12A9DB] transition-colors p-6 flex flex-col sm:flex-row gap-6 items-start"
                >
                  <button
                    type="button"
                    onClick={() => navigateTo('/marketplace/:slug', { slug: rel.slug })}
                    className="w-36 shrink-0 mx-auto sm:mx-0 aspect-[5/7] bg-white border border-slate-200 overflow-hidden"
                  >
                    <img
                      src={rel.imageUrl || '/assets/images/book-why-fake-it.jpg'}
                      alt={rel.name}
                      className="w-full h-full object-contain"
                    />
                  </button>

                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                        {rel.format || 'Downloadable (Digital)'}
                      </div>
                      <h3 className="text-lg font-bold text-[#051449] leading-snug">
                        <button
                          type="button"
                          onClick={() => navigateTo('/marketplace/:slug', { slug: rel.slug })}
                          className="text-left hover:text-[#12A9DB] transition-colors"
                        >
                          {rel.name}
                        </button>
                      </h3>
                      <div className="text-xs text-slate-600">
                        Author: {rel.author || rel.brand}
                      </div>
                      <div className="text-base font-bold text-[#051449] pt-1">
                        {formatBookPrice(rel)}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100">
                      {rel.selarUrl && (
                        <a
                          href={rel.selarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>Buy Now</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => navigateTo('/marketplace/:slug', { slug: rel.slug })}
                        className="text-xs font-bold uppercase tracking-wider text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
