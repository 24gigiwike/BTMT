import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full bg-white">
      {/* SECTION 1: HEADER & INTRODUCTION */}
      <section className="py-16 lg:py-24 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            Corporate Profile
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#051449] leading-tight">
            About Blissful Touch Media & Technology
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            Blissful Touch Media & Technology (BTMT) is a business organization committed to
            building intentional visibility and sustainable growth for businesses and organizations
            while promoting moral and ethical excellence.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Through premium media, technology, and entertainment products and services, the company
            seeks to create meaningful opportunities for learning, connection, productivity, and growth.
          </p>
        </div>
      </section>

      {/* SECTION 2: OUR STORY & TIMELINE */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Corporate History
            </div>
            <h2 className="text-3xl font-bold text-[#051449]">Our Story</h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Blissful Touch Media & Technology was founded by Michael C. George in 2017 with a
              clear mandate: to bridge the gap between creative visual media and rigorous technological
              execution, while upholding high ethical standards in an evolving digital economy.
            </p>
          </div>

          {/* Refined Verified Timeline */}
          <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-10 my-8">
            {COMPANY_INFO.registrations.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#051449] border-2 border-white" />
                <div className="text-xs font-bold font-mono text-[#12A9DB] uppercase tracking-wider">
                  {item.year}
                </div>
                <div className="text-base font-semibold text-[#051449] mt-1">
                  {item.event}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#F6F8FA] rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed mt-10">
            <strong>Headquarters:</strong> {COMPANY_INFO.address}. Operating across southeastern
            Nigeria and delivering technological and media deliverables nationally and internationally.
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: VISION AND MISSION */}
      <section className="py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="p-8 bg-white rounded-xl border border-slate-200 space-y-4 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Our Vision
              </div>
              <blockquote className="text-lg font-semibold text-[#051449] leading-relaxed">
                "{COMPANY_INFO.vision}"
              </blockquote>
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                Official statement from the company charter, defining our long-term global aspiration.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 bg-white rounded-xl border border-slate-200 space-y-4 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Our Mission
              </div>
              <blockquote className="text-lg font-semibold text-[#051449] leading-relaxed">
                "{COMPANY_INFO.mission}"
              </blockquote>
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                Our active operating commitment to clients, partners, and community members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OBJECTIVES */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Strategic Goals
            </div>
            <h2 className="text-3xl font-bold text-[#051449]">Five Key Objectives</h2>
            <p className="text-sm sm:text-base text-slate-600">
              The primary targets driving BTMT's operational divisions and community initiatives.
            </p>
          </div>

          <div className="space-y-4">
            {COMPANY_INFO.objectives.map((obj, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#CDEEF8] text-[#051449] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                  0{idx + 1}
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR CULTURE & DOCUMENTED VALUES */}
      <section className="py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Organizational Values
            </div>
            <h2 className="text-3xl font-bold text-[#051449]">Our Culture</h2>
            <p className="text-sm sm:text-base text-slate-600">
              The core principles that shape our workplace conduct, client relationships, and creative work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.cultureValues.map((val) => (
              <div
                key={val.title}
                className="p-6 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs"
              >
                <h3 className="text-base font-bold text-[#051449]">{val.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Proven Delivery
            </div>
            <h2 className="text-3xl font-bold text-[#051449]">Why Choose BTMT</h2>
            <p className="text-sm sm:text-base text-slate-600">
              Six core commitments upheld across all technology, media, and production deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.whyChooseUs.map((item) => (
              <div key={item.title} className="p-5 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#12A9DB]" />
                  <h3 className="text-sm font-bold text-[#051449]">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: LEADERSHIP & TEAM */}
      <section className="py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Corporate Leadership
            </div>
            <h2 className="text-3xl font-bold text-[#051449]">Company Leadership</h2>
            <p className="text-sm text-slate-600">
              Guided by purpose, long-term vision, and ethical stewardship.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="w-24 h-24 rounded-full bg-[#051449] text-white flex items-center justify-center font-bold text-2xl font-mono shrink-0 shadow-sm">
              MG
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <div>
                <h3 className="text-xl font-bold text-[#051449]">{COMPANY_INFO.founder}</h3>
                <div className="text-xs font-medium text-[#12A9DB] mt-0.5">Founder, BTMT</div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Founded BTMT in 2017 with the vision of establishing an authentic, morally grounded
                system for brand visibility, enterprise technology, and educational entertainment
                in Nigeria. Under his direction, the business transitioned from early operations to
                formal CAC incorporation and nationwide service delivery.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Location: Owerri, Imo State, Nigeria
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CLOSING CTA */}
      <section className="py-20 bg-[#051449] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Let's Build Something Meaningful Together
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Ready to establish authentic visibility and embrace sustainable technological and media
            growth? Let's discuss your project.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/book-service')}
              className="px-8 py-3.5 text-sm font-semibold text-[#051449] bg-white hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Work With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
