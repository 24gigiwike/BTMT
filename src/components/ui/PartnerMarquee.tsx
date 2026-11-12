import React from 'react';
import { PartnerCompany } from '../../types';

interface PartnerMarqueeProps {
  partners: PartnerCompany[];
  className?: string;
}

function officialWebsite(url?: string): string | null {
  const value = url?.trim() || '';
  if (!/^https?:\/\//i.test(value)) return null;
  return value;
}

export const PartnerMarquee: React.FC<PartnerMarqueeProps> = ({ partners, className = '' }) => {
  const organizations = [...(partners || [])]
    .filter((partner) => partner.isPublished !== false && partner.name && partner.logoUrl)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (organizations.length === 0) return null;

  return (
    <section className={`py-16 bg-white border-y border-slate-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#12A9DB]">
            Track Record & Collaborations
          </div>
          <h3 className="mt-1 text-sm sm:text-base font-semibold text-[#051449] tracking-tight uppercase">
            Organizations & Brands We Have Collaborated With
          </h3>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 max-w-3xl">
          {organizations.map((partner) => {
            const website = officialWebsite(partner.websiteUrl);
            const nameClass = 'text-base font-semibold text-[#051449]';
            return (
              <li key={partner.id} className="flex flex-col items-start gap-4">
                <img
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  className="h-28 sm:h-32 w-auto max-w-full object-contain object-left"
                />
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${nameClass} hover:text-[#12A9DB]`}
                  >
                    {partner.name}
                  </a>
                ) : (
                  <span className={nameClass}>{partner.name}</span>
                )}
                {partner.location && (
                  <p className="text-sm text-[#667085]">{partner.location}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
