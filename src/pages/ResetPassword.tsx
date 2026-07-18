import { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const hasHandledTokens = useRef(false);

  useEffect(() => {
    if (hasHandledTokens.current) return;

    const handleRecovery = async () => {
      console.log('[ResetPassword] search:', window.location.search, 'hash:', window.location.hash);
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        console.log('[ResetPassword] found code, exchanging...');
        hasHandledTokens.current = true;
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          console.log('[ResetPassword] exchange error:', exchangeError.message);
          setInvalidLink(true);
        } else {
          console.log('[ResetPassword] exchange OK, session ready');
          setSessionReady(true);
        }
        window.history.replaceState({}, '', window.location.pathname + window.location.hash);
        return;
      }

      const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (accessToken && refreshToken) {
        console.log('[ResetPassword] found tokens in hash, setting session...');
        hasHandledTokens.current = true;
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionError) {
          console.log('[ResetPassword] setSession error:', sessionError.message);
          setInvalidLink(true);
        } else {
          console.log('[ResetPassword] setSession OK, session ready');
          setSessionReady(true);
        }
        window.history.replaceState({}, '', '#/reset-password');
        return;
      }

      console.log('[ResetPassword] no code or tokens → invalid link');
      hasHandledTokens.current = true;
      setInvalidLink(true);
    };

    handleRecovery();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log('[ResetPassword] auth event:', event);
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
        setInvalidLink(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message || 'Failed to update password. Please try again.');
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      await supabase.auth.signOut();
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 2000);
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (invalidLink) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center px-6"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <a
          href="/"
          className="rpBackBtn fixed z-10 flex items-center gap-2 opacity-0"
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
            animation: 'rpBackFadeIn 300ms ease 200ms forwards',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F8FAFC';
            e.currentTarget.style.borderColor = '#D1D5DB';
            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Back to Home
        </a>

        <div
          className="w-full max-w-[460px] opacity-0"
          style={{ animation: 'rpCardEnter 400ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards' }}
        >
          <div
            className="rpCard"
            style={{
              background: '#FFFFFF',
              border: '1px solid #ECECEC',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
              padding: '48px',
            }}
          >
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

            <div className="flex justify-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(245, 158, 11, 0.08)' }}
              >
                <AlertTriangle
                  className="w-8 h-8"
                  style={{ color: '#F59E0B' }}
                  strokeWidth={1.8}
                />
              </div>
            </div>

            <h2
              className="text-[1.5rem] font-bold tracking-tight mb-2 text-center"
              style={{ color: '#0B0B0B' }}
            >
              Link expired
            </h2>
            <p
              className="text-[14px] leading-relaxed text-center mb-8"
              style={{ color: '#9CA3AF' }}
            >
              This reset link is invalid or has expired.
            </p>

            <a
              href="#/forgot-password"
              className="w-full h-14 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
              style={{
                background: '#3153D8',
                textDecoration: 'none',
                boxShadow: '0 1px 2px rgba(49, 83, 216, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2744C0';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(49, 83, 216, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3153D8';
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(49, 83, 216, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Request New Link
            </a>
          </div>
        </div>

        <style>{`
          @keyframes rpCardEnter {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes rpBackFadeIn {
            from { opacity: 0; transform: translateX(-8px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @media (max-width: 480px) {
            .rpBackBtn {
              top: 16px !important;
              left: 16px !important;
              height: 40px !important;
              font-size: 14px !important;
            }
            .rpCard {
              padding: 32px !important;
            }
          }
        `}</style>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#1E40AF' }} />
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Verifying reset link...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-6"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <a
        href="/"
        className="rpBackBtn fixed z-10 flex items-center gap-2 opacity-0"
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
          animation: 'rpBackFadeIn 300ms ease 200ms forwards',
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

      <div
        className="w-full max-w-[460px] opacity-0"
        style={{ animation: 'rpCardEnter 400ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards' }}
      >
        <div
          className="rpCard"
          style={{
            background: '#FFFFFF',
            border: '1px solid #ECECEC',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
            padding: '48px',
          }}
        >
          {!success ? (
            <>
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

              <div className="mb-8 text-center">
                <h1
                  className="text-[1.625rem] font-bold tracking-tight mb-2"
                  style={{ color: '#0B0B0B' }}
                >
                  Set new password
                </h1>
                <p
                  className="text-[14px] leading-relaxed max-w-[320px] mx-auto"
                  style={{ color: '#9CA3AF' }}
                >
                  Choose a strong password for your account.
                </p>
              </div>

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

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="rp-new-password"
                    className="block text-[13px] font-medium mb-2"
                    style={{ color: '#374151' }}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none transition-colors duration-200"
                      style={{ color: focusedField === 'new' ? '#1E40AF' : '#9CA3AF' }}
                      strokeWidth={1.8}
                    />
                    <input
                      id="rp-new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={() => setFocusedField('new')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Minimum 8 characters"
                      className="w-full h-14 pl-11 pr-12 text-sm rounded-[14px] outline-none transition-all duration-200"
                      style={{
                        background: '#FFFFFF',
                        border: `1.5px solid ${focusedField === 'new' ? '#1E40AF' : '#E5E7EB'}`,
                        color: '#0B0B0B',
                        boxShadow: focusedField === 'new' ? '0 0 0 3px rgba(30, 64, 175, 0.08)' : 'none',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-md transition-colors duration-200"
                      style={{ color: '#9CA3AF' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#6B7280')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                      tabIndex={-1}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.8} />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" strokeWidth={1.8} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="rp-confirm-password"
                    className="block text-[13px] font-medium mb-2"
                    style={{ color: '#374151' }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none transition-colors duration-200"
                      style={{ color: focusedField === 'confirm' ? '#1E40AF' : '#9CA3AF' }}
                      strokeWidth={1.8}
                    />
                    <input
                      id="rp-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField('confirm')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Repeat your password"
                      className="w-full h-14 pl-11 pr-12 text-sm rounded-[14px] outline-none transition-all duration-200"
                      style={{
                        background: '#FFFFFF',
                        border: `1.5px solid ${focusedField === 'confirm' ? '#1E40AF' : '#E5E7EB'}`,
                        color: '#0B0B0B',
                        boxShadow: focusedField === 'confirm' ? '0 0 0 3px rgba(30, 64, 175, 0.08)' : 'none',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-md transition-colors duration-200"
                      style={{ color: '#9CA3AF' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#6B7280')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.8} />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" strokeWidth={1.8} />
                      )}
                    </button>
                  </div>
                </div>

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
                      Updating...
                    </>
                  ) : (
                    <>
                      Update Password
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div
              className="text-center opacity-0"
              style={{ animation: 'rpFadeIn 250ms ease forwards' }}
            >
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

              <h2
                className="text-[1.5rem] font-bold tracking-tight mb-2"
                style={{ color: '#0B0B0B' }}
              >
                Password updated
              </h2>
              <p
                className="text-[14px] leading-relaxed mb-8"
                style={{ color: '#9CA3AF' }}
              >
                Your password has been changed successfully. Redirecting to sign in...
              </p>

              <a
                href="#/login"
                className="w-full h-14 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                style={{
                  background: '#3153D8',
                  textDecoration: 'none',
                  boxShadow: '0 1px 2px rgba(49, 83, 216, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2744C0';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(49, 83, 216, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3153D8';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(49, 83, 216, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                Go to Sign In
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes rpCardEnter {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rpBackFadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes rpFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .rpBackBtn {
            top: 16px !important;
            left: 16px !important;
            height: 40px !important;
            font-size: 14px !important;
          }
          .rpCard {
            padding: 32px !important;
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .rpBackBtn {
            top: 24px !important;
            left: 24px !important;
          }
          .rpCard {
            margin: 24px !important;
            padding: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
