import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Integration {
  id: string;
  name: string;
  provider: string;
  status: string;
  last_sync: string | null;
  connected_at: string | null;
  created_at: string;
}

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIntegrations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const { data, error: fetchError } = await supabase
        .from('integrations')
        .select('id, widget_name, provider, status, last_sync, connected_at, created_at')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const mapped: Integration[] = (data ?? []).map((row: Record<string, unknown>) => ({
        id: row.id as string,
        name: (row.widget_name as string) || (row.provider as string) || 'Untitled',
        provider: (row.provider as string) || 'Unknown',
        status: (row.status as string) || 'disconnected',
        last_sync: (row.last_sync as string) || null,
        connected_at: (row.connected_at as string) || null,
        created_at: (row.created_at as string) || '',
      }));

      setIntegrations(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch integrations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIntegrations();

    const channel = supabase
      .channel('integrations-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'integrations' },
        () => { fetchIntegrations(); },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'integrations' },
        () => { fetchIntegrations(); },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'integrations' },
        () => { fetchIntegrations(); },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchIntegrations]);

  return { integrations, loading, error, refetch: fetchIntegrations };
}
