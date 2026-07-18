import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import type { Client } from './useClients';
import type { Order } from './useOrders';
import type { Service } from './useServices';
import type { Post } from './usePosts';

export interface AnalyticsData {
  clients: Client[];
  orders: Order[];
  services: Service[];
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  totalClients: number;
  totalOrders: number;
  totalServices: number;
  publishedPosts: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  inProgressOrders: number;
  topServices: { name: string; count: number }[];
  topClients: { name: string; count: number }[];
  recentActivity: { type: string; label: string; date: string }[];
}

export function useAnalytics() {
  const [clients, setClients] = useState<Client[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const [clientsResult, ordersResult, servicesResult, postsResult] = await Promise.all([
        supabase.from('clients').select('*').eq('owner_id', user.id).order('created_at', { ascending: false }),
        supabase.from('orders').select('*, profiles(full_name), services(name)').order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('created_at', { ascending: false }),
        supabase.from('posts').select('*').eq('author_id', user.id).order('created_at', { ascending: false }),
      ]);

      if (clientsResult.error) throw clientsResult.error;
      if (ordersResult.error) throw ordersResult.error;
      if (servicesResult.error) throw servicesResult.error;
      if (postsResult.error) throw postsResult.error;

      setClients((clientsResult.data ?? []) as Client[]);
      setServices((servicesResult.data ?? []) as Service[]);
      setPosts((postsResult.data ?? []) as Post[]);

      const formattedOrders = (ordersResult.data ?? []).map((row) => {
        const p = row.profiles as Record<string, unknown> | Record<string, unknown>[] | null;
        const s = row.services as Record<string, unknown> | Record<string, unknown>[] | null;
        const clientName = Array.isArray(p) ? p[0]?.full_name : p?.full_name;
        const serviceName = Array.isArray(s) ? s[0]?.name : s?.name;
        return {
          id: String(row.id),
          created_at: String(row.created_at ?? ''),
          status: String(row.status ?? 'pending'),
          amount: Number(row.amount ?? 0),
          priority: String(row.priority ?? 'medium'),
          client_id: String(row.client_id ?? ''),
          service_id: String(row.service_id ?? ''),
          client_name: String(clientName || 'Unknown'),
          service_name: String(serviceName || 'Unknown'),
        };
      });

      setOrders(formattedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const channels = [
      supabase.channel('analytics-clients').on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, () => fetchData()).subscribe(),
      supabase.channel('analytics-orders').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchData()).subscribe(),
      supabase.channel('analytics-services').on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => fetchData()).subscribe(),
      supabase.channel('analytics-posts').on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => fetchData()).subscribe(),
    ];

    return () => {
      channels.forEach((ch) => supabase.removeChannel(ch));
    };
  }, [fetchData]);

  const totalClients = useMemo(() => clients.length, [clients]);
  const totalOrders = useMemo(() => orders.length, [orders]);
  const totalServices = useMemo(() => services.length, [services]);
  const publishedPosts = useMemo(() => posts.filter((p) => p.status === 'published').length, [posts]);
  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + o.amount, 0), [orders]);

  const pendingOrders = useMemo(() => orders.filter((o) => o.status === 'pending').length, [orders]);
  const completedOrders = useMemo(() => orders.filter((o) => o.status === 'completed').length, [orders]);
  const inProgressOrders = useMemo(() => orders.filter((o) => o.status === 'in-progress').length, [orders]);

  const topServices = useMemo(() => {
    const map = new Map<string, number>();
    orders.forEach((o) => {
      const name = o.service_name || 'Unknown';
      map.set(name, (map.get(name) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [orders]);

  const topClients = useMemo(() => {
    const map = new Map<string, number>();
    orders.forEach((o) => {
      const name = o.client_name || 'Unknown';
      map.set(name, (map.get(name) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [orders]);

  const recentActivity = useMemo(() => {
    const items: { type: string; label: string; date: string }[] = [];

    const latestClient = clients[0];
    if (latestClient) items.push({ type: 'New Client', label: latestClient.full_name, date: latestClient.created_at });

    const latestOrder = orders[0];
    if (latestOrder) items.push({ type: 'New Order', label: latestOrder.service_name, date: latestOrder.created_at });

    const latestPost = posts[0];
    if (latestPost) items.push({ type: 'New Blog Post', label: latestPost.title, date: latestPost.created_at });

    const latestService = services[0];
    if (latestService) items.push({ type: 'New AI Employee', label: latestService.name, date: latestService.created_at });

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [clients, orders, posts, services]);

  return {
    clients,
    orders,
    services,
    posts,
    loading,
    error,
    refetch: fetchData,
    totalClients,
    totalOrders,
    totalServices,
    publishedPosts,
    totalRevenue,
    pendingOrders,
    completedOrders,
    inProgressOrders,
    topServices,
    topClients,
    recentActivity,
  };
}
