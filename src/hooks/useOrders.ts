import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Order {
  id: string;
  created_at: string;
  status: string;
  amount: number;
  priority: string;
  client_id: string;
  service_id: string;
  client_name: string;
  service_name: string;
}

export interface OrderInput {
  client_id: string;
  service_id: string;
  status: string;
  priority: string;
  amount: number;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*, profiles(full_name), services(name)')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const formatted = (data ?? []).map((row) => {
        const p = row.profiles as Record<string, unknown> | Record<string, unknown>[] | null;
        const s = row.services as Record<string, unknown> | Record<string, unknown>[] | null;
        const clientName = Array.isArray(p) ? p[0]?.full_name : p?.full_name;
        const serviceName = Array.isArray(s) ? s[0]?.name : s?.name;
        return {
          id: String(row.id),
          created_at: String(row.created_at ?? ''),
          status: String(row.status ?? 'pending'),
          amount: Number(row.amount ?? 0),
          priority: String(row.priority ?? 'medium'),
          client_id: String(row.client_id ?? ''),
          service_id: String(row.service_id ?? ''),
          client_name: String(clientName || 'Unknown'),
          service_name: String(serviceName || 'Unknown'),
        };
      });

      setOrders(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  const createOrder = useCallback(async (input: OrderInput) => {
    const { error: insertError } = await supabase.from('orders').insert(input);
    if (insertError) throw insertError;
  }, []);

  const updateOrder = useCallback(async (id: string, input: Partial<OrderInput>) => {
    const { error: updateError } = await supabase.from('orders').update(input).eq('id', id);
    if (updateError) throw updateError;
  }, []);

  const deleteOrder = useCallback(async (id: string) => {
    const { error: deleteError } = await supabase.from('orders').delete().eq('id', id);
    if (deleteError) throw deleteError;
  }, []);

  return { orders, loading, error, refetch: fetchOrders, createOrder, updateOrder, deleteOrder };
}
