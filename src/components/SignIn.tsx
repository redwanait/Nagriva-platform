import { useState, useCallback } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = useCallback(async () => {
    setError(null);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (oauthError) {
        setError(oauthError.message || 'Google sign-in failed. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting login');
    console.log('email:', email);

    setError(null);
    setIsLoading(true);

    try {
      console.log('before signInWithPassword');
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('after signInWithPassword', { data, error: signInError });

      if (signInError) {
        console.log('error:', signInError.message);
        setError(signInError.message || 'Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }

      console.log('success — session:', data.session?.user?.email);

      const userId = data.session?.user?.id;
      if (userId) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, account_status')
          .eq('id', userId)
          .maybeSingle();

        if (profile?.account_status === 'suspended') {
          await supabase.auth.signOut();
          setError('Your account has been suspended. Please contact support.');
          setIsLoading(false);
          return;
        }

        if (profile?.role === 'client') {
          window.location.hash = '#/client-dashboard';
        } else {
          window.location.hash = '#/dashboard';
        }
      } else {
        window.location.hash = '#/dashboard';
      }
    } catch (err) {
      console.log('error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-6"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: 'radial-gradient(ellipse 50% 50% at 50% 45%, rgba(30, 64, 175, 0.04) 0%, transparent 70%)',
      }}
    >
      {/* ── Back to Home ── */}
      <a
        href="/"
        className="signInBackBtn fixed z-10 flex items-center gap-2 opacity-0"
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
          animation: 'signInBackFadeIn 300ms ease 200ms forwards',
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
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
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
        className="w-full opacity-0"
        style={{
          maxWidth: '460px',
          animation: 'signInCardEnter 400ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #ECECEC',
            borderRadius: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02), 0 8px 32px -4px rgba(0, 0, 0, 0.04), 0 20px 60px -12px rgba(0, 0, 0, 0.03)',
            padding: '48px',
          }}
        >
          {/* Logo — centered */}
          <div className="flex justify-center mb-6">
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
            <h2
              className="text-[1.625rem] font-bold tracking-tight mb-1.5"
              style={{ color: '#0B0B0B' }}
            >
              Sign in
            </h2>
            <p className="text-[13px]" style={{ color: '#9CA3AF' }}>
              Welcome back. Continue where you left off.
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium mb-2"
                style={{ color: '#374151' }}
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none transition-colors duration-200"
                  style={{
                    color: focusedField === 'email' ? '#1E40AF' : '#9CA3AF',
                  }}
                  strokeWidth={1.8}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@company.com"
                  className="w-full h-14 pl-11 pr-4 text-sm rounded-xl outline-none transition-all duration-200"
                  style={{
                    background: '#FFFFFF',
                    border: `1.5px solid ${focusedField === 'email' ? '#1E40AF' : '#E5E7EB'}`,
                    color: '#0B0B0B',
                    boxShadow:
                      focusedField === 'email'
                        ? '0 0 0 3px rgba(30, 64, 175, 0.08)'
                        : 'none',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-medium mb-2"
                style={{ color: '#374151' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none transition-colors duration-200"
                  style={{
                    color: focusedField === 'password' ? '#1E40AF' : '#9CA3AF',
                  }}
                  strokeWidth={1.8}
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="w-full h-14 pl-11 pr-12 text-sm rounded-xl outline-none transition-all duration-200"
                  style={{
                    background: '#FFFFFF',
                    border: `1.5px solid ${focusedField === 'password' ? '#1E40AF' : '#E5E7EB'}`,
                    color: '#0B0B0B',
                    boxShadow:
                      focusedField === 'password'
                        ? '0 0 0 3px rgba(30, 64, 175, 0.08)'
                        : 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-md transition-colors duration-200"
                  style={{ color: '#9CA3AF' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#6B7280')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = '#9CA3AF')
                  }
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  ) : (
                    <Eye className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div
                    className="w-5 h-5 rounded-[6px] border-[1.5px] flex items-center justify-center transition-all duration-200"
                    style={{
                      borderColor: rememberMe ? '#1E40AF' : '#D1D5DB',
                      background: rememberMe ? '#1E40AF' : 'transparent',
                    }}
                  >
                    {rememberMe && (
                      <Check
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                </div>
                <span
                  className="text-[13px]"
                  style={{ color: '#6B7280' }}
                >
                  Remember me
                </span>
              </label>
              <a
                href="#/forgot-password"
                className="text-[13px] font-medium transition-colors duration-200"
                style={{ color: '#1E40AF' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#1E3A8A')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#1E40AF')
                }
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: '#1E40AF',
                  boxShadow: '0 1px 2px rgba(30, 64, 175, 0.2)',
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = '#1E3A8A';
                    e.currentTarget.style.boxShadow =
                      '0 6px 20px rgba(30, 64, 175, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1E40AF';
                  e.currentTarget.style.boxShadow =
                    '0 1px 2px rgba(30, 64, 175, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onMouseDown={(e) => {
                  if (!isLoading)
                    e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  if (!isLoading)
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div
              className="flex-1 h-px"
              style={{ background: '#ECECEC' }}
            />
            <span
              className="text-[12px] font-medium"
              style={{ color: '#9CA3AF' }}
            >
              or continue with
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: '#ECECEC' }}
            />
          </div>

          {/* Social Buttons */}
          <div className="flex">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-14 rounded-[14px] flex items-center justify-center gap-2.5 text-[13px] font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E5E7EB',
                color: '#374151',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1E40AF';
                e.currentTarget.style.background = '#F9FAFB';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow =
                  '0 2px 8px rgba(30, 64, 175, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Bottom */}
          <p
            className="text-center text-[13px] mt-8"
            style={{ color: '#9CA3AF' }}
          >
            Don&apos;t have an account?{' '}
            <a
              href="#/onboarding"
              className="font-semibold transition-colors duration-200"
              style={{ color: '#1E40AF' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = '#1E3A8A')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = '#1E40AF')
              }
            >
              Create account
            </a>
          </p>
        </div>
      </div>

      {/* ── Animation Keyframes ── */}
      <style>{`
        @keyframes signInCardEnter {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes signInBackFadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .signInBackBtn {
            top: 16px !important;
            left: 16px !important;
            height: 40px !important;
            font-size: 14px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .signInBackBtn {
            top: 24px !important;
            left: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
