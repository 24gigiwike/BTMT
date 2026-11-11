import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, placeOrder, navigateTo } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Lagos State');
  const [paymentMethod, setPaymentMethod] = useState<'Paystack' | 'Flutterwave' | 'Direct Transfer'>('Paystack');

  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0 && !confirmedOrder) {
    return (
      <div className="w-full bg-[#F6F8FA] py-24 text-center">
        <h1 className="text-2xl font-bold text-[#051449]">No Items for Checkout</h1>
        <p className="text-xs text-slate-600 mt-2">Your cart is empty. Please add items before checking out.</p>
        <button
          onClick={() => navigateTo('/marketplace')}
          className="mt-6 px-6 py-2.5 text-xs font-semibold text-white bg-[#051449] rounded-lg"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setErrorMessage('Please fill in all required shipping and contact fields.');
      return;
    }

    setIsProcessing(true);

    // Simulate reliable gateway handshake
    setTimeout(() => {
      const order = placeOrder(
        {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          state: state.trim()
        },
        paymentMethod
      );

      setIsProcessing(false);
      setConfirmedOrder(order);
    }, 800);
  };

  if (confirmedOrder) {
    return (
      <div className="w-full bg-[#F6F8FA] py-20 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Payment & Order Confirmed
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#051449]">
                Order Reference: {confirmedOrder.reference}
              </h1>
              <p className="text-sm text-slate-600">
                Thank you for your order, {confirmedOrder.customer.fullName}. We have dispatched a
                receipt to <strong>{confirmedOrder.customer.email}</strong>.
              </p>
            </div>

            <div className="p-6 bg-[#F6F8FA] rounded-xl border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Payment Status:</span>
                <span className="font-semibold text-emerald-700">{confirmedOrder.status}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Payment Channel:</span>
                <span className="font-semibold text-slate-800">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-semibold text-slate-800 text-right max-w-xs">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-[#051449]">
                <span>Total Amount:</span>
                <span className="font-mono tabular-nums">₦{confirmedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('/marketplace')}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors"
              >
                Continue Browsing
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </div>
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
              Final Step
            </div>
            <h1 className="text-3xl font-bold text-[#051449] mt-1">Secure Checkout</h1>
          </div>
          <button
            onClick={() => navigateTo('/cart')}
            className="text-xs font-semibold text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Cart</span>
          </button>
        </div>

        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Shipping Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 border border-slate-200 rounded-xl space-y-6">
              <h2 className="text-lg font-bold text-[#051449]">
                1. Delivery & Contact Details
              </h2>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Recipient Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Michael George"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="receipt@company.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter street address and landmark"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Locality <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State in Nigeria <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                    >
                      <option value="Imo State">Imo State</option>
                      <option value="Abia State">Abia State</option>
                      <option value="Anambra State">Anambra State</option>
                      <option value="Enugu State">Enugu State</option>
                      <option value="Rivers State">Rivers State (Port Harcourt)</option>
                      <option value="Lagos State">Lagos State</option>
                      <option value="Abuja FCT">Abuja FCT</option>
                      <option value="Other States">Other States (Nationwide Courier)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-8 border border-slate-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#051449]">
                  2. Payment Method
                </h2>
                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Certified Nigerian Gateways
                </div>
              </div>

              <div className="space-y-3">
                <label
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'Paystack'
                      ? 'border-[#051449] bg-[#CDEEF8]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Paystack'}
                      onChange={() => setPaymentMethod('Paystack')}
                      className="text-[#051449] focus:ring-[#12A9DB]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#051449]">
                        Paystack Gateway (Cards, Bank Transfer, USSD)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Instant server-side verification sandbox
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700">Paystack</span>
                </label>

                <label
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'Flutterwave'
                      ? 'border-[#051449] bg-[#CDEEF8]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Flutterwave'}
                      onChange={() => setPaymentMethod('Flutterwave')}
                      className="text-[#051449] focus:ring-[#12A9DB]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#051449]">
                        Flutterwave Gateway
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Direct debit & mobile money options
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700">Flutterwave</span>
                </label>

                <label
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'Direct Transfer'
                      ? 'border-[#051449] bg-[#CDEEF8]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Direct Transfer'}
                      onChange={() => setPaymentMethod('Direct Transfer')}
                      className="text-[#051449] focus:ring-[#12A9DB]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#051449]">
                        Direct Corporate Bank Transfer
                      </div>
                      <div className="text-[11px] text-slate-500">
                        BTMT corporate account details provided on placement
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700">Manual</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary & Submit */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F6F8FA] rounded-xl border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-[#051449]">Order Summary</h2>

              <div className="divide-y divide-slate-200 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-2.5 flex justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{item.product.name}</div>
                      <div className="text-slate-500">Qty: {item.quantity} × ₦{item.product.price.toLocaleString()}</div>
                    </div>
                    <div className="font-mono font-semibold text-slate-900 tabular-nums">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Handling</span>
                  <span className="text-emerald-700 font-semibold">Standard Calculated</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold text-[#051449]">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums">₦{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{isProcessing ? 'Authorizing Transaction...' : `Complete Order (₦${cartTotal.toLocaleString()})`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SSL Encrypted Checkout · BTMT Enterprise Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
