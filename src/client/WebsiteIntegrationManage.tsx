import { useState, useEffect, useCallback } from 'react';
import {
  X,
  Globe,
  Link2,

  Clock,
  Key,
  Copy,
  Check,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Wifi,
  WifiOff,
  Save,
  Unplug,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Toast from '../components/Toast';

/* ── Types ── */

interface IntegrationData {
  id: string;
  owner_id: string;
  ai_employee_id: string | null;
  provider: string;
  website_url: string | null;
  widget_name: string | null;
  widget_key: string | null;
  widget_position: string | null;
  theme_color: string | null;
  greeting_message: string | null;
  status: string;
  connected_at: string | null;
  last_sync: string | null;
  created_at: string;
}

interface WebsiteIntegrationManageProps {
  integrationId: string;
  onClose: () => void;
  onUpdated: () => void;
}

/* ── Helpers ── */

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getStatusConfig(status: string) {
  switch (status) {
    case 'connected':
      return { dot: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50 border border-emerald-100', label: 'Connected', icon: Wifi };
    case 'disconnected':
      return { dot: 'bg-gray-400', text: 'text-gray-500', bg: 'bg-gray-50 border border-gray-200', label: 'Disconnected', icon: WifiOff };
    case 'error':
      return { dot: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50 border border-red-100', label: 'Error', icon: WifiOff };
    default:
      return { dot: 'bg-gray-400', text: 'text-gray-500', bg: 'bg-gray-50 border border-gray-200', label: status, icon: Wifi };
  }
}

/* ── Section Wrapper ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-deep-black mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* ── Confirm Disconnect Dialog ── */

function ConfirmDisconnectDialog({
  onConfirm,
  onClose,
}: {
  onConfirm: () => Promise<void>;
  onClose: () => void;
}) {
  const [disconnecting, setDisconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDisconnect() {
    setDisconnecting(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect.');
      setDisconnecting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        <h3 className="text-lg font-bold text-deep-black text-center mb-2">Disconnect Integration</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to disconnect this integration? The widget will stop working on your website.
        </p>

        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={disconnecting}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDisconnect}
            disabled={disconnecting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {disconnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Unplug className="w-4 h-4" />}
            {disconnecting ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function WebsiteIntegrationManage({
  integrationId,
  onClose,
  onUpdated,
}: WebsiteIntegrationManageProps) {
  const [integration, setIntegration] = useState<IntegrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // General form
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [widgetName, setWidgetName] = useState('');
  const [savingGeneral, setSavingGeneral] = useState(false);

  // Widget settings form
  const [widgetPosition, setWidgetPosition] = useState('bottom-right');
  const [themeColor, setThemeColor] = useState('#1E40AF');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);

  // Installation
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // Danger zone
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  /* ── Fetch integration ── */

  const fetchIntegration = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(null);

      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('id', integrationId)
        .single();

      if (error) throw error;

      const row = data as Record<string, unknown>;
      const parsed: IntegrationData = {
        id: row.id as string,
        owner_id: row.owner_id as string,
        ai_employee_id: (row.ai_employee_id as string) || null,
        provider: (row.provider as string) || 'Unknown',
        website_url: (row.website_url as string) || '',
        widget_name: (row.widget_name as string) || '',
        widget_key: (row.widget_key as string) || null,
        widget_position: (row.widget_position as string) || 'bottom-right',
        theme_color: (row.theme_color as string) || '#1E40AF',
        greeting_message: (row.greeting_message as string) || '',
        status: (row.status as string) || 'disconnected',
        connected_at: (row.connected_at as string) || null,
        last_sync: (row.last_sync as string) || null,
        created_at: (row.created_at as string) || '',
      };

      setIntegration(parsed);
      setWebsiteUrl(parsed.website_url ?? '');
      setWidgetName(parsed.widget_name ?? '');
      setWidgetPosition(parsed.widget_position ?? 'bottom-right');
      setThemeColor(parsed.theme_color ?? '#1E40AF');
      setGreetingMessage(parsed.greeting_message ?? '');
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Failed to load integration.');
    } finally {
      setLoading(false);
    }
  }, [integrationId]);

  useEffect(() => {
    fetchIntegration();
  }, [fetchIntegration]);

  /* ── Body scroll lock ── */

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* ── Escape key ── */

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  /* ── Save General ── */

  const handleSaveGeneral = useCallback(async () => {
    setSavingGeneral(true);
    const { error } = await supabase
      .from('integrations')
      .update({ website_url: websiteUrl, widget_name: widgetName || null })
      .eq('id', integrationId);

    if (error) {
      setToast({ message: error.message || 'Failed to save changes.', type: 'error' });
    } else {
      setToast({ message: 'General settings saved.', type: 'success' });
      setIntegration((prev) => prev ? { ...prev, website_url: websiteUrl, widget_name: widgetName || null } : prev);
      onUpdated();
    }
    setSavingGeneral(false);
  }, [integrationId, websiteUrl, widgetName, onUpdated]);

  /* ── Save Widget Settings ── */

  const handleSaveSettings = useCallback(async () => {
    setSavingSettings(true);
    const { error } = await supabase
      .from('integrations')
      .update({
        widget_position: widgetPosition,
        theme_color: themeColor,
        greeting_message: greetingMessage,
      })
      .eq('id', integrationId);

    if (error) {
      setToast({ message: error.message || 'Failed to save settings.', type: 'error' });
    } else {
      setToast({ message: 'Widget settings saved.', type: 'success' });
      setIntegration((prev) => prev ? {
        ...prev,
        widget_position: widgetPosition,
        theme_color: themeColor,
        greeting_message: greetingMessage,
      } : prev);
      onUpdated();
    }
    setSavingSettings(false);
  }, [integrationId, widgetPosition, themeColor, greetingMessage, onUpdated]);

  /* ── Copy Script ── */

  const widgetScript = integration?.widget_key
    ? `<script\n  src="https://widget.nagriva.com/widget.js"\n  data-key="${integration.widget_key}">\n</script>`
    : '';

  const handleCopy = useCallback(() => {
    if (!widgetScript) return;
    navigator.clipboard.writeText(widgetScript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [widgetScript]);

  /* ── Regenerate Widget Key ── */

  const handleRegenerateKey = useCallback(async () => {
    setRegenerating(true);
    const newKey = crypto.randomUUID();
    const { error } = await supabase
      .from('integrations')
      .update({ widget_key: newKey })
      .eq('id', integrationId);

    if (error) {
      setToast({ message: error.message || 'Failed to regenerate key.', type: 'error' });
    } else {
      setToast({ message: 'Widget key regenerated.', type: 'success' });
      setIntegration((prev) => prev ? { ...prev, widget_key: newKey } : prev);
      onUpdated();
    }
    setRegenerating(false);
  }, [integrationId, onUpdated]);

  /* ── Disconnect ── */

  const handleDisconnect = useCallback(async () => {
    const { error } = await supabase
      .from('integrations')
      .update({ status: 'disconnected' })
      .eq('id', integrationId);

    if (error) {
      throw error;
    }

    setIntegration((prev) => prev ? { ...prev, status: 'disconnected' } : prev);
    setToast({ message: 'Integration disconnected.', type: 'success' });
    onUpdated();
  }, [integrationId, onUpdated]);

  /* ── Render ── */

  const statusCfg = integration ? getStatusConfig(integration.status) : null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-white border-l border-gray-200 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-blue/[0.06] flex-shrink-0">
              <Globe className="w-[18px] h-[18px] text-royal-blue" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-deep-black truncate">
                {loading ? 'Loading...' : (integration?.widget_name || 'Website Integration')}
              </h2>
              <p className="text-xs text-gray-400 truncate">
                {integration?.website_url || '—'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-royal-blue animate-spin" />
            </div>
          )}

          {/* Error */}
          {fetchError && !loading && (
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-sm font-medium text-deep-black mb-1">Something went wrong</p>
              <p className="text-sm text-gray-500 mb-4 text-center">{fetchError}</p>
              <button
                onClick={fetchIntegration}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-royal-blue rounded-lg hover:bg-royal-blue-dark transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          )}

          {/* Form */}
          {!loading && !fetchError && integration && (
            <div className="p-6 space-y-8">

              {/* ── Section 1: General ── */}
              <Section title="General">
                <div>
                  <label className="block text-sm font-semibold text-deep-black mb-1.5">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-black mb-1.5">Widget Name</label>
                  <input
                    type="text"
                    value={widgetName}
                    onChange={(e) => setWidgetName(e.target.value)}
                    placeholder="Main Website Widget"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-black mb-1.5">Provider</label>
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                    <Link2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 capitalize">{integration.provider}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-black mb-1.5">Status</label>
                  {statusCfg && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                      {statusCfg.label}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleSaveGeneral}
                  disabled={savingGeneral}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {savingGeneral ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {savingGeneral ? 'Saving...' : 'Save Changes'}
                </button>
              </Section>

              <div className="h-px bg-gray-100" />

              {/* ── Section 2: Widget Settings ── */}
              <Section title="Widget Settings">
                <div>
                  <label className="block text-sm font-semibold text-deep-black mb-1.5">Widget Position</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['bottom-right', 'bottom-left'] as const).map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setWidgetPosition(pos)}
                        className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                          ${widgetPosition === pos
                            ? 'border-royal-blue bg-royal-blue/[0.04]'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className="relative w-20 h-14 bg-gray-100 rounded-lg border border-gray-200">
                          <div
                            className={`absolute w-5 h-5 rounded-full bg-royal-blue shadow-sm flex items-center justify-center ${pos === 'bottom-right' ? 'right-3 bottom-3' : 'left-3 bottom-3'}`}
                          >
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                        <span className="text-xs font-medium text-deep-black capitalize">{pos.replace('-', ' ')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-black mb-1.5">Theme Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 shadow-sm cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="w-4 h-4 rounded-full flex-shrink-0 border border-black/10" style={{ backgroundColor: themeColor }} />
                      <span className="text-sm font-mono text-gray-600">{themeColor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-black mb-1.5">Greeting Message</label>
                  <textarea
                    value={greetingMessage}
                    onChange={(e) => setGreetingMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white resize-none"
                  />
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {savingSettings ? 'Saving...' : 'Save Settings'}
                </button>
              </Section>

              <div className="h-px bg-gray-100" />

              {/* ── Section 3: Installation ── */}
              <Section title="Installation">
                {integration.widget_key ? (
                  <div className="relative bg-gray-900 rounded-xl p-4 overflow-x-auto">
                    <pre className="text-xs text-emerald-400 font-mono leading-relaxed whitespace-pre-wrap break-all">
                      {widgetScript}
                    </pre>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No widget key generated yet.</p>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    disabled={!integration.widget_key}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy Script'}
                  </button>
                  <button
                    onClick={handleRegenerateKey}
                    disabled={regenerating}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-royal-blue bg-royal-blue/[0.06] rounded-xl hover:bg-royal-blue/[0.10] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {regenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    {regenerating ? 'Regenerating...' : 'Regenerate Widget Key'}
                  </button>
                </div>
              </Section>

              <div className="h-px bg-gray-100" />

              {/* ── Section 4: Activity ── */}
              <Section title="Activity">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Connected At</span>
                    </div>
                    <p className="text-sm font-medium text-deep-black">{formatDate(integration.connected_at)}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Sync</span>
                    </div>
                    <p className="text-sm font-medium text-deep-black">{formatDate(integration.last_sync)}</p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Key className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Widget Key</span>
                  </div>
                  <p className="text-sm font-mono text-deep-black break-all">{integration.widget_key || '—'}</p>
                </div>
              </Section>

              <div className="h-px bg-gray-100" />

              {/* ── Section 5: Danger Zone ── */}
              <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-5">
                <h3 className="text-sm font-bold text-red-700 mb-1">Danger Zone</h3>
                <p className="text-xs text-red-500 mb-4">
                  Disconnecting will deactivate the widget on your website. You can reconnect later.
                </p>
                <button
                  onClick={() => setShowDisconnectConfirm(true)}
                  disabled={integration.status === 'disconnected'}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Unplug className="w-4 h-4" />
                  {integration.status === 'disconnected' ? 'Already Disconnected' : 'Disconnect Integration'}
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Disconnect Confirmation */}
        {showDisconnectConfirm && (
          <ConfirmDisconnectDialog
            onConfirm={handleDisconnect}
            onClose={() => setShowDisconnectConfirm(false)}
          />
        )}

        {/* Toast */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}
