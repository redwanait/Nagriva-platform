import { useEffect, useRef, useState } from 'react';
import { useNewsletter } from '../hooks/useNewsletter';
import Toast from './Toast';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { subscribe, loading } = useNewsletter();
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, 'footer');
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) setEmail('');
  };

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('footer-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'Pricing', href: '#/pricing' },
      { label: 'Documentation', href: '#/docs' },
      { label: 'API', href: '#/api' },
    ],
    Company: [
      { label: 'About', href: '#/about' },
      { label: 'Blog', href: '#/blog' },
      { label: 'Careers', href: '#/careers' },
      { label: 'Contact', href: '#/contact' },
      { label: 'Partners', href: '#/partners' },
    ],
    Resources: [
      { label: 'Help Center', href: '#/help-center' },
      { label: 'Status', href: '#/status' },
      { label: 'Community', href: '#/community' },
      { label: 'Nagriva Live', href: '#/webinars' },
      { label: 'Changelog', href: '#/changelog' },
    ],
    Legal: [
      { label: 'Privacy', href: '#/privacy' },
                { label: 'Terms', href: '#/terms' },
      { label: 'Security', href: '#/security' },
      { label: 'GDPR', href: '#/gdpr' },
      { label: 'Cookies', href: '#/cookies' },
    ],
  };

  const socials = [
    {
      name: 'LinkedIn',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'X',
      icon: (
        <svg className="h-[15px] w-[15px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <>
    <footer ref={footerRef} className="footer-section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 footer-gradient" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">

        {/* ── Main Content ── */}
        <div className="footer-main pt-20 pb-14 lg:pt-28 lg:pb-16">

          {/* Desktop: Asymmetric 3-column layout */}
          <div className="hidden lg:grid lg:grid-cols-[35%_45%_20%] lg:gap-x-16 xl:gap-x-20">

            {/* ── LEFT — Company Block ── */}
            <div className="footer-col pr-4">
              <a href="/" className="mb-8 block" aria-label="Nagriva – Home">
                <img
                  src="/assets/logos/logo+text.jpeg"
                  alt="Nagriva"
                  width={204}
                  height={68}
                  decoding="async"
                  draggable={false}
                  className="footer-logo h-auto w-[204px] object-contain"
                />
              </a>

              <p className="mb-5 max-w-[340px] text-[17px] font-semibold leading-[1.55] text-[#0B0B0B]">
                The AI workforce platform for modern businesses.
              </p>

              <p className="mb-7 max-w-[340px] text-[14.5px] leading-[1.7] text-[#6B7280]">
                Build, deploy, and manage AI employees that work 24/7 to automate customer support, bookings, sales, and operations.
              </p>

              {/* Rating + Trust — single row */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex gap-0.5 text-[#F59E0B] text-[14px]">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <span className="text-[13px] font-bold text-[#0B0B0B]">4.9/5</span>
                <span className="h-3.5 w-px bg-[#E5E7EB]" />
                <span className="text-[13px] text-[#9CA3AF]">Trusted by 2,000+ businesses</span>
              </div>

              {/* Social Icons — 48px */}
              <div className="flex items-center gap-3.5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="footer-social-icon flex h-12 w-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF]"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── CENTER — Navigation Columns ── */}
            <div className="footer-col grid grid-cols-4 gap-x-6 gap-y-0">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="mb-6 text-[16px] font-bold tracking-[-0.01em] text-[#0B0B0B]">
                    {category}
                  </h3>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="footer-link group inline-flex items-center gap-1 text-[16px] font-medium text-[#6B7280]"
                        >
                          <span>{link.label}</span>
                          <span className="footer-link-arrow">
                            →
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ── RIGHT — Newsletter Card ── */}
            <div className="footer-col">
              <div className="footer-newsletter">
                <h3 className="mb-2 text-[16px] font-bold text-[#0B0B0B]">Stay updated</h3>
                <p className="mb-5 text-[13.5px] leading-relaxed text-[#9CA3AF]">
                  Get product updates and AI news once a month.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="footer-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="footer-subscribe-btn" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                <p className="mt-3.5 text-center text-[12px] text-[#9CA3AF]">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          {/* ── Mobile / Tablet Layout ── */}
          <div className="lg:hidden">
            {/* Company Block */}
            <div className="footer-col mb-14">
              <a href="/" className="mb-6 block" aria-label="Nagriva – Home">
                <img
                  src="/assets/logos/logo+text.jpeg"
                  alt="Nagriva"
                  width={170}
                  height={57}
                  decoding="async"
                  draggable={false}
                  className="footer-logo h-auto w-[170px] object-contain"
                />
              </a>

              <p className="mb-3 max-w-[320px] text-[16px] font-semibold leading-[1.5] text-[#0B0B0B]">
                The AI workforce platform for modern businesses.
              </p>

              <p className="mb-6 max-w-[320px] text-[14px] leading-[1.65] text-[#6B7280]">
                Build, deploy, and manage AI employees that work 24/7 to automate customer support, bookings, sales, and operations.
              </p>

              <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="flex gap-0.5 text-[#F59E0B] text-[14px]">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <span className="text-[13px] font-bold text-[#0B0B0B]">4.9/5</span>
                <span className="h-3.5 w-px bg-[#E5E7EB]" />
                <span className="text-[13px] text-[#9CA3AF]">Trusted by 2,000+ businesses</span>
              </div>

              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="footer-social-icon flex h-12 w-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF]"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav Columns — 2x2 grid on tablet, stacked on mobile */}
            <div className="footer-col grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 mb-14">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="mb-5 text-[16px] font-bold text-[#0B0B0B]">
                    {category}
                  </h3>
                  <ul className="space-y-3.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="footer-link group inline-flex items-center gap-1 text-[15px] font-medium text-[#6B7280]"
                        >
                          <span>{link.label}</span>
                          <span className="footer-link-arrow">→</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter — mobile */}
            <div className="footer-col">
              <div className="footer-newsletter">
                <h3 className="mb-2 text-[16px] font-bold text-[#0B0B0B]">Stay updated</h3>
                <p className="mb-5 text-[13.5px] leading-relaxed text-[#9CA3AF]">
                  Get product updates and AI news once a month.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="footer-email-input sm:flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="footer-subscribe-btn sm:w-auto" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                <p className="mt-3 text-center sm:text-left text-[12px] text-[#9CA3AF]">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-[#EAEAEA] py-7">
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">

            {/* Left — Copyright */}
            <p className="text-[13px] text-[#9CA3AF] md:flex-shrink-0">
              © 2026 Nagriva Inc.
            </p>

            {/* Center — Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['SOC 2', 'GDPR', '256-bit Encryption', '99.99% Uptime'].map((badge) => (
                <span key={badge} className="footer-badge">
                  <span className="footer-badge-dot" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Right — Bottom Links */}
            <div className="flex items-center gap-5 md:flex-shrink-0">
              {[
                { label: 'Privacy', href: '#/privacy' },
      { label: 'Terms', href: '#/terms' },
      { label: 'Cookies', href: '#/cookies' },
              ].map((link) => (
                <a key={link.label} href={link.href} className="footer-bottom-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
