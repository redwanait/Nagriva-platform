import { useState } from 'react';
import {
  Bot,
  Plus,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Calendar,
  Globe,
  MoreVertical,
  Settings,
  Trash2,
} from 'lucide-react';
import { useAIEmployees } from '../hooks/useAIEmployees';
import type { EmployeePageEmployee } from './clientData';
import { AIEmployeeCardSkeleton } from './SkeletonLoaders';

/* ── Helpers ── */

function getStatusConfig(status: EmployeePageEmployee['status']) {
  switch (status) {
    case 'active':
      return { dot: 'bg-emerald-500', text: 'text-emerald-600', label: 'Active' };
    case 'paused':
      return { dot: 'bg-amber-400', text: 'text-amber-600', label: 'Paused' };
    case 'training':
      return { dot: 'bg-blue-500', text: 'text-blue-600', label: 'Training' };
    case 'offline':
      return { dot: 'bg-gray-400', text: 'text-gray-400', label: 'Offline' };
    default:
      return { dot: 'bg-gray-400', text: 'text-gray-400', label: 'Inactive' };
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/* ── Empty State ── */

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] mx-auto mb-5">
        <Bot className="w-8 h-8 text-royal-blue" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">You don&apos;t have any AI Employees yet.</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        Create your first AI Employee to start automating customer conversations and generating leads.
      </p>
      <button
        onClick={onCreate}
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
      >
        <Plus className="w-4 h-4" />
        Create your first AI Employee
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

/* ── Employee Card ── */

function EmployeeCard({ employee }: { employee: EmployeePageEmployee }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const statusConfig = getStatusConfig(employee.status);

  function handleManage() {
    window.location.hash = `#/client-dashboard/ai-employees/${employee.id}`;
  }

  return (
    <div
      onClick={handleManage}
      className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:border-royal-blue/20 hover:shadow-md hover:shadow-royal-blue/[0.04] group relative"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal-blue to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-royal-blue/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-deep-black truncate">{employee.name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
            <span className={`text-xs font-medium ${statusConfig.text}`}>{statusConfig.label}</span>
          </div>
        </div>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[160px]">
                <button
                  onClick={handleManage}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-deep-black hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Manage
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Created</span>
          </div>
          <span className="text-xs font-medium text-deep-black">{formatDate(employee.created_at)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Conversations</span>
          </div>
          <span className="text-xs font-medium text-deep-black">{employee.conversationCount.toLocaleString()}</span>
        </div>
        {employee.website && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </div>
            <span className="text-xs font-medium text-deep-black truncate max-w-[140px]">{employee.website}</span>
          </div>
        )}
      </div>

      {/* Action */}
      <button className="w-full py-2.5 text-sm font-semibold text-royal-blue bg-royal-blue/[0.06] border border-royal-blue/10 rounded-xl transition-all duration-200 hover:bg-royal-blue hover:text-white hover:border-royal-blue group-hover:shadow-sm">
        Manage
      </button>
    </div>
  );
}

/* ── Main Component ── */

export default function ClientAIEmployees() {
  const { employees, loading, error, refetch } = useAIEmployees();

  function handleCreate() {
    window.location.hash = '#/client-dashboard/ai-employees/new';
  }

  /* ── Loading State ── */
  if (loading) {
    return (
      <>
        <section className="flex items-center justify-between gap-6 py-2 mb-6">
          <div>
            <div className="h-8 w-56 rounded bg-gray-100 animate-pulse mb-2" />
            <div className="h-4 w-80 rounded bg-gray-100 animate-pulse" />
          </div>
          <div className="h-10 w-44 rounded-xl bg-gray-100 animate-pulse" />
        </section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <AIEmployeeCardSkeleton key={i} />
          ))}
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
            My AI Employees
          </h1>
          <p className="text-[15px] text-gray-500">
            Manage and configure your AI employees. Create, monitor and optimize their performance.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create AI Employee
        </button>
      </section>

      {/* ── Content ── */}
      {employees.length === 0 ? (
        <EmptyState onCreate={handleCreate} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      )}
    </>
  );
}
