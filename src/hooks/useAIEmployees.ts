import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { EmployeePageEmployee } from '../client/clientData';

export function useAIEmployees() {
  const [employees, setEmployees] = useState<EmployeePageEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const [empResult, convResult] = await Promise.all([
        supabase
          .from('ai_employees')
          .select('*')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('conversations')
          .select('ai_employee_name, ai_employee_id')
          .eq('owner_id', user.id),
      ]);

      if (empResult.error) throw empResult.error;

      const rawEmps = empResult.data ?? [];
      const rawConvs = convResult.data ?? [];

      const convCountByName: Record<string, number> = {};
      const convCountById: Record<string, number> = {};
      for (const c of rawConvs) {
        const name = (c as Record<string, unknown>).ai_employee_name as string | undefined;
        const id = (c as Record<string, unknown>).ai_employee_id as string | undefined;
        if (name) convCountByName[name] = (convCountByName[name] || 0) + 1;
        if (id) convCountById[id] = (convCountById[id] || 0) + 1;
      }

      const mapped: EmployeePageEmployee[] = rawEmps.map((e: Record<string, unknown>) => {
        const empName = (e.name as string) || '';
        const empId = (e.id as string) || '';
        const conversationCount = convCountById[empId] ?? convCountByName[empName] ?? 0;
        const rawStatus = (e.status as string) || 'active';
        const status = (['active', 'inactive', 'paused', 'training', 'offline'] as const)
          .includes(rawStatus as any) ? rawStatus as EmployeePageEmployee['status'] : 'active';

        return {
          id: empId,
          name: empName,
          status,
          created_at: (e.created_at as string) || '',
          conversationCount,
          website: (e.website as string) || null,
          avatarColor: (e.avatar_color as string) || '#6366F1',
        };
      });

      setEmployees(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch AI employees');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();

    const channel = supabase
      .channel('ai-employees-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ai_employees' },
        () => { fetchEmployees(); },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'conversations' },
        () => { fetchEmployees(); },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchEmployees]);

  return { employees, loading, error, refetch: fetchEmployees };
}
