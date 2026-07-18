import { useInView } from '../hooks/useInView';
import WidgetDemo from './WidgetDemo';

function BentoCard({ children, className = '', span }: { children: React.ReactNode; className?: string; span?: string }) {
  const { ref, isInView } = useInView(0.08);

  return (
    <div
      ref={ref}
      className={`bento-card group ${span || ''} ${className} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
}

const FileRow = ({ name, size }: { name: string; size: string }) => (
  <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white border border-gray-100">
    <div className="flex items-center gap-2">
      <svg className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
      <span className="text-[12px] font-medium text-gray-700 truncate">{name}</span>
    </div>
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="text-[10px] text-gray-400">{size}</span>
      <svg className="h-3.5 w-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
);

export default function Features() {
  const { ref: miniRef, isInView: miniInView } = useInView(0.1);

  return (
    <section id="features" className="relative px-6 py-24 md:px-12 lg:px-24 lg:py-28 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-royal-blue/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-blue/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal-blue/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-4 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-black mb-4 tracking-tight leading-[1.15]">
            Everything You Need to Build<br className="hidden md:block" /> and Scale Your AI Workforce
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Powerful tools to create, train, deploy, monitor, and optimize AI agents from one unified platform.
          </p>
        </div>

        {/* ═══ Bento Grid ═══ */}
        <div className="bento-grid mb-10">

          {/* ── AI Knowledge Base — wide card, top-left ── */}
          <BentoCard span="bento-kb" className="p-7 md:p-8 flex flex-col justify-between">
            <div className="mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-4 transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-deep-black mb-1.5 tracking-tight">AI Knowledge Base</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed">Train your AI on your products, services, policies, and FAQs for accurate, context-aware answers.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Uploaded Files</span>
                <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">4 files</span>
              </div>
              <FileRow name="FAQ.pdf" size="2.4 MB" />
              <FileRow name="Services.pdf" size="1.8 MB" />
              <FileRow name="Pricing.pdf" size="0.6 MB" />
              <FileRow name="Company Policies.pdf" size="3.1 MB" />
            </div>
          </BentoCard>

          {/* ── Website Widget — tall card, right column ── */}
          <BentoCard span="bento-widget" className="!p-0 flex flex-col">
            <WidgetDemo />
          </BentoCard>

          {/* ── Analytics Dashboard — bottom-left ── */}
          <BentoCard span="bento-analytics" className="p-7 md:p-8 flex flex-col justify-between">
            <div className="mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-4 transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-deep-black mb-1.5 tracking-tight">Analytics Dashboard</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed">Track conversations, resolution rates, and satisfaction in real time.</p>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white border border-gray-100 p-2.5 text-center">
                  <p className="text-[9px] text-gray-400 mb-0.5 uppercase tracking-wider">Responses</p>
                  <p className="text-base font-bold text-deep-black">2.4k</p>
                  <p className="text-[9px] text-emerald-500 font-medium">+12%</p>
                </div>
                <div className="rounded-xl bg-white border border-gray-100 p-2.5 text-center">
                  <p className="text-[9px] text-gray-400 mb-0.5 uppercase tracking-wider">Avg Time</p>
                  <p className="text-base font-bold text-deep-black">1.2s</p>
                  <p className="text-[9px] text-emerald-500 font-medium">-18%</p>
                </div>
                <div className="rounded-xl bg-white border border-gray-100 p-2.5 text-center">
                  <p className="text-[9px] text-gray-400 mb-0.5 uppercase tracking-wider">CSAT</p>
                  <p className="text-base font-bold text-emerald-600">98%</p>
                  <p className="text-[9px] text-emerald-500 font-medium">+3%</p>
                </div>
              </div>
              <div className="rounded-xl bg-white border border-gray-100 p-3">
                <div className="flex items-end gap-[3px] h-14">
                  {[35, 55, 40, 70, 50, 85, 60, 90, 45, 75, 65, 100].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-royal-blue/70 to-royal-blue-light/70" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ── Human Handoff — bottom-center ── */}
          <BentoCard span="bento-handoff" className="p-7 md:p-8 flex flex-col justify-between">
            <div className="mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-4 transition-all duration-[250ms] group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-deep-black mb-1.5 tracking-tight">Human Handoff</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed">Seamless transfer to human agents when AI confidence drops.</p>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm w-full">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center text-white text-[10px] font-bold shrink-0">AI</div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-deep-black leading-tight">AI Agent</p>
                  <p className="text-[10px] text-gray-400">Handling</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <svg className="h-4 w-4 text-royal-blue/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-emerald-200 shadow-sm w-full">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shrink-0">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-deep-black leading-tight">Human Agent</p>
                  <p className="text-[10px] text-emerald-500 font-medium">Connected ✓</p>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* ═══ Secondary Features ═══ */}
        <div
          ref={miniRef}
          className={`transition-all duration-700 ease-out ${miniInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="bento-secondary">
            {[
              { label: 'Easy Setup', sub: 'Live in under 5 minutes', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
              { label: 'Multi-language', sub: '95+ languages, auto-detected', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg> },
              { label: 'Conversation History', sub: 'Transcripts with timestamps', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg> },
              { label: 'Enterprise Security', sub: 'SOC 2, 256-bit, GDPR', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/[0.06] text-royal-blue shrink-0">{f.icon}</div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-deep-black truncate">{f.label}</p>
                  <p className="text-[11px] text-gray-400 truncate">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#" className="inline-flex items-center gap-2 text-[14px] font-medium text-royal-blue hover:text-royal-blue-dark transition-colors duration-200 group">
              View all features
              <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
