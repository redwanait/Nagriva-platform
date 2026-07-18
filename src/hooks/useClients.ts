import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  website: string;
  status: string;
  created_at: string;
  owner_id: string;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('Not authenticated');
      }

      const { data, error: fetchError } = await supabase
        .from('clients')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setClients((data ?? []) as Client[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();

    const channel = supabase
      .channel('clients-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'clients' },
        () => {
          fetchClients();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchClients]);

  return { clients, loading, error, refetch: fetchClients };
}
