import { useAuth } from '../lib/AuthContext';

interface GuardProps {
  children: React.ReactNode;
}

function LoadingSpinner() {
  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="dash-spinner" />
        <p className="text-sm text-gray-500">Verifying access...</p>
      </div>
    </div>
  );
}

export function AdminRoute({ children }: GuardProps) {
  const { role, accountStatus, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (accountStatus === 'suspended') {
    return <SuspendedPage />;
  }

  if (!role) {
    window.location.replace('/#/login');
    return <LoadingSpinner />;
  }

  if (role !== 'admin') {
    window.location.replace('/#/client-dashboard');
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}

export function ClientRoute({ children }: GuardProps) {
  const { role, accountStatus, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (accountStatus === 'suspended') {
    return <SuspendedPage />;
  }

  if (role !== 'client' && role !== 'admin') {
    window.location.replace('/#/login');
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}

function SuspendedPage() {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-6"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background:
          'radial-gradient(ellipse 50% 50% at 50% 45%, rgba(30, 64, 175, 0.04) 0%, transparent 70%)',
      }}
    >
      <div
        className="w-full text-center"
        style={{ maxWidth: '460px' }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #ECECEC',
            borderRadius: '24px',
            boxShadow:
              '0 1px 3px rgba(0, 0, 0, 0.02), 0 8px 32px -4px rgba(0, 0, 0, 0.04), 0 20px 60px -12px rgba(0, 0, 0, 0.03)',
            padding: '48px',
          }}
        >
          <div className="flex justify-center mb-6">
            <a href="/">
              <img
                src="/assets/logos/logo+text.jpeg"
                alt="Nagriva"
                className="h-8 w-auto"
                draggable={false}
              />
            </a>
          </div>

          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: '#FEF2F2', border: '2px solid #FECACA' }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: '#DC2626' }}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>

          <h2
            className="text-[1.375rem] font-bold tracking-tight mb-3"
            style={{ color: '#0B0B0B' }}
          >
            Account Suspended
          </h2>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: '#6B7280' }}
          >
            Your account has been suspended. Please contact support.
          </p>

          <a
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: '#1E40AF',
              boxShadow: '0 1px 2px rgba(30, 64, 175, 0.2)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1E3A8A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1E40AF';
            }}
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}
