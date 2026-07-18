import { Plus, Bot, MessageSquare, Globe, BarChart3, Settings, Zap } from 'lucide-react';
import { useServices } from '../hooks/useServices';

const SERVICE_ICONS = [Bot, MessageSquare, Globe, BarChart3, Zap, Settings] as const;
const SERVICE_COLORS = [
  'bg-blue-50 text-royal-blue',
  'bg-emerald-50 text-emerald-600',
  'bg-violet-50 text-violet-600',
  'bg-amber-50 text-amber-600',
  'bg-rose-50 text-rose-600',
  'bg-gray-50 text-gray-600',
];

function formatPrice(price: number | string): string {
  if (typeof price === 'string') return price;
  return `$${Math.round(price).toLocaleString()}`;
}

function LoadingSkeleton() {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Services</h1>
          <p className="text-[15px] text-gray-500">Manage your AI service offerings and packages.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Service</span>
        </button>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="dash-stat-card">
            <div className="h-7 w-20 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-24 bg-gray-100 rounded mt-1 animate-pulse" />
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-5 w-12 bg-gray-100 rounded-full animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-gray-100 rounded mb-2 animate-pulse" />
            <div className="h-3 w-full bg-gray-100 rounded mb-1 animate-pulse" />
            <div className="h-3 w-3/4 bg-gray-100 rounded mb-4 animate-pulse" />
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="h-5 w-16 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Services</h1>
          <p className="text-[15px] text-gray-500">Manage your AI service offerings and packages.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Service</span>
        </button>
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">Failed to load services</h3>
        <p className="text-sm text-gray-500 mb-4">Something went wrong while fetching your services.</p>
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

function EmptyState() {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Services</h1>
          <p className="text-[15px] text-gray-500">Manage your AI service offerings and packages.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Service</span>
        </button>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Active Services', value: '0' },
          { label: 'Total Clients', value: '0' },
          { label: 'Monthly Revenue', value: '$0' },
        ].map((stat) => (
          <div key={stat.label} className="dash-stat-card">
            <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Plus className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">No services yet</h3>
        <p className="text-sm text-gray-500 mb-4">Create your first service to get started.</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          Create Service
        </button>
      </div>
    </>
  );
}

export default function Services() {
  const { services, loading, error, refetch } = useServices();

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (services.length === 0) return <EmptyState />;

  const activeCount = services.filter((s) => s.status === 'active').length;

  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Services</h1>
          <p className="text-[15px] text-gray-500">Manage your AI service offerings and packages.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Service</span>
        </button>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Active Services', value: String(activeCount) },
          { label: 'Total Clients', value: '0' },
          { label: 'Monthly Revenue', value: '$0' },
        ].map((stat) => (
          <div key={stat.label} className="dash-stat-card">
            <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map((service, index) => {
          const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
          const color = SERVICE_COLORS[index % SERVICE_COLORS.length];
          return (
            <div key={service.id} className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {service.status === 'beta' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                    Beta
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Active
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-deep-black mb-1">{service.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-lg font-bold text-deep-black">{formatPrice(service.price)}</span>
                  <span className="text-xs text-gray-400 ml-1">/ project</span>
                </div>
                <span className="text-xs text-gray-500">0 clients</span>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
