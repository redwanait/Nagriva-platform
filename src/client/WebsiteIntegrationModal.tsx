import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Globe,
  ChevronDown,
  Check,
  Copy,
  Loader2,
  Radio,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import Toast from '../components/Toast';

/* ── Types ── */

interface AIEmployeeOption {
  id: string;
  name: string;
  status: string;
  avatarColor: string;
}

interface WebsiteIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: (widgetKey: string) => void;
  selectedEmployee?: AIEmployeeOption | null;
}

const NAGRIVA_BLUE = '#1E40AF';

/* ── Animation Keyframes (injected once) ── */

const ANIMATION_STYLES = `
@keyframes modalOverlayIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes modalOverlayOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes modalPanelIn {
  from { opacity: 0; transform: scale(0.95) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes modalPanelOut {
  from { opacity: 1; transform: scale(1) translateY(0); }
  to   { opacity: 0; transform: scale(0.95) translateY(12px); }
}
@keyframes successPopIn {
  0%   { opacity: 0; transform: scale(0.5); }
  60%  { opacity: 1; transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes successCheckDraw {
  0%   { stroke-dashoffset: 40; }
  100% { stroke-dashoffset: 0; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

let animationStyleInjected = false;

function injectAnimationStyles() {
  if (animationStyleInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = ANIMATION_STYLES;
  document.head.appendChild(style);
  animationStyleInjected = true;
}

/* ── Avatar Component ── */

function EmployeeAvatar({ name, color, size = 32 }: { name: string; color: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.375,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

/* ── Custom Dropdown ── */

function EmployeeDropdown({
  employees,
  selectedId,
  onSelect,
  disabled,
  loading,
}: {
  employees: AIEmployeeOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled: boolean;
  loading: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = employees.find((e) => e.id === selectedId);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-left transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-300 hover:bg-white'}
          ${open ? 'border-royal-blue ring-2 ring-royal-blue/10 bg-white' : ''}`}
      >
        {selected ? (
          <>
            <EmployeeAvatar name={selected.name} color={selected.avatarColor} size={28} />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-deep-black block truncate">{selected.name}</span>
              {selected.status && (
                <span className="text-xs text-gray-400 block truncate capitalize">{selected.status}</span>
              )}
            </div>
          </>
        ) : loading ? (
          <span className="text-sm text-gray-400">Loading employees...</span>
        ) : (
          <span className="text-sm text-gray-400">Select an AI Employee</span>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="py-1.5 max-h-60 overflow-y-auto">
            {employees.map((emp) => (
              <button
                key={emp.id}
                type="button"
                onClick={() => { onSelect(emp.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150
                  ${selectedId === emp.id ? 'bg-royal-blue/[0.04]' : 'hover:bg-gray-50'}`}
              >
                <EmployeeAvatar name={emp.name} color={emp.avatarColor} size={28} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-deep-black block truncate">{emp.name}</span>
                  {emp.status && (
                    <span className="text-xs text-gray-400 block truncate capitalize">{emp.status}</span>
                  )}
                </div>
                {selectedId === emp.id && <Check className="w-4 h-4 text-royal-blue flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Position Radio Cards ── */

function PositionCards({
  value,
  onChange,
  disabled,
}: {
  value: 'bottom-right' | 'bottom-left';
  onChange: (v: 'bottom-right' | 'bottom-left') => void;
  disabled: boolean;
}) {
  const options = [
    { id: 'bottom-right' as const, label: 'Bottom Right', iconPos: 'right-3 bottom-3' },
    { id: 'bottom-left' as const, label: 'Bottom Left', iconPos: 'left-3 bottom-3' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt.id)}
          className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${value === opt.id
              ? 'border-royal-blue bg-royal-blue/[0.04]'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
        >
          {/* Mini widget preview */}
          <div className="relative w-20 h-14 bg-gray-100 rounded-lg border border-gray-200">
            <div
              className={`absolute w-5 h-5 rounded-full bg-royal-blue shadow-sm flex items-center justify-center ${opt.iconPos}`}
              style={{ transform: 'translate(0, 0)' }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
          <span className="text-xs font-medium text-deep-black">{opt.label}</span>
          {value === opt.id && (
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-royal-blue flex items-center justify-center">
              <Radio className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

/* ── Success View ── */

function SuccessView({ widgetKey, onClose }: { widgetKey: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const widgetScript = `<script
  src="https://widget.nagriva.com/widget.js"
  data-key="${widgetKey}">
</script>`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(widgetScript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [widgetScript]);

  return (
    <div className="py-8 px-2">
      {/* Success icon */}
      <div className="flex justify-center mb-6" style={{ animation: 'successPopIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}>
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-pulse" />
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-200">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M9 18.5L15 24.5L27 11.5"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 40,
                  animation: 'successCheckDraw 0.6s ease-out 0.3s forwards',
                  strokeDashoffset: 40,
                }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Title + subtitle */}
      <div className="text-center mb-8" style={{ animation: 'fadeInUp 0.5s ease-out 0.4s forwards', opacity: 0 }}>
        <h3 className="text-xl font-bold text-deep-black mb-2">Website Connected Successfully</h3>
        <p className="text-sm text-gray-500">Your widget is ready to install.</p>
      </div>

      {/* Code block */}
      <div className="mb-8" style={{ animation: 'fadeInUp 0.5s ease-out 0.5s forwards', opacity: 0 }}>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Installation Script
        </label>
        <div className="relative bg-gray-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-xs text-emerald-400 font-mono leading-relaxed whitespace-pre-wrap break-all">
            {widgetScript}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Done button */}
      <div style={{ animation: 'fadeInUp 0.5s ease-out 0.6s forwards', opacity: 0 }}>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
        >
          Done
        </button>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function WebsiteIntegrationModal({
  isOpen,
  onClose,
  onConnect,
  selectedEmployee,
}: WebsiteIntegrationModalProps) {
  useEffect(() => { injectAnimationStyles(); }, []);

  const { userId } = useAuth();

  const [websiteUrl, setWebsiteUrl] = useState('');
  const [employeeId, setEmployeeId] = useState(selectedEmployee?.id ?? '');
  const [widgetName, setWidgetName] = useState('');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [themeColor, setThemeColor] = useState(NAGRIVA_BLUE);
  const [greetingMessage, setGreetingMessage] = useState("Hi 👋\nHow can I help you today?");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [closing, setClosing] = useState(false);
  const [generatedWidgetKey, setGeneratedWidgetKey] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [employees, setEmployees] = useState<AIEmployeeOption[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  const colorInputRef = useRef<HTMLInputElement>(null);

  // Fetch AI employees when modal opens
  useEffect(() => {
    if (!isOpen || !userId) return;

    let cancelled = false;

    async function fetchEmployees() {
      setEmployeesLoading(true);
      const { data, error } = await supabase
        .from('ai_employees')
        .select('id, name, model, status')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      console.log('[WebsiteIntegrationModal] ai_employees query result:', { data, error });

      if (!data || data.length === 0) {
        console.log('[WebsiteIntegrationModal] No employees found. Current user.id:', userId);
      }

      if (cancelled) return;

      if (error) {
        setEmployees([]);
      } else {
        setEmployees(
          (data ?? []).map((row: Record<string, unknown>) => ({
            id: (row.id as string) || '',
            name: (row.name as string) || 'Untitled',
            status: (row.status as string) || '',
            avatarColor: '#6366F1',
          })),
        );
      }
      setEmployeesLoading(false);
    }

    fetchEmployees();
    return () => { cancelled = true; };
  }, [isOpen, userId]);

  // Sync selectedEmployee when prop changes
  useEffect(() => {
    if (selectedEmployee?.id) setEmployeeId(selectedEmployee.id);
  }, [selectedEmployee]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) return;
    setWebsiteUrl('');
    setEmployeeId(selectedEmployee?.id ?? '');
    setWidgetName('');
    setPosition('bottom-right');
    setThemeColor(NAGRIVA_BLUE);
    setGreetingMessage("Hi 👋\nHow can I help you today?");
    setIsConnecting(false);
    setIsConnected(false);
    setClosing(false);
    setGeneratedWidgetKey('');
    setToast(null);
  }, [isOpen, selectedEmployee]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  const handleConnect = useCallback(async () => {
    if (!userId) {
      setToast({ message: 'You must be logged in to connect.', type: 'error' });
      return;
    }

    setIsConnecting(true);

    const widgetKey = crypto.randomUUID();

    const { error } = await supabase.from('integrations').insert({
      owner_id: userId,
      ai_employee_id: employeeId || null,
      provider: 'website',
      website_url: websiteUrl,
      widget_name: widgetName || null,
      widget_key: widgetKey,
      widget_position: position,
      theme_color: themeColor,
      greeting_message: greetingMessage,
      status: 'connected',
      connected_at: new Date().toISOString(),
    });

    if (error) {
      setToast({ message: error.message || 'Failed to connect website. Please try again.', type: 'error' });
      setIsConnecting(false);
      return;
    }

    setGeneratedWidgetKey(widgetKey);
    setIsConnecting(false);
    setIsConnected(true);
    onConnect?.(widgetKey);
  }, [userId, websiteUrl, employeeId, widgetName, position, themeColor, greetingMessage, onConnect]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const isFormDisabled = isConnecting;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        style={{ animation: 'modalOverlayIn 0.2s ease-out forwards' }}
        onClick={isConnecting ? undefined : handleClose}
      />

      {/* Panel */}
      <div
        className="relative w-full bg-white border border-gray-200 shadow-2xl flex flex-col overflow-hidden"
        style={{
          maxWidth: 620,
          borderRadius: 16,
          maxHeight: 'calc(100vh - 32px)',
          animation: closing
            ? 'modalPanelOut 0.2s ease-in forwards'
            : 'modalPanelIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      >
        {/* Close button */}
        {!isConnecting && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 pt-8 pb-6">
          {isConnected ? (
            <SuccessView widgetKey={generatedWidgetKey} onClose={handleClose} />
          ) : (
            <>
              {/* Header */}
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06]">
                    <Globe className="w-5 h-5 text-royal-blue" />
                  </div>
                  <h2 className="text-xl font-bold text-deep-black">Connect Website Widget</h2>
                </div>
                <p className="text-sm text-gray-500 ml-[52px]">
                  Connect your website and install the Nagriva AI Widget in less than one minute.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-6" />

              {/* Section 1: Website URL */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-deep-black mb-1.5">
                  Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    disabled={isFormDisabled}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Section 2: Select AI Employee */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-deep-black mb-1.5">
                  Select AI Employee
                </label>
                <EmployeeDropdown
                  employees={employees}
                  selectedId={employeeId}
                  onSelect={setEmployeeId}
                  disabled={isFormDisabled}
                  loading={employeesLoading}
                />
              </div>

              {/* Section 3: Widget Name */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-deep-black mb-1.5">
                  Widget Name <span className="font-normal text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  placeholder="Main Website Widget"
                  disabled={isFormDisabled}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Section 4: Widget Position */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-deep-black mb-1.5">
                  Widget Position
                </label>
                <PositionCards value={position} onChange={setPosition} disabled={isFormDisabled} />
              </div>

              {/* Section 5: Theme Color */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-deep-black mb-1.5">
                  Theme Color
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={isFormDisabled}
                    onClick={() => colorInputRef.current?.click()}
                    className="relative w-10 h-10 rounded-xl border-2 border-gray-200 shadow-sm cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: themeColor }}
                  >
                    <input
                      ref={colorInputRef}
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={isFormDisabled}
                    />
                  </button>
                  <div className="flex-1">
                    <div
                      className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-gray-300"
                      onClick={() => !isFormDisabled && colorInputRef.current?.click()}
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 border border-black/10"
                        style={{ backgroundColor: themeColor }}
                      />
                      <span className="text-sm font-mono text-gray-600">{themeColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6: Greeting Message */}
              <div className="mb-2">
                <label className="block text-sm font-semibold text-deep-black mb-1.5">
                  Greeting Message
                </label>
                <textarea
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  placeholder={"Hi 👋\nHow can I help you today?"}
                  rows={3}
                  disabled={isFormDisabled}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isConnected && (
          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                disabled={isConnecting}
                className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect Website'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
