import { useEffect, useState, useRef } from 'react';
import {
  useArticle,
  useArticleNeighbors,
  useRelatedArticles,
} from '../hooks/useArticle';
import { useInView } from '../hooks/useInView';
import { useNewsletter } from '../hooks/useNewsletter';
import { useSEO, SITE_URL, normalizeKeywords } from '../lib/seo';
import ReadingProgressBar from './ReadingProgressBar';
import { MobileTableOfContents, DesktopTableOfContents } from './ArticleTableOfContents';
import Toast from './Toast';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  Mail,
  ArrowUpRight,
  Newspaper,
} from 'lucide-react';
import Footer from './Footer';
import { ArticleHeroSkeleton, ArticleContentSkeleton } from './BlogSkeletons';
import { BlogPostingJsonLd, BreadcrumbJsonLd } from './JsonLd';
import type { Article } from '../lib/types/article';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function RevealBlock({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateShort(dateStr: string) {
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

function getAuthorInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function getSeoTitle(article: Article): string {
  return article.seo_title || article.title;
}

function getSeoDescription(article: Article): string {
  return article.seo_description || article.excerpt;
}

function getSeoImage(article: Article): string {
  return article.og_image || article.cover_image || article.image_url || '';
}

/* ─── SEO ──────────────────────────────────────────────────────────────── */

function useArticleSEO(article: Article | null, _slug: string | null) {
  const seoTitle = article ? getSeoTitle(article) : '';
  const seoDesc = article ? getSeoDescription(article) : '';
  const seoImage = article ? getSeoImage(article) : '';
  const articleUrl = article ? `${SITE_URL}/#/blog/${article.slug}` : '';

  useSEO({
    title: seoTitle,
    description: seoDesc,
    canonical: article?.canonical_url || articleUrl,
    ogImage: seoImage || undefined,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    robots: article ? 'index, follow' : 'noindex',
    keywords: normalizeKeywords(article?.seo_keywords),
    publishedTime: article?.published_at || undefined,
    modifiedTime: article?.updated_at || undefined,
    author: article ? getAuthorName(article) : undefined,
    section: article?.category || undefined,
  });
}

/* ─── Share Buttons (sticky sidebar) ───────────────────────────────────── */

function ShareButtonsBar({ article }: { article: Article }) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = article.title;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Email',
      icon: <Mail className="h-4 w-4" />,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
    },
  ];

  return (
    <div className="flex lg:flex-col items-center gap-2">
      <span className="hidden lg:block text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
        Share
      </span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all duration-200 hover:border-royal-blue/20 hover:text-royal-blue hover:bg-royal-blue/[0.03] hover:shadow-sm"
          title={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

/* ─── Mobile Share Bar ─────────────────────────────────────────────────── */

function MobileShareBar({ article }: { article: Article }) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = article.title;

  return (
    <div className="lg:hidden sticky top-[52px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-center gap-2 py-3 px-6">
        <Share2 className="h-3.5 w-3.5 text-gray-400 mr-1" />
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-royal-blue hover:border-royal-blue/20 transition-colors"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-royal-blue hover:border-royal-blue/20 transition-colors"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-royal-blue hover:border-royal-blue/20 transition-colors"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-royal-blue hover:border-royal-blue/20 transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ─── Article Card (Related / Latest) ──────────────────────────────────── */

function ArticleCardPremium({ article, delay = 0 }: { article: Article; delay?: number }) {
  return (
    <RevealBlock delay={delay}>
      <a
        href={`#/blog/${article.slug}`}
        className="group block h-full rounded-2xl border border-gray-200/80 bg-white overflow-hidden transition-all duration-500 hover:border-royal-blue/20 hover:shadow-[0_20px_60px_-12px_rgba(30,64,175,0.12)]"
      >
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={getCoverImage(article)}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-5 lg:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${categoryColor(article.category)}`}>
              {article.category}
            </span>
            <span className="h-3 w-px bg-gray-200" />
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              {getReadingTime(article)}
            </span>
          </div>

          <h3 className="text-[15px] font-semibold text-deep-black mb-2 line-clamp-2 group-hover:text-royal-blue transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-royal-blue/[0.07] flex items-center justify-center text-[10px] font-bold text-royal-blue tracking-wide">
                {getAuthorInitials(getAuthorName(article))}
              </div>
              <div>
                <span className="text-xs font-medium text-deep-black block leading-tight">{getAuthorName(article)}</span>
                <span className="text-[11px] text-gray-400">{formatDateShort(article.published_at)}</span>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-royal-blue transition-colors" />
          </div>
        </div>
      </a>
    </RevealBlock>
  );
}

/* ─── Prev / Next Cards ────────────────────────────────────────────────── */

function NeighborCard({
  article,
  direction,
}: {
  article: { title: string; slug: string; cover_image?: string; category?: string; reading_time?: string };
  direction: 'prev' | 'next';
}) {
  return (
    <a
      href={`#/blog/${article.slug}`}
      className={`group flex flex-col rounded-2xl border border-gray-200/80 bg-white overflow-hidden transition-all duration-500 hover:border-royal-blue/20 hover:shadow-[0_20px_60px_-12px_rgba(30,64,175,0.12)] ${
        direction === 'next' ? 'md:items-end md:text-right' : ''
      }`}
    >
      {article.cover_image && (
        <div className="w-full aspect-[16/9] overflow-hidden">
          <img
            src={article.cover_image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5 lg:p-6 w-full">
        <div className={`flex items-center gap-2 mb-2.5 ${direction === 'next' ? 'md:justify-end' : ''}`}>
          {direction === 'prev' && <ArrowLeft className="h-3.5 w-3.5 text-royal-blue" />}
          <span className="text-xs font-semibold text-royal-blue uppercase tracking-wider">
            {direction === 'prev' ? 'Previous' : 'Next'}
          </span>
          {direction === 'next' && <ArrowRight className="h-3.5 w-3.5 text-royal-blue" />}
        </div>
        <h4 className="text-base font-semibold text-deep-black group-hover:text-royal-blue transition-colors leading-snug line-clamp-2">
          {article.title}
        </h4>
      </div>
    </a>
  );
}

/* ─── Newsletter CTA ───────────────────────────────────────────────────── */

function NewsletterCTA() {
  const { ref, isInView } = useInView(0.1);
  const { subscribe, loading } = useNewsletter();
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, 'article');
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) setEmail('');
  };

  return (
    <>
    <div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,64,175,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative p-8 md:p-12 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
          Never miss an update
        </h3>
        <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
          Get the latest insights on AI Employees and automation delivered to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white placeholder-gray-500 transition-all duration-300 focus:border-royal-blue-light/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-medium rounded-xl text-sm transition-all duration-200 hover:bg-gray-100 active:scale-[0.98] whitespace-nowrap disabled:opacity-60"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

/* ─── Error / Not Found ────────────────────────────────────────────────── */

function ArticleError({ message }: { message: string }) {
  useSEO({
    title: 'Error Loading Article',
    description: 'An error occurred while loading the article.',
    robots: 'noindex, nofollow',
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-deep-black mb-2">Something went wrong</h1>
        <p className="text-gray-500 mb-6">{message}</p>
        <a href="#/blog" className="btn-primary text-sm gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </a>
      </div>
    </div>
  );
}

function ArticleNotFound() {
  useSEO({
    title: 'Article Not Found',
    description: 'The article you are looking for does not exist or has been removed.',
    robots: 'noindex, nofollow',
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100">
          <Newspaper className="h-8 w-8 text-gray-400" />
        </div>
        <h1 className="text-xl font-semibold text-deep-black mb-2">Article not found</h1>
        <p className="text-gray-500 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <a href="#/blog" className="btn-primary text-sm gap-2">
          <ArrowLeft className="h-4 w-4" />
          Return to Blog
        </a>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function ArticlePage({ slug }: { slug: string }) {
  const { article, loading, error, notFound } = useArticle(slug);
  const { prev, next } = useArticleNeighbors(slug);
  const related = useRelatedArticles(slug, article?.category ?? null);

  const contentRef = useRef<HTMLDivElement>(null);

  useArticleSEO(article, slug);

  if (loading) {
    return (
      <>
        <main>
          <ArticleHeroSkeleton />
          <ArticleContentSkeleton />
        </main>
        <Footer />
      </>
    );
  }

  if (error) return <><ArticleError message={error} /><Footer /></>;
  if (notFound || !article) return <><ArticleNotFound /><Footer /></>;

  return (
    <>
      <ReadingProgressBar targetId="article-body" />

      <BlogPostingJsonLd
        title={getSeoTitle(article)}
        description={getSeoDescription(article)}
        image={getSeoImage(article) || `${SITE_URL}/og-default.png`}
        url={`${SITE_URL}/#/blog/${article.slug}`}
        datePublished={article.published_at}
        dateModified={article.updated_at}
        author={getAuthorName(article)}
        category={article.category}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://nagriva.com/' },
        { name: 'Blog', url: 'https://nagriva.com/#/blog' },
        { name: article.title, url: `${SITE_URL}/#/blog/${article.slug}` },
      ]} />

      {prev && (
        <link rel="prev" href={`${SITE_URL}/#/blog/${prev.slug}`} />
      )}
      {next && (
        <link rel="next" href={`${SITE_URL}/#/blog/${next.slug}`} />
      )}

      {getSeoImage(article) && (
        <link rel="preload" as="image" href={getSeoImage(article)} />
      )}

      <main>
        {/* ── Back to Blog ── */}
        <div className="pt-28 md:pt-32 px-6">
          <div className="mx-auto max-w-6xl">
            <a
              href="#/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-royal-blue transition-colors duration-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blog
            </a>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="pt-8 pb-10 md:pt-12 md:pb-16 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <RevealBlock>
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${categoryColor(article.category)}`}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  {getReadingTime(article)}
                </span>
              </div>
            </RevealBlock>

            <RevealBlock delay={80}>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-deep-black mb-5 tracking-tight leading-[1.15]">
                {article.title}
              </h1>
            </RevealBlock>

            {article.excerpt && (
              <RevealBlock delay={140}>
                <p className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {article.excerpt}
                </p>
              </RevealBlock>
            )}

            <RevealBlock delay={200}>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-royal-blue/[0.08] flex items-center justify-center text-sm font-bold text-royal-blue tracking-wide">
                    {getAuthorInitials(getAuthorName(article))}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-deep-black">{getAuthorName(article)}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.published_at)}
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </section>

        {/* ── Cover Image ── */}
        <RevealBlock>
          <div className="mx-auto max-w-5xl px-6 mb-12 md:mb-16">
            <div className="relative overflow-hidden rounded-2xl aspect-[16/9] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
              <img
                src={getCoverImage(article)}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </RevealBlock>

        {/* ── Mobile Share Bar ── */}
        <MobileShareBar article={article} />

        {/* ── Mobile TOC (collapsible) ── */}
        <MobileTableOfContents contentRef={contentRef} />

        {/* ── Content + Sidebar Layout ── */}
        <section className="px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="relative flex gap-12 lg:gap-16">
              {/* ── Sticky Share Sidebar (Desktop) ── */}
              <div className="hidden lg:block w-16 flex-shrink-0">
                <div className="sticky top-28">
                  <ShareButtonsBar article={article} />
                </div>
              </div>

              {/* ── Article Content ── */}
              <article
                id="article-body"
                ref={contentRef}
                className="article-content max-w-[760px] flex-1 min-w-0"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* ── Sticky TOC Sidebar (Desktop) ── */}
              <DesktopTableOfContents contentRef={contentRef} />
            </div>
          </div>
        </section>

        {/* ── Bottom Share (Mobile) ── */}
        <div className="lg:hidden px-6 mb-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 border-t border-gray-100 pt-8">
              <ShareButtonsBar article={article} />
            </div>
          </div>
        </div>

        {/* ── Prev / Next ── */}
        {(prev || next) && (
          <section className="px-6 pb-12 md:pb-16">
            <div className="mx-auto max-w-4xl">
              <div className="grid md:grid-cols-2 gap-5">
                {prev ? (
                  <RevealBlock>
                    <NeighborCard article={prev} direction="prev" />
                  </RevealBlock>
                ) : <div />}
                {next && (
                  <RevealBlock delay={60}>
                    <NeighborCard article={next} direction="next" />
                  </RevealBlock>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Related Articles ── */}
        {related.length > 0 && (
          <section className="px-6 pb-12 md:pb-16">
            <div className="mx-auto max-w-5xl">
              <RevealBlock>
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-deep-black tracking-tight">
                    Related Articles
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    More articles in {article.category}
                  </p>
                </div>
              </RevealBlock>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((a, i) => (
                  <ArticleCardPremium key={a.id} article={a} delay={i * 60} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Newsletter CTA ── */}
        <section className="px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-2xl">
            <NewsletterCTA />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
