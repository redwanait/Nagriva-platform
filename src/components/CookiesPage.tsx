import { useEffect, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import {
  ArrowRight,
  Shield,
  Zap,
  Settings,
  BarChart3,
  CheckCircle2,
  Globe,
  Lock,
  Trash2,
  BookOpen,
  ChevronDown,
  Mail,
  AlertTriangle,
  Key,
  X,
  Info,
  Save,
  RotateCcw,
  Check,
  ShieldCheck,
} from 'lucide-react';
import Footer from './Footer';

/* ─── Cookie Preferences Storage ──────────────────────────────────────── */

const COOKIE_STORAGE_KEY = 'nagriva_cookie_preferences';

const defaultPreferences = {
  essential: true,
  analytics: false,
  functional: false,
  marketing: false,
};

function loadPreferences() {
  try {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed, essential: true };
    }
  } catch { /* ignore */ }
  return { ...defaultPreferences };
}

function savePreferences(prefs: typeof defaultPreferences) {
  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
  } catch { /* ignore */ }
}

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

/* ─── Toggle Switch ───────────────────────────────────────────────────── */

function ToggleSwitch({ enabled, onChange, disabled = false }: {
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={disabled ? undefined : onChange}
      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:ring-offset-2 ${
        enabled
          ? 'bg-royal-blue shadow-sm shadow-royal-blue/20'
          : 'bg-gray-200'
      } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      aria-label={enabled ? 'Enabled' : 'Disabled'}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-300 ease-in-out ${
          enabled ? 'translate-x-[22px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  );
}

/* ─── Toast ───────────────────────────────────────────────────────────── */

function Toast({ message, visible, type = 'success' }: {
  message: string;
  visible: boolean;
  type?: 'success' | 'info';
}) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[toastIn_0.4s_cubic-bezier(0.22,1,0.36,1)]">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-lg backdrop-blur-sm ${
        type === 'success'
          ? 'bg-white border-emerald-200 shadow-emerald-100/50'
          : 'bg-white border-royal-blue/20 shadow-royal-blue/5'
      }`}>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${
          type === 'success' ? 'bg-emerald-50' : 'bg-royal-blue/[0.06]'
        }`}>
          {type === 'success'
            ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            : <Info className="h-4 w-4 text-royal-blue" />
          }
        </div>
        <p className="text-sm font-medium text-deep-black pr-2">{message}</p>
      </div>
    </div>
  );
}

/* ─── Delete Confirmation Modal ───────────────────────────────────────── */

function DeleteModal({ visible, onConfirm, onCancel }: {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-black/30 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/50 animate-[modalIn_0.3s_cubic-bezier(0.22,1,0.36,1)]">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 mb-5">
          <Trash2 className="h-5 w-5 text-rose-500" />
        </div>

        <h3 className="text-lg font-semibold text-deep-black mb-2">Delete Nagriva Cookies</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-2">
          This will remove all optional cookies stored by Nagriva from your browser.
        </p>
        <p className="text-sm text-gray-400 leading-relaxed mb-8">
          Essential cookies required for security and authentication may be recreated when you continue using the platform.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-600 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-rose-500 rounded-lg transition-all duration-200 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/20 active:scale-[0.98]"
          >
            <Trash2 className="h-4 w-4" />
            Delete Cookies
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function CookiesPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Cookies Policy | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Learn how Nagriva uses cookies and similar technologies to provide secure authentication, improve performance, and enhance your experience.');
  }, []);

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── What Are Cookies ── */}
        <WhatAreCookiesSection />

        {/* ── Types of Cookies ── */}
        <TypesSection />

        {/* ── How We Use Cookies ── */}
        <HowWeUseSection />

        {/* ── Cookie Preferences ── */}
        <CookiePreferencesSection />

        {/* ── Managing Cookies ── */}
        <ManagingSection />

        {/* ── Third-Party Services ── */}
        <ThirdPartySection />

        {/* ── Your Choices ── */}
        <ChoicesSection />

        {/* ── FAQ ── */}
        <FAQSection openFAQ={openFAQ} onToggle={(i) => setOpenFAQ(openFAQ === i ? null : i)} />

        {/* ── Contact ── */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

/* ─── Cookie Preferences Section ──────────────────────────────────────── */

function CookiePreferencesSection() {
  const [preferences, setPreferences] = useState(loadPreferences);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean; type: 'success' | 'info' }>({ message: '', visible: false, type: 'success' });

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast({ message: '', visible: false, type: 'success' }), 3000);
  }, []);

  const toggle = (key: keyof typeof defaultPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      savePreferences(preferences);
      setSaving(false);
      showToast('Your cookie preferences have been saved.');
    }, 600);
  };

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, functional: true, marketing: true };
    setPreferences(all);
    setSaving(true);
    setTimeout(() => {
      savePreferences(all);
      setSaving(false);
      showToast('All cookies have been accepted.');
    }, 600);
  };

  const handleRejectOptional = () => {
    const essential = { essential: true, analytics: false, functional: false, marketing: false };
    setPreferences(essential);
    setSaving(true);
    setTimeout(() => {
      savePreferences(essential);
      setSaving(false);
      showToast('Optional cookies have been rejected.');
    }, 600);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    setSaving(true);
    setTimeout(() => {
      savePreferences(defaultPreferences);
      setPreferences(defaultPreferences);
      setSaving(false);
      showToast('Your cookie preferences have been updated successfully.');
    }, 600);
  };

  const handleReset = () => {
    setPreferences(defaultPreferences);
    setSaving(true);
    setTimeout(() => {
      savePreferences(defaultPreferences);
      setSaving(false);
      showToast('Cookie preferences have been reset to default.');
    }, 400);
  };

  const categories = [
    {
      key: 'essential' as const,
      icon: Lock,
      title: 'Essential Cookies',
      description: 'Required for login, authentication and platform security.',
      alwaysActive: true,
    },
    {
      key: 'analytics' as const,
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use Nagriva.',
      alwaysActive: false,
    },
    {
      key: 'functional' as const,
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Remember your preferences and improve your experience.',
      alwaysActive: false,
    },
    {
      key: 'marketing' as const,
      icon: Globe,
      title: 'Marketing Cookies',
      description: 'Used only to personalize marketing communications.',
      alwaysActive: false,
    },
  ];

  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="section-padding bg-gray-50/50" id="preferences">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase px-4 py-1.5 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full mb-5">
              <Settings className="h-3.5 w-3.5" />
              Preferences
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Cookie Preferences</h2>
            <p className="text-body max-w-2xl mx-auto">
              Choose how Nagriva uses cookies on your device. Your privacy is always under your control.
            </p>
          </div>
        </RevealBlock>

        {/* ── Settings Panel ── */}
        <RevealBlock>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl md:rounded-3xl border border-gray-100 bg-white overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center gap-3 px-6 md:px-8 py-5 border-b border-gray-50 bg-gray-50/30">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-blue/[0.06]">
                  <ShieldCheck className="h-4.5 w-4.5 text-royal-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-black">Manage Your Cookie Settings</p>
                  <p className="text-xs text-gray-400">Toggle each category on or off</p>
                </div>
              </div>

              {/* Category rows */}
              <div className="divide-y divide-gray-50">
                {categories.map((cat) => (
                  <div key={cat.key} className="group px-6 md:px-8 py-5 md:py-6 hover:bg-gray-50/20 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Icon + Text */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue flex-shrink-0 mt-0.5">
                          <cat.icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h4 className="text-sm font-semibold text-deep-black">{cat.title}</h4>
                            {cat.alwaysActive && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-royal-blue/[0.06] text-[10px] font-bold text-royal-blue tracking-wider uppercase">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] text-gray-500 leading-relaxed mt-0.5">{cat.description}</p>
                        </div>
                      </div>

                      {/* Toggle + Status */}
                      <div className="flex items-center gap-4 sm:flex-shrink-0 pl-14 sm:pl-0">
                        <span className={`text-xs font-semibold ${preferences[cat.key] ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {preferences[cat.key] ? 'Enabled' : 'Disabled'}
                        </span>
                        <ToggleSwitch
                          enabled={preferences[cat.key]}
                          onChange={() => toggle(cat.key)}
                          disabled={cat.alwaysActive}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="px-6 md:px-8 py-6 border-t border-gray-50 bg-gray-50/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Preferences
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 transition-all duration-200 hover:bg-emerald-100 hover:border-emerald-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectOptional}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-200 hover:border-gray-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Shield className="h-4 w-4" />
                    Reject Optional
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg border border-rose-200 transition-all duration-200 hover:bg-rose-100 hover:border-rose-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Cookies
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* ── Status Card ── */}
        <RevealBlock delay={100}>
          <div className="max-w-3xl mx-auto mt-6">
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 md:px-8 py-4 border-b border-gray-50 bg-gray-50/30">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <Info className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-sm font-semibold text-deep-black">Current Cookie Status</p>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-50">
                {categories.map((cat) => (
                  <div key={cat.key} className="flex items-center justify-between px-6 md:px-8 py-3.5">
                    <div className="flex items-center gap-3">
                      <cat.icon className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-sm text-gray-600">{cat.title.replace(' Cookies', '')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {cat.alwaysActive ? (
                        <span className="text-xs font-semibold text-royal-blue">Always Active</span>
                      ) : (
                        <>
                          <span className={`h-1.5 w-1.5 rounded-full ${preferences[cat.key] ? 'bg-emerald-400' : 'bg-gray-300'}`} />
                          <span className={`text-xs font-semibold ${preferences[cat.key] ? 'text-emerald-600' : 'text-gray-400'}`}>
                            {preferences[cat.key] ? 'Enabled' : 'Disabled'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Last Updated */}
                <div className="flex items-center justify-between px-6 md:px-8 py-3.5 bg-gray-50/30">
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <span className="text-xs font-medium text-gray-400">{lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* ── Help text ── */}
        <RevealBlock delay={150}>
          <div className="max-w-3xl mx-auto mt-6 text-center">
            <p className="text-sm text-gray-400">
              Your preferences are saved locally on this device.{' '}
              <a href="#/privacy" className="text-royal-blue font-medium hover:underline">Learn more in our Privacy Policy</a>
            </p>
          </div>
        </RevealBlock>
      </div>

      {/* ── Modals & Toasts ── */}
      <DeleteModal
        visible={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
      <Toast message={toast.message} visible={toast.visible} type={toast.type} />
    </section>
  );
}

/* ─── Existing Sections (unchanged) ───────────────────────────────────── */

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
            Cookies Policy
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-8 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            How Nagriva{' '}
            <span className="text-royal-blue">Uses Cookies</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            This Cookies Policy explains how Nagriva uses cookies and similar technologies to improve your experience, maintain security, and enhance platform performance.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BookOpen className="h-4 w-4" />
            <span>Last Updated: July 2026</span>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 transition-all duration-700 ease-out delay-[350ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#preferences" className="btn-primary text-base px-8 py-3.5 gap-2">
            <Settings className="h-4 w-4" />
            Manage Cookie Preferences
          </a>
          <a href="#/privacy" className="btn-secondary text-base px-8 py-3.5">
            Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
}

function WhatAreCookiesSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Overview
            </span>
            <h2 className="heading-lg text-deep-black mb-6">What Are Cookies?</h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-5">
              Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, maintain secure login sessions, and improve your overall experience.
            </p>
            <p className="text-[17px] text-gray-500 leading-relaxed">
              Nagriva uses cookies to provide secure authentication, protect your account, and ensure the platform works reliably.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function TypesSection() {
  const types = [
    {
      icon: Lock,
      title: 'Essential Cookies',
      description: 'Required for authentication, secure login, and core platform functionality. These cannot be disabled.',
      badge: null,
    },
    {
      icon: Zap,
      title: 'Performance Cookies',
      description: 'Help improve website speed, loading times, and overall platform performance.',
      badge: null,
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Remember your preferences, settings, and display choices across sessions.',
      badge: null,
    },
    {
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'Used to understand how the platform is accessed and used. Only active when analytics tools are enabled.',
      badge: 'Coming Soon',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Types
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Types of Cookies</h2>
            <p className="text-body max-w-2xl mx-auto">
              Different cookies serve different purposes on the platform.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {types.map((type, i) => (
            <RevealBlock key={type.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110">
                    <type.icon className="h-5 w-5" />
                  </div>
                  {type.badge && (
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
                      {type.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-1.5">{type.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{type.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeUseSection() {
  const items = [
    { icon: Key, text: 'Keep you signed in to your account securely.' },
    { icon: Shield, text: 'Protect your account from unauthorized access.' },
    { icon: Settings, text: 'Remember your preferences and display settings.' },
    { icon: Zap, text: 'Improve website performance and loading times.' },
    { icon: BarChart3, text: 'Measure platform usage when analytics tools are enabled.' },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Usage
            </span>
            <h2 className="heading-lg text-deep-black mb-5">How We Use Cookies</h2>
            <p className="text-body max-w-2xl mx-auto">
              Cookies help Nagriva provide a secure, reliable, and personalized experience.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10">
              <div className="space-y-5">
                {items.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-royal-blue/[0.06] flex-shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-royal-blue" />
                    </div>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

function ManagingSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Controls
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Managing Cookies</h2>
            <p className="text-body max-w-2xl mx-auto">
              You have control over how cookies are used on your device.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  You can control cookies through your browser settings. Most browsers allow you to block or delete cookies.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  You can delete existing cookies at any time through your browser's privacy settings.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  You can choose to block cookies, but this may affect certain platform features.
                </p>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700">
                  Disabling essential cookies may prevent you from logging in or using core platform features, as they are required for secure authentication.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

function ThirdPartySection() {
  const services = [
    { icon: Globe, name: 'Google OAuth', description: 'Used for secure Google sign-in authentication.' },
    { icon: Shield, name: 'Stripe', description: 'Used for secure payment processing and billing.' },
    { icon: Lock, name: 'Supabase Authentication', description: 'Used for secure session management and account protection.' },
    { icon: BarChart3, name: 'Analytics Services', description: 'Platform usage analytics. Only active when enabled.', comingSoon: true },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Third Parties
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Third-Party Services</h2>
            <p className="text-body max-w-2xl mx-auto">
              Some trusted third-party services may place cookies when their features are enabled.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <RevealBlock key={service.name} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110">
                    <service.icon className="h-5 w-5" />
                  </div>
                  {service.comingSoon && (
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-1.5">{service.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock>
          <p className="text-center text-sm text-gray-400 mt-8 max-w-xl mx-auto">
            Each third-party provider has its own privacy and cookie practices. Please refer to their respective policies for more information.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

function ChoicesSection() {
  const choices = [
    { icon: CheckCircle2, title: 'Accept Cookies', description: 'Accept all cookies to enjoy the full platform experience with all features enabled.' },
    { icon: Settings, title: 'Manage Browser Settings', description: 'Configure your browser to accept or reject specific types of cookies.' },
    { icon: Trash2, title: 'Delete Cookies', description: 'Remove existing cookies from your device through your browser settings at any time.' },
    { icon: BookOpen, title: 'Learn More', description: 'Read our full Privacy Policy for detailed information about how your data is handled.' },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Choices
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Your Choices</h2>
            <p className="text-body max-w-2xl mx-auto">
              You're in control of how cookies are used on your device.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {choices.map((choice, i) => (
            <RevealBlock key={choice.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110 mb-4">
                  <choice.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-1.5">{choice.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{choice.description}</p>
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
      question: 'What are cookies?',
      answer: 'Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, maintain secure sessions, and improve your browsing experience.',
    },
    {
      question: 'Does Nagriva use advertising cookies?',
      answer: 'No. Nagriva does not currently use advertising or tracking cookies. The cookies we use are strictly for authentication, security, functionality, and performance purposes.',
    },
    {
      question: 'Can I disable cookies?',
      answer: 'Yes. You can disable cookies through your browser settings. However, disabling essential cookies may prevent you from logging in or using core platform features, as they are required for secure authentication.',
    },
    {
      question: 'Will the platform still work without cookies?',
      answer: 'Core platform features require essential cookies for authentication and session management. Without them, you may not be able to log in or access protected areas of the platform.',
    },
    {
      question: 'How do I clear cookies?',
      answer: 'You can clear cookies through your browser settings. The exact steps depend on your browser — look for "Privacy" or "Clear browsing data" in your browser\'s settings menu.',
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
              Common questions about cookies on the Nagriva platform.
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

function ContactSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06]">
                <Mail className="h-6 w-6 text-royal-blue" />
              </div>
              <h2 className="heading-md text-deep-black mb-4">Questions About Cookies?</h2>
              <p className="text-body-sm max-w-xl mx-auto mb-8">
                If you have any questions about how cookies are used on Nagriva, our support team is here to help.
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
