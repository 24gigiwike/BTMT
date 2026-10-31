import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const BookServicePage: React.FC = () => {
  const { services, selectedServiceForBooking, setSelectedServiceForBooking, submitServiceEnquiry, navigateTo } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceId, setServiceId] = useState(selectedServiceForBooking || (services[0]?.id || 'web-dev'));
  const [projectDescription, setProjectDescription] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [preferredStartDate, setPreferredStartDate] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'Email' | 'Phone' | 'WhatsApp'>('Email');
  const [consent, setConsent] = useState(true);

  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync if selectedServiceForBooking changes
  useEffect(() => {
    if (selectedServiceForBooking) {
      setServiceId(selectedServiceForBooking);
    }
  }, [selectedServiceForBooking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your contact phone number.');
      return;
    }
    if (!projectDescription.trim() || projectDescription.length < 15) {
      setErrorMessage('Please provide a descriptive explanation of your project requirements (at least 15 characters).');
      return;
    }
    if (!consent) {
      setErrorMessage('Please accept the consent terms to proceed.');
      return;
    }

    setIsSubmitting(true);

    const chosenService = services.find((s) => s.id === serviceId);
    const serviceTitle = chosenService ? chosenService.title : 'General Consultation';

    const created = submitServiceEnquiry({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      companyName: companyName.trim() || undefined,
      serviceId,
      serviceTitle,
      projectDescription: projectDescription.trim(),
      estimatedBudget: estimatedBudget.trim() || undefined,
      preferredStartDate: preferredStartDate.trim() || undefined,
      preferredContactMethod
    });

    setIsSubmitting(false);
    setSubmittedEnquiryId(created.id);
    setSelectedServiceForBooking(null);
  };

  if (submittedEnquiryId) {
    return (
      <div className="w-full bg-[#F6F8FA] py-20 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 w-full">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Enquiry Logged Successfully
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#051449]">
                Thank You, {fullName}!
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your project consultation enquiry has been recorded in our dispatch system with reference:
              </p>
              <div className="inline-block px-4 py-2 bg-slate-100 rounded-lg font-mono text-sm font-semibold text-[#051449]">
                {submittedEnquiryId}
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              A member of the BTMT team will review your specifications and contact you via{' '}
              <strong className="text-slate-700">{preferredContactMethod}</strong> ({email}) within
              one business day.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigateTo('/services')}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors"
              >
                Explore Other Services
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* HEADER SECTION */}
      <section className="py-16 bg-[#F6F8FA] border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            Client Consultation Intake
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#051449]">
            Tell Us About Your Project
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Share a few details about what you need, and our team will review your enquiry and contact you.
          </p>
        </div>
      </section>

      {/* FORM CONTAINER */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Chinelo Okonkwo"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>
          </div>

          {/* Row 2: Phone and Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Company or Brand Name <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Dynamics Ltd"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>
          </div>

          {/* Service Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Service Interested In <span className="text-red-500">*</span>
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  [{srv.category}] {srv.title}
                </option>
              ))}
            </select>
          </div>

          {/* Project Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe your current objectives, deliverables needed, target timelines, and any specific constraints..."
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
            />
          </div>

          {/* Row 3: Budget and Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Estimated Budget Range <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <select
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              >
                <option value="">Select a range</option>
                <option value="Under ₦250,000">Under ₦250,000</option>
                <option value="₦250,000 - ₦600,000">₦250,000 - ₦600,000</option>
                <option value="₦600,000 - ₦1,500,000">₦600,000 - ₦1,500,000</option>
                <option value="₦1,500,000 - ₦4,000,000">₦1,500,000 - ₦4,000,000</option>
                <option value="₦4,000,000+">₦4,000,000+</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Preferred Start Date <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={preferredStartDate}
                onChange={(e) => setPreferredStartDate(e.target.value)}
                placeholder="e.g. Immediately / Next Month"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#12A9DB] focus:ring-1 focus:ring-[#12A9DB]"
              />
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Preferred Contact Method
            </label>
            <div className="flex items-center gap-6 text-xs text-slate-700">
              {(['Email', 'Phone', 'WhatsApp'] as const).map((method) => (
                <label key={method} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={preferredContactMethod === method}
                    onChange={() => setPreferredContactMethod(method)}
                    className="text-[#051449] focus:ring-[#12A9DB]"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 text-[#051449] focus:ring-[#12A9DB] rounded"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                I understand that submitting this enquiry initiates a project review by BTMT and
                that an authorized representative will contact me to discuss feasibility and pricing.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Submit Project Enquiry'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
