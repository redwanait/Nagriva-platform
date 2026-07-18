import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Plus,
  FileText,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Copy,
  Star,
  ArrowUpDown,
  X,
  Eye,
  Calendar,
  Pencil,
  RotateCcw,
  Check,
} from 'lucide-react';
import {
  useAdminArticles,
  type ArticleFilter,
  type ArticleSort,
} from '../hooks/useAdminArticles';
import type { Article } from '../lib/types/article';

/* ── Helpers ───────────────────────────────────────────────────────────── */

function getStatusClasses(status: string) {
  switch (status) {
    case 'published':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'draft':
      return 'bg-orange-50 text-orange-600 border border-orange-100';
    case 'archived':
      return 'bg-gray-50 text-gray-500 border border-gray-200';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getArticleCover(a: Article): string {
  return a.cover_image || a.image_url || '';
}

function getAuthorDisplay(a: Article): string {
  return a.author_name || a.author || '—';
}

function getAuthorInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function getSupabaseEditUrl(id: string): string {
  const url = import.meta.env.VITE_SUPABASE_URL || '';
  const projectRef = url.replace('https://', '').replace('.supabase.co', '');
  return `https://supabase.com/dashboard/project/${projectRef}/editor/public/articles?filter=id%3Aeq.${id}`;
}

function getArticlePublicUrl(slug: string): string {
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  return `${base}/#/blog/${slug}`;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-royal-blue/10 text-royal-blue rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ── Animated Counter ──────────────────────────────────────────────────── */

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (diff === 0) return;

    const duration = 500;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

/* ── Loading Skeleton ──────────────────────────────────────────────────── */

function LoadingSkeleton() {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Blog</h1>
          <p className="text-[15px] text-gray-500">Create and manage your blog posts and content.</p>
        </div>
        <div className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse" />
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="dash-stat-card">
            <div className="h-7 w-12 bg-gray-100 rounded animate-pulse mb-1" />
            <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
          <div className="h-9 w-64 bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-14 w-14 bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
                <div className="space-y-2">
                  <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ── Empty State ───────────────────────────────────────────────────────── */

function EmptyState() {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Blog</h1>
          <p className="text-[15px] text-gray-500">Create and manage your blog posts and content.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Post</span>
        </button>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Total Posts', value: '0' },
          { label: 'Published', value: '0' },
          { label: 'Drafts', value: '0' },
        ].map((stat) => (
          <div key={stat.label} className="dash-stat-card">
            <div className="text-2xl font-bold text-deep-black tracking-tight">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Plus className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">No posts yet</h3>
        <p className="text-sm text-gray-500 mb-4">Create your first blog post to get started.</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>
    </>
  );
}

/* ── Error State ───────────────────────────────────────────────────────── */

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <>
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Blog</h1>
          <p className="text-[15px] text-gray-500">Create and manage your blog posts and content.</p>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1">Failed to load posts</h3>
        <p className="text-sm text-gray-500 mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors"
        >
          Retry
        </button>
      </div>
    </>
  );
}

/* ── Delete Confirmation Modal ─────────────────────────────────────────── */

function DeleteModal({
  article,
  onConfirm,
  onCancel,
  deleting,
}: {
  article: Article;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-deep-black">Delete Article?</h3>
          <button
            onClick={onCancel}
            disabled={deleting}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone. The article <span className="font-medium text-deep-black">"{article.title}"</span> will be permanently removed.
        </p>
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
          >
            {deleting ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Edit Article Modal ────────────────────────────────────────────────── */

function EditModal({
  article,
  onSave,
  onCancel,
  saving,
}: {
  article: Article;
  onSave: (updates: Partial<Article>) => Promise<boolean>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    title: article.title || '',
    slug: article.slug || '',
    excerpt: article.excerpt || '',
    cover_image: article.cover_image || article.image_url || '',
    category: article.category || '',
    author_name: article.author_name || article.author || '',
    reading_time: article.reading_time || '',
    featured: article.featured,
    status: article.status || 'draft',
    seo_title: article.seo_title || '',
    seo_description: article.seo_description || '',
    seo_keywords: Array.isArray(article.seo_keywords) ? article.seo_keywords.join(', ') : (article.seo_keywords || ''),
    content: article.content || '',
  });

  const set = (key: string, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async () => {
    const keywords = form.seo_keywords
      ? form.seo_keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : null;

    const ok = await onSave({
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      cover_image: form.cover_image,
      category: form.category,
      author_name: form.author_name,
      reading_time: form.reading_time,
      featured: form.featured,
      status: form.status,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      seo_keywords: keywords,
      content: form.content,
    });

    if (ok) onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[5vh] overflow-y-auto">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-deep-black">Edit Article</h3>
          <button
            onClick={onCancel}
            disabled={saving}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-4">
          {/* Title */}
          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="dash-input"
              placeholder="Article title"
            />
          </Field>

          {/* Slug + Category row */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug">
              <input
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                className="dash-input"
                placeholder="article-slug"
              />
            </Field>
            <Field label="Category">
              <input
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="dash-input"
                placeholder="AI, Product, etc."
              />
            </Field>
          </div>

          {/* Excerpt */}
          <Field label="Excerpt">
            <textarea
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              rows={2}
              className="dash-input resize-none"
              placeholder="Short description..."
            />
          </Field>

          {/* Cover Image + Reading Time row */}
          <div className="grid grid-cols-[1fr_140px] gap-4">
            <Field label="Cover Image URL">
              <input
                value={form.cover_image}
                onChange={(e) => set('cover_image', e.target.value)}
                className="dash-input"
                placeholder="https://..."
              />
            </Field>
            <Field label="Reading Time">
              <input
                value={form.reading_time}
                onChange={(e) => set('reading_time', e.target.value)}
                className="dash-input"
                placeholder="8 min read"
              />
            </Field>
          </div>

          {/* Author + Status + Featured row */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Author">
              <input
                value={form.author_name}
                onChange={(e) => set('author_name', e.target.value)}
                className="dash-input"
                placeholder="Author name"
              />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className="dash-input cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <Field label="Featured">
              <button
                type="button"
                onClick={() => set('featured', !form.featured)}
                className={`mt-1.5 inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 w-full justify-center ${
                  form.featured
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Star className={`w-4 h-4 ${form.featured ? 'fill-amber-400' : ''}`} />
                {form.featured ? 'Featured' : 'Not Featured'}
              </button>
            </Field>
          </div>

          {/* SEO Section */}
          <div className="pt-2 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">SEO</h4>
            <div className="space-y-4">
              <Field label="SEO Title">
                <input
                  value={form.seo_title}
                  onChange={(e) => set('seo_title', e.target.value)}
                  className="dash-input"
                  placeholder="Fallback to article title"
                />
              </Field>
              <Field label="SEO Description">
                <textarea
                  value={form.seo_description}
                  onChange={(e) => set('seo_description', e.target.value)}
                  rows={2}
                  className="dash-input resize-none"
                  placeholder="Fallback to excerpt"
                />
              </Field>
              <Field label="SEO Keywords (comma separated)">
                <input
                  value={form.seo_keywords}
                  onChange={(e) => set('seo_keywords', e.target.value)}
                  className="dash-input"
                  placeholder="AI, automation, productivity"
                />
              </Field>
            </div>
          </div>

          {/* Content */}
          <Field label="Article Content (HTML)">
            <textarea
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              rows={10}
              className="dash-input resize-y font-mono text-xs leading-relaxed"
              placeholder="<p>Your article HTML content...</p>"
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !form.title.trim()}
            className="px-5 py-2 text-sm font-medium text-white bg-royal-blue rounded-lg hover:bg-royal-blue-dark transition-colors disabled:opacity-50 inline-flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Small form field wrapper ──────────────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

/* ── Toast ─────────────────────────────────────────────────────────────── */

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl shadow-xl">
        <span>{message}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ── Dropdown Menu ─────────────────────────────────────────────────────── */

function RowMenu({
  article,
  onEdit,
  onDelete,
  onDuplicate,
  onCopyUrl,
  onToggleFeatured,
}: {
  article: Article;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onCopyUrl: () => void;
  onToggleFeatured: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const doAction = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="p-1.5 rounded-lg text-gray-400 hover:text-royal-blue hover:bg-blue-50 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-40 py-1">
          <MenuItem icon={<Pencil className="w-4 h-4" />} label="Edit Article" onClick={() => doAction(onEdit)} />
          <MenuItem
            icon={article.featured ? <RotateCcw className="w-4 h-4" /> : <Star className="w-4 h-4" />}
            label={article.featured ? 'Unfeature' : 'Toggle Featured'}
            onClick={() => doAction(onToggleFeatured)}
          />
          <MenuItem icon={<ExternalLink className="w-4 h-4" />} label="Open Article" onClick={() => doAction(onCopyUrl)} external href={`#/blog/${article.slug}`} />
          <MenuItem icon={<Copy className="w-4 h-4" />} label="Copy Article URL" onClick={() => doAction(onCopyUrl)} />
          <MenuItem icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>} label="Duplicate Article" onClick={() => doAction(onDuplicate)} />
          <div className="my-1 border-t border-gray-100" />
          <MenuItem icon={<Trash2 className="w-4 h-4" />} label="Delete" onClick={() => doAction(onDelete)} danger />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
  external,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
  external?: boolean;
  href?: string;
}) {
  const classes = `flex items-center gap-2.5 px-3 py-2 text-sm transition-colors w-full text-left ${
    danger
      ? 'text-red-600 hover:bg-red-50'
      : 'text-gray-600 hover:bg-gray-50 hover:text-deep-black'
  }`;

  if (external && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {icon}
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {icon}
      {label}
    </button>
  );
}

/* ── Main Component ────────────────────────────────────────────────────── */

const FILTER_OPTIONS: { value: ArticleFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
  { value: 'featured', label: 'Featured' },
];

const SORT_OPTIONS: { value: ArticleSort; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'most_read', label: 'Most Read' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

export default function Blog() {
  const {
    articles,
    loading,
    error,
    stats,
    page,
    totalPages,
    search,
    filter,
    sort,
    handleSearch,
    handleFilter,
    handleSort,
    handlePage,
    updateArticle,
    toggleFeatured,
    deleteArticle,
    duplicateArticle,
    refetch,
  } = useAdminArticles();

  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editTarget, setEditTarget] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((msg: string) => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const handleCopyUrl = useCallback((slug: string) => {
    const url = getArticlePublicUrl(slug);
    navigator.clipboard.writeText(url).then(() => showToast('URL copied to clipboard'));
  }, [showToast]);

  const handleDuplicate = useCallback(async (article: Article) => {
    const ok = await duplicateArticle(article);
    if (ok) showToast('Article duplicated as draft');
  }, [duplicateArticle, showToast]);

  const handleToggleFeatured = useCallback(async (article: Article) => {
    const ok = await toggleFeatured(article);
    if (ok) showToast(article.featured ? 'Removed from featured' : 'Marked as featured');
  }, [toggleFeatured, showToast]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteArticle(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    if (ok) showToast('Article deleted');
  }, [deleteTarget, deleteArticle, showToast]);

  const handleSaveEdit = useCallback(async (updates: Partial<Article>): Promise<boolean> => {
    if (!editTarget) return false;
    setSaving(true);
    const ok = await updateArticle(editTarget.id, updates);
    setSaving(false);
    if (ok) showToast('Article updated');
    return ok;
  }, [editTarget, updateArticle, showToast]);

  if (loading && articles.length === 0) return <LoadingSkeleton />;
  if (error && articles.length === 0) return <ErrorState message={error} onRetry={refetch} />;

  const hasNoData = !loading && articles.length === 0 && !search && filter === 'all';

  return (
    <>
      {/* ── Header ── */}
      <section className="flex items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">Blog</h1>
          <p className="text-[15px] text-gray-500">Create and manage your blog posts and content.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue-dark transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Post</span>
        </button>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Total Posts', value: stats.total },
          { label: 'Published', value: stats.published },
          { label: 'Drafts', value: stats.drafts },
        ].map((stat) => (
          <div key={stat.label} className="dash-stat-card">
            <div className="text-2xl font-bold text-deep-black tracking-tight">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </section>

      {hasNoData ? (
        <EmptyState />
      ) : (
        /* ── Table ── */
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* ── Toolbar ── */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleFilter(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      filter === opt.value
                        ? 'bg-royal-blue text-white shadow-sm shadow-royal-blue/20'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-deep-black'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Sort */}
                <div className="relative">
                  <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <select
                    value={sort}
                    onChange={(e) => handleSort(e.target.value as ArticleSort)}
                    className="appearance-none pl-8 pr-8 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg text-gray-600 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Search */}
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search title, slug, category..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full sm:w-56 pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Rows ── */}
          {loading && articles.length === 0 ? (
            <div className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between px-6 py-5">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="h-14 w-14 bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
                    <div className="space-y-2">
                      <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-sm font-semibold text-deep-black mb-1">No articles found</h3>
              <p className="text-xs text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setEditTarget(article)}
                  className="flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-150 hover:bg-gray-50/80 group/row"
                >
                  {/* Left: Cover + Info */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {getArticleCover(article) ? (
                      <img
                        src={getArticleCover(article)}
                        alt=""
                        className="h-14 w-14 rounded-xl object-cover flex-shrink-0 border border-gray-100 group-hover/row:shadow-sm transition-shadow"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 group-hover/row:bg-gray-100 transition-colors">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[15px] font-semibold text-deep-black truncate max-w-lg group-hover/row:text-royal-blue transition-colors">
                          {highlightMatch(article.title, search)}
                        </span>
                        {article.featured && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded text-[10px] font-semibold flex-shrink-0">
                            <Star className="w-2.5 h-2.5 fill-amber-400" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Category badge */}
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-[11px] font-medium text-gray-600">
                          {highlightMatch(article.category, search)}
                        </span>

                        {/* Author */}
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-royal-blue/[0.08] text-[9px] font-bold text-royal-blue">
                            {getAuthorInitials(getAuthorDisplay(article))}
                          </span>
                          {getAuthorDisplay(article)}
                        </span>

                        <span className="text-gray-300">&middot;</span>

                        {/* Date */}
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.published_at || article.created_at)}
                        </span>

                        <span className="text-gray-300">&middot;</span>

                        {/* Read count */}
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                          <Eye className="w-3 h-3" />
                          {article.read_count.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status + Menu */}
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4" onClick={(e) => e.stopPropagation()}>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${getStatusClasses(article.status)}`}>
                      {article.status}
                    </span>

                    <RowMenu
                      article={article}
                      onEdit={() => setEditTarget(article)}
                      onDelete={() => setDeleteTarget(article)}
                      onDuplicate={() => handleDuplicate(article)}
                      onCopyUrl={() => handleCopyUrl(article.slug)}
                      onToggleFeatured={() => handleToggleFeatured(article)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePage(page - 1)}
                  disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all duration-200 hover:border-gray-300 hover:text-deep-black disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (page <= 4) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = page - 3 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePage(pageNum)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 ${
                        page === pageNum
                          ? 'bg-royal-blue text-white shadow-sm shadow-royal-blue/20'
                          : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-deep-black'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePage(page + 1)}
                  disabled={page === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all duration-200 hover:border-gray-300 hover:text-deep-black disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <DeleteModal
          article={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          deleting={deleting}
        />
      )}

      {/* ── Edit Modal ── */}
      {editTarget && (
        <EditModal
          article={editTarget}
          onSave={handleSaveEdit}
          onCancel={() => setEditTarget(null)}
          saving={saving}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
