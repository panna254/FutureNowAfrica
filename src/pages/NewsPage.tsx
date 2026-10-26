import { useState } from 'react';
import { NewsCard } from '@/components/NewsCard';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { newsItems, type NewsItem } from '@/data/news';

const categories: Array<'All' | NewsItem['category']> = [
  'All',
  'Resource',
  'Update',
  'Story',
];

export function NewsPage() {
  const [filter, setFilter] = useState<'All' | NewsItem['category']>('All');
  const visible =
    filter === 'All'
      ? newsItems
      : newsItems.filter((n) => n.category === filter);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-forest-900 text-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="type-label text-leaf-300 mb-3">
            News &amp; Resources
          </p>
          <h1 className="text-page text-cream max-w-3xl">
            Learn, read and stay connected
          </h1>
          <p className="mt-5 text-lead text-cream/85 max-w-2xl">
            Environmental education resources, climate primers, project updates
            and community stories — all in one place.
          </p>
        </div>
      </section>

      {/* Demo notice */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="rounded-xl bg-earth-50 border border-earth-200 px-5 py-4 text-body text-earth-800">
          <strong className="font-semibold">Demo content:</strong> All items
          below are placeholders for layout only and are not real articles or
          project updates. They will be replaced with approved content before
          launch, or connected to a CMS if approved.
        </div>
      </div>

      {/* Filter + grid */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 type-action transition-colors ${
                filter === c
                  ? 'bg-forest-800 text-cream'
                  : 'bg-forest-50 text-forest-700 hover:bg-forest-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {visible.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-body text-forest-700/80 py-12 text-center">
            No items in this category yet.
          </p>
        )}
      </section>

      {/* Resources band */}
      <section className="bg-forest-50/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SectionHeading
            eyebrow="For communities &amp; schools"
            title="Resource library — coming soon"
            description="Downloadable environmental education materials, climate primers and activity guides will be available here once approved. Resources will be labelled clearly and never presented as real unless verified."
          />
        </div>
      </section>

      <CtaBand
        title="Have a resource to share?"
        description="If you have educational materials or a story to contribute, we would love to hear from you."
        primary={{ to: '/contact', label: 'Contact Us' }}
        secondary={{ to: '/get-involved', label: 'Get Involved' }}
      />
    </>
  );
}
