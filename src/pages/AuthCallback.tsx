import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ensureProfile } from '../lib/ensureProfile';

export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('[AuthCallback] pathname:', window.location.pathname, 'hash:', window.location.hash);
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { onboarding_completed } = await ensureProfile();
          console.log('[AuthCallback] session active, onboarding_completed:', onboarding_completed);

          if (!onboarding_completed) {
            window.location.replace('/#/get-started');
            return;
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('role, account_status')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profile?.account_status === 'suspended') {
            await supabase.auth.signOut();
            window.location.replace('/#/login');
            return;
          }

          if (profile?.role === 'client') {
            window.location.replace('/#/client-dashboard');
          } else {
            window.location.replace('/#/dashboard');
          }
        } else {
          console.log('[AuthCallback] no session → #/login');
          window.location.replace('/#/login');
        }
      } catch (err) {
        console.log('[AuthCallback] error → #/login', err);
        window.location.replace('/#/login');
      }
    };

    handleCallback();
  }, []);

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#1E40AF' }} />
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Completing sign-in...
        </p>
      </div>
    </div>
  );
}
