import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { Article } from '../lib/types/article';

export type ArticleFilter = 'all' | 'published' | 'draft' | 'featured';
export type ArticleSort = 'newest' | 'oldest' | 'most_read' | 'alphabetical';

export interface ArticleStats {
  total: number;
  published: number;
  drafts: number;
}

const PAGE_SIZE = 20;

export function useAdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ArticleStats>({ total: 0, published: 0, drafts: 0 });
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<ArticleFilter>('all');
  const [sort, setSort] = useState<ArticleSort>('newest');
  const searchDebounce = useRef<ReturnType<typeof setTimeout>>();

  const searchRef = useRef(search);
  searchRef.current = search;

  const filterRef = useRef(filter);
  filterRef.current = filter;

  const sortRef = useRef(sort);
  sortRef.current = sort;

  const pageRef = useRef(page);
  pageRef.current = page;

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const q = searchRef.current.toLowerCase();
      const f = filterRef.current;
      const s = sortRef.current;
      const p = pageRef.current;

      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' });

      if (q) {
        query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%,category.ilike.%${q}%`);
      }

      if (f === 'published') query = query.eq('status', 'published');
      else if (f === 'draft') query = query.eq('status', 'draft');
      else if (f === 'featured') query = query.eq('featured', true);

      if (s === 'newest') query = query.order('published_at', { ascending: false, nullsFirst: false });
      else if (s === 'oldest') query = query.order('published_at', { ascending: true, nullsFirst: false });
      else if (s === 'most_read') query = query.order('read_count', { ascending: false, nullsFirst: false });
      else if (s === 'alphabetical') query = query.order('title', { ascending: true });

      const from = (p - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;
      setArticles((data ?? []) as Article[]);
      setTotalCount(count ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const [totalRes, pubRes, draftRes] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
      ]);

      setStats({
        total: totalRes.count ?? 0,
        published: pubRes.count ?? 0,
        drafts: draftRes.count ?? 0,
      });
    } catch {
      // Stats are non-critical
    }
  }, []);

  const refetch = useCallback(() => {
    fetchArticles();
    fetchStats();
  }, [fetchArticles, fetchStats]);

  // Search with debounce
  const setSearchDebounced = useCallback((val: string) => {
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      searchRef.current = val;
      setPage(1);
      pageRef.current = 1;
      fetchArticles();
    }, 300);
  }, [fetchArticles]);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setSearchDebounced(val);
  }, [setSearchDebounced]);

  const handleFilter = useCallback((f: ArticleFilter) => {
    setFilter(f);
    filterRef.current = f;
    setPage(1);
    pageRef.current = 1;
    fetchArticles();
  }, [fetchArticles]);

  const handleSort = useCallback((s: ArticleSort) => {
    setSort(s);
    sortRef.current = s;
    setPage(1);
    pageRef.current = 1;
    fetchArticles();
  }, [fetchArticles]);

  const handlePage = useCallback((p: number) => {
    setPage(p);
    pageRef.current = p;
    fetchArticles();
  }, [fetchArticles]);

  // Optimistic update for toggle featured
  const toggleFeatured = useCallback(async (article: Article): Promise<boolean> => {
    const newVal = !article.featured;

    // Optimistic: update local state immediately
    setArticles((prev) =>
      prev.map((a) => (a.id === article.id ? { ...a, featured: newVal } : a))
    );
    setStats((prev) => ({
      ...prev,
      total: prev.total,
      published: prev.published,
      drafts: prev.drafts,
    }));

    try {
      const { error: updError } = await supabase
        .from('articles')
        .update({ featured: newVal })
        .eq('id', article.id);

      if (updError) throw updError;
      // Refresh stats in background (featured count may affect it)
      fetchStats();
      return true;
    } catch (err) {
      // Revert optimistic update on error
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, featured: !newVal } : a))
      );
      setError(err instanceof Error ? err.message : 'Failed to update article');
      return false;
    }
  }, [fetchStats]);

  // Update article (edit modal save)
  const updateArticle = useCallback(async (id: string, updates: Partial<Article>): Promise<boolean> => {
    try {
      const { error: updError } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id);

      if (updError) throw updError;
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article');
      return false;
    }
  }, [refetch]);

  const deleteArticle = useCallback(async (id: string): Promise<boolean> => {
    // Optimistic: remove from local state immediately
    setArticles((prev) => prev.filter((a) => a.id !== id));

    try {
      const { error: delError } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (delError) throw delError;
      fetchStats();
      return true;
    } catch (err) {
      // Revert: refetch full list on error
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      fetchArticles();
      return false;
    }
  }, [fetchArticles, fetchStats]);

  const duplicateArticle = useCallback(async (article: Article): Promise<boolean> => {
    try {
      const { id, created_at, updated_at, ...rest } = article;
      const duplicate = {
        ...rest,
        title: `${article.title} (Copy)`,
        slug: `${article.slug}-copy-${Date.now()}`,
        status: 'draft',
        featured: false,
        read_count: 0,
        published_at: null,
      };

      const { error: insError } = await supabase
        .from('articles')
        .insert(duplicate);

      if (insError) throw insError;
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate article');
      return false;
    }
  }, [refetch]);

  // Initial fetch
  useEffect(() => {
    fetchArticles();
    fetchStats();
  }, [fetchArticles, fetchStats]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('admin-articles-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'articles' },
        () => {
          fetchArticles();
          fetchStats();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchArticles, fetchStats]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return {
    articles,
    loading,
    error,
    stats,
    page,
    totalPages,
    totalCount,
    search,
    filter,
    sort,
    handleSearch,
    handleFilter,
    handleSort,
    handlePage,
    updateArticle,
    toggleFeatured,
    deleteArticle,
    duplicateArticle,
    refetch,
  };
}
