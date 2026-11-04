import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAsAdmin, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin('Super Admin');
    navigateTo('/admin');
  };

  return (
    <div className="w-full bg-[#F6F8FA] py-16 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Staff Administration
            </div>
            <h1 className="text-2xl font-bold text-[#051449]">Sign In to BTMT</h1>
            <p className="text-xs text-slate-500">
              Access authorized BTMT administrative and content management modules.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Staff Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@blissfultouch.ng"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Sign In to Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
              Instant Staff Demo Access
            </div>
            <button
              onClick={() => {
                loginAsAdmin('Super Admin');
                navigateTo('/admin');
              }}
              className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-[#051449] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#12A9DB]" />
                  <span>Super Admin Console</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Full CMS, Enquiry & Settings Control</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
