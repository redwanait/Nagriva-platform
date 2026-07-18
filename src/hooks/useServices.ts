import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number | string;
  status: string;
  created_at: string;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setServices((data ?? []) as Service[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();

    const channel = supabase
      .channel('services-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'services' },
        () => {
          fetchServices();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}
