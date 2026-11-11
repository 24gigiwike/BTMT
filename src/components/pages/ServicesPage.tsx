import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';
import { ChevronRight, ArrowRight, Code, Video, Film, CheckCircle2 } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, navigateTo, setSelectedServiceForBooking } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Media', 'Entertainment'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter((s) => s.category === activeCategory);

  const handleBookDirect = (serviceId: string) => {
    setSelectedServiceForBooking(serviceId);
    navigateTo('/book-service');
  };

  const getCategoryTheme = (cat: ServiceCategory) => {
    switch (cat) {
      case 'Technology':
        return { badge: 'bg-[#CDEEF8] text-[#051449]', icon: Code, border: 'hover:border-[#12A9DB]' };
      case 'Media':
        return { badge: 'bg-red-50 text-red-700', icon: Video, border: 'hover:border-[#E32938]' };
      case 'Entertainment':
        return { badge: 'bg-purple-50 text-[#51217C]', icon: Film, border: 'hover:border-[#51217C]' };
      default:
        return { badge: 'bg-slate-100 text-slate-800', icon: Code, border: 'hover:border-slate-400' };
    }
  };

  return (
    <div className="w-full bg-white">
      {/* HEADER SECTION */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#F6F8FA] to-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#12A9DB]">
            Capabilities & Deliverables
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#051449] tracking-tight">
            Our Professional Services
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            We provide innovative technology solutions, professional media services, and creative
            entertainment offerings designed to improve productivity, strengthen brand visibility,
            and create lasting impact.
          </p>

          {/* Category Filter Controls */}
          <div className="pt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#051449] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES LISTING */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((srv) => {
            const theme = getCategoryTheme(srv.category);
            const Icon = theme.icon;

            return (
              <div
                key={srv.id}
                className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs ${theme.border} transition-all flex flex-col justify-between group`}
              >
                <div>
                  {/* Photo Header */}
                  <div className="aspect-16/10 relative overflow-hidden bg-slate-900">
                    <img
                      src={srv.imageUrl || '/assets/images/service-web-dev.jpg'}
                      alt={srv.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051449]/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 backdrop-blur-xs text-[#051449]">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{srv.category}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#051449] group-hover:text-[#12A9DB] transition-colors">
                        {srv.title}
                      </h2>
                      <div className="text-xs font-medium text-slate-500 mt-1 italic">
                        "{srv.headline}"
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {srv.shortDescription}
                    </p>

                    {/* Offerings Preview */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                        Core Deliverables:
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5">
                        {srv.offerings.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#12A9DB] shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => navigateTo('/services/:slug', { slug: srv.slug })}
                    className="text-xs font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleBookDirect(srv.id)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-[#051449] hover:bg-[#071b63] rounded-lg transition-colors"
                  >
                    {srv.ctaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM BOOKING PROMPT */}
      <section className="py-20 bg-[#051449] text-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#12A9DB]">
            CUSTOM ENGAGEMENT
          </span>
          <h2 className="text-3xl font-bold text-white">
            Have Custom Project Requirements?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            We tailor cross-disciplinary technology, branding, and media packages tailored to your
            exact operational milestones.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/book-service')}
              className="px-8 py-3.5 text-xs font-semibold text-white bg-[#E32938] hover:bg-[#c9202e] rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Tell Us About Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
