import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import {
  Code,
  Video,
  Film,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Users,
  ChevronRight,
  ShoppingBag,
  BookOpen
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, services, products, blogPosts, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Thank you for subscribing to BTMT Community updates!', 'success');
  };

  const featuredServices = services.filter((s) => s.featured).slice(0, 6);
  const featuredProducts = products.slice(0, 4);
  const recentArticles = blogPosts.filter((b) => b.isPublished).slice(0, 3);

  return (
    <div className="w-full bg-white">
      {/* SECTION 1: HERO / WELCOME */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#051449] bg-[#CDEEF8]/60 px-3 py-1.5 rounded-md border border-[#12A9DB]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12A9DB]" />
                Welcome to Blissful Touch Media & Technology
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#051449] leading-[1.12]">
                Building Authentic Visibility. Creating Lasting Impact.
              </h1>

              <p className="text-base sm:text-lg text-[#242A35] leading-relaxed max-w-2xl">
                From cutting-edge website and mobile application development to strategic branding,
                digital marketing, media production, and brand visibility solutions, we provide
                the expertise and innovation businesses need to strengthen their presence,
                increase productivity, and create lasting impact.
              </p>

              {/* Slogan pill banner */}
              <div className="py-2.5 px-4 bg-[#F6F8FA] border-l-2 border-[#12A9DB] rounded-r-md text-xs text-slate-700 font-medium">
                <span className="text-[#051449] font-semibold">Official Slogan:</span>{' '}
                "{COMPANY_INFO.slogan}"
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('/services')}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('/contact')}
                  className="px-6 py-3.5 text-sm font-semibold text-[#051449] bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 rounded-lg transition-colors"
                >
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Visual Composition */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-br from-[#051449] to-[#0a2578] p-8 text-white shadow-xl overflow-hidden border border-[#12A9DB]/30">
                {/* Background architectural geometric lines */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                    <circle cx="200" cy="200" r="160" stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="200" cy="200" r="100" stroke="#12A9DB" strokeWidth="1.5" />
                    <line x1="0" y1="200" x2="400" y2="200" stroke="#FFFFFF" strokeWidth="0.5" />
                    <line x1="200" y1="0" x2="200" y2="400" stroke="#FFFFFF" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#12A9DB]">
                      Multidisciplinary Agency
                    </span>
                    <span className="text-xs text-slate-300 font-mono">EST. 2017</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                      <div className="text-xs font-semibold text-[#CDEEF8] uppercase tracking-wider">
                        Technology Hub
                      </div>
                      <div className="text-sm font-medium mt-1 text-white">
                        Web Applications, Systems Architecture & Mobile Solutions
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                      <div className="text-xs font-semibold text-[#CDEEF8] uppercase tracking-wider">
                        Media & Publishing
                      </div>
                      <div className="text-sm font-medium mt-1 text-white">
                        Brand Identity, High-Grade Print, Digital Marketing & Event Coverage
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                      <div className="text-xs font-semibold text-[#CDEEF8] uppercase tracking-wider">
                        Creative Entertainment
                      </div>
                      <div className="text-sm font-medium mt-1 text-white">
                        Original Scriptwriting, Film Projects & Purposeful Podcasts
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
                    <span>Owerri, Imo State, Nigeria</span>
                    <button
                      onClick={() => navigateTo('/about')}
                      className="text-[#12A9DB] hover:text-white font-medium flex items-center gap-1"
                    >
                      <span>Read Our Story</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRODUCTION / WHO WE ARE */}
      <section className="py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="p-8 bg-white rounded-xl border border-slate-200 shadow-xs space-y-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                  Company Purpose & Foundations
                </div>
                <h3 className="text-2xl font-bold text-[#051449]">
                  Rooted in Integrity. Driven by Excellence.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Founded in 2017 by Michael C. George, BTMT was established on the conviction
                  that sustainable commercial visibility must be anchored in authentic quality
                  and moral excellence.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-left">
                  <div>
                    <div className="text-2xl font-bold text-[#051449]">2017</div>
                    <div className="text-xs text-slate-500 mt-0.5">Founded</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#051449]">CAC</div>
                    <div className="text-xs text-slate-500 mt-0.5">Registered Entity</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Introduction
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#051449]">
                Your Partner in Technology, Media and Creative Innovation
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Blissful Touch Media & Technology is a multidisciplinary company dedicated to
                helping businesses, brands, and organizations establish meaningful visibility,
                embrace innovation, and achieve sustainable growth.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Through our technology, media, and entertainment solutions, we combine creativity,
                professional expertise, and ethical excellence to deliver products and services
                that make a tangible difference.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/about')}
                  className="text-sm font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1.5 transition-colors group"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR CORE AREAS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Core Disciplines
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#051449]">
              Three Pillars of Integrated Excellence
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              We seamlessly connect technical infrastructure, visual storytelling, and creative
              narratives under one unified corporate partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Area 1: Technology */}
            <div className="p-8 rounded-xl bg-white border border-slate-200 hover:border-[#12A9DB]/50 transition-all shadow-xs flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#CDEEF8]/60 text-[#051449] flex items-center justify-center">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#051449]">Technology</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Digital solutions that help businesses operate efficiently, build stronger
                  online experiences, and embrace modern technical innovation.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <button
                  onClick={() => navigateTo('/services')}
                  className="text-xs font-semibold text-[#051449] group-hover:text-[#12A9DB] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explore Technology</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Area 2: Media */}
            <div className="p-8 rounded-xl bg-white border border-slate-200 hover:border-[#12A9DB]/50 transition-all shadow-xs flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#CDEEF8]/60 text-[#051449] flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#051449]">Media</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Creative communication and visibility solutions that help brands connect with
                  audiences, communicate values, and establish a lasting presence.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <button
                  onClick={() => navigateTo('/services')}
                  className="text-xs font-semibold text-[#051449] group-hover:text-[#12A9DB] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explore Media</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Area 3: Entertainment */}
            <div className="p-8 rounded-xl bg-white border border-slate-200 hover:border-[#12A9DB]/50 transition-all shadow-xs flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#CDEEF8]/60 text-[#051449] flex items-center justify-center">
                  <Film className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#051449]">Entertainment</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Original storytelling and creative productions that educate, inspire, engage,
                  and entertain with an emphasis on moral and ethical standards.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <button
                  onClick={() => navigateTo('/services')}
                  className="text-xs font-semibold text-[#051449] group-hover:text-[#12A9DB] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explore Entertainment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED SERVICES */}
      <section className="py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#051449] mt-1">
                Featured Professional Services
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/services')}
              className="text-sm font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1 whitespace-nowrap self-start md:self-auto"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((srv, idx) => (
              <div
                key={srv.id}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{srv.category}</span>
                    <span className="font-mono text-slate-400">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#051449]">{srv.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {srv.shortDescription}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6">
                  <button
                    onClick={() => navigateTo('/services/:slug', { slug: srv.slug })}
                    className="text-xs font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE BTMT? */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Our Difference
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#051449]">
              Built on Creativity, Integrity and Excellence
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              We combine professional expertise, thoughtful creativity, and a commitment to
              ethical excellence to deliver solutions that create measurable value for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMPANY_INFO.whyChooseUs.map((strength) => (
              <div key={strength.title} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#12A9DB]" />
                  <h3 className="text-base font-bold text-[#051449]">{strength.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-4">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR APPROACH */}
      <section className="py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
              Engagement Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#051449]">
              A Methodical, Collaborative Workflow
            </h2>
            <p className="text-base text-slate-700">
              Clear communication, predictable milestones, and dependable execution from initial
              discovery to long-term post-launch support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {COMPANY_INFO.approachStages.map((stage) => (
              <div
                key={stage.step}
                className="p-6 bg-white rounded-xl border border-slate-200 space-y-3"
              >
                <div className="text-xs font-mono font-bold text-[#12A9DB]">
                  STAGE {stage.step}
                </div>
                <h3 className="text-base font-bold text-[#051449]">{stage.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FEATURED WORK / PORTFOLIO PREVIEW */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Execution Quality
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#051449] mt-1">
                Selected Work & Client Initiatives
              </h2>
            </div>
            <div className="text-xs text-slate-500">
              Verified corporate deliveries & practice projects
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-[#12A9DB]/50 transition-all flex flex-col justify-between">
              <div className="p-6 space-y-3">
                <div className="text-xs text-[#12A9DB] font-medium">Technology & Web</div>
                <h3 className="text-lg font-bold text-[#051449]">
                  Corporate Diagnostics Portal
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Architecture, development, and appointment booking workflow for a healthcare
                  diagnostic center in southeastern Nigeria.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  Services Delivered: Full-Stack Web Development, SSL Security, SEO Architecture.
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-[#12A9DB]/50 transition-all flex flex-col justify-between">
              <div className="p-6 space-y-3">
                <div className="text-xs text-[#12A9DB] font-medium">Media & Branding</div>
                <h3 className="text-lg font-bold text-[#051449]">
                  Institutional Visual Identity & Stationery
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete identity rebranding, stationery package, and brand governance manual
                  for a commercial legal consultancy.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  Services Delivered: Brand Strategy, Logo Guidelines, Offset Commercial Printing.
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-[#12A9DB]/50 transition-all flex flex-col justify-between">
              <div className="p-6 space-y-3">
                <div className="text-xs text-[#12A9DB] font-medium">Media & Event Coverage</div>
                <h3 className="text-lg font-bold text-[#051449]">
                  Regional Leadership Summit Documentation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-camera 4K coverage, live streaming to global stakeholders, and daily
                  editorial recap clips for a 3-day enterprise summit.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  Services Delivered: Event Videography, Live Streaming, High-Resolution Photography.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: MARKETPLACE PREVIEW */}
      <section className="py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                BTMT Marketplace
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#051449] mt-1">
                Discover Products From Growing Brands
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore a curated selection of products from businesses and brands within our
                network.
              </p>
            </div>
            <button
              onClick={() => navigateTo('/marketplace')}
              className="text-sm font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium text-slate-700">{prod.brand}</span>
                    <span className="text-emerald-700 font-medium">In Stock</span>
                  </div>
                  <h3 className="text-base font-bold text-[#051449] line-clamp-2">
                    {prod.name}
                  </h3>
                  <div className="text-lg font-bold text-[#051449] font-mono tabular-nums">
                    ₦{prod.price.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {prod.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <button
                    onClick={() => navigateTo('/marketplace/:slug', { slug: prod.slug })}
                    className="text-xs font-semibold text-[#051449] hover:text-[#12A9DB]"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigateTo('/marketplace/:slug', { slug: prod.slug })}
                    className="p-1.5 rounded-md bg-slate-100 hover:bg-[#051449] hover:text-white transition-colors text-slate-700"
                    aria-label={`Buy ${prod.name}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: INSIGHTS AND ARTICLES (BLOG) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Editorial Desk
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#051449] mt-1">
                Ideas, Insights and Updates
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/blog')}
              className="text-sm font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
            >
              <span>Visit Our Blog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#12A9DB]">{article.category}</span>
                    <span>·</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#051449] leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">{article.readTime}</span>
                  <button
                    onClick={() => navigateTo('/blog/:slug', { slug: article.slug })}
                    className="font-semibold text-[#051449] hover:text-[#12A9DB] inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: JOIN OUR COMMUNITY */}
      <section className="py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                  The BTMT Network
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#051449]">
                  Grow With a Community Built for Progress
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  Join the BTMT community to discover valuable insights, learning opportunities,
                  practical resources, and information that can help you grow your brand, develop
                  your skills, and explore new opportunities.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => navigateTo('/community/join')}
                    className="px-6 py-3 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors"
                  >
                    Join Our Community
                  </button>
                  <button
                    onClick={() => navigateTo('/community')}
                    className="px-6 py-3 text-xs font-semibold text-[#051449] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Explore Public Resources
                  </button>
                </div>
              </div>

              {/* Newsletter subscription form */}
              <div className="lg:col-span-5 bg-[#F6F8FA] p-6 rounded-xl border border-slate-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#051449]">
                  Subscribe to Updates
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Receive curated articles, event notices, and business growth insights directly.
                </p>
                {newsletterSubscribed ? (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800">
                    Thank you! You have been successfully subscribed to BTMT updates.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-3">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2.5 text-xs font-semibold text-white bg-[#12A9DB] hover:bg-[#0e8eb8] rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                    <div className="text-[11px] text-slate-500">
                      We respect your privacy. Unsubscribe anytime.
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section className="py-20 bg-[#051449] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Have a Project in Mind?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you are launching a new brand, expanding your digital presence, or exploring
            a creative media idea, we would love to hear from you.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('/book-service')}
              className="px-8 py-3.5 text-sm font-semibold text-[#051449] bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors"
            >
              Let's Get Started
            </button>
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-3.5 text-sm font-semibold text-white border border-slate-500 hover:bg-white/10 rounded-lg transition-colors"
            >
              Contact Head Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
