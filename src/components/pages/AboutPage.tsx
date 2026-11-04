import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* SECTION 1: HEADER & INTRODUCTION (Rialto-Inspired Light Editorial Style) */}
      <section className="py-16 lg:py-24 bg-[#F6F8FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-xs font-semibold text-[#12A9DB] uppercase tracking-wider">
                <span>Corporate Profile · CAC Registered (2022)</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#051449] tracking-tight leading-tight">
                About Blissful Touch Media & Technology
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                Blissful Touch Media & Technology (BTMT) is a business organization committed to
                building intentional visibility and sustainable growth for businesses and organizations
                while promoting moral and ethical excellence.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Through premium media, technology, and entertainment products and services, the company
                creates meaningful opportunities for learning, connection, productivity, and sustainable growth.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#051449]">
                <div className="px-4 py-2 bg-white border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Founded 2017 · CAC Registered 2022</span>
                </div>
                <div className="px-4 py-2 bg-white border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#12A9DB]" />
                  <span>Technology · Media · Entertainment</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="border border-slate-200 overflow-hidden shadow-sm bg-slate-900 group">
                <div className="aspect-4/3 relative">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                    alt="BTMT collaborative workspace"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051449]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs text-[#CDEEF8] font-semibold uppercase tracking-wider">Corporate Ethos</div>
                    <div className="text-sm font-bold text-white leading-snug">
                      "Building Authentic Visibility & Promoting Moral and Ethical Excellence"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR STORY & TIMELINE */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Corporate History
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-[#051449] tracking-tight">Our Story & Founding Vision</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Blissful Touch Media & Technology was founded by Michael C. George in 2017 with a
                clear mandate: to bridge the gap between creative visual media and rigorous technological
                execution, while upholding high ethical standards in an evolving digital economy.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Blissful Touch Media & Technology was registered with the Corporate Affairs Commission (CAC)
                in 2022. The organization delivers robust digital platforms, brand assets, commercial print systems,
                and media production services across Nigeria and internationally.
              </p>

              {/* Photographic Accent */}
              <div className="pt-4 border border-slate-200 overflow-hidden shadow-xs">
                <div className="aspect-16/9 relative bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80"
                    alt="Technology planning and media execution"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-[#F6F8FA] border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                  <span className="font-medium text-[#051449]">Corporate Systems Engineering</span>
                  <span className="font-mono text-slate-400">BTMT Studio Desk</span>
                </div>
              </div>
            </div>

            {/* Verified Timeline Column */}
            <div className="lg:col-span-6 lg:pl-6 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#051449]">
                Milestones & Evolution
              </div>
              <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8 py-2">
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

              <div className="p-6 bg-[#F6F8FA] border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong>Corporate Operations:</strong> Delivering technological, media, and creative solutions
                with a commitment to integrity, punctuality, and lasting value.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: VISION AND MISSION */}
      <section className="py-20 lg:py-24 bg-[#F6F8FA] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="p-8 bg-white border border-slate-200 space-y-4 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Our Vision
              </div>
              <blockquote className="text-lg font-light text-[#051449] leading-relaxed">
                "{COMPANY_INFO.vision}"
              </blockquote>
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                Official statement from the company charter, defining our long-term aspiration.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 bg-white border border-slate-200 space-y-4 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Our Mission
              </div>
              <blockquote className="text-lg font-light text-[#051449] leading-relaxed">
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
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Strategic Goals
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#051449] tracking-tight">Five Key Objectives</h2>
            <p className="text-sm sm:text-base text-slate-600">
              The primary targets driving BTMT's operational divisions and community initiatives.
            </p>
          </div>

          <div className="space-y-4">
            {COMPANY_INFO.objectives.map((obj, idx) => (
              <div
                key={idx}
                className="p-5 border border-slate-200 bg-white hover:border-[#12A9DB] transition-colors flex items-start gap-4"
              >
                <div className="w-8 h-8 bg-[#CDEEF8] text-[#051449] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
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
      <section className="py-20 lg:py-24 bg-[#F6F8FA] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Organizational Values
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#051449] tracking-tight">Our Culture</h2>
            <p className="text-sm sm:text-base text-slate-600">
              The core principles that shape our workplace conduct, client relationships, and creative work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.cultureValues.map((val) => (
              <div
                key={val.title}
                className="p-6 bg-white border border-slate-200 space-y-2 shadow-xs"
              >
                <h3 className="text-base font-bold text-[#051449]">{val.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Proven Delivery
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#051449] tracking-tight">Why Choose BTMT</h2>
            <p className="text-sm sm:text-base text-slate-600">
              Six core commitments upheld across all technology, media, and production deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.whyChooseUs.map((item) => (
              <div key={item.title} className="p-5 border border-slate-200 space-y-2 bg-[#F8FAFC]">
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

      {/* SECTION 8: LEADERSHIP & FOUNDER PROFILE */}
      <section className="py-20 lg:py-24 bg-[#F6F8FA] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Corporate Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#051449] tracking-tight">Company Leadership</h2>
            <p className="text-sm text-slate-600">
              Guided by purpose, long-term vision, and ethical stewardship.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Natural Portrait Aspect Ratio for Founder Photograph */}
            <div className="w-36 sm:w-44 shrink-0 overflow-hidden bg-slate-900 border border-slate-200 shadow-sm relative aspect-[3/4]">
              <img
                src="https://ik.imagekit.io/019999great/headshot.jpeg"
                alt="Michael C. George, Founder of BTMT."
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <h3 className="text-2xl font-bold text-[#051449]">{COMPANY_INFO.founder}</h3>
                <div className="text-xs font-semibold text-[#12A9DB] mt-0.5 uppercase tracking-wider">
                  Founder & Managing Director, BTMT
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Founded BTMT in 2017 with the vision of establishing an authentic, morally grounded
                system for brand visibility, enterprise technology, and educational entertainment.
                Under his leadership, the organization was registered with the Corporate Affairs Commission (CAC)
                in 2022, expanding its operations to deliver cutting-edge technology and media solutions.
              </p>
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
                <span>Executive Director</span>
                <span className="text-[#051449] font-semibold">Blissful Touch Media & Technology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CLOSING CTA */}
      <section className="py-20 lg:py-24 bg-[#051449] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Let's Build Something Meaningful Together
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            Ready to establish authentic visibility and embrace sustainable technological and media
            growth? Let's discuss your project.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/book-service')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#051449] bg-white hover:bg-[#E32938] hover:text-white transition-colors inline-flex items-center gap-2"
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
