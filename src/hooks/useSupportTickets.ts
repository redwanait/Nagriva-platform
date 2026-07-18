import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface TicketReply {
  id: string;
  ticket_id: string;
  client_id: string;
  message: string;
  created_at: string;
}

export function useSupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const { data, error: fetchError } = await supabase
        .from('support_tickets')
        .select('id, subject, message, status, priority, created_at, updated_at')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('[useSupportTickets] Query failed:', {
          code: fetchError.code,
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
        });
        throw fetchError;
      }

      const mapped: SupportTicket[] = (data ?? []).map((row: Record<string, unknown>) => ({
        id: row.id as string,
        subject: (row.subject as string) || 'Untitled',
        message: (row.message as string) || '',
        status: (row.status as string) || 'open',
        priority: (row.priority as string) || 'medium',
        created_at: (row.created_at as string) || '',
        updated_at: (row.updated_at as string) || '',
      }));

      setTickets(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();

    const channel = supabase
      .channel('support-tickets-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'support_tickets' },
        () => { fetchTickets(); },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'support_tickets' },
        () => { fetchTickets(); },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'support_tickets' },
        () => { fetchTickets(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ticket_replies' },
        () => { fetchTickets(); },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTickets]);

  const createTicket = useCallback(async (subject: string, message: string, priority: string) => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Not authenticated');

    const { error: insertError } = await supabase
      .from('support_tickets')
      .insert({
        client_id: user.id,
        owner_id: user.id,
        subject,
        message,
        priority,
        status: 'open',
      });

    if (insertError) throw insertError;
  }, []);

  const fetchReplies = useCallback(async (ticketId: string): Promise<TicketReply[]> => {
    const { data, error: fetchError } = await supabase
      .from('ticket_replies')
      .select('id, ticket_id, client_id, message, created_at')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (fetchError) throw fetchError;

    return (data ?? []).map((row: Record<string, unknown>) => ({
      id: row.id as string,
      ticket_id: row.ticket_id as string,
      client_id: row.client_id as string,
      message: (row.message as string) || '',
      created_at: (row.created_at as string) || '',
    }));
  }, []);

  const addReply = useCallback(async (ticketId: string, message: string) => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Not authenticated');

    const { error: insertError } = await supabase
      .from('ticket_replies')
      .insert({
        ticket_id: ticketId,
        client_id: user.id,
        message,
      });

    if (insertError) throw insertError;

    // Update ticket's updated_at
    await supabase
      .from('support_tickets')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', ticketId);
  }, []);

  return { tickets, loading, error, refetch: fetchTickets, createTicket, fetchReplies, addReply };
}
