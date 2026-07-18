import { useState } from 'react';
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#/reset-password`,
      });

      if (resetError) {
        setError(resetError.message || 'Failed to send reset link. Please try again.');
        setIsLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fpPage min-h-screen bg-white flex items-center justify-center px-6"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* ── Back to Home ── */}
      <a
        href="/"
        className="fpBackBtn fixed z-10 flex items-center gap-2 opacity-0"
        style={{
          top: '32px',
          left: '32px',
          height: '42px',
          padding: '0 16px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: 500,
          color: '#374151',
          textDecoration: 'none',
          transition: 'all 200ms ease',
          animation: 'fpBackFadeIn 300ms ease 200ms forwards',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#F8FAFC';
          e.currentTarget.style.borderColor = '#D1D5DB';
          e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.04)';
          const icon = e.currentTarget.querySelector('svg');
          if (icon) icon.style.transform = 'translateX(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#FFFFFF';
          e.currentTarget.style.borderColor = '#E5E7EB';
          e.currentTarget.style.boxShadow = 'none';
          const icon = e.currentTarget.querySelector('svg');
          if (icon) icon.style.transform = 'translateX(0)';
        }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <ArrowLeft
          className="w-4 h-4"
          strokeWidth={2}
          style={{ transition: 'transform 200ms ease' }}
        />
        Back to Home
      </a>

      {/* ── Auth Card ── */}
      <div
        className="w-full max-w-[460px] opacity-0"
        style={{ animation: 'fpCardEnter 400ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards' }}
      >
        <div
          className="fpCard"
          style={{
            background: '#FFFFFF',
            border: '1px solid #ECECEC',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
            padding: '48px',
          }}
        >
          {!submitted ? (
            <>
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <a href="/">
                  <img
                    src="/assets/logos/logo+text.jpeg"
                    alt="Nagriva"
                    className="h-8 w-auto"
                    draggable={false}
                  />
                </a>
              </div>

              {/* Header */}
              <div className="mb-8 text-center">
                <h1
                  className="text-[1.625rem] font-bold tracking-tight mb-2"
                  style={{ color: '#0B0B0B' }}
                >
                  Forgot your password?
                </h1>
                <p
                  className="text-[14px] leading-relaxed max-w-[320px] mx-auto"
                  style={{ color: '#9CA3AF' }}
                >
                  No worries. Enter your email address and we'll send you a secure reset link.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="mb-6 px-4 py-3 rounded-xl text-[13px] font-medium"
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    color: '#DC2626',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="fp-email"
                    className="block text-[13px] font-medium mb-2"
                    style={{ color: '#374151' }}
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none transition-colors duration-200"
                      style={{ color: focusedField ? '#1E40AF' : '#9CA3AF' }}
                      strokeWidth={1.8}
                    />
                    <input
                      id="fp-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField(true)}
                      onBlur={() => setFocusedField(false)}
                      placeholder="you@company.com"
                      required
                      className="w-full h-14 pl-11 pr-4 text-sm rounded-[14px] outline-none transition-all duration-200"
                      style={{
                        background: '#FFFFFF',
                        border: `1.5px solid ${focusedField ? '#1E40AF' : '#E5E7EB'}`,
                        color: '#0B0B0B',
                        boxShadow: focusedField ? '0 0 0 3px rgba(30, 64, 175, 0.08)' : 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: '#3153D8',
                    boxShadow: '0 1px 2px rgba(49, 83, 216, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.background = '#2744C0';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(49, 83, 216, 0.3)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#3153D8';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(49, 83, 216, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onMouseDown={(e) => {
                    if (!isLoading) e.currentTarget.style.transform = 'scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    if (!isLoading) e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>

              {/* Security note */}
              <div
                className="flex items-center justify-center gap-1.5 mt-4"
                style={{ color: '#9CA3AF' }}
              >
                <span className="text-[12px]">🔒</span>
                <span className="text-[11px]">Password reset links expire after 30 minutes.</span>
              </div>

              {/* Back to Sign In */}
              <div className="flex justify-center mt-8">
                <a
                  href="#/login"
                  className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-200"
                  style={{ color: '#6B7280', textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#0B0B0B';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6B7280';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                  Back to Sign In
                </a>
              </div>
            </>
          ) : (
            /* ── Success State ── */
            <div
              className="text-center opacity-0"
              style={{ animation: 'fpFadeIn 250ms ease forwards' }}
            >
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <a href="/">
                  <img
                    src="/assets/logos/logo+text.jpeg"
                    alt="Nagriva"
                    className="h-8 w-auto"
                    draggable={false}
                  />
                </a>
              </div>

              {/* Check icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(16, 185, 129, 0.08)' }}
                >
                  <CheckCircle2
                    className="w-8 h-8"
                    style={{ color: '#10B981' }}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* Title */}
              <h2
                className="text-[1.5rem] font-bold tracking-tight mb-2"
                style={{ color: '#0B0B0B' }}
              >
                Check your inbox
              </h2>

              {/* Subtitle */}
              <p
                className="text-[14px] leading-relaxed mb-1"
                style={{ color: '#9CA3AF' }}
              >
                Password reset link has been sent to:
              </p>
              <p
                className="text-[14px] font-medium mb-8"
                style={{ color: '#0B0B0B' }}
              >
                {email}
              </p>

              {/* Didn't receive */}
              <p
                className="text-[13px] mb-4"
                style={{ color: '#9CA3AF' }}
              >
                Didn't receive the email?
              </p>

              {error && (
                <div
                  className="mb-4 px-4 py-3 rounded-xl text-[13px] font-medium text-center"
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    color: '#DC2626',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    setIsLoading(true);
                    setError(null);
                    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/#/reset-password`,
                    });
                    if (resetError) {
                      setError(resetError.message || 'Failed to resend. Please try again.');
                    }
                    setIsLoading(false);
                  }}
                  className="w-full h-12 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                  style={{
                    background: '#3153D8',
                    color: '#FFFFFF',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2744C0';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(49, 83, 216, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#3153D8';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Resend Email
                </button>

                <a
                  href="#/login"
                  className="w-full h-12 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E5E7EB',
                    color: '#374151',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#D1D5DB';
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                  Back to Sign In
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Keyframes & Responsive ── */}
      <style>{`
        @keyframes fpCardEnter {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fpBackFadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fpFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .fpBackBtn {
            top: 16px !important;
            left: 16px !important;
            height: 40px !important;
            font-size: 14px !important;
          }
          .fpCard {
            padding: 32px !important;
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .fpBackBtn {
            top: 24px !important;
            left: 24px !important;
          }
          .fpCard {
            margin: 24px !important;
            padding: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
