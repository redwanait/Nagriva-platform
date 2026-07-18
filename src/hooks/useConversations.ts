import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { ClientConversation } from '../client/clientData';

const LIST_SELECT = 'id, visitor_name, ai_employee_id, last_message, status, message_count, updated_at, client_id, ai_employees(name)';

function matchesSearch(conv: ClientConversation, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    conv.visitor_name.toLowerCase().includes(q) ||
    (conv.visitor_email?.toLowerCase() ?? '').includes(q) ||
    (conv.visitor_phone ?? '').includes(q) ||
    (conv.last_message?.toLowerCase() ?? '').includes(q)
  );
}

function mapRow(row: Record<string, unknown>): ClientConversation {
  const aiEmployee = row.ai_employees as Record<string, unknown> | null;
  return {
    id: row.id as string,
    visitor_name: (row.visitor_name as string) || 'Unknown Visitor',
    ai_employee_name: (aiEmployee?.name as string) || 'Unassigned',
    ai_employee_id: (row.ai_employee_id as string) || undefined,
    last_message: (row.last_message as string) || '',
    status: (row.status as 'active' | 'resolved' | 'pending') || 'pending',
    message_count: (row.message_count as number) ?? 0,
    updated_at: (row.updated_at as string) || '',
    client_id: (row.client_id as string) || undefined,
  };
}

export function useConversations() {
  const [allConversations, setAllConversations] = useState<ClientConversation[]>([]);
  const [conversations, setConversations] = useState<ClientConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const applyFilters = useCallback(
    (list: ClientConversation[]) => {
      let filtered = list;
      if (statusFilter !== 'all') {
        filtered = filtered.filter((c) => c.status === statusFilter);
      }
      if (search) {
        filtered = filtered.filter((c) => matchesSearch(c, search));
      }
      setConversations(filtered);
    },
    [search, statusFilter],
  );

  useEffect(() => {
    applyFilters(allConversations);
  }, [applyFilters, allConversations]);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const { data, error: fetchError } = await supabase
        .from('conversations')
        .select(LIST_SELECT)
        .eq('client_id', user.id)
        .order('updated_at', { ascending: false });

      if (fetchError) {
        console.error('[useConversations] Supabase error:', fetchError);
        throw new Error(fetchError.message);
      }

      setAllConversations((data ?? []).map(mapRow));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch conversations';
      console.error('[useConversations]', msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    fetchConversations().then(() => {
      supabase.auth.getUser().then(({ data }) => {
        userIdRef.current = data.user?.id ?? null;
      });
    });

    const channel = supabase
      .channel('client-conversations-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversations' },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          if ((row.client_id as string) !== userIdRef.current) return;
          setAllConversations((prev) => {
            if (prev.some((c) => c.id === row.id)) return prev;
            return [mapRow(row), ...prev];
          });
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'conversations' },
        (payload) => {
          const updated = mapRow(payload.new as Record<string, unknown>);
          setAllConversations((prev) => {
            const idx = prev.findIndex((c) => c.id === updated.id);
            if (idx === -1) return [updated, ...prev];
            const next = [...prev];
            next[idx] = updated;
            next.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            return next;
          });
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'conversations' },
        (payload) => {
          const deletedId = payload.old.id as string;
          setAllConversations((prev) => prev.filter((c) => c.id !== deletedId));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  };
}
