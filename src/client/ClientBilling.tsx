import { useState } from 'react';
import {
  CreditCard,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Bot,
  MessageSquare,
  FileText,
  Crown,
  HardDrive,
  Sparkles,
  ExternalLink,
  Download,
  Loader2,
} from 'lucide-react';
import { useUserSubscription } from '../hooks/useUserSubscription';
import { useBillingUsage } from '../hooks/useBillingUsage';
import { useBillingHistory } from '../hooks/useBillingHistory';
import { formatBytes } from '../hooks/useStorageUsage';
import { StatCardSkeleton, BillingHistoryRowSkeleton, UsageCardSkeleton } from './SkeletonLoaders';
import ComingSoonModal from './ComingSoonModal';
import PaymentMethodModal from './PaymentMethodModal';

/* ── Helpers ── */

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatPrice(price: number): string {
  return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'trial':
      return 'bg-blue-50 text-blue-700 border border-blue-100';
    case 'cancelled':
    case 'canceled':
    case 'expired':
      return 'bg-red-50 text-red-700 border border-red-100';
    case 'past_due':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'paid':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'failed':
      return 'bg-red-50 text-red-700 border border-red-100';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

/* ── Empty State: No Payment Method ── */

function PaymentMethodEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 mx-auto mb-5">
        <CreditCard className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">No payment method</h3>
      <p className="text-sm text-gray-500 mb-1 max-w-sm mx-auto">
        Payment methods will be available soon.
      </p>
      <p className="text-xs text-gray-400 mb-6 max-w-xs mx-auto">
        Secure payment processing will be enabled when subscription plans launch.
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
      >
        <CreditCard className="w-4 h-4" />
        Add Payment Method
      </button>
    </div>
  );
}

/* ── Empty State: No Invoices ── */

function BillingHistoryEmptyState({ onComingSoon }: { onComingSoon: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] border border-royal-blue/10 mx-auto mb-5">
        <FileText className="w-8 h-8 text-royal-blue" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">No invoices yet</h3>
      <p className="text-sm text-gray-500 mb-5 max-w-sm mx-auto">
        Your billing history will appear here once subscription plans are available.
      </p>
      <button
        onClick={onComingSoon}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-deep-black hover:border-gray-300 transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        View Plans
      </button>
    </div>
  );
}

/* ── Empty State: No Subscription ── */

function SubscriptionEmptyState({ onComingSoon }: { onComingSoon: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] mx-auto mb-5">
        <CreditCard className="w-8 h-8 text-royal-blue" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">Subscription plans are coming soon.</h3>
      <p className="text-sm text-gray-500 mb-1 max-w-sm mx-auto">
        We&apos;re building our subscription and billing system. You&apos;ll be able to upgrade your plan and unlock premium features soon.
      </p>
      <p className="text-xs text-gray-400 mb-6 max-w-xs mx-auto">
        Stay tuned for Free, Starter, Pro, and Business plans.
      </p>
      <button
        onClick={onComingSoon}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
      >
        <Sparkles className="w-4 h-4" />
        Learn More
      </button>
    </div>
  );
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

/* ── Progress Bar ── */

function UsageProgressBar({
  label,
  icon: Icon,
  iconBg,
  iconColor,
  used,
  limit,
  remaining,
  percent,
  unit,
}: {
  label: string;
  icon: typeof Bot;
  iconBg: string;
  iconColor: string;
  used: number;
  limit: number;
  remaining: number;
  percent: number;
  unit: string;
}) {
  const isUnlimited = limit <= 0;
  const barColor = isUnlimited
    ? 'bg-royal-blue'
    : percent > 80
      ? 'bg-red-500'
      : percent > 60
        ? 'bg-amber-500'
        : 'bg-royal-blue';

  const formatValue = (v: number) => (unit === 'bytes' ? formatBytes(v) : v.toLocaleString());
  const limitDisplay = isUnlimited ? 'Unlimited' : formatValue(limit);
  const remainingDisplay = isUnlimited ? '—' : formatValue(remaining);

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-deep-black">{label}</span>
            <span className="text-xs text-gray-500">
              {isUnlimited ? (
                <span className="font-medium text-emerald-600">Unlimited</span>
              ) : (
                <span className="font-medium text-deep-black">{formatValue(used)}</span>
              )}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full transition-all duration-500`}
              style={{ width: `${isUnlimited ? 0 : Math.min(percent, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[11px] text-gray-400">
              {remainingDisplay} remaining
            </span>
            <span className="text-[11px] text-gray-400">
              {limitDisplay} limit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Storage Progress Bar ── */

function StorageProgressBar({
  used,
  limit,
  remaining,
  percent,
}: {
  used: number;
  limit: number;
  remaining: number;
  percent: number;
}) {
  const barColor = percent > 80 ? 'bg-red-500' : percent > 60 ? 'bg-amber-500' : 'bg-royal-blue';

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
          <HardDrive className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-deep-black">Knowledge Storage</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-2.5">
            <div>
              <div className="text-[11px] text-gray-400 mb-0.5">Used</div>
              <div className="text-xs font-semibold text-deep-black">{formatBytes(used)}</div>
            </div>
            <div className="text-center">
              <div className="text-[11px] text-gray-400 mb-0.5">Remaining</div>
              <div className="text-xs font-semibold text-deep-black">{formatBytes(remaining)}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-gray-400 mb-0.5">Storage Limit</div>
              <div className="text-xs font-semibold text-deep-black">{formatBytes(limit)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function ClientBilling() {
  const { subscription, loading: subLoading, error: subError, refetch: refetchSub } = useUserSubscription();
  const { usage, loading: usageLoading, error: usageError, refetch: refetchUsage } = useBillingUsage();
  const { invoices, loading: histLoading, error: histError, refetch: refetchHist } = useBillingHistory();

  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const isLoading = subLoading || usageLoading;
  const error = subError || usageError || histError;

  /* ── Loading State ── */
  if (isLoading) {
    return (
      <>
        <section className="flex items-center justify-between gap-6 py-2 mb-6">
          <div>
            <div className="h-8 w-48 rounded bg-gray-100 animate-pulse mb-2" />
            <div className="h-4 w-72 rounded bg-gray-100 animate-pulse" />
          </div>
        </section>

        {/* Stat cards skeleton */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </section>

        {/* Subscription + Usage skeletons */}
        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="h-5 w-32 rounded bg-gray-100 animate-pulse mb-5" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-3 w-28 rounded bg-gray-100 animate-pulse" />
                  <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <div className="h-10 w-28 rounded-xl bg-gray-100 animate-pulse" />
              <div className="h-10 w-36 rounded-xl bg-gray-100 animate-pulse" />
            </div>
          </div>
          <UsageCardSkeleton />
        </div>

        {/* Payment + History skeletons */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-12 flex items-center justify-center">
            <div className="h-16 w-16 rounded-2xl bg-gray-100 animate-pulse mb-4" />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
              <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 3 }).map((_, i) => (
                <BillingHistoryRowSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Error State ── */
  if (error) {
    return <ErrorState message={error} onRetry={() => { refetchSub(); refetchUsage(); refetchHist(); }} />;
  }

  /* ── Derived Data ── */
  const currentPlan = subscription?.plan_name || 'Free';
  const hasSubscription = !!subscription;
  const aiEmployeeCount = usage.active_employees;
  const aiEmployeeLimit = subscription?.ai_limit ?? 0;
  const messagesUsed = usage.messages_used;
  const messagesLimit = subscription?.message_limit ?? usage.messages_limit;
  const storageUsed = usage.storage_used;
  const storageLimit = subscription?.storage_limit ?? usage.storage_limit;

  const messagesPercent = messagesLimit > 0 ? Math.round((messagesUsed / messagesLimit) * 100) : 0;
  const storagePercent = storageLimit > 0 ? Math.round((storageUsed / storageLimit) * 100) : 0;
  const employeesPercent = aiEmployeeLimit > 0 ? Math.round((aiEmployeeCount / aiEmployeeLimit) * 100) : 0;

  const messagesRemaining = Math.max(0, messagesLimit - messagesUsed);
  const storageRemaining = Math.max(0, storageLimit - storageUsed);
  const employeesRemaining = Math.max(0, aiEmployeeLimit - aiEmployeeCount);

  return (
    <>
      {/* ── Header ── */}
      <section className="flex items-center justify-between gap-6 py-2 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
            Billing
          </h1>
          <p className="text-[15px] text-gray-500">
            Manage your subscription, payment methods, and invoices.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          1. BILLING OVERVIEW — 4 Stat Cards
          ═══════════════════════════════════════════════════ */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-royal-blue/[0.06] border border-royal-blue/10">
              <CreditCard className="w-[18px] h-[18px] text-royal-blue" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight truncate">{currentPlan}</div>
          <div className="text-xs text-gray-500 mt-0.5">Current Plan</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-50 border border-purple-100">
              <Bot className="w-[18px] h-[18px] text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{aiEmployeeCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">AI Employees</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100">
              <MessageSquare className="w-[18px] h-[18px] text-emerald-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{messagesUsed.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-0.5">Monthly Messages Used</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <Calendar className="w-[18px] h-[18px] text-royal-blue" />
            </div>
          </div>
          {subscription?.renewal_date ? (
            <>
              <div className="text-2xl font-bold text-deep-black tracking-tight truncate">
                {formatDate(subscription.renewal_date)}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Next Billing Date</div>
            </>
          ) : (
            <>
              <div className="text-base font-bold text-deep-black tracking-tight leading-snug">
                Subscription plans coming soon
              </div>
              <div className="text-xs text-gray-400 mt-0.5 leading-snug">Plans and pricing will be available shortly.</div>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. CURRENT SUBSCRIPTION + 3. USAGE
          ═══════════════════════════════════════════════════ */}
      <section className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* ── 2. Current Subscription ── */}
        {!hasSubscription ? (
          <SubscriptionEmptyState onComingSoon={() => setComingSoonOpen(true)} />
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-deep-black">Current Subscription</h2>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${getStatusClasses(subscription.status)}`}>
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Plan</span>
                <span className="text-sm font-medium text-deep-black">{subscription.plan_name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Price</span>
                <span className="text-sm font-medium text-deep-black">
                  {formatPrice(subscription.price)} / {subscription.billing_cycle === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Renewal Date</span>
                <span className="text-sm font-medium text-deep-black">
                  {formatDate(subscription.renewal_date)}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">Billing Cycle</span>
                <span className="text-sm font-medium text-deep-black capitalize">{subscription.billing_cycle}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setComingSoonOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
              >
                <Sparkles className="w-4 h-4" />
                Coming Soon
              </button>
            </div>
          </div>
        )}

        {/* ── 3. Usage ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-deep-black">Usage</h2>
            {hasSubscription && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-royal-blue/[0.06] border border-royal-blue/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-royal-blue" />
                <span className="text-xs font-semibold text-royal-blue">{subscription.plan_name}</span>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <UsageProgressBar
              label="AI Employees"
              icon={Bot}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              used={aiEmployeeCount}
              limit={aiEmployeeLimit}
              remaining={employeesRemaining}
              percent={employeesPercent}
              unit="count"
            />
            <UsageProgressBar
              label="Messages"
              icon={MessageSquare}
              iconBg="bg-royal-blue/[0.06]"
              iconColor="text-royal-blue"
              used={messagesUsed}
              limit={messagesLimit}
              remaining={messagesRemaining}
              percent={messagesPercent}
              unit="count"
            />
            <StorageProgressBar
              used={storageUsed}
              limit={storageLimit}
              remaining={storageRemaining}
              percent={storagePercent}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. PAYMENT METHOD + 5. BILLING HISTORY
          ═══════════════════════════════════════════════════ */}
      <section className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* ── 4. Payment Method ── */}
        <PaymentMethodEmptyState onAdd={() => setPaymentOpen(true)} />

        {/* ── 5. Billing History ── */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-deep-black">Billing History</h2>
            {histLoading && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
          </div>

          {invoices.length === 0 ? (
            <BillingHistoryEmptyState onComingSoon={() => setComingSoonOpen(true)} />
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:flex items-center px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <span className="flex-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Invoice</span>
                <span className="w-24 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Plan</span>
                <span className="w-20 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Amount</span>
                <span className="w-20 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center">Status</span>
                <span className="w-24 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Date</span>
                <span className="w-10" />
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100">
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center gap-4 px-6 py-3.5 transition-colors duration-200 hover:bg-gray-50/50">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-deep-black truncate">
                        {inv.invoice_number || inv.id.slice(0, 8)}
                      </div>
                    </div>
                    <div className="w-24 flex-shrink-0">
                      <span className="text-xs text-gray-500">{inv.plan_name}</span>
                    </div>
                    <div className="w-20 flex items-center justify-end flex-shrink-0">
                      <span className="text-sm font-medium text-deep-black">{formatPrice(inv.amount)}</span>
                    </div>
                    <div className="w-20 flex items-center justify-center flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(inv.status)}`}>
                        {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                      </span>
                    </div>
                    <div className="w-24 flex items-center justify-end flex-shrink-0">
                      <span className="text-xs text-gray-400">{formatDate(inv.invoice_date || inv.created_at)}</span>
                    </div>
                    <div className="w-10 flex items-center justify-end flex-shrink-0">
                      {inv.pdf_url ? (
                        <a
                          href={inv.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-royal-blue hover:border-royal-blue/20 hover:bg-royal-blue/[0.04] transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. UPGRADE BANNER
          ═══════════════════════════════════════════════════ */}
      <section>
        <div className="relative overflow-hidden bg-gradient-to-br from-royal-blue via-royal-blue-dark to-[#172554] rounded-2xl border border-royal-blue/20">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 mb-4">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-white/80 tracking-wide">PRO PLAN</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                  Unlock more AI Employees
                </h2>
                <p className="text-sm text-white/60 max-w-md">
                  Upgrade to Pro and scale your customer support with more AI Employees, higher message limits, and priority support.
                </p>
              </div>
              <button
                onClick={() => setComingSoonOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-royal-blue bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-black/10 active:scale-[0.98] flex-shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                Coming Soon
              </button>
            </div>

            {/* ── Plan Comparison ── */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Free Plan */}
              <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Free Plan</div>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-white/40 flex-shrink-0" />
                    1 AI Employee
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-white/40 flex-shrink-0" />
                    Basic Knowledge Base
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-white/40 flex-shrink-0" />
                    Limited Messages
                  </li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div className="bg-white/[0.1] backdrop-blur-sm border border-white/15 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider">Pro Plan</div>
                  <div className="px-1.5 py-0.5 rounded bg-amber-400/20 border border-amber-400/30">
                    <span className="text-[10px] font-bold text-amber-300">RECOMMENDED</span>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    Unlimited AI Employees
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    More Monthly Messages
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    Website Widget
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    WhatsApp Integration
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    Priority Support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MODALS
          ═══════════════════════════════════════════════════ */}
      <ComingSoonModal
        isOpen={comingSoonOpen}
        onClose={() => setComingSoonOpen(false)}
      />

      <PaymentMethodModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
      />
    </>
  );
}
