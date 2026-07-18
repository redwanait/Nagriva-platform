import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  ArrowRight,
  ArrowDown,
  Mail,
  Plug,
  Users,
  GraduationCap,
  Globe,
  Code2,
  Rocket,
  Heart,
  Target,
  Sparkles,
  Building2,
  Handshake,
  Award,
  Shield,
  BadgeCheck,
  FileText,
  CalendarDays,
  Fingerprint,
  Send,
  Phone,
  ExternalLink,
  Briefcase,
  CheckCircle2,
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

function RevealScale({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function PartnersPage() {
  useEffect(() => {
    document.title = 'Partners | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Join the Nagriva partner ecosystem. Become a founding partner, build AI solutions, and grow with one of the most ambitious AI platforms in the world.');
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <PartnerTypesSection />
        <FoundingPartnersSection />
        <First100Section />
        <JourneySection />
        <WhyPartnerSection />
        <PartnerBadgeSection />
        <CertificateSection />
        <ReservedWallSection />
        <ApplicationSection />
        <CommunityMessageSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

/* ─── Section 1 — Hero ────────────────────────────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            Partners
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            Don't Just Use Nagriva.
            <br />
            <span className="text-royal-blue">Build With Us.</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            The future of AI won't be built alone. We're building a global partner ecosystem of agencies, developers, startups, and technology companies.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a href="#apply" className="btn-primary text-base px-8 py-3.5 gap-2">
            Become a Partner
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#journey" className="btn-secondary text-base px-8 py-3.5">
            Partner Program
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2 — Partner Types ───────────────────────────────────────── */

const partnerTypes = [
  { icon: Plug, title: 'Technology Partners', description: 'Integrate your products, APIs, or services with the Nagriva platform and expand your reach to thousands of businesses.' },
  { icon: Users, title: 'Agency Partners', description: 'Deliver AI-powered solutions to your clients using Nagriva. Help businesses automate and grow with intelligent AI Employees.' },
  { icon: Sparkles, title: 'AI Consultants', description: 'Advise businesses on AI strategy and implementation. Use Nagriva as the foundation for your consulting practice.' },
  { icon: Code2, title: 'Developers', description: 'Build on top of Nagriva\'s APIs, create integrations, and contribute to the growing developer ecosystem.' },
  { icon: Rocket, title: 'Startup Partners', description: 'Early-stage companies building innovative products. Get priority access, dedicated support, and co-marketing opportunities.' },
  { icon: GraduationCap, title: 'Education Partners', description: 'Universities, bootcamps, and training organizations. Bring AI literacy and real-world platform experience to your programs.' },
];

function PartnerTypesSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Building2 className="h-3.5 w-3.5" />
              Partner Types
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Who We Partner With</h2>
            <p className="text-body max-w-2xl mx-auto">
              We collaborate with organizations in different ways to create mutual value.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {partnerTypes.map((type, i) => (
            <RevealBlock key={type.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110 mb-5">
                  <type.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-2">{type.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{type.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3 — Founding Partners ───────────────────────────────────── */

function FoundingPartnersSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div ref={ref} className="max-w-4xl mx-auto">
            <RevealScale>
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-deep-black p-8 sm:p-10 md:p-14 lg:p-16">
                {/* Glow effects */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-blue/10 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal-blue-light/8 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
                </div>

                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8">
                    <Award className="h-3.5 w-3.5 text-royal-blue-light" />
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Founding Partners</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                    Become One of Our First{' '}
                    <span className="text-royal-blue-light">Founding Partners</span>
                  </h2>

                  <div className="h-px w-16 mx-auto bg-white/10 mb-8" />

                  <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-6">
                    Only the first 100 partners will permanently receive the official Founding Partner recognition.
                  </p>
                  <p className="text-[15px] text-gray-500 leading-relaxed max-w-2xl mx-auto">
                    These companies will always be remembered as the organizations that helped build the Nagriva ecosystem from the beginning.
                  </p>
                </div>
              </div>
            </RevealScale>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Section 4 — The First 100 ───────────────────────────────────────── */

function First100Section() {
  const slots = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Target className="h-3.5 w-3.5" />
              The First 100
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Founding Partner Seats</h2>
            <p className="text-body max-w-2xl mx-auto">
              Every card below represents a founding partner position. This position could be yours.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 sm:gap-2.5">
            {slots.map((num) => (
              <RevealBlock key={num} delay={Math.min(num * 8, 600)}>
                <div className="group relative aspect-square rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center transition-all duration-300 hover:border-royal-blue/30 hover:bg-royal-blue/[0.03] hover:shadow-[0_4px_20px_-4px_rgba(30,64,175,0.12)] cursor-default overflow-hidden">
                  {/* Default content */}
                  <div className="group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center px-1">
                    <span className="text-[10px] sm:text-xs font-bold text-gray-200">{num}</span>
                  </div>

                  {/* Hover content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-royal-blue/[0.04] px-1">
                    <span className="text-[8px] sm:text-[9px] font-bold text-royal-blue leading-tight text-center">Reserved</span>
                    <span className="text-[6px] sm:text-[7px] text-gray-400 text-center leading-tight mt-0.5 hidden sm:block">Future Partner</span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5 — Partnership Journey ─────────────────────────────────── */

const journeySteps = [
  { label: 'Apply', description: 'Submit your partnership application.' },
  { label: 'Introduction Call', description: 'We learn about your business and goals.' },
  { label: 'Partnership Approval', description: 'We formalize the partnership agreement.' },
  { label: 'Integration', description: 'Technical setup and onboarding.' },
  { label: 'Launch Together', description: 'Go live as an official Nagriva partner.' },
  { label: 'Long-term Growth', description: 'Ongoing collaboration and co-marketing.' },
];

function JourneySection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="journey" className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Rocket className="h-3.5 w-3.5" />
              Journey
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Partnership Journey</h2>
            <p className="text-body max-w-2xl mx-auto">
              A straightforward process designed to build lasting relationships.
            </p>
          </div>
        </RevealBlock>

        <div ref={ref} className="max-w-lg mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-royal-blue/20 via-royal-blue/15 to-royal-blue/20" />

            <div className="space-y-0">
              {journeySteps.map((step, i) => {
                const isLast = i === journeySteps.length - 1;
                return (
                  <RevealBlock key={step.label} delay={i * 80}>
                    <div className="relative flex items-start gap-5">
                      {/* Node */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all duration-500 ${
                          isLast
                            ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/20'
                            : 'bg-white border-2 border-royal-blue/15 text-royal-blue'
                        }`}>
                          <span className="text-sm font-bold">{i + 1}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1 md:pt-1">
                        <div className={`rounded-2xl p-5 transition-all duration-300 ${
                          isLast
                            ? 'bg-royal-blue/[0.04] border border-royal-blue/10'
                            : 'bg-white border border-gray-100 hover:border-royal-blue/15 hover:shadow-sm'
                        }`}>
                          <h3 className={`text-sm md:text-base font-semibold ${isLast ? 'text-royal-blue' : 'text-deep-black'} tracking-tight mb-1`}>
                            {step.label}
                          </h3>
                          <p className="text-[13px] text-gray-500 leading-relaxed">{step.description}</p>
                        </div>

                        {!isLast && (
                          <div className="flex justify-start pl-4 md:pl-5 py-2.5">
                            <ArrowDown className="h-4 w-4 text-royal-blue/25" />
                          </div>
                        )}
                      </div>
                    </div>
                  </RevealBlock>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6 — Why Partner ─────────────────────────────────────────── */

const whyPartnerReasons = [
  { icon: Globe, title: 'Reach new customers.', description: 'Access the growing Nagriva ecosystem and connect with businesses actively looking for AI solutions.' },
  { icon: Sparkles, title: 'Build AI solutions.', description: 'Use Nagriva\'s platform and APIs to create intelligent products that solve real business problems.' },
  { icon: Rocket, title: 'Grow together.', description: 'As Nagriva grows, our partners grow. Early partnerships create the strongest long-term advantages.' },
  { icon: Heart, title: 'Dedicated support.', description: 'Partners receive priority technical support, onboarding assistance, and dedicated communication channels.' },
  { icon: Target, title: 'Marketing collaboration.', description: 'Co-marketing opportunities, joint content, shared events, and visibility across the Nagriva network.' },
  { icon: Shield, title: 'Early access to features.', description: 'Be the first to know about new releases, APIs, and platform capabilities before anyone else.' },
];

function WhyPartnerSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Heart className="h-3.5 w-3.5" />
              Why Partner
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Why Partner with Nagriva</h2>
            <p className="text-body max-w-2xl mx-auto">
              What makes a partnership with Nagriva valuable.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {whyPartnerReasons.map((reason, i) => (
              <RevealBlock key={reason.title} delay={i * 60}>
                <div className="group relative rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.06)] h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                      <reason.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-deep-black mb-1.5 leading-snug">{reason.title}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 7 — Official Partner Badge ──────────────────────────────── */

function PartnerBadgeSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center">
              {/* Badge Placeholder */}
              <RevealScale>
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-br from-royal-blue/8 to-royal-blue-light/8 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 overflow-hidden transition-all duration-300 group-hover:border-royal-blue/25">
                    <div className="flex flex-col items-center justify-center py-16 px-8 min-h-[320px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-6">
                        <BadgeCheck className="h-7 w-7" />
                      </div>

                      {/* Badge preview */}
                      <div className="relative mb-6">
                        <div className="rounded-2xl border border-royal-blue/10 bg-white px-8 py-6 shadow-sm">
                          <p className="text-[10px] font-bold text-royal-blue tracking-[0.2em] uppercase mb-1">Official</p>
                          <p className="text-lg font-bold text-deep-black tracking-tight">Nagriva Partner</p>
                          <p className="text-xs text-gray-400 font-semibold mt-1">2026</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 text-center max-w-[220px]">
                        Badge Placeholder — This will be replaced by the official partner badge image.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealScale>

              {/* Details */}
              <RevealBlock delay={100}>
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
                    <Shield className="h-3.5 w-3.5" />
                    Official Badge
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-black tracking-tight leading-tight mb-5">
                    Official Partner Badge
                  </h2>
                  <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
                    Approved partners receive the official Nagriva Partner badge — a mark of trust, quality, and long-term collaboration.
                  </p>
                  <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
                    Display it proudly on your website, proposals, and marketing materials to show your customers that you're part of the Nagriva ecosystem.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]">
                      <ExternalLink className="h-4 w-4" />
                      View Badge Guidelines
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]">
                      <Download className="h-4 w-4" />
                      Download Badge Kit
                    </button>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Section 8 — Partnership Certificate ─────────────────────────────── */

function CertificateSection() {
  const certificateFields = [
    { icon: Building2, label: 'Company Name' },
    { icon: Award, label: 'Partner Level' },
    { icon: CalendarDays, label: 'Issue Date' },
    { icon: FileText, label: 'Founder Signature' },
    { icon: Shield, label: 'Official Nagriva Seal' },
    { icon: Fingerprint, label: 'Unique Verification ID' },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <FileText className="h-3.5 w-3.5" />
              Certificate
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Official Partnership Certificate</h2>
            <p className="text-body max-w-2xl mx-auto">
              Every approved partner receives an official partnership certificate issued by Nagriva.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
            {/* Certificate Preview */}
            <RevealScale>
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-br from-royal-blue/8 to-royal-blue-light/8 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 overflow-hidden transition-all duration-300 group-hover:border-royal-blue/25">
                  <div className="flex flex-col items-center justify-center py-16 px-8 min-h-[340px] md:min-h-[400px]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-6">
                      <Award className="h-7 w-7" />
                    </div>
                    <p className="text-sm font-semibold text-deep-black mb-1 text-center">Certificate Preview</p>
                    <p className="text-xs text-gray-400 text-center max-w-[240px]">
                      Image Placeholder — This will be replaced by the official Nagriva Partnership Certificate.
                    </p>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-royal-blue/15 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-royal-blue/15 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-royal-blue/15 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-royal-blue/15 rounded-br-lg" />
                </div>
              </div>
            </RevealScale>

            {/* Certificate Details */}
            <RevealBlock delay={100}>
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-deep-black">What's included</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Every Nagriva Partnership Certificate contains the following verified details:
                </p>

                <div className="space-y-3">
                  {certificateFields.map((field) => (
                    <div key={field.label} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/[0.06] text-royal-blue flex-shrink-0">
                        <field.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{field.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]">
                    <FileText className="h-4 w-4" />
                    Preview Certificate
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]">
                    <BadgeCheck className="h-4 w-4" />
                    Verify Certificate
                  </button>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 9 — Reserved Partner Wall ───────────────────────────────── */

function ReservedWallSection() {
  const wallSlots = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Building2 className="h-3.5 w-3.5" />
              Partner Wall
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Reserved Partner Wall</h2>
            <p className="text-body max-w-2xl mx-auto">
              Each space below is waiting for an exceptional partner. When you join, your company will be featured here.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wallSlots.map((num) => (
              <RevealBlock key={num} delay={Math.min(num * 30, 500)}>
                <div className="group relative rounded-2xl border border-gray-100 bg-white p-6 flex flex-col items-center justify-center text-center min-h-[140px] transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.06)] overflow-hidden">
                  {/* Subtle background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-royal-blue/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col items-center justify-center h-full">
                    <p className="text-xs font-bold text-gray-200 tracking-wider uppercase mb-2">Reserved</p>
                    <p className="text-[11px] text-gray-400 leading-snug">This space is waiting for an exceptional partner.</p>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-bold text-royal-blue">Become the First.</span>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 10 — Become a Partner ───────────────────────────────────── */

function ApplicationSection() {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    country: '',
    size: '',
    type: '',
    description: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="apply" className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Send className="h-3.5 w-3.5" />
              Apply
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Become a Partner</h2>
            <p className="text-body max-w-2xl mx-auto">
              Tell us about your company. We review every application personally.
            </p>
          </div>
        </RevealBlock>

        <RevealBlock>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="rounded-2xl md:rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 md:p-10">
              <div className="space-y-5">
                {/* Company Name */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-deep-black mb-2">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Your company name"
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400"
                  />
                </div>

                {/* Website + Country */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-deep-black mb-2">Website</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      required
                      placeholder="https://yourcompany.com"
                      className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-deep-black mb-2">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Company Size + Partner Type */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="size" className="block text-sm font-semibold text-deep-black mb-2">Company Size</label>
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1–10 employees</option>
                      <option value="11-50">11–50 employees</option>
                      <option value="51-200">51–200 employees</option>
                      <option value="201-1000">201–1,000 employees</option>
                      <option value="1000+">1,000+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-semibold text-deep-black mb-2">Partner Type</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                      <option value="">Select type</option>
                      <option value="technology">Technology Partner</option>
                      <option value="agency">Agency Partner</option>
                      <option value="consultant">AI Consultant</option>
                      <option value="developer">Developer</option>
                      <option value="startup">Startup Partner</option>
                      <option value="education">Education Partner</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-deep-black mb-2">Describe Your Business</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What does your company do? How do you see a partnership with Nagriva?"
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400 resize-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-deep-black mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="partnerships@yourcompany.com"
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4" />
                    Submit Application
                  </button>
                  <a
                    href="#/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
                  >
                    <Phone className="h-4 w-4" />
                    Schedule a Call
                  </a>
                </div>
              </div>
            </div>
          </form>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Section 11 — Community Message ──────────────────────────────────── */

function CommunityMessageSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div ref={ref} className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-black tracking-tight leading-snug mb-6">
              Great Companies Are Built Together.
            </h2>
            <p className="text-[15px] md:text-base text-gray-500 leading-relaxed mb-4">
              The strongest ecosystems are created through collaboration. We're looking for companies that share our vision of making AI more accessible for every business.
            </p>
            <p className="text-[15px] md:text-base text-gray-500 leading-relaxed">
              Whether you're a startup, an agency, a software company, or an educational institution — if you believe in the power of AI to transform businesses, we want to work with you.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Section 12 — Final CTA ──────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Let's Build the Future of AI{' '}
                <span className="text-royal-blue">Together.</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                This page may be empty today. But every great partnership starts with one conversation. Maybe your company will become one of the first names in the Nagriva ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#apply" className="btn-primary text-base px-8 py-3.5 gap-2">
                  Become a Partner
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#/contact" className="btn-secondary text-base px-8 py-3.5 gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Partnership Team
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Download Icon ───────────────────────────────────────────────────── */

function Download(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
