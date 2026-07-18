import { useEffect, useRef, useState, useCallback } from 'react';
import { Bot, MessageSquare, CalendarDays, Timer, Star, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

function useCountUp(end: number, duration: number = 1200, active: boolean = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * end;
      setValue(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [end, duration, active]);
  return value;
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const ICON_SIZE = 20;
const ICON_STROKE = 1.5;

const statsConfig = [
  { label: 'Active Agents', value: 12, displayPrefix: '', displaySuffix: '', change: '+3 this week', positive: true, Icon: Bot },
  { label: 'Conversations', value: 8247, displayPrefix: '', displaySuffix: '', change: '+24% vs last month', positive: true, Icon: MessageSquare, format: true },
  { label: 'Bookings', value: 1892, displayPrefix: '', displaySuffix: '', change: '+18% vs last month', positive: true, Icon: CalendarDays, format: true },
  { label: 'Response Time', value: 0.8, displayPrefix: '', displaySuffix: 's', change: '-15% improvement', positive: false, Icon: Timer },
  { label: 'Customer Satisfaction', value: 4.9, displayPrefix: '', displaySuffix: '/5', change: '+0.3 this quarter', positive: true, Icon: Star },
];

const chartData = [
  { day: 'Mon', value: 120 },
  { day: 'Tue', value: 195 },
  { day: 'Wed', value: 140 },
  { day: 'Thu', value: 240 },
  { day: 'Fri', value: 170 },
  { day: 'Sat', value: 210 },
  { day: 'Sun', value: 270 },
];

const recentActivity = [
  { agent: 'Customer Agent', action: 'Resolved inquiry', time: '2m ago', status: 'success' },
  { agent: 'Sales Agent', action: 'Qualified lead', time: '5m ago', status: 'success' },
  { agent: 'Booking Agent', action: 'Scheduled appointment', time: '8m ago', status: 'success' },
  { agent: 'Support Agent', action: 'Escalated to human', time: '12m ago', status: 'warning' },
  { agent: 'Customer Agent', action: 'Answered FAQ', time: '15m ago', status: 'success' },
];

function formatNumber(n: number): string {
  if (n >= 1000) return n.toLocaleString('en-US');
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 10) / 10);
}

function StatCard({ stat, visible }: { stat: typeof statsConfig[number]; visible: boolean }) {
  const count = useCountUp(stat.value, 1200, visible);
  const display = stat.format
    ? formatNumber(Math.round(count))
    : stat.displaySuffix
      ? count.toFixed(1)
      : formatNumber(Math.round(count));

  const valueText = stat.displaySuffix ? `${display}${stat.displaySuffix}` : display;

  return (
    <div
      className="group p-4 rounded-xl border border-gray-100 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(30,64,175,0.12)] hover:border-royal-blue-light"
      style={{ transitionDuration: '200ms' }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#F8FAFC]">
          <stat.Icon size={ICON_SIZE} strokeWidth={ICON_STROKE} className="text-royal-blue" />
        </div>
        <span className="text-xs text-gray-500">{stat.label}</span>
      </div>
      <p className="text-2xl font-bold text-deep-black">{valueText}</p>
      <div className="flex items-center gap-1 mt-1">
        {stat.positive ? (
          <ArrowUpRight size={12} strokeWidth={2} className="text-emerald-500" />
        ) : (
          <ArrowDownRight size={12} strokeWidth={2} className="text-red-500" />
        )}
        <p className={`text-xs font-medium ${stat.positive ? 'text-emerald-600' : 'text-red-500'}`}>{stat.change}</p>
      </div>
    </div>
  );
}

function LineChart({ visible }: { visible: boolean }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; day: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const padding = { top: 16, right: 16, bottom: 32, left: 16 };
  const width = 500;
  const height = 140;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = Math.max(...chartData.map(d => d.value));
  const minVal = Math.min(...chartData.map(d => d.value)) * 0.8;
  const range = maxVal - minVal;

  const points = chartData.map((d, i) => ({
    x: padding.left + (i / (chartData.length - 1)) * chartW,
    y: padding.top + chartH - ((d.value - minVal) / range) * chartH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  const totalLength = 800;

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scaleX = width / rect.width;
    const mx = mouseX * scaleX;
    let closest = points[0];
    let minDist = Infinity;
    for (const p of points) {
      const dist = Math.abs(p.x - mx);
      if (dist < minDist) { minDist = dist; closest = p; }
    }
    setTooltip({ x: closest.x, y: closest.y, value: closest.value, day: closest.day });
  }, [points, width]);

  const gridLines = 4;
  const gridYValues = Array.from({ length: gridLines }, (_, i) => padding.top + (i / (gridLines - 1)) * chartH);

  return (
    <div className="mt-6 p-4 rounded-xl border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-deep-black">Conversations this week</span>
        <span className="text-xs text-gray-500">Last 7 days</span>
      </div>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-32"
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>

          {gridYValues.map((y, i) => (
            <line key={i} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#F3F4F6" strokeWidth={1} />
          ))}

          <path d={areaPath} fill="url(#lineGrad)" opacity={visible ? 1 : 0} style={{ transition: 'opacity 0.6s ease 0.3s' }} />

          <path
            d={linePath}
            fill="none"
            stroke="url(#strokeGrad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLength}
            strokeDashoffset={visible ? 0 : totalLength}
            style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s` }}
          />

          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="white"
              stroke="#1E40AF"
              strokeWidth={2}
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${0.8 + i * 0.08}s` }}
            />
          ))}

          {points.map((p, i) => (
            <text key={i} x={p.x} y={padding.top + chartH + 18} textAnchor="middle" className="fill-gray-400" fontSize={10} fontFamily="Inter, system-ui, sans-serif">
              {p.day}
            </text>
          ))}

          {tooltip && (
            <>
              <line x1={tooltip.x} y1={padding.top} x2={tooltip.x} y2={padding.top + chartH} stroke="#1E40AF" strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
              <circle cx={tooltip.x} cy={tooltip.y} r={5} fill="#1E40AF" stroke="white" strokeWidth={2} />
            </>
          )}
        </svg>

        {tooltip && (
          <div
            className="absolute pointer-events-none bg-deep-black text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg z-10"
            style={{
              left: `${(tooltip.x / width) * 100}%`,
              top: `${(tooltip.y / height) * 100 - 18}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {tooltip.value.toLocaleString()} conversations
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const { ref: sectionRef, visible } = useInView(0.2);

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-royal-blue tracking-wide uppercase mb-4 block">Dashboard</span>
          <h2 className="heading-lg text-deep-black mb-4">
            Powerful analytics at your fingertips
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Monitor your AI agents' performance with real-time insights and comprehensive analytics.
          </p>
        </div>

        <div ref={sectionRef} className="relative">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/favicon.png?v=4" alt="Nagriva" width={32} height={32} className="h-8 w-8 rounded-[50%] object-contain" />
                  <span className="text-sm font-semibold text-deep-black">Nagriva Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <span className="text-sm text-gray-500">Search...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-royal-blue flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">JD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              <div className="lg:col-span-2 p-6">
                <h3 className="text-sm font-semibold text-deep-black mb-4">Performance Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {statsConfig.map((stat) => (
                    <StatCard key={stat.label} stat={stat} visible={visible} />
                  ))}
                </div>

                <LineChart visible={visible} />
              </div>

              <div className="p-6">
                <h3 className="text-sm font-semibold text-deep-black mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                        activity.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-deep-black truncate">{activity.action}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500">{activity.agent}</span>
                          <span className="text-xs text-gray-300">·</span>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  View all activity
                </button>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg hidden lg:block">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">This Month</p>
                <p className="text-2xl font-bold text-deep-black">$24.5k</p>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp size={14} strokeWidth={2} className="text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">+32%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
