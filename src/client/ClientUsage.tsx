import {
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Bot,
  HardDrive,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from 'lucide-react';
import { useUsageStats } from '../hooks/useUsageStats';
import { formatBytes } from '../hooks/useStorageUsage';
import { StatCardSkeleton, UsageCardSkeleton } from './SkeletonLoaders';

function getMonthName(month: number): string {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[month - 1] || 'Unknown';
}

/* ── Error State ── */

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
        <AlertCircle className="w-6 h-6 text-red-500" />
      </div>
      <p className="text-sm font-medium text-deep-black mb-1">Something went wrong</p>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-royal-blue rounded-lg hover:bg-royal-blue-dark transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}

/* ── Main Component ── */

export default function ClientUsage() {
  const { stats, loading, error, refetch } = useUsageStats();

  /* ── Loading State ── */
  if (loading) {
    return (
      <>
        <section className="flex items-center justify-between gap-6 py-2 mb-6">
          <div>
            <div className="h-8 w-56 rounded bg-gray-100 animate-pulse mb-2" />
            <div className="h-4 w-80 rounded bg-gray-100 animate-pulse" />
          </div>
        </section>
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </section>
        <section className="grid lg:grid-cols-2 gap-5">
          <UsageCardSkeleton />
          <UsageCardSkeleton />
        </section>
      </>
    );
  }

  /* ── Error State ── */
  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  /* ── Content ── */
  const messagesPercent = stats.messages_limit > 0 ? Math.round((stats.messages_used / stats.messages_limit) * 100) : 0;
  const storagePercent = stats.storage_limit > 0 ? Math.round((stats.storage_used / stats.storage_limit) * 100) : 0;
  const conversationsPercent = stats.conversations_limit > 0 ? Math.round((stats.conversations / stats.conversations_limit) * 100) : 0;

  const messagesRemaining = Math.max(0, stats.messages_limit - stats.messages_used);
  const storageRemaining = Math.max(0, stats.storage_limit - stats.storage_used);
  const conversationsRemaining = Math.max(0, stats.conversations_limit - stats.conversations);

  return (
    <>
      {/* ── Header ── */}
      <section className="flex items-center justify-between gap-6 py-2 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
            Usage
          </h1>
          <p className="text-[15px] text-gray-500">
            Monitor your platform usage, limits, and quotas.
          </p>
        </div>
      </section>

      {/* ── Statistics Cards ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-royal-blue/[0.06] border border-royal-blue/10">
              <MessageSquare className="w-[18px] h-[18px] text-royal-blue" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-royal-blue">
              {messagesPercent}%
            </span>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{stats.conversations.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-0.5">AI Conversations</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100">
              <Zap className="w-[18px] h-[18px] text-emerald-600" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
              {messagesPercent}%
            </span>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{stats.messages_used.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-0.5">AI Messages</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <HardDrive className="w-[18px] h-[18px] text-royal-blue" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-royal-blue">
              {storagePercent}%
            </span>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{formatBytes(stats.storage_used)}</div>
          <div className="text-xs text-gray-500 mt-0.5">Knowledge Storage</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-50 border border-purple-100">
              <Bot className="w-[18px] h-[18px] text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{stats.active_employees}</div>
          <div className="text-xs text-gray-500 mt-0.5">Active AI Employees</div>
        </div>
      </section>

      {/* ── Current Plan + Monthly Usage ── */}
      <section className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Current Plan Usage */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-deep-black">Current Plan Usage</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-royal-blue/[0.06] border border-royal-blue/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-royal-blue" />
              <span className="text-xs font-semibold text-royal-blue">{stats.current_plan}</span>
            </div>
          </div>
          <div className="space-y-5">
            {/* Messages */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">Messages</span>
                <span className="text-xs font-medium text-deep-black">
                  {stats.messages_used.toLocaleString()} / {stats.messages_limit.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-royal-blue rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(messagesPercent, 100)}%` }}
                />
              </div>
            </div>
            {/* Conversations */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">Conversations</span>
                <span className="text-xs font-medium text-deep-black">
                  {stats.conversations.toLocaleString()} / {stats.conversations_limit.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(conversationsPercent, 100)}%` }}
                />
              </div>
            </div>
            {/* Storage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">Storage</span>
                <span className="text-xs font-medium text-deep-black">
                  {formatBytes(stats.storage_used)} / {formatBytes(stats.storage_limit)}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(storagePercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Usage */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-deep-black">Monthly Usage</h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{getMonthName(stats.month)} {stats.year}</span>
            </div>
          </div>
          <div className="space-y-4">
            {/* Messages Used */}
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-blue/[0.06]">
                  <MessageSquare className="w-4 h-4 text-royal-blue" />
                </div>
                <div>
                  <div className="text-sm font-medium text-deep-black">Messages Used</div>
                  <div className="text-xs text-gray-400">of {stats.messages_limit.toLocaleString()} limit</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-deep-black">{stats.messages_used.toLocaleString()}</span>
                {messagesPercent > 80 ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" />
                )}
              </div>
            </div>
            {/* Conversations */}
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-deep-black">Conversations</div>
                  <div className="text-xs text-gray-400">of {stats.conversations_limit.toLocaleString()} limit</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-deep-black">{stats.conversations.toLocaleString()}</span>
                {conversationsPercent > 80 ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" />
                )}
              </div>
            </div>
            {/* Storage */}
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8FAFC]">
                  <HardDrive className="w-4 h-4 text-royal-blue" />
                </div>
                <div>
                  <div className="text-sm font-medium text-deep-black">Storage Used</div>
                  <div className="text-xs text-gray-400">of {formatBytes(stats.storage_limit)} limit</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-deep-black">{formatBytes(stats.storage_used)}</span>
                {storagePercent > 80 ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" />
                )}
              </div>
            </div>
            {/* API Requests */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                  <Bot className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-deep-black">API Requests</div>
                  <div className="text-xs text-gray-400">This month</div>
                </div>
              </div>
              <span className="text-sm font-bold text-deep-black">{stats.api_requests.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Remaining Limits ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-deep-black">Remaining Limits</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">Messages Remaining</span>
              <MessageSquare className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-deep-black mb-1">
              {messagesRemaining.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mb-3">
              of {stats.messages_limit.toLocaleString()} total
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-royal-blue rounded-full transition-all duration-500"
                style={{ width: `${Math.min(messagesPercent, 100)}%` }}
              />
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">Storage Remaining</span>
              <HardDrive className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-deep-black mb-1">
              {formatBytes(storageRemaining)}
            </div>
            <div className="text-xs text-gray-400 mb-3">
              of {formatBytes(stats.storage_limit)} total
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(storagePercent, 100)}%` }}
              />
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">Conversations Remaining</span>
              <Zap className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-deep-black mb-1">
              {conversationsRemaining.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mb-3">
              of {stats.conversations_limit.toLocaleString()} total
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(conversationsPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
