import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { STORAGE_LIMIT_BYTES } from './useStorageUsage';

export interface BillingUsage {
  messages_used: number;
  messages_limit: number;
  active_employees: number;
  storage_used: number;
  storage_limit: number;
  conversations: number;
  conversations_limit: number;
  current_plan: string;
  month: number;
  year: number;
}

async function fetchBillingUsage(): Promise<BillingUsage> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return {
      messages_used: 0,
      messages_limit: 0,
      active_employees: 0,
      storage_used: 0,
      storage_limit: STORAGE_LIMIT_BYTES,
      conversations: 0,
      conversations_limit: 0,
      current_plan: 'Free',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  }

  const uid = user.id;

  const [usageResult, filesResult, empResult] = await Promise.all([
    supabase
      .from('usage_stats')
      .select('conversations, messages_used, messages_limit, current_plan, conversations_limit, month, year')
      .eq('client_id', uid)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('knowledge_files')
      .select('file_size')
      .or(`client_id.eq.${uid},owner_id.eq.${uid}`),
    supabase
      .from('ai_employees')
      .select('id', { count: 'exact', head: true })
      .eq('owner_id', uid)
      .eq('status', 'active'),
  ]);

  if (usageResult.error) throw usageResult.error;

  const files = filesResult.data ?? [];
  const totalBytes = files.reduce((sum, row) => sum + ((row.file_size as number) ?? 0), 0);
  const activeEmployees = empResult.count ?? 0;

  if (!usageResult.data) {
    return {
      messages_used: 0,
      messages_limit: 0,
      active_employees: activeEmployees,
      storage_used: totalBytes,
      storage_limit: STORAGE_LIMIT_BYTES,
      conversations: 0,
      conversations_limit: 0,
      current_plan: 'Free',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  }

  const data = usageResult.data;

  return {
    messages_used: (data.messages_used as number) ?? 0,
    messages_limit: (data.messages_limit as number) ?? 0,
    active_employees: activeEmployees,
    storage_used: totalBytes,
    storage_limit: STORAGE_LIMIT_BYTES,
    conversations: (data.conversations as number) ?? 0,
    conversations_limit: (data.conversations_limit as number) ?? 0,
    current_plan: (data.current_plan as string) || 'Free',
    month: (data.month as number) ?? new Date().getMonth() + 1,
    year: (data.year as number) ?? new Date().getFullYear(),
  };
}

export function useBillingUsage() {
  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['billing-usage'] });
  }, [queryClient]);

  const query = useQuery({
    queryKey: ['billing-usage'],
    queryFn: fetchBillingUsage,
    staleTime: 30_000,
  });

  useEffect(() => {
    const channel = supabase
      .channel('billing-usage-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'usage_stats' },
        () => { invalidate(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'knowledge_files' },
        () => { invalidate(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ai_employees' },
        () => { invalidate(); },
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [invalidate]);

  return {
    usage: query.data ?? {
      messages_used: 0,
      messages_limit: 0,
      active_employees: 0,
      storage_used: 0,
      storage_limit: STORAGE_LIMIT_BYTES,
      conversations: 0,
      conversations_limit: 0,
      current_plan: 'Free',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
    loading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}
