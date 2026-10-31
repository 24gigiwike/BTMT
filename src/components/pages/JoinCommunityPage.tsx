import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const JoinCommunityPage: React.FC = () => {
  const { registerMember, navigateTo } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [brandName, setBrandName] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('Technology & Web');
  const [consent, setConsent] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters.');
      return;
    }
    if (!consent) {
      setErrorMessage('Please accept the community terms and privacy policy.');
      return;
    }

    registerMember(fullName.trim(), email.trim(), brandName.trim(), areaOfInterest);
    navigateTo('/dashboard');
  };

  return (
    <div className="w-full bg-[#F6F8FA] py-16 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              BTMT Member Registration
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#051449]">
              Join the BTMT Community
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Access member-only resources, business growth templates, and upcoming training invitations.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a secure password"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brand or Business Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Apex Labs"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Area of Interest
                </label>
                <select
                  value={areaOfInterest}
                  onChange={(e) => setAreaOfInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                >
                  <option value="Technology & Web">Technology & Web</option>
                  <option value="Media & Branding">Media & Branding</option>
                  <option value="Print & Publishing">Print & Publishing</option>
                  <option value="Entertainment & Storytelling">Entertainment & Storytelling</option>
                  <option value="Business Strategy">Business Strategy</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 text-[#051449] focus:ring-[#12A9DB] rounded"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I agree to the Community Guidelines, Terms of Service, and Privacy Policy.
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Create Free Member Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Already have an account?{' '}
            <button
              onClick={() => navigateTo('/login')}
              className="text-[#12A9DB] font-semibold hover:underline"
            >
              Sign In here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
