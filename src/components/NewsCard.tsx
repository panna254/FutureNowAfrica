import { ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/data/news';
import { Link } from '@/router';

const categoryColors: Record<NewsItem['category'], string> = {
  Resource: 'bg-leaf-100 text-leaf-700',
  Update: 'bg-earth-100 text-earth-700',
  Story: 'bg-forest-100 text-forest-700',
};

export function NewsCard({ item }: { item: NewsItem }) {
  const dateLabel = new Date(item.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-forest-100 shadow-xs hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`rounded-full text-xs font-semibold px-3 py-1 ${categoryColors[item.category]}`}
          >
            {item.category}
          </span>
          {item.isDemo && (
            <span className="rounded-full bg-earth-500/10 text-earth-700 text-xs font-semibold px-3 py-1">
              Demo
            </span>
          )}
        </div>
        <h3 className="text-lg text-forest-900 group-hover:text-leaf-700 transition-colors">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-forest-700/80 leading-relaxed flex-1">
          {item.excerpt}
        </p>
        <div className="mt-5 pt-4 border-t border-forest-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-forest-500">
            <time dateTime={item.date}>{dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{item.readTime}</span>
          </div>
          <Link
            to="/news"
            ariaLabel={`Read ${item.title}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-forest-800 hover:text-leaf-700 transition-colors"
          >
            Read
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
