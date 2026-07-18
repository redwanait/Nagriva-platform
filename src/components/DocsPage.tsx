import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useInView } from '../hooks/useInView';
import Footer from './Footer';
import Toast from './Toast';
import { Search, ChevronDown, ChevronRight, Copy, Check, BookOpen, Clock, ArrowRight, ThumbsUp, ThumbsDown, Pencil, Flag, Menu, X, Send, MessageSquare, Loader2 } from 'lucide-react';

/* ═══════════════════════════════════════════
   SIDEBAR NAV DATA
   ═══════════════════════════════════════════ */

interface NavItem { label: string; id: string; }
interface NavGroup { title: string; items: NavItem[]; }

const sidebarNav: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Quick Start', id: 'getting-started' },
      { label: 'Create Account', id: 'create-account' },
      { label: 'Dashboard Overview', id: 'dashboard-overview' },
    ],
  },
  {
    title: 'AI Employees',
    items: [
      { label: 'Create Employee', id: 'creating-first-ai' },
      { label: 'Training', id: 'training-your-ai' },
      { label: 'Knowledge Base', id: 'knowledge-base' },
      { label: 'Conversations', id: 'monitoring-conversations' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'Integrations', id: 'connecting-integrations' },
      { label: 'Notifications', id: 'notifications' },
      { label: 'Analytics', id: 'analytics' },
      { label: 'Billing', id: 'managing-billing' },
      { label: 'Settings', id: 'settings' },
    ],
  },
  {
    title: 'Developers',
    items: [
      { label: 'API', id: 'api-reference' },
      { label: 'Webhooks', id: 'webhooks' },
      { label: 'SDK', id: 'sdk' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'FAQ', id: 'faq' },
      { label: 'Security', id: 'security' },
      { label: 'Privacy', id: 'privacy' },
      { label: 'Release Notes', id: 'release-notes' },
    ],
  },
];

/* ═══════════════════════════════════════════
   RIGHT TOC DATA (from article headings)
   ═══════════════════════════════════════════ */

const articleToc = [
  { id: 'getting-started', title: 'Getting Started', level: 2 },
  { id: 'create-account', title: 'Create your account', level: 2 },
  { id: 'dashboard-overview', title: 'Dashboard overview', level: 2 },
  { id: 'creating-first-ai', title: 'Creating your first AI Employee', level: 2 },
  { id: 'training-your-ai', title: 'Training your AI', level: 2 },
  { id: 'knowledge-base', title: 'Knowledge Base setup', level: 2 },
  { id: 'monitoring-conversations', title: 'Monitoring conversations', level: 2 },
  { id: 'connecting-integrations', title: 'Connecting integrations', level: 2 },
  { id: 'managing-billing', title: 'Managing billing', level: 2 },
];

/* ═══════════════════════════════════════════
   SEARCH DATA
   ═══════════════════════════════════════════ */

const searchIndex = [
  { title: 'Quick Start', section: 'Getting Started', id: 'getting-started' },
  { title: 'Create Account', section: 'Getting Started', id: 'create-account' },
  { title: 'Dashboard Overview', section: 'Getting Started', id: 'dashboard-overview' },
  { title: 'Create AI Employee', section: 'AI Employees', id: 'creating-first-ai' },
  { title: 'Training your AI', section: 'AI Employees', id: 'training-your-ai' },
  { title: 'Knowledge Base', section: 'AI Employees', id: 'knowledge-base' },
  { title: 'Conversations', section: 'AI Employees', id: 'monitoring-conversations' },
  { title: 'Integrations', section: 'Platform', id: 'connecting-integrations' },
  { title: 'Notifications', section: 'Platform', id: 'notifications' },
  { title: 'Analytics', section: 'Platform', id: 'analytics' },
  { title: 'Billing', section: 'Platform', id: 'managing-billing' },
  { title: 'Settings', section: 'Platform', id: 'settings' },
  { title: 'API Reference', section: 'Developers', id: 'api-reference' },
  { title: 'Webhooks', section: 'Developers', id: 'webhooks' },
  { title: 'SDK', section: 'Developers', id: 'sdk' },
  { title: 'FAQ', section: 'Resources', id: 'faq' },
  { title: 'Security', section: 'Resources', id: 'security' },
  { title: 'Privacy', section: 'Resources', id: 'privacy' },
  { title: 'Release Notes', section: 'Resources', id: 'release-notes' },
];

/* ═══════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════ */

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden my-5">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
        >
          {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-[13px] leading-relaxed font-mono text-gray-800">{code}</code>
      </pre>
    </div>
  );
}

function InfoBox({ type = 'info', children }: { type?: 'info' | 'tip' | 'warning'; children: React.ReactNode }) {
  const styles = {
    info: 'border-l-royal-blue/30 bg-royal-blue/[0.02]',
    tip: 'border-l-emerald-500/30 bg-emerald-50/30',
    warning: 'border-l-amber-500/30 bg-amber-50/30',
  };
  const labels = { info: 'Note', tip: 'Tip', warning: 'Warning' };
  const labelColors = { info: 'text-royal-blue', tip: 'text-emerald-600', warning: 'text-amber-600' };

  return (
    <div className={`border-l-2 ${styles[type]} rounded-r-lg px-5 py-4 my-5`}>
      <p className={`text-xs font-semibold uppercase tracking-wider mb-1.5 ${labelColors[type]}`}>{labels[type]}</p>
      <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3 my-4">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-royal-blue/[0.06] text-royal-blue text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
          <span className="text-[15px] text-gray-600 leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}

/* ═══════════════════════════════════════════
   SEARCH MODAL
   ═══════════════════════════════════════════ */

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose(); else onClose(); // toggle handled by parent
      }
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 6);
    const q = query.toLowerCase();
    return searchIndex.filter((item) => item.title.toLowerCase().includes(q) || item.section.toLowerCase().includes(q));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-deep-black/30 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search className="h-5 w-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 text-base text-deep-black placeholder:text-gray-400 outline-none"
          />
          <kbd className="hidden sm:inline-flex h-6 items-center rounded-md bg-gray-100 border border-gray-200 px-2 text-[10px] font-medium text-gray-400">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No results found.</p>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-deep-black truncate">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.section}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SUGGEST IMPROVEMENT MODAL
   ═══════════════════════════════════════════ */

function SuggestImprovementModal({ open, onClose, currentPage, onSuccess }: {
  open: boolean; onClose: () => void; currentPage: string; onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleSubmit = async () => {
    if (!suggestion.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setName(''); setEmail(''); setSuggestion('');
    onClose();
    onSuccess();
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-deep-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden transition-all duration-300 ease-out ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] border border-royal-blue/10">
              <Pencil className="w-5 h-5 text-royal-blue" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-deep-black">Suggest an Improvement</h2>
              <p className="text-xs text-gray-500">Help us improve this documentation</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-deep-black hover:border-gray-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            Help us improve this documentation by suggesting edits, corrections or additional information.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Documentation Page</label>
              <input
                type="text"
                value={currentPage}
                readOnly
                className="w-full px-4 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Suggestion <span className="text-red-500">*</span></label>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Describe the improvement, correction, or additional information..."
                rows={4}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!suggestion.trim() || submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Suggestion
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REPORT ISSUE MODAL
   ═══════════════════════════════════════════ */

function ReportIssueModal({ open, onClose, currentPage, onSuccess }: {
  open: boolean; onClose: () => void; currentPage: string; onSuccess: () => void;
}) {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  const issueTypes = ['Bug', 'Incorrect Information', 'Missing Content', 'Broken Link', 'Other'];

  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleSubmit = async () => {
    if (!issueType || !description.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setIssueType(''); setDescription(''); setEmail('');
    onClose();
    onSuccess();
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-deep-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden transition-all duration-300 ease-out ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/[0.06] border border-red-500/10">
              <Flag className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-deep-black">Report an Issue</h2>
              <p className="text-xs text-gray-500">Help us fix documentation problems</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-deep-black hover:border-gray-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Issue Type <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {issueTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setIssueType(type)}
                    className={`px-3 py-2 text-sm rounded-xl border transition-all duration-150 text-left ${
                      issueType === type
                        ? 'border-royal-blue bg-royal-blue/[0.04] text-royal-blue font-medium'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description <span className="text-red-500">*</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail..."
                rows={4}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Page</label>
              <input
                type="text"
                value={currentPage}
                readOnly
                className="w-full px-4 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!issueType || !description.trim() || submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Flag className="w-4 h-4" />
                Submit Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NO FEEDBACK MODAL (Was this helpful? → No)
   ═══════════════════════════════════════════ */

function NoFeedbackModal({ open, onClose, onSuccess }: {
  open: boolean; onClose: () => void; onSuccess: () => void;
}) {
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setFeedback('');
    onClose();
    onSuccess();
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-deep-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden transition-all duration-300 ease-out ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/[0.06] border border-amber-500/10">
              <MessageSquare className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-deep-black">Help us improve</h2>
              <p className="text-xs text-gray-500">Your feedback matters</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-deep-black hover:border-gray-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell us what was missing or confusing</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback helps us make the docs better..."
            rows={4}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!feedback.trim() || submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEFT SIDEBAR
   ═══════════════════════════════════════════ */

function Sidebar({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sidebarNav.forEach((g) => { initial[g.title] = true; });
    return initial;
  });

  const toggle = (title: string) => setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <nav className="space-y-1">
      {sidebarNav.map((group) => (
        <div key={group.title} className="mb-4">
          <button
            onClick={() => toggle(group.title)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-[0.12em] hover:text-gray-600 transition-colors duration-150"
          >
            {group.title}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded[group.title] ? '' : '-rotate-90'}`} />
          </button>
          {expanded[group.title] && (
            <div className="space-y-0.5 mt-1">
              {group.items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full text-left text-[13px] py-1.5 px-3 rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'text-royal-blue font-medium bg-royal-blue/[0.04]'
                        : 'text-gray-500 hover:text-deep-black hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   RIGHT TOC
   ═══════════════════════════════════════════ */

function RightTOC({ activeId }: { activeId: string }) {
  return (
    <div className="sticky top-28">
      <p className="text-xs font-semibold text-gray-400 tracking-[0.12em] uppercase mb-3">On this page</p>
      <ul className="space-y-0.5 mb-6">
        {articleToc.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full text-left text-[13px] py-1 px-3 rounded-md transition-colors duration-150 ${
                activeId === item.id
                  ? 'text-royal-blue font-medium bg-royal-blue/[0.04]'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
              style={{ paddingLeft: item.level === 3 ? '1.75rem' : undefined }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-100 pt-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5" />
          <span>8 min read</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Last updated Jan 01, 2026</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function HeroSection({ onSearchOpen }: { onSearchOpen: () => void }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6">
      <div ref={ref} className={`relative mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue uppercase tracking-wider mb-5">
          Documentation
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-deep-black tracking-tight leading-[1.1] mb-4">
          Everything you need to build with{' '}
          <span className="text-royal-blue">Nagriva.</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
          Learn how to create AI Employees, manage your workspace, connect integrations, and use every feature of the platform.
        </p>

        {/* Search bar */}
        <button
          onClick={onSearchOpen}
          className="w-full max-w-xl mx-auto flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-left text-gray-400 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-text"
        >
          <Search className="h-5 w-5 text-gray-400 shrink-0" />
          <span className="flex-1 text-base">Search documentation...</span>
          <kbd className="hidden sm:inline-flex h-6 items-center rounded-md bg-gray-50 border border-gray-200 px-2 text-[10px] font-medium text-gray-400">
            <span className="text-xs mr-0.5">⌘</span>K
          </kbd>
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN ARTICLE CONTENT
   ═══════════════════════════════════════════ */

function ArticleContent({ setActiveId, onEditPage, onReportIssue, feedbackVote, onVoteYes, onVoteNo, onApiNavigate }: {
  setActiveId: (id: string) => void;
  onEditPage: () => void;
  onReportIssue: () => void;
  feedbackVote: 'yes' | 'no' | null;
  onVoteYes: () => void;
  onVoteNo: () => void;
  onApiNavigate: () => void;
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    articleToc.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [setActiveId]);

  return (
    <article className="max-w-[720px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <span className="hover:text-royal-blue cursor-pointer transition-colors">Docs</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-600">Getting Started</span>
      </div>

      {/* Getting Started */}
      <section id="getting-started" className="scroll-mt-24 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-deep-black tracking-tight mb-4">Getting Started</h1>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          Nagriva is an AI workforce platform that lets you create intelligent AI Employees to handle customer support, sales, and internal workflows. This guide walks you through setup, from creating your account to deploying your first AI Employee.
        </p>
      </section>

      {/* Create Account */}
      <section id="create-account" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-4">Create your account</h2>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          Sign up at <span className="font-medium text-deep-black">app.nagriva.ai</span> using your work email. No credit card is required for the free trial.
        </p>
        <StepList steps={[
          'Go to app.nagriva.ai and click "Get Started".',
          'Enter your work email and create a password, or sign up with Google.',
          'Verify your email address from the confirmation link.',
          'Complete your profile with your name and company details.',
        ]} />
        <InfoBox type="tip">
          If your company uses Google Workspace, SSO sign-up is available on the Pro plan and above.
        </InfoBox>
      </section>

      {/* Dashboard Overview */}
      <section id="dashboard-overview" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-4">Dashboard overview</h2>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          After signing in, you land on the main dashboard. Here&rsquo;s what each section does:
        </p>
        <ul className="space-y-2.5 text-[15px] text-gray-600 leading-[1.75] mb-4">
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue mt-2.5 shrink-0" />
            <span><strong className="text-deep-black">AI Employees</strong> &mdash; Create, configure, and manage your AI agents.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue mt-2.5 shrink-0" />
            <span><strong className="text-deep-black">Conversations</strong> &mdash; View all active and past conversations across channels.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue mt-2.5 shrink-0" />
            <span><strong className="text-deep-black">Knowledge Base</strong> &mdash; Upload documents and data to train your AI.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue mt-2.5 shrink-0" />
            <span><strong className="text-deep-black">Analytics</strong> &mdash; Track performance metrics, resolution rates, and usage.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue mt-2.5 shrink-0" />
            <span><strong className="text-deep-black">Settings</strong> &mdash; Manage billing, integrations, team members, and preferences.</span>
          </li>
        </ul>
      </section>

      {/* Creating AI Employee */}
      <section id="creating-first-ai" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-4">Creating your first AI Employee</h2>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          AI Employees are intelligent agents that interact with your customers and team members. Each one can be customized with a unique personality, knowledge base, and set of capabilities.
        </p>
        <StepList steps={[
          'Navigate to AI Employees in the sidebar and click "Create New".',
          'Choose a name and select the type of agent (Support, Sales, or General).',
          'Write a system prompt that defines the agent\'s personality and behavior.',
          'Select the AI model (GPT-4, GPT-4o, or Claude) based on your needs.',
          'Click "Create" to deploy your AI Employee.',
        ]} />
        <CodeBlock language="bash" code={`# Or create via API
curl -X POST https://api.nagriva.ai/v1/agents \\
  -H "Authorization: Bearer nagriva_sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Support Agent",
    "model": "gpt-4o",
    "type": "support"
  }'`} />
        <InfoBox type="info">
          You can create unlimited AI Employees on the Pro and Enterprise plans. The Starter plan includes up to 3.
        </InfoBox>
      </section>

      {/* Training */}
      <section id="training-your-ai" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-4">Training your AI</h2>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          Your AI Employee is only as good as the data it has access to. Training involves uploading documents, defining policies, and fine-tuning responses.
        </p>
        <h3 className="text-lg font-semibold text-deep-black mt-6 mb-3">What you can upload</h3>
        <ul className="space-y-2 text-[15px] text-gray-600 leading-[1.75]">
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>PDF documents, Word files, and plain text</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>FAQ lists and product documentation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>Website URLs for automatic scraping</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>CSV files with structured data</span>
          </li>
        </ul>
        <InfoBox type="tip">
          For best results, keep documents under 10MB and use clear, well-structured formatting. Avoid scanned images without OCR text.
        </InfoBox>
      </section>

      {/* Knowledge Base */}
      <section id="knowledge-base" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-4">Knowledge Base setup</h2>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          The Knowledge Base is where all your training data lives. Organize it into collections to keep content segmented by topic or department.
        </p>
        <StepList steps={[
          'Go to Knowledge Base in the sidebar and click "New Collection".',
          'Name your collection (e.g., "Product FAQ", "Policies", "Onboarding").',
          'Upload documents or paste content directly into the editor.',
          'Assign the collection to one or more AI Employees.',
        ]} />
        <InfoBox type="warning">
          Changes to the Knowledge Base may take a few minutes to propagate to your AI Employees. You&rsquo;ll see a status indicator while indexing is in progress.
        </InfoBox>
      </section>

      {/* Monitoring */}
      <section id="monitoring-conversations" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-4">Monitoring conversations</h2>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          The Conversations tab provides a real-time feed of all interactions across your AI Employees. You can filter by agent, channel, status, or date range.
        </p>
        <ul className="space-y-2.5 text-[15px] text-gray-600 leading-[1.75]">
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue mt-2.5 shrink-0" />
            <span><strong className="text-deep-black">Live feed</strong> &mdash; See conversations as they happen.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue mt-2.5 shrink-0" />
            <span><strong className="text-deep-black">Handoff</strong> &mdash; Transfer complex conversations to a human agent.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue mt-2.5 shrink-0" />
            <span><strong className="text-deep-black">Labels</strong> &mdash; Tag conversations for reporting and follow-up.</span>
          </li>
        </ul>
      </section>

      {/* Integrations */}
      <section id="connecting-integrations" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-4">Connecting integrations</h2>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          Nagriva connects with the tools your team already uses. Navigate to Settings &gt; Integrations to browse available connections.
        </p>
        <h3 className="text-lg font-semibold text-deep-black mt-6 mb-3">Supported channels</h3>
        <ul className="space-y-2 text-[15px] text-gray-600 leading-[1.75]">
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>WhatsApp Business API</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>Slack, Microsoft Teams, Discord</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>Website widget (embed or JavaScript SDK)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>Email forwarding</span>
          </li>
        </ul>
        <h3 className="text-lg font-semibold text-deep-black mt-6 mb-3">Tool integrations</h3>
        <ul className="space-y-2 text-[15px] text-gray-600 leading-[1.75]">
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>Zendesk, Intercom, Freshdesk (ticket sync)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>Salesforce, HubSpot (CRM sync)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
            <span>Zapier, Make (custom workflows)</span>
          </li>
        </ul>
      </section>

      {/* Billing */}
      <section id="managing-billing" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-deep-black tracking-tight mb-4">Managing billing</h2>
        <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
          All billing is managed from Settings &gt; Billing. Nagriva offers three plans: Starter, Pro, and Enterprise.
        </p>
        <StepList steps={[
          'Go to Settings and select the Billing tab.',
          'Choose your plan based on team size and usage needs.',
          'Enter payment details (processed securely via Stripe).',
          'Download invoices and manage your subscription from the same page.',
        ]} />
        <InfoBox type="info">
          You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle. Annual plans receive a 20% discount.
        </InfoBox>
      </section>

      {/* Prev / Next navigation */}
      <div className="border-t border-gray-200 mt-12 pt-8 flex items-center justify-between">
        <div />
        <button onClick={onApiNavigate} className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-royal-blue transition-colors duration-150">
          API Reference
          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Helpful feedback */}
      <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">Was this page helpful?</p>
        <div className="flex items-center gap-3">
          {feedbackVote === 'yes' ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-sm text-emerald-600 font-medium">
              <ThumbsUp className="h-3.5 w-3.5" /> Thank you for your feedback!
            </span>
          ) : (
            <button
              onClick={onVoteYes}
              disabled={feedbackVote !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ThumbsUp className="h-3.5 w-3.5" /> Yes
            </button>
          )}
          {feedbackVote === 'no' ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-300 bg-red-50 text-sm text-red-500 font-medium">
              <ThumbsDown className="h-3.5 w-3.5" /> Feedback recorded
            </span>
          ) : (
            <button
              onClick={onVoteNo}
              disabled={feedbackVote !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50/50 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ThumbsDown className="h-3.5 w-3.5" /> No
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 pb-4">
        <button onClick={onEditPage} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150">
          <Pencil className="h-3.5 w-3.5" /> Edit this page
        </button>
        <button onClick={onReportIssue} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150">
          <Flag className="h-3.5 w-3.5" /> Report an issue
        </button>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════
   MOBILE SIDEBAR OVERLAY
   ═══════════════════════════════════════════ */

function MobileSidebar({ open, onClose, activeId, onNavigate }: {
  open: boolean; onClose: () => void; activeId: string; onNavigate: (id: string) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-deep-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-deep-black">Navigation</p>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <Sidebar activeId={activeId} onNavigate={(id) => { onNavigate(id); onClose(); }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function DocsPage() {
  const [activeId, setActiveId] = useState('getting-started');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [noFeedbackModalOpen, setNoFeedbackModalOpen] = useState(false);
  const [feedbackVote, setFeedbackVote] = useState<'yes' | 'no' | null>(() => {
    return (sessionStorage.getItem('docs_feedback_vote') as 'yes' | 'no' | null) || null;
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const currentPage = 'Getting Started — Documentation';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleVoteYes = useCallback(() => {
    setFeedbackVote('yes');
    sessionStorage.setItem('docs_feedback_vote', 'yes');
  }, []);

  const handleVoteNo = useCallback(() => {
    setNoFeedbackModalOpen(true);
  }, []);

  const handleNoFeedbackSubmit = useCallback(() => {
    setFeedbackVote('no');
    sessionStorage.setItem('docs_feedback_vote', 'no');
    setToast({ message: 'Thank you for your feedback!', type: 'success' });
  }, []);

  const handleApiNavigate = useCallback(() => {
    window.location.hash = '#/api';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
    <main>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileSidebar
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        activeId={activeId}
        onNavigate={scrollTo}
      />

      <SuggestImprovementModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        currentPage={currentPage}
        onSuccess={() => setToast({ message: 'Suggestion submitted successfully!', type: 'success' })}
      />
      <ReportIssueModal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        currentPage={currentPage}
        onSuccess={() => setToast({ message: 'Report submitted successfully!', type: 'success' })}
      />
      <NoFeedbackModal
        open={noFeedbackModalOpen}
        onClose={() => setNoFeedbackModalOpen(false)}
        onSuccess={handleNoFeedbackSubmit}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <HeroSection onSearchOpen={() => setSearchOpen(true)} />

      <div className="px-6 md:px-10 lg:px-12 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[240px_1fr_200px] gap-8 lg:gap-12">
            {/* Left sidebar — desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar activeId={activeId} onNavigate={scrollTo} />
              </div>
            </aside>

            {/* Mobile nav trigger */}
            <div className="lg:hidden fixed bottom-6 left-6 z-30">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-deep-black text-white text-sm font-medium rounded-xl shadow-lg shadow-deep-black/20 hover:bg-gray-800 transition-colors duration-150"
              >
                <Menu className="h-4 w-4" /> Navigation
              </button>
            </div>

            {/* Main content */}
            <div className="min-w-0">
              <ArticleContent
                setActiveId={setActiveId}
                onEditPage={() => setEditModalOpen(true)}
                onReportIssue={() => setReportModalOpen(true)}
                feedbackVote={feedbackVote}
                onVoteYes={handleVoteYes}
                onVoteNo={handleVoteNo}
                onApiNavigate={handleApiNavigate}
              />
            </div>

            {/* Right TOC — desktop */}
            <aside className="hidden xl:block">
              <RightTOC activeId={activeId} />
            </aside>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
