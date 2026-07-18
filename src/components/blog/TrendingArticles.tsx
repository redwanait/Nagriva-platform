import { Clock, TrendingUp, ArrowRight } from 'lucide-react';
import type { Article } from '../../lib/types/article';

function getCoverImage(article: Article): string {
  return article.cover_image || article.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80';
}

function getReadingTime(article: Article): string {
  return article.reading_time || (article.read_time ? `${article.read_time} min read` : '5 min read');
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

export default function TrendingArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-blue/[0.06]">
          <TrendingUp className="h-4.5 w-4.5 text-royal-blue" />
        </div>
        <h3 className="text-base font-semibold text-deep-black">Trending Now</h3>
      </div>

      <div className="grid gap-2.5">
        {articles.map((article) => (
          <a
            key={article.id}
            href={`#/blog/${article.slug}`}
            className="group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 hover:bg-gray-50"
          >
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={getCoverImage(article)}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <div className="flex-1 min-w-0">
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${categoryColor(article.category)}`}>
                {article.category}
              </span>
              <h4 className="text-sm font-medium text-deep-black mt-1 line-clamp-1 group-hover:text-royal-blue transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-gray-400">
                <Clock className="h-3 w-3" />
                {getReadingTime(article)}
              </div>
            </div>

            <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-royal-blue transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
