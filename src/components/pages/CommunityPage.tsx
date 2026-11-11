import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ExternalLink, Info, AlertCircle } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { communityInviteUrl, currentUser, navigateTo } = useApp();
  const [showNotice, setShowNotice] = useState(false);

  const hasValidLink = Boolean(
    communityInviteUrl &&
      communityInviteUrl.trim().startsWith('https://')
  );

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* INTRODUCTORY HERO & INVITATION SECTION */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#F6F8FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading, Supporting Description & Primary CTA */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#051449] tracking-tight leading-tight">
                Join the BTMT Community
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                <p>
                  Connect with a growing community of entrepreneurs, creatives, professionals and
                  individuals interested in technology, media, business development and meaningful
                  opportunities.
                </p>
                <p>
                  Through our community, we aim to encourage learning, share valuable information,
                  promote collaboration and support personal and professional growth.
                </p>
              </div>

              {/* Concise Explanation of the Community & Why to Join */}
              <div className="pt-2 border-t border-slate-200/80 space-y-3">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Whether you are launching a digital platform, producing creative media, or seeking peers who value moral and ethical excellence, our community provides an open environment to exchange practical ideas, stay informed on industry updates, and discover collaborative partnerships.
                </p>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-4 space-y-4">
                {hasValidLink ? (
                  <a
                    href={communityInviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors inline-flex items-center gap-2.5 shadow-xs"
                  >
                    <span>Join Our Community</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <div>
                    <button
                      onClick={() => setShowNotice(true)}
                      className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors inline-flex items-center gap-2.5 shadow-xs"
                    >
                      <span>Join Our Community</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {showNotice && (
                      <div className="mt-4 p-4 bg-white border border-slate-300 text-xs text-slate-700 space-y-2 max-w-lg">
                        <div className="flex items-start gap-2.5 text-[#051449] font-medium">
                          <Info className="w-4 h-4 text-[#12A9DB] shrink-0 mt-0.5" />
                          <span>The community invitation link will be available soon. Please check back shortly or contact our team directly for invitation details.</span>
                        </div>
                        {currentUser?.role === 'admin' && (
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="text-slate-500">Administrator access active</span>
                            <button
                              onClick={() => navigateTo('/admin')}
                              className="text-[#12A9DB] font-semibold hover:underline"
                            >
                              Configure Community Link →
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Photography-Led Collaboration Image */}
            <div className="lg:col-span-5">
              <div className="border border-slate-200 overflow-hidden shadow-sm bg-slate-900 group">
                <div className="aspect-4/3 relative">
                  <img
                    src="/assets/images/community-page.jpg"
                    alt="African creative and technology professionals collaborating"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051449]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-white leading-snug">
                      Collaborative Learning, Media & Technology Exchange
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white border border-t-0 border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>BTMT Network</span>
                <span>Community Hub</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
