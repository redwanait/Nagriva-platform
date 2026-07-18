import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Bot,
  Globe,
  MessageSquare,
  Upload,
  Plug,
  Headphones,
  BarChart3,
  ArrowUpRight,
  Plus,
  ExternalLink,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import type { StatCard, AIEmployee, Conversation, UsageData } from './clientData';
import {
  StatCardSkeleton,
  AIEmployeeCardSkeleton,
  ConversationRowSkeleton,
  QuickActionSkeleton,
  UsageCardSkeleton,
} from './SkeletonLoaders';
import { supabase } from '../lib/supabase';
import { useStorageUsage } from '../hooks/useStorageUsage';

/* ── Helpers ── */

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

function getConversationStatusClasses(status: string) {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'resolved':
      return 'bg-blue-50 text-royal-blue border border-blue-100';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatRenewalDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/* ── Dashboard State ── */

interface DashboardState {
  firstName: string;
  stats: StatCard[];
  employees: AIEmployee[];
  conversations: Conversation[];
  usage: UsageData;
}

/* ── Component ── */

export default function ClientDashboardHome({ displayName }: { displayName: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<DashboardState | null>(null);
  const storage = useStorageUsage();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('Not authenticated');
      }

      const uid = user.id;

      const [
        profileResult,
        activeEmpCountResult,
        convCountResult,
        usageResult,
        subscriptionResult,
        conversationsResult,
        employeesResult,
      ] = await Promise.all([
        supabase
          .from('profiles')
          .select('full_name')
          .eq('id', uid)
          .maybeSingle(),
        supabase
          .from('ai_employees')
          .select('id', { count: 'exact', head: true })
          .eq('owner_id', uid)
          .eq('status', 'active'),
        supabase
          .from('conversations')
          .select('id', { count: 'exact', head: true })
          .eq('owner_id', uid),
        supabase
          .from('usage_stats')
          .select('messages_used, messages_limit, storage_used, storage_limit, api_requests, api_limit')
          .eq('owner_id', uid)
          .maybeSingle(),
        supabase
          .from('subscriptions')
          .select('plan, renewal_date')
          .eq('owner_id', uid)
          .maybeSingle(),
        supabase
          .from('conversations')
          .select('*')
          .eq('owner_id', uid)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('ai_employees')
          .select('*')
          .eq('owner_id', uid)
          .order('created_at', { ascending: false })
          .limit(6),
      ]);

      const firstName = (profileResult.data?.full_name || displayName || 'User').split(' ')[0];

      const activeEmpCount = activeEmpCountResult.count ?? 0;
      const convCount = convCountResult.count ?? 0;

      const msgsUsed = usageResult.data?.messages_used ?? 0;
      const msgsLimit = usageResult.data?.messages_limit ?? 1;
      const storUsed = usageResult.data?.storage_used ?? 0;
      const storLimit = usageResult.data?.storage_limit ?? 1;
      const apiReqs = usageResult.data?.api_requests ?? 0;
      const apiLimit = usageResult.data?.api_limit ?? 1;

      const plan = subscriptionResult.data?.plan ?? 'Free';
      const renewalDate = subscriptionResult.data?.renewal_date ?? null;

      const stats: StatCard[] = [
        { label: 'Active AI Employees', value: String(activeEmpCount) },
        { label: 'Conversations', value: String(convCount) },
        { label: 'Messages Used', value: msgsUsed.toLocaleString() },
        { label: 'Current Plan', value: plan },
      ];

      const rawConversations = conversationsResult.data ?? [];
      const mappedConversations: Conversation[] = rawConversations.map((c: Record<string, unknown>) => {
        const customerName = (c.customer_name as string) || (c.title as string) || 'Unknown';
        return {
          id: c.id as string,
          customer: customerName,
          customerInitials: getInitials(customerName),
          aiEmployee: (c.ai_employee_name as string) || '',
          date: formatRelativeDate(c.created_at as string),
          status: (c.status as 'active' | 'resolved' | 'pending') || 'pending',
          messagePreview: (c.message_preview as string) || '',
        };
      });

      const rawEmployees = employeesResult.data ?? [];
      const mappedEmployees: AIEmployee[] = rawEmployees.map((e: Record<string, unknown>) => ({
        id: e.id as string,
        name: (e.name as string) || 'Unnamed',
        status: (e.status as string) === 'active' ? 'online' as const : 'offline' as const,
        website: (e.website as string) || '',
        whatsappStatus: (e.whatsapp_status as string) === 'connected' ? 'connected' as const : 'disconnected' as const,
        lastActivity: e.last_activity ? formatRelativeDate(e.last_activity as string) : '',
        avatarColor: (e.avatar_color as string) || '#6366F1',
      }));

      const usage: UsageData = {
        messagesUsed: msgsUsed,
        messagesLimit: msgsLimit,
        storageUsed: storUsed,
        storageLimit: storLimit,
        currentPlan: plan,
        renewalDate: formatRenewalDate(renewalDate),
        apiRequests: apiReqs,
        apiLimit: apiLimit,
      };

      setState({
        firstName,
        stats,
        employees: mappedEmployees,
        conversations: mappedConversations,
        usage,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [displayName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const channel = supabase
      .channel('client-dashboard-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ai_employees' },
        () => { fetchData(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'conversations' },
        () => { fetchData(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'usage_stats' },
        () => { fetchData(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'subscriptions' },
        () => { fetchData(); },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  function handleRetry() {
    fetchData();
  }

  /* ── Loading State ── */
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
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => <AIEmployeeCardSkeleton key={i} />)}
        </section>
        <section className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="h-4 w-36 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 4 }).map((_, i) => <ConversationRowSkeleton key={i} />)}
            </div>
          </div>
          <div className="lg:col-span-2">
            <QuickActionSkeleton />
          </div>
        </section>
        <section className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3">
            <UsageCardSkeleton />
          </div>
        </section>
      </>
    );
  }

  /* ── Error State ── */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <p className="text-sm font-medium text-deep-black mb-1">Something went wrong</p>
        <p className="text-sm text-gray-500 mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-royal-blue rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const { firstName, stats, employees, conversations, usage } = state!;
  const messagesPercent = usage.messagesLimit > 0 ? Math.round((usage.messagesUsed / usage.messagesLimit) * 100) : 0;
  const apiPercent = usage.apiLimit > 0 ? Math.round((usage.apiRequests / usage.apiLimit) * 100) : 0;

  return (
    <>
      {/* ── Welcome Section ── */}
      <section className="flex items-center justify-between gap-6 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
            Welcome back, {firstName} <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">&#x1F44B;</span>
          </h1>
          <p className="text-[15px] text-gray-500">
            {getGreeting()}! Manage your AI employees and monitor your business.
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{getCurrentDate()}</span>
          </div>
        </div>
      </section>

      {/* ── Statistics Cards ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="dash-stat-card group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
                <BarChart3 className="w-[18px] h-[18px] text-royal-blue" />
              </div>
              {stat.change && (
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.changeType === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ── My AI Employees ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-deep-black">My AI Employees</h2>
          <button className="inline-flex items-center gap-1.5 text-sm font-medium text-royal-blue hover:text-royal-blue-dark transition-colors">
            View All
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
        {employees.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] mx-auto mb-5">
              <Bot className="w-8 h-8 text-royal-blue" />
            </div>
            <h3 className="text-lg font-bold text-deep-black mb-2">You don&apos;t have any AI Employees yet.</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Create your first AI Employee to start automating customer conversations and generating leads.
            </p>
            <button
              onClick={() => { window.location.hash = '#/client-dashboard/ai-employees/new'; }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
            >
              <Plus className="w-4 h-4" />
              Create your first AI Employee
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-sm group"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: emp.avatarColor }}
                  >
                    {emp.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-deep-black truncate">{emp.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {emp.status === 'online' ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-medium text-emerald-600">Online</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                          <span className="text-xs font-medium text-gray-400">Offline</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Website</span>
                    </div>
                    <span className="text-xs font-medium text-deep-black">{emp.website || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {emp.whatsappStatus === 'connected' ? (
                        <Wifi className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <WifiOff className="w-3 h-3 text-gray-400" />
                      )}
                      <span className={`text-xs font-medium ${emp.whatsappStatus === 'connected' ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {emp.whatsappStatus === 'connected' ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                  {emp.lastActivity && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Last Activity</span>
                      <span className="text-xs text-gray-500">{emp.lastActivity}</span>
                    </div>
                  )}
                </div>

                {/* Action */}
                <button className="w-full py-2.5 text-sm font-semibold text-royal-blue bg-royal-blue/[0.06] border border-royal-blue/10 rounded-xl transition-all duration-200 hover:bg-royal-blue hover:text-white hover:border-royal-blue group-hover:shadow-sm">
                  Manage
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Recent Conversations + Quick Actions ── */}
      <section className="grid lg:grid-cols-5 gap-5">
        {/* Conversations — 3 cols */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-deep-black">Recent Conversations</h2>
            <button className="inline-flex items-center gap-1 text-sm font-medium text-royal-blue hover:text-royal-blue-dark transition-colors">
              View All
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 mb-3">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No conversations yet</p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:flex items-center px-6 py-2.5 border-b border-gray-50 bg-gray-50/50">
                <span className="flex-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Customer</span>
                <span className="flex-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">AI Employee</span>
                <span className="w-24 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Date</span>
                <span className="w-24 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Status</span>
              </div>
              <div className="divide-y divide-gray-100">
                {conversations.map((conv) => (
                  <div key={conv.id} className="flex items-center gap-4 px-6 py-3.5 transition-colors duration-200 hover:bg-gray-50/50 cursor-pointer">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex-shrink-0">
                        {conv.customerInitials}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-deep-black truncate">{conv.customer}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{conv.messagePreview}</div>
                      </div>
                    </div>
                    <span className="hidden md:block flex-1 text-xs text-gray-500 truncate">{conv.aiEmployee}</span>
                    <span className="hidden md:block w-24 text-xs text-gray-400 text-right flex-shrink-0">{conv.date}</span>
                    <div className="w-24 flex justify-end flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getConversationStatusClasses(conv.status)}`}>
                        {conv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quick Actions — 2 cols */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-deep-black">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5">
            <button className="dash-action-btn group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                <Upload className="w-[18px] h-[18px]" />
              </div>
              <span className="text-[13px] font-medium text-deep-black">Upload Knowledge Base</span>
            </button>
            <button className="dash-action-btn group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                <Globe className="w-[18px] h-[18px]" />
              </div>
              <span className="text-[13px] font-medium text-deep-black">Connect Website</span>
            </button>
            <button className="dash-action-btn group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                <Plug className="w-[18px] h-[18px]" />
              </div>
              <span className="text-[13px] font-medium text-deep-black">Connect WhatsApp</span>
            </button>
            <button className="dash-action-btn group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                <Headphones className="w-[18px] h-[18px]" />
              </div>
              <span className="text-[13px] font-medium text-deep-black">Contact Support</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Usage Overview ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-deep-black">Usage Overview</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Messages Used */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">Messages Used</span>
              <MessageSquare className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-deep-black mb-1">
              {usage.messagesUsed.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mb-3">
              of {usage.messagesLimit.toLocaleString()} monthly
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-royal-blue rounded-full transition-all duration-500"
                style={{ width: `${messagesPercent}%` }}
              />
            </div>
          </div>

          {/* Storage Used */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">Storage Used</span>
              <BarChart3 className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-deep-black mb-1">
              {storage.formattedStorage}
            </div>
            <div className="text-xs text-gray-400 mb-3">
              of 1 GB
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${storage.storagePercent}%` }}
              />
            </div>
          </div>

          {/* Current Plan */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">Current Plan</span>
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-deep-black mb-1">
              {usage.currentPlan}
            </div>
            <div className="text-xs text-gray-400 mb-3">
              {usage.renewalDate ? `Renews on ${usage.renewalDate}` : 'Subscription plans coming soon'}
            </div>
            <button
              onClick={() => { window.location.hash = '#/client-dashboard/billing'; }}
              className="w-full py-2 text-xs font-semibold text-royal-blue bg-royal-blue/[0.06] border border-royal-blue/10 rounded-lg hover:bg-royal-blue hover:text-white transition-all duration-200"
            >
              View Billing
            </button>
          </div>

          {/* API Requests */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">API Requests</span>
              <Plug className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-deep-black mb-1">
              {usage.apiRequests.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mb-3">
              of {usage.apiLimit.toLocaleString()} monthly
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${apiPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
