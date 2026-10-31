import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminRole } from '../../types';
import { ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAsMember, loginAsAdmin, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<'member' | 'admin'>('member');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'admin') {
      loginAsAdmin('Super Admin');
      navigateTo('/admin');
    } else {
      loginAsMember(email || 'greatibewuike19@gmail.com', 'Registered Member');
      navigateTo('/dashboard');
    }
  };

  return (
    <div className="w-full bg-[#F6F8FA] py-16 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Authentication
            </div>
            <h1 className="text-2xl font-bold text-[#051449]">Sign In to BTMT</h1>
            <p className="text-xs text-slate-500">
              Access your member account or authorized staff control modules.
            </p>
          </div>

          {/* Account Type Selector */}
          <div className="flex p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setLoginType('member')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                loginType === 'member'
                  ? 'bg-white text-[#051449] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Community Member
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                loginType === 'admin'
                  ? 'bg-white text-[#051449] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Staff Administrator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={loginType === 'admin' ? 'admin@blissfultouch.ng' : 'member@company.com'}
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
              <span>{loginType === 'admin' ? 'Sign In to Admin Panel' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Presets */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
              Instant Demo Access
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  loginAsMember('greatibewuike19@gmail.com', 'Great Ibewuike');
                  navigateTo('/dashboard');
                }}
                className="p-2 bg-slate-50 hover:bg-[#CDEEF8]/50 border border-slate-200 rounded-lg text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-[#051449] flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#12A9DB]" />
                  <span>Member Demo</span>
                </div>
                <div className="text-[10px] text-slate-500">Resource Vault</div>
              </button>

              <button
                onClick={() => {
                  loginAsAdmin('Super Admin');
                  navigateTo('/admin');
                }}
                className="p-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-[#051449] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>Super Admin</span>
                </div>
                <div className="text-[10px] text-slate-500">Full CMS Control</div>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2">
            New to BTMT?{' '}
            <button
              onClick={() => navigateTo('/community/join')}
              className="text-[#12A9DB] font-semibold hover:underline"
            >
              Register for Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
