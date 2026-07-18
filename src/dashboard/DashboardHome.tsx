import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ShoppingCart,
  Users,
  DollarSign,
  ClipboardList,
  Calendar,
  Bot,
  FileText,
  Plus,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ── Types ── */

interface StatCard {
  label: string;
  value: string;
  icon: typeof DollarSign;
  changeType?: 'up' | 'down';
  change?: string;
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
  status: 'active';
  orders: number;
}

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
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
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

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/* ── Skeleton Components ── */

function StatCardSkeleton() {
  return (
    <div className="dash-stat-card">
      <div className="flex items-center justify-between mb-3">
        <div className="h-10 w-10 rounded-lg bg-gray-100 animate-pulse" />
        <div className="h-4 w-12 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="h-7 w-20 rounded bg-gray-100 animate-pulse mb-1" />
      <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
    </div>
  );
}

function OrderRowSkeleton() {
  return (
    <div className="flex items-center justify-between px-6 py-3.5">
      <div className="min-w-0 mr-4 flex-1">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-12 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="h-4 w-32 rounded bg-gray-100 animate-pulse mb-1" />
        <div className="h-3 w-40 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <div className="h-5 w-16 rounded-full bg-gray-100 animate-pulse" />
        <div className="h-4 w-14 rounded bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}

function ClientRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-6 py-3.5">
      <div className="h-9 w-9 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-4 w-28 rounded bg-gray-100 animate-pulse mb-1" />
        <div className="h-3 w-36 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <div className="h-5 w-14 rounded-full bg-gray-100 animate-pulse" />
        <div className="h-3 w-12 rounded bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}

/* ── Component ── */

export default function DashboardHome({ displayName }: { displayName: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [totalClients, setTotalClients] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentClients, setRecentClients] = useState<Client[]>([]);

  const isEmpty = totalClients === 0 && totalOrders === 0;

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) {
        setError('Not authenticated');
        return;
      }

      const [clientsCount, ordersCount, revenueRes, pendingCount, recentOrdersRes, recentClientsRes] = await Promise.all([
        supabase.from('clients').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('orders').select('total_price').eq('user_id', userId).eq('status', 'completed'),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'pending'),
        supabase
          .from('orders')
          .select('id, service, status, total_price, created_at, clients(name)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('clients')
          .select('id, name, email, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      setTotalClients(clientsCount.count ?? 0);
      setTotalOrders(ordersCount.count ?? 0);
      setPendingOrders(pendingCount.count ?? 0);

      const total = revenueRes.data?.reduce((sum, o) => sum + (Number(o.total_price) || 0), 0) ?? 0;
      setRevenue(total);

      setRecentOrders(
        (recentOrdersRes.data ?? []).map((o: any) => ({
          id: `#ORD-${String(o.id).slice(0, 4)}`,
          client: o.clients?.name ?? 'Unknown',
          service: o.service ?? '',
          status: o.status as Order['status'],
          amount: `$${Number(o.total_price || 0).toLocaleString()}`,
          date: o.created_at ? formatRelativeTime(o.created_at) : '',
        }))
      );

      setRecentClients(
        (recentClientsRes.data ?? []).map((c: any) => ({
          name: c.name ?? 'Unknown',
          email: c.email ?? '',
          initials: getInitials(c.name ?? 'U'),
          status: 'active' as const,
          orders: 0,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <section className="flex items-center justify-between gap-6 py-2">
          <div>
            <div className="h-8 w-64 rounded bg-gray-100 animate-pulse mb-2" />
            <div className="h-4 w-80 rounded bg-gray-100 animate-pulse mb-3" />
            <div className="h-3 w-40 rounded bg-gray-100 animate-pulse" />
          </div>
        </section>
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </section>
        <section className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="h-4 w-28 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 4 }).map((_, i) => <OrderRowSkeleton key={i} />)}
            </div>
          </div>
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="h-4 w-28 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 3 }).map((_, i) => <ClientRowSkeleton key={i} />)}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <p className="text-sm font-medium text-deep-black mb-1">Something went wrong</p>
        <p className="text-sm text-gray-500 mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-royal-blue rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const stats: StatCard[] = [
    { label: 'Total Clients', value: totalClients.toLocaleString(), icon: Users },
    { label: 'Total Orders', value: totalOrders.toLocaleString(), icon: ShoppingCart },
    { label: 'Revenue', value: `$${revenue.toLocaleString()}`, icon: DollarSign },
    { label: 'Pending Orders', value: pendingOrders.toLocaleString(), icon: ClipboardList },
  ];

  if (isEmpty) {
    return (
      <>
        <section className="flex items-center justify-between gap-6 py-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
              Welcome to Nagriva <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">&#x1F44B;</span>
            </h1>
            <p className="text-[15px] text-gray-500">
              {getGreeting()}, {displayName}! Let&apos;s build your first AI business.
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{getCurrentDate()}</span>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center py-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-10 max-w-lg w-full text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06] mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-royal-blue" />
            </div>
            <h2 className="text-xl font-bold text-deep-black mb-2">Welcome to Nagriva</h2>
            <p className="text-sm text-gray-500 mb-8">Let&apos;s build your first AI business.</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Create your first client</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Add your first service</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Create your first order</span>
              </div>
            </div>

            <button
              onClick={() => {
                window.location.hash = '#/dashboard';
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create First Client
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
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
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="dash-stat-card group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
                <stat.icon className="w-[18px] h-[18px] text-royal-blue" />
              </div>
              {stat.change && (
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.changeType === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {stat.changeType === 'up' ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change}
                </span>
              )}
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
            <span className="group/link inline-flex items-center gap-1 text-sm font-medium text-royal-blue cursor-pointer hover:text-royal-blue-dark transition-colors duration-200">
              View All
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
            </span>
          </div>
          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 mb-3">
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-3">No orders yet</p>
              <button
                onClick={() => { window.location.hash = '#/dashboard'; }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-royal-blue hover:text-royal-blue-dark transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Create Order
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
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
          )}
        </div>

        {/* Recent Clients — 2 cols */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-deep-black">Recent Clients</h2>
            <span className="group/link inline-flex items-center gap-1 text-sm font-medium text-royal-blue cursor-pointer hover:text-royal-blue-dark transition-colors duration-200">
              View All
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
            </span>
          </div>
          {recentClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 mb-3">
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-3">No clients yet</p>
              <button
                onClick={() => { window.location.hash = '#/dashboard'; }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-royal-blue hover:text-royal-blue-dark transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Create Client
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentClients.map((client) => (
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Two-Column: Quick Actions */}
      <section className="grid lg:grid-cols-5 gap-5">
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
    </>
  );
}
