import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../ui/Logo';
import { Menu, X } from 'lucide-react';

export const SiteHeader: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change or escape
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentRoute]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Zone 1: Brand Wordmark & Official Logo */}
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center text-left focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#051449] py-1"
          >
            <Logo variant="dark" />
          </button>

          {/* Zone 2: Navigation Links (Rialto-style horizontal editorial navigation) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`text-[12px] uppercase tracking-wider transition-colors py-2 relative font-medium ${
                  isActive(link.path)
                    ? 'text-[#051449] font-bold'
                    : 'text-slate-600 hover:text-[#051449]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#051449]" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Drawer Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Primary CTA Button - Architectural & Confident */}
            <button
              onClick={() => navigateTo('/book-service')}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors whitespace-nowrap"
            >
              Get Started
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-slate-800 hover:text-[#051449] hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Architectural Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-2xl animate-in fade-in duration-150">
          <div className="px-6 pt-6 pb-8 space-y-1 divide-y divide-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`w-full text-left py-3 text-sm font-medium tracking-wide uppercase transition-colors ${
                  isActive(link.path)
                    ? 'text-[#051449] font-bold border-l-2 border-[#051449] pl-3'
                    : 'text-slate-700 hover:text-[#051449] pl-1'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-6">
              <button
                onClick={() => navigateTo('/book-service')}
                className="w-full text-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
