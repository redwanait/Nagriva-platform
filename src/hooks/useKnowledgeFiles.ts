import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface KnowledgeFile {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  status: string;
  chunk_count: number;
  created_at: string;
}

export function useKnowledgeFiles() {
  const [files, setFiles] = useState<KnowledgeFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const { data, error: fetchError } = await supabase
        .from('knowledge_files')
        .select('id, name, file_type, file_size, status, chunk_count, created_at')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const mapped: KnowledgeFile[] = (data ?? []).map((row: Record<string, unknown>) => ({
        id: row.id as string,
        name: (row.name as string) || 'Untitled',
        file_type: (row.file_type as string) || 'unknown',
        file_size: (row.file_size as number) ?? 0,
        status: (row.status as string) || 'pending',
        chunk_count: (row.chunk_count as number) ?? 0,
        created_at: (row.created_at as string) || '',
      }));

      setFiles(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch knowledge files');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();

    const channel = supabase
      .channel('knowledge-files-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'knowledge_files' },
        () => { fetchFiles(); },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchFiles]);

  return { files, loading, error, refetch: fetchFiles };
}
