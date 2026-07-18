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
   INDUSTRY DATA
   ═══════════════════════════════════════════ */

interface IndustryDemo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  conversations: { role: 'visitor' | 'ai'; text: string }[];
  workflow: string[];
  results: { label: string; value: string; change: string }[];
}

const industries: IndustryDemo[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Automate patient intake, appointment scheduling, and follow-up reminders so your staff focuses on care — not calls.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    color: '#EF4444',
    conversations: [
      { role: 'visitor', text: "Hi, I need to book an appointment for a general check-up." },
      { role: 'ai', text: "Of course! We have availability tomorrow at 10:30 AM and 2:15 PM with Dr. Chen. Which works best?" },
      { role: 'visitor', text: "10:30 AM works for me." },
      { role: 'ai', text: "You're confirmed for tomorrow at 10:30 AM. I've sent intake forms to your email. Please arrive 10 minutes early with your insurance card." },
    ],
    workflow: ['Patient inquiry via website', 'AI qualifies & schedules', 'Intake forms sent automatically', 'Calendar synced to clinic', '24h reminder via SMS', 'No-show rate drops 62%'],
    results: [
      { label: 'Appointments Booked', value: '1,240/mo', change: '+68%' },
      { label: 'No-Show Reduction', value: '62%', change: '↓ from 28%' },
      { label: 'Staff Hours Saved', value: '120hrs/mo', change: '+120%' },
    ],
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    description: 'Handle reservations, takeout orders, and special requests instantly — even during peak hours when your team is slammed.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 11-3 0 3.354 3.354 0 013 0zm-3.75 0h.008v.008h-.008V17.25z" />
      </svg>
    ),
    color: '#F59E0B',
    conversations: [
      { role: 'visitor', text: "Hi, I'd like to order two large Margherita pizzas for delivery." },
      { role: 'ai', text: "Great choice! That's $34.98 total. Your estimated delivery is 25 minutes. Shall I confirm?" },
      { role: 'visitor', text: "Yes, and can I add a Caesar salad?" },
      { role: 'ai', text: "Added! New total is $44.97. Delivery in 28 minutes. You'll receive a tracking link shortly." },
    ],
    workflow: ['Order placed on any channel', 'AI confirms menu & pricing', 'Payment processed securely', 'Kitchen receives instantly', 'Real-time delivery tracking', 'AI follows up for review'],
    results: [
      { label: 'Orders Automated', value: '840/wk', change: '+45%' },
      { label: 'Avg Response Time', value: '8s', change: '↓ from 12min' },
      { label: 'Revenue per Order', value: '+18%', change: '↑ via upsells' },
    ],
  },
  {
    id: 'law',
    name: 'Law Firms',
    description: 'Qualify leads, schedule consultations, and provide general information — so your attorneys only talk to serious clients.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    color: '#6366F1',
    conversations: [
      { role: 'visitor', text: "I need help with an employment contract dispute." },
      { role: 'ai', text: "I can help. Could you briefly describe the issue so I can match you with the right attorney?" },
      { role: 'visitor', text: "My employer modified my bonus terms without notice." },
      { role: 'ai', text: "Thank you. I've scheduled a consultation with our employment law specialist for Thursday at 2:00 PM. You'll receive a preparation checklist by email." },
    ],
    workflow: ['Lead visits practice website', 'AI qualifies case type', 'Collects key details', 'Matches to specialist', 'Consultation booked', 'Prep materials sent'],
    results: [
      { label: 'Qualified Leads', value: '320/mo', change: '+85%' },
      { label: 'Consultation Bookings', value: '94%', change: '+34%' },
      { label: 'Intake Time', value: '2min', change: '↓ from 45min' },
    ],
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    description: 'Capture every lead, match properties instantly, and schedule viewings 24/7 — even when your agents are showing homes.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    color: '#10B981',
    conversations: [
      { role: 'visitor', text: "I'm looking for a 3-bedroom apartment downtown, budget around $2,500." },
      { role: 'ai', text: "I found 4 listings that match. Here's 142 Main St — 3 bed, 2 bath, $2,400/mo with a rooftop terrace." },
      { role: 'visitor', text: "That looks great. Can I schedule a viewing?" },
      { role: 'ai', text: "Confirmed for Saturday at 11:00 AM. I've sent the property details and neighborhood guide to your email." },
    ],
    workflow: ['Lead submits inquiry', 'AI matches properties', 'Sends curated listings', 'Schedules viewing', 'Prepares neighborhood guide', 'Follow-up sequence starts'],
    results: [
      { label: 'Leads Captured', value: '560/mo', change: '+72%' },
      { label: 'Viewings Booked', value: '280/mo', change: '+90%' },
      { label: 'Response Time', value: '<30s', change: '↓ from 4hrs' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Resolve order issues, track shipments, and handle returns instantly — reducing support tickets by up to 60%.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    color: '#8B5CF6',
    conversations: [
      { role: 'visitor', text: "Where is my order? It's been 3 days." },
      { role: 'ai', text: "Order #NG-2048 is in transit, arriving tomorrow by 5 PM. Here's your tracking link." },
      { role: 'visitor', text: "Can I change the delivery address?" },
      { role: 'ai', text: "Updated to 789 Oak Ave. You'll receive a confirmation shortly. No extra charge." },
    ],
    workflow: ['Customer reaches out', 'AI pulls order data', 'Resolves instantly', 'Address change processed', 'Confirmation sent', 'CSAT survey triggered'],
    results: [
      { label: 'Tickets Resolved', value: '2,400/wk', change: '+60%' },
      { label: 'CSAT Score', value: '4.8/5', change: '+0.6' },
      { label: 'Support Cost', value: '-42%', change: '↓ monthly' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing Agencies',
    description: 'Qualify inbound leads, book discovery calls, and route prospects to the right team — before competitors even reply.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    color: '#EC4899',
    conversations: [
      { role: 'visitor', text: "We need help with social media marketing for our SaaS startup." },
      { role: 'ai', text: "Great fit! What's your monthly budget and target audience?" },
      { role: 'visitor', text: "Around $5K/month, targeting B2B SaaS founders." },
      { role: 'ai', text: "Perfect. I've created a project brief and assigned it to our SaaS team. You'll hear from them within 2 hours." },
    ],
    workflow: ['Lead visits agency site', 'AI qualifies budget & needs', 'Creates project brief', 'Routes to specialist team', 'Discovery call scheduled', 'Proposal generated'],
    results: [
      { label: 'Leads Qualified', value: '420/mo', change: '+95%' },
      { label: 'Booking Rate', value: '78%', change: '+40%' },
      { label: 'Speed to Lead', value: '<2min', change: '↓ from 6hrs' },
    ],
  },
];

/* ═══════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════ */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);
  const [activeTab, setActiveTab] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTab(prev => (prev + 1) % industries.length);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveTab(prev => (prev + 1) % industries.length);
    }, 3000);
  };

  const active = industries[activeTab];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            Business Solutions
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-10 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            AI solutions built for{' '}
            <span className="text-royal-blue">every business</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            From healthcare to hospitality, Nagriva deploys AI Employees that understand your industry, speak your language, and deliver measurable results from day one.
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
            Book a Demo
          </a>
        </div>

        {/* Interactive Dashboard Preview */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="text-xs text-gray-400">nagriva.ai/{active.id}</span>
                </div>
              </div>

              {/* Industry tabs */}
              <div className="flex gap-1 px-5 py-3 border-b border-gray-100 overflow-x-auto scrollbar-hide">
                {industries.map((ind, i) => (
                  <button
                    key={ind.id}
                    onClick={() => handleTabClick(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === i
                        ? 'bg-royal-blue text-white'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {active.results.map((r, i) => (
                    <div
                      key={r.label}
                      className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 transition-all duration-500"
                      style={{ opacity: 1, transitionDelay: `${i * 100}ms` }}
                    >
                      <p className="text-[11px] text-gray-500 font-medium mb-1">{r.label}</p>
                      <p className="text-2xl font-bold text-deep-black">{r.value}</p>
                      <p className="text-xs font-medium text-emerald-600 mt-1">{r.change}</p>
                    </div>
                  ))}
                </div>

                {/* Mini workflow */}
                <div className="rounded-xl border border-gray-100 p-5 bg-gray-50/30">
                  <p className="text-sm font-semibold text-deep-black mb-4">Workflow for {active.name}</p>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {active.workflow.map((step, i) => (
                      <div key={i} className="flex items-center gap-2 shrink-0">
                        <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[11px] font-medium text-gray-600 whitespace-nowrap">
                          {step}
                        </div>
                        {i < active.workflow.length - 1 && (
                          <svg className="h-4 w-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating live badge */}
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
   SECTION 2 — INDUSTRIES
   ═══════════════════════════════════════════ */

function IndustriesSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionHeader
          badge="Industries"
          title="Solutions tailored to your industry"
          titleLine2="not generic templates"
          description="Each solution is pre-configured with industry-specific workflows, language, and integrations. Deploy in hours, not months."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <RevealBlock key={ind.id} delay={i * 80}>
              <div className="group bg-white rounded-[20px] border border-gray-100 p-8 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full flex flex-col">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${ind.color}10`, color: ind.color }}
                >
                  {ind.icon}
                </div>
                <h3 className="text-xl font-semibold text-deep-black mb-3 tracking-tight">{ind.name}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-6 flex-1">{ind.description}</p>

                {/* Mini workflow preview */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Workflow</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.workflow.slice(0, 3).map((step, j) => (
                      <span key={j} className="px-2 py-1 bg-white border border-gray-100 rounded-md text-[10px] font-medium text-gray-500">
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`#solutions-demo-${ind.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-royal-blue transition-all duration-200 group-hover:gap-3"
                >
                  Explore Solution
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — INTERACTIVE DEMO
   ═══════════════════════════════════════════ */

function InteractiveDemoSection() {
  const { ref: sectionRef } = useInView(0.1);
  const [activeId, setActiveId] = useState('healthcare');
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'entering'>('visible');

  const active = industries.find(i => i.id === activeId)!;

  const switchIndustry = useCallback((id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setPhase('exiting');
    setTimeout(() => {
      setPhase('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('visible'));
      });
    }, 280);
  }, [activeId]);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-max">
        <SectionHeader
          badge="Interactive Demo"
          title="See Nagriva work for your industry"
          description="Switch between industries to see how our AI adapts its conversations, workflows, and results to each business."
        />

        <RevealBlock>
          <div className="max-w-6xl mx-auto">
            {/* Industry selector pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {industries.map(ind => (
                <button
                  key={ind.id}
                  onClick={() => switchIndustry(ind.id)}
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeId === ind.id
                      ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/20'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-royal-blue/30 hover:text-royal-blue hover:bg-royal-blue/[0.02]'
                  }`}
                >
                  <span className="transition-colors duration-200" style={{ color: activeId === ind.id ? 'white' : ind.color }}>
                    {ind.icon}
                  </span>
                  {ind.name}
                </button>
              ))}
            </div>

            {/* Browser frame demo */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
              {/* Chrome bar */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-300" />
                  <div className="h-3 w-3 rounded-full bg-yellow-300" />
                  <div className="h-3 w-3 rounded-full bg-green-300" />
                </div>
                <div className="flex-1 flex items-center gap-2 mx-8 px-4 py-1.5 bg-white border border-gray-200 rounded-lg max-w-lg">
                  <svg className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="text-xs text-gray-400">nagriva.ai/{active.id}</span>
                </div>
                <div className="w-10" />
              </div>

              <div className="grid lg:grid-cols-3 min-h-[500px]">
                {/* Left: Conversation */}
                <div className="lg:col-span-2 border-r border-gray-100 flex flex-col">
                  {/* AI Header */}
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100"
                    style={{ opacity: phase === 'exiting' ? 0.5 : 1, transition: 'opacity 0.25s ease' }}
                  >
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-deep-black">Nagriva AI — {active.name}</p>
                      <p className="text-xs text-emerald-500 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                        Active — Handling conversations
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {active.conversations.map((msg, i) => (
                      <div
                        key={`${active.id}-${i}`}
                        className={`flex ${msg.role === 'visitor' ? 'justify-end' : 'justify-start'}`}
                        style={{
                          opacity: phase === 'visible' ? 1 : 0,
                          transform: phase === 'visible'
                            ? 'translateY(0) scale(1)'
                            : msg.role === 'visitor'
                              ? 'translateY(10px) scale(0.97)'
                              : 'translateY(-10px) scale(0.97)',
                          transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                        }}
                      >
                        {msg.role === 'ai' && (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shrink-0 mt-0.5 mr-3">
                            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                          </div>
                        )}
                        <div className="max-w-[80%]">
                          <div className={`px-4 py-3 rounded-2xl ${
                            msg.role === 'visitor'
                              ? 'bg-royal-blue text-white rounded-tr-sm'
                              : 'bg-gray-100 text-gray-700 rounded-tl-sm'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    <div
                      style={{
                        opacity: phase === 'visible' ? 1 : 0,
                        transition: `opacity 0.3s ease ${active.conversations.length * 120 + 200}ms`,
                      }}
                    >
                      <div className="flex justify-start">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shrink-0 mr-3">
                          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                          </svg>
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" />
                            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animationDelay: '0.15s' }} />
                            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animationDelay: '0.3s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex gap-3">
                      <div className="flex-1 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 flex items-center">
                        <span className="text-sm text-gray-400">Type a message...</span>
                      </div>
                      <div className="h-11 w-11 rounded-xl bg-royal-blue flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Workflow + Results */}
                <div className="flex flex-col">
                  {/* Workflow */}
                  <div className="p-6 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Workflow</p>
                    <div className="space-y-2">
                      {active.workflow.map((step, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3"
                          style={{
                            opacity: phase === 'visible' ? 1 : 0,
                            transform: phase === 'visible' ? 'translateX(0)' : 'translateX(10px)',
                            transition: `all 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 80 + 100}ms`,
                          }}
                        >
                          <div
                            className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
                            style={{ background: active.color }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-xs text-gray-600">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="p-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Results</p>
                    <div className="space-y-3">
                      {active.results.map((r, i) => (
                        <div
                          key={r.label}
                          className="p-3 bg-gray-50 rounded-xl border border-gray-100"
                          style={{
                            opacity: phase === 'visible' ? 1 : 0,
                            transform: phase === 'visible' ? 'scale(1)' : 'scale(0.95)',
                            transition: `all 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 100 + 400}ms`,
                          }}
                        >
                          <p className="text-[10px] text-gray-400 font-medium">{r.label}</p>
                          <div className="flex items-end justify-between mt-1">
                            <span className="text-lg font-bold text-deep-black">{r.value}</span>
                            <span className="text-xs font-medium text-emerald-600">{r.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
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
   SECTION 4 — BUSINESS IMPACT
   ═══════════════════════════════════════════ */

function BusinessImpactSection() {
  const kpis = [
    { value: '68%', label: 'Faster Response', description: 'Average response time drops from minutes to seconds', icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )},
    { value: '42%', label: 'More Leads', description: 'Capture and qualify leads 24/7 without adding headcount', icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    )},
    { value: '98%', label: 'Customer Satisfaction', description: 'Consistently high CSAT scores across every touchpoint', icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    )},
    { value: '24/7', label: 'Availability', description: 'Never miss a lead, question, or booking — even at 3 AM', icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeader
          badge="Business Impact"
          title="Results you can measure"
          description="Real metrics from real businesses using Nagriva. These aren't projections — they're outcomes."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => (
            <RevealBlock key={kpi.label} delay={i * 100}>
              <div className="group bg-white rounded-[20px] border border-gray-100 p-8 text-center transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] hover:-translate-y-1 h-full">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-5 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110">
                  {kpi.icon}
                </div>
                <p className="text-5xl md:text-6xl font-bold text-deep-black mb-2 tracking-tight">{kpi.value}</p>
                <p className="text-lg font-semibold text-deep-black mb-2">{kpi.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{kpi.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — WORKFLOW
   ═══════════════════════════════════════════ */

function WorkflowSection() {
  const steps = [
    { label: 'Visitor', description: 'A potential customer lands on your website or sends a message', color: '#3B82F6', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )},
    { label: 'AI Employee', description: 'Nagriva instantly engages, understands intent, and qualifies the lead', color: '#1E40AF', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    )},
    { label: 'CRM', description: 'Lead data, conversation history, and context are pushed to your CRM', color: '#8B5CF6', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    )},
    { label: 'Calendar', description: 'Appointments, demos, and consultations are booked automatically', color: '#10B981', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    )},
    { label: 'Human', description: 'When needed, context-rich handoff to a human agent — zero repetition', color: '#F59E0B', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )},
    { label: 'Completed', description: 'Task resolved, customer satisfied, data logged — all in seconds', color: '#059669', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionHeader
          badge="How It Works"
          title="From first touch to resolution"
          description="Every interaction follows an intelligent pipeline that adapts to your business needs."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-royal-blue/20 via-royal-blue/40 to-emerald-500/20" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <RevealBlock key={step.label} delay={i * 100}>
                <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center text-white shadow-lg"
                      style={{ background: step.color, boxShadow: `0 4px 14px -3px ${step.color}40` }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className={`inline-block bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:border-royal-blue/20 hover:shadow-md ${i % 2 === 0 ? '' : ''}`}>
                      <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <div className="text-xs font-bold text-gray-300">0{i + 1}</div>
                        <h3 className="text-lg font-semibold text-deep-black">{step.label}</h3>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6 — INTEGRATIONS
   ═══════════════════════════════════════════ */

function IntegrationsSection() {
  const integrations = [
    { name: 'WhatsApp', icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    )},
    { name: 'Slack', icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z"/>
      </svg>
    )},
    { name: 'HubSpot', icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.24 10.285V14.4h6.804c-.275 1.765-2.056 5.174-6.804 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
      </svg>
    )},
    { name: 'Shopify', icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.337 23.979l7.216-7.216V0H0v29.979h7.578V23.98h7.759zm5.647-7.216l3.498-3.498V2.407h-3.498v11.148l-3.222-3.222-1.414 1.414 4.636 4.636v.362zm-9.638-2.93L5.43 16.38V2.407h3.498v10.337l3.418 3.418-1.346 1.346z"/>
      </svg>
    )},
    { name: 'Zapier', icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.996 13.066h3.559l-.656 2.504h-3.524l.621-2.504zm3.631-4.289l-.601 2.47h-3.471l.595-2.47h3.477zM12.026 8.777l-.638 2.504H7.868l.619-2.504h3.539zm4.192 0l-.6 2.504h-3.49l.595-2.504h3.495zm-4.165-4.37l-.634 2.47H7.892l.616-2.47h3.546zm4.191 0l-.598 2.47h-3.487l.595-2.47h3.49zM8.062 17.442l-.62 2.504H3.89l.6-2.504h3.572zm4.181 0l-.593 2.504H8.06l.595-2.504h3.588zM8.033 13.066l-.618 2.504H3.89l.6-2.504h3.543zm4.184 0l-.593 2.504H8.054l.593-2.504h3.57zM8.05 8.777l-.618 2.504H3.888l.6-2.504h3.562zm4.185 0l-.592 2.504H8.05l.594-2.504h3.591zm.017-4.37l-.613 2.47H3.896l.599-2.47h7.777zm4.18 0l-.587 2.47H12.24l.592-2.47h3.495z"/>
      </svg>
    )},
    { name: 'Google Calendar', icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
      </svg>
    )},
    { name: 'Messenger', icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2V22l3.04-1.67c.81.23 1.68.35 2.56.35h.25c5.64 0 10.04-4.13 10.04-9.58C21 6.13 16.64 2 12 2zm1.07 12.98l-2.54-2.72L6.2 14.97l5.39-5.73 2.6 2.72 4.33-2.72-5.45 5.8z"/>
      </svg>
    )},
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeader
          badge="Integrations"
          title="Works with the tools you already use"
          description="Connect Nagriva to your existing stack in minutes. No developers required."
        />

        <RevealBlock>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 md:gap-8">
            {integrations.map((int, i) => (
              <div
                key={int.name}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300 hover:bg-gray-50 hover:shadow-sm cursor-default"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="text-gray-300 transition-all duration-300 group-hover:text-gray-600 group-hover:scale-110">
                  {int.icon}
                </div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors duration-200 text-center">
                  {int.name}
                </span>
              </div>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={200}>
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 mb-4">Plus 5,000+ more via Zapier and our REST API</p>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-royal-blue hover:gap-3 transition-all duration-200">
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
   SECTION 7 — CASE STUDIES
   ═══════════════════════════════════════════ */

function CaseStudiesSection() {
  const cases = [
    {
      company: 'MedCare Clinic Network',
      type: 'Healthcare',
      result: 'Reduced appointment no-shows by 62% with AI-powered reminders and rebooking',
      metric: '1,240 appointments/month automated',
      quote: "Nagriva handles our patient intake so our staff can focus on what matters — delivering excellent care.",
      author: 'Dr. Sarah Chen',
      role: 'Director of Operations',
    },
    {
      company: 'Urban Eats Group',
      type: 'Restaurants',
      result: 'Increased online orders by 45% while cutting response time from 12 minutes to 8 seconds',
      metric: '$127K additional revenue per quarter',
      quote: "During rush hour we used to lose orders. Now every single inquiry gets handled instantly.",
      author: 'Marco Rossi',
      role: 'CEO',
    },
    {
      company: 'Sterling & Associates',
      type: 'Law Firm',
      result: 'Qualified 85% more leads and booked 320 consultations per month — on autopilot',
      metric: '34% increase in billable hours',
      quote: "Our attorneys only speak with qualified prospects now. Nagriva does the screening better than we ever did.",
      author: 'James Sterling',
      role: 'Managing Partner',
    },
  ];

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionHeader
          badge="Customer Success"
          title="Trusted by businesses that demand results"
          description="See how companies across industries are transforming their operations with Nagriva."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <RevealBlock key={c.company} delay={i * 100}>
              <div className="group bg-white rounded-[20px] border border-gray-100 p-8 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] hover:-translate-y-1 h-full flex flex-col">
                <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-4 px-3 py-1 bg-royal-blue/[0.04] rounded-full w-fit">
                  {c.type}
                </span>

                <h3 className="text-xl font-semibold text-deep-black mb-3 tracking-tight">{c.company}</h3>

                <p className="text-[15px] text-gray-500 leading-relaxed mb-4 flex-1">{c.result}</p>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl mb-6 w-fit">
                  <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-sm font-semibold text-emerald-700">{c.metric}</span>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <p className="text-sm text-gray-500 italic mb-3 leading-relaxed">"{c.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                      {c.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-deep-black">{c.author}</p>
                      <p className="text-[11px] text-gray-400">{c.role}</p>
                    </div>
                  </div>
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
   SECTION 8 — FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCTASection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-royal-blue/[0.02] to-white pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-royal-blue/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-3xl text-center">
        <div className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="heading-lg text-deep-black mb-5">
            Ready to automate your business?
          </h2>
          <p className="text-body max-w-xl mx-auto mb-10">
            Join hundreds of businesses using Nagriva to handle conversations, book appointments, and close deals — 24/7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */

export default function SolutionsPage() {
  return (
    <>
      <HeroSection />
      <IndustriesSection />
      <InteractiveDemoSection />
      <BusinessImpactSection />
      <WorkflowSection />
      <IntegrationsSection />
      <CaseStudiesSection />
      <FinalCTASection />
    </>
  );
}
