import { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Package,
  DollarSign,
  UserCheck,
  ClipboardList,
  Calendar,
  Activity,
  Bot,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Logo from './Logo';

/* ── Types ── */

interface UserProfile {
  full_name: string;
  email: string;
  avatar_url: string;
}

interface StatCard {
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: typeof DollarSign;
}

interface Order {
  id: string;
  client: string;
  service: string;
  status: 'completed' | 'in-progress' | 'pending';
  amount: string;
  date: string;
}

interface Client {
  name: string;
  email: string;
  initials: string;
  status: 'active' | 'inactive';
  orders: number;
}

interface Activity {
  id: string;
  text: string;
  time: string;
  type: 'order' | 'client' | 'system' | 'payment';
}

/* ── Placeholder Data ── */

const STATS: StatCard[] = [
  { label: 'Total Orders', value: '1,284', change: '+12.5%', changeType: 'up', icon: ShoppingCart },
  { label: 'Active Clients', value: '342', change: '+8.2%', changeType: 'up', icon: Users },
  { label: 'Revenue', value: '$48,592', change: '+23.1%', changeType: 'up', icon: DollarSign },
  { label: 'Pending Tasks', value: '27', change: '-4.3%', changeType: 'down', icon: ClipboardList },
];

const RECENT_ORDERS: Order[] = [
  { id: '#ORD-7841', client: 'Sarah Mitchell', service: 'AI Chatbot Setup', status: 'completed', amount: '$2,400', date: '2 min ago' },
  { id: '#ORD-7840', client: 'James Cooper', service: 'WhatsApp Integration', status: 'in-progress', amount: '$1,800', date: '15 min ago' },
  { id: '#ORD-7839', client: 'Emily Davis', service: 'Knowledge Base Config', status: 'pending', amount: '$950', date: '1 hour ago' },
  { id: '#ORD-7838', client: 'Michael Brown', service: 'Full AI Agent Deploy', status: 'completed', amount: '$4,200', date: '3 hours ago' },
  { id: '#ORD-7837', client: 'Lisa Anderson', service: 'Analytics Dashboard', status: 'completed', amount: '$1,600', date: '5 hours ago' },
];

const RECENT_CLIENTS: Client[] = [
  { name: 'Sarah Mitchell', email: 'sarah@example.com', initials: 'SM', status: 'active', orders: 12 },
  { name: 'James Cooper', email: 'james@example.com', initials: 'JC', status: 'active', orders: 8 },
  { name: 'Emily Davis', email: 'emily@example.com', initials: 'ED', status: 'inactive', orders: 3 },
  { name: 'Michael Brown', email: 'michael@example.com', initials: 'MB', status: 'active', orders: 15 },
];

const ACTIVITY_TIMELINE: Activity[] = [
  { id: '1', text: 'New order placed by Sarah Mitchell', time: '2 min ago', type: 'order' },
  { id: '2', text: 'James Cooper started WhatsApp integration', time: '15 min ago', type: 'client' },
  { id: '3', text: 'Payment of $2,400 received', time: '30 min ago', type: 'payment' },
  { id: '4', text: 'AI Agent deployed for Michael Brown', time: '1 hour ago', type: 'system' },
  { id: '5', text: 'Emily Davis submitted knowledge base files', time: '2 hours ago', type: 'client' },
  { id: '6', text: 'Monthly report generated', time: '3 hours ago', type: 'system' },
];

const SIDEBAR_NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Clients', icon: Users, active: false },
  { label: 'Orders', icon: ShoppingCart, active: false },
  { label: 'Services', icon: Package, active: false },
  { label: 'Blog', icon: FileText, active: false },
  { label: 'Analytics', icon: BarChart3, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

/* ── Helpers ── */

function getStatusClasses(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'in-progress':
      return 'bg-blue-50 text-royal-blue border border-blue-100';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'active':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'inactive':
      return 'bg-gray-50 text-gray-500 border border-gray-200';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

function getActivityMeta(type: string) {
  switch (type) {
    case 'order':
      return { icon: ShoppingCart, bg: 'bg-blue-50', fg: 'text-royal-blue' };
    case 'client':
      return { icon: UserCheck, bg: 'bg-emerald-50', fg: 'text-emerald-600' };
    case 'payment':
      return { icon: DollarSign, bg: 'bg-violet-50', fg: 'text-violet-600' };
    case 'system':
      return { icon: Activity, bg: 'bg-amber-50', fg: 'text-amber-600' };
    default:
      return { icon: Bell, bg: 'bg-gray-50', fg: 'text-gray-500' };
  }
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getCurrentDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ── Main Component ── */

export default function Dashboard() {
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

          {/* Navigation */}
          <nav className="flex flex-col gap-1 flex-1">
            {SIDEBAR_NAV.map((item) => (
              <a
                key={item.label}
                href="#/dashboard"
                className={`dash-nav-item ${item.active ? 'dash-nav-active' : ''}`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Logout */}
          <div className="pt-4 mt-auto border-t border-gray-100">
            <button onClick={handleLogout} className="dash-nav-item w-full text-gray-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-[18px] h-[18px]" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

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
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
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
          {/* Welcome Section */}
          <section className="flex items-center justify-between gap-6 py-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
                Welcome back, {displayName} <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">&#x1F44B;</span>
              </h1>
              <p className="text-[15px] text-gray-500">
                {getGreeting()}! Here&apos;s what&apos;s happening with your business today.
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{getCurrentDate()}</span>
              </div>
            </div>
            {user?.avatar_url && (
              <img src={user.avatar_url} alt={user.full_name} className="hidden md:block w-14 h-14 rounded-2xl object-cover border border-gray-200 shadow-sm" referrerPolicy="no-referrer" />
            )}
          </section>

          {/* Statistics Cards — matches DashboardPreview.tsx stat pattern */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="dash-stat-card group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
                    <stat.icon className="w-[18px] h-[18px] text-royal-blue" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.changeType === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {stat.changeType === 'up' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </section>

          {/* Two-Column: Orders + Clients */}
          <section className="grid lg:grid-cols-5 gap-5">
            {/* Recent Orders — 3 cols */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-deep-black">Recent Orders</h2>
                <a href="#/orders" className="group/link inline-flex items-center gap-1 text-sm font-medium text-royal-blue hover:text-royal-blue-dark transition-colors duration-200">
                  View All
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </a>
              </div>
              <div className="divide-y divide-gray-100">
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-3.5 transition-colors duration-200 hover:bg-gray-50/50">
                    <div className="min-w-0 mr-4">
                      <div className="flex items-center gap-2.5 mb-0.5">
                        <span className="text-xs font-semibold text-royal-blue">{order.id}</span>
                        <span className="text-xs text-gray-400">&middot;</span>
                        <span className="text-xs text-gray-400">{order.date}</span>
                      </div>
                      <div className="text-sm font-medium text-deep-black truncate">{order.client}</div>
                      <div className="text-xs text-gray-500 truncate">{order.service}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="text-sm font-semibold text-deep-black">{order.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Clients — 2 cols */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-deep-black">Recent Clients</h2>
                <a href="#/clients" className="group/link inline-flex items-center gap-1 text-sm font-medium text-royal-blue hover:text-royal-blue-dark transition-colors duration-200">
                  View All
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </a>
              </div>
              <div className="divide-y divide-gray-100">
                {RECENT_CLIENTS.map((client) => (
                  <div key={client.email} className="flex items-center gap-3 px-6 py-3.5 transition-colors duration-200 hover:bg-gray-50/50">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex-shrink-0">
                      {client.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-deep-black truncate">{client.name}</div>
                      <div className="text-xs text-gray-500 truncate">{client.email}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(client.status)}`}>
                        {client.status}
                      </span>
                      <span className="text-xs text-gray-400">{client.orders} orders</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Two-Column: Timeline + Quick Actions */}
          <section className="grid lg:grid-cols-5 gap-5">
            {/* Activity Timeline — 3 cols */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-deep-black">Activity Timeline</h2>
              </div>
              <div className="px-6 py-3">
                {ACTIVITY_TIMELINE.map((item, i) => {
                  const meta = getActivityMeta(item.type);
                  const Icon = meta.icon;
                  return (
                    <div key={item.id} className="flex gap-3 relative">
                      <div className="flex flex-col items-center pt-0.5">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${meta.bg} ${meta.fg} flex-shrink-0`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        {i < ACTIVITY_TIMELINE.length - 1 && (
                          <div className="w-px flex-1 bg-gray-100 my-1" />
                        )}
                      </div>
                      <div className={`pb-4 ${i === ACTIVITY_TIMELINE.length - 1 ? 'pb-0' : ''}`}>
                        <p className="text-sm text-deep-black leading-snug">{item.text}</p>
                        <span className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions — 2 cols */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-deep-black">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5">
                <button className="dash-action-btn group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                    <Users className="w-[18px] h-[18px]" />
                  </div>
                  <span className="text-[13px] font-medium text-deep-black">New Client</span>
                </button>
                <button className="dash-action-btn group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                    <ShoppingCart className="w-[18px] h-[18px]" />
                  </div>
                  <span className="text-[13px] font-medium text-deep-black">New Order</span>
                </button>
                <button className="dash-action-btn group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                    <FileText className="w-[18px] h-[18px]" />
                  </div>
                  <span className="text-[13px] font-medium text-deep-black">Create Blog</span>
                </button>
                <button className="dash-action-btn group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                    <Bot className="w-[18px] h-[18px]" />
                  </div>
                  <span className="text-[13px] font-medium text-deep-black">AI Assistant</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
