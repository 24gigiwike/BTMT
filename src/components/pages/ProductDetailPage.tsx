import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, BookOpen, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, routeParams, navigateTo, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === routeParams.slug) || products[0];

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const isPurchasable = product.isPurchasable !== false;

  const handleAddToCart = () => {
    if (!isPurchasable) return;
    addToCart(product, quantity);
  };

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* BREADCRUMB */}
      <div className="border-b border-slate-200 bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigateTo('/marketplace')}
            className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Publications</span>
          </button>
        </div>
      </div>

      {/* PRODUCT / BOOK MAIN SECTION */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Book Asset */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="aspect-[3/4] relative bg-slate-900 overflow-hidden group">
                <img
                  src={
                    product.imageUrl ||
                    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1000&q=80'
                  }
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider bg-[#051449] text-white px-3 py-1">
                    {product.category}
                  </span>
                  <span className="text-[10px] bg-amber-500 text-white font-bold uppercase tracking-wider px-2.5 py-1">
                    {product.statusText || 'Preview'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#F6F8FA] border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
                <span>BTMT Publications</span>
                <span className="text-[#051449] font-semibold">Editorial Archive</span>
              </div>
            </div>

            {/* Guarantee Strip */}
            <div className="p-4 bg-[#F6F8FA] border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#12A9DB] shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-[#051449]">Official Publication Archive</div>
                <div className="text-slate-600 mt-0.5 leading-relaxed">
                  Published and preserved under Blissful Touch Media & Technology editorial standards.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Book Specifications */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                Author: {product.author || product.brand}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#051449] tracking-tight">
                {product.name}
              </h1>
              {product.publicationDetails && (
                <div className="text-xs text-slate-500 font-mono pt-1">
                  {product.publicationDetails}
                </div>
              )}
            </div>

            {/* Status Callout Banner */}
            {!isPurchasable ? (
              <div className="p-4 bg-amber-50/80 border border-amber-200 text-amber-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{product.statusText || 'Preview / Not Available for Purchase'}</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed pl-6">
                  This literary work is presented as a demonstration placeholder and publication preview.
                  Cart checkout and direct online purchasing are currently disabled for this item.
                </p>
              </div>
            ) : (
              <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100">
                <div className="text-3xl font-bold text-[#051449] font-mono tabular-nums">
                  ₦{product.price.toLocaleString()}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                About This Publication
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications List */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Edition Specifications:
              </div>
              <ul className="space-y-2">
                {product.specifications.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#12A9DB] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              {!isPurchasable ? (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    disabled
                    aria-disabled="true"
                    className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed select-none"
                  >
                    Preview / Not Available for Purchase
                  </button>

                  <button
                    onClick={() => navigateTo('/contact')}
                    className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#051449] bg-white border border-slate-300 hover:border-[#051449] hover:bg-slate-50 transition-colors text-center"
                  >
                    Enquire About Publication
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-xs font-semibold text-slate-700">Quantity:</div>
                    <div className="flex items-center border border-slate-300">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-xs font-semibold font-mono text-[#051449]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors"
                    >
                      Add to Shopping Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PUBLICATIONS */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#F6F8FA] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-xl font-bold text-[#051449] uppercase tracking-wide">
              Other Publications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white border border-slate-200 hover:border-[#12A9DB] transition-all p-5 flex flex-col justify-between"
                >
                  <div className="aspect-[3/4] relative bg-slate-900 overflow-hidden mb-3">
                    <img
                      src={
                        rel.imageUrl ||
                        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'
                      }
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-slate-500">
                      Author: {rel.author || rel.brand}
                    </div>
                    <h3 className="text-base font-bold text-[#051449] line-clamp-1">{rel.name}</h3>
                  </div>
                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
                      Preview
                    </span>
                    <button
                      onClick={() => navigateTo('/marketplace/:slug', { slug: rel.slug })}
                      className="text-xs font-bold uppercase tracking-wider text-[#12A9DB] hover:underline"
                    >
                      View Details →
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
