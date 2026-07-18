import { useState, useEffect, useRef } from 'react';
import { Search, Bot, MessageSquare, FileText, Headphones, Loader2, SearchX } from 'lucide-react';
import { useGlobalSearch } from '../hooks/useGlobalSearch';
import type { ClientSection } from './clientData';

interface GlobalSearchProps {
  onNavigate: (section: ClientSection) => void;
}

const CATEGORY_META: Record<string, { label: string; icon: typeof Bot; section: ClientSection }> = {
  'ai-employees': { label: 'AI Employees', icon: Bot, section: 'ai-employees' },
  'conversations': { label: 'Conversations', icon: MessageSquare, section: 'conversations' },
  'knowledge-base': { label: 'Knowledge Base', icon: FileText, section: 'knowledge-base' },
  'support': { label: 'Help Center', icon: Headphones, section: 'help-center' },
};

export default function GlobalSearch({ onNavigate }: GlobalSearchProps) {
  const { results, loading, query, setQuery, totalResults } = useGlobalSearch();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false);
      (e.target as HTMLInputElement).blur();
    }
  }

  function handleSelect() {
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      {loading && hasQuery && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin pointer-events-none" />
      )}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => { if (hasQuery) setOpen(true); }}
        onKeyDown={handleKeyDown}
        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
      />

      {open && hasQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : totalResults === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
              <SearchX className="w-5 h-5" />
              <span className="text-sm">No results for &ldquo;{query}&rdquo;</span>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(CATEGORY_META).map(([key, meta]) => {
                const items = results[key as keyof typeof results];
                if (items.length === 0) return null;
                const Icon = meta.icon;
                return (
                  <div key={key}>
                    <div className="px-3 py-1.5">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{meta.label}</span>
                    </div>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { onNavigate(meta.section); handleSelect(); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-deep-black truncate">{item.title}</p>
                          <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
