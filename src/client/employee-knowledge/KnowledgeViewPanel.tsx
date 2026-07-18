import { X, ExternalLink, FileText, Clock } from 'lucide-react';
import type { KnowledgeItem } from './types';

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatFileSize(bytes: number | null): string {
  if (bytes == null || bytes === 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
}

function getStatusBadge(status: string): string {
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

interface KnowledgeViewPanelProps {
  item: KnowledgeItem;
  onClose: () => void;
}

export default function KnowledgeViewPanel({ item, onClose }: KnowledgeViewPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white border-l border-gray-200 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 text-blue-500 bg-blue-50">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-deep-black truncate">{item.name}</h3>
              <p className="text-xs text-gray-500">File</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Status</label>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                {getStatusLabel(item.status)}
              </span>
            </div>

            {/* Created */}
            <div>
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Created</label>
              <div className="flex items-center gap-2 text-sm text-deep-black">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {formatDate(item.created_at)}
              </div>
            </div>

            {/* File Type */}
            {item.file_type && (
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">File Type</label>
                <span className="text-sm text-deep-black uppercase">{item.file_type}</span>
              </div>
            )}

            {/* File Size */}
            {item.file_size != null && (
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">File Size</label>
                <span className="text-sm text-deep-black">{formatFileSize(item.file_size)}</span>
              </div>
            )}

            {/* File URL */}
            {item.file_url && (
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">File URL</label>
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-royal-blue hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open file
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
