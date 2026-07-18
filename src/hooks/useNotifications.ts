import { useState, useEffect, useCallback } from 'react';
import {
  addNotificationListener,
  getNotificationState,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotificationById,
} from '../lib/notificationStore';
import type { Notification, NotificationType } from '../lib/notificationStore';

export type { Notification, NotificationType };

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() => getNotificationState().notifications);
  const [unreadCount, setUnreadCount] = useState<number>(() => getNotificationState().unreadCount);
  const [loading, setLoading] = useState<boolean>(() => getNotificationState().loading);

  useEffect(() => {
    const unsubscribe = addNotificationListener((state) => {
      setNotifications(state.notifications);
      setUnreadCount(state.unreadCount);
      setLoading(state.loading);
    });
    return unsubscribe;
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    await markNotificationAsRead(id);
  }, []);

  const markAllAsRead = useCallback(async () => {
    await markAllNotificationsAsRead();
  }, []);

  const deleteNotification = useCallback(async (id: string) => {
    await deleteNotificationById(id);
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
