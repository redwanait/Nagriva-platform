import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Article } from '../lib/types/article';

export function useArticle(slug: string | null) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchArticle = useCallback(async () => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setNotFound(false);

      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          setNotFound(true);
        } else {
          throw fetchError;
        }
        return;
      }

      setArticle(data as Article);

      supabase.rpc('increment_read_count', { article_slug: slug }).then();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load article');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return { article, loading, error, notFound, refetch: fetchArticle };
}

export function useArticleNeighbors(slug: string | null) {
  const [prev, setPrev] = useState<Article | null>(null);
  const [next, setNext] = useState<Article | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchNeighbors = async () => {
      const { data: current } = await supabase
        .from('articles')
        .select('published_at')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (!current) return;

      const { data: prevData } = await supabase
        .from('articles')
        .select('title, slug, cover_image, category, reading_time, published_at')
        .eq('status', 'published')
        .gt('published_at', current.published_at)
        .order('published_at', { ascending: true })
        .limit(1)
        .maybeSingle();

      const { data: nextData } = await supabase
        .from('articles')
        .select('title, slug, cover_image, category, reading_time, published_at')
        .eq('status', 'published')
        .lt('published_at', current.published_at)
        .order('published_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      setPrev((prevData as Article) ?? null);
      setNext((nextData as Article) ?? null);
    };

    fetchNeighbors();
  }, [slug]);

  return { prev, next };
}

export function useRelatedArticles(slug: string | null, category: string | null) {
  const [related, setRelated] = useState<Article[]>([]);

  useEffect(() => {
    if (!slug || !category) return;

    const fetchRelated = async () => {
      const { data } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, cover_image, category, author_name, published_at, reading_time')
        .eq('status', 'published')
        .eq('category', category)
        .neq('slug', slug)
        .order('published_at', { ascending: false })
        .limit(3);

      setRelated((data as Article[]) ?? []);
    };

    fetchRelated();
  }, [slug, category]);

  return related;
}

export function useLatestArticles(currentSlug: string | null, limit = 4) {
  const [latest, setLatest] = useState<Article[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      let query = supabase
        .from('articles')
        .select('id, title, slug, excerpt, cover_image, category, author_name, published_at, reading_time')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (currentSlug) {
        query = query.neq('slug', currentSlug);
      }

      const { data } = await query;
      setLatest((data as Article[]) ?? []);
    };

    fetchLatest();
  }, [currentSlug, limit]);

  return latest;
}
