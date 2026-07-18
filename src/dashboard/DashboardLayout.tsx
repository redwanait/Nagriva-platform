import { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Package,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import DashboardHome from './DashboardHome';
import Clients from './Clients';
import Orders from './Orders';
import Services from './Services';
import Blog from './Blog';
import Analytics from './Analytics';
import SettingsPage from './Settings';
import PanelSwitcher from './PanelSwitcher';
import Logo from '../components/Logo';
import Toast from '../components/Toast';
import NotificationBell from '../components/NotificationBell';

/* ── Types ── */

interface UserProfile {
  full_name: string;
  email: string;
  avatar_url: string;
}

type Section = 'dashboard' | 'clients' | 'orders' | 'services' | 'blog' | 'analytics' | 'settings';

const VALID_ADMIN_SECTIONS: Section[] = ['dashboard', 'clients', 'orders', 'services', 'blog', 'analytics', 'settings'];

/* ── Nav Config ── */

const SIDEBAR_NAV: { key: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'clients', label: 'Clients', icon: Users },
  { key: 'orders', label: 'Orders', icon: ShoppingCart },
  { key: 'services', label: 'Services', icon: Package },
  { key: 'blog', label: 'Blog', icon: FileText },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

/* ── Component ── */

interface DashboardLayoutProps {
  initialSection?: string;
}

export default function DashboardLayout({ initialSection }: DashboardLayoutProps) {
  const { role, signOut } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>(
    initialSection && VALID_ADMIN_SECTIONS.includes(initialSection as Section)
      ? (initialSection as Section)
      : 'dashboard',
  );
  const [loggingOut, setLoggingOut] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const u = session.user;
          setUser({
            full_name: u.user_metadata?.full_name || u.user_metadata?.name || 'User',
            email: u.email || '',
            avatar_url: u.user_metadata?.avatar_url || u.user_metadata?.picture || '',
          });
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    const result = await signOut();
    if (result.success) {
      setToast({ message: 'Logged out successfully.', type: 'success' });
      setTimeout(() => { window.location.replace('/'); }, 1500);
    } else {
      setLoggingOut(false);
      setToast({ message: result.error || 'Logout failed.', type: 'error' });
    }
  }

  function handleNavigate(section: Section) {
    setActiveSection(section);
    setSidebarOpen(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="dash-spinner" />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const displayName = user?.full_name?.split(' ')[0] || 'User';

  function renderContent() {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome displayName={displayName} />;
      case 'clients':
        return <Clients />;
      case 'orders':
        return <Orders />;
      case 'services':
        return <Services />;
      case 'blog':
        return <Blog />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome displayName={displayName} />;
    }
  }

  return (
    <div className="dash-root">
      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'dash-sidebar-open' : ''}`}>
        <div className="dash-sidebar-inner">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-1">
            <Logo />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-deep-black hover:border-gray-300 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {role === 'admin' && (
            <div className="mb-4">
              <PanelSwitcher />
            </div>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-1 flex-1">
            {SIDEBAR_NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className={`dash-nav-item ${activeSection === item.key ? 'dash-nav-active' : ''}`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="pt-4 mt-auto border-t border-gray-100">
            <button onClick={handleLogout} disabled={loggingOut} className="dash-nav-item w-full text-gray-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed">
              {loggingOut ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <LogOut className="w-[18px] h-[18px]" />}
              <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Toast ── */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── Main Area ── */}
      <div className="dash-main">
        {/* ── Top Navbar ── */}
        <header className="dash-topbar">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors">
              <Menu className="w-4 h-4" />
            </button>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-gray-100">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt={user.full_name} className="w-8 h-8 rounded-full object-cover border border-gray-200" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center text-white text-xs font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold text-deep-black leading-tight">{user?.full_name || 'User'}</span>
                <span className="text-xs text-gray-500 leading-tight">{user?.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <main className="dash-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
