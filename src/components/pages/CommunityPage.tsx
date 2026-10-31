import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, Lock, Calendar, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { resources, trainings, currentUser, navigateTo, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleDownload = (resTitle: string, accessLevel: string) => {
    if (accessLevel === 'Registered Members' && !currentUser) {
      showToast('This resource requires a free Community Member account. Please log in or join.', 'info');
      navigateTo('/community/join');
      return;
    }
    // Simulate real file download
    const blob = new Blob([`BTMT Verified Publication: ${resTitle}\nCopyright © Blissful Touch Media & Technology\nAuthentic Visibility & Moral Excellence Standards.`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    a.click();
    showToast(`Downloading "${resTitle}"`, 'success');
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to BTMT Community Dispatch!', 'success');
  };

  return (
    <div className="w-full bg-white">
      {/* HERO / WELCOME */}
      <section className="py-16 lg:py-20 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-[#12A9DB] uppercase tracking-wider">
                <span>Knowledge Exchange · Network · Growth</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#051449] leading-tight">
                The BTMT Community Hub
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Be part of a thriving network that fosters creative exploration, technological literacy,
                and business growth through shared knowledge and moral excellence.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Access verified templates, practical guides, priority invitations to live masterclasses,
                and direct networking with creators and enterprise operators across Nigeria.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                {currentUser ? (
                  <button
                    onClick={() => navigateTo('/dashboard')}
                    className="px-6 py-3 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
                  >
                    <span>Enter Member Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigateTo('/community/join')}
                      className="px-6 py-3 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
                    >
                      <span>Join Our Community (Free)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('/login')}
                      className="px-6 py-3 text-xs font-semibold text-[#051449] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      Member Login
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-lg bg-slate-900 group">
                <div className="aspect-4/3 relative">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
                    alt="BTMT collaborative learning workshop"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051449]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono text-[#CDEEF8] bg-white/10 px-2 py-0.5 rounded">
                      Free Membership Access
                    </span>
                    <div className="text-sm font-bold text-white mt-1">
                      Monthly Workshops & Strategy Downloads
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP BENEFITS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            Member Privileges
          </div>
          <h2 className="text-3xl font-bold text-[#051449]">What You Gain as a Member</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Brand Development Insights', desc: 'Practical frameworks for refining your market positioning, corporate voice, and visual identity.' },
            { title: 'Business Growth Resources', desc: 'Downloadable templates, spreadsheets, and RFP guides to streamline your operational expansion.' },
            { title: 'Digital Skill Development Materials', desc: 'Curated technical tutorials on web management, mobile content creation, and search indexing.' },
            { title: 'Training Opportunities', desc: 'Priority access to live masterclasses, webinars, and interactive workshops hosted by BTMT.' },
            { title: 'Educational Content & Research', desc: 'Access to research publications examining ethical business models and technological innovation.' },
            { title: 'Community Announcements & Grants', desc: 'Early notices on enterprise opportunities, incubator programs, and collaborative projects.' }
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all space-y-2 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#12A9DB]" />
                <h3 className="text-base font-bold text-[#051449]">{benefit.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED RESOURCE LIBRARY */}
      <section className="py-20 bg-[#F6F8FA] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
                Resource Vault
              </div>
              <h2 className="text-3xl font-bold text-[#051449] mt-1">
                Learning Materials & Downloads
              </h2>
            </div>
            <div className="text-xs text-slate-500">
              Verified documents, templates, and strategy guides
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => {
              const isLocked = res.accessLevel === 'Registered Members' && !currentUser;
              return (
                <div
                  key={res.id}
                  className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#12A9DB]">{res.category}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        res.accessLevel === 'Public'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {res.accessLevel}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#051449]">{res.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {res.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-2">
                      <span>Format: {res.fileFormat}</span>
                      <span>Size: {res.fileSize}</span>
                      <span>{res.downloadCount} downloads</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Published {res.publishedAt}</span>
                    <button
                      onClick={() => handleDownload(res.title, res.accessLevel)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                        isLocked
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-[#051449] text-white hover:bg-[#081e6a]'
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Member Login to Download</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download {res.fileFormat}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* UPCOMING TRAININGS & ANNOUNCEMENTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            Live Sessions
          </div>
          <h2 className="text-3xl font-bold text-[#051449]">Upcoming Training Masterclasses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trainings.map((trn) => (
            <div
              key={trn.id}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                    {trn.status}
                  </span>
                  <span className="text-slate-600 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                    {trn.accessRequirement}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#051449] leading-snug">{trn.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{trn.description}</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-3.5 bg-[#F6F8FA] rounded-xl text-xs space-y-1.5 font-mono text-slate-700 border border-slate-100">
                  <div className="flex items-center gap-2 text-[#051449] font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#12A9DB]" />
                    <span>{trn.date} · {trn.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>Lead: <strong className="text-slate-800">{trn.instructor}</strong></span>
                    <span className="text-[#12A9DB] font-semibold">{trn.format}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!currentUser) {
                      navigateTo('/community/join');
                    } else {
                      showToast('You are registered for this training session!', 'success');
                    }
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors text-center shadow-xs"
                >
                  {currentUser ? 'Confirm Attendance' : 'Register for Session'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION */}
      <section className="py-20 bg-[#051449] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Subscribe to the BTMT Community Dispatch
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Stay informed with our monthly digests covering authentic visibility strategy, enterprise
            tools, and upcoming creative initiatives.
          </p>

          {subscribed ? (
            <div className="p-4 bg-emerald-900/50 border border-emerald-500 rounded-lg text-xs font-medium text-emerald-200">
              You are now subscribed. Welcome to the BTMT dispatch!
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 text-xs bg-white text-slate-900 rounded-lg focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-[#051449] bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
