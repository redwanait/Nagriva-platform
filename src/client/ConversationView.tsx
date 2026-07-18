import { useEffect, useRef } from 'react';
import { X, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { useConversationMessages } from '../hooks/useConversationMessages';
import MessageBubble from './MessageBubble';
import type { ClientConversation } from './clientData';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface ConversationViewProps {
  conversation: ClientConversation;
  onClose: () => void;
}

export default function ConversationView({ conversation, onClose }: ConversationViewProps) {
  const { messages, loading, error, refetch } = useConversationMessages(conversation.id);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-lg bg-white shadow-xl flex flex-col animate-slide-in-right border-l border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex-shrink-0">
              {getInitials(conversation.visitor_name)}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-deep-black truncate">
                {conversation.visitor_name}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {conversation.ai_employee_name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-deep-black hover:border-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
          {loading && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="dash-spinner" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 mb-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-sm font-medium text-deep-black mb-1">Failed to load messages</p>
              <p className="text-xs text-gray-500 mb-3">{error}</p>
              <button
                onClick={refetch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-royal-blue rounded-lg hover:bg-royal-blue-dark transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] mb-4">
                <MessageSquare className="w-6 h-6 text-royal-blue" />
              </div>
              <p className="text-sm font-medium text-deep-black mb-1">No messages yet</p>
              <p className="text-xs text-gray-500">
                Messages from this conversation will appear here.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
