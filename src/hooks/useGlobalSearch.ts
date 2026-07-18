import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { ClientSection } from '../client/clientData';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai-employees' | 'conversations' | 'knowledge-base' | 'support';
  section: ClientSection;
}

interface SearchGroups {
  'ai-employees': SearchResult[];
  'conversations': SearchResult[];
  'knowledge-base': SearchResult[];
  'support': SearchResult[];
}

export interface UseGlobalSearchReturn {
  results: SearchGroups;
  loading: boolean;
  query: string;
  setQuery: (q: string) => void;
  totalResults: number;
}

export function useGlobalSearch(): UseGlobalSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchGroups>({
    'ai-employees': [],
    'conversations': [],
    'knowledge-base': [],
    'support': [],
  });
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef(0);

  const executeSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults({ 'ai-employees': [], 'conversations': [], 'knowledge-base': [], 'support': [] });
      setLoading(false);
      return;
    }

    const pattern = `%${q}%`;
    const searchId = ++abortRef.current;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [empResult, convResult, kbResult, ticketResult] = await Promise.all([
        supabase
          .from('ai_employees')
          .select('id, name, status')
          .eq('owner_id', user.id)
          .ilike('name', pattern)
          .limit(5),
        supabase
          .from('conversations')
          .select('id, visitor_name, ai_employee_name, last_message')
          .eq('client_id', user.id)
          .or(`visitor_name.ilike.${pattern},ai_employee_name.ilike.${pattern},last_message.ilike.${pattern}`)
          .limit(5),
        supabase
          .from('knowledge_files')
          .select('id, name, file_type')
          .eq('client_id', user.id)
          .ilike('name', pattern)
          .limit(5),
        supabase
          .from('support_tickets')
          .select('id, subject, status')
          .eq('client_id', user.id)
          .or(`subject.ilike.${pattern}`)
          .limit(5),
      ]);

      if (searchId !== abortRef.current) return;

      const aiEmployees: SearchResult[] = (empResult.data ?? []).map((r) => ({
        id: r.id,
        title: r.name,
        subtitle: r.status === 'active' ? 'Active' : 'Inactive',
        category: 'ai-employees' as const,
        section: 'ai-employees' as ClientSection,
      }));

      const conversations: SearchResult[] = (convResult.data ?? []).map((r) => ({
        id: r.id,
        title: r.visitor_name || 'Unknown Visitor',
        subtitle: `with ${r.ai_employee_name || 'Unassigned'}`,
        category: 'conversations' as const,
        section: 'conversations' as ClientSection,
      }));

      const knowledgeBase: SearchResult[] = (kbResult.data ?? []).map((r) => ({
        id: r.id,
        title: r.name,
        subtitle: r.file_type?.toUpperCase() || 'File',
        category: 'knowledge-base' as const,
        section: 'knowledge-base' as ClientSection,
      }));

      const support: SearchResult[] = (ticketResult.data ?? []).map((r) => ({
        id: r.id,
        title: r.subject,
        subtitle: r.status.charAt(0).toUpperCase() + r.status.slice(1).replace('_', ' '),
        category: 'support' as const,
        section: 'support' as ClientSection,
      }));

      setResults({ 'ai-employees': aiEmployees, conversations, 'knowledge-base': knowledgeBase, support });
    } catch {
      if (searchId !== abortRef.current) return;
      setResults({ 'ai-employees': [], 'conversations': [], 'knowledge-base': [], 'support': [] });
    } finally {
      if (searchId === abortRef.current) setLoading(false);
    }
  }, []);

  const handleChange = useCallback((q: string) => {
    setQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!q.trim()) {
      setResults({ 'ai-employees': [], 'conversations': [], 'knowledge-base': [], 'support': [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => executeSearch(q), 300);
  }, [executeSearch]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const totalResults = results['ai-employees'].length + results.conversations.length + results['knowledge-base'].length + results.support.length;

  return { results, loading, query, setQuery: handleChange, totalResults };
}
