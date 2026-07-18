import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  FileText,
  Upload,
  Search,
  AlertCircle,
  RefreshCw,
  ArrowUpDown,
  Files,
  HardDrive,
} from 'lucide-react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from './types';
import type { KnowledgeItem } from './types';
import { useEmployeeKnowledge } from './useEmployeeKnowledge';
import KnowledgeCard from './KnowledgeCard';
import KnowledgeViewPanel from './KnowledgeViewPanel';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import Toast from '../../components/Toast';

/* ── Skeleton ── */

function KnowledgeCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="h-14 w-14 rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
        <div className="flex-1 pt-0.5">
          <div className="h-5 w-40 rounded bg-gray-100 animate-pulse mb-3" />
          <div className="flex gap-2">
            <div className="h-6 w-12 rounded-lg bg-gray-100 animate-pulse" />
            <div className="h-6 w-16 rounded-lg bg-gray-100 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex gap-5 pl-[72px]">
        <div className="h-3.5 w-24 rounded bg-gray-100 animate-pulse" />
        <div className="h-3.5 w-16 rounded bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}

/* ── Empty State ── */

function EmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-royal-blue/[0.06] mx-auto mb-6">
        <FileText className="w-10 h-10 text-royal-blue" />
      </div>
      <h3 className="text-xl font-bold text-deep-black mb-2">No knowledge added yet.</h3>
      <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
        Upload PDF, DOCX, or TXT files to teach your AI Employee. Drag and drop or click below to get started.
      </p>
      <button
        onClick={onUpload}
        className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
      >
        <Upload className="w-4 h-4" />
        Upload Files
      </button>
    </div>
  );
}

/* ── Sort Options ── */

type SortKey = 'newest' | 'oldest' | 'name';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name', label: 'Name' },
];

/* ── Helpers ── */

function getExtension(name: string): string {
  return name.split('.').pop()?.toLowerCase() || '';
}

function getTotalSize(items: KnowledgeItem[]): number {
  return items.reduce((sum, item) => sum + (item.file_size ?? 0), 0);
}

function formatTotalSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
}

/* ── Extract employeeId from hash URL ── */

function getEmployeeIdFromUrl(): string | null {
  const hash = window.location.hash;
  const match = hash.match(/#\/client-dashboard\/ai-employees\/([^/?#]+)/);
  return match ? match[1] : null;
}

/* ── Main Component ── */

interface KnowledgeTabProps {
  employeeId: string | null;
}

export default function KnowledgeTab({ employeeId: propEmployeeId }: KnowledgeTabProps) {
  const [urlEmployeeId, setUrlEmployeeId] = useState<string | null>(getEmployeeIdFromUrl);

  useEffect(() => {
    function onHashChange() {
      setUrlEmployeeId(getEmployeeIdFromUrl());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const employeeId = propEmployeeId || urlEmployeeId;

  const { items, loading, error, refetch, uploadFile, deleteItem } =
    useEmployeeKnowledge(employeeId);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [viewItem, setViewItem] = useState<KnowledgeItem | null>(null);
  const [deleteItemTarget, setDeleteItemTarget] = useState<KnowledgeItem | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Drag & drop state
  const [dragOver, setDragOver] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.file_type?.toLowerCase().includes(q),
      );
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [items, search, sort]);

  const totalSize = useMemo(() => getTotalSize(items), [items]);

  async function handleDelete() {
    if (!deleteItemTarget) return;
    try {
      await deleteItem(deleteItemTarget.id);
      setToast({ message: 'File deleted successfully.', type: 'success' });
      setDeleteItemTarget(null);
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to delete.',
        type: 'error',
      });
    }
  }

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    if (!employeeId) {
      const msg = 'No employee selected';
      console.error(msg);
      setToast({ message: msg, type: 'error' });
      return;
    }

    const arr = Array.from(files);
    const valid = arr.filter((f) => {
      const ext = getExtension(f.name);
      if (!ALLOWED_FILE_TYPES.includes(ext as typeof ALLOWED_FILE_TYPES[number])) return false;
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) return false;
      return true;
    });

    if (valid.length === 0) {
      setToast({ message: 'No valid files. Accepted: PDF, DOCX, TXT under 50MB.', type: 'error' });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let failCount = 0;
    let lastError = '';

    for (const file of valid) {
      try {
        await uploadFile(file);
        successCount++;
      } catch (err) {
        failCount++;
        lastError = err instanceof Error ? err.message : 'Upload failed';
        console.error("Unexpected error:", err);
      }
    }

    setUploading(false);

    if (successCount > 0 && failCount === 0) {
      setToast({ message: `${successCount} file${successCount > 1 ? 's' : ''} uploaded.`, type: 'success' });
    } else if (successCount > 0 && failCount > 0) {
      setToast({ message: `${successCount} uploaded, ${failCount} failed. ${lastError}`, type: 'error' });
    } else {
      setToast({ message: lastError || 'Upload failed.', type: 'error' });
    }
  }, [uploadFile]);

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.types.includes('Files')) {
      setDragOver((c) => c + 1);
    }
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOver(0);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setDragOver(0);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-7 w-48 rounded-lg bg-gray-100 animate-pulse mb-2" />
            <div className="h-4 w-72 rounded-lg bg-gray-100 animate-pulse" />
          </div>
          <div className="h-11 w-36 rounded-xl bg-gray-100 animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-11 flex-1 rounded-xl bg-gray-100 animate-pulse" />
          <div className="h-11 w-32 rounded-xl bg-gray-100 animate-pulse" />
          <div className="h-11 w-28 rounded-xl bg-gray-100 animate-pulse" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '24px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <KnowledgeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 mb-5">
          <AlertCircle className="w-7 h-7 text-red-500" />
        </div>
        <p className="text-base font-semibold text-deep-black mb-1">Something went wrong</p>
        <p className="text-sm text-gray-500 mb-5">{error}</p>
        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative"
      >
        {/* Drag overlay */}
        {dragOver > 0 && (
          <div
            onClick={openFilePicker}
            className="absolute inset-0 z-40 flex items-center justify-center rounded-2xl border-2 border-dashed border-royal-blue bg-royal-blue/[0.04] cursor-pointer"
          >
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-blue/[0.08] mx-auto mb-4">
                <Upload className="w-8 h-8 text-royal-blue" />
              </div>
              <p className="text-lg font-semibold text-royal-blue">Drop files here</p>
              <p className="text-sm text-royal-blue/60 mt-1.5">PDF, DOCX, TXT — Max {MAX_FILE_SIZE_MB}MB</p>
            </div>
          </div>
        )}

        {/* Upload overlay when uploading */}
        {uploading && (
          <div className="absolute inset-0 z-40 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-sm text-royal-blue font-medium">
              <div className="h-5 w-5 border-2 border-royal-blue border-t-transparent rounded-full animate-spin" />
              Uploading...
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = '';
          }}
        />

        {/* ── Header ── */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-deep-black tracking-tight">Knowledge Base</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Upload files to teach your AI Employee.
            </p>
          </div>
          <button
            onClick={openFilePicker}
            className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-royal-blue/20 flex-shrink-0"
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </button>
        </section>

        {/* ── Content ── */}
        {items.length === 0 ? (
          <EmptyState onUpload={openFilePicker} />
        ) : (
          <>
            {/* ── Toolbar ── */}
            <section className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 p-4 bg-gray-50/80 border border-gray-200 rounded-2xl">
              {/* Stats */}
              <div className="flex items-center gap-5 pr-5 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0">
                <div className="flex items-center gap-2">
                  <Files className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-deep-black">{items.length}</span>
                  <span className="text-xs text-gray-500">file{items.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-deep-black">{formatTotalSize(totalSize)}</span>
                </div>
              </div>

              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search files..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10"
                />
              </div>

              {/* Sort */}
              <div className="relative flex-shrink-0">
                <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="pl-10 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-deep-black outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '16px',
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            {/* ── Cards Grid ── */}
            {filteredItems.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 mx-auto mb-4">
                  <Search className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-base font-semibold text-deep-black mb-1">No results found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your search.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '24px' }}>
                {filteredItems.map((item) => (
                  <KnowledgeCard
                    key={item.id}
                    item={item}
                    onView={setViewItem}
                    onDelete={setDeleteItemTarget}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Panels ── */}
      {viewItem && (
        <KnowledgeViewPanel item={viewItem} onClose={() => setViewItem(null)} />
      )}

      {deleteItemTarget && (
        <ConfirmDeleteDialog
          itemName={deleteItemTarget.name}
          onConfirm={handleDelete}
          onClose={() => setDeleteItemTarget(null)}
        />
      )}
    </>
  );
}
