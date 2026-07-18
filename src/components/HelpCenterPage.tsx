import { useEffect, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import Footer from './Footer';
import {
  Search, Clock, ArrowRight, ArrowLeft, ThumbsUp, ThumbsDown,
  Rocket, Bot, BookOpen, Link2, CreditCard, Settings, UserCog, AlertTriangle,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */

const SCREENSHOT_BASE = 'https://placehold.co/1200x700/F5F7FB/94A3B8?text=Nagriva+Screenshot';

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView(0.05);
  return (
    <div ref={ref} className={`transition-all duration-500 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const categories = [
  { icon: Rocket, title: 'Getting Started', description: 'Account setup and first steps.', color: 'from-blue-500/10 to-blue-600/5' },
  { icon: Bot, title: 'AI Employees', description: 'Create and manage AI agents.', color: 'from-violet-500/10 to-violet-600/5' },
  { icon: BookOpen, title: 'Knowledge Base', description: 'Train AI with your data.', color: 'from-emerald-500/10 to-emerald-600/5' },
  { icon: Link2, title: 'Integrations', description: 'Connect channels and tools.', color: 'from-amber-500/10 to-amber-600/5' },
  { icon: CreditCard, title: 'Billing', description: 'Plans, payments and invoices.', color: 'from-pink-500/10 to-pink-600/5' },
  { icon: Settings, title: 'Settings', description: 'Workspace and team config.', color: 'from-gray-500/10 to-gray-600/5' },
  { icon: UserCog, title: 'Account', description: 'Profile, security and SSO.', color: 'from-cyan-500/10 to-cyan-600/5' },
  { icon: AlertTriangle, title: 'Troubleshooting', description: 'Fix common issues fast.', color: 'from-red-500/10 to-red-600/5' },
];

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  time: string;
  difficulty: 'Beginner' | 'Intermediate';
  steps: { title: string; text: string; image: string }[];
  toc: string[];
}

const tutorials: Tutorial[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with Nagriva',
    description: 'Create your account, explore the dashboard, and prepare your first AI Employee in under 5 minutes.',
    category: 'Getting Started',
    time: '5 min',
    difficulty: 'Beginner',
    toc: ['Create your account', 'Explore the dashboard', 'Understand billing basics', 'Next steps'],
    steps: [
      { title: 'Create your account', text: 'Go to app.nagriva.ai and click "Get Started". Enter your work email, create a password, and verify your email from the confirmation link. No credit card is required for the free trial.', image: SCREENSHOT_BASE },
      { title: 'Explore the dashboard', text: 'After signing in, you land on the main dashboard. The left sidebar gives you access to AI Employees, Conversations, Knowledge Base, Analytics, and Settings. Take a moment to familiarize yourself with each section.', image: SCREENSHOT_BASE },
      { title: 'Understand billing basics', text: 'Navigate to Settings > Billing to see available plans. The Starter plan includes up to 3 AI Employees. Pro and Enterprise plans offer unlimited agents, priority support, and advanced analytics.', image: SCREENSHOT_BASE },
      { title: 'Next steps', text: 'You are ready to create your first AI Employee. Head to the AI Employees section and follow the "Create First AI Employee" tutorial to deploy your first agent.', image: SCREENSHOT_BASE },
    ],
  },
  {
    id: 'create-ai-employee',
    title: 'Create Your First AI Employee',
    description: 'Step-by-step guide to creating, configuring, and deploying an AI Employee for your business.',
    category: 'AI Employees',
    time: '8 min',
    difficulty: 'Beginner',
    toc: ['Choose an agent type', 'Configure personality and behavior', 'Set up knowledge sources', 'Test your AI Employee', 'Deploy to production'],
    steps: [
      { title: 'Choose an agent type', text: 'Navigate to AI Employees and click "Create New". Select from Support, Sales, or General purpose. Each type comes with pre-configured behaviors optimized for that use case.', image: SCREENSHOT_BASE },
      { title: 'Configure personality and behavior', text: 'Write a system prompt that defines how your AI Employee communicates. Specify the tone (professional, friendly, formal), the topics it should handle, and any actions it can take on behalf of your team.', image: SCREENSHOT_BASE },
      { title: 'Set up knowledge sources', text: 'Assign one or more Knowledge Base collections to your AI Employee. These collections contain the documents, FAQs, and product data your agent will reference when answering questions.', image: SCREENSHOT_BASE },
      { title: 'Test your AI Employee', text: 'Use the built-in chat simulator to test your agent before going live. Ask common questions, check response accuracy, and refine the system prompt until you are satisfied with the quality.', image: SCREENSHOT_BASE },
      { title: 'Deploy to production', text: 'Once you are happy with the results, click "Deploy". Your AI Employee is now live and ready to handle real conversations across your connected channels.', image: SCREENSHOT_BASE },
    ],
  },
  {
    id: 'train-ai-employee',
    title: 'Train an AI Employee',
    description: 'Learn how to upload documents, organize knowledge, and fine-tune your AI Employee responses.',
    category: 'Knowledge Base',
    time: '10 min',
    difficulty: 'Intermediate',
    toc: ['Upload your documents', 'Organize into collections', 'Fine-tune responses', 'Monitor and improve'],
    steps: [
      { title: 'Upload your documents', text: 'Go to Knowledge Base and click "Upload". You can add PDFs, Word documents, plain text files, or paste content directly. Each file is processed and indexed for semantic search.', image: SCREENSHOT_BASE },
      { title: 'Organize into collections', text: 'Group related documents into collections — for example, "Product FAQ", "Policies", or "Onboarding". Collections make it easier to assign specific knowledge to specific AI Employees.', image: SCREENSHOT_BASE },
      { title: 'Fine-tune responses', text: 'Use the Training tab to review how your AI Employee responds to sample questions. You can flag incorrect answers, provide better responses, and create custom rules for specific scenarios.', image: SCREENSHOT_BASE },
      { title: 'Monitor and improve', text: 'Check the Analytics section regularly to identify questions your AI Employee struggles with. Upload additional documents or adjust training data to close knowledge gaps.', image: SCREENSHOT_BASE },
    ],
  },
  {
    id: 'connect-knowledge-base',
    title: 'Connect Your Knowledge Base',
    description: 'Link documents, websites, and data sources to power accurate AI responses.',
    category: 'Knowledge Base',
    time: '6 min',
    difficulty: 'Beginner',
    toc: ['Add a data source', 'Connect a website', 'Verify indexing', 'Assign to agents'],
    steps: [
      { title: 'Add a data source', text: 'In the Knowledge Base section, click "Add Source". Choose from file upload, direct text input, or website URL. Each source is processed independently and can be managed separately.', image: SCREENSHOT_BASE },
      { title: 'Connect a website', text: 'Select "Website" as your source type and enter the URL. Nagriva will crawl the site and extract content from all pages. You can exclude specific paths using the exclusion rules.', image: SCREENSHOT_BASE },
      { title: 'Verify indexing', text: 'After uploading, check the indexing status. Each source shows a progress indicator. Once indexing is complete, use the search preview to verify that your content is being retrieved correctly.', image: SCREENSHOT_BASE },
      { title: 'Assign to agents', text: 'Go to your AI Employee settings and select which Knowledge Base collections it should access. You can assign different collections to different agents for department-specific knowledge.', image: SCREENSHOT_BASE },
    ],
  },
  {
    id: 'integrate-whatsapp',
    title: 'Integrate WhatsApp',
    description: 'Connect Nagriva to WhatsApp Business and start handling conversations automatically.',
    category: 'Integrations',
    time: '12 min',
    difficulty: 'Intermediate',
    toc: ['Prerequisites', 'Connect WhatsApp Business', 'Configure routing', 'Test the integration', 'Go live'],
    steps: [
      { title: 'Prerequisites', text: 'You need a WhatsApp Business account with API access. If you do not have one, visit business.whatsapp.com to register. You will also need admin access to your Nagriva workspace.', image: SCREENSHOT_BASE },
      { title: 'Connect WhatsApp Business', text: 'Go to Settings > Integrations > WhatsApp. Click "Connect Account" and follow the OAuth flow to authorize Nagriva. You will be prompted to select your WhatsApp Business phone number.', image: SCREENSHOT_BASE },
      { title: 'Configure routing', text: 'Set up routing rules to determine which AI Employee handles incoming WhatsApp messages. You can route by language, message content, or time of day.', image: SCREENSHOT_BASE },
      { title: 'Test the integration', text: 'Send a test message from a different phone number to verify the connection. Check that the AI Employee responds correctly and that the conversation appears in your Nagriva dashboard.', image: SCREENSHOT_BASE },
      { title: 'Go live', text: 'Once testing is complete, enable the integration. Your AI Employee will now automatically respond to all incoming WhatsApp messages according to your routing rules.', image: SCREENSHOT_BASE },
    ],
  },
  {
    id: 'invite-team-members',
    title: 'Invite Team Members',
    description: 'Add colleagues to your workspace with the right roles and permissions.',
    category: 'Account',
    time: '4 min',
    difficulty: 'Beginner',
    toc: ['Navigate to team settings', 'Send invitations', 'Assign roles', 'Manage access'],
    steps: [
      { title: 'Navigate to team settings', text: 'Go to Settings > Team. You will see a list of current team members and their roles. Only admins can invite new members.', image: SCREENSHOT_BASE },
      { title: 'Send invitations', text: 'Click "Invite Member" and enter their email address. Choose a role (Admin, Editor, or Viewer) and click "Send". They will receive an email with a link to join your workspace.', image: SCREENSHOT_BASE },
      { title: 'Assign roles', text: 'Admins have full access to all settings. Editors can manage AI Employees and Knowledge Base but cannot change billing. Viewers have read-only access to dashboards and analytics.', image: SCREENSHOT_BASE },
      { title: 'Manage access', text: 'You can change a member\'s role or remove them at any time from the Team settings page. Removed members immediately lose access to the workspace.', image: SCREENSHOT_BASE },
    ],
  },
  {
    id: 'manage-billing',
    title: 'Manage Billing',
    description: 'Understand plans, update payment methods, and download invoices.',
    category: 'Billing',
    time: '5 min',
    difficulty: 'Beginner',
    toc: ['View your current plan', 'Upgrade or downgrade', 'Update payment method', 'Download invoices'],
    steps: [
      { title: 'View your current plan', text: 'Go to Settings > Billing. Your current plan, usage, and next billing date are displayed at the top. You can see a breakdown of features included in your plan below.', image: SCREENSHOT_BASE },
      { title: 'Upgrade or downgrade', text: 'Click "Change Plan" to see available options. Select your new plan and confirm. Upgrades take effect immediately with prorated billing. Downgrades apply at the start of the next billing cycle.', image: SCREENSHOT_BASE },
      { title: 'Update payment method', text: 'Click "Payment Methods" to add, update, or remove credit cards. All payment processing is handled securely through Stripe. You can have multiple payment methods on file.', image: SCREENSHOT_BASE },
      { title: 'Download invoices', text: 'Scroll to the "Invoice History" section to view and download past invoices. Each invoice includes a detailed breakdown of charges for your accounting records.', image: SCREENSHOT_BASE },
    ],
  },
  {
    id: 'view-analytics',
    title: 'View Analytics',
    description: 'Track AI Employee performance, conversation metrics, and customer satisfaction.',
    category: 'AI Employees',
    time: '6 min',
    difficulty: 'Beginner',
    toc: ['Open the analytics dashboard', 'Understand key metrics', 'Filter and compare', 'Export reports'],
    steps: [
      { title: 'Open the analytics dashboard', text: 'Click Analytics in the left sidebar. The dashboard shows an overview of all AI Employee activity, including total conversations, resolution rate, and average response time.', image: SCREENSHOT_BASE },
      { title: 'Understand key metrics', text: 'Key metrics include: Total Conversations (all interactions), Resolution Rate (percentage handled without human handoff), Average Response Time, and CSAT Score (customer satisfaction).', image: SCREENSHOT_BASE },
      { title: 'Filter and compare', text: 'Use the date range picker and filters to analyze specific time periods, channels, or AI Employees. You can compare performance across agents to identify top performers.', image: SCREENSHOT_BASE },
      { title: 'Export reports', text: 'Click "Export" to download your analytics data as CSV or PDF. This is useful for sharing performance reports with stakeholders or importing data into your own BI tools.', image: SCREENSHOT_BASE },
    ],
  },
];

/* ═══════════════════════════════════════════
   SEARCH COMPONENT
   ═══════════════════════════════════════════ */

function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <div className={`max-w-xl mx-auto transition-all duration-300 ${focused ? 'scale-[1.01]' : ''}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search for help..."
          className="w-full pl-12 pr-20 py-3.5 rounded-xl border border-gray-200 bg-white text-deep-black text-sm placeholder:text-gray-400 focus:outline-none focus:border-royal-blue focus:ring-4 focus:ring-royal-blue/[0.06] transition-all duration-200 shadow-sm"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-6 items-center rounded-md bg-gray-50 border border-gray-200 px-2 text-[10px] font-medium text-gray-400">⌘K</kbd>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function HeroSection({ onSearch }: { onSearch: (q: string) => void }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6">
      <div ref={ref} className={`relative mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue uppercase tracking-wider mb-5">
          Help Center
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-deep-black tracking-tight leading-[1.1] mb-4">
          Learn how to use Nagriva{' '}
          <span className="text-royal-blue">step by step.</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
          Find tutorials, guides, and answers to common questions about every part of the platform.
        </p>
        <SearchBar onSearch={onSearch} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CATEGORY CARDS
   ═══════════════════════════════════════════ */

function CategoriesSection({ onFilter }: { onFilter: (cat: string | null) => void }) {
  return (
    <section className="px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-2">Browse by topic</h2>
            <p className="text-sm text-gray-500">Choose a category to find relevant tutorials.</p>
          </div>
        </RevealBlock>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <RevealBlock key={cat.title} delay={i * 60}>
              <button
                onClick={() => onFilter(cat.title)}
                className="group w-full text-left bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-lg hover:shadow-royal-blue/[0.04] hover:-translate-y-0.5"
              >
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-royal-blue mb-3 transition-all duration-300 group-hover:scale-110`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-deep-black mb-1">{cat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{cat.description}</p>
              </button>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TUTORIAL CARDS
   ═══════════════════════════════════════════ */

function TutorialsSection({ items, onSelect, filter, onFilter }: { items: Tutorial[]; onSelect: (t: Tutorial) => void; filter: string | null; onFilter: (cat: string | null) => void }) {
  const filtered = filter ? items.filter((t) => t.category === filter) : items;

  return (
    <section className="px-6 py-12 md:px-12 lg:px-24 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-1">
                {filter ? filter : 'All Tutorials'}
              </h2>
              <p className="text-sm text-gray-500">{filtered.length} tutorial{filtered.length !== 1 ? 's' : ''} available</p>
            </div>
            {filter && (
              <button onClick={() => onFilter(null)} className="text-sm font-medium text-royal-blue hover:underline">
                View all
              </button>
            )}
          </div>
        </RevealBlock>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tutorial, i) => (
            <RevealBlock key={tutorial.id} delay={i * 80}>
              <button
                onClick={() => onSelect(tutorial)}
                className="group w-full text-left bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-royal-blue/20 hover:shadow-lg hover:shadow-royal-blue/[0.04] hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img src={tutorial.steps[0]?.image} alt={tutorial.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-royal-blue bg-royal-blue/[0.06] px-2 py-0.5 rounded-md">{tutorial.category}</span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${tutorial.difficulty === 'Beginner' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>{tutorial.difficulty}</span>
                  </div>
                  <h3 className="text-base font-semibold text-deep-black mb-2 leading-snug group-hover:text-royal-blue transition-colors duration-200">{tutorial.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{tutorial.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{tutorial.time} read</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{tutorial.steps.length} steps</span>
                  </div>
                </div>
              </button>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TUTORIAL ARTICLE VIEW
   ═══════════════════════════════════════════ */

function TutorialArticle({ tutorial, onBack }: { tutorial: Tutorial; onBack: () => void }) {
  return (
    <section className="px-6 pt-8 pb-20 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-royal-blue transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to tutorials
        </button>

        <div className="grid lg:grid-cols-[1fr_220px] gap-12 lg:gap-16">
          {/* Main article */}
          <article className="max-w-[780px]">
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-semibold text-royal-blue bg-royal-blue/[0.06] px-2 py-0.5 rounded-md">{tutorial.category}</span>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${tutorial.difficulty === 'Beginner' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>{tutorial.difficulty}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-deep-black tracking-tight mb-4">{tutorial.title}</h1>
              <p className="text-lg text-gray-500 leading-relaxed">{tutorial.description}</p>
            </div>

            {/* Steps */}
            <div className="space-y-14">
              {tutorial.steps.map((step, i) => (
                <div key={i} className="scroll-mt-24" id={`step-${i}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-blue text-white text-sm font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <h2 className="text-xl font-bold text-deep-black tracking-tight pt-0.5">{step.title}</h2>
                  </div>
                  <p className="text-[15px] text-gray-600 leading-[1.75] ml-12 mb-5">{step.text}</p>
                  {/* Screenshot placeholder */}
                  <div className="ml-12 rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                    <img src={step.image} alt={`${step.title} screenshot`} className="w-full h-auto block" loading="lazy" />
                    <p className="text-xs text-gray-400 text-center py-2.5 bg-gray-50 border-t border-gray-100">
                      Screenshot will be replaced with the real Nagriva interface.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom nav */}
            <div className="border-t border-gray-200 mt-14 pt-8 flex items-center justify-between">
              <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-royal-blue transition-colors">
                <ArrowLeft className="h-4 w-4" /> All tutorials
              </button>
            </div>
          </article>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold text-gray-400 tracking-[0.12em] uppercase mb-3">Contents</p>
              <ul className="space-y-0.5 mb-6">
                {tutorial.toc.map((item, i) => (
                  <li key={i}>
                    <a
                      href={`#step-${i}`}
                      className="block text-[13px] text-gray-500 hover:text-royal-blue py-1 px-3 rounded-md hover:bg-royal-blue/[0.04] transition-colors duration-150"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{tutorial.time} read</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-xs text-gray-400 mb-2">Was this helpful?</p>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
                    <ThumbsUp className="h-3 w-3" /> Yes
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors">
                    <ThumbsDown className="h-3 w-3" /> No
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BOTTOM CTA
   ═══════════════════════════════════════════ */

function BottomCTA() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <div ref={ref} className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-3">Still need help?</h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">Our team is here to help you get the most out of Nagriva.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#/contact" className="btn-primary text-base px-8 py-3.5">
                Contact Support
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <a href="#/pricing" className="btn-secondary text-base px-8 py-3.5">
                Book a Demo
              </a>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function HelpCenterPage() {
  const [view, setView] = useState<'browse' | 'article'>('browse');
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    document.title = 'Help Center | Nagriva';
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) { metaTag = document.createElement('meta'); metaTag.setAttribute('name', 'description'); document.head.appendChild(metaTag); }
    metaTag.setAttribute('content', 'Find tutorials, guides, troubleshooting and support resources for the Nagriva AI workforce platform.');
    return () => { document.title = prevTitle; if (prevDesc && metaTag) metaTag.setAttribute('content', prevDesc); };
  }, []);

  const handleSelectTutorial = useCallback((t: Tutorial) => {
    setActiveTutorial(t);
    setView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setView('browse');
    setActiveTutorial(null);
  }, []);

  const handleFilter = useCallback((cat: string | null) => {
    setFilter(cat);
    setView('browse');
    setActiveTutorial(null);
  }, []);

  const filteredTutorials = searchQuery.trim()
    ? tutorials.filter((t) => {
        const q = searchQuery.toLowerCase();
        return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
      })
    : tutorials;

  return (
    <>
      <main>
        {view === 'browse' ? (
          <>
            <HeroSection onSearch={setSearchQuery} />
            <CategoriesSection onFilter={handleFilter} />
            <TutorialsSection items={filteredTutorials} onSelect={handleSelectTutorial} filter={filter} onFilter={handleFilter} />
            <BottomCTA />
          </>
        ) : activeTutorial ? (
          <>
            <div className="pt-24 md:pt-28 px-6 md:px-12 lg:px-24">
              <div className="max-w-7xl mx-auto">
                <HeroSection onSearch={setSearchQuery} />
              </div>
            </div>
            <TutorialArticle tutorial={activeTutorial} onBack={handleBack} />
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
