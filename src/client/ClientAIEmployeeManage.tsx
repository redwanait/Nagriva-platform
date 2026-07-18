import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Bot,
  Globe,
  MessageSquare,
  Sparkles,
  Calendar,
  Settings,
  Loader2,
  AlertCircle,
  RefreshCw,
  Plug,
  BarChart3,
  Clock,
  Users,
  Trash2,
  Wifi,
  WifiOff,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Eye,
  Pencil,
  Send,
  Camera,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Toast from '../components/Toast';
import { KnowledgeTab } from './employee-knowledge';

/* ── Types ── */

interface EmployeeData {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  website: string | null;
  whatsapp_number: string | null;
  language: string | null;
  model: string | null;
  temperature: number | null;
  system_prompt: string | null;
  status: string;
  service_id: string | null;
  created_at: string;
  avatar_color: string | null;
}

type TabKey = 'overview' | 'knowledge' | 'conversations' | 'integrations' | 'analytics' | 'settings';

const TABS: { key: TabKey; label: string; icon: typeof Bot }[] = [
  { key: 'overview', label: 'Overview', icon: Eye },
  { key: 'knowledge', label: 'Knowledge', icon: BookOpen },
  { key: 'conversations', label: 'Conversations', icon: MessageSquare },
  { key: 'integrations', label: 'Integrations', icon: Plug },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const INPUT_CLASS =
  'w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white';

const SELECT_CLASS =
  'w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white appearance-none';

const LANGUAGES = ['English', 'Arabic', 'French', 'Spanish', 'Auto Detect'] as const;

/* ── Helpers ── */

function goBack() {
  window.location.hash = '#/client-dashboard/ai-employees';
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 0) return 'Today';
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay} days ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ── Tabs: Overview ── */

function OverviewTab({ employee }: { employee: EmployeeData }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* General Information */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/[0.06]">
            <Bot className="w-4 h-4 text-royal-blue" />
          </div>
          <h3 className="text-sm font-semibold text-deep-black">General Information</h3>
        </div>
        <div className="space-y-4">
          <InfoRow label="Name" value={employee.name} />
          <InfoRow label="Description" value={employee.description || '—'} />
          <InfoRow label="Website" value={employee.website || '—'} />
          <InfoRow label="WhatsApp Number" value={employee.whatsapp_number || '—'} />
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/[0.06]">
            <Sparkles className="w-4 h-4 text-royal-blue" />
          </div>
          <h3 className="text-sm font-semibold text-deep-black">AI Configuration</h3>
        </div>
        <div className="space-y-4">
          <InfoRow label="Model" value={employee.model || '—'} />
          <InfoRow label="Language" value={employee.language || '—'} />
          <InfoRow label="Temperature" value={employee.temperature != null ? employee.temperature.toFixed(1) : '—'} />
          <div>
            <span className="text-xs font-medium text-gray-500 mb-1 block">System Prompt</span>
            <p className="text-sm text-deep-black bg-gray-50 border border-gray-200 rounded-lg p-3 whitespace-pre-wrap max-h-40 overflow-y-auto">
              {employee.system_prompt || '—'}
            </p>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 mb-1 block">Status</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              employee.status === 'active'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-gray-50 text-gray-500 border border-gray-200'
            }`}>
              {employee.status === 'active' ? <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
              {employee.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs font-medium text-gray-500 mb-1 block">{label}</span>
      <span className="text-sm text-deep-black">{value}</span>
    </div>
  );
}

/* ── Tabs: Knowledge (imported from employee-knowledge module) ── */

/* ── Tabs: Conversations ── */

function ConversationsTab() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 mx-auto mb-5">
        <MessageSquare className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">No conversations yet.</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        Conversations with customers will appear here.
      </p>
    </div>
  );
}

/* ── Tabs: Integrations ── */

interface IntegrationCardProps {
  icon: typeof Globe;
  name: string;
  connected: boolean;
}

function IntegrationCard({ icon: Icon, name, connected }: IntegrationCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-deep-black">{name}</h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            {connected ? (
              <>
                <Wifi className="w-3 h-3 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-400">Disconnected</span>
              </>
            )}
          </div>
        </div>
      </div>
      <button className="w-full py-2.5 text-sm font-semibold text-royal-blue bg-royal-blue/[0.06] border border-royal-blue/10 rounded-xl transition-all duration-200 hover:bg-royal-blue hover:text-white hover:border-royal-blue">
        Connect
      </button>
    </div>
  );
}

function IntegrationsTab() {
  const integrations: IntegrationCardProps[] = [
    { icon: Globe, name: 'Website', connected: false },
    { icon: MessageSquare, name: 'WhatsApp', connected: false },
    { icon: Send, name: 'Messenger', connected: false },
    { icon: Camera, name: 'Instagram', connected: false },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {integrations.map((int) => (
        <IntegrationCard key={int.name} {...int} />
      ))}
    </div>
  );
}

/* ── Tabs: Analytics ── */

function AnalyticsTab() {
  const stats = [
    { icon: MessageSquare, label: 'Messages', value: '0' },
    { icon: Users, label: 'Leads', value: '0' },
    { icon: TrendingUp, label: 'Response Rate', value: '0%' },
    { icon: Clock, label: 'Average Response Time', value: '0 sec' },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500">{s.label}</span>
            <s.icon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-deep-black">{s.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Tabs: Settings ── */

function SettingsTab({ employee, onSaved }: { employee: EmployeeData; onSaved: (emp: EmployeeData) => void }) {
  const [form, setForm] = useState({
    name: employee.name,
    description: employee.description || '',
    website: employee.website || '',
    whatsapp_number: employee.whatsapp_number || '',
    language: employee.language || 'English',
    temperature: employee.temperature ?? 0.7,
    system_prompt: employee.system_prompt || '',
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('ai_employees')
        .update({
          name: form.name.trim(),
          description: form.description.trim() || null,
          website: form.website.trim() || null,
          whatsapp_number: form.whatsapp_number.trim() || null,
          language: form.language,
          temperature: form.temperature,
          system_prompt: form.system_prompt.trim() || null,
        })
        .eq('id', employee.id);

      if (error) throw error;
      onSaved({ ...employee, ...form });
      setToast({ message: 'Changes saved successfully.', type: 'success' });
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to save changes.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('ai_employees')
        .delete()
        .eq('id', employee.id);

      if (error) throw error;
      setToast({ message: 'AI Employee deleted.', type: 'success' });
      setTimeout(() => { goBack(); }, 1000);
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to delete.',
        type: 'error',
      });
      setDeleting(false);
    }
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Employee Name */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Employee Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Website</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
              placeholder="https://example.com"
              className={INPUT_CLASS}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Briefly describe what this AI employee does..."
              className={`${INPUT_CLASS} resize-none`}
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">WhatsApp Number</label>
            <input
              type="tel"
              value={form.whatsapp_number}
              onChange={(e) => update('whatsapp_number', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={INPUT_CLASS}
            />
          </div>

          {/* Language */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Language</label>
            <div className="relative">
              <select
                value={form.language}
                onChange={(e) => update('language', e.target.value)}
                className={SELECT_CLASS}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px',
                }}
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Temperature */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Temperature</label>
              <span className="text-sm font-bold text-deep-black">{form.temperature.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={form.temperature}
              onChange={(e) => update('temperature', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-royal-blue"
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-gray-400">0.0 — Precise</span>
              <span className="text-[10px] text-gray-400">1.0 — Creative</span>
            </div>
          </div>

          {/* System Prompt */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">System Prompt</label>
            <textarea
              rows={6}
              value={form.system_prompt}
              onChange={(e) => update('system_prompt', e.target.value)}
              placeholder="You are a professional AI assistant."
              className={`${INPUT_CLASS} resize-none font-mono text-[13px] leading-relaxed`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <div>
            {confirmDelete ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-red-600 font-medium">Are you sure?</span>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  {deleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-deep-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Employee
              </button>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Not Found State ── */

function NotFoundState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 mb-5">
        <Bot className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-deep-black mb-2">Employee not found.</h3>
      <p className="text-sm text-gray-500 mb-6">This AI Employee may have been deleted or does not exist.</p>
      <button
        onClick={goBack}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to AI Employees
      </button>
    </div>
  );
}

/* ── Loading State ── */

function LoadingState() {
  return (
    <>
      <section className="flex items-center gap-6 py-2 mb-6">
        <div className="h-9 w-9 rounded-lg bg-gray-100 animate-pulse" />
        <div>
          <div className="h-8 w-56 rounded bg-gray-100 animate-pulse mb-2" />
          <div className="h-4 w-64 rounded bg-gray-100 animate-pulse" />
        </div>
      </section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="h-4 w-24 rounded bg-gray-100 animate-pulse mb-3" />
            <div className="h-8 w-16 rounded bg-gray-100 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="h-10 w-full rounded-xl bg-gray-100 animate-pulse mb-6" />
      <div className="bg-white border border-gray-200 rounded-2xl p-12">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-full rounded-lg bg-gray-100 animate-pulse" />
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Main Component ── */

interface Props {
  employeeId: string | null;
}

export default function ClientAIEmployeeManage({ employeeId }: Props) {
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const fetchEmployee = useCallback(async () => {
    if (!employeeId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('ai_employees')
        .select('*')
        .eq('id', employeeId)
        .single();

      if (fetchError) throw fetchError;
      setEmployee(data as EmployeeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load AI Employee');
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  if (!employeeId) {
    return <NotFoundState />;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error || !employee) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <p className="text-sm font-medium text-deep-black mb-1">Something went wrong</p>
        <p className="text-sm text-gray-500 mb-4">{error || 'Employee not found'}</p>
        <button
          onClick={fetchEmployee}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-royal-blue rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const isActive = employee.status === 'active';

  function handleEmployeeUpdated(updated: EmployeeData) {
    setEmployee(updated);
  }

  return (
    <>
      {/* ── Header ── */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
              {employee.name}
            </h1>
            <p className="text-[15px] text-gray-500">
              {employee.model || '—'} • {employee.language || '—'} • {isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('settings')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
            isActive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : 'bg-gray-50 text-gray-500 border border-gray-200'
          }`}>
            {isActive ? <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </section>

      {/* ── Top Stats ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={MessageSquare} label="Conversations" value="0" />
        <StatCard icon={BookOpen} label="Knowledge Files" value="0" />
        <StatCard icon={Plug} label="Integrations" value="0" />
        <StatCard icon={Calendar} label="Created" value={formatDate(employee.created_at)} />
      </section>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1 -mb-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-royal-blue/[0.06] text-royal-blue border border-royal-blue/10'
                : 'text-gray-500 hover:text-deep-black hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === 'overview' && <OverviewTab employee={employee} />}
      {activeTab === 'knowledge' && <KnowledgeTab employeeId={employeeId} />}
      {activeTab === 'conversations' && <ConversationsTab />}
      {activeTab === 'integrations' && <IntegrationsTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
      {activeTab === 'settings' && <SettingsTab employee={employee} onSaved={handleEmployeeUpdated} />}
    </>
  );
}

/* ── Stat Card ── */

function StatCard({ icon: Icon, label, value }: { icon: typeof MessageSquare; label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-deep-black">{value}</div>
    </div>
  );
}
