import { useState, useEffect, useRef, useCallback } from 'react';
import { LogOut, LayoutDashboard, Settings, CreditCard, Headphones, User } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useProfile } from '../hooks/useProfile';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  const { userId, role, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  const isAuthenticated = !!userId;

  const avatarUrl = profile?.avatar_url;
  const displayName = profile?.full_name || profile?.email || '';
  const initials = displayName ? displayName.charAt(0).toUpperCase() : '';
  const dashboardHref = role === 'admin' ? '#/dashboard' : '#/client-dashboard';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(e.target as Node)) {
        setAvatarDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = useCallback(async () => {
    setLoggingOut(true);
    setAvatarDropdownOpen(false);
    setMobileOpen(false);
    await signOut();
  }, [signOut]);

  const menuItems = [
    { label: 'My Dashboard', href: dashboardHref, icon: LayoutDashboard },
    { label: 'Profile Settings', href: '#/client-dashboard/settings', icon: Settings },
    { label: 'Billing', href: '#/client-dashboard/billing', icon: CreditCard },
    { label: 'Help Center', href: '#/client-dashboard/help-center', icon: Headphones },
  ];

  const links = [
    { label: 'About', href: '#/about' },
    { label: 'Features', href: '#/features' },
    { label: 'Solutions', href: '#/solutions' },
    { label: 'Pricing', href: '#/pricing' },
    { label: 'Documentation', href: '#/docs' },
    { label: 'Contact', href: '#/contact' },
  ];

  function renderAvatar(size: 'sm' | 'md' = 'sm') {
    const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
    const textClasses = size === 'sm' ? 'text-xs' : 'text-sm';
    const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

    if (profileLoading) {
      return <div className={`${sizeClasses} rounded-full bg-gray-200 animate-pulse`} />;
    }
    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt={displayName}
          className={`${sizeClasses} rounded-full object-cover border border-gray-200`}
          referrerPolicy="no-referrer"
        />
      );
    }
    if (initials) {
      return (
        <div
          className={`${sizeClasses} rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center text-white ${textClasses} font-bold`}
        >
          {initials}
        </div>
      );
    }
    return (
      <div className={`${sizeClasses} rounded-full bg-gray-200 flex items-center justify-center text-gray-500`}>
        <User className={iconSize} />
      </div>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <a href="/" className="mr-5 flex shrink-0 items-center" aria-label="Nagriva – Home">
            <picture className="navbar-logo">
              <source media="(min-width: 768px)" srcSet="/assets/logos/logo+text.jpeg" />
              <img
                src="/assets/logos/icon.png"
                alt="Nagriva"
                decoding="async"
                draggable={false}
              />
            </picture>
          </a>

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-deep-black"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {isAuthenticated ? (
              <>
                <NotificationBell />

                <div ref={avatarDropdownRef} className="relative">
                  <button
                    onClick={() => setAvatarDropdownOpen((p) => !p)}
                    className="flex items-center rounded-lg p-1 transition-colors hover:bg-gray-100"
                  >
                    {renderAvatar('sm')}
                  </button>

                  {avatarDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                      {profile && (
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-deep-black truncate">{displayName}</p>
                          <p className="text-xs text-gray-500 truncate">{profile.email}</p>
                        </div>
                      )}

                      {menuItems.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setAvatarDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-gray-400" />
                          {item.label}
                        </a>
                      ))}

                      <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        {loggingOut ? 'Logging out...' : 'Logout'}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a href="#/login" className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-deep-black">
                  Sign In
                </a>
                <a href="#/onboarding" className="btn-primary text-sm">
                  Get Started
                </a>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-600 rounded-lg transition-colors hover:bg-gray-50 hover:text-deep-black"
              >
                {link.label}
              </a>
            ))}

            {isAuthenticated ? (
              <div className="pt-4 space-y-1 border-t border-gray-100">
                {profile && (
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {renderAvatar('md')}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-deep-black truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 truncate">{profile.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative px-4 py-2">
                  <NotificationBell />
                </div>

                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-lg transition-colors hover:bg-gray-50 hover:text-deep-black"
                  >
                    <item.icon className="w-4 h-4 text-gray-400" />
                    {item.label}
                  </a>
                ))}

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg transition-colors hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-2">
                <a href="#/login" className="block px-4 py-3 text-sm font-medium text-gray-600 rounded-lg transition-colors hover:bg-gray-50 hover:text-deep-black">
                  Sign In
                </a>
                <a href="#/onboarding" className="btn-primary w-full text-sm">
                  Get Started
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
