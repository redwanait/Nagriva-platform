import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface CategoryInfo {
  name: string;
  count: number;
}

export function useArticleCategories() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('articles')
        .select('category')
        .eq('status', 'published');

      if (error) throw error;

      const counts: Record<string, number> = {};
      (data ?? []).forEach((row) => {
        if (row.category) {
          counts[row.category] = (counts[row.category] || 0) + 1;
        }
      });

      const total = data?.length ?? 0;
      const sorted = Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCategories([{ name: 'All', count: total }, ...sorted]);
      setTotalCount(total);
    } catch {
      setCategories([{ name: 'All', count: 0 }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, totalCount, loading };
}
