import { Search } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Open' },
  { value: 'resolved', label: 'Closed' },
] as const;

interface ConversationFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export default function ConversationFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ConversationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      <div className="relative flex-1 max-w-xs w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, email, phone, or message..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-deep-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all"
        />
      </div>
      <div className="flex items-center gap-1.5 p-0.5 bg-gray-100 rounded-lg">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onStatusFilterChange(opt.value)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              statusFilter === opt.value
                ? 'bg-white text-deep-black shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-deep-black'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
