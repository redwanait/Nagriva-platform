import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, ChevronRight, X } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import type { Order } from '../hooks/useOrders';
import { supabase } from '../lib/supabase';

type DropdownEntry = { id: string; name: string };

function getStatusClasses(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'in-progress':
      return 'bg-blue-50 text-royal-blue border border-blue-100';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

function getPriorityClasses(priority: string) {
  switch (priority) {
    case 'high':
      return 'bg-red-50 text-red-600 border border-red-100';
    case 'medium':
      return 'bg-amber-50 text-amber-600 border border-amber-100';
    case 'low':
      return 'bg-gray-50 text-gray-500 border border-gray-200';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

function formatAmount(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatOrderId(id: string): string {
  if (/^\d+$/.test(id)) return `#ORD-${id}`;
  return id;
}

/* ── Loading Skeleton ── */

function LoadingSkeleton() {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Orders</h1>
          <p className="text-[15px] text-gray-500">Track and manage all customer orders.</p>
        </div>
        <div className="h-10 w-28 bg-gray-100 rounded-lg animate-pulse" />
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="dash-stat-card">
            <div className="h-3 w-20 bg-gray-100 rounded animate-pulse mb-2" />
            <div className="h-7 w-16 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="h-9 w-full max-w-sm bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-28 bg-gray-100 rounded animate-pulse hidden md:block" />
              <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-4 w-14 bg-gray-100 rounded animate-pulse hidden lg:block" />
              <div className="h-4 w-16 bg-gray-100 rounded animate-pulse ml-auto" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ── Empty State ── */

function EmptyState({ onNewOrder }: { onNewOrder: () => void }) {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Orders</h1>
          <p className="text-[15px] text-gray-500">Track and manage all customer orders.</p>
        </div>
        <button
          onClick={onNewOrder}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Order</span>
        </button>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: '0', icon: '📦' },
          { label: 'In Progress', value: '0', icon: '🔄' },
          { label: 'Completed', value: '0', icon: '✅' },
          { label: 'Revenue', value: '$0', icon: '💰' },
        ].map((stat) => (
          <div key={stat.label} className="dash-stat-card">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
          </div>
        ))}
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Plus className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">No orders yet</h3>
        <p className="text-sm text-gray-500 mb-4">Create your first order to get started.</p>
        <button
          onClick={onNewOrder}
          className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Order
        </button>
      </div>
    </>
  );
}

/* ── Error State ── */

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Orders</h1>
          <p className="text-[15px] text-gray-500">Track and manage all customer orders.</p>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">Failed to load orders</h3>
        <p className="text-sm text-gray-500 mb-4">Something went wrong while fetching your orders.</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          Retry
        </button>
      </div>
    </>
  );
}

/* ── Order Form Modal ── */

function OrderFormModal({
  open,
  title,
  initialClient,
  initialService,
  initialStatus,
  initialPriority,
  initialAmount,
  submitLabel,
  onClose,
  onSubmit,
  onDone,
}: {
  open: boolean;
  title: string;
  initialClient: string;
  initialService: string;
  initialStatus: string;
  initialPriority: string;
  initialAmount: number;
  submitLabel: string;
  onClose: () => void;
  onSubmit: (input: { client_id: string; service_id: string; status: string; priority: string; amount: number }) => Promise<void>;
  onDone: () => void;
}) {
  const [clients, setClients] = useState<DropdownEntry[]>([]);
  const [services, setServices] = useState<DropdownEntry[]>([]);
  const [clientId, setClientId] = useState(initialClient);
  const [serviceId, setServiceId] = useState(initialService);
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState(initialPriority);
  const [amount, setAmount] = useState(initialAmount);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setClientId(initialClient);
    setServiceId(initialService);
    setStatus(initialStatus);
    setPriority(initialPriority);
    setAmount(initialAmount);
    setModalError(null);

    async function load() {
      const [c, s] = await Promise.all([
        supabase.from('profiles').select('id, full_name'),
        supabase.from('services').select('id, name'),
      ]);
      if (c.data) setClients(c.data.map((r: Record<string, unknown>) => ({ id: String(r.id), name: String(r.full_name ?? 'Unknown') })));
      if (s.data) setServices(s.data.map((r: Record<string, unknown>) => ({ id: String(r.id), name: String(r.name ?? 'Unknown') })));
    }
    load();
  }, [open, initialClient, initialService, initialStatus, initialPriority, initialAmount]);

  if (!open) return null;

  async function handleSubmit() {
    if (!clientId || !serviceId) {
      setModalError('Client and service are required.');
      return;
    }
    try {
      setSubmitting(true);
      setModalError(null);
      await onSubmit({ client_id: clientId, service_id: serviceId, status, priority, amount });
      onDone();
      onClose();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  }

  const selectClass = 'w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-deep-black">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Client</label>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)} className={selectClass}>
              <option value="">Select client…</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Service</label>
            <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={selectClass}>
              <option value="">Select service…</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className={selectClass}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Amount ($)</label>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
            />
          </div>
        </div>

        {modalError && <p className="mt-3 text-sm text-red-600">{modalError}</p>}

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors disabled:opacity-50"
          >
            {submitting ? 'Saving…' : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete Confirm Modal ── */

function DeleteConfirmModal({
  open,
  order,
  onClose,
  onConfirm,
  onDone,
}: {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  onDone: () => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  useEffect(() => {
    if (open) setModalError(null);
  }, [open]);

  if (!open || !order) return null;

  async function handleDelete() {
    if (!order) return;
    try {
      setDeleting(true);
      setModalError(null);
      await onConfirm(order.id);
      onDone();
      onClose();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-sm mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-deep-black mb-2">Delete Order</h2>
        <p className="text-sm text-gray-500 mb-1">
          Are you sure you want to delete <span className="font-semibold text-deep-black">{formatOrderId(order.id)}</span>?
        </p>
        <p className="text-sm text-gray-400 mb-5">This action cannot be undone.</p>

        {modalError && <p className="mb-3 text-sm text-red-600">{modalError}</p>}

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

const FILTERS = ['All', 'In Progress', 'Completed', 'Pending'] as const;
const STATUS_MAP: Record<string, string> = {
  'In Progress': 'in-progress',
  'Completed': 'completed',
  'Pending': 'pending',
};

export default function Orders() {
  const { orders, loading, error, refetch, createOrder, updateOrder, deleteOrder } = useOrders();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (activeDropdown && !(e.target as HTMLElement).closest('[data-dropdown]')) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [activeDropdown]);

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (activeFilter !== 'All') {
      result = result.filter((o) => o.status === STATUS_MAP[activeFilter]);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.client_name.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q) ||
          o.service_name.toLowerCase().includes(q),
      );
    }
    return result;
  }, [orders, activeFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = orders.length;
    const inProgress = orders.filter((o) => o.status === 'in-progress').length;
    const completed = orders.filter((o) => o.status === 'completed').length;
    const revenue = orders.filter((o) => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);
    return { total, inProgress, completed, revenue };
  }, [orders]);

  function openEdit(order: Order) {
    setActiveDropdown(null);
    setEditingOrder(order);
    setShowEditModal(true);
  }

  function openDelete(order: Order) {
    setActiveDropdown(null);
    setDeletingOrder(order);
    setShowDeleteModal(true);
  }

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (orders.length === 0) return <EmptyState onNewOrder={() => setShowNewModal(true)} />;

  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Orders</h1>
          <p className="text-[15px] text-gray-500">Track and manage all customer orders.</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Order</span>
        </button>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: stats.total.toLocaleString(), icon: '📦' },
          { label: 'In Progress', value: String(stats.inProgress), icon: '🔄' },
          { label: 'Completed', value: stats.completed.toLocaleString(), icon: '✅' },
          { label: 'Revenue', value: formatAmount(stats.revenue), icon: '💰' },
        ].map((stat) => (
          <div key={stat.label} className="dash-stat-card">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
          </div>
        ))}
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${activeFilter === filter ? 'bg-royal-blue text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Service</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Priority</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-royal-blue">{formatOrderId(order.id)}</div>
                    <div className="text-xs text-gray-400">{formatDate(order.created_at)}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-deep-black">{order.client_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{order.service_name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getPriorityClasses(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-deep-black">{formatAmount(order.amount)}</td>
                  <td className="px-6 py-4">
                    <div className="relative" data-dropdown>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === order.id ? null : order.id);
                        }}
                        className="p-1 rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {activeDropdown === order.id && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); openEdit(order); }}
                            className="w-full text-left px-3 py-2 text-sm text-deep-black hover:bg-gray-50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); openDelete(order); }}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <OrderFormModal
        open={showNewModal}
        title="New Order"
        initialClient=""
        initialService=""
        initialStatus="pending"
        initialPriority="medium"
        initialAmount={0}
        submitLabel="Create Order"
        onClose={() => setShowNewModal(false)}
        onSubmit={(input) => createOrder(input)}
        onDone={refetch}
      />

      <OrderFormModal
        open={showEditModal}
        title="Edit Order"
        initialClient={editingOrder?.client_id ?? ''}
        initialService={editingOrder?.service_id ?? ''}
        initialStatus={editingOrder?.status ?? 'pending'}
        initialPriority={editingOrder?.priority ?? 'medium'}
        initialAmount={editingOrder?.amount ?? 0}
        submitLabel="Save Changes"
        onClose={() => { setShowEditModal(false); setEditingOrder(null); }}
        onSubmit={(input) => editingOrder ? updateOrder(editingOrder.id, input) : Promise.resolve()}
        onDone={refetch}
      />

      <DeleteConfirmModal
        open={showDeleteModal}
        order={deletingOrder}
        onClose={() => { setShowDeleteModal(false); setDeletingOrder(null); }}
        onConfirm={(id) => deleteOrder(id)}
        onDone={refetch}
      />
    </>
  );
}
