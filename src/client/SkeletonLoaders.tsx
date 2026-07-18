export function StatCardSkeleton() {
  return (
    <div className="dash-stat-card">
      <div className="flex items-center justify-between mb-3">
        <div className="h-10 w-10 rounded-lg bg-gray-100 animate-pulse" />
        <div className="h-4 w-12 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="h-7 w-20 rounded bg-gray-100 animate-pulse mb-1" />
      <div className="h-3 w-28 rounded bg-gray-100 animate-pulse" />
    </div>
  );
}

export function AIEmployeeCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-5">
        <div className="h-12 w-12 rounded-xl bg-gray-100 animate-pulse" />
        <div className="flex-1">
          <div className="h-4 w-32 rounded bg-gray-100 animate-pulse mb-2" />
          <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-14 rounded bg-gray-100 animate-pulse" />
        </div>
      </div>
      <div className="mt-5 h-10 w-full rounded-xl bg-gray-100 animate-pulse" />
    </div>
  );
}

export function ConversationRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="h-9 w-9 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-3.5 w-24 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="h-3 w-48 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <div className="h-5 w-16 rounded-full bg-gray-100 animate-pulse" />
        <div className="h-3 w-14 rounded bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}

export function QuickActionSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="h-4 w-24 rounded bg-gray-100 animate-pulse mb-4" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-gray-50 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function IntegrationRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="h-9 w-9 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-3.5 w-32 rounded bg-gray-100 animate-pulse mb-1.5" />
        <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="h-5 w-20 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-3 w-20 rounded bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-3 w-20 rounded bg-gray-100 animate-pulse flex-shrink-0" />
    </div>
  );
}

export function KnowledgeFileRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="h-9 w-9 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-3.5 w-32 rounded bg-gray-100 animate-pulse mb-1.5" />
        <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="h-5 w-16 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-5 w-12 rounded bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-3 w-16 rounded bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-3 w-16 rounded bg-gray-100 animate-pulse flex-shrink-0" />
    </div>
  );
}

export function BillingHistoryRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-3.5">
      <div className="h-4 w-28 rounded bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-4 w-20 rounded bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-4 w-16 rounded bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-5 w-16 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="h-4 w-24 rounded bg-gray-100 animate-pulse flex-1" />
      <div className="h-8 w-8 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
    </div>
  );
}

export function UsageCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="h-4 w-28 rounded bg-gray-100 animate-pulse mb-5" />
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
              <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
