import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { ArrowLeft } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  category: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  category,
  lastUpdated,
  children
}) => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full bg-white">
      <div className="border-b border-slate-100 bg-[#F6F8FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigateTo('/')}
            className="text-xs font-semibold text-slate-600 hover:text-[#051449] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>

      <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-2 border-b border-slate-200 pb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#12A9DB]">
            {category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#051449]">{title}</h1>
          <div className="text-xs text-slate-500 font-mono">Last Updated: {lastUpdated}</div>
        </header>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      category="Compliance & Governance"
      lastUpdated="October 2026"
    >
      <p>
        Blissful Touch Media & Technology (BTMT) respects your privacy and is committed to protecting
        your personal data. This Privacy Policy outlines our procedures regarding the collection,
        use, and disclosure of information when you interact with our website, services, marketplace,
        or community platform.
      </p>

      <h3 className="text-base font-bold text-[#051449]">1. Information We Collect</h3>
      <p>
        When you make a service enquiry, register for the community, or purchase items on the
        marketplace, we collect:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Contact details: Full Name, Email Address, Phone Number, and Physical Address.</li>
        <li>Project parameters: Requirements descriptions, budgets, and business names.</li>
        <li>Transactional records: Order references, product selections, and payment method indicators.</li>
      </ul>

      <h3 className="text-base font-bold text-[#051449]">2. Use of Information</h3>
      <p>
        We use your data solely to fulfill requested services, dispatch orders, respond to
        consultations, and deliver community newsletters you have explicitly subscribed to.
        We never sell, rent, or trade your personal information.
      </p>

      <h3 className="text-base font-bold text-[#051449]">3. Office & Contact Information</h3>
      <p>
        For inquiries regarding data privacy or to request removal of your account, write to:
        <br />
        <strong>Blissful Touch Media & Technology</strong>
        <br />
        {COMPANY_INFO.address}
        <br />
        Email: {COMPANY_INFO.email}
      </p>
    </LegalPageLayout>
  );
};

export const TermsOfServicePage: React.FC = () => {
  return (
    <LegalPageLayout
      title="Terms of Service"
      category="Terms & Operational Rules"
      lastUpdated="October 2026"
    >
      <p>
        Welcome to Blissful Touch Media & Technology (BTMT). By accessing our website, booking our
        services, or participating in the community platform, you agree to comply with and be bound
        by the following terms.
      </p>

      <h3 className="text-base font-bold text-[#051449]">1. Service Scope & Enquiries</h3>
      <p>
        Submitting a project enquiry via our booking form constitutes an initial consultation request,
        not a binding contractual commitment. Formal technical milestones, deliverables, and payment
        schedules are formalized in bespoke service level agreements.
      </p>

      <h3 className="text-base font-bold text-[#051449]">2. Intellectual Property</h3>
      <p>
        All content, code, research publications, and brand marks published by BTMT remain the
        property of Blissful Touch Media & Technology or their respective authors. Client-commissioned
        deliverables are transferred per individual contract terms upon full settlement.
      </p>

      <h3 className="text-base font-bold text-[#051449]">3. Code of Conduct</h3>
      <p>
        In alignment with our core value of <em>Moral and Ethical Excellence</em>, users of our
        community platform agree not to post defamatory, deceptive, or malicious materials.
      </p>
    </LegalPageLayout>
  );
};

export const CookiePolicyPage: React.FC = () => {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      category="Technical Governance"
      lastUpdated="October 2026"
    >
      <p>
        This Cookie Policy explains how BTMT uses browser cookies and local storage technologies to
        recognize you when you visit our website.
      </p>

      <h3 className="text-base font-bold text-[#051449]">1. What are Cookies?</h3>
      <p>
        Cookies and local storage keys are small text data elements placed on your browser that
        allow us to retain your shopping cart items, authenticated session preferences, and
        browsing history across page loads.
      </p>

      <h3 className="text-base font-bold text-[#051449]">2. Managing Preferences</h3>
      <p>
        You can instruct your browser to refuse all cookies or notify you when a cookie is sent.
        However, certain features such as persistent shopping carts or member dashboards require
        storage enablement to operate smoothly.
      </p>
    </LegalPageLayout>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout
      title="Refund and Returns Policy"
      category="Marketplace & Services Policy"
      lastUpdated="October 2026"
    >
      <p>
        At Blissful Touch Media & Technology (BTMT), customer satisfaction and ethical excellence
        are central to everything we do.
      </p>

      <h3 className="text-base font-bold text-[#051449]">1. Physical Marketplace Products</h3>
      <p>
        Physical products (such as media kits, books, and corporate stationery) may be returned
        within 7 days of delivery if damaged in transit or defective. Upon inspection at our Owerri
        headquarters, a replacement or refund will be issued promptly.
      </p>

      <h3 className="text-base font-bold text-[#051449]">2. Professional Services</h3>
      <p>
        Service engagements are governed by milestone approvals. If work does not meet agreed
        specifications, revisions are provided according to your contract agreement before final
        deliverable sign-off.
      </p>
    </LegalPageLayout>
  );
};
