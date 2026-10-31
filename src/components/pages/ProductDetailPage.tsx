import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, routeParams, navigateTo, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === routeParams.slug) || products[0];

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="w-full bg-white">
      {/* BREADCRUMB */}
      <div className="border-b border-slate-100 bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigateTo('/marketplace')}
            className="text-xs font-semibold text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </button>
        </div>
      </div>

      {/* PRODUCT MAIN SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Visual Asset & Verification Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="aspect-4/3 relative bg-slate-900 overflow-hidden group">
                <img
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1200&q=80'}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051449]/70 via-transparent to-black/30 pointer-events-none" />
                
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider bg-[#051449]/90 text-white px-3 py-1 rounded-md backdrop-blur-xs">
                    {product.category}
                  </span>
                  <span className="font-mono text-[11px] bg-emerald-500/95 text-white font-semibold px-2.5 py-1 rounded-md shadow-xs">
                    VERIFIED PRODUCT
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs text-[#CDEEF8] font-medium">Brand: {product.brand}</div>
                  <div className="text-lg font-bold text-white drop-shadow-xs truncate">{product.name}</div>
                </div>
              </div>

              <div className="p-4 bg-[#F6F8FA] border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium text-[#051449]">BTMT Quality Assured</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready for Dispatch
                </span>
              </div>
            </div>

            {/* Fulfilment & Guarantee Strip */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#F6F8FA] rounded-xl border border-slate-200 flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#12A9DB] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-[#051449]">Delivery Notice</div>
                  <div className="text-slate-600 mt-0.5 leading-snug">{product.deliveryInfo}</div>
                </div>
              </div>

              <div className="p-4 bg-[#F6F8FA] rounded-xl border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-[#051449]">Authenticity Guarantee</div>
                  <div className="text-slate-600 mt-0.5 leading-snug">Vetted by BTMT standards for high reliability.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Specifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                {product.brand}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#051449]">
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100">
              <div className="text-3xl font-bold text-[#051449] font-mono tabular-nums">
                ₦{product.price.toLocaleString()}
              </div>
              {product.originalPrice && (
                <div className="text-base text-slate-400 line-through font-mono tabular-nums">
                  ₦{product.originalPrice.toLocaleString()}
                </div>
              )}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications List */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Product Specifications:
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

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-xs font-semibold text-slate-700">Quantity:</div>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold font-mono text-[#051449]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-700 font-medium">
                  {product.stockCount} units available
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="px-8 py-3 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Cart</span>
                </button>

                <button
                  onClick={() => {
                    handleAddToCart();
                    navigateTo('/cart');
                  }}
                  className="px-6 py-3 text-xs font-semibold text-[#051449] bg-[#CDEEF8] hover:bg-[#bfe7f3] rounded-lg transition-colors text-center"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#F6F8FA] border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-xl font-bold text-[#051449]">
              More From the Marketplace
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all overflow-hidden flex flex-col justify-between group shadow-xs"
                >
                  <div className="aspect-16/10 relative bg-slate-900 overflow-hidden">
                    <img
                      src={rel.imageUrl || 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=600&q=80'}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold bg-[#051449]/90 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-500">{rel.brand}</div>
                    <h3 className="text-sm font-bold text-[#051449] line-clamp-1">{rel.name}</h3>
                    <div className="text-sm font-bold text-[#051449] font-mono tabular-nums">
                      ₦{rel.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => navigateTo('/marketplace/:slug', { slug: rel.slug })}
                      className="text-xs font-semibold text-[#12A9DB] hover:underline"
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
