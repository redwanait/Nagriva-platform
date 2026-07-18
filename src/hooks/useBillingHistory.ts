import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface BillingInvoice {
  id: string;
  plan_name: string;
  amount: number;
  status: string;
  invoice_date: string;
  invoice_number: string | null;
  pdf_url: string | null;
  created_at: string;
}

async function fetchBillingHistory(): Promise<BillingInvoice[]> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return [];

  const { data, error } = await supabase
    .from('billing_history')
    .select('id, owner_id, subscription_id, invoice_number, amount, currency, status, invoice_url, created_at')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id as string,
    plan_name: '',
    amount: (row.amount as number) ?? 0,
    status: (row.status as string) || 'pending',
    invoice_date: (row.created_at as string) || '',
    invoice_number: (row.invoice_number as string) || null,
    pdf_url: (row.invoice_url as string) || null,
    created_at: (row.created_at as string) || '',
  }));
}

export function useBillingHistory() {
  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['billing-history'] });
  }, [queryClient]);

  const query = useQuery({
    queryKey: ['billing-history'],
    queryFn: fetchBillingHistory,
    staleTime: 30_000,
  });

  useEffect(() => {
    const channel = supabase
      .channel('billing-history-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'billing_history' },
        () => { invalidate(); },
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [invalidate]);

  return {
    invoices: query.data ?? [],
    loading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}
