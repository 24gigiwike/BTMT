import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../ui/Logo';
import { ShoppingBag, Menu, X, User, ShieldCheck } from 'lucide-react';

export const SiteHeader: React.FC = () => {
  const { currentRoute, navigateTo, cartCount, currentUser, logout, loginAsAdmin, loginAsMember } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  // Close mobile menu on route change or escape
  useEffect(() => {
    setMobileMenuOpen(false);
    setAuthDropdownOpen(false);
  }, [currentRoute]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setAuthDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Blog', path: '/blog' },
    { label: 'Community', path: '/community' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && currentRoute === '/') return true;
    if (path !== '/' && currentRoute.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#12A9DB] rounded-lg p-1"
          >
            <Logo variant="dark" />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`text-sm font-medium whitespace-nowrap transition-colors py-1 relative ${
                  isActive(link.path)
                    ? 'text-[#051449] font-semibold'
                    : 'text-slate-600 hover:text-[#051449]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#051449] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Icon */}
            <button
              onClick={() => navigateTo('/cart')}
              aria-label="View Shopping Cart"
              className="relative p-2 text-slate-700 hover:text-[#051449] hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-white bg-[#E32938] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                aria-label="Account Settings"
                className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${
                  currentUser
                    ? 'bg-[#CDEEF8]/50 text-[#051449] border border-[#12A9DB]/30'
                    : 'text-slate-700 hover:text-[#051449] hover:bg-slate-100'
                }`}
              >
                {currentUser?.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-[#051449]" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                {currentUser && (
                  <span className="hidden sm:inline-block max-w-24 truncate">
                    {currentUser.role === 'admin' ? 'Admin' : currentUser.fullName.split(' ')[0]}
                  </span>
                )}
              </button>

              {authDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 text-xs">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <div className="font-semibold text-slate-900 truncate">{currentUser.fullName}</div>
                        <div className="text-slate-500 truncate">{currentUser.email}</div>
                        <div className="mt-1 text-[11px] font-medium text-[#12A9DB] uppercase tracking-wider">
                          {currentUser.role === 'admin' ? currentUser.adminRole : 'Community Member'}
                        </div>
                      </div>

                      {currentUser.role === 'admin' ? (
                        <button
                          onClick={() => {
                            navigateTo('/admin');
                            setAuthDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 font-medium text-slate-800 flex items-center justify-between"
                        >
                          <span>Admin Control Panel</span>
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">CMS</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            navigateTo('/dashboard');
                            setAuthDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 font-medium text-slate-800"
                        >
                          Member Dashboard
                        </button>
                      )}

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setAuthDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-medium"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-slate-500 border-b border-slate-100">
                        Welcome to BTMT
                      </div>
                      <button
                        onClick={() => {
                          navigateTo('/login');
                          setAuthDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 font-medium text-slate-800"
                      >
                        Member / Staff Login
                      </button>
                      <button
                        onClick={() => {
                          navigateTo('/community/join');
                          setAuthDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 font-medium text-slate-800"
                      >
                        Join BTMT Community
                      </button>
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <div className="px-4 py-1 text-[11px] text-slate-400 font-semibold uppercase">Demo Instant Sign-In</div>
                        <button
                          onClick={() => {
                            loginAsAdmin('Super Admin');
                            setAuthDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-1.5 hover:bg-blue-50 text-blue-800 font-medium text-[11px]"
                        >
                          Demo Staff Admin Login
                        </button>
                        <button
                          onClick={() => {
                            loginAsMember();
                            setAuthDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-1.5 hover:bg-slate-50 text-slate-700 font-medium text-[11px]"
                        >
                          Demo Registered Member Login
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Primary CTA Button */}
            <button
              onClick={() => navigateTo('/book-service')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#051449] hover:bg-[#071d6b] rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              Get Started
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-slate-700 hover:text-[#051449] hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#CDEEF8]/60 text-[#051449] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#051449]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => navigateTo('/book-service')}
                className="w-full text-center px-4 py-3 text-sm font-semibold text-white bg-[#051449] rounded-lg hover:bg-[#071d6b] transition-colors"
              >
                Get Started / Book a Service
              </button>

              <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-500">
                <button
                  onClick={() => navigateTo('/admin')}
                  className="font-medium text-slate-700 hover:text-[#051449]"
                >
                  Admin Portal
                </button>
                <button
                  onClick={() => navigateTo('/community/join')}
                  className="font-medium text-[#12A9DB] hover:underline"
                >
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
