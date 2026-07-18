import { useState, useEffect } from 'react';
import {
  Headphones,
  AlertCircle,
  RefreshCw,
  Plus,
  ArrowLeft,
  Send,
  Clock,
  CheckCircle2,
  Circle,
  MessageSquare,
} from 'lucide-react';
import { useSupportTickets } from '../hooks/useSupportTickets';
import type { SupportTicket, TicketReply } from '../hooks/useSupportTickets';

/* ── Helpers ── */

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateTime(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'open':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'in_progress':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'closed':
      return 'bg-gray-100 text-gray-500 border border-gray-200';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'open': return <Circle className="w-3 h-3" />;
    case 'in_progress': return <Clock className="w-3 h-3" />;
    case 'closed': return <CheckCircle2 className="w-3 h-3" />;
    default: return <Circle className="w-3 h-3" />;
  }
}

function getPriorityClasses(priority: string) {
  switch (priority) {
    case 'high':
    case 'urgent':
      return 'bg-red-50 text-red-700 border border-red-100';
    case 'medium':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'low':
      return 'bg-gray-50 text-gray-500 border border-gray-200';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

/* ── Toast ── */

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all duration-300 ${
      type === 'success'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-red-50 text-red-700 border-red-200'
    }`}>
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-current opacity-60 hover:opacity-100">&times;</button>
    </div>
  );
}

/* ── Empty State ── */

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.06] mx-auto mb-5">
        <Headphones className="w-8 h-8 text-royal-blue" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">No support tickets yet</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        Need help? Create a support ticket and our team will assist you.
      </p>
      <button
        onClick={onCreate}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
      >
        <Plus className="w-4 h-4" />
        Create Ticket
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

/* ── Loading Skeleton ── */

function TicketListSkeleton() {
  return (
    <>
      <section className="flex items-center justify-between gap-6 py-2 mb-6">
        <div>
          <div className="h-8 w-48 rounded bg-gray-100 animate-pulse mb-2" />
          <div className="h-4 w-72 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-gray-100 animate-pulse" />
      </section>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1 min-w-0">
                <div className="h-3.5 w-48 rounded bg-gray-100 animate-pulse mb-1.5" />
                <div className="h-3 w-32 rounded bg-gray-100 animate-pulse" />
              </div>
              <div className="h-5 w-20 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
              <div className="h-5 w-16 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
              <div className="h-3 w-20 rounded bg-gray-100 animate-pulse flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Main Component ── */

type ViewState = 'list' | 'create' | 'view';

export default function ClientSupport() {
  const { tickets, loading, error, refetch, createTicket, fetchReplies, addReply } = useSupportTickets();
  const [view, setView] = useState<ViewState>('list');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Create form state
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [creating, setCreating] = useState(false);

  // Reply form state
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  async function handleViewTicket(ticket: SupportTicket) {
    setSelectedTicket(ticket);
    setView('view');
    setReplies([]);
    setRepliesLoading(true);
    try {
      const data = await fetchReplies(ticket.id);
      setReplies(data);
    } catch {
      // silently fail, replies stay empty
    } finally {
      setRepliesLoading(false);
    }
  }

  async function handleCreate() {
    if (!newSubject.trim() || !newMessage.trim()) return;
    try {
      setCreating(true);
      await createTicket(newSubject.trim(), newMessage.trim(), newPriority);
      setToast({ message: 'Ticket created successfully', type: 'success' });
      setNewSubject('');
      setNewMessage('');
      setNewPriority('medium');
      setView('list');
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to create ticket',
        type: 'error',
      });
    } finally {
      setCreating(false);
    }
  }

  async function handleSendReply() {
    if (!selectedTicket || !replyMessage.trim()) return;
    try {
      setSendingReply(true);
      await addReply(selectedTicket.id, replyMessage.trim());
      const updated = await fetchReplies(selectedTicket.id);
      setReplies(updated);
      setReplyMessage('');
      setToast({ message: 'Reply sent', type: 'success' });
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to send reply',
        type: 'error',
      });
    } finally {
      setSendingReply(false);
    }
  }

  /* ── Loading ── */
  if (loading) {
    return <TicketListSkeleton />;
  }

  /* ── Error ── */
  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* ── List View ── */}
      {view === 'list' && (
        <>
          <section className="flex items-center justify-between gap-6 py-2 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
                Support
              </h1>
              <p className="text-[15px] text-gray-500">
                Get help from our team or browse the knowledge base.
              </p>
            </div>
            <button
              onClick={() => setView('create')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              New Ticket
            </button>
          </section>

          {tickets.length === 0 ? (
            <EmptyState onCreate={() => setView('create')} />
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
              <div className="hidden md:flex items-center px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <span className="flex-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Subject</span>
                <span className="w-24 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center">Status</span>
                <span className="w-20 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center">Priority</span>
                <span className="w-28 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Last Updated</span>
              </div>
              <div className="divide-y divide-gray-100">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => handleViewTicket(ticket)}
                    className="flex items-center gap-4 px-6 py-3.5 transition-colors duration-200 hover:bg-gray-50/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-blue/[0.06] flex-shrink-0">
                        <Headphones className="w-4 h-4 text-royal-blue" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-deep-black truncate">{ticket.subject}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{ticket.message}</div>
                      </div>
                    </div>
                    <div className="w-24 flex justify-center flex-shrink-0">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status === 'in_progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </div>
                    <div className="w-20 flex justify-center flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getPriorityClasses(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </div>
                    <div className="w-28 flex items-center justify-end gap-1.5 flex-shrink-0">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{formatDate(ticket.updated_at || ticket.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Create View ── */}
      {view === 'create' && (
        <>
          <section className="flex items-center gap-4 py-2 mb-6">
            <button
              onClick={() => setView('list')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
                New Ticket
              </h1>
              <p className="text-[15px] text-gray-500">
                Describe your issue and we&apos;ll get back to you.
              </p>
            </div>
          </section>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Priority
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => setView('list')}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={creating || !newSubject.trim() || !newMessage.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Ticket'
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── View Ticket ── */}
      {view === 'view' && selectedTicket && (
        <>
          <section className="flex items-center gap-4 py-2 mb-6">
            <button
              onClick={() => { setView('list'); setSelectedTicket(null); }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1 truncate">
                {selectedTicket.subject}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(selectedTicket.status)}`}>
                  {getStatusIcon(selectedTicket.status)}
                  {selectedTicket.status === 'in_progress' ? 'In Progress' : selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getPriorityClasses(selectedTicket.priority)}`}>
                  {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                </span>
                <span className="text-xs text-gray-400">Created {formatDate(selectedTicket.created_at)}</span>
              </div>
            </div>
          </section>

          {/* Original Message */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-blue text-white text-xs font-bold">
                You
              </div>
              <div>
                <span className="text-sm font-medium text-deep-black">You</span>
                <span className="text-xs text-gray-400 ml-2">{formatDateTime(selectedTicket.created_at)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedTicket.message}</p>
          </div>

          {/* Replies */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-deep-black mb-3">
              Replies {replies.length > 0 && <span className="text-gray-400 font-normal">({replies.length})</span>}
            </h2>
            {repliesLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />
                      <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
                    </div>
                    <div className="h-3 w-full rounded bg-gray-100 animate-pulse mb-2" />
                    <div className="h-3 w-3/4 rounded bg-gray-100 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : replies.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No replies yet. Send a message below.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {replies.map((reply) => {
                  const isClient = reply.client_id !== undefined;
                  return (
                    <div key={reply.id} className="bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold ${
                          isClient ? 'bg-royal-blue' : 'bg-emerald-500'
                        }`}>
                          {isClient ? 'You' : 'S'}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-deep-black">{isClient ? 'You' : 'Support'}</span>
                          <span className="text-xs text-gray-400 ml-2">{formatDateTime(reply.created_at)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{reply.message}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reply Input */}
          {selectedTicket.status !== 'closed' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
              <div className="flex gap-3">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={3}
                  className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white resize-none"
                  placeholder="Type your reply..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleSendReply();
                    }
                  }}
                />
                <button
                  onClick={handleSendReply}
                  disabled={sendingReply || !replyMessage.trim()}
                  className="self-end inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingReply ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Reply
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Press Ctrl+Enter to send</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
