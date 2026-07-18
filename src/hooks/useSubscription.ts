import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Subscription {
  id: string;
  plan: string;
  status: string;
  price: number;
  billing_cycle: string;
  start_date: string | null;
  renewal_date: string | null;
  ai_employees_limit: number;
  messages_limit: number;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const { data, error: fetchError } = await supabase
        .from('subscriptions')
        .select('id, plan, status, price, billing_cycle, start_date, renewal_date, ai_employees_limit, messages_limit')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error('[useSubscription] Query failed:', {
          code: fetchError.code,
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
        });
        throw fetchError;
      }

      if (!data) {
        setSubscription(null);
        return;
      }

      const mapped: Subscription = {
        id: data.id as string,
        plan: (data.plan as string) || 'Free',
        status: (data.status as string) || 'inactive',
        price: (data.price as number) ?? 0,
        billing_cycle: (data.billing_cycle as string) || 'monthly',
        start_date: (data.start_date as string) || null,
        renewal_date: (data.renewal_date as string) || null,
        ai_employees_limit: (data.ai_employees_limit as number) ?? 0,
        messages_limit: (data.messages_limit as number) ?? 0,
      };

      setSubscription(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();

    const channel = supabase
      .channel('subscription-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'subscriptions' },
        () => { fetchSubscription(); },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'subscriptions' },
        () => { fetchSubscription(); },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'subscriptions' },
        () => { fetchSubscription(); },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSubscription]);

  return { subscription, loading, error, refetch: fetchSubscription };
}
