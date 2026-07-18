import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export type NotificationType =
  | 'ai_employee'
  | 'conversation'
  | 'knowledge_base'
  | 'integration'
  | 'usage'
  | 'billing'
  | 'system';

export interface Notification {
  id: string;
  client_id: string | null;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  action_url: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

type Listener = (state: { notifications: Notification[]; unreadCount: number; loading: boolean }) => void;

const LIMIT = 10;

interface StoreState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  initialized: boolean;
  userId: string | null;
  channel: RealtimeChannel | null;
}

let state: StoreState = {
  notifications: [],
  unreadCount: 0,
  loading: true,
  initialized: false,
  userId: null,
  channel: null,
};

const listeners = new Set<Listener>();

function notify() {
  const snapshot = { notifications: state.notifications, unreadCount: state.unreadCount, loading: state.loading };
  listeners.forEach((fn) => fn(snapshot));
}

function deriveUnread() {
  state.unreadCount = state.notifications.filter((n) => !n.is_read).length;
}

function mapRow(row: Record<string, unknown>): Notification {
  return {
    id: row.id as string,
    client_id: (row.client_id as string) ?? null,
    title: (row.title as string) ?? '',
    message: (row.message as string) ?? '',
    type: (row.type as NotificationType) ?? 'system',
    is_read: (row.is_read as boolean) ?? false,
    action_url: (row.action_url as string) ?? null,
    metadata: (row.metadata as Record<string, unknown>) ?? null,
    created_at: (row.created_at as string) ?? '',
  };
}

async function fetchNotifications() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  if (state.userId !== user.id) {
    state.userId = user.id;
    state.initialized = false;
  }

  const { data, error } = await supabase
    .from('notifications')
    .select('id, client_id, title, message, type, is_read, action_url, metadata, created_at')
    .order('created_at', { ascending: false })
    .limit(LIMIT);

  if (error) return;

  state.notifications = (data ?? []).map(mapRow);
  deriveUnread();
  state.initialized = true;
  notify();
}

function subscribe() {
  if (state.channel) return;

  state.channel = supabase
    .channel('notifications-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'notifications' },
      () => { fetchNotifications(); },
    )
    .subscribe();
}

function unsubscribe() {
  if (state.channel) {
    supabase.removeChannel(state.channel);
    state.channel = null;
  }
}

export function addNotificationListener(listener: Listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    state.loading = true;
    subscribe();
    fetchNotifications();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      unsubscribe();
      state.initialized = false;
    }
  };
}

export function getNotificationState() {
  return { notifications: state.notifications, unreadCount: state.unreadCount, loading: state.loading };
}

export async function markNotificationAsRead(id: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id);
  if (error) throw error;
}

export async function markAllNotificationsAsRead() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('is_read', false);
  if (error) throw error;
}

export async function deleteNotificationById(id: string) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
