import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Article } from '../lib/types/article';

export function useRecentArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(5);

      if (fetchError) throw fetchError;
      setArticles((data ?? []) as Article[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recent articles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  return { articles, loading, error };
}
