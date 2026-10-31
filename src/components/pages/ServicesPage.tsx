import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';
import { ChevronRight, ArrowRight } from 'lucide-react';

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

  return (
    <div className="w-full bg-white">
      {/* HEADER SECTION */}
      <section className="py-16 lg:py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            Capabilities & Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#051449]">
            Our Services
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            We provide innovative technology solutions, professional media services and creative
            entertainment offerings designed to improve productivity, strengthen brand visibility
            and create meaningful experiences.
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
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
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
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span className="font-semibold text-[#12A9DB]">{srv.category}</span>
                  <span className="text-[11px] font-mono text-slate-400">BTMT</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#051449]">{srv.title}</h2>
                  <div className="text-xs font-medium text-slate-500 mt-1 italic">
                    "{srv.headline}"
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {srv.shortDescription}
                </p>

                {/* Offerings overview */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                    Core Capabilities:
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {srv.offerings.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#12A9DB]" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => navigateTo('/services/:slug', { slug: srv.slug })}
                  className="text-xs font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleBookDirect(srv.id)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors"
                >
                  {srv.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM BOOKING PROMPT */}
      <section className="py-16 bg-[#F6F8FA] border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#051449]">
            Have Custom Project Requirements?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            We tailor cross-disciplinary technology, branding, and media packages tailored to your
            exact operational milestones.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/book-service')}
              className="px-6 py-3 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors inline-flex items-center gap-2"
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
