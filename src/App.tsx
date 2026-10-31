import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { Toast } from './components/ui/Toast';

// Pages
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { BookServicePage } from './components/pages/BookServicePage';
import { MarketplacePage } from './components/pages/MarketplacePage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { BlogPage } from './components/pages/BlogPage';
import { BlogDetailPage } from './components/pages/BlogDetailPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { JoinCommunityPage } from './components/pages/JoinCommunityPage';
import { LoginPage } from './components/pages/LoginPage';
import { MemberDashboardPage } from './components/pages/MemberDashboardPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminDashboard } from './components/pages/AdminDashboard';
import {
  PrivacyPolicyPage,
  TermsOfServicePage,
  CookiePolicyPage,
  RefundPolicyPage
} from './components/pages/LegalPages';

const RouterView: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/services/:slug':
        return <ServiceDetailPage />;
      case '/book-service':
        return <BookServicePage />;
      case '/marketplace':
        return <MarketplacePage />;
      case '/marketplace/:slug':
        return <ProductDetailPage />;
      case '/cart':
        return <CartPage />;
      case '/checkout':
        return <CheckoutPage />;
      case '/blog':
        return <BlogPage />;
      case '/blog/:slug':
        return <BlogDetailPage />;
      case '/community':
        return <CommunityPage />;
      case '/community/join':
        return <JoinCommunityPage />;
      case '/login':
        return <LoginPage />;
      case '/dashboard':
        return <MemberDashboardPage />;
      case '/contact':
        return <ContactPage />;
      case '/admin':
        return <AdminDashboard />;
      case '/privacy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsOfServicePage />;
      case '/cookies':
        return <CookiePolicyPage />;
      case '/refund-policy':
        return <RefundPolicyPage />;
      default:
        return (
          <div className="w-full bg-[#F6F8FA] py-28 text-center min-h-[60vh] flex items-center justify-center">
            <div className="max-w-md mx-auto px-4 space-y-4">
              <div className="text-4xl font-mono font-bold text-[#051449]">404</div>
              <h1 className="text-2xl font-bold text-[#051449]">Page Not Found</h1>
              <p className="text-xs text-slate-600">
                The requested URL does not exist or has been relocated within the BTMT network.
              </p>
              <button
                onClick={() => navigateTo('/')}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#051449] rounded-lg hover:bg-[#081e6a] transition-colors"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#242A35]">
      <SiteHeader />
      <main className="flex-1">{renderPage()}</main>
      <SiteFooter />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterView />
    </AppProvider>
  );
}
