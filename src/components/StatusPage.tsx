import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Code2,
  CreditCard,
  Globe,
  HelpCircle,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Server,
  Shield,
  Users,
  Webhook,
  BarChart3,
  Zap,
  Bell,
  BookOpen,
  ChevronDown,
  Wifi,
  Timer,
  TrendingUp,
  Heart,
} from 'lucide-react';
import Footer from './Footer';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function RevealBlock({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Types ────────────────────────────────────────────────────────────── */

type ServiceStatus = 'operational' | 'degraded' | 'maintenance' | 'incident' | 'resolved';

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function StatusPage() {
  useEffect(() => {
    document.title = 'Nagriva Operations Center | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Monitor the health of the entire Nagriva Platform in real-time. View live services, metrics, incidents, and system activity.');
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <ServicesSection />
        <HeartbeatSection />
        <ActivitySection />
        <IncidentsSection />
        <MetricsSection />
        <EmergencyStatesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero Section ────────────────────────────────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);
  const [lastChecked] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-emerald-500/[0.02] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            <span className="text-royal-blue">Nagriva</span>{' '}
            Operations Center
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Real-time visibility into the health and performance of every Nagriva service.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>Last checked <strong className="text-deep-black">{lastChecked}</strong></span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span>Uptime <strong className="text-deep-black">99.99%</strong></span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
            <Heart className="h-4 w-4 text-emerald-500" />
            <span>System Health <strong className="text-emerald-600">Healthy</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Live Services ───────────────────────────────────────────────────── */

function ServicesSection() {
  const services = [
    { icon: Users, name: 'AI Employees', status: 'operational' as ServiceStatus, latency: '24ms', lastChecked: '2 min ago' },
    { icon: Shield, name: 'Authentication', status: 'operational' as ServiceStatus, latency: '18ms', lastChecked: '2 min ago' },
    { icon: LayoutDashboard, name: 'Dashboard', status: 'operational' as ServiceStatus, latency: '31ms', lastChecked: '2 min ago' },
    { icon: BookOpen, name: 'Knowledge Base', status: 'operational' as ServiceStatus, latency: '42ms', lastChecked: '2 min ago' },
    { icon: Code2, name: 'API', status: 'operational' as ServiceStatus, latency: '15ms', lastChecked: '2 min ago' },
    { icon: CreditCard, name: 'Billing', status: 'operational' as ServiceStatus, latency: '28ms', lastChecked: '2 min ago' },
    { icon: BarChart3, name: 'Analytics', status: 'operational' as ServiceStatus, latency: '35ms', lastChecked: '2 min ago' },
    { icon: Globe, name: 'Website', status: 'operational' as ServiceStatus, latency: '12ms', lastChecked: '2 min ago' },
    { icon: Bell, name: 'Notifications', status: 'operational' as ServiceStatus, latency: '22ms', lastChecked: '2 min ago' },
    { icon: MessageSquare, name: 'Support', status: 'operational' as ServiceStatus, latency: '19ms', lastChecked: '2 min ago' },
  ];

  const statusConfig: Record<ServiceStatus, { bg: string; border: string; text: string; dot: string; label: string }> = {
    operational: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Operational' },
    degraded: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Degraded' },
    maintenance: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Maintenance' },
    incident: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'Incident' },
    resolved: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Resolved' },
  };

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Services
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Live Services</h2>
            <p className="text-body max-w-2xl mx-auto">
              Current status and performance of every Nagriva platform service.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_100px_120px_100px] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Service</span>
              <span>Status</span>
              <span>Latency</span>
              <span>Last Checked</span>
            </div>
            {services.map((service, i) => {
              const sc = statusConfig[service.status];
              return (
                <RevealBlock key={service.name} delay={i * 40}>
                  <div className={`grid grid-cols-1 sm:grid-cols-[1fr_100px_120px_100px] gap-3 sm:gap-4 items-center px-6 py-4 ${i < services.length - 1 ? 'border-b border-gray-100' : ''} transition-colors duration-200 hover:bg-gray-50/50`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue shrink-0">
                        <service.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold text-deep-black">{service.name}</span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${sc.bg} border ${sc.border} rounded-full text-xs font-medium ${sc.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Timer className="h-3.5 w-3.5 text-gray-400" />
                      {service.latency}
                    </div>
                    <div className="text-sm text-gray-400">{service.lastChecked}</div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Live Heartbeat ──────────────────────────────────────────────────── */

function HeartbeatSection() {
  const { ref, isInView } = useInView(0.1);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => (p + 1) % 100), 50);
    return () => clearInterval(interval);
  }, []);

  const heartbeatPoints = Array.from({ length: 60 }, (_, i) => {
    const x = (i / 59) * 100;
    const phase = (i + pulse) * 0.15;
    const base = 50;
    const spike = Math.sin(phase) * 25 * Math.exp(-((i % 20 - 10) ** 2) / 20);
    return { x, y: base - spike };
  });

  const pathD = heartbeatPoints.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = heartbeatPoints[i - 1];
    const cpx = (prev.x + point.x) / 2;
    return `${acc} C ${cpx} ${prev.y}, ${cpx} ${point.y}, ${point.x} ${point.y}`;
  }, '');

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Monitoring
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Live Heartbeat</h2>
          </div>
        </RevealBlock>

        <RevealBlock>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-12 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-deep-black mb-1">Platform Health</h3>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-600">Healthy</span>
                    <span className="text-xs text-gray-400 ml-1">Updated Live</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-bold text-emerald-700">99.99%</span>
                </div>
              </div>

              <div ref={ref} className="relative h-48 sm:h-56">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="heartbeatGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${pathD} L 100 100 L 0 100 Z`} fill="url(#heartbeatGrad)" />
                  <path d={pathD} fill="none" stroke="rgb(16,185,129)" strokeWidth="0.4" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isInView && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">Waiting for signal...</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 text-xs text-gray-400">
                <span>60s ago</span>
                <span>30s ago</span>
                <span>Now</span>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Live Activity ───────────────────────────────────────────────────── */

function ActivitySection() {
  const activities = [
    { icon: CheckCircle2, title: 'Deployment completed', detail: 'v2.4.1 rolled out to production', time: '3 min ago', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Shield, title: 'Security scan completed', detail: 'Full platform scan — no vulnerabilities found', time: '12 min ago', color: 'text-royal-blue', bg: 'bg-royal-blue/[0.06]' },
    { icon: Server, title: 'Backup finished', detail: 'Automated daily backup — 2.4 GB secured', time: '28 min ago', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Activity, title: 'Monitoring active', detail: 'All 10 services reporting normally', time: '1 min ago', color: 'text-royal-blue', bg: 'bg-royal-blue/[0.06]' },
    { icon: Wifi, title: 'Network health check', detail: 'Latency within threshold across all regions', time: '5 min ago', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Zap, title: 'Auto-scaling triggered', detail: 'API cluster scaled to 4 instances', time: '18 min ago', color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Activity
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Live Activity</h2>
            <p className="text-body max-w-2xl mx-auto">
              A real-time feed of platform operations and automated tasks.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-1">
              {activities.map((activity, i) => (
                <RevealBlock key={i} delay={i * 60}>
                  <div className="relative flex items-start gap-5 py-4">
                    <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl ${activity.bg} ${activity.color} shrink-0`}>
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-3 mb-0.5">
                        <h3 className="text-sm font-semibold text-deep-black">{activity.title}</h3>
                        <span className="text-xs text-gray-400 shrink-0">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">{activity.detail}</p>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Recent Incidents ────────────────────────────────────────────────── */

function IncidentsSection() {
  const [showHistory, setShowHistory] = useState(false);

  const pastIncidents = [
    { date: 'June 28, 2026', title: 'API Latency Spike', duration: '12 min', status: 'resolved', description: 'Elevated API response times due to database connection pool exhaustion. Resolved by scaling connection pool.' },
    { date: 'June 15, 2026', title: 'Dashboard Login Issues', duration: '8 min', status: 'resolved', description: 'Intermittent login failures for a subset of users. Caused by expired session tokens after deployment.' },
    { date: 'May 30, 2026', title: 'Notification Delays', duration: '22 min', status: 'resolved', description: 'Email notifications were delayed due to a temporary SMTP provider outage.' },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Incidents
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Recent Incidents</h2>
          </div>
        </RevealBlock>

        <RevealBlock>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-12 text-center mb-6">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50">
                <CheckCircle2 className="h-9 w-9 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-deep-black mb-2">No Active Incidents</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                All systems are running smoothly. No incidents are currently being investigated.
              </p>
            </div>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between p-5 rounded-2xl border border-gray-200 bg-white text-left transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_4px_20px_-4px_rgba(30,64,175,0.08)]"
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-semibold text-deep-black">Incident History</span>
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-500">{pastIncidents.length}</span>
              </div>
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`} />
            </button>

            {showHistory && (
              <div className="mt-4 space-y-3">
                {pastIncidents.map((incident, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-royal-blue/20">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-deep-black mb-1">{incident.title}</h4>
                        <p className="text-xs text-gray-400">{incident.date} · {incident.duration}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-medium text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Resolved
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{incident.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Live Metrics ────────────────────────────────────────────────────── */

function MetricsSection() {
  const metrics = [
    { label: 'API Latency', value: '15ms', icon: Timer, color: 'text-royal-blue', bg: 'bg-royal-blue/[0.06]', sub: 'p95 response time' },
    { label: 'Uptime', value: '99.99%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', sub: 'Last 30 days' },
    { label: "Today's Requests", value: '1.2M', icon: BarChart3, color: 'text-royal-blue', bg: 'bg-royal-blue/[0.06]', sub: 'API calls processed' },
    { label: 'Healthy Services', value: '10/10', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', sub: 'All operational' },
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Metrics
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Live Metrics</h2>
            <p className="text-body max-w-2xl mx-auto">
              Key performance indicators across the Nagriva platform.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <RevealBlock key={metric.label} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${metric.bg} ${metric.color} transition-all duration-300 group-hover:scale-110 mb-4`}>
                  <metric.icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-deep-black mb-1">{metric.value}</p>
                <p className="text-xs text-gray-400">{metric.sub}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Emergency States ────────────────────────────────────────────────── */

function EmergencyStatesSection() {
  const states = [
    { label: 'Operational', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', description: 'All services functioning normally.' },
    { label: 'Maintenance', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500', description: 'Planned maintenance in progress.' },
    { label: 'Investigating', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', description: 'Team is investigating a potential issue.' },
    { label: 'Major Incident', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', description: 'Significant service disruption detected.' },
    { label: 'Resolved', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', description: 'Previous incident has been resolved.' },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Status States
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Emergency States</h2>
            <p className="text-body max-w-2xl mx-auto">
              The platform uses these states to communicate service health in real-time.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {states.map((state, i) => (
            <RevealBlock key={state.label} delay={i * 60}>
              <div className={`rounded-2xl border ${state.border} ${state.bg} p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`h-3 w-3 rounded-full ${state.dot}`} />
                  <span className={`text-sm font-bold ${state.text}`}>{state.label}</span>
                </div>
                <p className="text-sm text-gray-500">{state.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─────────────────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Need{' '}
                <span className="text-royal-blue">Help?</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                If you're experiencing an issue not listed here, our support team is ready to assist.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#/contact" className="btn-primary text-base px-8 py-3.5 gap-2">
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#/help-center" className="btn-secondary text-base px-8 py-3.5 gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help Center
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
