import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { Logo } from '../ui/Logo';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  const { navigateTo, services } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#051449] text-white pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-slate-800">
          {/* Column 1 & 2: Company Overview & Brand */}
          <div className="lg:col-span-2 space-y-5">
            <button
              onClick={() => navigateTo('/')}
              className="text-left focus:outline-hidden py-1"
            >
              <Logo variant="light" />
            </button>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Blissful Touch Media & Technology (BTMT) is a multidisciplinary company
              dedicated to building authentic visibility and promoting moral and ethical
              excellence across technology, media, and creative entertainment.
            </p>
            <div className="pt-2 border-t border-slate-800">
              <div className="text-[11px] font-semibold text-[#12A9DB] uppercase tracking-wider">
                Official Slogan
              </div>
              <div className="text-xs text-slate-300 italic mt-1 font-light">
                "{COMPANY_INFO.slogan}"
              </div>
            </div>
          </div>

          {/* Column 3: Explore Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => navigateTo('/')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/services')}
                  className="hover:text-white transition-colors"
                >
                  All Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/marketplace')}
                  className="hover:text-white transition-colors"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/blog')}
                  className="hover:text-white transition-colors"
                >
                  Blog & Insights
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/community')}
                  className="hover:text-white transition-colors"
                >
                  Community
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Core Offerings
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {services.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => navigateTo('/services/:slug', { slug: srv.slug })}
                    className="hover:text-white transition-colors text-left truncate max-w-44 block"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('/services')}
                  className="text-xs text-[#12A9DB] hover:underline flex items-center gap-1 mt-1"
                >
                  <span>View All Capabilities</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Enquiries */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Contact & Enquiries
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#12A9DB] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#12A9DB] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => navigateTo('/contact')}
                  className="text-xs text-[#12A9DB] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>View Office Address & Hours</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Verified Socials
              </div>
              <div className="flex flex-col gap-1.5 mt-2 text-xs text-slate-300">
                <a
                  href={COMPANY_INFO.socials.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between group"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white" />
                </a>
                <a
                  href={COMPANY_INFO.socials.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between group"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white" />
                </a>
                <a
                  href={COMPANY_INFO.socials.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between group"
                >
                  <span>YouTube ({COMPANY_INFO.socials.youtube})</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => navigateTo('/privacy')}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('/terms')}
              className="hover:text-slate-200 transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigateTo('/cookies')}
              className="hover:text-slate-200 transition-colors"
            >
              Cookie Policy
            </button>
            <button
              onClick={() => navigateTo('/refund-policy')}
              className="hover:text-slate-200 transition-colors"
            >
              Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
