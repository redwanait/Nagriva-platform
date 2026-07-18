import { useState } from 'react';
import {
  Search,
  BookOpen,
  Video,
  HelpCircle,
  Headphones,
  Rocket,
  Activity,
  ChevronDown,
  Mail,
  Clock,
  Send,
  Sparkles,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

/* ── FAQ Data ── */

const FAQ_ITEMS = [
  {
    question: 'How do I create my first AI Employee?',
    answer:
      'Navigate to "My AI Employees" in the sidebar and click "Create AI Employee". Follow the step-by-step wizard to configure your employee\'s name, personality, knowledge base, and integration channels. Your AI Employee will be ready within minutes.',
  },
  {
    question: 'How do I connect WhatsApp?',
    answer:
      'Go to "Integrations" in your dashboard and select WhatsApp. You\'ll be guided through the WhatsApp Business API setup process. Once connected, your AI Employee will automatically handle incoming WhatsApp messages.',
  },
  {
    question: 'How do I upload my Knowledge Base?',
    answer:
      'Open "Knowledge Base" from the sidebar. You can upload documents, FAQs, product information, and other content that your AI Employee should reference when answering customer questions. Supported formats include PDF, DOCX, TXT, and CSV.',
  },
  {
    question: 'How do AI Employees work?',
    answer:
      'AI Employees are intelligent assistants trained on your knowledge base. They can handle customer conversations via your website widget, WhatsApp, and other channels. They learn from your content, resolve queries, escalate complex issues, and improve over time.',
  },
  {
    question: 'How do I invite team members?',
    answer: null,
    comingSoon: true,
  },
  {
    question: 'How do subscriptions work?',
    answer: null,
    comingSoon: true,
  },
];

/* ── Quick Help Cards Data ── */

const QUICK_HELP_CARDS = [
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Learn how to use every feature of Nagriva.',
    badge: 'Coming Soon' as const,
    badgeType: 'coming-soon' as const,
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video guides.',
    badge: 'Coming Soon' as const,
    badgeType: 'coming-soon' as const,
  },
  {
    icon: HelpCircle,
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions.',
    badge: null,
    badgeType: null,
  },
  {
    icon: Headphones,
    title: 'Contact Support',
    description: "Send us a message and we'll respond by email.",
    badge: null,
    badgeType: null,
  },
  {
    icon: Rocket,
    title: 'Product Roadmap',
    description: 'See upcoming features.',
    badge: 'Coming Soon' as const,
    badgeType: 'coming-soon' as const,
  },
  {
    icon: Activity,
    title: 'System Status',
    description: 'Check platform availability.',
    badge: 'Operational' as const,
    badgeType: 'operational' as const,
  },
];

/* ── Helper Components ── */

function HelpCenterBadge({ type }: { type: 'coming-soon' | 'operational' }) {
  if (type === 'operational') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Operational
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500 border border-gray-200">
      <Sparkles className="w-2.5 h-2.5" />
      Coming Soon
    </span>
  );
}

/* ── FAQ Accordion Item ── */

function FAQItem({
  question,
  answer,
  comingSoon,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string | null;
  comingSoon?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50/50 transition-colors"
      >
        <span className="text-sm font-semibold text-deep-black">{question}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {comingSoon && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-400 border border-gray-200">
              Coming Soon
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 pt-0">
          {answer ? (
            <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">
              This feature is coming soon. Stay tuned!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Contact Form ── */

function ContactSupportForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const INPUT =
    'w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-blue/[0.06] border border-royal-blue/10">
            <Mail className="w-[18px] h-[18px] text-royal-blue" />
          </div>
          <h2 className="text-sm font-semibold text-deep-black">Send us a message</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-700 font-medium">
            Support messaging coming soon. The form below will be functional in a future update.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={INPUT}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={INPUT}
              placeholder="How can we help?"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className={`${INPUT} resize-none`}
              placeholder="Describe your question or issue in detail..."
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl opacity-60 cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function ClientHelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenFaq(openFaq === index ? null : index);
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {/* ── Page Header ── */}
      <section className="flex items-center justify-between gap-6 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
            Help Center
          </h1>
          <p className="text-[15px] text-gray-500">
            Find answers, learn how to use Nagriva, and get help whenever you need it.
          </p>
        </div>
      </section>

      {/* ── Search Bar ── */}
      <section>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:shadow-sm"
            placeholder="Search for help..."
          />
        </div>
        {searchQuery && (
          <p className="text-xs text-gray-400 mt-2 ml-1">Search functionality coming soon.</p>
        )}
      </section>

      {/* ── Quick Help Cards ── */}
      <section>
        <h2 className="text-sm font-semibold text-deep-black mb-4">Quick Help</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_HELP_CARDS.map((card) => {
            const isClickable =
              card.badgeType === null ||
              (card.badgeType === 'operational');

            return (
              <button
                key={card.title}
                onClick={() => {
                  if (card.title === 'Frequently Asked Questions') scrollToSection('faq-section');
                  if (card.title === 'Contact Support') scrollToSection('contact-section');
                }}
                disabled={!isClickable}
                className={`text-left bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 group ${
                  isClickable
                    ? 'hover:border-gray-300 hover:shadow-sm cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] border border-royal-blue/10 transition-all duration-250 group-hover:bg-royal-blue group-hover:border-royal-blue">
                    <card.icon className="w-[18px] h-[18px] text-royal-blue transition-colors duration-250 group-hover:text-white" />
                  </div>
                  {card.badge && <HelpCenterBadge type={card.badgeType!} />}
                </div>
                <h3 className="text-sm font-semibold text-deep-black mb-1">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                {isClickable && card.badgeType === null && (
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium text-royal-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span>Learn more</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section id="faq-section">
        <h2 className="text-sm font-semibold text-deep-black mb-4">
          Frequently Asked Questions
        </h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-2 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                comingSoon={item.comingSoon}
                isOpen={openFaq === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Support ── */}
      <section id="contact-section">
        <h2 className="text-sm font-semibold text-deep-black mb-4">Contact Support</h2>
        <ContactSupportForm />
      </section>

      {/* ── Footer Card ── */}
      <section>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal-blue/[0.06] border border-royal-blue/10 flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-royal-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-deep-black mb-0.5">Need more help?</h3>
              <p className="text-xs text-gray-500">
                Our support team is available to assist you with any questions.
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
              <a
                href="mailto:support@nagriva.com"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-blue hover:text-royal-blue-dark transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@nagriva.com
              </a>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                Average response time: Within 24 hours
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
