import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { STORAGE_LIMIT_BYTES } from './useStorageUsage';

export interface UsageStats {
  id: string;
  conversations: number;
  messages_used: number;
  messages_limit: number;
  storage_used: number;
  storage_limit: number;
  active_employees: number;
  current_plan: string;
  conversations_limit: number;
  api_requests: number;
  month: number;
  year: number;
  fileCount: number;
}

const DEFAULT_STATS: UsageStats = {
  id: '',
  conversations: 0,
  messages_used: 0,
  messages_limit: 0,
  storage_used: 0,
  storage_limit: STORAGE_LIMIT_BYTES,
  active_employees: 0,
  current_plan: 'Free',
  conversations_limit: 0,
  api_requests: 0,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  fileCount: 0,
};

export function useUsageStats() {
  const [stats, setStats] = useState<UsageStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const uid = user.id;

      const [usageResult, filesResult, empResult] = await Promise.all([
        supabase
          .from('usage_stats')
          .select('id, conversations, messages_used, messages_limit, current_plan, conversations_limit, api_requests, month, year')
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

      if (usageResult.error) {
        console.error('[useUsageStats] Query failed:', usageResult.error);
        throw usageResult.error;
      }

      const files = filesResult.data ?? [];
      const totalBytes = files.reduce((sum, row) => sum + ((row.file_size as number) ?? 0), 0);
      const activeEmployees = empResult.count ?? 0;

      if (!usageResult.data) {
        setStats({ ...DEFAULT_STATS, storage_used: totalBytes, fileCount: files.length, active_employees: activeEmployees });
        return;
      }

      const data = usageResult.data;

      setStats({
        id: data.id as string,
        conversations: (data.conversations as number) ?? 0,
        messages_used: (data.messages_used as number) ?? 0,
        messages_limit: (data.messages_limit as number) ?? 0,
        storage_used: totalBytes,
        storage_limit: STORAGE_LIMIT_BYTES,
        active_employees: activeEmployees,
        current_plan: (data.current_plan as string) || 'Free',
        conversations_limit: (data.conversations_limit as number) ?? 0,
        api_requests: (data.api_requests as number) ?? 0,
        month: (data.month as number) ?? new Date().getMonth() + 1,
        year: (data.year as number) ?? new Date().getFullYear(),
        fileCount: files.length,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch usage stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    const channel = supabase
      .channel('usage-stats-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'usage_stats' },
        () => { fetchStats(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'knowledge_files' },
        () => { fetchStats(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ai_employees' },
        () => { fetchStats(); },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
