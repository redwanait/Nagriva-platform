import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  User,
  Stethoscope,
  UtensilsCrossed,
  Scale,
  Home,
  Rocket,
  ShoppingBag,
  Lightbulb,
  Globe,
  MessageCircle,
  Camera,
  Send,
  Mail,
  Phone,
  Users,
  Target,
  Calendar,
  Headphones,
  TrendingUp,
  Package,
  Eye,
  EyeOff,
  Check,
  Bot,
  MessageSquare,
  Zap,
  PartyPopper,
  Lock,
} from 'lucide-react';
import './Onboarding.css';
import { supabase } from '../lib/supabase';

/* ── Types ── */

type BizType = 'dental' | 'restaurant' | 'law' | 'realestate' | 'agency' | 'ecommerce' | 'other';
type TeamSize = 'solo' | 'small' | 'medium' | 'large';
type Channel = 'website' | 'whatsapp' | 'instagram' | 'messenger' | 'facebook' | 'telegram' | 'email';
type Goal = 'answer' | 'book' | 'leads' | 'support' | 'sales' | 'recommendations';

interface FormData {
  userName: string;
  firstName: string;
  businessName: string;
  businessType: BizType | null;
  teamSize: TeamSize | null;
  channels: Channel[];
  goals: Goal[];
  website: string;
  email: string;
  password: string;
}

/* ── Constants ── */

const TOTAL_STEPS = 12;

const INDUSTRIES: { id: BizType; icon: typeof Stethoscope; title: string; desc: string }[] = [
  { id: 'dental', icon: Stethoscope, title: 'Dental Clinic', desc: 'Patient care & appointments' },
  { id: 'restaurant', icon: UtensilsCrossed, title: 'Restaurant', desc: 'Reservations & orders' },
  { id: 'law', icon: Scale, title: 'Law Firm', desc: 'Client intake & consultations' },
  { id: 'realestate', icon: Home, title: 'Real Estate', desc: 'Leads & property inquiries' },
  { id: 'agency', icon: Rocket, title: 'Agency', desc: 'Client management & projects' },
  { id: 'ecommerce', icon: ShoppingBag, title: 'E-commerce', desc: 'Sales & product support' },
  { id: 'other', icon: Lightbulb, title: 'Other', desc: 'Something unique' },
];

const TEAM_OPTIONS: { id: TeamSize; label: string }[] = [
  { id: 'solo', label: 'Just Me' },
  { id: 'small', label: '2 - 10' },
  { id: 'medium', label: '11 - 50' },
  { id: 'large', label: '50+' },
];

const GOAL_OPTIONS: { id: Goal; icon: typeof Target; label: string; desc: string }[] = [
  { id: 'answer', icon: MessageSquare, label: 'Answer customer questions', desc: 'Instant 24/7 responses to inquiries' },
  { id: 'book', icon: Calendar, label: 'Book appointments', desc: 'Automated scheduling & reminders' },
  { id: 'leads', icon: Target, label: 'Generate leads', desc: 'Capture & qualify new leads' },
  { id: 'support', icon: Headphones, label: 'Customer support', desc: 'Resolve issues fast, 24/7' },
  { id: 'sales', icon: TrendingUp, label: 'Sales', desc: 'Drive revenue & conversions' },
  { id: 'recommendations', icon: Package, label: 'Product recommendations', desc: 'Personalized suggestions' },
];

const BUILD_STEPS = [
  { text: 'Creating your workspace...', ms: 2400 },
  { text: 'Creating your AI Employee...', ms: 2800 },
  { text: 'Reading your website...', ms: 2400 },
  { text: 'Preparing Knowledge Base...', ms: 2200 },
  { text: 'Configuring dashboard...', ms: 2000 },
  { text: 'Almost ready...', ms: 1400 },
];

/* ── Helpers ── */

function goalLabel(id: Goal): string {
  return GOAL_OPTIONS.find((g) => g.id === id)?.label ?? id;
}
function industryLabel(id: BizType | null): string {
  return INDUSTRIES.find((i) => i.id === id)?.title ?? '';
}

/* ═══════════════════════════════════════════
   STEP 1 — Welcome
   ═══════════════════════════════════════════ */

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="ob-step-inner ob-welcome">
      <div className="ob-welcome-text">
        <div className="ob-welcome-badge">
          <Bot size={14} />
          <span>AI Agent Platform</span>
        </div>
        <h1 className="ob-welcome-heading">
          Build your first AI Employee<br />in minutes.
        </h1>
        <p className="ob-welcome-sub">
          Answer customers, automate tasks, qualify leads and grow your business
          with your own AI employee. Ready in less than 3 minutes.
        </p>

        <div className="ob-trust-row">
          <div className="ob-trust-item">
            <Check size={14} />
            <span>No credit card required</span>
          </div>
          <div className="ob-trust-item">
            <Check size={14} />
            <span>Takes about 3 minutes</span>
          </div>
          <div className="ob-trust-item">
            <Check size={14} />
            <span>Free to start</span>
          </div>
        </div>

        <div className="ob-welcome-actions">
          <button className="ob-welcome-cta" onClick={onNext}>
            Start Building
            <ArrowRight size={18} />
          </button>
          <div className="ob-welcome-signin">
            Already have an account?{' '}
            <a href="#/login">Sign in</a>
          </div>
        </div>
      </div>

      <div className="ob-welcome-visual">
        <div className="ob-visual-glow" />

        <div className="ob-welcome-card">
          <div className="ob-wc-header">
            <div className="ob-wc-header-icon"><Bot size={16} /></div>
            <span className="ob-wc-header-title">AI Employee</span>
          </div>

          <div className="ob-wc-field">
            <span className="ob-wc-label">Status</span>
            <div className="ob-wc-status">
              <span className="ob-wc-spinner" />
              Preparing...
            </div>
          </div>

          <div className="ob-wc-progress-wrap">
            <div className="ob-wc-progress-track">
              <div className="ob-wc-progress-shimmer" />
            </div>
          </div>

          <div className="ob-wc-divider" />

          <div className="ob-wc-field">
            <span className="ob-wc-label">Business</span>
            <span className="ob-wc-value">Your Business</span>
          </div>

          <div className="ob-wc-field">
            <span className="ob-wc-label">Industry</span>
            <span className="ob-wc-value ob-wc-placeholder">...</span>
          </div>

          <div className="ob-wc-field">
            <span className="ob-wc-label">Mission</span>
            <span className="ob-wc-value ob-wc-placeholder">...</span>
          </div>

          <div className="ob-wc-field">
            <span className="ob-wc-label">Channel</span>
            <span className="ob-wc-tag">
              <Check size={10} />
              Website
            </span>
          </div>

          <div className="ob-wc-divider" />

          <div className="ob-wc-footer">
            <span className="ob-wc-est">Estimated setup</span>
            <span className="ob-wc-time">2 min remaining</span>
          </div>
        </div>

        <div className="ob-float ob-float-1">
          <Check size={14} />
          <span>Ready 24/7</span>
        </div>
        <div className="ob-float ob-float-2">
          <Zap size={14} />
          <span>Instant Replies</span>
        </div>
        <div className="ob-float ob-float-3">
          <TrendingUp size={14} />
          <span>Smart Automation</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 2 — Name
   ═══════════════════════════════════════════ */

function StepName({ data, set, onNext }: { data: FormData; set: (d: FormData) => void; onNext: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className="ob-step-inner">
      <h1 className="ob-question">What's your name?</h1>
      <p className="ob-description">We'd love to know who we're working with.</p>
      <div className="ob-input-wrap">
        <input
          ref={ref}
          className="ob-input"
          placeholder="John Smith"
          value={data.userName}
          onChange={(e) => set({ ...data, userName: e.target.value, firstName: e.target.value.split(' ')[0] })}
          onKeyDown={(e) => e.key === 'Enter' && data.userName.trim() && onNext()}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 3 — Business Name
   ═══════════════════════════════════════════ */

function StepBusiness({ data, set, onNext }: { data: FormData; set: (d: FormData) => void; onNext: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className="ob-step-inner">
      <div className="ob-greeting">
        <User size={18} />
        <span>Nice to meet you, {data.firstName}</span>
      </div>
      <h1 className="ob-question">What's your business name?</h1>
      <p className="ob-description">This will be your AI Employee's workplace.</p>
      <div className="ob-input-wrap">
        <input
          ref={ref}
          className="ob-input"
          placeholder="e.g. Smile Dental"
          value={data.businessName}
          onChange={(e) => set({ ...data, businessName: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && data.businessName.trim() && onNext()}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 4 — Industry
   ═══════════════════════════════════════════ */

function StepIndustry({ data, set, onNext }: { data: FormData; set: (d: FormData) => void; onNext: () => void }) {
  return (
    <div className="ob-step-inner">
      <h1 className="ob-question">What type of business do you run?</h1>
      <p className="ob-description">This helps us customize your AI Employee.</p>
      <div className="ob-cards ob-cards-3">
        {INDUSTRIES.map((ind) => {
          const Icon = ind.icon;
          const active = data.businessType === ind.id;
          return (
            <button
              key={ind.id}
              className={`ob-card ${active ? 'ob-card-selected' : ''}`}
              onClick={() => { set({ ...data, businessType: ind.id }); setTimeout(onNext, 300); }}
            >
              <div className="ob-card-header">
                <div className="ob-card-icon-wrap"><Icon size={20} /></div>
                <span className="ob-card-title">{ind.title}</span>
              </div>
              <span className="ob-card-desc">{ind.desc}</span>
              {active && (
                <span className="ob-card-check"><Check size={14} /></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 5 — Team Size
   ═══════════════════════════════════════════ */

function StepTeam({ data, set, onNext }: { data: FormData; set: (d: FormData) => void; onNext: () => void }) {
  return (
    <div className="ob-step-inner">
      <h1 className="ob-question">How many people work at your business?</h1>
      <div className="ob-cards ob-cards-2" style={{ maxWidth: 440 }}>
        {TEAM_OPTIONS.map((t) => {
          const active = data.teamSize === t.id;
          return (
            <button
              key={t.id}
              className={`ob-card ob-card-size ${active ? 'ob-card-selected' : ''}`}
              onClick={() => { set({ ...data, teamSize: t.id }); setTimeout(onNext, 300); }}
            >
              <span className="ob-card-title">{t.label}</span>
              {active && <span className="ob-card-check"><Check size={14} /></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 6 — Channels (Website MVP)
   ═══════════════════════════════════════════ */

const CHANNEL_SOON: { icon: typeof MessageCircle; label: string }[] = [
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Camera, label: 'Instagram' },
  { icon: Send, label: 'Messenger' },
  { icon: Users, label: 'Facebook' },
  { icon: Phone, label: 'Telegram' },
  { icon: Mail, label: 'Email' },
];

function StepChannels({ data, set }: { data: FormData; set: (d: FormData) => void }) {
  const websiteSelected = data.channels.includes('website');
  const toggleWebsite = () => {
    const next = websiteSelected
      ? data.channels.filter((c) => c !== 'website')
      : [...data.channels, 'website' as Channel];
    set({ ...data, channels: next });
  };

  return (
    <div className="ob-step-inner">
      <h1 className="ob-question">Where do customers contact you?</h1>
      <p className="ob-description">Choose the primary channel for your AI Employee.</p>
      <div className="ob-cards" style={{ maxWidth: 520 }}>
        {/* Website — Available */}
        <button
          className={`ob-card ob-card-website ${websiteSelected ? 'ob-card-selected ob-card-website-selected' : ''}`}
          onClick={toggleWebsite}
        >
          <div className="ob-card-header">
            <div className="ob-card-icon-wrap"><Globe size={20} /></div>
            <div className="ob-card-header-text">
              <span className="ob-card-title">Website</span>
              <span className="ob-card-badge-available">Available</span>
            </div>
          </div>
          {websiteSelected && <span className="ob-card-check"><Check size={14} /></span>}
        </button>

        {/* Coming Soon channels */}
        <div className="ob-cards-soon">
          {CHANNEL_SOON.map((ch) => {
            const Icon = ch.icon;
            return (
              <div key={ch.label} className="ob-card-soon">
                <div className="ob-card-soon-icon"><Icon size={16} /></div>
                <span className="ob-card-soon-label">{ch.label}</span>
                <span className="ob-card-soon-badge">
                  <Lock size={10} />
                  Coming Soon
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 7 — Goals (multi)
   ═══════════════════════════════════════════ */

function StepGoals({ data, set }: { data: FormData; set: (d: FormData) => void }) {
  const toggle = (g: Goal) => {
    const next = data.goals.includes(g) ? data.goals.filter((x) => x !== g) : [...data.goals, g];
    set({ ...data, goals: next });
  };
  return (
    <div className="ob-step-inner">
      <h1 className="ob-question">What should your AI Employee do?</h1>
      <p className="ob-description">Select one or more goals.</p>
      <div className="ob-cards ob-cards-3">
        {GOAL_OPTIONS.map((g) => {
          const Icon = g.icon;
          const active = data.goals.includes(g.id);
          return (
            <button
              key={g.id}
              className={`ob-card ${active ? 'ob-card-selected' : ''}`}
              onClick={() => toggle(g.id)}
            >
              <div className="ob-card-header">
                <div className="ob-card-icon-wrap"><Icon size={20} /></div>
                <span className="ob-card-title">{g.label}</span>
              </div>
              <span className="ob-card-desc">{g.desc}</span>
              {active && <span className="ob-card-check"><Check size={14} /></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 8 — Website
   ═══════════════════════════════════════════ */

function StepWebsite({ data, set, onNext }: { data: FormData; set: (d: FormData) => void; onNext: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className="ob-step-inner">
      <h1 className="ob-question">What's your website?</h1>
      <p className="ob-description">We'll read it to help train your AI Employee.</p>
      <div className="ob-input-wrap">
        <input
          ref={ref}
          type="url"
          className="ob-input"
          placeholder="https://yourwebsite.com"
          value={data.website}
          onChange={(e) => set({ ...data, website: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && onNext()}
        />
      </div>
      <button className="ob-btn-skip ob-mt-lg" onClick={onNext}>Skip for now</button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 9 — Email
   ═══════════════════════════════════════════ */

function StepEmail({ data, set, onNext }: { data: FormData; set: (d: FormData) => void; onNext: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className="ob-step-inner">
      <h1 className="ob-question">Business email</h1>
      <p className="ob-description">We'll use this for your workspace login.</p>
      <div className="ob-input-wrap">
        <input
          ref={ref}
          type="email"
          className="ob-input"
          placeholder="you@company.com"
          value={data.email}
          onChange={(e) => set({ ...data, email: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && data.email.trim() && onNext()}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 10 — Password
   ═══════════════════════════════════════════ */

function StepPassword({ data, set, onNext }: { data: FormData; set: (d: FormData) => void; onNext: () => void }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);

  const strength = (() => {
    const p = data.password;
    if (!p.length) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (p.length >= 12) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(s, 4);
  })();

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

  return (
    <div className="ob-step-inner">
      <h1 className="ob-question">Create your password</h1>
      <p className="ob-description">Make it strong and unique.</p>
      <div className="ob-input-wrap">
        <div className="ob-input-password-wrap">
          <input
            ref={ref}
            type={show ? 'text' : 'password'}
            className="ob-input"
            placeholder="Min. 8 characters"
            value={data.password}
            onChange={(e) => set({ ...data, password: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && data.password.length >= 8 && onNext()}
          />
          <button className="ob-input-toggle" type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      {data.password.length > 0 && (
        <div className="ob-strength">
          <div className="ob-strength-bars">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="ob-strength-bar" style={{ backgroundColor: i <= strength ? colors[strength] : undefined }} />
            ))}
          </div>
          <span className="ob-strength-text" style={{ color: colors[strength] }}>{labels[strength]}</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 11 — Creating AI
   ═══════════════════════════════════════════ */

function StepCreating({ onDone }: { onDone: () => void }) {
  const [progresses, setProgresses] = useState<number[]>(new Array(BUILD_STEPS.length).fill(0));
  const [completed, setCompleted] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const t0 = useRef(Date.now());

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - t0.current;
      let acc = 0;
      const newP = BUILD_STEPS.map((s) => {
        const start = acc;
        acc += s.ms;
        if (elapsed >= acc) return 100;
        if (elapsed < start) return 0;
        return Math.round(((elapsed - start) / s.ms) * 100);
      });
      setProgresses(newP);

      const done: number[] = [];
      acc = 0;
      for (let i = 0; i < BUILD_STEPS.length; i++) {
        acc += BUILD_STEPS[i].ms;
        if (elapsed >= acc) done.push(i);
      }
      setCompleted(done);
      setActive(Math.min(done.length, BUILD_STEPS.length - 1));

      const total = BUILD_STEPS.reduce((a, s) => a + s.ms, 0);
      if (elapsed >= total) { onDone(); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="ob-step-inner ob-creating">
      <div className="ob-creating-card">
        <div className="ob-creating-header">
          <div className="ob-creating-spinner" />
          <span className="ob-creating-title">Building your AI Employee</span>
        </div>
        <div className="ob-creating-steps">
          {BUILD_STEPS.map((s, i) => (
            <div key={i} className={`ob-creating-step ${completed.includes(i) ? 'ob-cs-done' : active === i ? 'ob-cs-active' : ''}`}>
              <div className="ob-cs-row">
                <div className="ob-cs-icon">
                  {completed.includes(i) ? (
                    <div className="ob-cs-check"><Check size={12} /></div>
                  ) : active === i ? (
                    <div className="ob-cs-active-dot" />
                  ) : (
                    <div className="ob-cs-pending" />
                  )}
                </div>
                <span className="ob-cs-text">{s.text}</span>
              </div>
              {active === i && (
                <div className="ob-cs-bar-wrap">
                  <div className="ob-cs-bar" style={{ width: `${progresses[i]}%` }} />
                </div>
              )}
              {completed.includes(i) && <span className="ob-cs-done-label">Done</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 12 — Celebration
   ═══════════════════════════════════════════ */

function StepComplete({ data }: { data: FormData }) {
  const [confetti] = useState(() => {
    const colors = ['#1E40AF', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.8,
      size: Math.random() * 5 + 4,
    }));
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const displayName = data.userName.trim() || 'Your AI';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleGoToDashboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.replace('/#/login');
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (updateError) {
        setError('Failed to save your progress. Please try again.');
        setSaving(false);
        return;
      }

      window.location.replace('/#/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="ob-step-inner ob-celebration">
      <div className="ob-confetti">
        {confetti.map((c) => (
          <div key={c.id} className="ob-confetti-piece" style={{ left: `${c.x}%`, backgroundColor: c.color, width: c.size, height: c.size, animationDelay: `${c.delay}s` }} />
        ))}
      </div>
      <div className="ob-celebration-inner">
        <div className="ob-celebration-icon"><PartyPopper size={40} /></div>
        <h1 className="ob-question">Your AI Employee is Ready!</h1>
        <p className="ob-description">Your workspace has been successfully created.</p>
        <div className="ob-celebration-card">
          <div className="ob-celebration-card-avatar">
            {data.userName.trim() ? avatarLetter : <Bot size={20} />}
          </div>
          <div>
            <div className="ob-celebration-card-name">{displayName}</div>
            <div className="ob-celebration-card-role">AI Employee</div>
          </div>
        </div>
        <div className="ob-celebration-actions">
          <a href="#/dashboard" className="ob-btn-primary-standalone" onClick={handleGoToDashboard}>
            {saving ? 'Saving...' : 'Go to Dashboard'}
            {!saving && <ArrowRight size={18} />}
          </a>
          <a href="#/contact" className="ob-btn-secondary-standalone">
            Book a Demo
          </a>
        </div>
        {error && (
          <p style={{ color: '#EF4444', marginTop: 12, fontSize: 14 }}>{error}</p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LIVE PREVIEW PANEL
   ═══════════════════════════════════════════ */

function LivePreview({ data }: { data: FormData }) {
  const channelDisplay = data.channels.includes('website')
    ? [{ label: 'Website', available: true }]
    : [];

  const hasGoals = data.goals.length > 0;

  const fields: { label: string; value: string | null; show: boolean; tags?: { label: string; available: boolean }[] }[] = [
    { label: 'Business', value: data.businessName || null, show: !!data.businessName },
    { label: 'Industry', value: industryLabel(data.businessType), show: !!data.businessType },
    { label: 'Channels', value: null, show: channelDisplay.length > 0, tags: channelDisplay },
    { label: 'Primary Goal', value: hasGoals ? data.goals.map(goalLabel).join(', ') : null, show: hasGoals },
  ];

  const displayName = data.userName.trim() || 'Your AI';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="ob-preview">
      <div className="ob-preview-label">
        <span className="ob-preview-label-dot" />
        Live Preview
      </div>

      <div className="ob-preview-profile">
        <div className="ob-preview-avatar-row">
          <div className="ob-preview-avatar">
            {data.userName.trim() ? avatarLetter : <User size={24} />}
          </div>
          <div>
            <div className="ob-preview-name">{displayName}</div>
            <div className="ob-preview-role">AI Employee</div>
          </div>
        </div>

        <div className="ob-preview-divider" />

        {fields.map((f) => (
          <div key={f.label} className={`ob-preview-field ${f.show ? 'ob-preview-field-active' : ''}`}>
            <div className="ob-preview-field-label">{f.label}</div>
            {f.tags ? (
              <div className="ob-preview-tags">
                {f.tags.map((t) => (
                  <span key={t.label} className="ob-preview-tag">
                    <Check size={12} />
                    {t.label}
                    {t.available && <span className="ob-preview-tag-available">Available</span>}
                  </span>
                ))}
              </div>
            ) : (
              <div className="ob-preview-field-value">{f.value}</div>
            )}
          </div>
        ))}

        <div className={`ob-preview-field ob-preview-field-active`}>
          <div className="ob-preview-field-label">Status</div>
          {hasGoals ? (
            <div className="ob-preview-status">
              <span className="ob-preview-status-dot" />
              Ready
            </div>
          ) : (
            <div className="ob-preview-status ob-preview-status-incomplete">
              <span className="ob-preview-status-dot-incomplete" />
              Incomplete
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    userName: '', firstName: '', businessName: '',
    businessType: null, teamSize: null,
    channels: [], goals: [],
    website: '', email: '', password: '',
  });

  const next = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS)), []);
  const prev = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);
  const buildingDone = useCallback(() => { setStep(12); }, []);

  const showProgress = step >= 2 && step <= 10;
  const showNav = step >= 2 && step <= 10;
  const showPreview = step >= 3 && step <= 10;

  const canContinue = (() => {
    switch (step) {
      case 2: return data.userName.trim().length > 0;
      case 3: return data.businessName.trim().length > 0;
      case 4: return !!data.businessType;
      case 5: return !!data.teamSize;
      case 6: return data.channels.length > 0;
      case 7: return data.goals.length > 0;
      case 8: return true;
      case 9: return data.email.trim().length > 0;
      case 10: return data.password.length >= 8;
      default: return true;
    }
  })();

  const renderStep = () => {
    const props = { data, set: setData, onNext: next };
    switch (step) {
      case 1:  return <StepWelcome onNext={next} />;
      case 2:  return <StepName {...props} />;
      case 3:  return <StepBusiness {...props} />;
      case 4:  return <StepIndustry {...props} />;
      case 5:  return <StepTeam {...props} />;
      case 6:  return <StepChannels data={data} set={setData} />;
      case 7:  return <StepGoals data={data} set={setData} />;
      case 8:  return <StepWebsite {...props} />;
      case 9:  return <StepEmail {...props} />;
      case 10: return <StepPassword {...props} />;
      case 11: return <StepCreating onDone={buildingDone} />;
      case 12: return <StepComplete data={data} />;
      default: return null;
    }
  };

  return (
    <div className="ob-root">
      {showProgress && (
        <div className="ob-progress">
          <span className="ob-progress-label">Step {step} of {TOTAL_STEPS}</span>
          <div className="ob-progress-track">
            <div className="ob-progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="ob-layout">
        <div className="ob-content">
          <div className="ob-step-area" key={step}>
            <div className="ob-step-enter">{renderStep()}</div>
          </div>

          {showNav && (
            <div className="ob-bottom-nav">
              <button className="ob-btn-back" onClick={prev}>
                <ArrowLeft size={18} />
                Previous
              </button>
              <button className="ob-btn-continue" disabled={!canContinue} onClick={next}>
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {showPreview && <LivePreview data={data} />}
      </div>

      {step === 1 && (
        <>
          <a href="#/" className="ob-back-link">
            <ArrowLeft size={14} />
            Back to home
          </a>
          <div className="ob-top-meta">
            <span className="ob-top-meta-steps">12 steps</span>
            <span className="ob-top-meta-sep">·</span>
            <span className="ob-top-meta-time">~3 min</span>
          </div>
        </>
      )}
    </div>
  );
}
