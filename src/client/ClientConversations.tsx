import { useState } from 'react';
import {
  MessageSquare,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useConversations } from '../hooks/useConversations';
import { ConversationRowSkeleton } from './SkeletonLoaders';
import ConversationFilters from './ConversationFilters';
import ConversationItem from './ConversationItem';
import ConversationView from './ConversationView';
import type { ClientConversation } from './clientData';

/* ── Empty State ── */

function EmptyState() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] mx-auto mb-5">
        <MessageSquare className="w-8 h-8 text-royal-blue" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">No conversations yet</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        When visitors interact with your AI employees, conversations will appear here.
      </p>
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

/* ── Main Component ── */

export default function ClientConversations() {
  const { conversations, loading, error, refetch, search, setSearch, statusFilter, setStatusFilter } = useConversations();
  const [selectedConversation, setSelectedConversation] = useState<ClientConversation | null>(null);

  /* ── Loading State ── */
  if (loading) {
    return (
      <>
        <section className="flex items-center justify-between gap-6 py-2 mb-6">
          <div>
            <div className="h-8 w-56 rounded bg-gray-100 animate-pulse mb-2" />
            <div className="h-4 w-72 rounded bg-gray-100 animate-pulse" />
          </div>
        </section>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <ConversationRowSkeleton key={i} />
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
            Conversations
          </h1>
          <p className="text-[15px] text-gray-500">
            View all customer conversations across your AI employees.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="flex items-center justify-between">
        <ConversationFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        {conversations.length > 0 && (
          <span className="text-xs text-gray-400">
            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* ── Content ── */}
      {conversations.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          {/* Table Header */}
          <div className="hidden md:flex items-center px-6 py-3 border-b border-gray-100 bg-gray-50/50">
            <span className="flex-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Visitor</span>
            <span className="flex-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">AI Employee</span>
            <span className="flex-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider hidden lg:block">Last Message</span>
            <span className="w-20 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center">Messages</span>
            <span className="w-24 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Status</span>
            <span className="w-28 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Last Activity</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                onSelect={setSelectedConversation}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Chat Panel ── */}
      {selectedConversation && (
        <ConversationView
          conversation={selectedConversation}
          onClose={() => setSelectedConversation(null)}
        />
      )}
    </>
  );
}
