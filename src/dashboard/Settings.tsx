import { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

const TABS = [
  { label: 'Profile', icon: User },
  { label: 'Notifications', icon: Bell },
  { label: 'Security', icon: Shield },
  { label: 'Appearance', icon: Palette },
  { label: 'Language', icon: Globe },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const inputClass = 'w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white';

/* ── Loading Skeleton ── */

function LoadingSkeleton() {
  return (
    <>
      <section className="py-2">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Settings</h1>
        <p className="text-[15px] text-gray-500">Manage your account preferences and configuration.</p>
      </section>

      <section className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <nav className="p-2 space-y-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="h-5 w-32 bg-gray-100 rounded animate-pulse mb-6" />
            <div className="space-y-5">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 bg-gray-100 rounded-2xl animate-pulse flex-shrink-0" />
                <div className="space-y-2">
                  <div className="h-9 w-28 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-3 w-36 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                  <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Error State ── */

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <section className="py-2">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Settings</h1>
        <p className="text-[15px] text-gray-500">Manage your account preferences and configuration.</p>
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">Failed to load profile</h3>
        <p className="text-sm text-gray-500 mb-4">Something went wrong while fetching your profile.</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          Retry
        </button>
      </div>
    </>
  );
}

/* ── Empty State ── */

function EmptyState() {
  return (
    <>
      <section className="py-2">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Settings</h1>
        <p className="text-[15px] text-gray-500">Manage your account preferences and configuration.</p>
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <User className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">No profile found</h3>
        <p className="text-sm text-gray-500">Please complete onboarding to create your profile.</p>
      </div>
    </>
  );
}

/* ── Toast ── */

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white/80 hover:text-white ml-1">×</button>
    </div>
  );
}

/* ── Main Component ── */

export default function Settings() {
  const { profile, loading, error, refetch, updateProfile } = useProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (profile) {
      const parts = (profile.full_name || '').split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setCompanyName(profile.company_name || '');
      setWebsite(profile.website || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!profile) return <EmptyState />;

  const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'U';

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSave() {
    try {
      setSaving(true);
      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      await updateProfile({
        full_name: fullName,
        company_name: companyName,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });
      showToast('Profile updated successfully', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (!profile) return;
    const parts = (profile.full_name || '').split(' ');
    setFirstName(parts[0] || '');
    setLastName(parts.slice(1).join(' ') || '');
    setCompanyName(profile.company_name || '');
    setWebsite(profile.website || '');
    setAvatarUrl(profile.avatar_url || '');
  }

  return (
    <>
      <section className="py-2">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Settings</h1>
        <p className="text-[15px] text-gray-500">Manage your account preferences and configuration.</p>
      </section>

      <section className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <nav className="p-2">
              {TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${i === 0 ? 'bg-royal-blue/[0.06] text-royal-blue' : 'text-gray-500 hover:bg-gray-50 hover:text-deep-black'}`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-deep-black mb-6">Profile Settings</h2>

            <div className="space-y-5">
              {/* Avatar */}
              <div className="flex items-center gap-5">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-16 w-16 rounded-2xl object-cover" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-blue to-royal-blue-light text-white text-xl font-bold flex-shrink-0">
                    {getInitials(displayName)}
                  </div>
                )}
                <div>
                  <button className="px-4 py-2 text-sm font-medium text-royal-blue bg-royal-blue/[0.06] rounded-lg hover:bg-royal-blue/[0.1] transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-deep-black mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-black mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className={`${inputClass} opacity-70 cursor-not-allowed`}
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>

              {/* Save / Cancel */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
