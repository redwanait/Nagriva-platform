function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export function FeaturedSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-0">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
          <SkeletonBlock className="absolute inset-0 rounded-none" />
        </div>
        <div className="p-8 lg:p-10 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-6 w-20 rounded-full" />
            <SkeletonBlock className="h-4 w-24" />
          </div>
          <SkeletonBlock className="h-8 w-3/4" />
          <SkeletonBlock className="h-8 w-1/2" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-2/3" />
          <div className="flex items-center gap-3 mt-2">
            <SkeletonBlock className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-3 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <SkeletonBlock className="aspect-[16/10] rounded-none" />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-4 w-24" />
        </div>
        <SkeletonBlock className="h-6 w-3/4" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-2/3" />
        <div className="flex items-center gap-2.5 mt-1">
          <SkeletonBlock className="h-8 w-8 rounded-full" />
          <SkeletonBlock className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export function ArticleGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TrendingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100">
          <SkeletonBlock className="h-16 w-16 rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <SkeletonBlock className="h-3 w-16 rounded-full" />
            <SkeletonBlock className="h-4 w-3/4" />
            <SkeletonBlock className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecentPostsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <SkeletonBlock className="aspect-[16/9] rounded-none" />
          <div className="p-5 flex flex-col gap-2">
            <SkeletonBlock className="h-3 w-16 rounded-full" />
            <SkeletonBlock className="h-5 w-3/4" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArticleHeroSkeleton() {
  return (
    <div className="pt-32 pb-8 md:pt-40 md:pb-12 px-6">
      <div className="mx-auto max-w-4xl">
        <SkeletonBlock className="h-6 w-24 rounded-full mx-auto mb-6" />
        <SkeletonBlock className="h-10 w-3/4 mx-auto mb-4" />
        <SkeletonBlock className="h-10 w-1/2 mx-auto mb-6" />
        <div className="flex items-center justify-center gap-4">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function ArticleContentSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-16">
      <SkeletonBlock className="aspect-[16/9] w-full rounded-2xl mb-10" />
      <div className="flex flex-col gap-4">
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-3/4" />
        <SkeletonBlock className="h-8 w-1/3 mt-6" />
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-5/6" />
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-2/3" />
      </div>
    </div>
  );
}
