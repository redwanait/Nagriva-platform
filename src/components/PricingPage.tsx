import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Check, Sparkles, Shield, Zap, ArrowRight, ChevronDown, Calculator, Building2, Users, Headphones, Star } from 'lucide-react';
import Footer from './Footer';

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            Pricing
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-10 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            Simple, transparent{' '}
            <span className="text-royal-blue">pricing.</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Start free and scale your AI workforce as your business grows. No hidden fees, no surprises.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-20 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#" className="btn-primary text-base px-8 py-3.5">
            Start Free Trial
            <svg className="h-4 w-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a href="#" className="btn-secondary text-base px-8 py-3.5">
            Talk to Sales
          </a>
        </div>

        {/* Dashboard Preview */}
        <div className={`transition-all duration-900 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative max-w-5xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60 overflow-hidden">
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

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'AI Agents Active', value: '12', change: '+3', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
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

                <div className="rounded-xl border border-gray-100 p-5 bg-gray-50/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-deep-black">AI Usage Overview</span>
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
   SECTION 2 — PRICING PLANS
   ═══════════════════════════════════════════ */

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses getting started with AI.',
    price: { annual: 49, monthly: 59 },
    features: [
      '1 AI Agent',
      '500 conversations/month',
      'Website widget',
      'Basic analytics',
      'Email support',
      'Knowledge base (100 items)',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'For growing businesses that need more power.',
    price: { annual: 149, monthly: 179 },
    features: [
      '5 AI Agents',
      '5,000 conversations/month',
      'WhatsApp + Messenger',
      'Advanced analytics',
      'Priority support',
      'Knowledge base (1,000 items)',
      'Human handoff',
      'Custom branding',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom requirements.',
    price: null,
    features: [
      'Unlimited agents',
      'Unlimited conversations',
      'All channels + API',
      'Custom analytics',
      'Dedicated support',
      'Unlimited knowledge base',
      'Human handoff + routing',
      'White-label option',
      'SLA guarantee',
      'SSO & SAML',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

function PricingPlansSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="section-padding bg-gray-50/50 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(30,64,175,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full border border-gray-200/80 bg-white shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                !annual
                  ? 'bg-deep-black text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                annual
                  ? 'bg-deep-black text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Annual
              <span className="ml-1.5 inline-flex items-center text-[11px] font-bold text-emerald-500 tracking-wide">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card group relative rounded-2xl p-8 transition-all duration-500 ease-out cursor-default ${
                plan.popular
                  ? 'pricing-card-popular bg-white border-2 border-royal-blue/30 shadow-xl shadow-royal-blue/[0.08] lg:scale-[1.04] z-10'
                  : 'bg-white border border-gray-200/80 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div
                  className="pointer-events-none absolute -inset-1 rounded-2xl opacity-60 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(30,64,175,0.10) 0%, transparent 70%)',
                    zIndex: -1,
                  }}
                />
              )}

              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-royal-blue text-white text-xs font-semibold rounded-full shadow-lg shadow-royal-blue/25">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-base font-semibold text-deep-black mb-1.5">{plan.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8">
                {plan.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-[3.25rem] font-bold text-deep-black tracking-tight leading-none">
                      ${annual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-sm font-normal text-gray-400 ml-0.5">/month</span>
                  </div>
                ) : (
                  <div className="text-[3.25rem] font-bold text-deep-black tracking-tight leading-none">
                    Custom
                  </div>
                )}
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-400">
                  <Check className="w-3.5 h-3.5 text-gray-300" />
                  No credit card required
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                  <Check className="w-3.5 h-3.5 text-gray-300" />
                  Cancel anytime
                </div>
              </div>

              <button
                className={`w-full group/btn flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-royal-blue text-white hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]'
                    : 'bg-deep-black text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-black/10 active:scale-[0.98]'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </button>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <ul className="space-y-0">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="group/feature flex items-start gap-3 py-2.5 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-gray-50/80"
                    >
                      <Check className="h-4.5 w-4.5 text-royal-blue flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-[13.5px] text-gray-600 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            { icon: <Star className="w-4 h-4" />, label: 'Rated 4.9/5' },
            { icon: <Shield className="w-4 h-4" />, label: '2,000+ Businesses' },
            { icon: <Zap className="w-4 h-4" />, label: '14-Day Free Trial' },
            { icon: <Check className="w-4 h-4" />, label: 'Cancel Anytime' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center justify-center text-royal-blue">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — FEATURE COMPARISON TABLE
   ═══════════════════════════════════════════ */

const comparisonFeatures = [
  { category: 'AI & Automation', features: [
    { name: 'AI Agents', starter: '1', pro: '5', enterprise: 'Unlimited' },
    { name: 'Monthly Conversations', starter: '500', pro: '5,000', enterprise: 'Unlimited' },
    { name: 'Knowledge Base', starter: '100 items', pro: '1,000 items', enterprise: 'Unlimited' },
  ]},
  { category: 'Channels', features: [
    { name: 'Website Widget', starter: true, pro: true, enterprise: true },
    { name: 'WhatsApp', starter: false, pro: true, enterprise: true },
    { name: 'Messenger', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Analytics & Support', features: [
    { name: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
    { name: 'Human Handoff', starter: false, pro: true, enterprise: true },
    { name: 'Priority Support', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Enterprise', features: [
    { name: 'API Access', starter: false, pro: false, enterprise: true },
    { name: 'SSO', starter: false, pro: false, enterprise: true },
    { name: 'Custom Integrations', starter: false, pro: false, enterprise: true },
  ]},
];

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="flex items-center justify-center">
        <div className="h-7 w-7 rounded-full bg-royal-blue/[0.06] flex items-center justify-center">
          <Check className="h-4 w-4 text-royal-blue" strokeWidth={2.5} />
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <div className="h-7 w-7 rounded-full bg-gray-50 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
        </div>
      </div>
    );
  }
  return <span className="text-sm font-medium text-deep-black">{value}</span>;
}

function ComparisonTableSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeader
          badge="Compare Plans"
          title="Everything you need to compare"
          description="See which plan fits your business. Every plan includes our core AI platform with no hidden fees."
        />

        <RevealBlock>
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/40 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-4 gap-0 border-b border-gray-100 bg-gray-50/50">
                <div className="px-6 py-5">
                  <span className="text-sm font-semibold text-gray-500">Features</span>
                </div>
                {['Starter', 'Professional', 'Enterprise'].map((name, i) => (
                  <div key={name} className={`px-6 py-5 text-center ${i === 1 ? 'bg-royal-blue/[0.02]' : ''}`}>
                    <span className={`text-sm font-semibold ${i === 1 ? 'text-royal-blue' : 'text-deep-black'}`}>{name}</span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {comparisonFeatures.map((group) => (
                <div key={group.category}>
                  <div className="px-6 py-3 bg-gray-50/30 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{group.category}</span>
                  </div>
                  {group.features.map((feature, fi) => (
                    <div key={feature.name} className={`grid grid-cols-4 gap-0 border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors ${fi % 2 === 0 ? '' : 'bg-gray-50/20'}`}>
                      <div className="px-6 py-4 flex items-center">
                        <span className="text-sm text-gray-600">{feature.name}</span>
                      </div>
                      <div className="px-6 py-4 flex items-center justify-center bg-royal-blue/[0.02]">
                        <ComparisonCell value={feature.starter} />
                      </div>
                      <div className="px-6 py-4 flex items-center justify-center">
                        <ComparisonCell value={feature.pro} />
                      </div>
                      <div className="px-6 py-4 flex items-center justify-center bg-royal-blue/[0.02]">
                        <ComparisonCell value={feature.enterprise} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — ROI CALCULATOR
   ═══════════════════════════════════════════ */

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const { ref, isInView } = useInView(0.3);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

function ROICalculatorSection() {
  const [employees, setEmployees] = useState(5);
  const [conversations, setConversations] = useState(3000);
  const [currentCost, setCurrentCost] = useState(8000);

  const costPerConversation = currentCost / conversations;
  const aiCostPerConversation = 0.12;
  const monthlySavings = Math.round(currentCost - (conversations * aiCostPerConversation));
  const annualSavings = monthlySavings * 12;
  const percentSaved = Math.round(((currentCost - conversations * aiCostPerConversation) / currentCost) * 100);

  return (
    <section className="section-padding bg-gray-50/50 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(30,64,175,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative z-10">
        <SectionHeader
          badge="ROI Calculator"
          title="See how much you can save"
          description="Calculate your potential savings by switching to Nagriva's AI-powered customer support."
        />

        <RevealBlock>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg shadow-gray-200/40">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-royal-blue/[0.06] flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-royal-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-deep-black">Your Current Costs</h3>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-600">Support Team Size</label>
                      <span className="text-sm font-bold text-deep-black">{employees} employees</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-royal-blue"
                    />
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-gray-400">1</span>
                      <span className="text-[10px] text-gray-400">50</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-600">Monthly Conversations</label>
                      <span className="text-sm font-bold text-deep-black">{conversations.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={50000}
                      step={500}
                      value={conversations}
                      onChange={(e) => setConversations(Number(e.target.value))}
                      className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-royal-blue"
                    />
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-gray-400">500</span>
                      <span className="text-[10px] text-gray-400">50,000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-600">Current Monthly Support Cost</label>
                      <span className="text-sm font-bold text-deep-black">${currentCost.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={100000}
                      step={1000}
                      value={currentCost}
                      onChange={(e) => setCurrentCost(Number(e.target.value))}
                      className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-royal-blue"
                    />
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-gray-400">$1,000</span>
                      <span className="text-[10px] text-gray-400">$100,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-emerald-700">Estimated Monthly Savings</span>
                  </div>
                  <div className="text-5xl font-bold text-emerald-700 tracking-tight mt-4">
                    $<AnimatedCounter value={Math.max(0, monthlySavings)} />
                  </div>
                  <p className="text-sm text-emerald-600 mt-2">
                    <AnimatedCounter value={Math.max(0, percentSaved)} />% reduction in support costs
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <p className="text-xs text-gray-500 font-medium mb-1">Annual Savings</p>
                    <p className="text-2xl font-bold text-deep-black">
                      $<AnimatedCounter value={Math.max(0, annualSavings)} />
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <p className="text-xs text-gray-500 font-medium mb-1">Cost per Conversation</p>
                    <p className="text-2xl font-bold text-deep-black">
                      ${aiCostPerConversation.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      vs ${costPerConversation.toFixed(2)} current
                    </p>
                  </div>
                </div>

                <a href="#" className="w-full btn-primary justify-center text-base py-4">
                  Start Saving Today
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — ENTERPRISE
   ═══════════════════════════════════════════ */

function EnterpriseSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-[20px] overflow-hidden bg-deep-black p-10 md:p-16">
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
            {/* Blue glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-royal-blue/[0.08] rounded-full blur-[120px] pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.08] border border-white/10 rounded-full text-sm font-medium text-white/70 mb-6">
                  <Building2 className="h-4 w-4" />
                  Enterprise
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-5">
                  Need a custom solution?
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
                  Get a tailored AI solution designed for your enterprise. From private deployments to custom integrations, we build exactly what your business needs.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: <Users className="h-5 w-5" />, text: 'Unlimited AI agents' },
                    { icon: <Shield className="h-5 w-5" />, text: 'Private deployment' },
                    { icon: <Headphones className="h-5 w-5" />, text: 'Dedicated success manager' },
                    { icon: <Zap className="h-5 w-5" />, text: 'Priority onboarding' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white/[0.08] flex items-center justify-center text-royal-blue-light shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-white/80">{item.text}</span>
                    </div>
                  ))}
                </div>

                <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-deep-black font-medium rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-lg active:scale-[0.98]">
                  Contact Sales
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Right visual */}
              <div className="hidden lg:block">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Enterprise Plan</p>
                      <p className="text-xs text-white/50">Custom pricing</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Unlimited AI agents & conversations',
                      'Private cloud deployment',
                      'Dedicated account team',
                      'Custom SLA (99.99%+)',
                      'Advanced security (SOC 2, SSO)',
                      'Custom integrations & API',
                      'White-label options',
                      'Quarterly business reviews',
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/[0.04]">
                        <Check className="h-4 w-4 text-royal-blue-light shrink-0" strokeWidth={2.5} />
                        <span className="text-sm text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
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
   SECTION 6 — FAQ
   ═══════════════════════════════════════════ */

const faqData = [
  {
    q: 'Is there a free trial available?',
    a: 'Yes! All plans come with a 14-day free trial. No credit card required. You can explore all features of your chosen plan and decide if it\u2019s the right fit before committing.',
  },
  {
    q: 'Can I switch plans at any time?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time from your dashboard. When upgrading, you\u2019ll be charged the prorated difference. When downgrading, you\u2019ll receive credit for the remaining period.',
  },
  {
    q: 'What happens when I reach my conversation limit?',
    a: 'You won\u2019t lose service. We\u2019ll notify you when you reach 80% of your limit. Once you exceed it, additional conversations are available at a per-conversation rate, or you can upgrade to a plan with more capacity.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a full refund within the first 30 days of any paid plan. After that, you can cancel anytime and continue using the service until the end of your billing period. No questions asked.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and wire transfers for annual Enterprise plans. All payments are processed securely via Stripe.',
  },
  {
    q: 'Is my data secure?',
    a: 'Security is our top priority. We are SOC 2 Type II certified, GDPR compliant, and use 256-bit AES encryption. Your data never trains our models, and you can request data deletion at any time.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionHeader
          badge="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about our pricing and plans."
        />

        <RevealBlock>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-3">
              {faqData.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 ${
                    openIndex === i
                      ? 'border-royal-blue/20 bg-white shadow-lg shadow-royal-blue/[0.06]'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold text-deep-black pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                        openIndex === i ? 'rotate-180 text-royal-blue' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7 — CUSTOMER TRUST
   ═══════════════════════════════════════════ */

const companyLogos = [
  { name: 'Stripe', width: 56 },
  { name: 'Linear', width: 68 },
  { name: 'Vercel', width: 72 },
  { name: 'Notion', width: 76 },
  { name: 'Slack', width: 60 },
  { name: 'Shopify', width: 76 },
  { name: 'HubSpot', width: 82 },
  { name: 'Intercom', width: 82 },
];

function CustomerTrustSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding">
      <div className="container-max">
        <div ref={ref} className={`text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-6 w-6 text-amber-400 fill-amber-400" />
            ))}
          </div>

          <div className="text-3xl md:text-4xl font-bold text-deep-black tracking-tight mb-3">
            4.9/5
          </div>

          <p className="text-lg text-gray-500 mb-12">
            Trusted by 2,000+ businesses worldwide.
          </p>

          {/* Logo strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-30">
            {companyLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center"
                style={{ width: logo.width * 2.5, height: 40 }}
              >
                <span className="text-xl font-bold text-gray-800 tracking-tight">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 8 — FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCTASection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding bg-gray-50/50 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,64,175,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative z-10">
        <div ref={ref} className={`text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="heading-lg text-deep-black mb-5">
            Ready to automate your business?
          </h2>
          <p className="text-body max-w-2xl mx-auto mb-10">
            Join 2,000+ businesses already using Nagriva to handle millions of conversations with AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="btn-primary text-base px-8 py-3.5">
              Start Free Trial
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </a>
            <a href="#" className="btn-secondary text-base px-8 py-3.5">
              Book a Demo
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-300" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-300" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-300" />
              Cancel anytime
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

export default function PricingPage() {
  return (
    <>
      <main>
        <HeroSection />
        <PricingPlansSection />
        <ComparisonTableSection />
        <ROICalculatorSection />
        <EnterpriseSection />
        <FAQSection />
        <CustomerTrustSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
