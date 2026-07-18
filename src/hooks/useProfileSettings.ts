import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface ProfileSettings {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  company_name: string;
  website: string;
}

export function useProfileSettings() {
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ensureAndFetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      // Try to fetch existing profile
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url, company_name, website')
        .eq('id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('[useProfileSettings] Fetch failed:', {
          code: fetchError.code,
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
        });
        throw fetchError;
      }

      // If profile exists, use it
      if (data) {
        const mapped: ProfileSettings = {
          id: data.id as string,
          full_name: (data.full_name as string) || '',
          email: (data.email as string) || user.email || '',
          avatar_url: (data.avatar_url as string) || '',
          company_name: (data.company_name as string) || '',
          website: (data.website as string) || '',
        };
        setProfile(mapped);
        return;
      }

      // Profile doesn't exist — create it
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          full_name: user.user_metadata?.full_name || '',
          email: user.email ?? '',
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
          company_name: null,
          website: null,
          onboarding_completed: false,
          role: 'client',
          account_status: 'active',
        });

      if (insertError) {
        console.error('[useProfileSettings] Insert failed:', insertError.message);
        throw insertError;
      }

      // Re-fetch after creation
      const { data: newData, error: refetchError } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url, company_name, website')
        .eq('id', user.id)
        .maybeSingle();

      if (refetchError) throw refetchError;

      if (newData) {
        setProfile({
          id: newData.id as string,
          full_name: (newData.full_name as string) || '',
          email: (newData.email as string) || user.email || '',
          avatar_url: (newData.avatar_url as string) || '',
          company_name: (newData.company_name as string) || '',
          website: (newData.website as string) || '',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    ensureAndFetch();

    const channel = supabase
      .channel('profile-settings-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => { ensureAndFetch(); },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [ensureAndFetch]);

  const updateProfile = useCallback(async (updates: Pick<ProfileSettings, 'full_name' | 'company_name' | 'website' | 'avatar_url'>) => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Not authenticated');

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: updates.full_name,
        company_name: updates.company_name || null,
        website: updates.website || null,
        avatar_url: updates.avatar_url,
      })
      .eq('id', user.id);

    if (updateError) throw updateError;
  }, []);

  return { profile, loading, error, refetch: ensureAndFetch, updateProfile };
}
