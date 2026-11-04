import React from 'react';
import { PartnerCompany } from '../../types';

interface PartnerMarqueeProps {
  partners: PartnerCompany[];
  className?: string;
}

export const PartnerMarquee: React.FC<PartnerMarqueeProps> = ({ partners, className = '' }) => {
  if (!partners || partners.length === 0) return null;

  // Duplicate list to achieve seamless infinite scroll
  const marqueeItems = [...partners, ...partners];

  return (
    <section className={`py-12 bg-white border-y border-slate-200 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#12A9DB]">
              Track Record & Collaborations
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-[#051449] tracking-tight uppercase">
              Organizations & Brands We Have Collaborated With
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-600 uppercase tracking-wider self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Sample Showcase Preview
          </div>
        </div>
      </div>

      {/* Marquee Scroller */}
      <div
        className="group relative w-full overflow-hidden flex"
        tabIndex={0}
        aria-label="List of partner organizations (infinite scrolling ticker)"
      >
        {/* Soft edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 items-center gap-6 sm:gap-10 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto py-2">
          {marqueeItems.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="flex items-center gap-3 px-5 py-3 border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-[#12A9DB]/50 transition-all shrink-0 select-none group/item"
            >
              {partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  className="h-6 w-auto max-w-[100px] object-contain grayscale opacity-70 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all"
                  loading="lazy"
                />
              ) : (
                <div className="w-7 h-7 rounded bg-[#051449]/10 text-[#051449] font-bold text-xs flex items-center justify-center">
                  {partner.name.charAt(0)}
                </div>
              )}
              <div className="text-left">
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-800 group-hover/item:text-[#051449] uppercase whitespace-nowrap block">
                  {partner.name}
                </span>
                {partner.category && (
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    {partner.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
