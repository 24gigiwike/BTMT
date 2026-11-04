import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { services, routeParams, navigateTo, setSelectedServiceForBooking } = useApp();

  const service = services.find((s) => s.slug === routeParams.slug) || services[0];

  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  const handleBookNow = () => {
    setSelectedServiceForBooking(service.id);
    navigateTo('/book-service');
  };

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* BREADCRUMB & BACK BUTTON */}
      <div className="border-b border-slate-100 bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigateTo('/services')}
            className="text-xs font-semibold text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </button>
        </div>
      </div>

      {/* HERO SECTION WITH AUTHENTIC DOMAIN PHOTOGRAPHY */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-[#F6F8FA] to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#051449] bg-[#CDEEF8] px-3 py-1 rounded-md">
                <span>{service.category} Division</span>
                <span>·</span>
                <span>BTMT Enterprise</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] leading-tight">
                {service.title}
              </h1>

              <div className="text-lg font-medium text-slate-700 italic border-l-2 border-[#12A9DB] pl-4">
                "{service.headline}"
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleBookNow}
                  className="px-7 py-3.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#071b63] rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="px-6 py-3.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Speak with an Engineer
                </button>
              </div>
            </div>

            {/* Right Photo Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3 bg-slate-900 group">
                <img
                  src={service.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80'}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051449]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold">
                  BTMT Verified Production Standard · Nationwide Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS & BENEFITS GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Scope of Offerings */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#12A9DB]">
                What We Deliver
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#051449] mt-1">
                Core Scope of Deliverables
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {service.offerings.map((offering, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#12A9DB]/60 transition-colors flex items-start gap-3 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#12A9DB] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-800 leading-snug">
                    {offering}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Customer Benefits */}
          <div className="lg:col-span-5 bg-[#F6F8FA] p-8 rounded-2xl border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#12A9DB]">
                Measurable Value
              </span>
              <h3 className="text-xl font-bold text-[#051449] mt-1">Benefits to Your Brand</h3>
            </div>
            <ul className="space-y-4">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#E32938] shrink-0 mt-2" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WORKFLOW PROCESS */}
      <section className="py-20 bg-[#F6F8FA] border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#12A9DB]">
              Engagement Sequence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#051449]">
              How We Execute Your Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs"
              >
                <div className="text-xs font-mono font-bold text-[#12A9DB]">
                  STEP {step.step}
                </div>
                <h3 className="text-base font-bold text-[#051449]">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#12A9DB]">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#051449]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#12A9DB] shrink-0 mt-0.5" />
                  <h3 className="text-base font-bold text-[#051449]">{faq.question}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-[#F6F8FA] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#12A9DB]">
                  Explore Further
                </span>
                <h2 className="text-xl font-bold text-[#051449] mt-0.5">
                  Related Offerings in {service.category}
                </h2>
              </div>
              <button
                onClick={() => navigateTo('/services')}
                className="text-xs font-semibold text-[#051449] hover:underline"
              >
                View All Services
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="aspect-16/10 relative overflow-hidden bg-slate-900">
                    <img
                      src={rel.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-[#051449]">{rel.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => navigateTo('/services/:slug', { slug: rel.slug })}
                        className="text-xs font-semibold text-[#12A9DB] hover:underline flex items-center gap-1"
                      >
                        <span>Read Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM BOOKING ACTION BANNER */}
      <section className="py-20 bg-[#051449] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Ready to Begin with {service.title}?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Submit your project parameters and our team will review the technical and creative
            requirements to provide a detailed engagement scope.
          </p>
          <div className="pt-2">
            <button
              onClick={handleBookNow}
              className="px-8 py-3.5 text-xs font-semibold text-white bg-[#E32938] hover:bg-[#c9202e] rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <span>{service.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
