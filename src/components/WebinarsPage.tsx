import { useEffect, useState, useMemo } from 'react';
import { useInView } from '../hooks/useInView';
import { useNewsletter } from '../hooks/useNewsletter';
import Toast from './Toast';
import {
  ArrowRight,
  ArrowDown,
  BadgeCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Crown,
  Globe,
  GraduationCap,
  Grip,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Play,
  Plus,
  Rocket,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
  Video,
  Zap,
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
      {children}
    </span>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function WebinarsPage() {
  useEffect(() => {
    document.title = 'Nagriva Live | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Join Nagriva Live — immersive AI learning sessions led by the people building the future of artificial intelligence. Reserve your seat today.');
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <LiveEventSection />
        <DigitalTicketSection />
        <SeatReservationSection />
        <LearningPathsSection />
        <AskSection />
        <VoteSection />
        <PreviousSessionsSection />
        <CertificateSection />
        <HallOfLearnersSection />
        <CommunityChatSection />
        <NewsletterSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero Section ────────────────────────────────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);
  const countdown = useCountdown(new Date('2026-08-15T14:00:00Z'));

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-sm font-semibold text-red-600">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-10 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            Welcome to{' '}
            <span className="text-royal-blue">Nagriva Live</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Learn directly from the people building the future of AI.
          </p>
        </div>

        <div className={`text-center mb-10 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-medium text-gray-500 mb-4 tracking-wide uppercase">Next Event Starts In</p>
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.minutes, label: 'Minutes' },
              { value: countdown.seconds, label: 'Seconds' },
            ].map((item, i) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-deep-black tabular-nums">{String(item.value).padStart(2, '0')}</span>
                </div>
                <span className="text-xs font-medium text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-[400ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#reserve-seat" className="btn-primary text-base px-8 py-3.5 gap-2">
            Reserve My Seat
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#previous-sessions" className="btn-secondary text-base px-8 py-3.5 gap-2">
            <Play className="h-4 w-4" />
            Explore Previous Sessions
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Live Event Card ─────────────────────────────────────────────────── */

function LiveEventSection() {
  const seats = 250;
  const reserved = 172;

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Featured Event</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Next Live Session</h2>
          </div>
        </RevealBlock>

        <RevealScale>
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="grid md:grid-cols-2">
                <div className="relative bg-gradient-to-br from-royal-blue/[0.06] via-royal-blue/[0.03] to-white p-8 md:p-12 flex items-center justify-center min-h-[300px]">
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-semibold text-red-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    UPCOMING
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-royal-blue/10">
                      <Sparkles className="h-9 w-9 text-royal-blue" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Event Poster</p>
                    <p className="text-xs text-gray-400">Coming soon</p>
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-royal-blue/[0.06] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue">AI</span>
                    <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-medium text-emerald-600">Beginner</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-deep-black mb-4">AI Employees Masterclass</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-royal-blue" />
                      <span><strong className="text-deep-black">Redouane Ait EL-HADJ</strong> — Speaker</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-royal-blue" />
                      <span>45 Minutes</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Grip className="h-4 w-4 text-royal-blue" />
                      <span>{reserved} / {seats} seats reserved</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-royal-blue rounded-full transition-all duration-1000" style={{ width: `${(reserved / seats) * 100}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">{seats - reserved} seats remaining</p>
                  </div>
                  <a href="#reserve-seat" className="btn-primary text-sm px-6 py-3 gap-2 w-fit">
                    Reserve Your Seat
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealScale>
      </div>
    </section>
  );
}

/* ─── Digital Ticket ──────────────────────────────────────────────────── */

function DigitalTicketSection() {
  const [registered, setRegistered] = useState(false);
  const seatNumber = useMemo(() => `#${String(Math.floor(Math.random() * 250) + 1).padStart(3, '0')}`, []);

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Your Ticket</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Your Digital Ticket</h2>
            <p className="text-body max-w-2xl mx-auto">
              A premium conference pass for the Nagriva Live experience.
            </p>
          </div>
        </RevealBlock>

        <RevealScale>
          <div className="max-w-lg mx-auto">
            <div className="relative rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)]">
              <div className="bg-gradient-to-r from-royal-blue to-royal-blue-light p-6 text-white text-center">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase opacity-80 mb-1">Nagriva Live</p>
                <p className="text-lg font-bold">AI Employees Masterclass</p>
              </div>
              <div className="border-t border-dashed border-gray-200" />
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Attendee</p>
                    <p className="text-sm font-semibold text-deep-black">{registered ? 'Community Member' : 'Waiting...'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Seat Number</p>
                    <p className="text-sm font-semibold text-deep-black">{registered ? seatNumber : 'Waiting...'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Status</p>
                    <p className={`text-sm font-semibold ${registered ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {registered ? 'Reserved' : 'Pending'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Event</p>
                    <p className="text-sm font-semibold text-deep-black">Aug 15, 2026</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6 text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    {registered ? 'Welcome aboard.' : 'Reserve your seat to unlock your ticket.'}
                  </p>
                  {!registered ? (
                    <button onClick={() => setRegistered(true)} className="btn-primary text-sm px-6 py-3 gap-2">
                      Reserve Seat
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-medium text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Seat Reserved
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RevealScale>
      </div>
    </section>
  );
}

/* ─── Seat Reservation ────────────────────────────────────────────────── */

function SeatReservationSection() {
  const [seats] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      status: i < 20 ? 'reserved' as const : i < 26 ? 'available' as const : 'limited' as const,
    }))
  );

  const statusStyles = {
    reserved: 'bg-gray-100 border-gray-200 text-gray-400',
    available: 'bg-white border-gray-200 text-deep-black hover:border-royal-blue/30 hover:bg-royal-blue/[0.02]',
    limited: 'bg-amber-50 border-amber-200 text-amber-700',
  };

  const statusLabels = {
    reserved: 'Reserved',
    available: 'Available',
    limited: 'Limited',
  };

  return (
    <section id="reserve-seat" className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Seating</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Seat Reservation</h2>
            <p className="text-body max-w-2xl mx-auto">
              Select your preferred seat for the next live session.
            </p>
          </div>
        </RevealBlock>

        <RevealBlock>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 mb-8">
              {seats.map((seat) => (
                <div
                  key={seat.id}
                  className={`relative rounded-xl border p-3 text-center transition-all duration-300 cursor-default ${statusStyles[seat.status]}`}
                >
                  <span className="text-[10px] font-medium uppercase tracking-wider opacity-60 block mb-0.5">Seat</span>
                  <span className="text-sm font-bold">{String(seat.id).padStart(3, '0')}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-white border border-gray-200" />
                Available
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
                Reserved
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-50 border border-amber-200" />
                Limited
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Learning Paths ──────────────────────────────────────────────────── */

function LearningPathsSection() {
  const tracks = [
    { num: '01', title: 'AI Foundations', description: 'Core concepts and terminology', icon: BookOpen },
    { num: '02', title: 'AI Employees', description: 'Building your first AI team', icon: Users },
    { num: '03', title: 'Automation', description: 'Workflows and productivity', icon: Zap },
    { num: '04', title: 'Integrations', description: 'Connect your tools and systems', icon: Globe },
    { num: '05', title: 'Advanced Workflows', description: 'Enterprise-grade implementations', icon: Rocket },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Learning Paths</h2>
            <p className="text-body max-w-2xl mx-auto">
              A structured journey from beginner to advanced AI mastery.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-4xl mx-auto">
          {tracks.map((track, i) => (
            <RevealBlock key={track.num} delay={i * 80}>
              <div className="relative flex items-start gap-6 mb-2 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue shrink-0">
                    <track.icon className="h-6 w-6" />
                  </div>
                  {i < tracks.length - 1 && (
                    <div className="w-px h-16 bg-gradient-to-b from-royal-blue/20 to-transparent mt-3" />
                  )}
                </div>
                <div className="pt-3 pb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-royal-blue tracking-wider">{track.num}</span>
                    <h3 className="text-lg font-bold text-deep-black">{track.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{track.description}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Ask Before We Go Live ───────────────────────────────────────────── */

function AskSection() {
  const [submitted, setSubmitted] = useState(false);
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setSubmitted(true);
      setQuestion('');
      setEmail('');
    }
  };

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Questions</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Ask Before We Go Live</h2>
            <p className="text-body max-w-2xl mx-auto">
              Submit your question and the best ones will be answered live.
            </p>
          </div>
        </RevealBlock>

        <RevealScale>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-12">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-deep-black mb-2">Question *</label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="What would you like to learn about?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-deep-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue/30 transition-all resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deep-black mb-2">Email <span className="font-normal text-gray-400">(optional)</span></label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-deep-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue/30 transition-all"
                    />
                  </div>
                  <button type="submit" className="btn-primary text-sm px-6 py-3 gap-2">
                    Submit Question
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                    <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-deep-black mb-2">Question Submitted</h3>
                  <p className="text-sm text-gray-500 mb-6">The best community questions will be answered live.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm px-6 py-3 gap-2">
                    <Plus className="h-4 w-4" />
                    Submit Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </RevealScale>
      </div>
    </section>
  );
}

/* ─── Vote The Next Live Session ──────────────────────────────────────── */

function VoteSection() {
  const [votes, setVotes] = useState<Record<string, number>>({
    'WhatsApp AI': 24,
    'Voice AI': 18,
    'API Masterclass': 31,
    'Automation': 12,
    'AI Employees': 27,
  });
  const [voted, setVoted] = useState<string | null>(() => {
    try { return localStorage.getItem('nagriva_live_vote'); } catch { return null; }
  });

  const handleVote = (topic: string) => {
    if (voted === topic) return;
    setVotes(prev => {
      const next = { ...prev };
      if (voted) next[voted] = Math.max(0, next[voted] - 1);
      next[topic] = (next[topic] || 0) + 1;
      return next;
    });
    setVoted(topic);
    try { localStorage.setItem('nagriva_live_vote', topic); } catch {}
  };

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Community Vote</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Vote The Next Live Session</h2>
            <p className="text-body max-w-2xl mx-auto">
              Help us decide what to cover next. Your vote shapes the agenda.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-2xl mx-auto space-y-3">
          {Object.entries(votes)
            .sort(([, a], [, b]) => b - a)
            .map(([topic, count], i) => (
              <RevealBlock key={topic} delay={i * 60}>
                <button
                  onClick={() => handleVote(topic)}
                  disabled={voted === topic}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                    voted === topic
                      ? 'border-royal-blue/30 bg-royal-blue/[0.04]'
                      : 'border-gray-200 bg-white hover:border-royal-blue/20 hover:shadow-[0_4px_20px_-4px_rgba(30,64,175,0.1)]'
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${
                    voted === topic ? 'bg-royal-blue text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {voted === topic ? <CheckCircle2 className="h-5 w-5" /> : <ThumbsUp className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-deep-black">{topic}</p>
                    <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${voted === topic ? 'bg-royal-blue' : 'bg-gray-300'}`}
                        style={{ width: `${(count / totalVotes) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-deep-black tabular-nums shrink-0">{count}</span>
                </button>
              </RevealBlock>
            ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Previous Sessions ───────────────────────────────────────────────── */

function PreviousSessionsSection() {
  const sessions = [
    { title: 'Introduction to Nagriva AI', speaker: 'Redouane Ait EL-HADJ', date: 'July 3, 2026', duration: '42 min' },
    { title: 'Building Your First AI Employee', speaker: 'Redouane Ait EL-HADJ', date: 'June 19, 2026', duration: '38 min' },
    { title: 'Knowledge Base Deep Dive', speaker: 'Redouane Ait EL-HADJ', date: 'June 5, 2026', duration: '45 min' },
    { title: 'Automation Workflows 101', speaker: 'Redouane Ait EL-HADJ', date: 'May 22, 2026', duration: '35 min' },
  ];

  const resources = ['Replay', 'Slides', 'Resources', 'Certificate'];

  return (
    <section id="previous-sessions" className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Archive</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Previous Sessions</h2>
            <p className="text-body max-w-2xl mx-auto">
              Watch recordings from our past live sessions at your own pace.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {sessions.map((session, i) => (
            <RevealBlock key={session.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full flex flex-col">
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 border border-gray-200 shadow-sm group-hover:bg-royal-blue group-hover:text-white group-hover:border-royal-blue transition-all duration-300">
                    <Play className="h-5 w-5 ml-0.5" />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-deep-black mb-2 leading-snug">{session.title}</h3>
                  <p className="text-xs text-gray-500 mb-1">{session.speaker}</p>
                  <p className="text-xs text-gray-400 mb-4">{session.date} · {session.duration}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {resources.map(r => (
                      <span key={r} className="px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-100 rounded-md border border-gray-200">
                        {r}
                      </span>
                    ))}
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

/* ─── Certificate of Attendance ───────────────────────────────────────── */

function CertificateSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Certificate</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">
              Earn Your{' '}
              <span className="text-royal-blue">Nagriva Live</span>{' '}
              Certificate
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              After attending selected live sessions, participants may receive a professional Certificate of Attendance.
            </p>
          </div>
        </RevealBlock>

        <RevealScale>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50/50 to-white p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-blue/0 via-royal-blue/20 to-royal-blue/0" />
              <div className="absolute top-6 right-6 opacity-[0.03]">
                <Award className="h-48 w-48" />
              </div>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-royal-blue/[0.06]">
                <Award className="h-9 w-9 text-royal-blue" />
              </div>
              <p className="text-sm font-medium text-gray-400 mb-2">Certificate Placeholder</p>
              <p className="text-xs text-gray-300 mb-8">Premium certificate design coming soon</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="btn-secondary text-sm px-6 py-3 gap-2">
                  <Eye className="h-4 w-4" />
                  Preview Certificate
                </button>
                <button className="btn-secondary text-sm px-6 py-3 gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Verify Certificate
                </button>
              </div>
            </div>
          </div>
        </RevealScale>
      </div>
    </section>
  );
}

/* ─── Hall of Learners ────────────────────────────────────────────────── */

function HallOfLearnersSection() {
  const members = [
    { name: 'Ahmed B.', country: 'Morocco', sessions: 4, certificate: true },
    { name: 'Sara K.', country: 'UAE', sessions: 3, certificate: true },
    { name: 'Lucas M.', country: 'France', sessions: 5, certificate: true },
    { name: 'Fatima Z.', country: 'Morocco', sessions: 2, certificate: false },
    { name: 'Youssef A.', country: 'Morocco', sessions: 4, certificate: true },
    { name: 'Emma L.', country: 'Canada', sessions: 3, certificate: true },
    { name: 'Omar H.', country: 'Morocco', sessions: 5, certificate: true },
    { name: 'Nadia B.', country: 'Tunisia', sessions: 2, certificate: false },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Community</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Hall of Learners</h2>
            <p className="text-body max-w-2xl mx-auto">
              Recognizing our most dedicated community members.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {members.map((member, i) => (
            <RevealBlock key={member.name} delay={i * 50}>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_4px_20px_-4px_rgba(30,64,175,0.08)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-blue/[0.06] text-royal-blue text-sm font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-deep-black truncate">{member.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {member.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{member.sessions} sessions</span>
                  {member.certificate ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <Award className="h-3 w-3" />
                      Certificate
                    </span>
                  ) : (
                    <span className="text-gray-400">No certificate</span>
                  )}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Community Chat ──────────────────────────────────────────────────── */

function CommunityChatSection() {
  const messages = [
    { name: 'Ahmed B.', time: '2 min ago', text: 'Excited for the AI Employees Masterclass! Will there be a live demo?' },
    { name: 'Sara K.', time: '5 min ago', text: 'Can we get the slides before the session?' },
    { name: 'Lucas M.', time: '8 min ago', text: 'Amazing lineup this month. The automation session was incredible.' },
    { name: 'Redouane A.', time: '12 min ago', text: 'Thank you all! Yes, there will be a live demo. Prepare your questions!' },
    { name: 'Fatima Z.', time: '15 min ago', text: 'Will the certificate be available after this session?' },
    { name: 'Youssef A.', time: '18 min ago', text: 'Just reserved my seat. See everyone there!' },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>Discussion</SectionLabel>
            <h2 className="heading-lg text-deep-black mb-5">Community Chat</h2>
            <p className="text-body max-w-2xl mx-auto">
              Join the conversation before, during, and after each live session.
            </p>
          </div>
        </RevealBlock>

        <RevealScale>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
              <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/10">
                  <MessageSquare className="h-4 w-4 text-royal-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-black">Live Discussion</p>
                  <p className="text-xs text-gray-400">24 members online</p>
                </div>
              </div>
              <div className="p-6 space-y-5 max-h-[400px] overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500 shrink-0">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-deep-black">{msg.name}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 px-6 py-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Join the conversation..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-deep-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue/30 transition-all"
                  />
                  <button className="btn-primary text-sm px-4 py-2.5 gap-1.5">
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealScale>
      </div>
    </section>
  );
}

/* ─── Newsletter ──────────────────────────────────────────────────────── */

function NewsletterSection() {
  const { subscribe, loading } = useNewsletter();
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, 'webinars');
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) setEmail('');
  };

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-3xl border border-gray-200 bg-white p-10 md:p-14">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06]">
                <Mail className="h-7 w-7 text-royal-blue" />
              </div>
              <h2 className="heading-md text-deep-black mb-4">Never Miss a Live Event</h2>
              <p className="text-[15px] text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
                Get notified when new Nagriva Live sessions are announced.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-deep-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue/30 transition-all"
                />
                <button type="submit" disabled={loading} className="btn-primary text-sm px-6 py-3 gap-2 whitespace-nowrap disabled:opacity-60">
                  {loading ? 'Subscribing...' : 'Subscribe'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-4 text-xs text-gray-400">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </RevealBlock>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}

/* ─── Final CTA ───────────────────────────────────────────────────────── */

function FinalCTASection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Your Next AI Breakthrough{' '}
                <span className="text-royal-blue">Starts Live</span>.
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Reserve your seat today and learn directly from the people building Nagriva.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#reserve-seat" className="btn-primary text-base px-8 py-3.5 gap-2">
                  Reserve My Seat
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#/community" className="btn-secondary text-base px-8 py-3.5 gap-2">
                  <Users className="h-4 w-4" />
                  Join the Community
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Hooks ───────────────────────────────────────────────────────────── */

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ─── Additional Icon Stubs ───────────────────────────────────────────── */

function Award(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  );
}

function Eye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
