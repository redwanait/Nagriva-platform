import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import Footer from './Footer';
import {
  Rocket,
  Lightbulb,
  Puzzle,
  Zap,
  Globe,
  BookOpen,
  MessageSquare,
  BarChart3,
  Plug,
  Bot,
  Shield,
  Server,
  Heart,
  Target,
  Eye,
  TrendingUp,
  Clock,
  Users,
  Lock,
  FileCheck,
  KeyRound,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Quote,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

function RevealScale({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView(0.3);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════ */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-royal-blue/[0.02]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal-blue/[0.03] rounded-full blur-[200px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-royal-blue-light/[0.04] rounded-full blur-[160px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-[15%] w-2 h-2 rounded-full bg-royal-blue/20 hidden lg:block" style={{ animation: 'aboutFloat 6s ease-in-out infinite' }} />
      <div className="absolute top-48 left-[12%] w-3 h-3 rounded-full bg-royal-blue/10 hidden lg:block" style={{ animation: 'aboutFloatSlow 8s ease-in-out infinite 1s' }} />
      <div className="absolute bottom-32 right-[25%] w-1.5 h-1.5 rounded-full bg-royal-blue/15 hidden lg:block" style={{ animation: 'aboutFloat 7s ease-in-out infinite 2s' }} />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 py-28 md:py-36 lg:py-40 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <SectionLabel>
                <span className="h-1.5 w-1.5 rounded-full bg-royal-blue animate-pulse" />
                About Nagriva
              </SectionLabel>
            </div>

            {/* Headline */}
            <h1
              className={`mt-7 mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-deep-black transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '100ms' }}
            >
              Building the Future of{' '}
              <span className="bg-gradient-to-r from-royal-blue to-royal-blue-light bg-clip-text text-transparent">
                AI Employees
              </span>{' '}
              for Modern Businesses.
            </h1>

            {/* Subtitle */}
            <p
              className={`text-base md:text-lg lg:text-xl text-gray-500 leading-relaxed max-w-xl mb-10 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '200ms' }}
            >
              We help businesses automate customer support, sales, bookings, and daily operations
              through intelligent AI Employees that learn, adapt, and deliver real results.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '300ms' }}
            >
              <a href="#/onboarding" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto justify-center group">
                Start Free
                <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a href="#/contact" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto justify-center">
                Contact Sales
              </a>
            </div>
          </div>

          {/* Right — Hero Image */}
          <div
            className={`relative hidden lg:block transition-all duration-900 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '250ms', transitionDuration: '900ms' }}
          >
            {/* Glow behind card */}
            <div className="absolute -inset-6 bg-gradient-to-br from-royal-blue/15 to-royal-blue-light/10 rounded-[2rem] blur-2xl" style={{ animation: 'aboutGlowPulse 5s ease-in-out infinite' }} />

            {/* Glassmorphism card */}
            <div
              className="relative bg-white/60 backdrop-blur-xl border border-white/70 rounded-[2rem] p-3 shadow-[0_8px_48px_-8px_rgba(30,64,175,0.12),0_2px_8px_rgba(0,0,0,0.04)]"
              style={{ animation: 'aboutFloatSlow 8s ease-in-out infinite' }}
            >
              <div className="rounded-[1.5rem] overflow-hidden aspect-[4/3]">
                <img
                  src="https://i.ibb.co/KzBBXjwt/Whats-App-Image-2026-01-29-at-11-43-13-3.jpg"
                  alt="Nagriva AI platform — intelligent automation for modern businesses"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — Image below text */}
        <div
          className={`mt-12 lg:hidden transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '350ms' }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-royal-blue/15 to-royal-blue-light/10 rounded-[1.5rem] blur-xl" />
            <div className="relative bg-white/60 backdrop-blur-xl border border-white/70 rounded-3xl p-2.5 shadow-[0_8px_32px_-8px_rgba(30,64,175,0.1)]">
              <div className="rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src="https://i.ibb.co/KzBBXjwt/Whats-App-Image-2026-01-29-at-11-43-13-3.jpg"
                  alt="Nagriva AI platform — intelligent automation for modern businesses"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 — FOUNDER
   ═══════════════════════════════════════════ */

function FounderSection() {
  const { ref, isInView } = useInView(0.1);

  const socialLinks = [
    { label: 'Website', href: 'https://nagriva.com', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/nagriva', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { label: 'X', href: 'https://x.com/nagriva', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { label: 'Instagram', href: 'https://instagram.com/nagriva', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
    { label: 'GitHub', href: 'https://github.com/nagriva', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
    { label: 'YouTube', href: 'https://youtube.com/@nagriva', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Leadership</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">Meet the Founder</h2>
            <p className="text-body max-w-xl mx-auto">The person behind the vision.</p>
          </div>
        </Reveal>

        <div ref={ref} className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[420px_1fr] gap-0 bg-white rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 hover:border-royal-blue/15 hover:shadow-[0_24px_64px_-16px_rgba(30,64,175,0.08)]">
            {/* Photo side */}
            <div className="relative bg-gradient-to-br from-gray-50/80 to-gray-100/50 flex flex-col items-center justify-center px-6 pt-10 pb-8 sm:px-8 sm:pt-12 sm:pb-10 lg:px-10 lg:pt-14 lg:pb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/[0.015] to-transparent pointer-events-none" />

              <div
                className={`relative transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '200ms' }}
              >
                {/* Photo glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-royal-blue/10 to-royal-blue-light/10 rounded-[2rem] blur-2xl" style={{ animation: 'aboutGlowPulse 4s ease-in-out infinite' }} />

                {/* Photo card */}
                <div className="relative w-[260px] h-[320px] sm:w-[300px] sm:h-[370px] lg:w-[320px] lg:h-[400px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-gray-200/50">
                  <img
                    src="https://i.ibb.co/60406dmp/Whats-App-Image-2026-06-02-at-15-37-53-1.jpg"
                    alt="Redouane Ait EL-HADJ, Founder and CEO of Nagriva"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Status badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-600">Active</span>
                </div>
              </div>

              <div
                className={`mt-8 text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '400ms' }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-blue/[0.06] rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-royal-blue" />
                  <span className="text-xs font-bold text-royal-blue tracking-wider uppercase">Founder & CEO</span>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="p-6 sm:p-8 lg:p-14 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-deep-black tracking-tight mb-1">
                Redouane Ait EL-HADJ
              </h3>
              <p className="text-sm font-medium text-royal-blue mb-8">Founder of Nagriva</p>

              <div className="space-y-4 mb-8">
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  Redouane started building websites at a young age, driven by a deep curiosity for how technology shapes the way people work and communicate. What began as a passion for web development quickly grew into a career in software engineering and building digital products for real businesses.
                </p>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  After years of working with businesses across different industries, he saw a pattern: teams were spending hours on repetitive tasks that could be handled by intelligent software. That realization led him to explore AI and automation — not as a buzzword, but as a practical tool for getting things done.
                </p>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  Today, Nagriva is the result of that journey — a platform designed to give every business access to AI Employees that are secure, reliable, and genuinely useful from day one.
                </p>
              </div>

              {/* Quote */}
              <div className="mb-10 pb-8 border-b border-gray-100">
                <p className="text-lg font-semibold text-deep-black italic leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                  &ldquo;Building AI that works for businesses, not instead of them.&rdquo;
                </p>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, i) => (
                  <Reveal key={link.label} delay={i * 60}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-100 bg-gray-50/60 text-gray-400 transition-all duration-300 hover:border-royal-blue/25 hover:bg-royal-blue/[0.04] hover:text-royal-blue hover:scale-110 hover:shadow-[0_4px_12px_-2px_rgba(30,64,175,0.12)]"
                    >
                      {link.svg}
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — OUR STORY (TIMELINE)
   ═══════════════════════════════════════════ */

const storyTimeline = [
  {
    year: '2018',
    title: 'Started Building Websites',
    description: 'It began with a simple website project. What started as curiosity about how the web works turned into countless hours of building, testing, and learning. That early foundation in web development set the stage for everything that followed.',
    icon: Rocket,
  },
  {
    year: '2020',
    title: 'Worked with Businesses',
    description: 'Started working directly with businesses — learning how they operate, what slows them down, and where technology can make a real difference. Every project taught something new about the gap between what software promises and what it actually delivers.',
    icon: Puzzle,
  },
  {
    year: '2022',
    title: 'Discovered the Power of AI',
    description: 'Deep-dived into AI research and experimentation. Built early prototypes, tested intelligent workflows, and began to understand how machine learning could solve real business problems — not just theoretical ones.',
    icon: Lightbulb,
  },
  {
    year: '2024',
    title: 'Built Internal AI Systems',
    description: 'Created internal AI tools and automation systems to handle real operations. Saw firsthand how AI could reduce manual work, speed up responses, and let teams focus on work that actually matters.',
    icon: Zap,
  },
  {
    year: '2026',
    title: 'Created Nagriva Platform',
    description: 'Launched the Nagriva platform — a complete AI workforce solution where businesses can deploy AI Employees trained on their own knowledge, handle conversations, and automate daily workflows.',
    icon: TrendingUp,
  },
];

function StorySection() {
  return (
    <section id="story" className="section-padding bg-gray-50/40">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">From Curiosity to Platform</h2>
            <p className="text-body max-w-2xl mx-auto">
              A straightforward journey of building, learning, and solving real problems.
            </p>
          </div>
        </Reveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-royal-blue/20 to-transparent md:-translate-x-px" />

          <div className="space-y-10 md:space-y-14">
            {storyTimeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Glow dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-7">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-royal-blue/10 rounded-full blur-sm" />
                      <div className="relative w-3 h-3 rounded-full bg-royal-blue border-[3px] border-white shadow-sm" />
                    </div>
                  </div>

                  {/* Mobile spacer */}
                  <div className="w-12 md:hidden shrink-0" />

                  {/* Content */}
                  <div className={`flex-1 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-14' : 'md:pl-14'}`}>
                    <div className="group bg-white rounded-2xl border border-gray-100 p-7 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.08)]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-royal-blue tracking-widest uppercase">{item.year}</span>
                          <h3 className="text-lg font-semibold text-deep-black tracking-tight leading-tight">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-[15px] text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Empty half (desktop) */}
                  <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — MISSION · VISION · VALUES
   ═══════════════════════════════════════════ */

function MissionVisionValuesSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>What We Stand For</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">Mission, Vision & Values</h2>
            <p className="text-body max-w-2xl mx-auto">
              The principles that guide every decision and every line of code.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {/* Mission — Dark card */}
          <RevealScale delay={0}>
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-deep-black p-7 sm:p-8 md:p-10 h-full flex flex-col min-h-[280px] sm:min-h-[320px]">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-royal-blue/10 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-royal-blue-light/10 blur-2xl" />
              </div>
              <div className="relative flex flex-col h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white mb-6">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Our Mission</h3>
                <span className="text-xs font-semibold text-royal-blue-light tracking-wider uppercase mb-4">What we do</span>
                <p className="text-[15px] text-gray-400 leading-relaxed flex-1">
                  Help every business deploy intelligent AI employees in minutes instead of months — making powerful automation accessible to companies of every size.
                </p>
              </div>
            </div>
          </RevealScale>

          {/* Vision — Blue gradient card */}
          <RevealScale delay={100}>
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl p-7 sm:p-8 md:p-10 h-full flex flex-col min-h-[280px] sm:min-h-[320px]" style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)' }}>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-0 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
              </div>
              <div className="relative flex flex-col h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white mb-6">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Our Vision</h3>
                <span className="text-xs font-semibold text-white/60 tracking-wider uppercase mb-4">Where we're going</span>
                <p className="text-[15px] text-white/80 leading-relaxed flex-1">
                  Become one of the leading AI workforce platforms helping businesses around the world automate repetitive work through trustworthy, intelligent automation.
                </p>
              </div>
            </div>
          </RevealScale>

          {/* Values — White card */}
          <RevealScale delay={200}>
            <div className="relative rounded-2xl md:rounded-3xl bg-white border border-gray-100 p-7 sm:p-8 md:p-10 h-full flex flex-col min-h-[280px] sm:min-h-[320px] transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.06)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-6">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-deep-black mb-1 tracking-tight">Our Values</h3>
              <span className="text-xs font-semibold text-royal-blue tracking-wider uppercase mb-4">What we believe</span>
              <div className="flex flex-col gap-2.5 flex-1">
                {['Innovation that solves real problems', 'Trust earned through transparency', 'Security built in from day one', 'Simplicity without compromise', 'Customer success above everything'].map((v, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-royal-blue shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 leading-snug">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealScale>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — WHY NAGRIVA (FEATURE GRID)
   ═══════════════════════════════════════════ */

const features = [
  {
    icon: Bot,
    title: 'AI Employees',
    description: 'Deploy intelligent AI employees trained specifically for your business — from customer support to sales and operations.',
    span: 'md:col-span-2',
    accent: 'from-royal-blue/5 to-royal-blue-light/5',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    description: 'Train your AI using your own documents, FAQs, and company knowledge for accurate, brand-consistent responses.',
    span: '',
    accent: 'from-emerald-50/50 to-emerald-100/30',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track performance, usage patterns, and customer insights in real time with clear, actionable dashboards.',
    span: '',
    accent: 'from-amber-50/50 to-amber-100/30',
  },
  {
    icon: Plug,
    title: 'Integrations',
    description: 'Connect with your favorite business tools — CRM, helpdesk, email, and more — in a few clicks.',
    span: '',
    accent: 'from-violet-50/50 to-violet-100/30',
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Automate repetitive workflows and save hundreds of hours every month with intelligent task routing.',
    span: 'md:col-span-2',
    accent: 'from-royal-blue/5 to-sky-50/50',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2-aligned security, encrypted data, and privacy-first infrastructure protect your business and your customers.',
    span: '',
    accent: 'from-rose-50/50 to-rose-100/30',
  },
];

function WhyNagrivaSection() {
  return (
    <section className="section-padding bg-gray-50/40">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Why Nagriva</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">The Complete AI Workforce Platform</h2>
            <p className="text-body max-w-2xl mx-auto">
              Everything you need to create, deploy, and scale intelligent AI employees.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {features.map((feat, i) => (
            <Reveal key={feat.title} delay={i * 80}>
              <div className={`group relative bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.08)] h-full ${feat.span}`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-5 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                    <feat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-deep-black mb-2 tracking-tight">{feat.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6 — STATISTICS
   ═══════════════════════════════════════════ */

const stats = [
  { value: 25, suffix: '+', label: 'Businesses', icon: Users },
  { value: 120, suffix: '+', label: 'AI Employees Created', icon: Bot },
  { value: 12, suffix: 'K+', label: 'Conversations Processed', icon: MessageSquare },
  { value: 99, suffix: '.9%', label: 'Platform Availability', icon: Clock },
  { value: 4, suffix: '+', label: 'Countries', icon: Globe },
];

function StatsSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-deep-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-royal-blue/8 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-royal-blue-light/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative container-max px-6">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-royal-blue-light tracking-[0.2em] uppercase px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              By the Numbers
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-white mt-5 mb-4">Growing Every Day</h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
              Real numbers from a platform that businesses are choosing every day.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="relative group text-center p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
                <div className="flex justify-center mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-royal-blue-light transition-all duration-300 group-hover:bg-white/10 group-hover:text-white">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-medium text-gray-500 leading-tight">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7 — SECOND FOUNDER (EDITORIAL)
   ═══════════════════════════════════════════ */

function SecondFounderSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding">
      <div className="container-max">
        <div ref={ref} className="max-w-5xl mx-auto">
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8 md:gap-0 items-center">
            {/* Photo — slightly overlaps the glass card */}
            <div
              className={`relative z-10 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-royal-blue/8 to-royal-blue-light/8 rounded-[2rem] blur-xl" />
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-w-sm md:max-w-md mx-auto rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/40">
                  <img
                    src="https://i.ibb.co/3y5KSmH9/Whats-App-Image-2026-06-03-at-01-22-27.jpg"
                    alt="Redouane Ait EL-HADJ, Founder and CEO of Nagriva"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Glass quote card — overlaps photo */}
            <div
              className={`relative z-20 md:-ml-12 lg:-ml-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '200ms' }}
            >
              <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-6">
                  <Quote className="h-5 w-5" />
                </div>

                <blockquote className="text-lg md:text-xl lg:text-2xl font-semibold text-deep-black leading-snug tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  &ldquo;The best technology is the one that quietly helps people do their best work.&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src="https://i.ibb.co/60406dmp/Whats-App-Image-2026-06-02-at-15-37-53-1.jpg"
                      alt="Redouane Ait EL-HADJ"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-deep-black">Redouane Ait EL-HADJ</p>
                    <p className="text-xs text-gray-500">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 8 — CORE PRINCIPLES
   ═══════════════════════════════════════════ */

const principles = [
  { icon: Lock, title: 'Privacy First', description: 'Your data stays yours. We never sell, share, or use customer data for training.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We continuously push the boundaries of what AI can do for real businesses.' },
  { icon: Shield, title: 'Security', description: 'Enterprise-grade security baked into every layer of the platform from day one.' },
  { icon: Eye, title: 'Transparency', description: 'No black boxes. You see exactly how your AI works, what it learns, and what it does.' },
  { icon: Heart, title: 'Customer Success', description: 'Every feature starts with one question: will this help our customers succeed?' },
  { icon: RefreshCw, title: 'Continuous Improvement', description: 'We ship fast, listen closely, and make the platform better every single week.' },
];

function CorePrinciplesSection() {
  return (
    <section className="section-padding bg-gray-50/40">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Core Principles</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">How We Build</h2>
            <p className="text-body max-w-2xl mx-auto">
              Six principles that guide every product decision, every sprint, and every line of code.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="group flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_6px_24px_-6px_rgba(30,64,175,0.06)] h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue shrink-0 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-deep-black mb-1 tracking-tight">{p.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{p.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 9 — ROADMAP
   ═══════════════════════════════════════════ */

const roadmapItems = [
  { phase: 'Q1 2026', title: 'Platform Launch', description: 'Core AI Employees, Knowledge Base, Conversations, and Integrations.', status: 'completed' as const },
  { phase: 'Q2 2026', title: 'Analytics & Billing', description: 'Advanced analytics dashboard, Stripe billing, subscription management.', status: 'completed' as const },
  { phase: 'Q3 2026', title: 'Multi-Language AI', description: 'AI Employees that understand and respond in 30+ languages natively.', status: 'current' as const },
  { phase: 'Q4 2026', title: 'Workflow Automation', description: 'Visual workflow builder for complex multi-step business automations.', status: 'current' as const },
  { phase: 'Q1 2027', title: 'Enterprise API', description: 'Full REST API for custom integrations, white-label solutions, and enterprise clients.', status: 'upcoming' as const },
  { phase: '2027+', title: 'AI Agents Marketplace', description: 'Pre-built AI agents from industry experts that businesses can deploy instantly.', status: 'upcoming' as const },
];

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-royal-blue', textColor: 'text-royal-blue', bgColor: 'bg-royal-blue/[0.06]', borderColor: 'border-royal-blue/20' },
  current: { label: 'In Progress', color: 'bg-emerald-400', textColor: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  upcoming: { label: 'Coming Soon', color: 'bg-gray-300', textColor: 'text-gray-500', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
};

function RoadmapSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">Where We're Headed</h2>
            <p className="text-body max-w-2xl mx-auto">
              What we've shipped, what we're building, and what's coming next.
            </p>
          </div>
        </Reveal>

        {/* Desktop: horizontal */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <Reveal>
            <div className="relative">
              {/* Status legend */}
              <div className="flex justify-center gap-6 mb-12">
                {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((key) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${statusConfig[key].color}`} />
                    <span className="text-xs font-semibold text-gray-500">{statusConfig[key].label}</span>
                  </div>
                ))}
              </div>

              {/* Timeline line */}
              <div className="absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              <div className="grid grid-cols-6 gap-3">
                {roadmapItems.map((item, i) => {
                  const cfg = statusConfig[item.status];
                  return (
                    <Reveal key={item.title} delay={i * 100}>
                      <div className="flex flex-col items-center text-center">
                        {/* Dot */}
                        <div className="relative z-10 mb-5">
                          <div className={`w-3 h-3 rounded-full ${cfg.color} border-[3px] border-white shadow-sm`} />
                        </div>

                        {/* Status pill */}
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${cfg.textColor} ${cfg.bgColor} border ${cfg.borderColor} mb-3`}>
                          {cfg.label}
                        </div>

                        {/* Card */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 w-full transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm">
                          <span className="text-[10px] font-bold text-royal-blue tracking-wider uppercase">{item.phase}</span>
                          <h3 className="text-sm font-semibold text-deep-black mt-1 mb-1.5 tracking-tight leading-tight">{item.title}</h3>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden max-w-md mx-auto">
          <div className="relative pl-8">
            <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gradient-to-b from-royal-blue/20 via-emerald-200 to-gray-200" />

            <div className="space-y-6">
              {roadmapItems.map((item, i) => {
                const cfg = statusConfig[item.status];
                return (
                  <Reveal key={item.title} delay={i * 80}>
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-3 w-2.5 h-2.5 rounded-full ${cfg.color} border-2 border-white shadow-sm z-10`} />
                      <div className="bg-white rounded-xl border border-gray-100 p-5 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${cfg.textColor} ${cfg.bgColor} border ${cfg.borderColor}`}>
                            {cfg.label}
                          </span>
                          <span className="text-[10px] font-bold text-royal-blue tracking-wider uppercase">{item.phase}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-deep-black tracking-tight mb-1">{item.title}</h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed">{item.description}</p>
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

/* ═══════════════════════════════════════════
   SECTION 10 — SECURITY
   ═══════════════════════════════════════════ */

const securityFeatures = [
  { icon: Shield, title: 'Enterprise-grade Security', description: 'SOC 2-aligned practices protect your business and customer data at every layer.' },
  { icon: FileCheck, title: 'GDPR Ready', description: 'Full compliance with GDPR and international data protection regulations.' },
  { icon: Lock, title: 'Encrypted Data', description: 'AES-256 encryption at rest and TLS 1.3 in transit for all data.' },
  { icon: KeyRound, title: 'Secure Authentication', description: 'JWT-based auth, role-based access control, and optional two-factor authentication.' },
  { icon: Server, title: 'Privacy-first Infrastructure', description: 'Your data never leaves your region. We never train on customer data.' },
];

function SecuritySection() {
  return (
    <section className="section-padding bg-gray-50/40">
      <div className="container-max">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Security</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-deep-black mt-5 mb-4">Enterprise-grade Security</h2>
            <p className="text-body max-w-2xl mx-auto">
              Your data is protected by industry-leading security practices from the ground up.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {securityFeatures.map((feat, i) => (
            <Reveal key={feat.title} delay={i * 80}>
              <div className="group text-center bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_6px_24px_-6px_rgba(30,64,175,0.06)] h-full flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-4 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                  <feat.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-deep-black mb-1.5 tracking-tight">{feat.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{feat.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 11 — FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCTASection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-deep-black px-6 py-16 text-center sm:px-8 md:px-12 lg:px-16 md:py-20 lg:py-28">
            {/* Glow effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal-blue/15 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-royal-blue/10 blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-royal-blue-light/8 blur-[100px] pointer-events-none" />
            </div>

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-6">
                Ready to Build Your First AI Employee?
              </h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
                Start for free. No credit card required. Deploy your first AI Employee in minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#/onboarding" className="inline-flex items-center justify-center px-8 py-4 bg-white text-deep-black font-semibold rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-lg active:scale-[0.98] group w-full sm:w-auto">
                  Start Free
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a href="#/contact" className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border border-gray-600 transition-all duration-200 hover:border-gray-400 hover:bg-white/5 w-full sm:w-auto">
                  Book Demo
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function AboutPage() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'About | Nagriva';

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', 'Learn the story of Nagriva, meet the founder, discover our mission, leadership, company journey, and our vision for building the future of AI Employees.');

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
        <FounderSection />
        <StorySection />
        <MissionVisionValuesSection />
        <WhyNagrivaSection />
        <StatsSection />
        <SecondFounderSection />
        <CorePrinciplesSection />
        <RoadmapSection />
        <SecuritySection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
