import { useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import {
  Shield,
  Lock,
  KeyRound,
  Eye,
  RefreshCw,
  ArrowRight,
  Mail,
  ShieldCheck,
  Server,
  Users,
  FileKey,
  Clock,
  CheckCircle2,
  Activity,
  HardDrive,
  Radar,
  Quote,
  Heart,
  ArrowDown,
  ShieldAlert,
  Scan,
  Database,
} from 'lucide-react';
import Footer from './Footer';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: `${delay}ms` }}
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
      className={`transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${className}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase px-4 py-1.5 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full">
      {children}
    </span>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function SecurityPage() {
  useEffect(() => {
    document.title = 'Security | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Learn how Nagriva protects your business, conversations, and data with enterprise-grade security, encryption, and responsible practices.');
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <SecurityPromiseSection />
        <CommitmentSection />
        <TimelineSection />
        <StatusSection />
        <NeverSleepsSection />
        <PersonalCommitmentSection />
        <HumorSection />
        <DisclosureSection />
        <FinalCTASection />
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
        <div className={`text-center mb-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <SectionLabel>
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue animate-pulse" />
            Security
          </SectionLabel>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '100ms' }}>
          <h1 className="heading-xl text-deep-black mb-6">
            Security isn't a feature.
            <br />
            <span className="text-royal-blue">It's our responsibility.</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Every decision we make is guided by one principle: protecting your business, your conversations, and your data.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '200ms' }}>
          <a href="#/contact" className="btn-primary text-base px-8 py-3.5 gap-2">
            Contact Security Team
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#/privacy" className="btn-secondary text-base px-8 py-3.5">
            Read Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2 — Security Promise ────────────────────────────────────── */

function SecurityPromiseSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <Reveal>
          <div ref={ref} className="max-w-4xl mx-auto text-center">
            <div className="relative">
              {/* Decorative quote marks */}
              <div className="absolute -top-8 -left-4 md:-top-12 md:-left-8 text-royal-blue/10 select-none pointer-events-none" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
                &ldquo;
              </div>
              <div className="absolute -bottom-12 -right-4 md:-bottom-16 md:-right-8 text-royal-blue/10 select-none pointer-events-none" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
                &rdquo;
              </div>

              <blockquote className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-semibold text-deep-black leading-snug tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                From the moment your data enters Nagriva, protecting it becomes our responsibility.
              </blockquote>
            </div>

            <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '150ms' }}>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
                We work every day to keep your information secure, private, and available whenever you need it.
              </p>
            </div>

            <div className={`mt-10 flex justify-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '250ms' }}>
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-royal-blue/30" />
                <div className="h-1.5 w-1.5 rounded-full bg-royal-blue" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-royal-blue/30" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Section 3 — Our Commitment (Editorial Layout) ───────────────────── */

const commitments = [
  {
    icon: Lock,
    title: 'Enterprise Encryption',
    description: 'Every piece of data is encrypted at rest and in transit. We use industry-standard AES-256 encryption for stored data and TLS 1.3 for all communications. Your information is protected from the moment it leaves your device to the moment you access it again.',
    accent: 'bg-royal-blue/[0.04]',
    iconBg: 'bg-royal-blue/[0.06]',
    iconColor: 'text-royal-blue',
  },
  {
    icon: KeyRound,
    title: 'Identity Protection',
    description: 'Authentication is handled through secure, modern protocols. Passwords are never stored in plain text. Every access attempt is validated, every session is managed, and every user identity is verified before any data is exposed.',
    accent: 'bg-emerald-50/50',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Server,
    title: 'Secure Infrastructure',
    description: 'Our infrastructure is built on enterprise-grade cloud providers with SOC 2 compliance. Every server, every database, and every endpoint is configured following security best practices. We don\'t just use secure infrastructure — we actively maintain and harden it.',
    accent: 'bg-violet-50/50',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Radar,
    title: 'Continuous Monitoring',
    description: 'Security isn\'t something we check once and forget. Our systems are monitored around the clock. We watch for anomalies, track access patterns, and respond to threats before they become incidents. Protection that never pauses.',
    accent: 'bg-amber-50/50',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Access Control',
    description: 'Not everyone should see everything. We enforce strict role-based access controls across every layer of the platform. Users only access what they\'re authorized to see. Resources are isolated, permissions are granular, and every access is logged.',
    accent: 'bg-sky-50/50',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: ShieldAlert,
    title: 'Incident Response',
    description: 'If something goes wrong, we are prepared. Our incident response process is documented, tested, and ready. We communicate transparently, act quickly, and learn from every event to make the platform stronger.',
    accent: 'bg-rose-50/50',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

function CommitmentSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Our Commitment</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">
              Security built into every layer.
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Not bolted on as an afterthought. woven into the foundation of everything we build.
            </p>
          </div>
        </Reveal>

        <div className="max-w-5xl mx-auto space-y-6">
          {commitments.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className={`group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-start rounded-2xl border border-gray-100 bg-white p-7 md:p-8 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.06)]`}>
                {/* Left: Icon + Title */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor} transition-all duration-300 group-hover:scale-105`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-deep-black tracking-tight">{item.title}</h3>
                </div>

                {/* Right: Description */}
                <div>
                  <p className="text-[15px] text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4 — Security Principles Timeline ────────────────────────── */

const timelineSteps = [
  { icon: Lock, label: 'Your data is encrypted', detail: 'AES-256 at rest, TLS 1.3 in transit' },
  { icon: KeyRound, label: 'Access is restricted', detail: 'Role-based controls on every resource' },
  { icon: Radar, label: 'Systems are monitored', detail: '24/7 automated threat detection' },
  { icon: Scan, label: 'Threats are detected', detail: 'Real-time anomaly analysis and alerts' },
  { icon: RefreshCw, label: 'Updates are deployed', detail: 'Continuous patches and improvements' },
  { icon: ShieldCheck, label: 'Your business stays protected', detail: 'Security that never takes a break' },
];

function TimelineSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">
              From data to protection.
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              A continuous cycle that keeps your business safe at every stage.
            </p>
          </div>
        </Reveal>

        <div ref={ref} className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
              <div className={`h-full w-full bg-gradient-to-b from-royal-blue/20 via-royal-blue/15 to-royal-blue/20 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            <div className="space-y-0">
              {timelineSteps.map((step, i) => {
                const isLast = i === timelineSteps.length - 1;
                return (
                  <Reveal key={step.label} delay={i * 80}>
                    <div className="relative flex items-start gap-5 md:gap-7">
                      {/* Node */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full transition-all duration-500 ${
                          isLast
                            ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/20'
                            : 'bg-white border-2 border-royal-blue/15 text-royal-blue'
                        }`}>
                          <step.icon className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`flex-1 pb-${isLast ? '0' : '10'} ${isLast ? 'pt-3 md:pt-4' : 'pt-3 md:pt-4'}`}>
                        <div className={`rounded-2xl p-5 md:p-6 transition-all duration-300 ${
                          isLast
                            ? 'bg-royal-blue/[0.04] border border-royal-blue/10'
                            : 'bg-white border border-gray-100 hover:border-royal-blue/15 hover:shadow-sm'
                        }`}>
                          <h3 className={`text-base md:text-lg font-semibold ${isLast ? 'text-royal-blue' : 'text-deep-black'} tracking-tight mb-1`}>
                            {step.label}
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed">{step.detail}</p>
                        </div>

                        {/* Arrow connector between items */}
                        {!isLast && (
                          <div className="flex justify-start pl-5 md:pl-7 py-3">
                            <ArrowDown className="h-4 w-4 text-royal-blue/25" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5 — Security Status ─────────────────────────────────────── */

const statusItems = [
  { label: 'Encryption', status: 'Active', icon: Lock, color: 'emerald' },
  { label: 'Monitoring', status: '24/7', icon: Activity, color: 'emerald' },
  { label: 'Backups', status: 'Healthy', icon: HardDrive, color: 'emerald' },
  { label: 'Infrastructure', status: 'Operational', icon: Server, color: 'emerald' },
  { label: 'Incident Response', status: 'Ready', icon: ShieldAlert, color: 'emerald' },
];

function StatusSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Status</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">
              Security at a glance.
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Real-time status of our core security systems.
            </p>
          </div>
        </Reveal>

        <RevealScale>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl md:rounded-3xl border border-gray-100 bg-white overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-5 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-deep-black">System Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600">All Systems Operational</span>
                </div>
              </div>

              {/* Status rows */}
              <div className="divide-y divide-gray-50">
                {statusItems.map((item, i) => (
                  <div key={item.label} className="flex items-center justify-between px-6 md:px-8 py-4 md:py-5 hover:bg-gray-50/30 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-deep-black">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-600">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealScale>
      </div>
    </section>
  );
}

/* ─── Section 6 — Security Never Sleeps ───────────────────────────────── */

function NeverSleepsSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <Reveal>
          <div ref={ref} className="max-w-4xl mx-auto">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <SectionLabel>Our Promise</SectionLabel>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-6">
                  Security never sleeps.
                </h2>
                <p className="text-[15px] md:text-base text-gray-500 leading-relaxed mb-6">
                  Protecting customer data isn't something we do once. It's something we work on every single day.
                </p>
                <p className="text-[15px] md:text-base text-gray-500 leading-relaxed">
                  From automated threat monitoring to regular security audits, our team stays vigilant so your business stays protected. Security is not a destination — it's a continuous commitment.
                </p>
              </div>

              {/* Right: Visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 to-royal-blue-light/5 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl md:rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm">
                  <div className="space-y-5">
                    {[
                      { icon: Eye, text: 'Monitoring', sub: 'Always watching' },
                      { icon: Shield, text: 'Protecting', sub: 'Every transaction' },
                      { icon: RefreshCw, text: 'Improving', sub: 'Every single day' },
                    ].map((item, i) => (
                      <div key={item.text} className={`flex items-center gap-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: `${200 + i * 100}ms` }}>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue flex-shrink-0">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-deep-black">{item.text}</p>
                          <p className="text-xs text-gray-400">{item.sub}</p>
                        </div>
                        <div className="ml-auto">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Section 7 — Personal Commitment ─────────────────────────────────── */

function PersonalCommitmentSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
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
                    <Heart className="h-3.5 w-3.5 text-royal-blue-light" />
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">A Personal Commitment</span>
                  </div>

                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-snug tracking-tight mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
                    "From the moment you trust Nagriva with your business, we consider protecting your data our responsibility."
                  </blockquote>

                  <div className="h-px w-16 mx-auto bg-white/10 mb-8" />

                  <p className="text-[15px] md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto mb-4">
                    We know every file, every conversation, and every customer interaction matters.
                  </p>
                  <p className="text-[15px] md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    That's why we protect your information as if it were our own.
                  </p>
                </div>
              </div>
            </RevealScale>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Section 8 — Light Humor ─────────────────────────────────────────── */

function HumorSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 md:p-10">
              <p className="text-lg md:text-xl font-medium text-deep-black leading-relaxed">
                The safest data is the data even we can't read.
              </p>
              <p className="text-sm text-gray-400 mt-3">
                Our developers don't have access to your passwords. Because even we can't see them.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Section 9 — Responsible Disclosure ──────────────────────────────── */

function DisclosureSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06]">
                <ShieldAlert className="h-6 w-6 text-royal-blue" />
              </div>
            </div>
            <h2 className="heading-md text-deep-black mb-4">Found a security issue?</h2>
            <p className="text-body-sm max-w-xl mx-auto mb-8">
              We appreciate responsible security research. If you discover a potential vulnerability, please report it to us. We investigate every legitimate report.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:security@nagriva.com" className="btn-primary text-base px-8 py-3.5 gap-2">
                <Mail className="h-4 w-4" />
                Report a Vulnerability
              </a>
              <a href="#/contact" className="btn-secondary text-base px-8 py-3.5 gap-2">
                Contact Security Team
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Section 10 — Final CTA ──────────────────────────────────────────── */

function FinalCTASection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <Reveal>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Security is a promise{' '}
                <span className="text-royal-blue">we keep every day.</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Your trust matters to us. We earn it through consistent action, transparent practices, and unwavering commitment to your protection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#/privacy" className="btn-primary text-base px-8 py-3.5 gap-2">
                  Read Privacy Policy
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#/contact" className="btn-secondary text-base px-8 py-3.5">
                  Contact Security Team
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
