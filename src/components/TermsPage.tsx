import { useEffect, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import Footer from './Footer';
import { ChevronDown } from 'lucide-react';

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
  { id: 'acceptance', num: '1', title: 'Acceptance of Terms' },
  { id: 'eligibility', num: '2', title: 'Eligibility' },
  { id: 'user-accounts', num: '3', title: 'User Accounts' },
  { id: 'ai-employees', num: '4', title: 'AI Employees' },
  { id: 'acceptable-use', num: '5', title: 'Acceptable Use' },
  { id: 'subscription-billing', num: '6', title: 'Subscription & Billing' },
  { id: 'intellectual-property', num: '7', title: 'Intellectual Property' },
  { id: 'user-content', num: '8', title: 'User Content' },
  { id: 'privacy', num: '9', title: 'Privacy' },
  { id: 'third-party-services', num: '10', title: 'Third-Party Services' },
  { id: 'suspension-termination', num: '11', title: 'Suspension & Termination' },
  { id: 'disclaimers', num: '12', title: 'Disclaimers' },
  { id: 'limitation-of-liability', num: '13', title: 'Limitation of Liability' },
  { id: 'indemnification', num: '14', title: 'Indemnification' },
  { id: 'changes-to-terms', num: '15', title: 'Changes to Terms' },
  { id: 'governing-law', num: '16', title: 'Governing Law' },
  { id: 'contact-information', num: '17', title: 'Contact Information' },
];

/* ═══════════════════════════════════════════
   TABLE OF CONTENTS — DESKTOP
   ═══════════════════════════════════════════ */

function TableOfContents({ activeId }: { activeId: string }) {
  const handleClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <nav className="sticky top-28">
      <p className="text-xs font-semibold text-gray-400 tracking-[0.15em] uppercase mb-4">On this page</p>
      <ul className="space-y-0.5">
        {tocSections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => handleClick(s.id)}
                className={`w-full text-left text-[13px] py-1.5 px-3 rounded-lg transition-all duration-200 leading-snug ${
                  isActive
                    ? 'text-royal-blue font-medium bg-royal-blue/[0.04]'
                    : 'text-gray-500 hover:text-deep-black hover:bg-gray-50'
                }`}
              >
                <span className="text-gray-300 mr-1.5 tabular-nums">{s.num}.</span>
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
   TABLE OF CONTENTS — MOBILE ACCORDION
   ═══════════════════════════════════════════ */

function MobileTOC({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  }, []);

  return (
    <div className="lg:hidden mb-8 border border-gray-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-deep-black">Table of Contents</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="border-t border-gray-100 px-5 pb-4">
          <ul className="space-y-0.5 pt-2">
            {tocSections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => handleClick(s.id)}
                  className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-colors duration-150 ${
                    activeId === s.id
                      ? 'text-royal-blue font-medium bg-royal-blue/[0.04]'
                      : 'text-gray-500 hover:text-deep-black hover:bg-gray-50'
                  }`}
                >
                  <span className="text-gray-300 mr-1.5 tabular-nums">{s.num}.</span>
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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

function NoteBox({ children }: { children: React.ReactNode }) {
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
          Terms of Service
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Nagriva platform, including all related services, features, and applications. By using the platform, you agree to these Terms.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400 mb-10">
          <span>Last Updated: Jan 01, 2026</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-300" />
          <span>Effective Updated: Jan 01, 2027</span>
        </div>

        <div className="h-px bg-gray-200" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN CONTENT — 17 SECTIONS
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

      {/* 1. Acceptance of Terms */}
      <LegalSection id="acceptance" num="1" title="Acceptance of Terms">
        <p>
          By creating an account, accessing, or otherwise using the Nagriva platform (the &ldquo;Platform&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you are using the Platform on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
        </p>
        <p>
          If you do not agree to these Terms, you must not access or use the Platform. We may update these Terms from time to time; your continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      {/* 2. Eligibility */}
      <LegalSection id="eligibility" num="2" title="Eligibility">
        <p>
          The Platform is intended for use by individuals who are at least 16 years of age and have the legal capacity to enter into a binding agreement. By using the Platform, you represent and warrant that you meet these requirements.
        </p>
        <p>
          If you are using the Platform on behalf of a company, partnership, or other legal entity, you represent that you are authorized to act on behalf of that entity and that the entity agrees to be bound by these Terms. If you are not so authorized, you must not use the Platform.
        </p>
      </LegalSection>

      {/* 3. User Accounts */}
      <LegalSection id="user-accounts" num="3" title="User Accounts">
        <p>
          To access certain features of the Platform, you must create an account. When registering, you agree to provide accurate, current, and complete information and to keep that information up to date.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Account Security</h3>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately if you suspect unauthorized access. We are not liable for any loss or damage arising from unauthorized use of your account.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Account Ownership</h3>
        <p>
          Each account is owned by the individual or entity that registered it. If you are invited to an organization&rsquo;s workspace, your access is governed by that organization&rsquo;s administrative settings and these Terms.
        </p>
      </LegalSection>

      {/* 4. AI Employees */}
      <LegalSection id="ai-employees" num="4" title="AI Employees">
        <p>
          The Platform enables you to create, configure, and deploy AI-powered agents (&ldquo;AI Employees&rdquo;) for business purposes such as customer support, sales engagement, and internal workflows.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Nature of AI Outputs</h3>
        <p>
          AI Employees generate responses based on the data you provide and the underlying language models. While we strive for accuracy, AI-generated outputs may occasionally be incomplete, inaccurate, or inappropriate. You are solely responsible for reviewing and approving AI Employee responses before they are used in a production environment.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Your Responsibility</h3>
        <p>
          You are responsible for configuring your AI Employees appropriately, training them on accurate and lawful data, and monitoring their performance. Nagriva is not responsible for decisions made, actions taken, or outcomes resulting from the use of AI Employees.
        </p>

        <NoteBox>
          AI Employees are tools designed to assist your team. They do not replace professional judgment in legal, medical, financial, or other regulated contexts.
        </NoteBox>
      </LegalSection>

      {/* 5. Acceptable Use */}
      <LegalSection id="acceptable-use" num="5" title="Acceptable Use">
        <p>
          You agree to use the Platform only for lawful purposes and in compliance with these Terms. You will not:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Use the Platform to generate, store, or distribute content that is illegal, harmful, fraudulent, defamatory, or violates the rights of others.</li>
          <li>Attempt to gain unauthorized access to the Platform, other user accounts, or connected systems and networks.</li>
          <li>Interfere with, disrupt, or overload the Platform through excessive requests, malware, or other malicious activity.</li>
          <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code or underlying algorithms of the Platform.</li>
          <li>Use the Platform to build a competing product or service, or for benchmarking purposes without our prior written consent.</li>
          <li>Resell, sublicense, or redistribute access to the Platform without authorization.</li>
          <li>Use AI Employees to impersonate individuals, generate spam, or conduct phishing.</li>
        </ul>
        <p>
          We reserve the right to investigate and take appropriate action against anyone who violates this section, including suspension or termination of access.
        </p>
      </LegalSection>

      {/* 6. Subscription & Billing */}
      <LegalSection id="subscription-billing" num="6" title="Subscription & Billing">
        <p>
          Certain features of the Platform require a paid subscription. By selecting a paid plan, you authorize Nagriva to charge the payment method associated with your account on a recurring basis (monthly or annually, as selected).
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Pricing</h3>
        <p>
          Current pricing is published on the Platform&rsquo;s pricing page. We may change pricing at any time; existing subscribers will receive at least 30 days&rsquo; advance notice before any price increase takes effect. If you do not agree to the new pricing, you may cancel your subscription before the change applies.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Payment Processing</h3>
        <p>
          All payments are processed by our third-party payment processor, Stripe. By providing payment information, you agree to Stripe&rsquo;s terms of service. We do not store full credit card details on our servers.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Refunds</h3>
        <p>
          Subscription fees are non-refundable except where required by applicable law. If you cancel a subscription, you will retain access to paid features until the end of the current billing period.
        </p>
      </LegalSection>

      {/* 7. Intellectual Property */}
      <LegalSection id="intellectual-property" num="7" title="Intellectual Property">
        <h3 className="text-base font-semibold text-deep-black mb-2">Our Intellectual Property</h3>
        <p>
          The Platform, including its software, user interface, documentation, branding, trademarks, and all related intellectual property, is owned by Nagriva Inc. and protected by applicable copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Platform in accordance with these Terms.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Your Intellectual Property</h3>
        <p>
          You retain all ownership rights in your content, data, and materials uploaded to or created through the Platform. Nothing in these Terms transfers ownership of your intellectual property to Nagriva.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">License to Your Content</h3>
        <p>
          By uploading content to the Platform, you grant Nagriva a limited, non-exclusive license to process, store, and transmit that content solely for the purpose of providing and improving the Platform. This license terminates when you delete your content or your account, except where retention is required by law.
        </p>
      </LegalSection>

      {/* 8. User Content */}
      <LegalSection id="user-content" num="8" title="User Content">
        <p>
          &ldquo;User Content&rdquo; means any data, text, files, documents, or materials that you upload, submit, or make available through the Platform, including content used to train or configure AI Employees.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Responsibility for Content</h3>
        <p>
          You are solely responsible for your User Content. You represent and warrant that you own or have the necessary rights and permissions to use and share the content you upload, and that it does not violate any applicable law or third-party rights.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Content Removal</h3>
        <p>
          We may remove or disable access to User Content that we reasonably believe violates these Terms or applicable law. We will endeavor to notify you before or promptly after such removal, except where law enforcement or other legal requirements prevent us from doing so.
        </p>
      </LegalSection>

      {/* 9. Privacy */}
      <LegalSection id="privacy" num="9" title="Privacy">
        <p>
          Your use of the Platform is also governed by our <a href="#/privacy" className="text-royal-blue hover:underline font-medium">Privacy Policy</a>, which describes how we collect, use, store, and protect your personal information. By using the Platform, you consent to the collection and use of your information as outlined in the Privacy Policy.
        </p>
        <p>
          We encourage you to review the Privacy Policy to understand our data practices. If you do not agree with those practices, you should not use the Platform.
        </p>
      </LegalSection>

      {/* 10. Third-Party Services */}
      <LegalSection id="third-party-services" num="10" title="Third-Party Services">
        <p>
          The Platform integrates with or links to third-party services, including payment processors, authentication providers, cloud infrastructure, and AI model providers. These services are governed by their own terms and privacy policies.
        </p>
        <p>
          We are not responsible for the availability, accuracy, or practices of third-party services. Your use of third-party services is at your own risk and subject to their respective terms. We disclaim all liability arising from your interaction with third-party services.
        </p>
      </LegalSection>

      {/* 11. Suspension & Termination */}
      <LegalSection id="suspension-termination" num="11" title="Suspension & Termination">
        <h3 className="text-base font-semibold text-deep-black mb-2">By Nagriva</h3>
        <p>
          We may suspend or terminate your access to the Platform, in whole or in part, if we reasonably believe you have violated these Terms, engaged in conduct that is harmful to other users, or posed a security risk to the Platform. We will provide notice where practicable before taking such action.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">By You</h3>
        <p>
          You may cancel your account and terminate your use of the Platform at any time through your account settings or by contacting support. Upon termination, your right to use the Platform ceases immediately.
        </p>

        <h3 className="text-base font-semibold text-deep-black mt-6 mb-2">Effect of Termination</h3>
        <p>
          Upon termination, all licenses granted to you under these Terms will terminate. We will make your data available for export for a reasonable period following termination (typically 30 days), after which it may be deleted. Sections of these Terms that by their nature should survive termination will survive, including intellectual property, disclaimers, limitation of liability, and indemnification.
        </p>
        <NoteBox>
          Termination does not relieve you of any obligations or liabilities incurred prior to the effective date of termination.
        </NoteBox>
      </LegalSection>

      {/* 12. Disclaimers */}
      <LegalSection id="disclaimers" num="12" title="Disclaimers">
        <p>
          The Platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of any kind, whether express, implied, or statutory. To the fullest extent permitted by law, Nagriva disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>
        <p>
          We do not warrant that the Platform will be uninterrupted, error-free, or secure; that defects will be corrected; or that the Platform or the servers that host it are free of viruses or harmful components. We do not warrant the accuracy, completeness, or reliability of any content generated by AI Employees or otherwise made available through the Platform.
        </p>
        <p>
          The Platform is not designed to replace professional advice. You should not rely on AI-generated outputs as a substitute for professional judgment in legal, medical, financial, or other regulated fields.
        </p>
      </LegalSection>

      {/* 13. Limitation of Liability */}
      <LegalSection id="limitation-of-liability" num="13" title="Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, Nagriva Inc. and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, goodwill, or other intangible losses arising out of or in connection with:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Your access to, use of, or inability to use the Platform.</li>
          <li>Any conduct or content of third parties on the Platform.</li>
          <li>Any content obtained from the Platform, including AI-generated outputs.</li>
          <li>Unauthorized access to, alteration, or use of your transmissions or content.</li>
        </ul>
        <p>
          In no event shall our total aggregate liability exceed the greater of (a) the amount you paid to Nagriva in the twelve (12) months preceding the claim, or (b) one hundred U.S. dollars ($100).
        </p>
      </LegalSection>

      {/* 14. Indemnification */}
      <LegalSection id="indemnification" num="14" title="Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless Nagriva Inc. and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Your use of the Platform.</li>
          <li>Your violation of these Terms.</li>
          <li>Your violation of any law or the rights of a third party.</li>
          <li>Any User Content you upload, submit, or make available through the Platform.</li>
        </ul>
        <p>
          We reserve the right, at your expense, to assume the exclusive defense and control of any matter subject to indemnification by you, in which event you will cooperate with us in asserting any available defenses.
        </p>
      </LegalSection>

      {/* 15. Changes to Terms */}
      <LegalSection id="changes-to-terms" num="15" title="Changes to Terms">
        <p>
          We may revise these Terms from time to time. When we make material changes, we will notify you by updating the &ldquo;Last Updated&rdquo; date at the top of this page and, where appropriate, providing additional notice through the Platform or via email.
        </p>
        <p>
          Your continued use of the Platform after the revised Terms are posted constitutes your acceptance of those changes. If you do not agree to the revised Terms, you must stop using the Platform.
        </p>
      </LegalSection>

      {/* 16. Governing Law */}
      <LegalSection id="governing-law" num="16" title="Governing Law">
        <p>
          These Terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles. Any dispute arising under these Terms shall be resolved exclusively in the federal or state courts located in San Francisco County, California, and you consent to the personal jurisdiction of such courts.
        </p>
        <p>
          If you are located in the European Economic Area or the United Kingdom, nothing in this section deprives you of the protection afforded by mandatory provisions of the consumer protection laws of your country of residence.
        </p>
      </LegalSection>

      {/* 17. Contact Information */}
      <section id="contact-information">
        <RevealBlock>
          <h2 className="text-xl md:text-2xl font-bold text-deep-black tracking-tight mb-5 flex items-baseline gap-3">
            <span className="text-gray-300 text-base font-medium tabular-nums">17.</span>
            Contact Information
          </h2>
          <div className="space-y-4 text-[15px] text-gray-600 leading-[1.75]">
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-6 mt-2">
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Legal Inquiries</span>
                  <p className="text-deep-black font-medium mt-0.5">Redwanaitlhadj16@gmail.com                  </p>
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

export default function TermsPage() {
  const [activeId, setActiveId] = useState('acceptance');

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'Terms of Service | Nagriva';

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute(
      'content',
      'Read the Nagriva Terms of Service to understand the rules, responsibilities, and conditions for using our AI workforce platform.'
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
            <MobileTOC activeId={activeId} />

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
