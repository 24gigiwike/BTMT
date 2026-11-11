import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContactForm } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    submitContactForm({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      subject: subject.trim(),
      message: message.trim()
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-[#242A35]">
      {/* HEADER SECTION (Rialto Editorial Light Format) */}
      <section className="py-16 lg:py-24 bg-[#F6F8FA] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
            Reach Out Directly
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#051449] tracking-tight">
            Let's Start a Conversation
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto font-normal">
            Have a question, project idea, or business enquiry? Reach out to Blissful Touch Media &
            Technology. We welcome your correspondence.
          </p>
        </div>
      </section>

      {/* CONTACT DETAILS & FORM */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Official Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB]">
                Our Location
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-[#051449] tracking-tight mt-1">
                Office & Communications
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Connect with our team for consultations, technical support, project onboarding, and general enquiries.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              {/* Strictly labeled as Office Address */}
              <div className="p-5 bg-white border border-slate-200 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#12A9DB] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#051449] uppercase tracking-wider text-xs">
                    Office Address
                  </div>
                  <div className="mt-1 leading-relaxed text-sm text-slate-800">
                    43/45 MCC Road by PACs Junction, Owerri, Imo State, Nigeria.
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border border-slate-200 flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#12A9DB] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#051449] uppercase tracking-wider text-xs">Direct Line</div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="mt-1 block font-semibold text-slate-800 hover:text-[#12A9DB] transition-colors text-sm"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="p-5 bg-white border border-slate-200 flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#12A9DB] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#051449] uppercase tracking-wider text-xs">Official Email</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="mt-1 block font-semibold text-slate-800 hover:text-[#12A9DB] transition-colors text-sm"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Instant WhatsApp Action Button */}
              <div className="p-5 bg-[#F8FAFC] border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-900">Instant WhatsApp Chat</div>
                    <div className="text-[11px] text-slate-500">Connect directly with customer support</div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Hello BTMT, I would like to make an enquiry.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors whitespace-nowrap"
                >
                  Chat Now
                </a>
              </div>
            </div>

            {/* Verified Social Handles */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-[#051449] uppercase tracking-wider">
                Official Channels
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Facebook:</span>
                  <a
                    href={COMPANY_INFO.socials.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#051449] hover:underline"
                  >
                    {COMPANY_INFO.socials.facebook}
                  </a>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Instagram:</span>
                  <a
                    href={COMPANY_INFO.socials.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#051449] hover:underline"
                  >
                    {COMPANY_INFO.socials.instagram}
                  </a>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>YouTube:</span>
                  <a
                    href={COMPANY_INFO.socials.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#051449] hover:underline"
                  >
                    {COMPANY_INFO.socials.youtube}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 border border-slate-200 shadow-xs">
              <h3 className="text-2xl font-bold text-[#051449] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Fill in the form below and an authorized representative will respond promptly.
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Thank you, {fullName}. Our administrative team has received your communication
                    and will reply to {email} as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubject('');
                      setMessage('');
                    }}
                    className="mt-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-white border border-emerald-300"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Michael George"
                        className="w-full px-3.5 py-3 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#051449] focus:ring-1 focus:ring-[#051449]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@email.com"
                        className="w-full px-3.5 py-3 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#051449] focus:ring-1 focus:ring-[#051449]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 700 000 0000"
                        className="w-full px-3.5 py-3 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#051449] focus:ring-1 focus:ring-[#051449]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Media Production Enquiry"
                        className="w-full px-3.5 py-3 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#051449] focus:ring-1 focus:ring-[#051449]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message or inquiry in detail..."
                      className="w-full px-3.5 py-3 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#051449] focus:ring-1 focus:ring-[#051449]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors duration-300 flex items-center gap-2"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
