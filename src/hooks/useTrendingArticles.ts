import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Article } from '../lib/types/article';

export function useTrendingArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('read_count', { ascending: false })
        .limit(5);

      if (fetchError) throw fetchError;
      setArticles((data ?? []) as Article[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load trending articles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return { articles, loading, error };
}
