import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  BookOpen,
  Plug,
  BarChart3,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Loader2,
} from 'lucide-react';
import type { ClientSection } from './clientData';
import ClientDashboardHome from './ClientDashboardHome';
import ClientAIEmployees from './ClientAIEmployees';
import ClientAIEmployeesNew from './ClientAIEmployeesNew';
import ClientAIEmployeeManage from './ClientAIEmployeeManage';
import ClientConversations from './ClientConversations';
import { KnowledgeTab } from './employee-knowledge';
import ClientIntegrations from './ClientIntegrations';
import ClientUsage from './ClientUsage';
import ClientBilling from './ClientBilling';
import ClientSettings from './ClientSettings';
import ClientHelpCenter from './ClientHelpCenter';
import PanelSwitcher from '../dashboard/PanelSwitcher';
import Logo from '../components/Logo';
import { useAuth } from '../lib/AuthContext';
import { useProfile } from '../hooks/useProfile';
import Toast from '../components/Toast';
import GlobalSearch from './GlobalSearch';
import NotificationBell from '../components/NotificationBell';

/* ── Nav Config ── */

const SIDEBAR_NAV: { key: ClientSection; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'ai-employees', label: 'My AI Employees', icon: Bot },
  { key: 'conversations', label: 'Conversations', icon: MessageSquare },
  { key: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
  { key: 'integrations', label: 'Integrations', icon: Plug },
  { key: 'usage', label: 'Usage', icon: BarChart3 },
  { key: 'billing', label: 'Billing', icon: CreditCard },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'help-center', label: 'Help Center', icon: HelpCircle },
];

/* ── Main Component ── */

interface ClientLayoutProps {
  initialSection?: ClientSection;
}

const VALID_CLIENT_SECTIONS: ClientSection[] = [
  'dashboard', 'ai-employees', 'ai-employees/new', 'ai-employees/manage', 'conversations', 'knowledge-base',
  'integrations', 'usage', 'billing', 'settings', 'help-center',
];

export default function ClientLayout({ initialSection }: ClientLayoutProps) {
  const { role, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ClientSection>(
    initialSection && VALID_CLIENT_SECTIONS.includes(initialSection) ? initialSection : 'dashboard',
  );
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!initialSection) {
      setActiveSection('dashboard');
      setEmployeeId(null);
      return;
    }

    if (VALID_CLIENT_SECTIONS.includes(initialSection)) {
      setActiveSection(initialSection);
      setEmployeeId(null);
      return;
    }

    if (initialSection.startsWith('ai-employees/') && initialSection !== 'ai-employees/new') {
      const id = initialSection.slice('ai-employees/'.length);
      if (id) {
        setActiveSection('ai-employees/manage');
        setEmployeeId(id);
      }
    }
  }, [initialSection]);

  function handleNavigate(section: ClientSection) {
    setActiveSection(section);
    setSidebarOpen(false);
  }

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

  const displayName = profile?.full_name?.split(' ')[0] || 'User';

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="dash-spinner" />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  function renderContent() {
    switch (activeSection) {
      case 'dashboard':
        return <ClientDashboardHome displayName={displayName} />;
      case 'ai-employees':
        return <ClientAIEmployees />;
      case 'ai-employees/new':
        return <ClientAIEmployeesNew />;
      case 'ai-employees/manage':
        return <ClientAIEmployeeManage employeeId={employeeId} />;
      case 'conversations':
        return <ClientConversations />;
      case 'knowledge-base':
        return <KnowledgeTab employeeId={null} />;
      case 'integrations':
        return <ClientIntegrations />;
      case 'usage':
        return <ClientUsage />;
      case 'billing':
        return <ClientBilling />;
      case 'settings':
        return <ClientSettings />;
      case 'help-center':
        return <ClientHelpCenter />;
      default:
        return <ClientDashboardHome displayName={displayName} />;
    }
  }

  return (
    <div className="dash-root">
      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'dash-sidebar-open' : ''}`}>
        <div className="dash-sidebar-inner">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-1">
            <Logo />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-deep-black hover:border-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Panel Badge / Switcher */}
          {role === 'admin' ? (
            <div className="mb-4">
              <PanelSwitcher />
            </div>
          ) : (
            <div className="mb-5 px-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-royal-blue/[0.06] border border-royal-blue/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-royal-blue tracking-wide">CLIENT PANEL</span>
              </div>
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
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="dash-nav-item w-full text-gray-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
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
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
            <GlobalSearch onNavigate={handleNavigate} />
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-gray-100">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center text-white text-xs font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold text-deep-black leading-tight">{profile?.full_name || 'User'}</span>
                <span className="text-xs text-gray-500 leading-tight">{profile?.email || ''}</span>
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
