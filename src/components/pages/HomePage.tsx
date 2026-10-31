import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO, INITIAL_PORTFOLIO } from '../../data/initialData';
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { services, products, blogPosts, navigateTo } = useApp();

  // Selected 6 featured services for Section 4
  const featuredServiceSlugs = [
    'website-development',
    'software-development',
    'digital-marketing-advertising',
    'branding',
    'printing-publishing',
    'event-coverage'
  ];

  const featuredServices = featuredServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // Fallback to first 6 if slugs differ
  const servicesToDisplay = featuredServices.length >= 6 ? featuredServices : services.slice(0, 6);

  // Curated imagery directly relevant to the 6 featured services
  const serviceImages: Record<string, string> = {
    'website-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'software-development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'digital-marketing-advertising': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'branding': 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    'printing-publishing': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    'event-coverage': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'
  };

  const featuredBlog = blogPosts.find((b) => b.featured) || blogPosts[0];
  const supportingBlogs = blogPosts.filter((b) => b.id !== featuredBlog?.id).slice(0, 2);

  const publishedProducts = products.slice(0, 4);

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* =========================================================================
          SECTION 1 — IMMERSIVE WELCOME HERO (Rialto Architectural Style)
          ========================================================================= */}
      <section className="relative w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
          {/* Top Brand Tag & Official Slogan */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-10 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-widest">
            <span className="font-bold text-[#051449]">
              BLISSFUL TOUCH MEDIA & TECHNOLOGY
            </span>
            <span className="normal-case text-slate-600 font-normal italic">
              "{COMPANY_INFO.slogan}"
            </span>
          </div>

          {/* Main Headline & Supporting Text Composition */}
          <div className="pt-12 pb-12 max-w-4xl space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-bold text-[#051449] tracking-tight leading-[1.08]">
              Building Authentic Visibility. Creating Lasting Impact.
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-3xl">
              From website and software development to branding, digital marketing, media
              production and entertainment, we create solutions that help businesses strengthen
              their visibility, improve productivity and achieve meaningful growth.
            </p>

            {/* Restrained Architectural CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('/services')}
                className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors duration-300 flex items-center gap-2 group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigateTo('/about')}
                className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#051449] border border-slate-300 hover:border-[#051449] hover:bg-slate-50 transition-colors duration-300"
              >
                About BTMT
              </button>
            </div>
          </div>
        </div>

        {/* Wide Full-Bleed Architectural Hero Photography */}
        <div className="w-full relative aspect-21/9 min-h-[380px] lg:min-h-[520px] bg-slate-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85"
            alt="Blissful Touch Media & Technology creative production and engineering environment"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-12 text-white">
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
              Technology · Media · Entertainment
            </div>
            <div className="text-sm sm:text-base font-bold text-white tracking-wide mt-1">
              Owerri, Imo State · Nationwide Delivery
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — WHO WE ARE (White Editorial Introduction)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Confident Editorial Typography */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] tracking-tight leading-tight">
                A Partner in Technology, Media and Creative Innovation
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                Blissful Touch Media & Technology is committed to helping businesses, brands and
                organizations achieve authentic visibility, sustainable growth and meaningful impact
                through professional technology, media and entertainment solutions.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Founded in 2017 by Michael C. George and CAC registered, our multidisciplinary team
                bridges technical rigour with artistic precision—delivering enterprise digital platforms,
                high-visibility brand systems, commercial print solutions, and immersive productions.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/about')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#051449] hover:text-[#E32938] transition-colors py-2 border-b-2 border-[#051449] hover:border-[#E32938]"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Architectural Edge-to-Edge Photographic Presentation */}
            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 bg-slate-900 overflow-hidden shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=80"
                  alt="BTMT creative team strategy and software design"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Corporate Strategy & Operations</span>
                <span>Est. 2017</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — THREE CORE DIVISIONS (Photography-Dominated Compositions)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] tracking-tight">
              Three Distinct Divisions
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Unified under one ethical standard of excellence, our operations are structured into
              three specialized pillars.
            </p>
          </div>

          {/* Three Expansive Editorial Compositions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Division 1: Technology */}
            <div className="bg-white border border-slate-200 flex flex-col justify-between group">
              <div className="aspect-16/10 relative overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
                  alt="BTMT Technology Division"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#051449] text-white px-3 py-1">
                    Division 01
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#051449]">Technology</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Innovative digital solutions that improve productivity and support business growth.
                    Encompassing custom web applications, mobile platforms, enterprise software, and cloud architecture.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => navigateTo('/services')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#12A9DB] hover:text-[#051449] transition-colors"
                  >
                    <span>Explore Technology</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Division 2: Media */}
            <div className="bg-white border border-slate-200 flex flex-col justify-between group">
              <div className="aspect-16/10 relative overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80"
                  alt="BTMT Media Division"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E32938] text-white px-3 py-1">
                    Division 02
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#051449]">Media</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Professional creative services that strengthen visibility and help brands connect
                    with audiences. Including commercial videography, branding, marketing, and commercial print.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => navigateTo('/services')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E32938] hover:text-[#051449] transition-colors"
                  >
                    <span>Explore Media</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Division 3: Entertainment */}
            <div className="bg-white border border-slate-200 flex flex-col justify-between group">
              <div className="aspect-16/10 relative overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80"
                  alt="BTMT Entertainment Division"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#51217C] text-white px-3 py-1">
                    Division 03
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#051449]">Entertainment</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Creative experiences and original storytelling that educate, inspire and engage.
                    Specializing in film production, scriptwriting, podcast broadcasting, and talent elevation.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => navigateTo('/services')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#51217C] hover:text-[#051449] transition-colors"
                  >
                    <span>Explore Entertainment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — FEATURED SERVICES (Rialto Alternating Editorial Layout)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                Core Offerings
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] tracking-tight mt-2">
                Featured Services
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/services')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#051449] hover:text-[#E32938] transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Alternating Editorial Rows with Photography & Dividers */}
          <div className="divide-y divide-slate-200">
            {servicesToDisplay.map((service, index) => {
              const isEven = index % 2 === 1;
              const photoUrl =
                serviceImages[service.slug] ||
                service.imageUrl ||
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';

              return (
                <div
                  key={service.id}
                  className="py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Photo Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="aspect-16/9 relative bg-slate-900 overflow-hidden group">
                      <img
                        src={photoUrl}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#051449] px-3 py-1">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div
                    className={`lg:col-span-5 space-y-5 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-slate-400">
                      0{index + 1} / 06
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#051449] leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {service.shortDescription || service.headline}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => navigateTo('/services/:slug', { slug: service.slug })}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#051449] hover:text-[#E32938] transition-colors py-2 border-b border-[#051449] hover:border-[#E32938]"
                      >
                        <span>Learn More About {service.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-12 text-center border-t border-slate-200">
            <button
              onClick={() => navigateTo('/services')}
              className="px-10 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors duration-300"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — BRAND STATEMENT (Architectural Typographic Statement)
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#F0F8FC] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
            Guiding Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#051449] tracking-tight leading-tight">
            Creativity, Innovation and Ethical Excellence
          </h2>
          <p className="text-lg sm:text-2xl text-slate-700 font-light leading-relaxed max-w-3xl mx-auto">
            "We believe meaningful visibility is built through thoughtful creativity, professional
            execution, integrity and a commitment to lasting value."
          </p>
          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono uppercase tracking-wider text-slate-500">
            <span>Blissful Touch Media & Technology</span>
            <span>·</span>
            <span>Charter Declaration</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — SELECTED WORK AND CAPABILITIES (Photography Showcase)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                Portfolio & Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] tracking-tight mt-2">
                Selected Work & Capabilities
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/services')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#051449] hover:text-[#E32938] transition-colors"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Large Work + Supporting Grid */}
          <div className="space-y-10">
            {/* Primary Featured Showcase */}
            {INITIAL_PORTFOLIO[0] && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F8FAFC] border border-slate-200 p-6 lg:p-10">
                <div className="lg:col-span-8 aspect-16/9 bg-slate-900 overflow-hidden">
                  <img
                    src={INITIAL_PORTFOLIO[0].imageUrl}
                    alt={INITIAL_PORTFOLIO[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-4 space-y-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#12A9DB]">
                    {INITIAL_PORTFOLIO[0].category} · Illustrative Capability
                  </div>
                  <h3 className="text-2xl font-bold text-[#051449] leading-snug">
                    {INITIAL_PORTFOLIO[0].title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {INITIAL_PORTFOLIO[0].description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {INITIAL_PORTFOLIO[0].servicesDelivered.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2.5 py-1 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Supporting 2-Column Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {INITIAL_PORTFOLIO.slice(1, 3).map((item) => (
                <div key={item.id} className="bg-[#F8FAFC] border border-slate-200 p-6 space-y-4">
                  <div className="aspect-16/10 bg-slate-900 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#12A9DB]">
                    {item.category} · Capability Showcase
                  </div>
                  <h4 className="text-xl font-bold text-[#051449]">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — WHY CHOOSE BTMT (Editorial Split with Verified Strengths)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Large Relevant Professional Photograph */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="aspect-3/4 bg-slate-900 overflow-hidden border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
                  alt="BTMT professional standards and delivery"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white border border-t-0 border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Verified Corporate Strengths</span>
                <span>BTMT Standards</span>
              </div>
            </div>

            {/* Right: Structured Text List with Typography & Separators (No Cards!) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                  Our Commitment
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] tracking-tight">
                  Why Choose BTMT
                </h2>
                <p className="text-base text-slate-600 font-normal">
                  Six foundational commitments upheld across every technology, media, and creative
                  production deliverable.
                </p>
              </div>

              {/* Clean Structured List with Hairline Dividers */}
              <div className="divide-y divide-slate-200 border-y border-slate-200">
                {[
                  {
                    num: '01',
                    title: 'Efficient Service Delivery',
                    desc: 'Streamlined operational workflows that ensure every deliverable is executed with optimal productivity and high technical quality.'
                  },
                  {
                    num: '02',
                    title: 'Creativity and Innovation',
                    desc: 'Forward-thinking design and engineering approaches that keep your brand distinct, modern, and competitive in evolving markets.'
                  },
                  {
                    num: '03',
                    title: 'Timely Delivery',
                    desc: 'Clear milestone scheduling and disciplined execution to ensure projects launch according to plan and agreed timelines.'
                  },
                  {
                    num: '04',
                    title: 'Excellence',
                    desc: 'Uncompromising attention to detail across software architecture, brand guidelines, visual media, and customer support.'
                  },
                  {
                    num: '05',
                    title: 'Integrity',
                    desc: 'Moral and ethical excellence in all transactions, transparent communication, and authentic stewardship of your brand vision.'
                  },
                  {
                    num: '06',
                    title: 'Premium Customer Satisfaction',
                    desc: 'Dedicated client success focus, post-launch technical assistance, and long-term partnership building.'
                  }
                ].map((item) => (
                  <div key={item.num} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline">
                    <div className="sm:col-span-2 text-sm font-mono font-bold text-[#12A9DB]">
                      {item.num}
                    </div>
                    <div className="sm:col-span-4">
                      <h3 className="text-lg font-bold text-[#051449]">{item.title}</h3>
                    </div>
                    <div className="sm:col-span-6 text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — MARKETPLACE PREVIEW (Retail Editorial Feature)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                Curated Commerce
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] tracking-tight mt-2">
                Discover Products From Growing Brands
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/marketplace')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#051449] hover:text-[#E32938] transition-colors"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Clean Retail Editorial Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {publishedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigateTo('/marketplace/:slug', { slug: product.slug })}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-slate-100 overflow-hidden border border-slate-200 relative mb-4">
                    <img
                      src={
                        product.imageUrl ||
                        'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=600&q=80'
                      }
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white text-[#051449] px-2 py-0.5">
                      {product.category}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                      {product.brand}
                    </div>
                    <h3 className="text-base font-bold text-[#051449] group-hover:text-[#12A9DB] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="font-bold text-[#051449] font-mono">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#12A9DB] group-hover:underline">
                    View →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — COMMUNITY (Distinctive Human-Focused Section)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: One Large Photograph Showing Professional Learning / Gathering */}
            <div className="lg:col-span-7">
              <div className="aspect-16/10 bg-slate-900 overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80"
                  alt="BTMT Community Learning and Workshop Gathering"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-white border border-t-0 border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Collaborative Learning & Network</span>
                <span>Active Member Hub</span>
              </div>
            </div>

            {/* Right: Editorial Narrative & Action */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                BTMT Community
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] tracking-tight leading-tight">
                Grow With a Community Built for Progress
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                Join a community dedicated to meaningful learning, valuable resources, brand
                development and access to opportunities that support personal and business growth.
              </p>
              <div className="space-y-3 pt-2 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#12A9DB] shrink-0" />
                  <span>Free access to verified business templates and strategy guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#12A9DB] shrink-0" />
                  <span>Priority invitations to quarterly masterclasses and tech webinars</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#12A9DB] shrink-0" />
                  <span>Peer collaboration and industry updates across Nigeria</span>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => navigateTo('/community')}
                  className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors duration-300"
                >
                  Join Our Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — BLOG (Editorial Publication Style)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                Editorial Desk
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051449] tracking-tight mt-2">
                Read Our Insights
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/blog')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#051449] hover:text-[#E32938] transition-colors"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 1 Prominent Featured Article + 2 Supporting Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Featured Article */}
            {featuredBlog && (
              <div
                onClick={() => navigateTo('/blog/:slug', { slug: featuredBlog.slug })}
                className="lg:col-span-7 group cursor-pointer space-y-5"
              >
                <div className="aspect-16/10 bg-slate-900 overflow-hidden border border-slate-200">
                  <img
                    src={
                      featuredBlog.imageUrl ||
                      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt={featuredBlog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span className="font-bold text-[#12A9DB] uppercase tracking-wider">
                      {featuredBlog.category}
                    </span>
                    <span>·</span>
                    <span>{featuredBlog.publishedAt}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredBlog.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#051449] group-hover:text-[#12A9DB] transition-colors leading-snug">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="pt-2 text-xs font-bold uppercase tracking-wider text-[#051449] group-hover:text-[#E32938] inline-flex items-center gap-1.5">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            )}

            {/* 2 Supporting Articles */}
            <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-slate-200">
              {supportingBlogs.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigateTo('/blog/:slug', { slug: post.slug })}
                  className="py-6 first:pt-0 last:pb-0 group cursor-pointer space-y-3"
                >
                  <div className="aspect-16/9 bg-slate-900 overflow-hidden border border-slate-200 mb-3">
                    <img
                      src={
                        post.imageUrl ||
                        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'
                      }
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    <span className="text-[#12A9DB] font-bold">{post.category}</span>
                    <span>·</span>
                    <span>{post.publishedAt}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#051449] group-hover:text-[#12A9DB] transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#051449] group-hover:text-[#E32938] inline-flex items-center gap-1">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — FINAL CONTACT SECTION (Strong Architectural Call to Action)
          ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#051449] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
            Start a Conversation
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Have a Project in Mind?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Let's discuss how BTMT can help bring your ideas to life through thoughtful technology,
            authentic media, and purposeful storytelling.
          </p>
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => navigateTo('/book-service')}
              className="px-10 py-4 text-xs font-bold uppercase tracking-wider text-[#051449] bg-white hover:bg-[#E32938] hover:text-white transition-colors duration-300 shadow-md"
            >
              Let's Get Started
            </button>
            <button
              onClick={() => navigateTo('/contact')}
              className="px-10 py-4 text-xs font-bold uppercase tracking-wider text-white border border-slate-600 hover:border-white transition-colors duration-300"
            >
              Contact Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
