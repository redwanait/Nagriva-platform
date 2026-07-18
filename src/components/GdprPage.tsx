import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  Shield,
  ArrowRight,
  Eye,
  Edit3,
  Trash2,
  Download,
  Mail,
  Lock,
  Database,
  Users,
  UserCheck,
  Server,
  Globe,
  Key,
  ChevronDown,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import Footer from './Footer';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function RevealBlock({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── FAQ Accordion ────────────────────────────────────────────────────── */

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-royal-blue/20 overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-deep-black pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function GdprPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'GDPR & Data Rights | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Learn about user privacy, data rights, and how Nagriva protects personal information and continuously improves its privacy practices.');
  }, []);

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── What is GDPR ── */}
        <WhatIsGDPRSection />

        {/* ── Your Rights ── */}
        <RightsSection />

        {/* ── How Nagriva Handles Data ── */}
        <DataHandlingSection />

        {/* ── Your Responsibilities ── */}
        <ResponsibilitiesSection />

        {/* ── Our Commitment ── */}
        <CommitmentSection />

        {/* ── Requests ── */}
        <RequestsSection />

        {/* ── FAQ ── */}
        <FAQSection openFAQ={openFAQ} onToggle={(i) => setOpenFAQ(openFAQ === i ? null : i)} />

        {/* ── CTA ── */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

/* ─── Sub-Components ───────────────────────────────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            GDPR & Data Rights
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            Your Privacy &{' '}
            <span className="text-royal-blue">Data Rights</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Nagriva is committed to protecting user privacy and providing transparency about how personal information is handled.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#/privacy" className="btn-primary text-base px-8 py-3.5 gap-2">
            Privacy Policy
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#/contact" className="btn-secondary text-base px-8 py-3.5">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}

function WhatIsGDPRSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Overview
            </span>
            <h2 className="heading-lg text-deep-black mb-6">What is GDPR?</h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-5">
              GDPR (General Data Protection Regulation) is the European Union's data protection regulation designed to give individuals greater control over their personal information.
            </p>
            <p className="text-[17px] text-gray-500 leading-relaxed">
              This page explains how Nagriva approaches privacy, handles user data, and provides transparency about your rights as a user of our platform.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function RightsSection() {
  const rights = [
    { icon: Eye, title: 'Right to Access', description: 'Users can request access to their account information and the personal data Nagriva stores about them.' },
    { icon: Edit3, title: 'Right to Update', description: 'Users can update their personal information at any time through their account settings or by contacting support.' },
    { icon: Trash2, title: 'Right to Delete', description: 'Users may request deletion of their account and associated personal data from our systems.' },
    { icon: Download, title: 'Right to Data Export', description: 'Users may request a copy of their available account data in a readable format.' },
    { icon: Mail, title: 'Right to Contact Support', description: 'Users can contact Nagriva directly regarding any privacy-related questions or concerns.' },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Your Rights
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Privacy Rights</h2>
            <p className="text-body max-w-2xl mx-auto">
              You have important rights regarding your personal data on the Nagriva platform.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {rights.map((right, i) => (
            <RevealBlock key={right.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110 mb-5">
                  <right.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-2">{right.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{right.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataHandlingSection() {
  const items = [
    { icon: Lock, title: 'Secure Authentication', description: 'User accounts are protected through Supabase Auth with secure token management.' },
    { icon: Globe, title: 'Encrypted Connections', description: 'All data in transit is encrypted using HTTPS/TLS encryption.' },
    { icon: Database, title: 'Protected Database', description: 'Database access is secured through Row Level Security (RLS) policies.' },
    { icon: Users, title: 'Role-Based Access', description: 'Users can only access resources they are authorized to view.' },
    { icon: FileText, title: 'Limited Data Collection', description: 'Nagriva collects only the data necessary to provide and improve the platform.' },
    { icon: Server, title: 'Secure Infrastructure', description: 'Platform infrastructure follows industry-standard security practices.' },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Data Handling
            </span>
            <h2 className="heading-lg text-deep-black mb-5">How Nagriva Handles Data</h2>
            <p className="text-body max-w-2xl mx-auto">
              Measures in place to protect personal information across the platform.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <RevealBlock key={item.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110 mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResponsibilitiesSection() {
  const items = [
    { icon: Key, title: 'Protect Your Password', description: 'Choose a strong, unique password and never share it with others. Use a password manager when possible.' },
    { icon: UserCheck, title: 'Keep Information Accurate', description: 'Ensure your account information is up to date. Accurate data helps us provide better service and support.' },
    { icon: Shield, title: 'Use the Platform Responsibly', description: 'Follow our terms of service and use Nagriva in ways that respect the privacy and rights of others.' },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Responsibilities
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Your Responsibilities</h2>
            <p className="text-body max-w-2xl mx-auto">
              Privacy is a shared effort. Here's how you can help protect your own data.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <RevealBlock key={item.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110 mb-5">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommitmentSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] flex-shrink-0">
                  <Shield className="h-5 w-5 text-royal-blue" />
                </div>
                <div>
                  <h2 className="heading-md text-deep-black mb-1">Our Commitment</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed">
                <p>
                  Nagriva is committed to continuously improving privacy and security practices as the platform evolves. We believe in transparency about how we handle data and are dedicated to providing users with meaningful control over their information.
                </p>
                <p>
                  As our platform grows, we will continue to invest in stronger protections, better tools for managing your data, and clearer communication about our practices.
                </p>
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 mt-5">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-700">
                    Nagriva does not claim official GDPR compliance certification. This page describes our current practices and ongoing commitment to user privacy. For legal questions, please consult a qualified professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function RequestsSection() {
  const requests = [
    { icon: Download, title: 'Request Account Data', description: 'Request a copy of the personal data Nagriva stores about your account.' },
    { icon: Trash2, title: 'Request Account Deletion', description: 'Request permanent deletion of your account and associated personal data.' },
    { icon: Edit3, title: 'Update Personal Information', description: 'Request updates to inaccurate or outdated personal information.' },
    { icon: Mail, title: 'Privacy Questions', description: 'Contact our team with any questions about how your data is handled.' },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Requests
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Data Requests</h2>
            <p className="text-body max-w-2xl mx-auto">
              Information about making privacy and data-related requests.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {requests.map((req, i) => (
            <RevealBlock key={req.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110 flex-shrink-0">
                    <req.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-deep-black mb-1.5">{req.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{req.description}</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ openFAQ, onToggle }: {
  openFAQ: number | null;
  onToggle: (i: number) => void;
}) {
  const faqs = [
    {
      question: 'Can I delete my account?',
      answer: 'Yes. You can request account deletion by contacting our support team. Once processed, your account and associated personal data will be permanently removed from our systems.',
    },
    {
      question: 'Can I request my data?',
      answer: 'Yes. You can request a copy of the personal data Nagriva stores about your account. Contact our support team and we will provide the available data in a readable format.',
    },
    {
      question: 'How is my information protected?',
      answer: 'Your information is protected through encrypted connections (HTTPS/TLS), secure database policies (Row Level Security), role-based access controls, and Supabase authentication with secure token management.',
    },
    {
      question: 'Who can access my information?',
      answer: 'Only you and authorized Nagriva personnel can access your information. Role-based access controls ensure that users can only access resources they are authorized to view.',
    },
    {
      question: 'How do I contact Nagriva?',
      answer: 'You can reach our team through the Contact page or by emailing support@nagriva.com. For privacy-specific questions, please indicate that in your message so we can route it appropriately.',
    },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              FAQ
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Frequently Asked Questions</h2>
            <p className="text-body max-w-2xl mx-auto">
              Common questions about privacy and data rights on Nagriva.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <RevealBlock key={faq.question} delay={i * 40}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === i}
                onToggle={() => onToggle(i)}
              />
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Questions About{' '}
                <span className="text-royal-blue">Your Data?</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Our team is here to help with privacy and data-related questions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#/contact" className="btn-primary text-base px-8 py-3.5 gap-2">
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#/privacy" className="btn-secondary text-base px-8 py-3.5">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
