import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { Article } from '../lib/types/article';

const BATCH_SIZE = 6;

export function usePaginatedArticles(category: string, search: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const offsetRef = useRef(0);
  const categoryRef = useRef(category);
  const searchRef = useRef(search);

  const buildQuery = useCallback((from: number, to: number) => {
    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(from, to);

    if (categoryRef.current !== 'All') {
      query = query.eq('category', categoryRef.current);
    }

    const q = searchRef.current.toLowerCase().trim();
    if (q) {
      query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,category.ilike.%${q}%,author.ilike.%${q}%,author_name.ilike.%${q}%`);
    }

    return query;
  }, []);

  const fetchInitial = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      offsetRef.current = 0;

      const { data, error: fetchError, count } = await buildQuery(0, BATCH_SIZE - 1);

      if (fetchError) throw fetchError;

      const result = (data ?? []) as Article[];
      setArticles(result);
      setTotalCount(count ?? 0);
      setHasMore(result.length === BATCH_SIZE);
      offsetRef.current = result.length;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  }, [buildQuery]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const from = offsetRef.current;
      const to = from + BATCH_SIZE - 1;

      const { data, error: fetchError } = await buildQuery(from, to);

      if (fetchError) throw fetchError;

      const result = (data ?? []) as Article[];
      setArticles((prev) => [...prev, ...result]);
      setHasMore(result.length === BATCH_SIZE);
      offsetRef.current += result.length;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more articles');
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, buildQuery]);

  useEffect(() => {
    categoryRef.current = category;
    searchRef.current = search;
    fetchInitial();
  }, [category, search, fetchInitial]);

  return { articles, loading, loadingMore, error, hasMore, totalCount, loadMore, refetch: fetchInitial };
}
