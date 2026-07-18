import { useState, useMemo } from 'react';
import { useInView } from '../hooks/useInView';
import { usePaginatedArticles } from '../hooks/usePaginatedArticles';
import { useTrendingArticles } from '../hooks/useTrendingArticles';
import { useRecentArticles } from '../hooks/useRecentArticles';
import { useArticleCategories } from '../hooks/useArticleCategories';
import { useNewsletter } from '../hooks/useNewsletter';
import { useSEO } from '../lib/seo';
import Toast from './Toast';
import TrendingArticles from './blog/TrendingArticles';
import CategoryFilter from './blog/CategoryFilter';
import RecentPosts from './blog/RecentPosts';
import LoadMoreButton from './blog/LoadMoreButton';
import { OrganizationJsonLd, WebsiteJsonLd, BlogJsonLd, BreadcrumbJsonLd } from './JsonLd';
import {
  Search,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Pen,
} from 'lucide-react';
import Footer from './Footer';
import {
  FeaturedSkeleton,
  ArticleGridSkeleton,
  TrendingSkeleton,
  RecentPostsSkeleton,
} from './BlogSkeletons';
import type { Article } from '../lib/types/article';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function RevealBlock({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function categoryColor(category: string): string {
  const colors: Record<string, string> = {
    AI: 'bg-purple-50 text-purple-700 border-purple-200',
    Automation: 'bg-blue-50 text-blue-700 border-blue-200',
    Business: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Marketing: 'bg-pink-50 text-pink-700 border-pink-200',
    Product: 'bg-royal-blue/[0.06] text-royal-blue border-royal-blue/10',
    Engineering: 'bg-amber-50 text-amber-700 border-amber-200',
    News: 'bg-red-50 text-red-600 border-red-200',
  };
  return colors[category] || 'bg-gray-50 text-gray-600 border-gray-200';
}

function getCoverImage(article: Article): string {
  return article.cover_image || article.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80';
}

function getReadingTime(article: Article): string {
  return article.reading_time || (article.read_time ? `${article.read_time} min read` : '5 min read');
}

function getAuthorName(article: Article): string {
  return article.author_name || article.author || 'Nagriva Team';
}

/* ─── Empty State ──────────────────────────────────────────────────────── */

function EmptyState({ query, category }: { query: string; category: string }) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div ref={ref} className={`text-center py-20 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-deep-black mb-2">No articles found</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        {query
          ? `No results for "${query}". Try a different search term.`
          : category !== 'All'
            ? `No articles in the "${category}" category yet. Try another category.`
            : 'No published articles yet. Check back soon!'}
      </p>
    </div>
  );
}

/* ─── Error State ──────────────────────────────────────────────────────── */

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-20">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
        <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-deep-black mb-2">Something went wrong</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">{message}</p>
      <button onClick={onRetry} className="btn-primary text-sm">
        Try Again
      </button>
    </div>
  );
}

/* ─── Article Card ─────────────────────────────────────────────────────── */

function ArticleCard({ article, delay = 0 }: { article: Article; delay?: number }) {
  return (
    <RevealBlock delay={delay}>
      <a
        href={`#/blog/${article.slug}`}
        className="group block h-full rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)]"
      >
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={getCoverImage(article)}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className={`absolute top-4 left-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${categoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {getReadingTime(article)}
            </span>
            <span className="h-3 w-px bg-gray-200" />
            <span>{formatDate(article.published_at)}</span>
          </div>

          <h3 className="text-lg font-semibold text-deep-black mb-2 line-clamp-2 group-hover:text-royal-blue transition-colors">
            {article.title}
          </h3>

          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-royal-blue/10 flex items-center justify-center text-xs font-semibold text-royal-blue">
                {getAuthorName(article).split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
              <span className="text-sm font-medium text-deep-black">{getAuthorName(article)}</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-royal-blue transition-colors" />
          </div>
        </div>
      </a>
    </RevealBlock>
  );
}

/* ─── Featured Article Card ────────────────────────────────────────────── */

function FeaturedCard({ article }: { article: Article }) {
  return (
    <RevealBlock>
      <a
        href={`#/blog/${article.slug}`}
        className="group block rounded-3xl border border-gray-200 bg-white overflow-hidden transition-all duration-500 hover:border-royal-blue/20 hover:shadow-[0_12px_40px_-8px_rgba(30,64,175,0.12)]"
      >
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0">
          <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
            <img
              src={getCoverImage(article)}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${categoryColor(article.category)}`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                {getReadingTime(article)}
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-deep-black mb-3 leading-tight group-hover:text-royal-blue transition-colors">
              {article.title}
            </h2>

            <p className="text-gray-500 mb-6 line-clamp-3">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-royal-blue/10 flex items-center justify-center text-sm font-semibold text-royal-blue">
                  {getAuthorName(article).split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-deep-black">{getAuthorName(article)}</div>
                  <div className="text-xs text-gray-400">{formatDate(article.published_at)}</div>
                </div>
              </div>
              <span className="btn-primary text-sm px-5 py-2.5 gap-2">
                Read Article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </RevealBlock>
  );
}

/* ─── Sidebar Skeleton ─────────────────────────────────────────────────── */

function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-5 w-28 bg-gray-200 animate-pulse rounded" />
        </div>
        <TrendingSkeleton />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-5 w-28 bg-gray-200 animate-pulse rounded" />
        </div>
        <RecentPostsSkeleton />
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const {
    articles: paginatedArticles,
    loading: paginatedLoading,
    loadingMore,
    error: paginatedError,
    hasMore,
    loadMore,
    refetch: refetchPaginated,
  } = usePaginatedArticles(activeCategory, searchQuery);

  const { articles: trendingArticles, loading: trendingLoading } = useTrendingArticles();
  const { articles: recentArticles, loading: recentLoading } = useRecentArticles();
  const { categories } = useArticleCategories();

  useSEO({
    title: 'Blog - Insights, Tutorials & AI Resources',
    description: 'Discover practical articles about AI Employees, automation, productivity and business growth. Stay updated with the latest insights from Nagriva.',
    canonical: 'https://nagriva.com/#/blog',
    ogType: 'website',
    ogImage: 'https://nagriva.com/og-default.png',
    robots: 'index, follow',
    keywords: ['AI blog', 'AI Employees', 'automation', 'productivity', 'business growth', 'SaaS', 'AI tutorials'],
  });

  const featuredArticle = useMemo(() => {
    const featured = paginatedArticles.find((a) => a.featured);
    return featured || paginatedArticles[0] || null;
  }, [paginatedArticles]);

  const showFeatured =
    activeCategory === 'All' && !searchQuery && featuredArticle && paginatedArticles.length > 0;

  const gridArticles = useMemo(
    () => (showFeatured ? paginatedArticles.filter((a) => a.id !== featuredArticle?.id) : paginatedArticles),
    [paginatedArticles, showFeatured, featuredArticle]
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
  };

  const isFiltered = activeCategory !== 'All' || searchQuery;
  const showSidebar = !isFiltered && !paginatedLoading && !paginatedError && paginatedArticles.length > 0;

  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <BlogJsonLd count={paginatedArticles.length} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://nagriva.com/' },
        { name: 'Blog', url: 'https://nagriva.com/#/blog' },
      ]} />

      <main>
        {/* ── Hero ── */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* ── Content ── */}
        {paginatedLoading ? (
          <section className="section-padding pt-0">
            <div className="container-max">
              <FeaturedSkeleton />
              <div className="mt-10 flex flex-col lg:flex-row gap-10">
                <div className="flex-1 lg:w-[70%]">
                  <div className="flex items-center justify-between mb-10">
                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-8 w-16 bg-gray-200 animate-pulse rounded-full" />
                      ))}
                    </div>
                  </div>
                  <ArticleGridSkeleton />
                </div>
                <div className="lg:w-[30%]">
                  <SidebarSkeleton />
                </div>
              </div>
            </div>
          </section>
        ) : paginatedError ? (
          <section className="section-padding pt-0">
            <div className="container-max">
              <ErrorState message={paginatedError} onRetry={refetchPaginated} />
            </div>
          </section>
        ) : paginatedArticles.length === 0 ? (
          <section className="section-padding pt-0">
            <div className="container-max">
              <EmptyState query={searchQuery} category={activeCategory} />
            </div>
          </section>
        ) : (
          <>
            {/* ── Featured Article (full width) ── */}
            {showFeatured && (
              <section className="section-padding pt-0">
                <div className="container-max">
                  <FeaturedCard article={featuredArticle} />
                </div>
              </section>
            )}

            {/* ── Two-Column Layout ── */}
            <section className="section-padding pt-0 md:pt-0">
              <div className="container-max">
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* ── Main Content ── */}
                  <div className="flex-1 lg:w-[70%] min-w-0">
                    <RevealBlock>
                      <div className="flex flex-col gap-6 mb-10">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <h2 className="heading-md text-deep-black">
                            {activeCategory === 'All' && !searchQuery
                              ? 'Latest Articles'
                              : `${activeCategory === 'All' ? 'All' : activeCategory} Articles`}
                          </h2>
                        </div>
                        <CategoryFilter
                          categories={categories}
                          activeCategory={activeCategory}
                          onSelect={handleCategoryChange}
                        />
                      </div>
                    </RevealBlock>

                    {gridArticles.length > 0 ? (
                      <>
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                          {gridArticles.map((article, i) => (
                            <ArticleCard key={article.id} article={article} delay={i * 60} />
                          ))}
                        </div>

                        {hasMore && (
                          <LoadMoreButton onClick={loadMore} loading={loadingMore} />
                        )}
                      </>
                    ) : (
                      <EmptyState query={searchQuery} category={activeCategory} />
                    )}
                  </div>

                  {/* ── Sidebar ── */}
                  {showSidebar && (
                    <div className="w-full lg:w-[30%]">
                      <div className="lg:sticky lg:top-[100px] space-y-6">
                        {!trendingLoading && trendingArticles.length > 0 && (
                          <TrendingArticles articles={trendingArticles} />
                        )}
                        {!recentLoading && recentArticles.length > 0 && (
                          <RecentPosts articles={recentArticles} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── Write for Nagriva ── */}
        <WriteForNagrivaSection />

        {/* ── Newsletter ── */}
        <NewsletterSection />
      </main>

      <Footer />
    </>
  );
}

/* ─── Sub-Components ───────────────────────────────────────────────────── */

function HeroSection({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
}) {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6 overflow-hidden">
      <div ref={ref} className="relative mx-auto max-w-3xl text-center">
        <div className={`mb-6 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center px-4 py-1.5 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            Blog
          </span>
        </div>

        <div className={`transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="heading-lg text-deep-black mb-4">
            Insights, Tutorials &{' '}
            <span className="text-royal-blue">AI Resources</span>
          </h1>
          <p className="text-body-sm max-w-xl mx-auto mb-8">
            Discover practical articles about AI Employees, automation, productivity and business growth.
          </p>
        </div>

        <div className={`transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-5 text-sm text-deep-black placeholder-gray-400 shadow-sm transition-all duration-300 focus:border-royal-blue/30 focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WriteForNagrivaSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl overflow-visible bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,64,175,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.08),transparent_60%)]" />

            <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/10 rounded-full text-xs font-medium text-white/70 mb-6">
                  <Pen className="h-3.5 w-3.5" />
                  Contribute
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  Write for Nagriva
                </h2>

                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mb-8">
                  Share your expertise in AI, SaaS, startups, productivity, software engineering or business growth with thousands of readers.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                  <a href="#/contributors" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg text-sm transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]">
                    Become a Contributor
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#/contributors" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white font-medium rounded-lg text-sm border border-white/20 transition-all duration-200 hover:bg-white/5 hover:border-white/30 active:scale-[0.98]">
                    Submission Guidelines
                  </a>
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center justify-center lg:justify-end w-full lg:w-[380px] relative lg:mr-[-25px] mt-8 lg:mt-0">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-56 h-56 lg:w-80 lg:h-80 bg-royal-blue/20 rounded-full blur-3xl pointer-events-none" />
                <img
                  src="https://i.ibb.co/3mzBX0RT/Chat-GPT-Image-Jul-17-2026-04-25-28-PM.png"
                  alt="Write for Nagriva illustration"
                  className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[340px] lg:h-[340px] object-contain drop-shadow-[0_0_40px_rgba(30,64,175,0.25)] transition-all duration-300 ease-out hover:scale-105 hover:rotate-[2deg] hover:drop-shadow-[0_0_60px_rgba(30,64,175,0.45)]"
                  style={{ animation: 'nagriva-float 5s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { subscribe, loading } = useNewsletter();
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, 'blog');
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) setEmail('');
  };

  return (
    <section className="section-padding pt-0">
      <div className="container-max">
        <RevealBlock>
          <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-8 md:p-12 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-deep-black mb-2 tracking-tight">
              Never miss a new article.
            </h2>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              Get the latest insights delivered directly to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-deep-black placeholder-gray-400 transition-all duration-300 focus:border-royal-blue/30 focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-6 py-3 text-sm whitespace-nowrap disabled:opacity-60"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </RevealBlock>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}
