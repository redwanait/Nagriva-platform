import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from './supabase';
import type { UserRole, AccountStatus } from '../hooks/useProfile';

interface AuthState {
  userId: string | null;
  role: UserRole | null;
  accountStatus: AccountStatus | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  loadProfile: () => Promise<void>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    userId: null,
    role: null,
    accountStatus: null,
    loading: true,
  });

  const loadProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setState({ userId: null, role: null, accountStatus: null, loading: false });
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('role, account_status')
        .eq('id', user.id)
        .maybeSingle();

      if (data) {
        setState({
          userId: user.id,
          role: data.role as UserRole,
          accountStatus: data.account_status as AccountStatus,
          loading: false,
        });
      } else {
        setState({
          userId: user.id,
          role: 'client',
          accountStatus: 'active',
          loading: false,
        });
      }
    } catch {
      setState({ userId: null, role: null, accountStatus: null, loading: false });
    }
  }, []);

  const signOut = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;

      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sb-')) localStorage.removeItem(key);
      }

      setState({ userId: null, role: null, accountStatus: null, loading: false });
      return { success: true };
    } catch (err) {
      setState({ userId: null, role: null, accountStatus: null, loading: false });
      return { success: false, error: err instanceof Error ? err.message : 'Logout failed' };
    }
  }, []);

  useEffect(() => {
    loadProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          loadProfile();
        }
        if (event === 'SIGNED_OUT') {
          setState({ userId: null, role: null, accountStatus: null, loading: false });
        }
      },
    );

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  return (
    <AuthContext.Provider value={{ ...state, loadProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
