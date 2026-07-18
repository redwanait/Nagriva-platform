import { useEffect, useState, useRef, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import { supabase } from '../lib/supabase';
import Toast from './Toast';
import {
  ArrowRight,
  ArrowDown,
  Send,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Upload,
  Briefcase,
  Star,
  Shield,
  BadgeCheck,
  Fingerprint,
  CalendarDays,
  Download,
  Eye,
  Loader2,
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

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [formHighlight, setFormHighlight] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Careers | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Join Nagriva as one of the first founding team members. Build the future of AI Employees with us — apply now for open engineering, design, and growth roles.');
  }, []);

  useEffect(() => {
    if (window.location.hash === '#apply') {
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setFormHighlight(true);
        setTimeout(() => setFormHighlight(false), 2000);
      }, 100);
    }
  }, []);

  const scrollToApply = useCallback((positionValue?: string) => {
    if (positionValue) setSelectedPosition(positionValue);
    window.history.pushState(null, '', '#apply');
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setFormHighlight(true);
      setTimeout(() => setFormHighlight(false), 2000);
      setTimeout(() => {
        const nameInput = document.getElementById('name') as HTMLInputElement | null;
        nameInput?.focus();
      }, 600);
    }, 50);
  }, []);

  return (
    <>
      <main>
        <HeroSection onApply={() => scrollToApply()} />
        <FoundingSeatsSection onApply={scrollToApply} />
        <WhyJoinSection />
        <ProcessSection />
        <CertificateSection />
        <ApplicationSection
          formSectionRef={formSectionRef}
          highlight={formHighlight}
          selectedPosition={selectedPosition}
        />
        <CTASection onApply={() => scrollToApply()} />
      </main>
      <Footer />
    </>
  );
}

/* ─── Section 1 — Hero ────────────────────────────────────────────────── */

function HeroSection({ onApply }: { onApply: () => void }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            Careers
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            Build the Future of{' '}
            <span className="text-royal-blue">AI with Us.</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            At Nagriva, we're not simply hiring employees. We're looking for builders, problem-solvers, and creators who want to shape the future of AI.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a href="#/positions" className="btn-primary text-base px-8 py-3.5 gap-2">
            View Open Positions
            <ArrowRight className="h-4 w-4" />
          </a>
          <button onClick={onApply} className="btn-secondary text-base px-8 py-3.5">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2 — Founding Team Seats ─────────────────────────────────── */

const foundingRoles = [
  {
    name: 'Redouane Ait EL-HADJ',
    role: 'Founder & CEO',
    image: 'https://i.ibb.co/60406dmp/Whats-App-Image-2026-06-02-at-15-37-53-1.jpg',
    isFounder: true,
    status: 'Founder',
    description: 'Building Nagriva from the ground up.',
  },
  {
    role: 'Frontend Engineer',
    status: 'open',
    seats: '1 Seat Available',
    description: 'Build the interfaces that thousands of businesses will use every day.',
  },
  {
    role: 'Backend Engineer',
    status: 'open',
    seats: '1 Seat Available',
    description: 'Design and scale the infrastructure behind Nagriva\'s AI platform.',
  },
  {
    role: 'AI Engineer',
    status: 'open',
    seats: '1 Seat Available',
    description: 'Train, optimize, and deploy the AI that powers every Nagriva Employee.',
  },
  {
    role: 'UI/UX Designer',
    status: 'open',
    seats: '1 Seat Available',
    description: 'Craft the visual language and experience of the entire platform.',
  },
  {
    role: 'Marketing & Growth',
    status: 'open',
    seats: '1 Seat Available',
    description: 'Tell Nagriva\'s story and help us reach businesses worldwide.',
  },
];

function FoundingSeatsSection({ onApply }: { onApply: (position?: string) => void }) {
  const roleToValue: Record<string, string> = {
    'Frontend Engineer': 'frontend',
    'Backend Engineer': 'backend',
    'AI Engineer': 'ai',
    'UI/UX Designer': 'design',
    'Marketing & Growth': 'growth',
  };

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Star className="h-3.5 w-3.5" />
              Founding Team
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Become One of the First 5 People Behind Nagriva
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Every great company starts with a small team. We're currently opening only five founding positions. Once a position is filled, it becomes part of Nagriva's founding story.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {foundingRoles.map((person, i) => (
            <RevealBlock key={person.role} delay={i * 60}>
              {person.isFounder ? (
                /* Founder Card */
                <div className="relative group rounded-2xl border border-royal-blue/15 bg-white p-7 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/[0.02] to-transparent pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative flex-shrink-0">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-royal-blue/10"
                        />
                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-royal-blue text-white">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-deep-black">{person.name}</h3>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-blue">
                          <Shield className="h-3 w-3" />
                          {person.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{person.description}</p>
                  </div>
                </div>
              ) : (
                /* Open Position Card */
                <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Open
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-deep-black mb-1">{person.role}</h3>
                  <p className="text-xs text-gray-400 font-medium mb-3">{person.seats}</p>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{person.description}</p>
                  <button
                    onClick={() => onApply(roleToValue[person.role])}
                    className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]"
                  >
                    Apply
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3 — Why Join Nagriva ────────────────────────────────────── */

const reasons = [
  { title: 'Build directly with the founder.', description: 'No layers of management. Work side by side with the person who started it all.' },
  { title: 'Work on real AI products.', description: 'Not prototypes. Not experiments. Real products that real businesses use every day.' },
  { title: 'Help shape product decisions.', description: 'Your ideas won\'t get lost in a backlog. Early team members define the direction of the product.' },
  { title: 'Learn modern technologies.', description: 'React, TypeScript, Supabase, AI models, cloud infrastructure — you\'ll work with all of it.' },
  { title: 'Grow with the company.', description: 'The first five people set the culture. This is your chance to grow into a leadership role from day one.' },
  { title: 'Leave your mark on Nagriva.', description: 'Years from now, you\'ll be able to point to something and say: "I helped build that."' },
];

function WhyJoinSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              Why Nagriva
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Why Join Nagriva</h2>
            <p className="text-body max-w-2xl mx-auto">
              This isn't a corporate job. It's an invitation to build something from scratch.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <RevealBlock key={reason.title} delay={i * 60}>
                <div className="group relative rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.06)] h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                      <CheckCircle2 className="h-4 w-4" />
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

/* ─── Section 4 — Hiring Process ──────────────────────────────────────── */

const processSteps = [
  { label: 'Application', description: 'Submit your details and tell us your story.' },
  { label: 'Portfolio Review', description: 'We review your work and experience.' },
  { label: 'Interview', description: 'A casual conversation to get to know you.' },
  { label: 'Selection', description: 'We make a decision based on fit and potential.' },
  { label: 'Welcome to Nagriva', description: 'You become part of the founding team.' },
];

function ProcessSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              Process
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Hiring Process</h2>
            <p className="text-body max-w-2xl mx-auto">
              A straightforward process designed to be respectful of your time.
            </p>
          </div>
        </RevealBlock>

        <div ref={ref} className="max-w-lg mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-royal-blue/20 via-royal-blue/15 to-royal-blue/20" />

            <div className="space-y-0">
              {processSteps.map((step, i) => {
                const isLast = i === processSteps.length - 1;
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
                      <div className={`flex-1 ${isLast ? 'pt-1 md:pt-1' : 'pt-1 md:pt-1'}`}>
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

/* ─── Section 5 — Experience Certificate ──────────────────────────────── */

function CertificateSection() {
  const { ref, isInView } = useInView(0.1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const CERT_IMAGE = 'https://i.ibb.co/fYzNPtgd/Chat-GPT-Image-Jul-18-2026-01-34-44-PM.png';

  const certificateFields = [
    { icon: FileText, label: 'Employee Name' },
    { icon: Briefcase, label: 'Position' },
    { icon: CalendarDays, label: 'Contribution Period' },
    { icon: Award, label: 'Founder Signature' },
    { icon: Shield, label: 'Official Nagriva Seal' },
    { icon: Fingerprint, label: 'Unique Verification ID' },
    { icon: CalendarDays, label: 'Issue Date' },
  ];

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!verifyOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVerifyOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [verifyOpen]);

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Award className="h-3.5 w-3.5" />
              Certificate
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Earn Your Nagriva Experience Certificate
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Everyone who successfully completes their internship or collaboration with Nagriva may receive an official digital certificate recognizing their contribution to the company.
            </p>
          </div>
        </RevealBlock>

        <div ref={ref} className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
            {/* Certificate Preview */}
            <RevealScale>
              <div className="relative group cursor-pointer" onClick={() => setLightboxOpen(true)}>
                {/* Glow */}
                <div className="absolute -inset-3 bg-gradient-to-br from-royal-blue/8 to-royal-blue-light/8 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-[0_12px_40px_-8px_rgba(30,64,175,0.12)] group-hover:border-royal-blue/20">
                  <img
                    src={CERT_IMAGE}
                    alt="Nagriva Experience Certificate"
                    className="w-full h-auto block rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>
            </RevealScale>

            {/* Certificate Details */}
            <RevealBlock delay={100}>
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-deep-black">What's included</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Every Nagriva Experience Certificate contains the following verified details:
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
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]"
                  >
                    <FileText className="h-4 w-4" />
                    Preview Certificate
                  </button>
                  <button
                    onClick={() => setVerifyOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
                  >
                    <BadgeCheck className="h-4 w-4" />
                    Verify Certificate
                  </button>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-110"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <img
            src={CERT_IMAGE}
            alt="Nagriva Experience Certificate — Full View"
            className="relative z-10 max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Verification Modal */}
      {verifyOpen && (
        <VerifyModal onClose={() => setVerifyOpen(false)} certImage={CERT_IMAGE} />
      )}
    </section>
  );
}

/* ─── Certificate Verification Modal ─────────────────────────────────── */

function VerifyModal({ onClose, certImage }: { onClose: () => void; certImage: string }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setShowContent(true)));
  }, []);

  const details = [
    { label: 'Certificate ID', value: 'NAG-2026-000001' },
    { label: 'Recipient', value: 'Ahmed Reda' },
    { label: 'Position', value: 'AI Employee Management Intern' },
    { label: 'Organization', value: 'Nagriva' },
    { label: 'Issued By', value: 'Redouane Ait El Hadj' },
    { label: 'Issue Date', value: 'July 18, 2026' },
    { label: 'Completion Status', value: 'Successfully Completed' },
    { label: 'Verification Timestamp', value: 'Verified just now' },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`} />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-500 ease-out ${
          showContent ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Header glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-emerald-400/[0.06] rounded-full blur-[60px] pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all duration-200 hover:bg-gray-200 hover:text-deep-black hover:scale-110"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
          {/* Verified badge */}
          <div className="flex flex-col items-center mb-6">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mb-4 transition-all duration-700 ease-out ${
                showContent ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/25">
                <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <h3 className="text-lg font-bold text-deep-black mb-1">Certificate Verification</h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-700">Verified Certificate</span>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 overflow-hidden mb-6">
            {details.map((d, i) => (
              <div
                key={d.label}
                className={`flex items-start justify-between gap-4 px-4 sm:px-5 py-3 transition-all duration-500 ease-out ${
                  i !== details.length - 1 ? 'border-b border-gray-100' : ''
                } ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: `${200 + i * 50}ms` }}
              >
                <span className="text-[13px] text-gray-400 flex-shrink-0 pt-px">{d.label}</span>
                <span className="text-[13px] font-semibold text-deep-black text-right">{d.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={certImage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]"
            >
              <Eye className="h-4 w-4" />
              View Certificate
            </a>
            <a
              href={certImage}
              download="Nagriva-Certificate-NAG-2026-000001.png"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="sm:flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section 6 — Application Form ────────────────────────────────────── */

const CV_BUCKET = 'career-cv';
const ALLOWED_CV_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_CV_EXTENSIONS = ['pdf', 'docx'];
const MAX_CV_SIZE = 10 * 1024 * 1024; // 10MB

function ApplicationSection({
  formSectionRef,
  highlight,
  selectedPosition,
}: {
  formSectionRef: React.RefObject<HTMLDivElement | null>;
  highlight: boolean;
  selectedPosition: string;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    position: '',
    portfolio: '',
    linkedin: '',
    about: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedPosition) {
      setFormData(prev => ({ ...prev, position: selectedPosition }));
    }
  }, [selectedPosition]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_CV_EXTENSIONS.includes(ext)) {
      setToast({ message: 'Please upload a PDF or DOCX file.', type: 'error' });
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setToast({ message: 'File is too large. Maximum size is 10MB.', type: 'error' });
      return;
    }

    setCvFile(file);
    setCvFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_CV_EXTENSIONS.includes(ext)) {
      setToast({ message: 'Please upload a PDF or DOCX file.', type: 'error' });
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setToast({ message: 'File is too large. Maximum size is 10MB.', type: 'error' });
      return;
    }

    setCvFile(file);
    setCvFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setToast({ message: 'Please enter your full name.', type: 'error' });
      return;
    }
    if (!formData.email.trim()) {
      setToast({ message: 'Please enter your email address.', type: 'error' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setToast({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    if (!formData.position) {
      setToast({ message: 'Please select a desired position.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      let cvFileUrl = '';
      let cvSavedName = '';

      // Step 1: Upload CV to Supabase Storage
      if (cvFile) {
        const ext = cvFile.name.split('.').pop()?.toLowerCase() || 'pdf';
        const storagePath = `cvs/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const { error: uploadErr } = await supabase.storage
          .from(CV_BUCKET)
          .upload(storagePath, cvFile, {
            contentType: cvFile.type || 'application/pdf',
            upsert: false,
          });

        if (uploadErr) {
          console.error('CV upload error:', uploadErr);
          setToast({ message: 'Failed to upload CV. Please try again.', type: 'error' });
          setLoading(false);
          return;
        }

        // Step 2: Get public URL
        const { data: urlData } = supabase.storage
          .from(CV_BUCKET)
          .getPublicUrl(storagePath);

        cvFileUrl = urlData.publicUrl;
        cvSavedName = cvFile.name;
      }

      // Step 3: Insert into career_applications table
      const { error: insertErr } = await supabase
        .from('career_applications')
        .insert({
          full_name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          country: formData.country.trim() || null,
          desired_position: formData.position,
          portfolio_url: formData.portfolio.trim() || null,
          linkedin_url: formData.linkedin.trim() || null,
          about: formData.about.trim() || null,
          cv_file_url: cvFileUrl || null,
          cv_file_name: cvSavedName || null,
          status: 'pending',
        });

      if (insertErr) {
        console.error('Application insert error:', insertErr);
        setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
        setLoading(false);
        return;
      }

      // Step 4: Success
      setToast({ message: 'Application submitted successfully! We\'ll be in touch soon.', type: 'success' });

      // Step 5: Reset form
      setFormData({ name: '', email: '', country: '', position: '', portfolio: '', linkedin: '', about: '' });
      setCvFile(null);
      setCvFileName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Unexpected error:', err);
      setToast({ message: 'An unexpected error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" ref={formSectionRef} className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Send className="h-3.5 w-3.5" />
              Apply
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Join the Founding Team</h2>
            <p className="text-body max-w-2xl mx-auto">
              Tell us about yourself. We read every application personally.
            </p>
          </div>
        </RevealBlock>

        <RevealBlock>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div
              className={`rounded-2xl md:rounded-3xl border bg-white p-6 sm:p-8 md:p-10 transition-all duration-500 ${
                highlight
                  ? 'border-royal-blue/40 shadow-[0_0_0_4px_rgba(30,64,175,0.08),0_8px_40px_-8px_rgba(30,64,175,0.15)]'
                  : 'border-gray-100'
              }`}
            >
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-deep-black mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400"
                  />
                </div>

                {/* Email + Country */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-deep-black mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
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

                {/* Position */}
                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-deep-black mb-2">Desired Position</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">Select a position</option>
                    <option value="frontend">Frontend Engineer</option>
                    <option value="backend">Backend Engineer</option>
                    <option value="ai">AI Engineer</option>
                    <option value="design">UI/UX Designer</option>
                    <option value="growth">Marketing & Growth</option>
                  </select>
                </div>

                {/* Portfolio + LinkedIn */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-semibold text-deep-black mb-2">Portfolio</label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://yoursite.com"
                      className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-semibold text-deep-black mb-2">
                      LinkedIn <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/you"
                      className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* About */}
                <div>
                  <label htmlFor="about" className="block text-sm font-semibold text-deep-black mb-2">Tell us about yourself</label>
                  <textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What excites you about Nagriva? What would you bring to the team?"
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400 resize-none"
                  />
                </div>

                {/* Upload CV */}
                <div>
                  <label className="block text-sm font-semibold text-deep-black mb-2">Upload CV</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`flex items-center justify-center w-full px-6 py-8 border-2 border-dashed rounded-xl bg-gray-50/50 cursor-pointer transition-all duration-200 hover:border-royal-blue/30 hover:bg-royal-blue/[0.02] ${
                      cvFileName ? 'border-royal-blue/25 bg-royal-blue/[0.02]' : 'border-gray-200'
                    }`}
                  >
                    {cvFileName ? (
                      <div className="text-center">
                        <FileText className="h-8 w-8 text-royal-blue mx-auto mb-2" />
                        <p className="text-sm font-medium text-deep-black mb-1">{cvFileName}</p>
                        <p className="text-xs text-gray-400">Click to change file</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">
                          <span className="text-royal-blue font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-300 mt-1">PDF, DOCX up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </RevealBlock>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}

/* ─── Section 7 — Final CTA ───────────────────────────────────────────── */

function CTASection({ onApply }: { onApply: () => void }) {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                The first chapter of Nagriva{' '}
                <span className="text-royal-blue">is being written today.</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Maybe your name belongs in it.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={onApply} className="btn-primary text-base px-8 py-3.5 gap-2">
                  Apply Today
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#/positions" className="btn-secondary text-base px-8 py-3.5">
                  View Open Positions
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
