import { useEffect, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import Footer from './Footer';

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TABLE OF CONTENTS DATA
   ═══════════════════════════════════════════ */

const tocSections = [
  { id: 'introduction', num: '1', title: 'Introduction' },
  { id: 'information-we-collect', num: '2', title: 'Information We Collect' },
  { id: 'how-we-use', num: '3', title: 'How We Use Information' },
  { id: 'cookies', num: '4', title: 'Cookies' },
  { id: 'sharing-information', num: '5', title: 'Sharing Information' },
  { id: 'data-retention', num: '6', title: 'Data Retention' },
  { id: 'security', num: '7', title: 'Security' },
  { id: 'international-transfers', num: '8', title: 'International Transfers' },
  { id: 'your-rights', num: '9', title: 'Your Rights' },
  { id: 'children-privacy', num: '10', title: "Children's Privacy" },
  { id: 'changes', num: '11', title: 'Changes to This Policy' },
  { id: 'contact', num: '12', title: 'Contact Us' },
];

/* ═══════════════════════════════════════════
   TABLE OF CONTENTS COMPONENT
   ═══════════════════════════════════════════ */

function TableOfContents({ activeId }: { activeId: string }) {
  const handleClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <nav className="sticky top-28">
      <p className="text-xs font-semibold text-gray-400 tracking-[0.15em] uppercase mb-4">On this page</p>
      <ul className="space-y-1">
        {tocSections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => handleClick(s.id)}
                className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 leading-snug ${
                  isActive
                    ? 'text-royal-blue font-medium bg-royal-blue/[0.04]'
                    : 'text-gray-500 hover:text-deep-black hover:bg-gray-50'
                }`}
              >
                <span className="text-gray-300 mr-2 tabular-nums">{s.num}.</span>
                {s.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   LEGAL SECTION COMPONENT
   ═══════════════════════════════════════════ */

function LegalSection({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <RevealBlock>
        <h2 className="text-xl md:text-2xl font-bold text-deep-black tracking-tight mb-5 flex items-baseline gap-3">
          <span className="text-gray-300 text-base font-medium tabular-nums">{num}.</span>
          {title}
        </h2>
        <div className="space-y-4 text-[15px] text-gray-600 leading-[1.75]">
          {children}
        </div>
      </RevealBlock>
    </section>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-royal-blue/20 bg-royal-blue/[0.02] rounded-r-lg px-5 py-4 text-sm text-gray-600 leading-relaxed">
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6">
      <div ref={ref} className={`relative mx-auto max-w-[800px] text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-black tracking-tight leading-[1.1] mb-5">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">
          This Privacy Policy describes how Nagriva collects, uses, stores, and protects your personal information when you use our platform and services.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400 mb-10">
          <span>Last Updated: Jan 01, 2026</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-300" />
          <span>Effective Date: Jan 01, 2027</span>
        </div>

        <div className="h-px bg-gray-200" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN CONTENT
   ═══════════════════════════════════════════ */

function PolicyContent({ setActiveId }: { setActiveId: (id: string) => void }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    tocSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveId]);

  return (
    <div className="max-w-[800px] mx-auto space-y-12 md:space-y-16 pb-12">
      {/* 1. Introduction */}
      <LegalSection id="introduction" num="1" title="Introduction">
        <p>
          Nagriva Inc. (&ldquo;Nagriva,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the Nagriva platform, which provides AI-powered workforce solutions for businesses. This Privacy Policy explains our practices regarding the collection, use, disclosure, and safeguarding of personal information.
        </p>
        <p>
          By accessing or using our platform, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with the practices described herein, please discontinue use of the platform.
        </p>
        <InfoBox>
          This policy applies to all users of the Nagriva platform, including visitors, registered users, and enterprise customers. Separate terms may apply to specific products or features.
        </InfoBox>
      </LegalSection>

      {/* 2. Information We Collect */}
      <LegalSection id="information-we-collect" num="2" title="Information We Collect">
        <p>
          We collect information to operate and improve the Nagriva platform. The categories of personal information we collect include:
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Account Information</h3>
        <p>
          When you register for an account, we collect your name, email address, company name, and any additional profile information you provide. Enterprise customers may also provide billing contact details and organizational role information.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Platform Usage Data</h3>
        <p>
          We collect data related to your use of the platform, including AI agent configurations, conversation logs, interaction patterns, feature usage, and performance metrics. This data is used to maintain and improve service quality.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Billing Information</h3>
        <p>
          Payment information is processed by our third-party payment processor. We do not store full credit card numbers on our servers. We retain transaction records, subscription details, and billing addresses necessary for financial reporting and compliance.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Technical Information</h3>
        <p>
          We automatically collect certain technical data when you interact with the platform, including IP address, browser type and version, device identifiers, operating system, referring URLs, and pages visited. This information is collected through server logs and analytics tools.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Communications</h3>
        <p>
          When you contact our support or sales teams, we collect the contents of your communications along with your contact details. We may also record calls for quality assurance and training purposes, with appropriate notice.
        </p>
      </LegalSection>

      {/* 3. How We Use Information */}
      <LegalSection id="how-we-use" num="3" title="How We Use Information">
        <p>
          We use personal information for the following business purposes:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong className="text-deep-black">Service delivery.</strong> To operate, maintain, and provide the Nagriva platform and its core features to you.</li>
          <li><strong className="text-deep-black">AI improvement.</strong> To train, fine-tune, and enhance the performance and accuracy of AI agents using aggregated and de-identified interaction data.</li>
          <li><strong className="text-deep-black">Customer support.</strong> To respond to your inquiries, resolve technical issues, and provide account assistance.</li>
          <li><strong className="text-deep-black">Security.</strong> To detect, prevent, and respond to fraud, unauthorized access, and other security threats.</li>
          <li><strong className="text-deep-black">Billing and accounting.</strong> To process payments, manage subscriptions, and maintain accurate financial records.</li>
          <li><strong className="text-deep-black">Analytics.</strong> To analyze aggregate usage trends, measure platform performance, and generate insights that inform product development.</li>
          <li><strong className="text-deep-black">Legal compliance.</strong> To comply with applicable laws, regulations, and legal processes.</li>
          <li><strong className="text-deep-black">Communications.</strong> To send service-related notices, security alerts, and promotional messages (which you may opt out of at any time).</li>
        </ul>
      </LegalSection>

      {/* 4. Cookies */}
      <LegalSection id="cookies" num="4" title="Cookies">
        <p>
          We use cookies and similar tracking technologies to collect information about your interactions with the platform. Cookies are small data files stored on your device that help us recognize returning users and understand usage patterns.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Essential Cookies</h3>
        <p>
          Required for the platform to function. These cookies handle authentication, session management, security features, and load balancing. They cannot be disabled without impairing core functionality.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Analytics Cookies</h3>
        <p>
          Help us understand how users navigate and interact with the platform. We use this information to improve site performance, identify popular features, and diagnose technical issues. Analytics data is collected in aggregate.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Preference Cookies</h3>
        <p>
          Remember your settings and display preferences across sessions, such as language selection and dashboard layout options.
        </p>
        <p>
          You can manage cookie preferences through your browser settings. Disabling certain cookies may limit your ability to use specific platform features.
        </p>
      </LegalSection>

      {/* 5. Sharing Information */}
      <LegalSection id="sharing-information" num="5" title="Sharing Information">
        <p>
          We do not sell your personal information. We share data only in the following circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong className="text-deep-black">Service providers.</strong> We engage trusted third-party vendors who perform services on our behalf, including cloud hosting, payment processing, analytics, and customer support. These providers are contractually bound to use your data solely for the purposes we specify.</li>
          <li><strong className="text-deep-black">Legal requirements.</strong> We may disclose information when required by law, subpoena, court order, or government regulation, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
          <li><strong className="text-deep-black">Business transfers.</strong> In connection with a merger, acquisition, reorganization, or sale of assets, your personal information may be transferred as part of the transaction. We will notify you of any change in ownership or use of your data.</li>
          <li><strong className="text-deep-black">With your consent.</strong> We may share your information for any other purpose with your explicit consent.</li>
        </ul>
        <InfoBox>
          Our current third-party service providers include Supabase (database and authentication), Stripe (payments), Google (authentication), and OpenAI (AI models). Each provider maintains its own privacy policy governing the handling of data shared with them.
        </InfoBox>
      </LegalSection>

      {/* 6. Data Retention */}
      <LegalSection id="data-retention" num="6" title="Data Retention">
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. Specific retention periods depend on the type of data and the purpose for which it was collected.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Account information is retained for the duration of your account and for a reasonable period following deletion to support recovery requests and meet legal obligations.</li>
          <li>Conversation logs and platform usage data are retained in identifiable form for up to 12 months and may be retained in de-identified or aggregated form indefinitely for analytics purposes.</li>
          <li>Billing and transaction records are retained for up to seven years in compliance with financial record-keeping regulations.</li>
          <li>Support communications are retained for up to 36 months to maintain service quality and resolve ongoing issues.</li>
        </ul>
        <p>
          When data is no longer required, it is securely deleted or irreversibly anonymized in accordance with our data retention procedures.
        </p>
      </LegalSection>

      {/* 7. Security */}
      <LegalSection id="security" num="7" title="Security">
        <p>
          We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong className="text-deep-black">Encryption.</strong> All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.</li>
          <li><strong className="text-deep-black">Access controls.</strong> Role-based access control ensures that only authorized personnel can access sensitive data, following the principle of least privilege.</li>
          <li><strong className="text-deep-black">Infrastructure.</strong> The platform is hosted on enterprise-grade cloud infrastructure with SOC 2 Type II compliance, redundant architecture, and automated failover.</li>
          <li><strong className="text-deep-black">Monitoring.</strong> Continuous security monitoring, intrusion detection, and regular penetration testing help us identify and address vulnerabilities.</li>
          <li><strong className="text-deep-black">Backups.</strong> Automated encrypted backups are performed regularly with tested recovery procedures.</li>
        </ul>
        <InfoBox>
          While we take reasonable precautions, no method of transmission or storage is completely secure. We encourage users to maintain strong passwords and enable multi-factor authentication on their accounts.
        </InfoBox>
      </LegalSection>

      {/* 8. International Transfers */}
      <LegalSection id="international-transfers" num="8" title="International Transfers">
        <p>
          Nagriva is headquartered in the United States. Your personal information may be processed in the United States or other countries where our service providers operate. These jurisdictions may have data protection laws that differ from those in your country of residence.
        </p>
        <p>
          When we transfer personal information across borders, we implement appropriate safeguards to ensure your data receives an adequate level of protection, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
          <li>Data processing agreements with all third-party processors</li>
          <li>Compliance with applicable frameworks for international data transfers</li>
        </ul>
        <p>
          You may request additional information about our international transfer safeguards by contacting us using the details provided at the end of this policy.
        </p>
      </LegalSection>

      {/* 9. Your Rights */}
      <LegalSection id="your-rights" num="9" title="Your Rights">
        <p>
          Depending on your jurisdiction, you may have certain rights regarding the personal information we hold about you. These may include:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong className="text-deep-black">Right of access.</strong> Request a copy of the personal information we hold about you.</li>
          <li><strong className="text-deep-black">Right of rectification.</strong> Request correction of inaccurate or incomplete information.</li>
          <li><strong className="text-deep-black">Right to erasure.</strong> Request deletion of your personal information, subject to certain legal exceptions.</li>
          <li><strong className="text-deep-black">Right to restrict processing.</strong> Request that we limit the way we use your information.</li>
          <li><strong className="text-deep-black">Right to data portability.</strong> Receive your data in a structured, commonly used, machine-readable format.</li>
          <li><strong className="text-deep-black">Right to object.</strong> Object to the processing of your information for certain purposes, including direct marketing.</li>
          <li><strong className="text-deep-black">Right to withdraw consent.</strong> Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at <span className="font-medium text-deep-black">Redwanaitlhadj16@gmail.com</span>. We will respond to verified requests within 30 days.
        </p>
        <InfoBox>
          If you are located in the European Economic Area or the United Kingdom, you also have the right to lodge a complaint with your local data protection authority.
        </InfoBox>
      </LegalSection>

      {/* 10. Children's Privacy */}
      <LegalSection id="children-privacy" num="10" title="Children's Privacy">
        <p>
          The Nagriva platform is not directed at children under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a child under the applicable age threshold without verified parental consent, we will take steps to delete that information promptly.
        </p>
        <p>
          If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can investigate and take appropriate action.
        </p>
      </LegalSection>

      {/* 11. Changes to This Policy */}
      <LegalSection id="changes" num="11" title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal obligations, or other factors. When we make material changes, we will notify you through a prominent notice on the platform and update the &ldquo;Last Updated&rdquo; date at the top of this page.
        </p>
        <p>
          We encourage you to review this policy periodically. Your continued use of the platform following the posting of changes constitutes your acceptance of those changes.
        </p>
      </LegalSection>

      {/* 12. Contact Us */}
      <section id="contact">
        <RevealBlock>
          <h2 className="text-xl md:text-2xl font-bold text-deep-black tracking-tight mb-5 flex items-baseline gap-3">
            <span className="text-gray-300 text-base font-medium tabular-nums">12.</span>
            Contact Us
          </h2>
          <div className="space-y-4 text-[15px] text-gray-600 leading-[1.75]">
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-6 mt-2">
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Privacy Inquiries</span>
                  <p className="text-deep-black font-medium mt-0.5">Redwanaitlhadj16@gmail.com</p>
                </div>

                <div className="h-px bg-gray-200" />
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Mailing Address</span>
                  <p className="text-deep-black font-medium mt-0.5">Nagriva Inc., Morocco, AZ</p>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function PrivacyPage() {
  const [activeId, setActiveId] = useState('introduction');

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'Privacy Policy | Nagriva';

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute(
      'content',
      'Read Nagriva\'s Privacy Policy to understand how we collect, use, protect, and manage your personal information while using our AI workforce platform.'
    );

    return () => {
      document.title = prevTitle;
      if (prevDesc && metaTag) {
        metaTag.setAttribute('content', prevDesc);
      }
    };
  }, []);

  return (
    <>
      <main>
        <HeroSection />

        <section className="px-6 md:px-12 lg:px-24 pt-4 pb-20 md:pt-8 md:pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-20">
              {/* Desktop TOC */}
              <div className="hidden lg:block">
                <TableOfContents activeId={activeId} />
              </div>

              {/* Content */}
              <PolicyContent setActiveId={setActiveId} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
