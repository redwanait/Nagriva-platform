import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function useTocItems(contentRef: React.RefObject<HTMLElement>) {
  const [items, setItems] = useState<TocItem[]>([]);
  const builtRef = useRef(false);

  useEffect(() => {
    if (builtRef.current || !contentRef.current) return;
    const container = contentRef.current;
    const headings = container.querySelectorAll('h2, h3');

    if (headings.length < 2) return;

    const tocItems: TocItem[] = Array.from(headings).map((el, i) => {
      if (!el.id) {
        const slug = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || `heading-${i}`;
        el.id = slug;
      }
      return {
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      };
    });

    builtRef.current = true;
    setItems(tocItems);
  }, [contentRef]);

  return items;
}

function useActiveHeading(itemIds: string[]) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (itemIds.length === 0) return;

    const headings = itemIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [itemIds]);

  return activeId;
}

function TocNav({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav aria-label="Table of contents">
      <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
        On this page
      </h4>
      <div
        className={`flex flex-col border-l border-gray-200 ${
          items.length > 12 ? 'max-h-[70vh] overflow-y-auto pr-1' : ''
        }`}
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`toc-link text-left ${item.level === 3 ? 'toc-link-h3' : ''} ${
              activeId === item.id ? 'toc-link-active' : ''
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>
    </nav>
  );
}

function useNavigate(activeId: string) {
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  return useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  }, []);
}

/* ─── Mobile: collapsible section ──────────────────────────────────────── */

export function MobileTableOfContents({ contentRef }: { contentRef: React.RefObject<HTMLElement> }) {
  const items = useTocItems(contentRef);
  const activeId = useActiveHeading(items.map((i) => i.id));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(activeId);

  if (items.length < 2) return null;

  return (
    <div className="xl:hidden px-6 pb-6">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:bg-gray-50"
          aria-expanded={open}
          aria-controls="toc-mobile-panel"
        >
          <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
            On this page
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && (
          <div
            id="toc-mobile-panel"
            className="mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <TocNav items={items} activeId={activeId} onNavigate={navigate} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Desktop: sticky sidebar ──────────────────────────────────────────── */

export function DesktopTableOfContents({ contentRef }: { contentRef: React.RefObject<HTMLElement> }) {
  const items = useTocItems(contentRef);
  const activeId = useActiveHeading(items.map((i) => i.id));
  const navigate = useNavigate(activeId);

  if (items.length < 2) return null;

  return (
    <div className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-[100px]">
        <TocNav items={items} activeId={activeId} onNavigate={navigate} />
      </div>
    </div>
  );
}
