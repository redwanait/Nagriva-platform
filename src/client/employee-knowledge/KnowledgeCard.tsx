import { useState, useRef, useEffect } from 'react';
import { FileText, Download, Eye, Trash2, MoreVertical, Clock, HardDrive } from 'lucide-react';
import type { KnowledgeItem } from './types';

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatFileSize(bytes: number | null): string {
  if (bytes == null || bytes === 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
}

function getFileExt(name: string): string {
  return name.split('.').pop()?.toUpperCase() || 'FILE';
}

function getExtColor(ext: string): string {
  switch (ext) {
    case 'PDF': return 'bg-red-50 text-red-600 border-red-100';
    case 'DOCX':
    case 'DOC': return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'TXT': return 'bg-gray-100 text-gray-600 border-gray-200';
    default: return 'bg-gray-100 text-gray-500 border-gray-200';
  }
}

function getStatusStyle(status: string): string {
  switch (status) {
    case 'processed':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'processing':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'failed':
      return 'bg-red-50 text-red-700 border border-red-100';
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200';
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'processed': return 'Processed';
    case 'processing': return 'Processing';
    case 'failed': return 'Failed';
    default: return status;
  }
}

/* ── Dropdown Menu ── */

function CardDropdown({
  onView,
  onDownload,
  onDelete,
}: {
  onView: () => void;
  onDownload: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50">
          <button
            onClick={() => { onView(); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-deep-black transition-colors"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => { onDownload(); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-deep-black transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <div className="mx-3 my-1 border-t border-gray-100" />
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Knowledge Card ── */

interface KnowledgeCardProps {
  item: KnowledgeItem;
  onView: (item: KnowledgeItem) => void;
  onDelete: (item: KnowledgeItem) => void;
}

export default function KnowledgeCard({ item, onView, onDelete }: KnowledgeCardProps) {
  const ext = getFileExt(item.name);
  const extColor = getExtColor(ext);

  function handleDownload() {
    if (item.file_url) {
      const a = document.createElement('a');
      a.href = item.file_url;
      a.download = item.name;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  return (
    <div
      onClick={() => onView(item)}
      className="group relative bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 cursor-pointer"
    >
      {/* Top row: icon + name + menu */}
      <div className="flex items-start gap-4 mb-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl flex-shrink-0 text-blue-500 bg-blue-50 transition-transform duration-300 group-hover:scale-105">
          <FileText className="w-7 h-7" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h4 className="text-[15px] font-semibold text-deep-black truncate leading-snug">{item.name}</h4>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${extColor}`}>
              {ext}
            </span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold ${getStatusStyle(item.status)}`}>
              {getStatusLabel(item.status)}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
          <CardDropdown
            onView={() => onView(item)}
            onDownload={handleDownload}
            onDelete={() => onDelete(item)}
          />
        </div>
      </div>

      {/* Bottom row: metadata */}
      <div className="flex items-center gap-5 text-gray-400 pl-[72px]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{formatDate(item.created_at)}</span>
        </div>
        {item.file_size != null && (
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{formatFileSize(item.file_size)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { formatFileSize };
