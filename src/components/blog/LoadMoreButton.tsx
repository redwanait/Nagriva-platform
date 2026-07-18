import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3 text-sm font-medium text-deep-black transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_4px_20px_-4px_rgba(30,64,175,0.12)] hover:text-royal-blue disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Load More Articles'
        )}
      </button>
    </div>
  );
}
