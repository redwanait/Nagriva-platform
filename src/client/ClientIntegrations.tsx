import { useState, useCallback } from 'react';
import {
  Plug,
  AlertCircle,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useIntegrations } from '../hooks/useIntegrations';
import type { Integration } from '../hooks/useIntegrations';
import { IntegrationRowSkeleton, StatCardSkeleton } from './SkeletonLoaders';
import WebsiteIntegrationModal from './WebsiteIntegrationModal';
import WebsiteIntegrationManage from './WebsiteIntegrationManage';
import Toast from '../components/Toast';

/* ── Helpers ── */

function formatRelativeDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'connected':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'error':
      return 'bg-red-50 text-red-700 border border-red-100';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

/* ── Empty State ── */

function EmptyState({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] mx-auto mb-5">
        <Plug className="w-8 h-8 text-royal-blue" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">No integrations yet</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        Connect your first integration to automate your AI Employees.
      </p>
      <button
        onClick={onConnect}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
      >
        <Plug className="w-4 h-4" />
        Connect Integration
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

/* ── Integration Row ── */

function IntegrationRow({ integration, onSelect }: { integration: Integration; onSelect: (id: string) => void }) {
  return (
    <div
      onClick={() => onSelect(integration.id)}
      className="flex items-center gap-4 px-6 py-3.5 transition-colors duration-200 hover:bg-gray-50/50 cursor-pointer"
    >
      {/* Name + Provider */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-blue/[0.06] flex-shrink-0">
          <Plug className="w-4 h-4 text-royal-blue" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-deep-black truncate">{integration.name}</div>
          <div className="text-xs text-gray-500">{integration.provider}</div>
        </div>
      </div>

      {/* Status */}
      <div className="w-28 flex justify-center flex-shrink-0">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(integration.status)}`}>
          {integration.status === 'connected' ? (
            <Wifi className="w-3 h-3" />
          ) : integration.status === 'error' ? (
            <WifiOff className="w-3 h-3" />
          ) : null}
          {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
        </span>
      </div>

      {/* Last Sync */}
      <div className="w-28 flex items-center justify-end gap-1.5 flex-shrink-0">
        <Clock className="w-3 h-3 text-gray-400" />
        <span className="text-xs text-gray-400">{formatRelativeDate(integration.last_sync)}</span>
      </div>

      {/* Connected At */}
      <div className="w-28 flex items-center justify-end gap-1.5 flex-shrink-0">
        <span className="text-xs text-gray-400">{formatDate(integration.connected_at)}</span>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function ClientIntegrations() {
  const { integrations, loading, error, refetch } = useIntegrations();
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false);
  const [selectedIntegrationId, setSelectedIntegrationId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleConnect = useCallback((_widgetKey: string) => {
    refetch();
    setIsWebsiteModalOpen(false);
    setToast({ message: 'Website connected successfully!', type: 'success' });
  }, [refetch]);

  const totalIntegrations = integrations.length;
  const connectedCount = integrations.filter((i) => i.status === 'connected').length;
  const disconnectedCount = integrations.filter((i) => i.status === 'disconnected').length;
  const lastSync = integrations.find((i) => i.last_sync)?.last_sync;

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
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="divide-y divide-gray-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <IntegrationRowSkeleton key={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  /* ── Error State ── */
  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <>
      {/* ── Header ── */}
      <section className="flex items-center justify-between gap-6 py-2 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
            Integrations
          </h1>
          <p className="text-[15px] text-gray-500">
            Connect your website, WhatsApp, and other platforms.
          </p>
        </div>
        {integrations.length > 0 && (
          <button
            onClick={() => setIsWebsiteModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20 flex-shrink-0"
          >
            <Plug className="w-4 h-4" />
            Connect Integration
          </button>
        )}
      </section>

      {/* ── Statistics Cards ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <Plug className="w-[18px] h-[18px] text-royal-blue" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{totalIntegrations}</div>
          <div className="text-xs text-gray-500 mt-0.5">Total Integrations</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100">
              <CheckCircle2 className="w-[18px] h-[18px] text-emerald-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{connectedCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">Connected</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-50 border border-gray-100">
              <XCircle className="w-[18px] h-[18px] text-gray-500" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{disconnectedCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">Disconnected</div>
        </div>
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <BarChart3 className="w-[18px] h-[18px] text-royal-blue" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight truncate">
            {lastSync ? formatRelativeDate(lastSync) : '—'}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">Last Sync</div>
        </div>
      </section>

      {/* ── Content ── */}
      {integrations.length === 0 ? (
        <EmptyState onConnect={() => setIsWebsiteModalOpen(true)} />
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          {/* Table Header */}
          <div className="hidden md:flex items-center px-6 py-3 border-b border-gray-100 bg-gray-50/50">
            <span className="flex-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Integration</span>
            <span className="w-28 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center">Status</span>
            <span className="w-28 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Last Sync</span>
            <span className="w-28 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Connected</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {integrations.map((integration) => (
              <IntegrationRow key={integration.id} integration={integration} onSelect={setSelectedIntegrationId} />
            ))}
          </div>
        </div>
      )}

      <WebsiteIntegrationModal
        isOpen={isWebsiteModalOpen}
        onClose={() => setIsWebsiteModalOpen(false)}
        onConnect={handleConnect}
      />

      {selectedIntegrationId && (
        <WebsiteIntegrationManage
          integrationId={selectedIntegrationId}
          onClose={() => setSelectedIntegrationId(null)}
          onUpdated={refetch}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
