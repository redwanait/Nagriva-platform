import { useState, useEffect, useRef } from 'react';
import { Bell, Check, Trash2, Inbox, Bot, MessageSquare, BookOpen, Puzzle, BarChart3, CreditCard, Settings } from 'lucide-react';
import { useNotifications, type Notification, type NotificationType } from '../hooks/useNotifications';

const TYPE_ICONS: Record<NotificationType, typeof Bell> = {
  ai_employee: Bot,
  conversation: MessageSquare,
  knowledge_base: BookOpen,
  integration: Puzzle,
  usage: BarChart3,
  billing: CreditCard,
  system: Settings,
};

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function NotificationBell() {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  function handleNotificationClick(n: Notification) {
    if (!n.is_read) {
      markAsRead(n.id);
    }
    setOpen(false);
    if (n.action_url) {
      window.location.hash = n.action_url.startsWith('#') ? n.action_url.slice(1) : n.action_url;
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={handleToggle}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold border-2 border-white leading-none">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-deep-black">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead()}
                className="text-xs text-royal-blue hover:text-royal-blue/80 font-medium transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-5 h-5 border-2 border-gray-200 border-t-royal-blue rounded-full animate-spin" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
                <Inbox className="w-5 h-5" />
                <span className="text-sm">No notifications yet</span>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.map((n) => {
                  const Icon = TYPE_ICONS[n.type] ?? Bell;
                  return (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`group flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                        n.is_read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50/40 hover:bg-blue-50/60'
                      }`}
                    >
                      <div className="flex-shrink-0 pt-0.5">
                        <Icon className="w-4 h-4 text-gray-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm leading-snug ${n.is_read ? 'text-gray-600' : 'text-deep-black font-medium'}`}>
                            {n.title}
                          </p>
                          {!n.is_read && (
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-royal-blue" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{timeAgo(n.created_at)}</p>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!n.is_read && (
                          <button
                            onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                            className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                          className="p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
