import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from '../hooks/useInView';

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function SectionHeader({ badge, title, titleLine2, description }: { badge: string; title: string; titleLine2?: string; description: string }) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div ref={ref} className={`text-center mb-16 md:mb-20 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
        {badge}
      </span>
      <h2 className="heading-lg text-deep-black mb-5">
        {title}
        {titleLine2 && <><br className="hidden md:block" />{titleLine2}</>}
      </h2>
      <p className="text-body max-w-2xl mx-auto">{description}</p>
    </div>
  );
}

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════ */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* Badge */}
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            Platform Features
          </span>
        </div>

        {/* Headline */}
        <div className={`text-center max-w-4xl mx-auto mb-10 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            The complete platform to build, deploy, and scale your{' '}
            <span className="text-royal-blue">AI workforce</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Every tool you need to create intelligent AI agents that handle customer conversations, automate workflows, and drive business results — all from one unified dashboard.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-20 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#" className="btn-primary text-base px-8 py-3.5">
            Start Free Trial
            <svg className="h-4 w-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a href="#" className="btn-secondary text-base px-8 py-3.5">
            Book a Demo
          </a>
        </div>

        {/* Dashboard Mockup */}
        <div className={`transition-all duration-900 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative max-w-5xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60 overflow-hidden">
              {/* Chrome bar */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-300" />
                  <div className="h-3 w-3 rounded-full bg-yellow-300" />
                  <div className="h-3 w-3 rounded-full bg-green-300" />
                </div>
                <div className="flex-1 flex items-center gap-2 mx-8 px-4 py-1.5 bg-white border border-gray-200 rounded-lg max-w-md">
                  <svg className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span className="text-xs text-gray-400">app.nagriva.ai/dashboard</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8">
                {/* Top row: stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Active Agents', value: '12', change: '+3', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
                    { label: 'Conversations', value: '8.2k', change: '+24%', icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' },
                    { label: 'Resolution Rate', value: '94%', change: '+5%', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Satisfaction', value: '4.9/5', change: '+0.3', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="h-4 w-4 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                        </svg>
                        <span className="text-[11px] text-gray-500 font-medium">{stat.label}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-deep-black">{stat.value}</span>
                        <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="rounded-xl border border-gray-100 p-5 bg-gray-50/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-deep-black">Agent Performance</span>
                    <div className="flex gap-1.5">
                      {['7D', '30D', '90D'].map((p, i) => (
                        <button key={p} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${i === 0 ? 'bg-royal-blue text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end gap-[6px] h-32 md:h-40">
                    {[30, 45, 38, 55, 42, 65, 50, 72, 58, 80, 62, 88, 48, 75, 68, 82, 55, 70, 78, 92, 60, 85, 72, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-royal-blue/80 to-royal-blue-light/60 transition-all duration-500" style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 md:-right-8 bg-white rounded-xl border border-gray-100 shadow-lg p-3 md:p-4 hidden md:block">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-deep-black">Live Now</p>
                  <p className="text-[10px] text-gray-500">847 active conversations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 — CORE FEATURES (Alternating)
   ═══════════════════════════════════════════ */

const coreFeatures = [
  {
    badge: 'AI Knowledge Base',
    title: 'Train your AI on everything you know',
    description: 'Upload documents, FAQs, product catalogs, policies, and procedures. Nagriva indexes your knowledge and delivers precise, context-aware answers to every customer question — no hallucinations, no guessing.',
    bullets: ['Upload PDFs, docs, URLs, and text', 'Automatic indexing and chunking', 'Always up-to-date with sync', 'Source citations for every answer'],
    visual: 'knowledge-base',
  },
  {
    badge: 'Website Widget',
    title: 'A chat experience your visitors will love',
    description: 'Deploy a beautifully designed AI widget on any website in minutes. Fully customizable to match your brand, it handles conversations 24/7, qualifies leads, and books meetings — all without human intervention.',
    bullets: ['Customizable colors, position, and branding', 'Embed with a single line of code', 'Mobile-responsive by default', 'Proactive messaging triggers'],
    visual: 'widget',
  },
  {
    badge: 'Human Handoff',
    title: 'Seamless escalation when it matters most',
    description: 'When AI confidence drops or a customer requests a human, Nagriva transfers the conversation seamlessly. The human agent gets full context, conversation history, and customer data — no repetition required.',
    bullets: ['Smart confidence-based routing', 'Full conversation context transfer', 'Real-time agent notifications', 'Queue management and SLA tracking'],
    visual: 'handoff',
  },
  {
    badge: 'Analytics Dashboard',
    title: 'Insights that drive smarter decisions',
    description: 'Track every metric that matters: conversation volume, resolution rates, response times, customer satisfaction, and agent performance. Beautiful charts and real-time data help you optimize your AI workforce continuously.',
    bullets: ['Real-time conversation metrics', 'CSAT and sentiment tracking', 'Agent performance leaderboards', 'Custom date ranges and exports'],
    visual: 'analytics',
  },
];

function CoreFeatureVisual({ type }: { type: string }) {
  if (type === 'knowledge-base') {
    return (
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 h-full">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-8 w-8 rounded-lg bg-royal-blue/[0.06] flex items-center justify-center">
            <svg className="h-4 w-4 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-deep-black">Knowledge Sources</span>
          <span className="ml-auto text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Synced</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: 'Product Catalog 2024.pdf', size: '4.2 MB', status: 'indexed' },
            { name: 'FAQ - Updated.docx', size: '1.8 MB', status: 'indexed' },
            { name: 'Pricing & Plans.pdf', size: '0.9 MB', status: 'indexed' },
            { name: 'Company Handbook.pdf', size: '6.1 MB', status: 'indexed' },
            { name: 'nagriva.ai/help', size: 'URL', status: 'synced' },
          ].map((file) => (
            <div key={file.name} className="flex items-center justify-between py-2.5 px-3 bg-white border border-gray-100 rounded-xl">
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <div>
                  <p className="text-[12px] font-medium text-deep-black">{file.name}</p>
                  <p className="text-[10px] text-gray-400">{file.size}</p>
                </div>
              </div>
              <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'widget') {
    return (
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-royal-blue/[0.06] flex items-center justify-center">
            <svg className="h-4 w-4 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-deep-black">Widget Preview</span>
        </div>
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center">
              <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-deep-black">Nagriva AI</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ml-1" />
            <span className="text-[9px] text-emerald-500">Online</span>
          </div>
          <div className="bg-gray-50 rounded-lg rounded-tl-sm px-3 py-2 self-start max-w-[85%]">
            <p className="text-[11px] text-gray-600">Hi there! I can help with pricing, features, or schedule a demo. What would you like to know?</p>
          </div>
          <div className="bg-royal-blue rounded-lg rounded-tr-sm px-3 py-2 self-end max-w-[75%]">
            <p className="text-[11px] text-white">What are your pricing plans?</p>
          </div>
          <div className="bg-gray-50 rounded-lg rounded-tl-sm px-3 py-2 self-start max-w-[85%]">
            <p className="text-[11px] text-gray-600">We have three plans: Starter ($49/mo), Pro ($149/mo), and Enterprise (custom). All include unlimited conversations and core features.</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'handoff') {
    return (
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 h-full flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-8 w-8 rounded-lg bg-royal-blue/[0.06] flex items-center justify-center">
            <svg className="h-4 w-4 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-deep-black">Handoff Flow</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          {/* AI Agent */}
          <div className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center text-white text-[11px] font-bold shrink-0">AI</div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-deep-black">AI Agent</p>
              <p className="text-[10px] text-gray-400">Confidence: 42% — Low</p>
            </div>
            <div className="px-2 py-1 rounded-md bg-amber-50 border border-amber-200">
              <span className="text-[9px] font-semibold text-amber-700">Escalating</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <div className="h-6 w-px bg-royal-blue/20" />
            <div className="flex items-center gap-1.5 px-3 py-1 bg-royal-blue/[0.04] rounded-full">
              <svg className="h-3 w-3 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
              </svg>
              <span className="text-[9px] font-semibold text-royal-blue">Context Transferred</span>
            </div>
            <div className="h-6 w-px bg-royal-blue/20" />
          </div>

          {/* Human Agent */}
          <div className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-emerald-200 rounded-xl">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-deep-black">Human Agent — Sarah M.</p>
              <p className="text-[10px] text-emerald-600 font-medium">Connected · Handling</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // analytics
  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 h-full">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-8 w-8 rounded-lg bg-royal-blue/[0.06] flex items-center justify-center">
          <svg className="h-4 w-4 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-deep-black">Live Metrics</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Responses', value: '2.4k', change: '+12%' },
          { label: 'Avg Time', value: '1.2s', change: '-18%' },
          { label: 'CSAT', value: '98%', change: '+3%' },
        ].map((m) => (
          <div key={m.label} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">{m.label}</p>
            <p className="text-lg font-bold text-deep-black">{m.value}</p>
            <p className="text-[10px] text-emerald-500 font-medium">{m.change}</p>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <div className="flex items-end gap-[5px] h-20">
          {[35, 55, 40, 70, 50, 85, 60, 90, 45, 75, 65, 100, 55, 80, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-royal-blue/70 to-royal-blue-light/50" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[9px] text-gray-400">Mon</span>
          <span className="text-[9px] text-gray-400">Sun</span>
        </div>
      </div>
    </div>
  );
}

function CoreFeaturesSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeader
          badge="Core Features"
          title="Built for teams that move fast"
          titleLine2="and expect more from their tools"
          description="Each feature is designed to work independently or together as a unified system. No bloat, no compromise — just the tools that matter."
        />

        <div className="space-y-16 md:space-y-24">
          {coreFeatures.map((feature, i) => (
            <RevealBlock key={feature.badge} delay={100}>
              <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                {/* Text */}
                <div className={`lg:[direction:ltr] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-4 px-3 py-1 bg-royal-blue/[0.04] rounded-full">
                    {feature.badge}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-deep-black mb-4 tracking-tight leading-[1.15]">
                    {feature.title}
                  </h3>
                  <p className="text-body mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-royal-blue/[0.06] flex items-center justify-center shrink-0">
                          <svg className="h-3 w-3 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-[15px] text-gray-600 leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={`lg:[direction:ltr] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <CoreFeatureVisual type={feature.visual} />
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — AI CAPABILITIES GRID
   ═══════════════════════════════════════════ */

const capabilities = [
  {
    title: 'Natural Language Understanding',
    description: 'Understands intent, context, and nuance in 95+ languages. Handles typos, slang, and complex multi-turn conversations effortlessly.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
      </svg>
    ),
  },
  {
    title: 'Multi-Channel Deployment',
    description: 'Deploy the same AI agent across your website, WhatsApp, Slack, Messenger, and more. Consistent voice, unified inbox.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.35m-18 0V6.375a3 3 0 013-3h13.5a3 3 0 013 3v3" />
      </svg>
    ),
  },
  {
    title: 'Smart Routing Engine',
    description: 'Automatically routes conversations to the right agent, team, or department based on intent, language, and customer value.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Sentiment Analysis',
    description: 'Real-time emotion detection across every conversation. Identify frustrated customers instantly and trigger proactive interventions.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
  {
    title: 'Custom Workflows',
    description: 'Build multi-step conversational flows with conditional logic, API calls, and integrations. No code required.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Lead Qualification',
    description: 'Automatically scores and qualifies leads based on conversation data. Pushes qualified prospects directly into your CRM pipeline.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

function CapabilitiesGrid() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionHeader
          badge="AI Capabilities"
          title="Intelligence that adapts to your business"
          description="Built on state-of-the-art language models, fine-tuned for real-world business conversations."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <RevealBlock key={cap.title} delay={i * 80}>
              <div className="group bg-white rounded-2xl border border-gray-100 p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-5 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-semibold text-deep-black mb-2 tracking-tight">{cap.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{cap.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — INTERACTIVE CHAT DEMO
   ═══════════════════════════════════════════ */

const chatResponses: Record<string, string> = {
  pricing: "We offer three plans:\n\n• Starter — $49/mo (1 agent, 1k conversations)\n• Pro — $149/mo (5 agents, unlimited conversations)\n• Enterprise — Custom (unlimited everything)\n\nAll plans include a 14-day free trial. Want me to walk you through the differences?",
  features: "Here are the key features:\n\n• AI Knowledge Base — train on your docs\n• Website Widget — embed in minutes\n• Human Handoff — seamless escalation\n• Analytics Dashboard — real-time insights\n• Multi-language — 95+ languages\n• Custom Workflows — no-code builder\n\nWhich one interests you most?",
  demo: "I'd love to set that up! Our product specialists give personalized 15-minute walkthroughs. You can book directly at nagriva.ai/demo or I can have someone reach out. What works better for you?",
  integrations: "We integrate with:\n\n• WhatsApp Business\n• Slack\n• HubSpot\n• Shopify\n• Stripe\n• Google Calendar\n• Zapier (5,000+ apps)\n• Facebook Messenger\n\nPlus our REST API for custom integrations.",
  security: "Security is our priority:\n\n• SOC 2 Type II certified\n• GDPR compliant\n• 256-bit AES encryption\n• 99.99% uptime SLA\n• Data residency options\n• SSO / SAML support\n\nYour data never trains our models.",
  default: "Great question! Nagriva helps businesses deploy AI employees that handle customer conversations, qualify leads, book appointments, and automate support — all from a single platform. What would you like to know more about?",
};

function getChatResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  if (lower.includes('pric') || lower.includes('cost') || lower.includes('plan') || lower.includes('how much')) return chatResponses.pricing;
  if (lower.includes('feature') || lower.includes('what can') || lower.includes('do')) return chatResponses.features;
  if (lower.includes('demo') || lower.includes('book') || lower.includes('call') || lower.includes('talk')) return chatResponses.demo;
  if (lower.includes('integrat') || lower.includes('connect') || lower.includes('slack') || lower.includes('whatsapp')) return chatResponses.integrations;
  if (lower.includes('security') || lower.includes('safe') || lower.includes('encrypt') || lower.includes('gdpr') || lower.includes('soc')) return chatResponses.security;
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return "Hey there! I'm the Nagriva AI assistant. Ask me about pricing, features, integrations, security, or anything else about the platform.";
  if (lower.includes('thank')) return "You're welcome! Feel free to ask anything else — I'm here to help.";
  return chatResponses.default;
}

function InteractiveChatDemo() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string; time: string }>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);

  const formatTime = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const startChat = useCallback(() => {
    if (started) return;
    setStarted(true);
    setTimeout(() => {
      setMessages([{
        role: 'ai',
        text: "Hi! I'm Nagriva's AI assistant. I can answer questions about our platform, pricing, features, and integrations. Try asking me something!",
        time: formatTime(),
      }]);
    }, 600);
  }, [started]);

  useEffect(() => {
    if (isInView) startChat();
  }, [isInView, startChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (started && !isTyping) inputRef.current?.focus();
  }, [started, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', text: trimmed, time: formatTime() }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: getChatResponse(trimmed), time: formatTime() }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const suggestions = ['What are the pricing plans?', 'Show me the features', 'What integrations do you offer?', 'Tell me about security'];

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-max">
        <SectionHeader
          badge="Try It Live"
          title="See the AI in action"
          description="Experience the same intelligence your customers will interact with. Ask anything about the platform."
        />

        <RevealBlock>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-white">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-black">Nagriva AI Assistant</p>
                  <p className="text-xs text-emerald-500 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online — Powered by Nagriva
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[400px] overflow-y-auto px-6 py-5 space-y-4 bg-gray-50/30">
                {!started && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="h-14 w-14 rounded-full bg-royal-blue/[0.06] flex items-center justify-center mb-4">
                      <svg className="h-7 w-7 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-deep-black mb-1">Start a conversation</p>
                    <p className="text-sm text-gray-500">Click below to interact with the AI assistant</p>
                    <button onClick={startChat} className="mt-5 btn-primary px-6 py-2.5 text-sm">
                      Start Chat
                    </button>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeSlideUp_250ms_ease-out]`}>
                    {msg.role === 'ai' && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shrink-0 mt-0.5 mr-3">
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                    )}
                    <div className="max-w-[80%]">
                      <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-royal-blue text-white rounded-tr-sm' : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100 shadow-sm'}`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                      </div>
                      <span className={`text-[10px] text-gray-400 mt-1 block ${msg.role === 'user' ? 'text-right' : ''}`}>{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-[fadeIn_200ms_ease-out]">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shrink-0 mt-0.5 mr-3">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" />
                        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animationDelay: '0.15s' }} />
                        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length <= 1 && !isTyping && started && (
                <div className="px-6 py-3 border-t border-gray-100 bg-white">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Try asking</p>
                  <div className="flex gap-2 flex-wrap">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        disabled={isTyping}
                        className="px-3 py-1.5 rounded-full border border-gray-200 text-[11px] font-medium text-gray-600 hover:border-royal-blue hover:text-royal-blue hover:bg-royal-blue/[0.02] transition-all duration-150 disabled:opacity-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              {started && (
                <div className="px-6 py-4 border-t border-gray-100 bg-white">
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isTyping}
                      placeholder="Ask about pricing, features, integrations..."
                      className="flex-1 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white transition-all duration-150 disabled:opacity-50"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || isTyping}
                      className="h-11 px-5 rounded-xl bg-royal-blue text-white text-sm font-semibold flex items-center gap-2 shrink-0 disabled:opacity-40 transition-all duration-150 hover:bg-royal-blue-dark"
                    >
                      Send
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — DASHBOARD SHOWCASE
   ═══════════════════════════════════════════ */

function DashboardShowcase() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionHeader
          badge="Analytics"
          title="Your command center for AI performance"
          description="Every conversation, every metric, every insight — all in one beautifully designed dashboard."
        />

        <RevealBlock>
          <div ref={ref} className="relative max-w-6xl mx-auto">
            {/* Main dashboard */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img src="/favicon.png?v=4" alt="Nagriva" className="h-8 w-8 rounded-[50%] object-contain" />
                  <span className="text-sm font-semibold text-deep-black">Nagriva Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                    <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <span className="text-xs text-gray-500">Search analytics...</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-royal-blue flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">JD</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* KPI Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Conversations', value: '12,847', change: '+24%', up: true },
                    { label: 'Resolution Rate', value: '94.2%', change: '+5.1%', up: true },
                    { label: 'Avg Response Time', value: '0.8s', change: '-15%', up: true },
                    { label: 'Customer Satisfaction', value: '4.9/5', change: '+0.3', up: true },
                  ].map((kpi, i) => (
                    <div
                      key={kpi.label}
                      className={`p-4 rounded-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(30,64,175,0.1)] hover:border-royal-blue/20 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: `${200 + i * 100}ms` }}
                    >
                      <p className="text-[11px] text-gray-500 font-medium mb-1">{kpi.label}</p>
                      <p className="text-2xl font-bold text-deep-black">{kpi.value}</p>
                      <p className={`text-xs font-medium mt-1 ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>{kpi.change}</p>
                    </div>
                  ))}
                </div>

                {/* Chart + Activity */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Chart */}
                  <div className="lg:col-span-2 rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-deep-black">Conversation Volume</span>
                      <span className="text-xs text-gray-400">Last 30 days</span>
                    </div>
                    <div className="flex items-end gap-[4px] h-44">
                      {[25, 40, 30, 55, 42, 65, 48, 72, 55, 80, 62, 88, 50, 75, 68, 82, 58, 70, 78, 92, 65, 85, 72, 95, 60, 78, 82, 88, 70, 98].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t bg-gradient-to-t from-royal-blue/80 to-royal-blue-light/50 transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                          style={{ height: `${h}%`, transitionDelay: `${400 + i * 40}ms` }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400">May 1</span>
                      <span className="text-[10px] text-gray-400">May 30</span>
                    </div>
                  </div>

                  {/* Activity */}
                  <div className="rounded-xl border border-gray-100 p-5">
                    <span className="text-sm font-semibold text-deep-black block mb-4">Live Activity</span>
                    <div className="space-y-4">
                      {[
                        { agent: 'Sales Agent', action: 'Qualified lead — Acme Corp', time: '2m ago', status: 'success' },
                        { agent: 'Support Agent', action: 'Resolved billing inquiry', time: '5m ago', status: 'success' },
                        { agent: 'Booking Agent', action: 'Scheduled demo call', time: '8m ago', status: 'success' },
                        { agent: 'Customer Agent', action: 'Escalated to human', time: '12m ago', status: 'warning' },
                        { agent: 'Support Agent', answer: 'Answered FAQ about pricing', time: '15m ago', status: 'success' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${item.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-deep-black truncate">{item.action}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] text-gray-500">{item.agent}</span>
                              <span className="text-[10px] text-gray-300">·</span>
                              <span className="text-[10px] text-gray-400">{item.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating KPI cards */}
            <div className="absolute -top-6 -right-4 lg:-right-8 bg-white rounded-xl border border-gray-100 shadow-xl p-4 hidden lg:block z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Conversion Rate</p>
                  <p className="text-xl font-bold text-deep-black">8.4%</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 lg:-left-8 bg-white rounded-xl border border-gray-100 shadow-xl p-4 hidden lg:block z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-royal-blue/[0.06] flex items-center justify-center">
                  <svg className="h-5 w-5 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Revenue Saved</p>
                  <p className="text-xl font-bold text-deep-black">$24.5k</p>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6 — INTEGRATIONS
   ═══════════════════════════════════════════ */

const integrations = [
  { name: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
  { name: 'Slack', icon: 'M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.527 2.527 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z' },
  { name: 'HubSpot', icon: 'M24 20.947V24H0v-3.053c0-1.68 3.524-3.053 7.5-3.053 1.14 0 2.23.117 3.24.334C11.56 14.638 14.572 12.8 18 12.8c4.97 0 6 4.107 6 4.107V20.947zM6 6a4 4 0 100 8 4 4 0 000-8z' },
  { name: 'Shopify', icon: 'M15.347 23.065l.25-1.505s-.734-.047-1.626-.047c-1.39 0-1.584.734-1.584.734l-.62 1.552H15.347zM21.67 16.263c0-.448-.224-.776-.63-.937l-1.423-.492-.448 1.454s.678.168.678.56c0 .168-.112.336-.336.42l.156 0z' },
  { name: 'Stripe', icon: 'M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19L3.47 22.11c1.943 1.279 4.753 2.093 7.52 2.093 2.612 0 4.753-.66 6.297-1.872 1.648-1.291 2.475-3.208 2.475-5.628 0-4.135-2.465-5.79-6.786-7.453z' },
  { name: 'Google Calendar', icon: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z' },
  { name: 'Zapier', icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.168 2.64-1.8 4.944-4.272 5.904h-.048l-2.352 3.552c-.24.36-.6.552-.984.552-.096 0-.192-.024-.288-.048-.552-.144-.864-.72-.72-1.272l.96-3.576H7.368c-.552 0-1.032-.36-1.2-.888-.168-.528.024-1.104.48-1.464l5.808-4.464c.456-.336 1.08-.336 1.512 0l4.584 3.504c.36.264.6.672.672 1.128.024.168.048.336.048.492l-.104.072z' },
  { name: 'Messenger', icon: 'M.001 11.639C.001 4.899 5.241 0 12.001 0S24 4.899 24 11.639c0 6.74-5.24 11.639-12 11.639-1.25 0-2.446-.185-3.566-.527-.25-.084-.498-.17-.758-.234l-3.538-.885a.749.749 0 01-.525-.91l.549-2.823C.897 16.418.001 14.136.001 11.639z' },
];

function IntegrationsSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeader
          badge="Integrations"
          title="Connects with the tools you already use"
          description="Seamlessly integrates with your existing tech stack. Deploy your AI workforce wherever your customers are."
        />

        <RevealBlock>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
            {integrations.map((integration, i) => (
              <div
                key={integration.name}
                className="group flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] cursor-default"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="h-12 w-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-8 w-8 text-gray-400 group-hover:text-royal-blue transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d={integration.icon} />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-deep-black transition-colors duration-300">{integration.name}</span>
              </div>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={300}>
          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 mb-3">Plus 5,000+ integrations via Zapier and our REST API</p>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-royal-blue hover:text-royal-blue-dark transition-colors">
              View all integrations
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7 — AUTOMATION WORKFLOW
   ═══════════════════════════════════════════ */

const workflowSteps = [
  {
    label: 'Customer',
    sublabel: 'Reaches out',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
  {
    label: 'AI Agent',
    sublabel: 'Processes & responds',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    color: 'from-royal-blue to-royal-blue-light',
    bgColor: 'bg-royal-blue/[0.06]',
    textColor: 'text-royal-blue',
  },
  {
    label: 'CRM Update',
    sublabel: 'Data synced automatically',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
  {
    label: 'Human Review',
    sublabel: 'If needed',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    label: 'Completed',
    sublabel: 'Resolved & logged',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
];

function AutomationWorkflow() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionHeader
          badge="Automation"
          title="From first contact to resolution"
          description="Every conversation follows an intelligent workflow that adapts in real-time based on context, complexity, and customer needs."
        />

        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Desktop: horizontal */}
          <div className="hidden md:flex items-start justify-between relative">
            {/* Connection line */}
            <div className="absolute top-[36px] left-[10%] right-[10%] h-[2px]">
              <div
                className={`h-full bg-gradient-to-r from-gray-200 via-royal-blue/30 to-emerald-200 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                style={{ transformOrigin: 'left' }}
              />
              {/* Animated dot */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-royal-blue shadow-[0_0_8px_rgba(30,64,175,0.4)] transition-all duration-[2000ms] ease-in-out ${isInView ? 'left-full' : 'left-0'}`}
                style={{ transitionDelay: isInView ? '500ms' : '0ms' }}
              />
            </div>

            {workflowSteps.map((step, i) => (
              <div
                key={step.label}
                className={`flex flex-col items-center w-[18%] transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className={`h-[72px] w-[72px] rounded-2xl ${step.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110`}>
                  <div className={`bg-gradient-to-br ${step.color} rounded-xl h-10 w-10 flex items-center justify-center text-white`}>
                    {step.icon}
                  </div>
                </div>
                <p className="text-sm font-semibold text-deep-black mb-1">{step.label}</p>
                <p className="text-[11px] text-gray-500 text-center">{step.sublabel}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden flex flex-col items-center gap-2 relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px]">
              <div
                className={`w-full h-full bg-gradient-to-b from-gray-200 via-royal-blue/30 to-emerald-200 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
                style={{ transformOrigin: 'top' }}
              />
            </div>

            {workflowSteps.map((step, i) => (
              <div
                key={step.label}
                className={`flex items-center gap-4 w-full z-10 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className={`h-14 w-14 rounded-2xl ${step.bgColor} flex items-center justify-center shrink-0`}>
                  <div className={`bg-gradient-to-br ${step.color} rounded-xl h-9 w-9 flex items-center justify-center text-white`}>
                    {step.icon}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-black">{step.label}</p>
                  <p className="text-xs text-gray-500">{step.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 8 — ENTERPRISE SECURITY
   ═══════════════════════════════════════════ */

const securityBadges = [
  {
    title: 'SOC 2 Type II',
    description: 'Audited annually for security, availability, and confidentiality controls.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'GDPR Compliant',
    description: 'Full compliance with EU data protection regulations. Data residency options available.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: '256-bit Encryption',
    description: 'AES-256 encryption at rest and TLS 1.3 in transit. Your data never trains our models.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: '99.99% Uptime',
    description: 'Enterprise-grade infrastructure with automatic failover and 24/7 monitoring.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function EnterpriseSecurity() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeader
          badge="Security"
          title="Enterprise-grade security you can trust"
          description="Built from the ground up with security best practices. Your data is protected at every layer."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {securityBadges.map((badge, i) => (
            <RevealBlock key={badge.title} delay={i * 100}>
              <div className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-5 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                  {badge.icon}
                </div>
                <h3 className="text-lg font-semibold text-deep-black mb-2">{badge.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{badge.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={500}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {['ISO 27001', 'HIPAA Ready', 'SSO / SAML', 'Audit Logs'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 9 — FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCTA() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section className="px-6 pb-24 md:pb-32">
      <div ref={ref} className={`mx-auto max-w-5xl transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative rounded-3xl bg-deep-black overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 via-transparent to-royal-blue/5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-blue/[0.06] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Ready to build your<br className="hidden md:block" /> AI workforce?
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Start your 14-day free trial today. No credit card required. Live in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-deep-black font-semibold rounded-xl text-base transition-all duration-200 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98]"
              >
                Start Free Trial
                <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-medium rounded-xl text-base border border-gray-600 transition-all duration-200 hover:bg-white/5 hover:border-gray-500 active:scale-[0.98]"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */

export default function FeaturesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CoreFeaturesSection />
      <CapabilitiesGrid />
      <InteractiveChatDemo />
      <DashboardShowcase />
      <IntegrationsSection />
      <AutomationWorkflow />
      <EnterpriseSecurity />
      <FinalCTA />
    </div>
  );
}
