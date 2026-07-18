import { useState, useEffect, useRef, useCallback } from 'react';
import {
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  Save,
  User,
  Mail,
  Building2,
  Globe,
  Camera,
  Trash2,
  Upload,
  Bell,
  Shield,
  Key,
  AlertTriangle,
  Lock,
  Smartphone,
  Monitor,
  X,
  Sparkles,
} from 'lucide-react';
import { useProfileSettings } from '../hooks/useProfileSettings';
import Toast from '../components/Toast';

/* ── Notification Defaults ── */

const NOTIFICATION_KEYS = [
  { key: 'email_notifications', label: 'Email Notifications', icon: Mail, description: 'Receive email updates about your account activity.' },
  { key: 'ai_employee_alerts', label: 'AI Employee Alerts', icon: Bell, description: 'Get notified when your AI Employees need attention.' },
  { key: 'new_conversation_alerts', label: 'New Conversation Alerts', icon: AlertCircle, description: 'Alerts when a new conversation is started.' },
  { key: 'weekly_usage_report', label: 'Weekly Usage Report', icon: CheckCircle2, description: 'Receive a weekly summary of your usage and metrics.' },
  { key: 'product_updates', label: 'Product Updates', icon: Sparkles, description: 'Stay informed about new features and improvements.' },
] as const;

function getDefaultNotifications(): Record<string, boolean> {
  return Object.fromEntries(NOTIFICATION_KEYS.map((n) => [n.key, true]));
}

/* ── Toggle Switch ── */

function ToggleSwitch({
  enabled,
  onToggle,
  disabled,
}: {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:ring-offset-2 ${
        enabled ? 'bg-royal-blue' : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/* ── Settings Card ── */

function SettingsCard({
  title,
  icon: Icon,
  children,
  className = '',
}: {
  title: string;
  icon: typeof Shield;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-blue/[0.06] border border-royal-blue/10">
          <Icon className="w-[18px] h-[18px] text-royal-blue" />
        </div>
        <h2 className="text-sm font-semibold text-deep-black">{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ── Coming Soon Badge ── */

function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500 border border-gray-200">
      <Sparkles className="w-2.5 h-2.5" />
      Coming Soon
    </span>
  );
}

/* ── Confirmation Modal ── */

function ConfirmDeleteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 border border-red-100">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-deep-black">Delete Account</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-deep-black hover:border-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-8">
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            This action is permanent and cannot be undone. All of your data, including AI Employees,
            conversations, and account information will be permanently deleted.
          </p>
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-red-700 font-medium">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              This feature is not yet available.
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-deep-black bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl opacity-50 cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Loading State ── */

function SettingsSkeleton() {
  return (
    <>
      <section className="flex items-center justify-between gap-6 py-2 mb-6">
        <div>
          <div className="h-8 w-48 rounded bg-gray-100 animate-pulse mb-2" />
          <div className="h-4 w-72 rounded bg-gray-100 animate-pulse" />
        </div>
      </section>
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-lg bg-gray-100 animate-pulse" />
              <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j}>
                  <div className="h-3 w-20 rounded bg-gray-100 animate-pulse mb-2" />
                  <div className="h-10 w-full rounded-lg bg-gray-100 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Error State ── */

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
        <AlertCircle className="w-6 h-6 text-red-500" />
      </div>
      <p className="text-sm font-medium text-deep-black mb-1">Something went wrong</p>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-royal-blue rounded-lg hover:bg-royal-blue-dark transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}

/* ── Input Class ── */

const INPUT =
  'w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white';

/* ── Main Component ── */

export default function ClientSettings() {
  const { profile, loading, error, refetch, updateProfile } = useProfileSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Profile state */
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  /* Notifications state */
  const [notifications, setNotifications] = useState<Record<string, boolean>>(getDefaultNotifications);

  /* Delete modal */
  const [deleteOpen, setDeleteOpen] = useState(false);

  /* Load profile into state */
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setEmail(profile.email);
      setCompanyName(profile.company_name);
      setWebsite(profile.website);
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  /* Load notification preferences from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nagriva_notifications');
      if (stored) setNotifications(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  /* ── Avatar Handlers ── */

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setToast({ message: 'Image must be under 2 MB.', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleRemoveAvatar() {
    setAvatarUrl('');
  }

  /* ── Notification Toggle ── */

  function toggleNotification(key: string) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  /* ── Save Profile ── */

  const handleSave = useCallback(async () => {
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setToast({ message: 'Full name is required.', type: 'error' });
      return;
    }

    if (website && !/^https?:\/\/.+/i.test(website)) {
      setToast({ message: 'Please enter a valid URL starting with http:// or https://', type: 'error' });
      return;
    }

    try {
      setSaving(true);
      await updateProfile({
        full_name: trimmedName,
        company_name: companyName,
        website: website,
        avatar_url: avatarUrl,
      });

      /* Persist notification preferences */
      try {
        localStorage.setItem('nagriva_notifications', JSON.stringify(notifications));
      } catch { /* ignore */ }

      setToast({ message: 'Settings saved successfully!', type: 'success' });
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to save settings',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  }, [fullName, companyName, website, avatarUrl, notifications, updateProfile]);

  /* ── Loading ── */
  if (loading) return <SettingsSkeleton />;

  /* ── Error ── */
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── Header ── */}
      <section className="flex items-center justify-between gap-6 py-2 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
            Settings
          </h1>
          <p className="text-[15px] text-gray-500">
            Manage your account, notifications, and security preferences.
          </p>
        </div>
      </section>

      <div className="space-y-5">

        {/* ═══════════════════════════════════════════════════
            1. PROFILE INFORMATION
            ═══════════════════════════════════════════════════ */}
        <SettingsCard title="Profile Information" icon={User}>
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-8">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  fullName.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={handleUploadClick}>
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-deep-black">{fullName || 'User'}</h3>
              </div>
              <p className="text-sm text-gray-500">{email}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUploadClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-royal-blue bg-royal-blue/[0.06] border border-royal-blue/10 rounded-lg hover:bg-royal-blue hover:text-white transition-all duration-200"
                >
                  <Upload className="w-3 h-3" />
                  Upload Avatar
                </button>
                {avatarUrl && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <User className="w-3.5 h-3.5" />
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={INPUT}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <Mail className="w-3.5 h-3.5" />
                Email
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-4 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5" />
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={INPUT}
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <Globe className="w-3.5 h-3.5" />
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={INPUT}
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </SettingsCard>

        {/* ═══════════════════════════════════════════════════
            2. NOTIFICATIONS
            ═══════════════════════════════════════════════════ */}
        <SettingsCard title="Notifications" icon={Bell}>
          <div className="divide-y divide-gray-100">
            {NOTIFICATION_KEYS.map(({ key, label, icon: NotifIcon, description }) => (
              <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0">
                    <NotifIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-deep-black">{label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{description}</div>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={notifications[key] ?? true}
                  onToggle={() => toggleNotification(key)}
                />
              </div>
            ))}
          </div>
        </SettingsCard>

        {/* ═══════════════════════════════════════════════════
            3. SECURITY
            ═══════════════════════════════════════════════════ */}
        <SettingsCard title="Security" icon={Shield}>
          <div className="space-y-1">
            {[
              { label: 'Change Password', icon: Lock, description: 'Update your account password.' },
              { label: 'Two-Factor Authentication', icon: Smartphone, description: 'Add an extra layer of security to your account.' },
              { label: 'Active Sessions', icon: Monitor, description: 'Manage devices where you are currently logged in.' },
            ].map(({ label, icon: SecIcon, description }) => (
              <div key={label} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0">
                    <SecIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-deep-black">{label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{description}</div>
                  </div>
                </div>
                <ComingSoonBadge />
              </div>
            ))}
          </div>
        </SettingsCard>

        {/* ═══════════════════════════════════════════════════
            4. API KEYS
            ═══════════════════════════════════════════════════ */}
        <SettingsCard title="API Keys" icon={Key}>
          <p className="text-sm text-gray-500 mb-5">
            Generate secure API keys to connect external applications.
          </p>
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-gray-300" />
              <span className="text-sm text-gray-500">No API keys yet</span>
            </div>
            <ComingSoonBadge />
          </div>
          <div className="mt-4">
            <button
              disabled
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl opacity-50 cursor-not-allowed"
            >
              <Key className="w-4 h-4" />
              Coming Soon
            </button>
          </div>
        </SettingsCard>

        {/* ═══════════════════════════════════════════════════
            5. DANGER ZONE
            ═══════════════════════════════════════════════════ */}
        <div className="bg-white border-2 border-red-200 rounded-2xl p-6 transition-all duration-300 hover:border-red-300 hover:shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 border border-red-100">
              <AlertTriangle className="w-[18px] h-[18px] text-red-500" />
            </div>
            <h2 className="text-sm font-semibold text-red-700">Danger Zone</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Delete your account permanently. This action cannot be undone.
          </p>
          <button
            onClick={() => setDeleteOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>

      </div>

      {/* ── Delete Confirmation Modal ── */}
      <ConfirmDeleteModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </>
  );
}
