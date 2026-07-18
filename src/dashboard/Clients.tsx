import { Search, Plus, Mail, MoreHorizontal } from 'lucide-react';
import { useClients } from '../hooks/useClients';

function getStatusClasses(status: string) {
  return status === 'active'
    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    : 'bg-gray-50 text-gray-500 border border-gray-200';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ── Loading Skeleton ── */

function LoadingSkeleton() {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Clients</h1>
          <p className="text-[15px] text-gray-500">Manage your client relationships and accounts.</p>
        </div>
        <div className="h-10 w-28 bg-gray-100 rounded-lg animate-pulse" />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="dash-stat-card">
            <div className="h-7 w-16 bg-gray-100 rounded animate-pulse mb-1" />
            <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
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
              <div className="h-9 w-9 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
              <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-28 bg-gray-100 rounded animate-pulse hidden md:block" />
              <div className="h-5 w-14 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-4 w-24 bg-gray-100 rounded animate-pulse hidden lg:block ml-auto" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ── Empty State ── */

function EmptyState() {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Clients</h1>
          <p className="text-[15px] text-gray-500">Manage your client relationships and accounts.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Client</span>
        </button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Clients', value: '0', change: 'No clients yet' },
          { label: 'Active', value: '0', change: '0% active rate' },
          { label: 'Inactive', value: '0', change: 'No inactive clients' },
        ].map((stat) => (
          <div key={stat.label} className="dash-stat-card">
            <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            <div className="text-xs text-royal-blue mt-1">{stat.change}</div>
          </div>
        ))}
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Plus className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">No clients yet</h3>
        <p className="text-sm text-gray-500 mb-4">Add your first client to get started.</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          Add Client
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
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Clients</h1>
          <p className="text-[15px] text-gray-500">Manage your client relationships and accounts.</p>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">Failed to load clients</h3>
        <p className="text-sm text-gray-500 mb-4">Something went wrong while fetching your clients.</p>
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

/* ── Main Component ── */

export default function Clients() {
  const { clients, loading, error, refetch } = useClients();

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (clients.length === 0) return <EmptyState />;

  const activeCount = clients.filter((c) => c.status === 'active').length;
  const inactiveCount = clients.length - activeCount;
  const activePercent = clients.length > 0 ? Math.round((activeCount / clients.length) * 100) : 0;

  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Clients</h1>
          <p className="text-[15px] text-gray-500">Manage your client relationships and accounts.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Client</span>
        </button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Clients', value: String(clients.length), change: 'All time' },
          { label: 'Active', value: String(activeCount), change: `${activePercent}% active rate` },
          { label: 'Inactive', value: String(inactiveCount), change: inactiveCount === 0 ? 'None' : `${inactiveCount} total` },
        ].map((stat) => (
          <div key={stat.label} className="dash-stat-card">
            <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            <div className="text-xs text-royal-blue mt-1">{stat.change}</div>
          </div>
        ))}
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Company</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Website</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell">Joined</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((client) => (
                <tr key={client.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex-shrink-0">
                        {getInitials(client.full_name)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-deep-black">{client.full_name}</div>
                        <div className="text-xs text-gray-500">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{client.phone || '—'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-deep-black hidden lg:table-cell">{client.company_name || '—'}</td>
                  <td className="px-6 py-4 text-sm text-deep-black hidden lg:table-cell">{client.website || '—'}</td>
                  <td className="px-6 py-4 text-xs text-gray-500 hidden xl:table-cell">{formatDate(client.created_at)}</td>
                  <td className="px-6 py-4">
                    <button className="p-1 rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
