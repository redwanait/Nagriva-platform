import { useEffect, useState, useCallback, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import {
  ArrowRight,
  Bot,
  Search,
  BookOpen,
  Key,
  Zap,
  MessageSquare,
  BarChart3,
  Plug,
  Webhook,
  AlertTriangle,
  Gauge,
  Code2,
  Clock,
  Copy,
  Check,
  Lock,
  Activity,
  GitBranch,
  XCircle,
  Play,
  Terminal,
  FileJson,
  Shield,
  Globe,
} from 'lucide-react';
import Footer from './Footer';

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const BASE_URL = 'https://api.nagriva.com/v1';

const sidebarSections = [
  { id: 'getting-started', label: 'Getting Started', icon: Zap },
  { id: 'authentication', label: 'Authentication', icon: Key },
  { id: 'quick-start', label: 'Quick Start', icon: Terminal },
  { id: 'ai-employees', label: 'AI Employees', icon: Bot },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'errors', label: 'Errors', icon: AlertTriangle },
  { id: 'rate-limits', label: 'Rate Limits', icon: Gauge },
  { id: 'sdks', label: 'SDKs', icon: Code2 },
  { id: 'changelog', label: 'Changelog', icon: Clock },
];

const rightTocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'endpoints', label: 'Endpoints' },
  { id: 'examples', label: 'Examples' },
  { id: 'errors', label: 'Errors' },
  { id: 'rate-limits', label: 'Rate Limits' },
  { id: 'sdks', label: 'SDKs' },
];

const searchableContent = [
  { id: 'getting-started', title: 'Getting Started', keywords: ['introduction', 'overview', 'api', 'rest'] },
  { id: 'authentication', title: 'Authentication', keywords: ['bearer', 'token', 'api key', 'oauth', 'security'] },
  { id: 'quick-start', title: 'Quick Start', keywords: ['first request', 'tutorial', 'setup'] },
  { id: 'ai-employees', title: 'AI Employees', keywords: ['create', 'manage', 'employees', 'bots', 'agents'] },
  { id: 'knowledge-base', title: 'Knowledge Base', keywords: ['documents', 'upload', 'knowledge', 'training'] },
  { id: 'conversations', title: 'Conversations', keywords: ['messages', 'chat', 'history'] },
  { id: 'analytics', title: 'Analytics', keywords: ['metrics', 'usage', 'statistics', 'performance'] },
  { id: 'webhooks', title: 'Webhooks', keywords: ['events', 'notifications', 'real-time'] },
  { id: 'errors', title: 'Errors', keywords: ['error codes', 'status', 'http', 'debugging'] },
  { id: 'rate-limits', title: 'Rate Limits', keywords: ['throttling', 'limits', 'quotas'] },
  { id: 'sdks', title: 'SDKs', keywords: ['libraries', 'node.js', 'python', 'php', 'sdk'] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

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

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function Badge({ children, variant = 'default' }: {
  children: React.ReactNode;
  variant?: 'default' | 'coming-soon' | 'get' | 'post' | 'put' | 'delete' | 'operational';
}) {
  const styles: Record<string, string> = {
    default: 'bg-royal-blue/[0.06] text-royal-blue border-royal-blue/10',
    'coming-soon': 'bg-amber-50 text-amber-600 border-amber-200',
    get: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    post: 'bg-blue-50 text-blue-700 border-blue-200',
    put: 'bg-orange-50 text-orange-600 border-orange-200',
    delete: 'bg-red-50 text-red-600 border-red-200',
    operational: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
}

function CodeBlock({ children, title, language = 'bash' }: {
  children: string;
  title?: string;
  language?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#0B0B0B] overflow-hidden">
      {/* Terminal-style header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <span className="text-xs font-medium text-gray-400 ml-2">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{language}</span>
          <CopyButton text={children} />
        </div>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-[13px] leading-relaxed">
        <code className="text-gray-300 font-mono">{children}</code>
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEARCH MODAL
   ═══════════════════════════════════════════════════════════════════════════ */

function SearchModal({ isOpen, onClose, onNavigate }: {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose();
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = query.length > 0
    ? searchableContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )
    : searchableContent;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search API documentation..."
            className="flex-1 text-sm text-deep-black placeholder-gray-400 outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
            ESC
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="h-8 w-8 rounded-lg bg-royal-blue/[0.06] flex items-center justify-center flex-shrink-0">
                <Search className="h-4 w-4 text-royal-blue" />
              </div>
              <div>
                <div className="text-sm font-medium text-deep-black">{item.title}</div>
                <div className="text-xs text-gray-500 capitalize">{item.id.replace('-', ' ')}</div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════════════════════════ */

function Sidebar({ activeSection, onSearch }: { activeSection: string; onSearch: () => void }) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-28">
        {/* Search bar above sidebar */}
        <button
          onClick={onSearch}
          className="w-full flex items-center gap-2 px-3 py-2.5 mb-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 hover:bg-white transition-all"
        >
          <Search className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 text-left">Search API...</span>
          <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </button>

        <div className="space-y-0.5">
          {sidebarSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-royal-blue/[0.08] text-royal-blue'
                    : 'text-gray-500 hover:text-deep-black hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {section.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE SIDEBAR
   ═══════════════════════════════════════════════════════════════════════════ */

function MobileSidebar({ activeSection, isOpen, onClose }: {
  activeSection: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-deep-black">Navigation</span>
          <button onClick={onClose} className="text-gray-400 hover:text-deep-black">
            <XCircle className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-0.5">
          {sidebarSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-royal-blue/[0.08] text-royal-blue'
                    : 'text-gray-500 hover:text-deep-black hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {section.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RIGHT TOC
   ═══════════════════════════════════════════════════════════════════════════ */

function RightToc({ activeSection }: { activeSection: string }) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav className="hidden xl:block w-52 flex-shrink-0">
      <div className="sticky top-28">
        <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-5">On this page</h4>
        <div className="space-y-1 border-l border-gray-200">
          {rightTocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block pl-4 py-2 text-[13px] transition-all duration-150 ${
                activeSection === item.id
                  ? 'text-royal-blue border-l-2 border-royal-blue -ml-[2px] font-medium'
                  : 'text-gray-500 hover:text-deep-black hover:border-l-2 hover:border-gray-300 hover:-ml-[2px]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TABBED CODE BLOCK
   ═══════════════════════════════════════════════════════════════════════════ */

function TabbedCodeBlock({ tabs }: {
  tabs: { label: string; language: string; code: string }[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="rounded-xl border border-gray-200 bg-[#0B0B0B] overflow-hidden">
      {/* Terminal dots + tabs */}
      <div className="flex items-center border-b border-white/10">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-r border-white/10">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center flex-1 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === i
                  ? 'text-white border-royal-blue-light'
                  : 'text-gray-500 hover:text-gray-300 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-shrink-0 px-4 py-2">
          <CopyButton text={tabs[activeTab].code} />
        </div>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-[13px] leading-relaxed">
        <code className="text-gray-300 font-mono">{tabs[activeTab].code}</code>
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ENDPOINT CARD
   ═══════════════════════════════════════════════════════════════════════════ */

function EndpointCard({ method, path, description, parameters, tabs, responseExample, comingSoon = false }: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters?: { name: string; type: string; description: string; required?: boolean }[];
  tabs?: { label: string; language: string; code: string }[];
  responseExample?: string;
  comingSoon?: boolean;
}) {
  const methodStyles: Record<string, 'get' | 'post' | 'put' | 'delete'> = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)]">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge variant={methodStyles[method]}>{method}</Badge>
        <code className="text-sm font-mono font-semibold text-deep-black">{path}</code>
        {comingSoon && <Badge variant="coming-soon">Coming Soon</Badge>}
      </div>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>

      {parameters && parameters.length > 0 && (
        <div className="mb-6">
          <h5 className="text-xs font-semibold text-deep-black uppercase tracking-wider mb-3">Parameters</h5>
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left px-4 py-2.5 font-semibold text-deep-black">Name</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-deep-black">Type</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-deep-black hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {parameters.map((param) => (
                  <tr key={param.name}>
                    <td className="px-4 py-2.5 font-mono text-xs text-deep-black">
                      {param.name}
                      {param.required && <span className="text-red-500 ml-1">*</span>}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-gray-500">{param.type}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-500 hidden sm:table-cell">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tabs && (
        <div className="mb-6">
          <h5 className="text-xs font-semibold text-deep-black uppercase tracking-wider mb-3">Request</h5>
          <TabbedCodeBlock tabs={tabs} />
        </div>
      )}

      {responseExample && (
        <div>
          <h5 className="text-xs font-semibold text-deep-black uppercase tracking-wider mb-3">Response</h5>
          <CodeBlock language="json">{responseExample}</CodeBlock>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION HEADING
   ═══════════════════════════════════════════════════════════════════════════ */

function SectionHeading({ icon: Icon, label, title }: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  title: string;
}) {
  return (
    <RevealBlock>
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-4">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
        <h2 className="heading-md text-deep-black">{title}</h2>
      </div>
    </RevealBlock>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATUS CARD
   ═══════════════════════════════════════════════════════════════════════════ */

function StatusCard({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-5 transition-all duration-300 hover:border-emerald-200 hover:shadow-sm min-h-[72px]">
      <span className="text-sm font-semibold text-deep-black">{label}</span>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-sm font-semibold text-emerald-600">{status}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   API PLAYGROUND
   ═══════════════════════════════════════════════════════════════════════════ */

function APIPlayground() {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/v1/employees');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = useCallback(() => {
    setIsLoading(true);
    setResponse('');
    setTimeout(() => {
      const mockResponses: Record<string, string> = {
        'GET /v1/employees': JSON.stringify({
          data: [
            { id: 'emp_123', name: 'Customer Support AI', status: 'active', model: 'gpt-4o' },
            { id: 'emp_456', name: 'Sales Assistant', status: 'active', model: 'gpt-4o' },
          ],
          total: 2,
          has_more: false,
        }, null, 2),
        'POST /v1/employees': JSON.stringify({
          id: 'emp_789',
          name: 'New Employee',
          status: 'active',
          created_at: new Date().toISOString(),
        }, null, 2),
        'GET /v1/conversations': JSON.stringify({
          data: [
            { id: 'conv_001', employee_id: 'emp_123', status: 'active', message_count: 12 },
          ],
          total: 1,
        }, null, 2),
      };
      setResponse(mockResponses[`${method} ${endpoint}`] || JSON.stringify({ error: { code: 'not_found', message: 'Endpoint not found' } }, null, 2));
      setIsLoading(false);
    }, 800);
  }, [method, endpoint]);

  const methodColors: Record<string, string> = {
    GET: 'text-emerald-400',
    POST: 'text-blue-400',
    PUT: 'text-orange-400',
    DELETE: 'text-red-400',
  };

  return (
    <RevealBlock>
      <div className="rounded-3xl border border-gray-200 bg-[#0B0B0B] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-8 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-royal-blue/20">
              <Play className="h-4 w-4 text-royal-blue-light" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">API Playground</h3>
              <p className="text-xs text-gray-500 mt-0.5">Test API endpoints with mock responses</p>
            </div>
          </div>
        </div>

        {/* Request URL Bar */}
        <div className="px-8 py-6 border-b border-white/10">
          <div className="flex items-stretch gap-3 h-12">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={`px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold outline-none focus:border-royal-blue-light cursor-pointer ${methodColors[method] || 'text-white'}`}
            >
              <option value="GET" className="bg-[#0B0B0B] text-emerald-400">GET</option>
              <option value="POST" className="bg-[#0B0B0B] text-blue-400">POST</option>
              <option value="PUT" className="bg-[#0B0B0B] text-orange-400">PUT</option>
              <option value="DELETE" className="bg-[#0B0B0B] text-red-400">DELETE</option>
            </select>
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono text-gray-500">https://api.nagriva.com</span>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full h-full pl-[196px] pr-4 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-white outline-none focus:border-royal-blue-light focus:ring-1 focus:ring-royal-blue-light/30"
                placeholder="/v1/endpoint"
              />
            </div>
            <button
              onClick={handleRun}
              disabled={isLoading}
              className="px-8 bg-royal-blue text-white text-sm font-semibold rounded-xl hover:bg-royal-blue-dark transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Running</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Run</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Headers & Body */}
        <div className="px-8 py-6 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Headers */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Headers</label>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <div className="grid grid-cols-[140px_1fr] border-b border-white/10">
                  <div className="px-4 py-3 text-xs font-medium text-gray-500 bg-white/[0.02] border-r border-white/10">Key</div>
                  <div className="px-4 py-3 text-xs font-medium text-gray-500 bg-white/[0.02]">Value</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] border-b border-white/10">
                  <div className="px-4 py-3 text-xs font-mono text-gray-300 border-r border-white/10">Authorization</div>
                  <div className="px-4 py-3 text-xs font-mono text-gray-400">Bearer YOUR_API_KEY</div>
                </div>
                <div className="grid grid-cols-[140px_1fr]">
                  <div className="px-4 py-3 text-xs font-mono text-gray-300 border-r border-white/10">Content-Type</div>
                  <div className="px-4 py-3 text-xs font-mono text-gray-400">application/json</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Request Body</label>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden h-[calc(100%-28px)]">
                <div className="px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">JSON</span>
                </div>
                <textarea
                  value={method === 'POST' ? '{\n  "name": "New Employee",\n  "role": "Customer Support"\n}' : ''}
                  readOnly
                  className="w-full h-[100px] px-4 py-3 bg-transparent text-xs font-mono text-gray-300 outline-none resize-none"
                  placeholder={method === 'GET' ? '// No body for GET requests' : '{\n  // Enter request body\n}'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Response */}
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Response</label>
            {response && (
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">200 OK • 48ms</span>
            )}
          </div>
          <div className="rounded-xl border border-white/10 bg-[#050505] overflow-hidden min-h-[220px]">
            {/* Terminal dots */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-[10px] font-medium text-gray-500">response.json</span>
            </div>
            <div className="p-5 min-h-[180px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[180px] gap-3">
                  <div className="h-6 w-6 border-2 border-royal-blue-light/30 border-t-royal-blue-light rounded-full animate-spin" />
                  <span className="text-xs text-gray-500">Sending request...</span>
                </div>
              ) : response ? (
                <pre className="overflow-auto text-[13px] leading-relaxed font-mono text-gray-300 whitespace-pre max-h-[300px]">{response}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-[180px] gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Play className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Click "Run" to see the response</p>
                    <p className="text-xs text-gray-600 mt-1">Results appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RevealBlock>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection({ onOpenMobileNav, onOpenSearch }: { onOpenMobileNav: () => void; onOpenSearch: () => void }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Mobile nav toggle */}
      <div className="lg:hidden fixed top-24 right-6 z-40">
        <button
          onClick={onOpenMobileNav}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-deep-black shadow-sm"
        >
          <Search className="h-4 w-4" />
          Sections
        </button>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* Badge */}
        <div className={`text-center mb-6 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            Developer Documentation
          </span>
        </div>

        {/* Headline */}
        <div className={`text-center max-w-4xl mx-auto mb-6 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-xl text-deep-black mb-5">
            Build with the{' '}
            <span className="text-royal-blue">Nagriva API</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Integrate AI Employees, Knowledge Bases, Conversations, Analytics, and Automations directly into your applications.
          </p>
        </div>

        {/* Info Badges */}
        <div className={`flex flex-wrap items-center justify-center gap-3 mb-8 transition-all duration-700 ease-out delay-250 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: Globe, label: 'REST API' },
            { icon: FileJson, label: 'JSON' },
            { icon: Lock, label: 'HTTPS' },
            { icon: Shield, label: 'OAuth 2.0' },
          ].map((item) => (
            <span key={item.label} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-deep-black shadow-sm">
              <item.icon className="h-4 w-4 text-royal-blue" />
              {item.label}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#/contact" className="btn-primary text-base px-8 py-3.5">
            Get API Key
          </a>
          <button
            onClick={onOpenSearch}
            className="btn-secondary text-base px-8 py-3.5 gap-2"
          >
            API Reference
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   API OVERVIEW CARD
   ═══════════════════════════════════════════════════════════════════════════ */

function APIOverviewCard() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = useCallback((field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const fields = [
    { label: 'Base URL', value: BASE_URL, field: 'base-url' },
    { label: 'Current Version', value: 'v1', field: 'version' },
    { label: 'Authentication', value: 'Bearer Token', field: 'auth' },
    { label: 'Status', value: 'Operational', field: 'status', isStatus: true },
    { label: 'Response Format', value: 'JSON', field: 'format' },
  ];

  return (
    <RevealBlock>
      <div className="mx-auto max-w-7xl px-6 -mt-8 mb-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {fields.map((item) => (
              <div key={item.field} className="relative group">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{item.label}</div>
                <div className="flex items-center gap-2">
                  {item.isStatus && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                  <span className={`text-sm font-semibold ${item.isStatus ? 'text-emerald-600' : 'text-deep-black'}`}>
                    {item.value}
                  </span>
                </div>
                {!item.isStatus && (
                  <button
                    onClick={() => handleCopy(item.field, item.value)}
                    className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedField === item.field ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-gray-400 hover:text-royal-blue" />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealBlock>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SDK CARDS
   ═══════════════════════════════════════════════════════════════════════════ */

function SDKSection() {
  const sdks = [
    {
      name: 'Node.js',
      language: 'TypeScript / JavaScript',
      icon: Terminal,
      description: 'Official Node.js SDK with TypeScript support, automatic retries, and comprehensive error handling.',
      install: 'npm install @nagriva/sdk',
      docs: '#/docs',
    },
    {
      name: 'Python',
      language: 'Python 3.8+',
      icon: Code2,
      description: 'Python SDK with async support, type hints, and integration with popular frameworks like FastAPI and Django.',
      install: 'pip install nagriva',
      docs: '#/docs',
    },
    {
      name: 'PHP',
      language: 'PHP 8.1+',
      icon: FileJson,
      description: 'PHP SDK with Laravel and Symfony integration packages, PSR standards compliance.',
      install: 'composer require nagriva/sdk',
      docs: '#/docs',
      comingSoon: true,
    },
    {
      name: 'REST',
      language: 'Any Language',
      icon: Globe,
      description: 'Direct REST API access. Use any HTTP client in any programming language.',
      install: 'curl https://api.nagriva.com/v1',
      docs: '#/docs',
    },
  ];

  return (
    <RevealBlock>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {sdks.map((sdk) => {
          const Icon = sdk.icon;
          return (
            <div key={sdk.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-xl bg-royal-blue/[0.06] flex items-center justify-center">
                  <Icon className="h-6 w-6 text-royal-blue" />
                </div>
                {sdk.comingSoon ? (
                  <Badge variant="coming-soon">Coming Soon</Badge>
                ) : (
                  <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">Available</span>
                )}
              </div>
              <h4 className="text-base font-bold text-deep-black mb-1">{sdk.name}</h4>
              <p className="text-sm text-gray-500 mb-3">{sdk.language}</p>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed flex-1">{sdk.description}</p>
              <div className="space-y-3 mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg">
                  <Terminal className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <code className="text-xs font-mono text-deep-black truncate">{sdk.install}</code>
                </div>
                <a
                  href={sdk.docs}
                  className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-royal-blue hover:text-royal-blue-dark py-2 rounded-lg border border-royal-blue/20 hover:bg-royal-blue/[0.03] transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Documentation
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </RevealBlock>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSE EXAMPLES
   ═══════════════════════════════════════════════════════════════════════════ */

function ResponseExamples() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      title: 'Success',
      badge: '200 OK',
      badgeVariant: 'get' as const,
      code: `{
  "data": [
    {
      "id": "emp_123",
      "name": "Customer Support AI",
      "status": "active",
      "model": "gpt-4o",
      "created_at": "2026-01-15T08:30:00Z"
    }
  ],
  "total": 1,
  "has_more": false
}`,
    },
    {
      title: 'Validation Error',
      badge: '400 Bad Request',
      badgeVariant: 'put' as const,
      code: `{
  "error": {
    "code": "validation_error",
    "message": "The 'name' field is required.",
    "status": 400,
    "details": [
      {
        "field": "name",
        "message": "Required"
      }
    ]
  }
}`,
    },
    {
      title: 'Unauthorized',
      badge: '401 Unauthorized',
      badgeVariant: 'delete' as const,
      code: `{
  "error": {
    "code": "unauthorized",
    "message": "Invalid or missing API key.",
    "status": 401
  }
}`,
    },
    {
      title: 'Not Found',
      badge: '404 Not Found',
      badgeVariant: 'delete' as const,
      code: `{
  "error": {
    "code": "not_found",
    "message": "Resource does not exist.",
    "status": 404
  }
}`,
    },
    {
      title: 'Rate Limit',
      badge: '429 Too Many Requests',
      badgeVariant: 'put' as const,
      code: `{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded.",
    "status": 429,
    "retry_after": 60
  }
}`,
    },
  ];

  const methodColors: Record<string, string> = {
    'get': 'text-emerald-600 bg-emerald-50 border-emerald-200',
    'put': 'text-orange-600 bg-orange-50 border-orange-200',
    'delete': 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <RevealBlock>
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto">
            {examples.map((example, i) => (
              <button
                key={example.title}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === i
                    ? 'border-royal-blue text-royal-blue bg-royal-blue/[0.02]'
                    : 'border-transparent text-gray-500 hover:text-deep-black hover:bg-gray-50'
                }`}
              >
                <span>{example.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${methodColors[example.badgeVariant] || 'text-gray-600 bg-gray-50 border-gray-200'}`}>
                  {example.badge.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {examples.map((example, i) => (
            <div
              key={example.title}
              className={`transition-all duration-300 ease-in-out ${
                activeTab === i ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${methodColors[example.badgeVariant] || 'text-gray-600 bg-gray-50 border-gray-200'}`}>
                    {example.badge}
                  </span>
                  <span className="text-xs text-gray-500">Response</span>
                </div>
                <CopyButton text={example.code} className="text-gray-500 hover:text-deep-black" />
              </div>

              {/* Code block */}
              <div className="bg-[#0B0B0B] p-6 md:p-8">
                <pre className="overflow-auto text-[13px] leading-[1.8] font-mono text-gray-300 whitespace-pre min-h-[320px] max-h-[400px]">
                  <code>{example.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealBlock>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function APIPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.title = 'API Documentation | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Explore the Nagriva API documentation to integrate AI Employees, Knowledge Bases, Conversations, Analytics, and Automation into your applications.');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarSections.map((s) => document.getElementById(s.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sidebarSections[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />
      <MobileSidebar activeSection={activeSection} isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <main>
        {/* ── Hero ── */}
        <HeroSection onOpenMobileNav={() => setMobileNavOpen(true)} onOpenSearch={() => setSearchOpen(true)} />

        {/* ── API Overview Card ── */}
        <APIOverviewCard />

        {/* ── Documentation Body ── */}
        <section className="px-6 pb-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl flex gap-12">
            <Sidebar activeSection={activeSection} onSearch={() => setSearchOpen(true)} />

            <div className="flex-1 min-w-0 space-y-24">

              {/* ── Getting Started ── */}
              <div id="getting-started">
                <SectionHeading icon={Zap} label="Getting Started" title="What is the Nagriva API?" />
                <RevealBlock>
                  <div className="space-y-5 text-[15px] leading-relaxed text-gray-500 max-w-[780px]">
                    <p>
                      The Nagriva API gives you programmatic access to every feature in the Nagriva platform. Create AI Employees, manage Knowledge Bases, send messages, query analytics, and build automations — all from your own application.
                    </p>
                    <p>
                      Whether you're building a custom integration, automating workflows, or embedding AI capabilities into your product, the API provides a clean RESTful interface with predictable resource-oriented URLs and JSON request/response bodies.
                    </p>
                    <p>
                      All API requests must be made over HTTPS. Calls made over plain HTTP will be rejected. API requests without authentication will also fail.
                    </p>
                  </div>
                </RevealBlock>
              </div>

              {/* ── Authentication ── */}
              <div id="authentication">
                <SectionHeading icon={Key} label="Authentication" title="Bearer Token" />
                <RevealBlock>
                  <div className="space-y-5 text-[15px] leading-relaxed text-gray-500 max-w-[780px] mb-6">
                    <p>
                      The Nagriva API uses Bearer Token authentication. Include your API key in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-deep-black">Authorization</code> header of every request.
                    </p>
                    <p>
                      You can generate and manage your API keys from the <strong className="text-deep-black font-semibold">Settings → API Keys</strong> section of your dashboard.
                    </p>
                  </div>
                  <CodeBlock title="Authentication Header" language="http">Authorization: Bearer YOUR_API_KEY</CodeBlock>
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                    <Lock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      <strong>Security note:</strong> Never expose your API key in client-side code or commit it to version control. Always use environment variables and make API calls from your backend.
                    </p>
                  </div>
                </RevealBlock>
              </div>

              {/* ── Quick Start ── */}
              <div id="quick-start">
                <SectionHeading icon={Terminal} label="Quick Start" title="Make Your First Request" />
                <RevealBlock>
                  <p className="text-[15px] leading-relaxed text-gray-500 max-w-[780px] mb-6">
                    Here's a simple request to list all AI Employees in your workspace. Choose your preferred language below.
                  </p>
                  <TabbedCodeBlock tabs={[
                    {
                      label: 'cURL',
                      language: 'bash',
                      code: `curl -X GET https://api.nagriva.com/v1/employees \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
                    },
                    {
                      label: 'JavaScript',
                      language: 'javascript',
                      code: `const response = await fetch('https://api.nagriva.com/v1/employees', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data);`,
                    },
                    {
                      label: 'Python',
                      language: 'python',
                      code: `import requests

response = requests.get(
    'https://api.nagriva.com/v1/employees',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    }
)

data = response.json()
print(data)`,
                    },
                    {
                      label: 'PHP',
                      language: 'php',
                      code: `$ch = curl_init('https://api.nagriva.com/v1/employees');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
$data = json_decode($response, true);
print_r($data);`,
                    },
                    {
                      label: 'Go',
                      language: 'go',
                      code: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    req, _ := http.NewRequest("GET", "https://api.nagriva.com/v1/employees", nil)
    req.Header.Add("Authorization", "Bearer YOUR_API_KEY")
    req.Header.Add("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
                    },
                    {
                      label: 'Node.js',
                      language: 'javascript',
                      code: `const Nagriva = require('@nagriva/sdk');

const client = new Nagriva({ apiKey: 'YOUR_API_KEY' });

const employees = await client.employees.list({
  status: 'active',
  limit: 20,
});

console.log(employees);`,
                    },
                  ]} />
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-deep-black mb-3">Example Response</h4>
                    <CodeBlock language="json">{
`{
  "id": "emp_123",
  "name": "Customer Support AI",
  "status": "active",
  "created_at": "2026-01-15T08:30:00Z"
}`}
</CodeBlock>
                  </div>
                </RevealBlock>
              </div>

              {/* ── AI Employees ── */}
              <div id="ai-employees">
                <SectionHeading icon={Bot} label="AI Employees" title="Manage Your AI Workforce" />
                <RevealBlock>
                  <div className="space-y-4">
                    <EndpointCard
                      method="GET"
                      path="/v1/employees"
                      description="List all AI Employees in your workspace. Supports filtering by status and pagination."
                      parameters={[
                        { name: 'status', type: 'string', description: 'Filter by status: active, inactive, or all', required: false },
                        { name: 'limit', type: 'integer', description: 'Number of results per page (default: 20, max: 100)', required: false },
                        { name: 'offset', type: 'integer', description: 'Offset for pagination', required: false },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X GET https://api.nagriva.com/v1/employees?status=active \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
                        { label: 'JavaScript', language: 'javascript', code: `const res = await fetch('https://api.nagriva.com/v1/employees?status=active', {\n  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }\n});\nconst data = await res.json();` },
                        { label: 'Python', language: 'python', code: `response = requests.get(\n    'https://api.nagriva.com/v1/employees?status=active',\n    headers={'Authorization': 'Bearer YOUR_API_KEY'}\n)\ndata = response.json()` },
                      ]}
                      responseExample={`{
  "data": [
    {
      "id": "emp_123",
      "name": "Customer Support AI",
      "status": "active",
      "model": "gpt-4o",
      "created_at": "2026-01-15T08:30:00Z"
    }
  ],
  "total": 1,
  "has_more": false
}`}
                    />
                    <EndpointCard
                      method="POST"
                      path="/v1/employees"
                      description="Create a new AI Employee. Provide a name, role configuration, and optional model preferences."
                      parameters={[
                        { name: 'name', type: 'string', description: 'Display name for the employee', required: true },
                        { name: 'role', type: 'string', description: 'Role description (e.g., "Customer Support Agent")', required: true },
                        { name: 'model', type: 'string', description: 'LLM model to use (default: gpt-4o)', required: false },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X POST https://api.nagriva.com/v1/employees \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "Sales Assistant",\n    "role": "Helps qualify leads and book demos",\n    "model": "gpt-4o"\n  }'` },
                        { label: 'JavaScript', language: 'javascript', code: `const res = await fetch('https://api.nagriva.com/v1/employees', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify({\n    name: 'Sales Assistant',\n    role: 'Helps qualify leads and book demos',\n    model: 'gpt-4o',\n  }),\n});` },
                        { label: 'Python', language: 'python', code: `response = requests.post(\n    'https://api.nagriva.com/v1/employees',\n    headers={'Authorization': 'Bearer YOUR_API_KEY'},\n    json={\n        'name': 'Sales Assistant',\n        'role': 'Helps qualify leads and book demos',\n        'model': 'gpt-4o',\n    }\n)` },
                      ]}
                      responseExample={`{
  "id": "emp_456",
  "name": "Sales Assistant",
  "status": "active",
  "model": "gpt-4o",
  "created_at": "2026-07-16T10:00:00Z"
}`}
                    />
                    <EndpointCard
                      method="PUT"
                      path="/v1/employees/{id}"
                      description="Update an existing AI Employee's configuration, name, or status."
                      parameters={[
                        { name: 'id', type: 'string', description: 'Employee ID', required: true },
                        { name: 'name', type: 'string', description: 'New display name', required: false },
                        { name: 'status', type: 'string', description: 'Set to active or inactive', required: false },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X PUT https://api.nagriva.com/v1/employees/emp_123 \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"status": "inactive"}'` },
                        { label: 'JavaScript', language: 'javascript', code: `const res = await fetch('https://api.nagriva.com/v1/employees/emp_123', {\n  method: 'PUT',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify({ status: 'inactive' }),\n});` },
                      ]}
                      responseExample={`{
  "id": "emp_123",
  "name": "Customer Support AI",
  "status": "inactive",
  "updated_at": "2026-07-16T10:05:00Z"
}`}
                    />
                    <EndpointCard
                      method="DELETE"
                      path="/v1/employees/{id}"
                      description="Permanently delete an AI Employee. This action cannot be undone."
                      parameters={[
                        { name: 'id', type: 'string', description: 'Employee ID', required: true },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X DELETE https://api.nagriva.com/v1/employees/emp_123 \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
                        { label: 'JavaScript', language: 'javascript', code: `const res = await fetch('https://api.nagriva.com/v1/employees/emp_123', {\n  method: 'DELETE',\n  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },\n});` },
                      ]}
                      responseExample={`{
  "deleted": true,
  "id": "emp_123"
}`}
                    />
                  </div>
                </RevealBlock>
              </div>

              {/* ── Knowledge Base ── */}
              <div id="knowledge-base">
                <SectionHeading icon={BookOpen} label="Knowledge Base" title="Manage Knowledge Sources" />
                <RevealBlock>
                  <div className="space-y-4">
                    <EndpointCard
                      method="GET"
                      path="/v1/knowledge"
                      description="List all Knowledge Base sources. Returns documents, URLs, and uploaded files associated with your workspace."
                      parameters={[
                        { name: 'employee_id', type: 'string', description: 'Filter by employee ID', required: false },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X GET https://api.nagriva.com/v1/knowledge \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
                        { label: 'JavaScript', language: 'javascript', code: `const res = await fetch('https://api.nagriva.com/v1/knowledge', {\n  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }\n});` },
                      ]}
                      responseExample={`{
  "data": [
    {
      "id": "kb_789",
      "name": "Product FAQ",
      "type": "document",
      "employee_ids": ["emp_123"],
      "created_at": "2026-03-10T14:00:00Z"
    }
  ],
  "total": 1
}`}
                    />
                    <EndpointCard
                      method="POST"
                      path="/v1/knowledge"
                      description="Upload a new knowledge source. Supports documents (PDF, TXT, DOCX) and URLs."
                      parameters={[
                        { name: 'name', type: 'string', description: 'Display name for the source', required: true },
                        { name: 'type', type: 'string', description: 'Source type: document, url, or text', required: true },
                        { name: 'content', type: 'string', description: 'URL or text content', required: true },
                        { name: 'employee_ids', type: 'string[]', description: 'Array of employee IDs to associate', required: false },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X POST https://api.nagriva.com/v1/knowledge \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "Pricing Page",\n    "type": "url",\n    "content": "https://nagriva.com/pricing",\n    "employee_ids": ["emp_123"]\n  }'` },
                        { label: 'Python', language: 'python', code: `response = requests.post(\n    'https://api.nagriva.com/v1/knowledge',\n    headers={'Authorization': 'Bearer YOUR_API_KEY'},\n    json={\n        'name': 'Pricing Page',\n        'type': 'url',\n        'content': 'https://nagriva.com/pricing',\n        'employee_ids': ['emp_123'],\n    }\n)` },
                      ]}
                      responseExample={`{
  "id": "kb_012",
  "name": "Pricing Page",
  "type": "url",
  "status": "processing",
  "created_at": "2026-07-16T10:10:00Z"
}`}
                    />
                    <EndpointCard
                      method="DELETE"
                      path="/v1/knowledge/{id}"
                      description="Remove a knowledge source from your workspace."
                      parameters={[
                        { name: 'id', type: 'string', description: 'Knowledge source ID', required: true },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X DELETE https://api.nagriva.com/v1/knowledge/kb_789 \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
                      ]}
                      responseExample={`{
  "deleted": true,
  "id": "kb_789"
}`}
                    />
                  </div>
                </RevealBlock>
              </div>

              {/* ── Conversations ── */}
              <div id="conversations">
                <SectionHeading icon={MessageSquare} label="Conversations" title="Message History" />
                <RevealBlock>
                  <div className="space-y-4">
                    <EndpointCard
                      method="GET"
                      path="/v1/conversations"
                      description="List conversations across all AI Employees. Filter by employee, date range, or status."
                      parameters={[
                        { name: 'employee_id', type: 'string', description: 'Filter by employee', required: false },
                        { name: 'limit', type: 'integer', description: 'Results per page (default: 20)', required: false },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X GET https://api.nagriva.com/v1/conversations?employee_id=emp_123 \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
                        { label: 'JavaScript', language: 'javascript', code: `const res = await fetch('https://api.nagriva.com/v1/conversations?employee_id=emp_123', {\n  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }\n});` },
                      ]}
                      responseExample={`{
  "data": [
    {
      "id": "conv_001",
      "employee_id": "emp_123",
      "status": "active",
      "message_count": 12,
      "started_at": "2026-07-16T09:00:00Z"
    }
  ],
  "total": 1
}`}
                    />
                    <EndpointCard
                      method="POST"
                      path="/v1/messages"
                      description="Send a message to an AI Employee and receive a response."
                      parameters={[
                        { name: 'conversation_id', type: 'string', description: 'Existing conversation ID (optional — creates new if omitted)', required: false },
                        { name: 'employee_id', type: 'string', description: 'Target employee ID', required: true },
                        { name: 'content', type: 'string', description: 'Message content', required: true },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X POST https://api.nagriva.com/v1/messages \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "employee_id": "emp_123",\n    "content": "What are your pricing plans?"\n  }'` },
                        { label: 'Python', language: 'python', code: `response = requests.post(\n    'https://api.nagriva.com/v1/messages',\n    headers={'Authorization': 'Bearer YOUR_API_KEY'},\n    json={\n        'employee_id': 'emp_123',\n        'content': 'What are your pricing plans?',\n    }\n)` },
                      ]}
                      responseExample={`{
  "id": "msg_001",
  "conversation_id": "conv_001",
  "role": "assistant",
  "content": "We offer three pricing tiers: Starter, Professional, and Enterprise...",
  "created_at": "2026-07-16T09:01:00Z"
}`}
                    />
                  </div>
                </RevealBlock>
              </div>

              {/* ── Analytics ── */}
              <div id="analytics">
                <SectionHeading icon={BarChart3} label="Analytics" title="Usage & Performance" />
                <RevealBlock>
                  <div className="space-y-4">
                    <EndpointCard
                      method="GET"
                      path="/v1/analytics"
                      description="Retrieve aggregated analytics data for your AI Employees. Includes conversation counts, resolution rates, and response times."
                      parameters={[
                        { name: 'employee_id', type: 'string', description: 'Filter by employee', required: false },
                        { name: 'period', type: 'string', description: 'Time period: 7d, 30d, or 90d', required: false },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X GET https://api.nagriva.com/v1/analytics?period=30d \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
                        { label: 'JavaScript', language: 'javascript', code: `const res = await fetch('https://api.nagriva.com/v1/analytics?period=30d', {\n  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }\n});` },
                      ]}
                      responseExample={`{
  "period": "30d",
  "conversations": 1240,
  "messages": 8920,
  "avg_response_time_ms": 1200,
  "resolution_rate": 0.87
}`}
                    />
                    <EndpointCard
                      method="GET"
                      path="/v1/usage"
                      description="Check your current API usage and plan limits."
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X GET https://api.nagriva.com/v1/usage \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
                      ]}
                      responseExample={`{
  "api_requests": {
    "used": 4520,
    "limit": 10000,
    "reset_at": "2026-08-01T00:00:00Z"
  },
  "storage_mb": {
    "used": 128,
    "limit": 5000
  }
}`}
                    />
                  </div>
                </RevealBlock>
              </div>

              {/* ── Integrations ── */}
              <div id="integrations">
                <SectionHeading icon={Plug} label="Integrations" title="Connect External Services" />
                <RevealBlock>
                  <div className="space-y-4">
                    <EndpointCard
                      method="GET"
                      path="/v1/integrations"
                      description="List all connected integrations and their status."
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X GET https://api.nagriva.com/v1/integrations \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
                      ]}
                      responseExample={`{
  "data": [
    {
      "id": "int_001",
      "type": "slack",
      "status": "active",
      "workspace": "Acme Corp"
    },
    {
      "id": "int_002",
      "type": "hubspot",
      "status": "active",
      "workspace": "Acme CRM"
    }
  ]
}`}
                    />
                    <EndpointCard
                      method="POST"
                      path="/v1/integrations"
                      description="Connect a new integration (Slack, HubSpot, WhatsApp, and more)."
                      parameters={[
                        { name: 'type', type: 'string', description: 'Integration type: slack, hubspot, whatsapp, zapier', required: true },
                        { name: 'credentials', type: 'object', description: 'OAuth tokens or API keys for the integration', required: true },
                      ]}
                      tabs={[
                        { label: 'cURL', language: 'bash', code: `curl -X POST https://api.nagriva.com/v1/integrations \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "type": "slack",\n    "credentials": {\n      "bot_token": "xoxb-..."\n    }\n  }'` },
                      ]}
                      responseExample={`{
  "id": "int_003",
  "type": "slack",
  "status": "pending_auth",
  "auth_url": "https://slack.com/oauth/authorize?..."
}`}
                    />
                  </div>
                </RevealBlock>
              </div>

              {/* ── Webhooks ── */}
              <div id="webhooks">
                <SectionHeading icon={Webhook} label="Webhooks" title="Event System" />
                <RevealBlock>
                  <div className="space-y-5 text-[15px] leading-relaxed text-gray-500 max-w-[780px] mb-6">
                    <p>
                      Webhooks allow you to receive real-time notifications when events happen in your Nagriva workspace. Configure webhook endpoints in your dashboard or via the API to subscribe to specific events.
                    </p>
                    <p>
                      All webhook payloads are sent as JSON via HTTP POST to your specified URL. Nagriva signs each request with an HMAC-SHA256 signature so you can verify authenticity.
                    </p>
                  </div>

                  <h4 className="text-sm font-semibold text-deep-black mb-3">Example Events</h4>
                  <div className="grid gap-3">
                    {[
                      { event: 'employee.created', description: 'A new AI Employee was created' },
                      { event: 'employee.updated', description: 'An AI Employee configuration was changed' },
                      { event: 'conversation.created', description: 'A new conversation was started' },
                      { event: 'conversation.resolved', description: 'A conversation was marked as resolved' },
                      { event: 'knowledge.updated', description: 'A knowledge source was added or updated' },
                      { event: 'subscription.updated', description: 'Your plan or billing was changed' },
                    ].map((evt) => (
                      <div key={evt.event} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50/40 px-5 py-3.5">
                        <code className="text-sm font-mono font-semibold text-royal-blue whitespace-nowrap">{evt.event}</code>
                        <span className="text-sm text-gray-500">{evt.description}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-deep-black mb-3">Example Payload</h4>
                    <CodeBlock language="json">{
`{
  "id": "evt_987",
  "type": "conversation.created",
  "data": {
    "conversation_id": "conv_001",
    "employee_id": "emp_123",
    "customer_email": "user@example.com"
  },
  "created_at": "2026-07-16T09:00:00Z"
}`}
</CodeBlock>
                  </div>
                </RevealBlock>
              </div>

              {/* ── API Playground ── */}
              <div id="examples">
                <SectionHeading icon={Play} label="Interactive" title="API Playground" />
                <APIPlayground />
              </div>

              {/* ── Response Examples ── */}
              <div>
                <SectionHeading icon={FileJson} label="Response Format" title="Example Responses" />
                <ResponseExamples />
              </div>

              {/* ── Errors ── */}
              <div id="errors">
                <SectionHeading icon={AlertTriangle} label="Errors" title="Error Codes" />
                <RevealBlock>
                  <p className="text-[15px] leading-relaxed text-gray-500 max-w-[780px] mb-6">
                    The Nagriva API uses standard HTTP status codes to indicate success or failure. All error responses include a JSON body with a machine-readable <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-deep-black">code</code> and a human-readable <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-deep-black">message</code>.
                  </p>
                  <div className="rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50/80">
                          <th className="text-left px-5 py-3 font-semibold text-deep-black">Code</th>
                          <th className="text-left px-5 py-3 font-semibold text-deep-black">Status</th>
                          <th className="text-left px-5 py-3 font-semibold text-deep-black hidden sm:table-cell">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {[
                          { code: '200', status: 'OK', desc: 'Request succeeded', color: 'text-emerald-600' },
                          { code: '201', status: 'Created', desc: 'Resource successfully created', color: 'text-emerald-600' },
                          { code: '400', status: 'Bad Request', desc: 'Invalid parameters or request body', color: 'text-amber-600' },
                          { code: '401', status: 'Unauthorized', desc: 'Missing or invalid API key', color: 'text-amber-600' },
                          { code: '403', status: 'Forbidden', desc: 'Insufficient permissions', color: 'text-amber-600' },
                          { code: '404', status: 'Not Found', desc: 'Resource does not exist', color: 'text-gray-500' },
                          { code: '429', status: 'Too Many Requests', desc: 'Rate limit exceeded', color: 'text-orange-600' },
                          { code: '500', status: 'Internal Server Error', desc: 'Something went wrong on our end', color: 'text-red-600' },
                        ].map((row) => (
                          <tr key={row.code} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-3 font-mono text-sm font-bold text-deep-black">{row.code}</td>
                            <td className={`px-5 py-3 font-medium ${row.color}`}>{row.status}</td>
                            <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-deep-black mb-3">Error Response Format</h4>
                    <CodeBlock language="json">{
`{
  "error": {
    "code": "invalid_request",
    "message": "The 'name' field is required.",
    "status": 400
  }
}`}
</CodeBlock>
                  </div>
                </RevealBlock>
              </div>

              {/* ── Rate Limits ── */}
              <div id="rate-limits">
                <SectionHeading icon={Gauge} label="Rate Limits" title="Request Throttling" />
                <RevealBlock>
                  <div className="space-y-5 text-[15px] leading-relaxed text-gray-500 max-w-[780px] mb-6">
                    <p>
                      To ensure platform stability, the Nagriva API enforces rate limits on all endpoints. Rate limits are applied per API key.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                      <div className="text-3xl font-bold text-deep-black mb-1">100</div>
                      <div className="text-sm text-gray-500 mb-3">requests per minute</div>
                      <p className="text-xs text-gray-400">Standard tier limit applied per API key.</p>
                    </div>
                    <div className="rounded-2xl border border-royal-blue/10 bg-royal-blue/[0.03] p-6">
                      <div className="text-3xl font-bold text-royal-blue mb-1">Custom</div>
                      <div className="text-sm text-gray-500 mb-3">Enterprise rate limits</div>
                      <p className="text-xs text-gray-400">Need higher limits? Contact our sales team for Enterprise plans.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-5">
                    <h4 className="text-sm font-semibold text-deep-black mb-2">Rate Limit Headers</h4>
                    <p className="text-sm text-gray-500 mb-3">Every API response includes headers to help you track your usage:</p>
                    <div className="space-y-1.5">
                      <code className="block text-xs font-mono text-deep-black">X-RateLimit-Limit: 100</code>
                      <code className="block text-xs font-mono text-deep-black">X-RateLimit-Remaining: 87</code>
                      <code className="block text-xs font-mono text-deep-black">X-RateLimit-Reset: 1721155200</code>
                    </div>
                  </div>
                </RevealBlock>
              </div>

              {/* ── SDKs ── */}
              <div id="sdks">
                <SectionHeading icon={Code2} label="SDKs" title="Official Libraries" />
                <RevealBlock>
                  <p className="text-[15px] leading-relaxed text-gray-500 max-w-[780px] mb-6">
                    Use our official SDKs to integrate with Nagriva in your preferred language. Each SDK provides typed interfaces, automatic retries, and built-in error handling.
                  </p>
                  <SDKSection />
                </RevealBlock>
              </div>

              {/* ── API Status ── */}
              <div id="api-status">
                <SectionHeading icon={Activity} label="API Status" title="System Health" />
                <RevealBlock>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <StatusCard label="Authentication" status="Operational" />
                    <StatusCard label="API Gateway" status="Operational" />
                    <StatusCard label="Webhooks" status="Operational" />
                    <StatusCard label="Analytics" status="Operational" />
                  </div>
                </RevealBlock>
              </div>

              {/* ── Changelog ── */}
              <div id="changelog">
                <SectionHeading icon={GitBranch} label="Changelog" title="API Versions" />
                <RevealBlock>
                  <div className="space-y-4">
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-6">
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-royal-blue" />
                      <div className="pl-4">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-base font-bold text-deep-black">v1.0</span>
                          <Badge>Current</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Initial Public API release. Includes endpoints for AI Employees, Knowledge Base, Conversations, Analytics, Integrations, and Webhooks.</p>
                        <span className="mt-2 inline-block text-xs text-gray-400">Released July 2026</span>
                      </div>
                    </div>
                  </div>
                </RevealBlock>
              </div>

            </div>

            <RightToc activeSection={activeSection} />
          </div>
        </section>

        {/* ── CTA ── */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function CTASection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Start Building with{' '}
                <span className="text-royal-blue">Nagriva</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Our API makes it easy to integrate AI Employees into your products.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#/contact" className="btn-primary text-base px-8 py-3.5">
                  Get API Key
                </a>
                <a href="#/contact" className="btn-secondary text-base px-8 py-3.5 gap-2">
                  Contact Developer Support
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
