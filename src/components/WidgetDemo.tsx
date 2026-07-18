import { useState, useEffect, useRef, useCallback } from 'react';

type Phase = 'idle' | 'chat' | 'typing';

const AI_RESPONSES: Record<string, string> = {
  pricing: 'Nagriva offers three plans — Starter at $29/mo, Pro at $79/mo, and Enterprise with custom pricing. Each includes unlimited conversations and all core features.',
  features: 'Key features include an AI Knowledge Base, Website Widget, Human Handoff, Analytics Dashboard, Multi-language support, and Easy Setup — all from one dashboard.',
  'book a demo': "I'd love to set that up! Our team typically walks you through the platform in a 15-minute call. You can schedule at nagriva.ai/demo.",
  demo: "I'd love to set that up! Our team typically walks you through the platform in a 15-minute call. You can schedule at nagriva.ai/demo.",
  default: "Great question! Nagriva helps businesses deploy AI employees that answer customers, automate bookings, and qualify leads — all from a single platform.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  if (lower.includes('pric') || lower.includes('cost') || lower.includes('plan')) return AI_RESPONSES.pricing;
  if (lower.includes('feature') || lower.includes('what can')) return AI_RESPONSES.features;
  if (lower.includes('demo') || lower.includes('book') || lower.includes('call')) return AI_RESPONSES['book a demo'];
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return "Hey there! 👋 I'm here to help you learn about Nagriva. What would you like to know?";
  if (lower.includes('thank')) return "You're welcome! Feel free to ask anything else about Nagriva. 🙌";
  return AI_RESPONSES.default;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

interface Msg {
  role: 'user' | 'ai';
  text: string;
  time: string;
}

export default function WidgetDemo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [phase, setPhase] = useState<Phase>('idle');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setPhase('idle');
    setMessages([]);
    setInput('');
  }, [clearTimers]);

  const startSequence = useCallback(() => {
    clearTimers();
    setPhase('idle');
    setMessages([]);
    setInput('');

    const t1 = setTimeout(() => {
      setPhase('chat');
      setMessages([{
        role: 'ai',
        text: "👋 Welcome!\n\nI'm your Nagriva AI assistant.\nWould you like to try our AI assistant?",
        time: formatTime(new Date()),
      }]);
    }, 800);
    timers.current.push(t1);
  }, [clearTimers]);

  // Intersection Observer — enter/leave
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startSequence();
        } else {
          reset();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startSequence, reset]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase]);

  // Focus input
  useEffect(() => {
    if (phase === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [phase]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || phase === 'typing') return;

    const now = formatTime(new Date());
    setMessages(prev => [...prev, { role: 'user', text: trimmed, time: now }]);
    setInput('');
    setPhase('typing');

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: getResponse(trimmed), time: formatTime(new Date()) }]);
      setPhase('chat');
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showSuggestions = phase === 'chat' && messages.length === 1 && messages[0].role === 'ai';

  return (
    <div ref={wrapperRef} className="flex flex-col h-full min-h-0 w-full">
      {/* ── Header ── */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100 shrink-0 bg-white">
        <div className="relative">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-deep-black block leading-tight">Nagriva AI</span>
          <span className="text-[10px] text-emerald-500 font-medium">Online</span>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 bg-gray-50/30">

        {/* Idle state */}
        {phase === 'idle' && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="h-10 w-10 rounded-full bg-royal-blue/[0.06] flex items-center justify-center mb-3">
              <svg className="h-5 w-5 text-royal-blue" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <p className="text-[13px] font-medium text-gray-700">Nagriva AI</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Starting conversation...</p>
          </div>
        )}

        {/* Messages */}
        {(phase === 'chat' || phase === 'typing') && (
          <>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeSlideUp_250ms_ease-out]`}>
                {msg.role === 'ai' && (
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shrink-0 mt-0.5 mr-2">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                )}
                <div className="max-w-[78%]">
                  <div className={`px-3.5 py-2.5 rounded-2xl ${msg.role === 'user' ? 'bg-royal-blue text-white rounded-tr-sm' : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100 shadow-sm'}`}>
                    <p className="text-[12px] leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                  <span className={`text-[9px] text-gray-400 mt-1 block ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {phase === 'typing' && (
              <div className="flex justify-start animate-[fadeIn_200ms_ease-out]">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shrink-0 mt-0.5 mr-2">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animationDelay: '0.15s' }} />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* ── Quick suggestions ── */}
      {showSuggestions && (
        <div className="px-4 pb-2 pt-1 border-t border-gray-100 bg-white shrink-0">
          <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mb-2">Quick Actions</p>
          <div className="flex gap-1.5 flex-wrap">
            {['Pricing', 'Features', 'Book a Demo'].map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={phase !== 'chat'}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-[10px] font-medium text-gray-600 hover:border-royal-blue hover:text-royal-blue hover:bg-royal-blue/[0.02] transition-all duration-150 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input ── */}
      {(phase === 'chat' || phase === 'typing') && (
        <div className="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={phase === 'typing'}
              placeholder="Type your message..."
              className="flex-1 h-9 rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-royal-blue focus:ring-1 focus:ring-royal-blue/15 focus:bg-white transition-all duration-150 disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || phase === 'typing'}
              className="h-9 px-4 rounded-xl bg-royal-blue text-white text-[11px] font-semibold flex items-center gap-1.5 shrink-0 disabled:opacity-40 transition-all duration-150 hover:bg-royal-blue-dark"
            >
              Send
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
