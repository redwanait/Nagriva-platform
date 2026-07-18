import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { useSEO } from '../lib/seo';
import {
  Search,
  ChevronDown,
  ArrowRight,
  Star,
  Clock,
  Globe,
  Plug,
  Zap,
  Shield,
  Languages,
  BarChart3,
  Brain,
  MessageSquare,
  Users,
  Headphones,
  TrendingUp,
  Calendar,
  UserCheck,
  Mail,
  Pen,
  Share2,
  BookOpen,
  Heart,
  UserPlus,
  DollarSign,
  Home,
  Stethoscope,
  Scale,
  ShoppingCart,
  UtensilsCrossed,
  Hotel,
  Bot,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowDown,
  LayoutGrid,
  Settings,
  Clock3,
  ChevronRight,
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

function RevealScale({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────────────────────── */

const categories = [
  { label: 'All Categories', value: 'all' },
  { label: 'Customer Support', value: 'customer-support' },
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Content', value: 'content' },
  { label: 'HR', value: 'hr' },
  { label: 'Finance', value: 'finance' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Legal', value: 'legal' },
  { label: 'Real Estate', value: 'real-estate' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'Education', value: 'education' },
];

const industries = [
  { label: 'All Industries', value: 'all' },
  { label: 'SaaS & Tech', value: 'saas' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'Real Estate', value: 'real-estate' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'Finance', value: 'finance' },
  { label: 'Legal', value: 'legal' },
  { label: 'Education', value: 'education' },
  { label: 'Restaurant & Food', value: 'restaurant' },
];

const experienceLevels = [
  { label: 'Any Experience', value: 'all' },
  { label: 'Entry Level', value: 'entry' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Enterprise', value: 'enterprise' },
];

const positions = [
  {
    title: 'AI Customer Support Agent',
    category: 'Customer Support',
    categoryColor: 'bg-blue-50 text-blue-600 border-blue-100',
    description: 'Handle customer inquiries 24/7 with instant, accurate responses. Resolve tickets, answer FAQs, and escalate complex issues to your team.',
    languages: ['English', 'Spanish', 'French'],
    integrations: ['Zendesk', 'Intercom', 'Freshdesk'],
    price: '29',
    rating: 4.9,
    reviews: 312,
    setupTime: '15 min',
    icon: Headphones,
  },
  {
    title: 'AI Sales Representative',
    category: 'Sales',
    categoryColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    description: 'Qualify leads, book demos, and nurture prospects through your pipeline. Never miss a lead again with round-the-clock availability.',
    languages: ['English', 'German', 'Portuguese'],
    integrations: ['HubSpot', 'Salesforce', 'Pipedrive'],
    price: '49',
    rating: 4.8,
    reviews: 248,
    setupTime: '20 min',
    icon: TrendingUp,
  },
  {
    title: 'AI Receptionist',
    category: 'Customer Support',
    categoryColor: 'bg-blue-50 text-blue-600 border-blue-100',
    description: 'Answer calls, greet visitors, and route inquiries professionally. Your virtual front desk that never takes a break.',
    languages: ['English', 'French', 'Arabic'],
    integrations: ['Twilio', 'Google Calendar', 'Zapier'],
    price: '39',
    rating: 4.9,
    reviews: 189,
    setupTime: '10 min',
    icon: Bot,
  },
  {
    title: 'AI Appointment Scheduler',
    category: 'Customer Support',
    categoryColor: 'bg-blue-50 text-blue-600 border-blue-100',
    description: 'Book, reschedule, and manage appointments autonomously. Syncs with your calendar and sends reminders to reduce no-shows.',
    languages: ['English', 'Spanish', 'Italian'],
    integrations: ['Google Calendar', 'Calendly', 'Outlook'],
    price: '29',
    rating: 4.7,
    reviews: 276,
    setupTime: '10 min',
    icon: Calendar,
  },
  {
    title: 'AI Lead Qualification Agent',
    category: 'Sales',
    categoryColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    description: 'Score and qualify inbound leads in real-time. Route high-intent prospects to your sales team instantly.',
    languages: ['English', 'Dutch', 'Swedish'],
    integrations: ['HubSpot', 'Salesforce', 'Marketo'],
    price: '49',
    rating: 4.8,
    reviews: 194,
    setupTime: '15 min',
    icon: UserCheck,
  },
  {
    title: 'AI Marketing Assistant',
    category: 'Marketing',
    categoryColor: 'bg-violet-50 text-violet-600 border-violet-100',
    description: 'Plan campaigns, draft copy, analyze performance, and suggest optimizations across all your marketing channels.',
    languages: ['English', 'Spanish', 'German'],
    integrations: ['Mailchimp', 'Google Ads', 'Meta Ads'],
    price: '49',
    rating: 4.7,
    reviews: 167,
    setupTime: '20 min',
    icon: Sparkles,
  },
  {
    title: 'AI Content Writer',
    category: 'Content',
    categoryColor: 'bg-amber-50 text-amber-600 border-amber-100',
    description: 'Generate blog posts, product descriptions, social copy, and email campaigns that match your brand voice perfectly.',
    languages: ['English', 'French', 'Portuguese'],
    integrations: ['WordPress', 'Webflow', 'Notion'],
    price: '39',
    rating: 4.8,
    reviews: 231,
    setupTime: '15 min',
    icon: Pen,
  },
  {
    title: 'AI Social Media Manager',
    category: 'Marketing',
    categoryColor: 'bg-violet-50 text-violet-600 border-violet-100',
    description: 'Schedule posts, respond to comments, analyze engagement trends, and grow your social presence across platforms.',
    languages: ['English', 'Spanish', 'Japanese'],
    integrations: ['Instagram', 'LinkedIn', 'X (Twitter)'],
    price: '49',
    rating: 4.6,
    reviews: 152,
    setupTime: '20 min',
    icon: Share2,
  },
  {
    title: 'AI Email Assistant',
    category: 'Marketing',
    categoryColor: 'bg-violet-50 text-violet-600 border-violet-100',
    description: 'Draft, personalize, and send follow-up emails at scale. Manage inbox triage and keep your communication pipeline flowing.',
    languages: ['English', 'German', 'French'],
    integrations: ['Gmail', 'Outlook', 'SendGrid'],
    price: '29',
    rating: 4.7,
    reviews: 198,
    setupTime: '10 min',
    icon: Mail,
  },
  {
    title: 'AI Knowledge Base Assistant',
    category: 'Customer Support',
    categoryColor: 'bg-blue-50 text-blue-600 border-blue-100',
    description: 'Train on your documentation and deliver instant, accurate answers. Reduce support volume by up to 60%.',
    languages: ['English', 'Spanish', 'Chinese'],
    integrations: ['Notion', 'Confluence', 'GitBook'],
    price: '39',
    rating: 4.9,
    reviews: 287,
    setupTime: '25 min',
    icon: BookOpen,
  },
  {
    title: 'AI HR Assistant',
    category: 'HR',
    categoryColor: 'bg-rose-50 text-rose-600 border-rose-100',
    description: 'Streamline onboarding, answer employee policy questions, manage PTO requests, and handle HR workflows automatically.',
    languages: ['English', 'Spanish', 'French'],
    integrations: ['BambooHR', 'Workday', 'Slack'],
    price: '49',
    rating: 4.7,
    reviews: 143,
    setupTime: '20 min',
    icon: Users,
  },
  {
    title: 'AI Recruiter',
    category: 'HR',
    categoryColor: 'bg-rose-50 text-rose-600 border-rose-100',
    description: 'Screen resumes, schedule interviews, and engage candidates throughout the hiring pipeline with personalized communication.',
    languages: ['English', 'German', 'Dutch'],
    integrations: ['LinkedIn', 'Greenhouse', 'Lever'],
    price: '59',
    rating: 4.8,
    reviews: 121,
    setupTime: '25 min',
    icon: UserPlus,
  },
  {
    title: 'AI Financial Assistant',
    category: 'Finance',
    categoryColor: 'bg-teal-50 text-teal-600 border-teal-100',
    description: 'Automate expense tracking, generate financial summaries, and answer accounting queries with real-time data access.',
    languages: ['English', 'German', 'French'],
    integrations: ['QuickBooks', 'Xero', 'Stripe'],
    price: '59',
    rating: 4.7,
    reviews: 98,
    setupTime: '30 min',
    icon: DollarSign,
  },
  {
    title: 'AI Real Estate Assistant',
    category: 'Real Estate',
    categoryColor: 'bg-orange-50 text-orange-600 border-orange-100',
    description: 'Qualify buyers, schedule property viewings, provide neighborhood insights, and follow up with listings automatically.',
    languages: ['English', 'Spanish', 'Portuguese'],
    integrations: ['Zillow', 'MLS', 'CRM'],
    price: '49',
    rating: 4.8,
    reviews: 134,
    setupTime: '20 min',
    icon: Home,
  },
  {
    title: 'AI Healthcare Assistant',
    category: 'Healthcare',
    categoryColor: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    description: 'Manage patient intake, answer health-related FAQs, schedule appointments, and send medication reminders securely.',
    languages: ['English', 'Spanish', 'French'],
    integrations: ['EHR Systems', 'Calendly', 'Twilio'],
    price: '69',
    rating: 4.9,
    reviews: 87,
    setupTime: '30 min',
    icon: Stethoscope,
  },
  {
    title: 'AI Legal Assistant',
    category: 'Legal',
    categoryColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    description: 'Draft contracts, review documents, answer legal FAQs, and manage client intake workflows with precision and confidentiality.',
    languages: ['English', 'French', 'German'],
    integrations: ['Clio', 'DocuSign', 'Google Docs'],
    price: '69',
    rating: 4.8,
    reviews: 76,
    setupTime: '30 min',
    icon: Scale,
  },
  {
    title: 'AI E-commerce Assistant',
    category: 'E-commerce',
    categoryColor: 'bg-pink-50 text-pink-600 border-pink-100',
    description: 'Recommend products, track orders, handle returns, and upsell customers through personalized shopping experiences.',
    languages: ['English', 'Spanish', 'Japanese'],
    integrations: ['Shopify', 'WooCommerce', 'Stripe'],
    price: '49',
    rating: 4.8,
    reviews: 203,
    setupTime: '20 min',
    icon: ShoppingCart,
  },
  {
    title: 'AI Restaurant Assistant',
    category: 'Hospitality',
    categoryColor: 'bg-lime-50 text-lime-600 border-lime-100',
    description: 'Take reservations, manage orders, answer menu questions, and handle delivery inquiries around the clock.',
    languages: ['English', 'Spanish', 'Italian'],
    integrations: ['OpenTable', 'Uber Eats', 'DoorDash'],
    price: '39',
    rating: 4.7,
    reviews: 156,
    setupTime: '15 min',
    icon: UtensilsCrossed,
  },
  {
    title: 'AI Hotel Concierge',
    category: 'Hospitality',
    categoryColor: 'bg-lime-50 text-lime-600 border-lime-100',
    description: 'Assist guests with bookings, local recommendations, amenity requests, and special accommodations before and during their stay.',
    languages: ['English', 'French', 'Japanese'],
    integrations: ['Cloudbeds', 'Booking.com', 'WhatsApp'],
    price: '59',
    rating: 4.8,
    reviews: 112,
    setupTime: '25 min',
    icon: Hotel,
  },
  {
    title: 'AI Personal Assistant',
    category: 'Customer Support',
    categoryColor: 'bg-blue-50 text-blue-600 border-blue-100',
    description: 'Manage your schedule, set reminders, draft messages, and handle daily tasks so you can focus on what matters most.',
    languages: ['English', 'Spanish', 'German'],
    integrations: ['Google Calendar', 'Notion', 'Slack'],
    price: '29',
    rating: 4.9,
    reviews: 342,
    setupTime: '10 min',
    icon: Heart,
  },
];

const categoryCards = [
  { name: 'Customer Support', icon: Headphones, count: 4, color: 'from-blue-500/10 to-blue-600/5', iconColor: 'text-blue-600' },
  { name: 'Sales', icon: TrendingUp, count: 2, color: 'from-emerald-500/10 to-emerald-600/5', iconColor: 'text-emerald-600' },
  { name: 'Marketing', icon: Sparkles, count: 3, color: 'from-violet-500/10 to-violet-600/5', iconColor: 'text-violet-600' },
  { name: 'Content', icon: Pen, count: 1, color: 'from-amber-500/10 to-amber-600/5', iconColor: 'text-amber-600' },
  { name: 'HR', icon: Users, count: 2, color: 'from-rose-500/10 to-rose-600/5', iconColor: 'text-rose-600' },
  { name: 'Finance', icon: DollarSign, count: 1, color: 'from-teal-500/10 to-teal-600/5', iconColor: 'text-teal-600' },
  { name: 'Healthcare', icon: Stethoscope, count: 1, color: 'from-cyan-500/10 to-cyan-600/5', iconColor: 'text-cyan-600' },
  { name: 'Legal', icon: Scale, count: 1, color: 'from-indigo-500/10 to-indigo-600/5', iconColor: 'text-indigo-600' },
  { name: 'Education', icon: GraduationCap, count: 1, color: 'from-sky-500/10 to-sky-600/5', iconColor: 'text-sky-600' },
  { name: 'Real Estate', icon: Home, count: 1, color: 'from-orange-500/10 to-orange-600/5', iconColor: 'text-orange-600' },
  { name: 'Hospitality', icon: Hotel, count: 2, color: 'from-lime-500/10 to-lime-600/5', iconColor: 'text-lime-600' },
  { name: 'E-commerce', icon: ShoppingCart, count: 1, color: 'from-pink-500/10 to-pink-600/5', iconColor: 'text-pink-600' },
];

const features = [
  { icon: Clock, title: '24/7 Availability', description: 'Your AI Employees work around the clock — no breaks, no holidays, no sick days.' },
  { icon: Zap, title: 'Instant Responses', description: 'Respond in milliseconds, not minutes. Keep every customer engaged from the first interaction.' },
  { icon: BookOpen, title: 'Custom Knowledge', description: 'Train on your docs, policies, and processes. Every answer reflects your brand perfectly.' },
  { icon: Languages, title: 'Multi-language Support', description: 'Communicate fluently in 50+ languages. Serve a global audience without hiring translators.' },
  { icon: Shield, title: 'Secure Infrastructure', description: 'Enterprise-grade encryption and compliance. Your data stays protected at all times.' },
  { icon: Plug, title: 'Easy Integrations', description: 'Connect to your CRM, helpdesk, calendar, and 100+ tools in just a few clicks.' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Track performance, conversations, and ROI in real-time with detailed analytics.' },
  { icon: Brain, title: 'Continuous Learning', description: 'AI Employees improve with every conversation, getting smarter and more accurate over time.' },
];

const processSteps = [
  { number: '01', title: 'Choose a Position', description: 'Browse our catalog of AI Employees and select the one that fits your business needs.' },
  { number: '02', title: 'Customize AI Employee', description: 'Set the tone, personality, knowledge scope, and response guidelines for your AI team member.' },
  { number: '03', title: 'Connect Your Knowledge', description: 'Upload your docs, FAQs, and processes so your AI Employee gives accurate, brand-aligned answers.' },
  { number: '04', title: 'Go Live', description: 'Deploy across your channels — website, WhatsApp, email, or phone — in minutes.' },
];

const faqs = [
  {
    question: 'What is an AI Employee?',
    answer: 'An AI Employee is a specialized AI agent designed to handle specific business roles — like customer support, sales, or scheduling. Unlike generic chatbots, AI Employees are trained on your specific business knowledge and integrated directly into your existing tools and workflows.',
  },
  {
    question: 'Can I train it on my own data?',
    answer: 'Absolutely. Every AI Employee can be trained on your documentation, FAQs, product catalogs, internal policies, and more. The more context you provide, the more accurate and on-brand the responses become. You can update the knowledge base at any time.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Most AI Employees are fully operational within 10 to 30 minutes. The process involves selecting a position, uploading your knowledge base, configuring integrations, and going live. Enterprise setups with complex workflows may take slightly longer.',
  },
  {
    question: 'Can it integrate with my CRM?',
    answer: 'Yes. Nagriva integrates natively with major CRMs like HubSpot, Salesforce, and Pipedrive, as well as helpdesk tools like Zendesk and Intercom. We also support Zapier and webhooks for custom integrations.',
  },
  {
    question: 'Which languages are supported?',
    answer: 'Our AI Employees support over 50 languages including English, Spanish, French, German, Portuguese, Arabic, Japanese, Chinese, and many more. You can configure multiple languages per AI Employee to serve a global audience.',
  },
  {
    question: 'Can I upgrade later?',
    answer: 'Yes, you can upgrade your plan at any time. As your business grows, you can add more AI Employees, increase usage limits, and unlock advanced features like analytics, custom integrations, and priority support.',
  },
];

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function PositionsPage() {
  useSEO({
    title: 'AI Positions',
    description: 'Browse AI-powered positions designed to automate your business. Hire AI Employees for customer support, sales, marketing, HR, and more — all from one platform.',
    keywords: ['AI employees', 'AI positions', 'hire AI', 'AI agents', 'business automation', 'AI workforce'],
  });

  return (
    <>
      <main>
        <HeroSection />
        <FeaturedPositionsSection />
        <CategoriesSection />
        <WhyHireSection />
        <ProcessSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

/* ─── Section 1 — Hero ────────────────────────────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* Badge */}
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            AI Positions
          </span>
        </div>

        {/* Headline */}
        <div className={`text-center max-w-4xl mx-auto mb-8 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            Hire Your Next{' '}
            <span className="text-royal-blue">AI Employee</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Browse AI-powered positions designed to automate your business and help your team work smarter.
          </p>
        </div>

        {/* 3D AI Illustration + Search */}
        <div className={`flex flex-col lg:flex-row items-center gap-10 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Illustration */}
          <div className="hidden lg:flex flex-shrink-0 items-center justify-center w-[320px] h-[320px]">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/15 to-royal-blue-light/10 rounded-full blur-[60px] animate-pulse" />
              {/* Core */}
              <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shadow-2xl shadow-royal-blue/25">
                <Bot className="h-20 w-20 text-white" />
              </div>
              {/* Orbiting dots */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center" style={{ animation: 'nagriva-float 3s ease-in-out infinite' }}>
                <MessageSquare className="h-5 w-5 text-royal-blue" />
              </div>
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center" style={{ animation: 'nagriva-float 3s ease-in-out infinite 0.5s' }}>
                <Calendar className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="absolute -bottom-2 left-8 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center" style={{ animation: 'nagriva-float 3s ease-in-out infinite 1s' }}>
                <TrendingUp className="h-5 w-5 text-violet-500" />
              </div>
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center" style={{ animation: 'nagriva-float 3s ease-in-out infinite 1.5s' }}>
                <Headphones className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Search Panel */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.06)]">
              {/* Search input */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI positions..."
                  className="w-full pl-12 pr-4 py-3.5 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 placeholder:text-gray-400"
                />
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    {industries.map((i) => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    {experienceLevels.map((e) => (
                      <option key={e.value} value={e.value}>{e.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stats + CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <LayoutGrid className="h-4 w-4 text-royal-blue" />
                  <span><span className="font-semibold text-deep-black">{positions.length}</span> AI Positions Available</span>
                </div>
                <a href="#featured" className="btn-primary text-sm px-6 py-3 gap-2">
                  Browse Positions
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2 — Featured Positions ──────────────────────────────────── */

function FeaturedPositionsSection() {
  return (
    <section id="featured" className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Positions
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Ready-to-Deploy AI Employees
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Each position is pre-configured with industry expertise, multi-language support, and seamless integrations. Pick one and go live in minutes.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {positions.map((pos, i) => (
            <RevealBlock key={pos.title} delay={Math.min(i * 50, 300)}>
              <PositionCard position={pos} />
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function PositionCard({ position }: { position: typeof positions[0] }) {
  const Icon = position.icon;
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full flex flex-col overflow-hidden">
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${position.categoryColor}`}>
            {position.category}
          </span>
        </div>

        {/* Title + description */}
        <h3 className="text-[15px] font-semibold text-deep-black mb-2 leading-snug">{position.title}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4 flex-1">{position.description}</p>

        {/* Languages */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Languages className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Languages</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {position.languages.map((lang) => (
              <span key={lang} className="px-2 py-0.5 text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-100 rounded-md">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Plug className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Integrations</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {position.integrations.map((intg) => (
              <span key={intg} className="px-2 py-0.5 text-[11px] font-medium text-royal-blue bg-royal-blue/[0.04] border border-royal-blue/10 rounded-md">
                {intg}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {/* Price */}
            <div className="flex items-baseline gap-0.5">
              <span className="text-xs text-gray-400">from</span>
              <span className="text-lg font-bold text-deep-black">${position.price}</span>
              <span className="text-xs text-gray-400">/mo</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-deep-black">{position.rating}</span>
              <span className="text-[11px] text-gray-400">({position.reviews})</span>
            </div>
          </div>
        </div>

        {/* Setup time + CTA */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-[12px] text-gray-500">Setup: {position.setupTime}</span>
          </div>
          <button className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]">
            View Position
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Section 3 — Categories ──────────────────────────────────────────── */

function CategoriesSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <LayoutGrid className="h-3.5 w-3.5" />
              Categories
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              AI Employees for Every Department
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              From customer-facing roles to back-office operations, find the right AI Employee for every team.
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {categoryCards.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <RevealBlock key={cat.name} delay={i * 50}>
                <div className="group relative rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.06)] cursor-pointer text-center overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  <div className="relative">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 mx-auto mb-3 transition-all duration-300 group-hover:scale-110 ${cat.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-deep-black mb-1">{cat.name}</h3>
                    <p className="text-[12px] text-gray-400">{cat.count} AI {cat.count === 1 ? 'Employee' : 'Employees'}</p>
                  </div>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4 — Why Hire AI Employees ───────────────────────────────── */

function WhyHireSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Zap className="h-3.5 w-3.5" />
              Why AI Employees
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Why Hire AI Employees
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              AI Employees don't just save time — they transform how your business operates.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <RevealBlock key={feat.title} delay={i * 60}>
                <div className="group relative rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.06)] h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] text-royal-blue mb-4 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-deep-black mb-2">{feat.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{feat.description}</p>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5 — Hiring Process ──────────────────────────────────────── */

function ProcessSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Settings className="h-3.5 w-3.5" />
              How It Works
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Deploy in 4 Simple Steps
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              From selection to live deployment, the entire process takes minutes — not weeks.
            </p>
          </div>
        </RevealBlock>

        {/* Horizontal timeline for desktop */}
        <div ref={ref} className="hidden md:block max-w-5xl mx-auto mb-16">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[40px] left-[60px] right-[60px] h-px bg-gradient-to-r from-royal-blue/20 via-royal-blue/15 to-royal-blue/20" />

            <div className="grid grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <RevealBlock key={step.number} delay={i * 100}>
                  <div className="relative text-center">
                    {/* Step number circle */}
                    <div className="relative z-10 mx-auto mb-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white border-2 border-royal-blue/15 text-royal-blue transition-all duration-500 group-hover:border-royal-blue mx-auto">
                        <span className="text-2xl font-bold">{step.number}</span>
                      </div>
                    </div>
                    {/* Arrow (except last) */}
                    {i < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-[32px] -right-3 z-20">
                        <ChevronRight className="h-5 w-5 text-royal-blue/30" />
                      </div>
                    )}
                    <h3 className="text-base font-semibold text-deep-black mb-2">{step.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical timeline for mobile */}
        <div className="md:hidden max-w-lg mx-auto">
          <div className="relative">
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-royal-blue/20 via-royal-blue/15 to-royal-blue/20" />
            <div className="space-y-0">
              {processSteps.map((step, i) => {
                const isLast = i === processSteps.length - 1;
                return (
                  <RevealBlock key={step.number} delay={i * 80}>
                    <div className="relative flex items-start gap-5">
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${
                          isLast
                            ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/20'
                            : 'bg-white border-2 border-royal-blue/15 text-royal-blue'
                        }`}>
                          <span className="text-sm font-bold">{step.number}</span>
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className={`rounded-2xl p-5 transition-all duration-300 ${
                          isLast
                            ? 'bg-royal-blue/[0.04] border border-royal-blue/10'
                            : 'bg-white border border-gray-100 hover:border-royal-blue/15 hover:shadow-sm'
                        }`}>
                          <h3 className={`text-sm font-semibold ${isLast ? 'text-royal-blue' : 'text-deep-black'} tracking-tight mb-1`}>
                            {step.title}
                          </h3>
                          <p className="text-[13px] text-gray-500 leading-relaxed">{step.description}</p>
                        </div>
                        {!isLast && (
                          <div className="flex justify-start pl-4 py-2.5">
                            <ArrowDown className="h-4 w-4 text-royal-blue/25" />
                          </div>
                        )}
                      </div>
                    </div>
                  </RevealBlock>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6 — FAQ ─────────────────────────────────────────────────── */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <MessageSquare className="h-3.5 w-3.5" />
              FAQ
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Frequently Asked Questions
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Everything you need to know about hiring AI Employees.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <RevealBlock key={faq.question} delay={i * 50}>
              <div className="mb-3">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 rounded-2xl border border-gray-100 bg-white text-left transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm"
                >
                  <span className="text-[15px] font-semibold text-deep-black">{faq.question}</span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 flex-shrink-0 transition-all duration-300 ${openIndex === i ? 'rotate-180 bg-royal-blue/[0.06]' : ''}`}>
                    <ChevronDown className={`h-4 w-4 transition-colors duration-300 ${openIndex === i ? 'text-royal-blue' : 'text-gray-400'}`} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 pt-2">
                    <p className="text-[14px] text-gray-500 leading-relaxed">{faq.answer}</p>
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

/* ─── Section 7 — Final CTA ───────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Ready to Hire Your First{' '}
                <span className="text-royal-blue">AI Employee?</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Launch your AI workforce in minutes. No coding required, no long setup processes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#featured" className="btn-primary text-base px-8 py-3.5 gap-2">
                  Browse Positions
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#/contact" className="btn-secondary text-base px-8 py-3.5">
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
