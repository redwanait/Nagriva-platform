import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface Plan {
  id: string;
  name: string;
  slug: string;
  price: number;
  billing_cycle: string;
  ai_limit: number;
  message_limit: number;
  storage_limit: number;
  is_active: boolean;
  features: string[] | null;
  created_at: string;
}

async function fetchPlans(): Promise<Plan[]> {
const { data, error } = await supabase
  .from('plans')
  .select('*');

console.log('Plans data:', data);
console.log('Plans error:', error);

  if (error) throw error;
  console.log("Plans from Supabase:", data);

  return (data ?? []).map((row) => ({
    id: row.id as string,
    name: (row.name as string) || 'Plan',
    slug: (row.slug as string) || '',
    price: (row.price as number) ?? 0,
    billing_cycle: (row.billing_cycle as string) || 'monthly',
    ai_limit: (row.ai_limit as number) ?? 0,
    message_limit: (row.message_limit as number) ?? 0,
    storage_limit: ((row.storage_limit_gb as number) ?? 0) * 1024 * 1024 * 1024,
    is_active: (row.is_active as boolean) ?? true,
    features: (row.features as string[]) ?? null,
    created_at: (row.created_at as string) || '',
  }));
}

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: fetchPlans,
    staleTime: 5 * 60_000,
  });
}
