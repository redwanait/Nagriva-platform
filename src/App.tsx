import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import DashboardPreview from './components/DashboardPreview';
import Solutions from './components/Solutions';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import FeaturesPage from './components/FeaturesPage';
import SolutionsPage from './components/SolutionsPage';
import PricingPage from './components/PricingPage';
import DocsPage from './components/DocsPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import HelpCenterPage from './components/HelpCenterPage';
import APIPage from './components/APIPage';
import BlogPage from './components/BlogPage';
import ArticlePage from './components/ArticlePage';
import ChangelogPage from './components/ChangelogPage';
import SecurityPage from './components/SecurityPage';
import GdprPage from './components/GdprPage';
import CookiesPage from './components/CookiesPage';
import CareersPage from './components/CareersPage';
import PositionsPage from './components/PositionsPage';
import PartnersPage from './components/PartnersPage';
import CommunityPage from './components/CommunityPage';
import WebinarsPage from './components/WebinarsPage';
import ContributorsPage from './components/ContributorsPage';
import StatusPage from './components/StatusPage';
import Onboarding from './components/Onboarding';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthCallback from './pages/AuthCallback';
import DashboardLayout from './dashboard/DashboardLayout';
import ClientDashboard from './client/ClientLayout';
import { AdminRoute, ClientRoute } from './components/RouteGuards';
import { AuthProvider } from './lib/AuthContext';
import type { ClientSection } from './client/clientData';

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash;
}

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <TrustedBy />
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Features />
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <DashboardPreview />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Solutions />
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <Pricing />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Testimonials />
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <FAQ />
        </AnimatedSection>
        <AnimatedSection>
          <CTA />
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}

function AppInner() {
  const hash = useHashRoute();
  const [isAuthCallback] = useState(() => window.location.pathname === '/auth/callback');

  if (isAuthCallback) {
    return <AuthCallback />;
  }

  const isFeaturesPage = hash === '#/features';
  const isSolutionsPage = hash === '#/solutions';
  const isPricingPage = hash === '#/pricing';
  const isDocsPage = hash === '#/docs';
  const isContactPage = hash === '#/contact';
  const isAboutPage = hash === '#/about';
  const isPrivacyPage = hash === '#/privacy';
  const isTermsPage = hash === '#/terms';
  const isHelpCenterPage = hash === '#/help-center';
  const isApiPage = hash === '#/api';
  const isBlogPage = hash === '#/blog';
  const isArticlePage = hash.startsWith('#/blog/') && hash !== '#/blog';
  const isChangelogPage = hash === '#/changelog';
  const isSecurityPage = hash === '#/security';
  const isGdprPage = hash === '#/gdpr';
  const isCookiesPage = hash === '#/cookies';
  const isCareersPage = hash === '#/careers';
  const isPositionsPage = hash === '#/positions';
  const isPartnersPage = hash === '#/partners';
  const isCommunityPage = hash === '#/community';
  const isWebinarsPage = hash === '#/webinars';
  const isStatusPage = hash === '#/status';
  const isContributorsPage = hash === '#/contributors';
  const isGetStartedPage = hash === '#/get-started';
  const isOnboardingPage = hash === '#/onboarding';
  const isLoginPage = hash === '#/login';
  const isForgotPage = hash === '#/forgot-password';
  const isResetPage = hash.startsWith('#/reset-password');
  const isDashboardPage = hash === '#/dashboard' || hash.startsWith('#/dashboard/');
  const isClientDashboardPage = hash === '#/client-dashboard' || hash.startsWith('#/client-dashboard/');

  if (isDashboardPage) {
    const section = hash.startsWith('#/dashboard/')
      ? (hash.slice('#/dashboard/'.length) || undefined)
      : undefined;
    return (
      <AdminRoute>
        <DashboardLayout initialSection={section as any} />
      </AdminRoute>
    );
  }

  if (isClientDashboardPage) {
    const section = hash.startsWith('#/client-dashboard/')
      ? (hash.slice('#/client-dashboard/'.length) || undefined)
      : undefined;
    return (
      <ClientRoute>
        <ClientDashboard initialSection={section as ClientSection | undefined} />
      </ClientRoute>
    );
  }

  if (isGetStartedPage || isOnboardingPage) {
    return <Onboarding />;
  }

  if (isLoginPage) {
    return <SignIn />;
  }

  if (isForgotPage) {
    return <ForgotPassword />;
  }

  if (isResetPage) {
    return <ResetPassword />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {isArticlePage ? <ArticlePage slug={hash.slice('#/blog/'.length)} /> : isContactPage ? <ContactPage /> : isAboutPage ? <AboutPage /> : isPrivacyPage ? <PrivacyPage /> : isTermsPage ? <TermsPage /> : isHelpCenterPage ? <HelpCenterPage /> : isApiPage ? <APIPage /> : isBlogPage ? <BlogPage /> : isChangelogPage ? <ChangelogPage /> : isSecurityPage ? <SecurityPage /> : isGdprPage ? <GdprPage /> : isCookiesPage ? <CookiesPage /> : isCareersPage ? <CareersPage /> : isPositionsPage ? <PositionsPage /> : isPartnersPage ? <PartnersPage /> : isCommunityPage ? <CommunityPage /> : isWebinarsPage ? <WebinarsPage /> : isContributorsPage ? <ContributorsPage /> : isStatusPage ? <StatusPage /> : isDocsPage ? <DocsPage /> : isPricingPage ? <PricingPage /> : isSolutionsPage ? <SolutionsPage /> : isFeaturesPage ? <FeaturesPage /> : <HomePage />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
