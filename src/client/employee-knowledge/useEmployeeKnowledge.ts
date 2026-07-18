import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import type { KnowledgeItem } from './types';
import { STORAGE_BUCKET, STORAGE_PATH_PREFIX } from './types';

const COLS =
  'id, owner_id, employee_id, client_id, name, file_url, file_type, file_size, status, chunk_count, knowledge_type, content, source_url, faq_question, faq_answer, processed_at, embedding_status, indexed, created_at';

function mapRow(row: Record<string, unknown>): KnowledgeItem {
  return {
    id: row.id as string,
    owner_id: (row.owner_id as string) || '',
    employee_id: (row.employee_id as string) || '',
    client_id: (row.client_id as string) || null,
    name: (row.name as string) || 'Untitled',
    file_url: (row.file_url as string) || null,
    file_type: (row.file_type as string) || null,
    file_size: (row.file_size as number) ?? null,
    status: (row.status as KnowledgeItem['status']) || 'processed',
    chunk_count: (row.chunk_count as number) ?? null,
    knowledge_type: 'file',
    content: (row.content as string) || null,
    source_url: (row.source_url as string) || null,
    faq_question: (row.faq_question as string) || null,
    faq_answer: (row.faq_answer as string) || null,
    processed_at: (row.processed_at as string) || null,
    embedding_status: (row.embedding_status as string) || null,
    indexed: (row.indexed as boolean) ?? null,
    created_at: (row.created_at as string) || '',
  };
}

function storagePathFromUrl(url: string): string {
  const marker = `/${STORAGE_BUCKET}/`;
  const idx = url.indexOf(marker);
  return idx !== -1 ? url.substring(idx + marker.length) : '';
}

export function useEmployeeKnowledge(employeeId: string | null) {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    if (!employeeId) { setItems([]); setLoading(false); return; }

    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr || !user) throw new Error('Not authenticated');

      const { data, error: fetchErr } = await supabase
        .from('knowledge_files')
        .select(COLS)
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false });

      if (fetchErr) throw new Error(fetchErr.message);

      const uid = user.id;
      setItems(
        (data ?? [])
          .map(mapRow)
          .filter((r) => r.client_id === uid || r.owner_id === uid || (!r.client_id && !r.owner_id)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load knowledge');
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  const uploadFile = useCallback(
    async (file: File): Promise<KnowledgeItem> => {
      if (!employeeId) {
        console.error("No employee selected");
        throw new Error('No employee selected');
      }

      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr || !user) throw new Error('Not authenticated');

      const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
      const storagePath = `${STORAGE_PATH_PREFIX}/${employeeId}/${Date.now()}-${file.name}`;
      const ownerId = user.id;
      const clientId = user.id;

      console.log("Storage bucket:", STORAGE_BUCKET);
      console.log("AUTH USER", user);
      console.log("AUTH ERROR", authErr);
      console.log("UPLOAD DATA", {
        employeeId,
        ownerId,
        clientId,
        bucket: STORAGE_BUCKET,
        path: storagePath,
        fileName: file.name,
      });

      let fileUrl = '';

      const { error: uploadErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, file, {
          contentType: file.type || 'application/octet-stream',
          upsert: false,
        });

      if (uploadErr) {
        console.error("Storage upload error:", uploadErr);
        throw new Error(`Storage upload failed: ${uploadErr.message}`);
      }

      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(storagePath);
      fileUrl = urlData.publicUrl;

      const row: Record<string, unknown> = {
        owner_id: user.id,
        client_id: user.id,
        employee_id: employeeId,
        name: file.name,
        file_type: ext,
        file_size: file.size,
        knowledge_type: 'file',
        status: 'processed',
      };
      if (fileUrl) row.file_url = fileUrl;

      const { data: inserted, error: insertErr } = await supabase
        .from('knowledge_files')
        .insert(row)
        .select(COLS)
        .single();

      if (insertErr) {
        console.error("Database insert error:", insertErr);
        throw new Error(`Database insert failed: ${insertErr.message}`);
      }

      const item = mapRow(inserted as Record<string, unknown>);
      setItems((prev) => [item, ...prev]);
      return item;
    },
    [employeeId],
  );

  const deleteItem = useCallback(
    async (id: string): Promise<void> => {
      const item = items.find((i) => i.id === id);

      if (item?.file_url) {
        const path = storagePathFromUrl(item.file_url);
        if (path) {
          await supabase.storage.from(STORAGE_BUCKET).remove([path]).catch(() => {});
        }
      }

      const { error } = await supabase.from('knowledge_files').delete().eq('id', id);
      if (error) throw new Error(error.message);

      setItems((prev) => prev.filter((i) => i.id !== id));
    },
    [items],
  );

  useEffect(() => {
    fetchItems();
    if (!employeeId) return;

    const ch = supabase
      .channel(`kf-${employeeId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'knowledge_files' }, () => fetchItems())
      .subscribe();

    return () => { supabase.removeChannel(ch); };
  }, [fetchItems, employeeId]);

  return { items, loading, error, refetch: fetchItems, uploadFile, deleteItem };
}
