import { Bot, User } from 'lucide-react';
import type { Message } from './clientData';

function formatMessageTime(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isVisitor = message.role === 'visitor';

  return (
    <div className={`flex items-start gap-3 ${isVisitor ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
          isVisitor
            ? 'bg-gray-100 text-gray-600'
            : 'bg-royal-blue text-white'
        }`}
      >
        {isVisitor ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>
      <div className={`flex flex-col max-w-[75%] ${isVisitor ? '' : 'items-end'}`}>
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
            isVisitor
              ? 'bg-gray-100 text-deep-black rounded-bl-md'
              : 'bg-royal-blue text-white rounded-br-md'
          }`}
        >
          {message.content}
        </div>
        <span className="text-[11px] text-gray-400 mt-1 px-1">
          {formatMessageTime(message.created_at)}
        </span>
      </div>
    </div>
  );
}
