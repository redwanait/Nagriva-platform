import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import PanelSwitcher from './PanelSwitcher';
import Logo from '../components/Logo';
import { useAuth } from '../lib/AuthContext';

interface UserProfile {
  full_name: string;
  email: string;
  avatar_url: string;
}

export default function ClientDashboard() {
  const { role } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
    await supabase.auth.signOut();
    window.location.replace('/#/login');
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

  return (
    <div className="dash-root">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`dash-sidebar ${sidebarOpen ? 'dash-sidebar-open' : ''}`}>
        <div className="dash-sidebar-inner">
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

          <nav className="flex flex-col gap-1 flex-1">
            <button className="dash-nav-item dash-nav-active">
              <LayoutDashboard className="w-[18px] h-[18px]" />
              <span>Dashboard</span>
            </button>
          </nav>

          <div className="pt-4 mt-auto border-t border-gray-100">
            <button onClick={handleLogout} className="dash-nav-item w-full text-gray-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-[18px] h-[18px]" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors">
              <Menu className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
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

        <main className="dash-content">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Client Dashboard</h1>
            <p className="text-sm text-gray-500 max-w-sm">
              Welcome back, {displayName}. Your client dashboard is coming soon.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
