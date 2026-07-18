import { ArrowUpRight, Users, ShoppingCart, Bot, FileText, DollarSign, RefreshCw, TrendingUp, Clock, Globe } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

function formatAmount(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function LoadingSkeleton() {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Analytics</h1>
          <p className="text-[15px] text-gray-500">Monitor your platform performance and user engagement.</p>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-10 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="dash-stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-7 w-20 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-24 bg-gray-100 rounded mt-1 animate-pulse" />
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-10 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="h-4 w-40 bg-gray-100 rounded animate-pulse mb-6" />
        <div className="h-48 bg-gray-50 rounded-lg animate-pulse" />
      </div>
    </>
  );
}

function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Analytics</h1>
          <p className="text-[15px] text-gray-500">Monitor your platform performance and user engagement.</p>
        </div>
      </section>

      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gray-100 mx-auto mb-4">
          <TrendingUp className="w-7 h-7 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-deep-black mb-1">No analytics data yet</h3>
        <p className="text-sm text-gray-500 mb-4">Add clients, orders, or services to see your analytics.</p>
        <button onClick={onRetry} className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    </>
  );
}

export default function Analytics() {
  const analytics = useAnalytics();

  if (analytics.loading) return <LoadingSkeleton />;

  if (analytics.error) {
    return (
      <>
        <section className="flex items-center justify-between gap-4 py-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Analytics</h1>
            <p className="text-[15px] text-gray-500">Monitor your platform performance and user engagement.</p>
          </div>
        </section>
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-red-50 mx-auto mb-4">
            <TrendingUp className="w-7 h-7 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-deep-black mb-1">Failed to load analytics</h3>
          <p className="text-sm text-gray-500 mb-4">{analytics.error}</p>
          <button onClick={analytics.refetch} className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </>
    );
  }

  const hasData = analytics.totalClients > 0 || analytics.totalOrders > 0 || analytics.totalServices > 0 || analytics.publishedPosts > 0;
  if (!hasData) return <EmptyState onRetry={analytics.refetch} />;

  const totalRevenue = analytics.totalRevenue;
  const topServices = analytics.topServices.slice(0, 5);
  const topClients = analytics.topClients.slice(0, 5);

  const orderStatusTotal = analytics.pendingOrders + analytics.completedOrders + analytics.inProgressOrders || 1;
  const orderStatus = [
    { label: 'Pending', count: analytics.pendingOrders, percentage: Math.round((analytics.pendingOrders / orderStatusTotal) * 100), color: 'bg-amber-500' },
    { label: 'Completed', count: analytics.completedOrders, percentage: Math.round((analytics.completedOrders / orderStatusTotal) * 100), color: 'bg-emerald-500' },
    { label: 'In Progress', count: analytics.inProgressOrders, percentage: Math.round((analytics.inProgressOrders / orderStatusTotal) * 100), color: 'bg-royal-blue' },
  ];

  const recentActivity = analytics.recentActivity.slice(0, 5);

  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Analytics</h1>
          <p className="text-[15px] text-gray-500">Monitor your platform performance and user engagement.</p>
        </div>
        <div className="flex items-center gap-2">
          {['7d', '30d', '90d'].map((period, i) => (
            <button
              key={period}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${i === 1 ? 'bg-royal-blue text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {period}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <Users className="w-[18px] h-[18px] text-royal-blue" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{analytics.totalClients}</div>
          <div className="text-xs text-gray-500 mt-0.5">Total Clients</div>
        </div>

        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <ShoppingCart className="w-[18px] h-[18px] text-royal-blue" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{analytics.totalOrders}</div>
          <div className="text-xs text-gray-500 mt-0.5">Total Orders</div>
        </div>

        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <Bot className="w-[18px] h-[18px] text-royal-blue" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{analytics.totalServices}</div>
          <div className="text-xs text-gray-500 mt-0.5">Total AI Employees</div>
        </div>

        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <FileText className="w-[18px] h-[18px] text-royal-blue" />
            </div>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{analytics.publishedPosts}</div>
          <div className="text-xs text-gray-500 mt-0.5">Published Blog Posts</div>
        </div>
      </section>

      {/* Revenue card */}
      <section className="grid grid-cols-1">
        <div className="dash-stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC] border border-gray-100">
              <DollarSign className="w-[18px] h-[18px] text-emerald-600" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="w-3 h-3" />
              Revenue
            </span>
          </div>
          <div className="text-2xl font-bold text-deep-black tracking-tight">{formatAmount(totalRevenue)}</div>
          <div className="text-xs text-gray-500 mt-0.5">Total Revenue from Orders</div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        {/* Top Services */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-deep-black">Top Services</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topServices.length > 0 ? topServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50/50">
                <div className="min-w-0 mr-4">
                  <div className="text-sm font-medium text-deep-black truncate">{service.name}</div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-deep-black">{service.count}</div>
                    <div className="text-xs text-gray-400">orders</div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-gray-500">No service orders yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-deep-black">Order Status</h2>
          </div>
          <div className="p-6 space-y-4">
            {orderStatus.map((status) => (
              <div key={status.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-deep-black">{status.label}</span>
                  <span className="text-sm font-semibold text-deep-black">{status.count} ({status.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${status.color} transition-all duration-500`}
                    style={{ width: `${status.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Clients + Recent Activity */}
      <section className="grid lg:grid-cols-2 gap-5">
        {/* Top Clients */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-deep-black">Top Clients</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topClients.length > 0 ? topClients.map((client) => (
              <div key={client.name} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50/50">
                <div className="min-w-0 mr-4">
                  <div className="text-sm font-medium text-deep-black truncate">{client.name}</div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-deep-black">{client.count}</div>
                    <div className="text-xs text-gray-400">orders</div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-gray-500">No client orders yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-deep-black">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
              <div key={`${activity.type}-${i}`} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50/50">
                <div className="min-w-0 mr-4">
                  <div className="text-sm font-medium text-deep-black truncate">{activity.label}</div>
                  <div className="text-xs text-gray-400">{activity.type}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{formatDate(activity.date)}</span>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-gray-500">No recent activity.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Website analytics placeholder */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-deep-black">Website Analytics</h2>
          <span className="text-xs text-gray-400">Last 30 days</span>
        </div>
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <div className="text-center">
            <Globe className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-500">Website analytics not connected yet.</p>
          </div>
        </div>
      </div>
    </>
  );
}
