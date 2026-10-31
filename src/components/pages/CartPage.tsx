import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, navigateTo } = useApp();

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#F6F8FA] py-24 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#051449]">Your Cart is Empty</h1>
            <p className="text-xs sm:text-sm text-slate-600">
              You haven't added any products or services to your shopping cart yet.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/marketplace')}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Order Review
            </div>
            <h1 className="text-3xl font-bold text-[#051449] mt-1">Shopping Cart</h1>
          </div>
          <button
            onClick={() => navigateTo('/marketplace')}
            className="text-xs font-semibold text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="text-[11px] font-semibold text-slate-500">
                        {item.product.brand} · {item.product.category}
                      </div>
                      <h2 className="text-base font-bold text-[#051449]">
                        {item.product.name}
                      </h2>
                      <div className="text-sm font-semibold font-mono text-[#051449] tabular-nums">
                        ₦{item.product.price.toLocaleString()} each
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold font-mono text-[#051449]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-sm font-bold font-mono text-[#051449] tabular-nums min-w-24 text-right">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#F6F8FA] rounded-xl border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-[#051449]">Order Summary</h2>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-slate-500">Calculated at checkout</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between text-sm font-bold text-[#051449]">
                  <span>Total (Excl. Shipping)</span>
                  <span className="font-mono tabular-nums">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('/checkout')}
                className="w-full py-3.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-slate-500 text-center leading-relaxed">
                Transactions are secured via certified Nigerian payment processors.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
