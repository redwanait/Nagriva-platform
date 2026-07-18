import { MessageSquare, Clock } from 'lucide-react';
import type { ClientConversation } from './clientData';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatRelativeDate(dateStr: string): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'resolved':
      return 'bg-blue-50 text-royal-blue border border-blue-100';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

interface ConversationItemProps {
  conversation: ClientConversation;
  onSelect: (conversation: ClientConversation) => void;
}

export default function ConversationItem({ conversation, onSelect }: ConversationItemProps) {
  return (
    <div
      onClick={() => onSelect(conversation)}
      className="flex items-center gap-4 px-6 py-3.5 transition-colors duration-200 hover:bg-gray-50/50 cursor-pointer"
    >
      {/* Visitor */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex-shrink-0">
          {getInitials(conversation.visitor_name)}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-deep-black truncate">{conversation.visitor_name}</div>
          <div className="text-xs text-gray-500 truncate max-w-[200px] lg:hidden">{conversation.last_message}</div>
        </div>
      </div>

      {/* AI Employee */}
      <span className="hidden md:block flex-1 text-xs text-gray-500 truncate">{conversation.ai_employee_name}</span>

      {/* Last Message */}
      <span className="hidden lg:block flex-1 text-xs text-gray-500 truncate">{conversation.last_message}</span>

      {/* Message Count */}
      <div className="w-20 flex justify-center flex-shrink-0">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-deep-black">
          <MessageSquare className="w-3 h-3 text-gray-400" />
          {conversation.message_count}
        </span>
      </div>

      {/* Status */}
      <div className="w-24 flex justify-end flex-shrink-0">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(conversation.status)}`}>
          {conversation.status === 'active' ? 'Open' : conversation.status === 'resolved' ? 'Closed' : conversation.status}
        </span>
      </div>

      {/* Last Activity */}
      <div className="w-28 flex items-center justify-end gap-1.5 flex-shrink-0">
        <Clock className="w-3 h-3 text-gray-400" />
        <span className="text-xs text-gray-400">{formatRelativeDate(conversation.updated_at)}</span>
      </div>
    </div>
  );
}
