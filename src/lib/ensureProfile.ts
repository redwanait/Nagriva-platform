import { supabase } from './supabase';

export async function ensureProfile(): Promise<{ onboarding_completed: boolean; role: string; account_status: string }> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { onboarding_completed: false, role: 'client', account_status: 'active' };

    const { data: existing } = await supabase
      .from('profiles')
      .select('onboarding_completed, role, account_status')
      .eq('id', user.id)
      .maybeSingle();

    if (existing) {
      return {
        onboarding_completed: existing.onboarding_completed,
        role: existing.role ?? 'client',
        account_status: existing.account_status ?? 'active',
      };
    }

    const { error } = await supabase.from('profiles').insert({
      id: user.id,
      full_name: user.user_metadata?.full_name || '',
      email: user.email ?? '',
      avatar_url:
        user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
      company_name: null,
      website: null,
      onboarding_completed: false,
      role: 'client',
      account_status: 'active',
    });

    if (error) {
      console.error('Failed to create profile:', error.message);
    }

    return { onboarding_completed: false, role: 'client', account_status: 'active' };
  } catch (err) {
    console.error('ensureProfile error:', err);
    return { onboarding_completed: false, role: 'client', account_status: 'active' };
  }
}
