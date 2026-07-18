import { useState } from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmDeleteDialogProps {
  itemName: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function ConfirmDeleteDialog({ itemName, onConfirm, onClose }: ConfirmDeleteDialogProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete.');
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-deep-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        <h3 className="text-lg font-bold text-deep-black text-center mb-2">Delete Knowledge</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete <span className="font-semibold text-deep-black">"{itemName}"</span>? This action cannot be undone.
        </p>

        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
