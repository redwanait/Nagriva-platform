import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';

/* ── Constants ── */

export const STORAGE_LIMIT_BYTES = 1024 * 1024 * 1024; // 1 GB

/* ── Formatting ── */

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 2) + ' ' + units[i];
}

/* ── Hook ── */

interface StorageUsageStats {
  fileCount: number;
  totalBytes: number;
  formattedStorage: string;
  storagePercent: number;
  loading: boolean;
  error: string | null;
  storageLimit: number;
  refetch: () => void;
}

export function useStorageUsage(employeeId?: string | null): StorageUsageStats {
  const [totalBytes, setTotalBytes] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr || !user) throw new Error('Not authenticated');

      let query = supabase
        .from('knowledge_files')
        .select('file_size, client_id, owner_id, employee_id');

      if (employeeId) {
        query = query.eq('employee_id', employeeId);
      } else {
        query = query.or(`client_id.eq.${user.id},owner_id.eq.${user.id}`);
      }

      const { data, error: fetchErr } = await query;
      if (fetchErr) throw new Error(fetchErr.message);

      const rows = data ?? [];
      console.log("knowledgeFiles", rows);
      const total = rows.reduce((sum, row) => sum + ((row.file_size as number) ?? 0), 0);
      console.log("totalBytes", total);
      console.log("formattedStorage", formatBytes(total));
      setTotalBytes(total);
      setFileCount(rows.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load storage stats');
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Realtime: refetch when knowledge_files changes
  useEffect(() => {
    const ch = supabase
      .channel('storage-usage-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'knowledge_files' },
        () => fetchStats(),
      )
      .subscribe();

    return () => { supabase.removeChannel(ch); };
  }, [fetchStats]);

  const stats = useMemo(() => ({
    fileCount,
    totalBytes,
    formattedStorage: formatBytes(totalBytes),
    storagePercent: Math.min(Math.round((totalBytes / STORAGE_LIMIT_BYTES) * 100), 100),
    loading,
    error,
    storageLimit: STORAGE_LIMIT_BYTES,
    refetch: fetchStats,
  }), [fileCount, totalBytes, loading, error, fetchStats]);

  return stats;
}
