import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface UserSubscription {
  id: string;
  plan_id: string;
  plan_name: string;
  status: string;
  billing_cycle: string;
  price: number;
  ai_limit: number;
  message_limit: number;
  storage_limit: number;
  renewal_date: string | null;
  created_at: string;
}

async function fetchUserSubscription(): Promise<UserSubscription | null> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data, error } = await supabase
    .from('user_subscriptions')
    .select(`
      id,
      plan_id,
      status,
      current_period_end,
      cancel_at_period_end,
      created_at,
      plans:plan_id (
        name,
        price,
        billing_cycle,
        ai_limit,
        message_limit,
        storage_limit_gb
      )
    `)
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const plan = data.plans as unknown as Record<string, unknown> | null;

  return {
    id: data.id as string,
    plan_id: (data.plan_id as string) || '',
    plan_name: (plan?.name as string) || 'Free',
    status: (data.status as string) || 'inactive',
    billing_cycle: (plan?.billing_cycle as string) || 'monthly',
    price: (plan?.price as number) ?? 0,
    ai_limit: (plan?.ai_limit as number) ?? 0,
    message_limit: (plan?.message_limit as number) ?? 0,
    storage_limit: ((plan?.storage_limit_gb as number) ?? 0) * 1024 * 1024 * 1024,
    renewal_date: (data.current_period_end as string) || null,
    created_at: (data.created_at as string) || '',
  };
}

export function useUserSubscription() {
  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
  }, [queryClient]);

  const query = useQuery({
    queryKey: ['user-subscription'],
    queryFn: fetchUserSubscription,
    staleTime: 30_000,
  });

  useEffect(() => {
    const channel = supabase
      .channel('user-subscription-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_subscriptions' },
        () => { invalidate(); },
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [invalidate]);

  return {
    subscription: query.data ?? null,
    loading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}
