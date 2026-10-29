import { useState } from 'react';
import { ImageOff, Maximize2 } from 'lucide-react';
import { CtaBand } from '@/components/CtaBand';
import { ImageLightbox } from '@/components/ImageLightbox';
import { Link } from '@/router';
import {
  galleryCategories,
  galleryItems,
  type GalleryFilter,
  type GalleryItem,
} from '@/data/gallery';

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-forest-800/10 bg-white/55 shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        disabled={imageError}
        onClick={() => onOpen(item)}
        className="group block w-full text-left disabled:cursor-not-allowed"
        aria-label={imageError ? `${item.title} image unavailable` : `Open ${item.title} image`}
      >
        <div className="relative aspect-4/3 overflow-hidden bg-forest-100">
          {imageError ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-5 text-center text-forest-700/75">
              <ImageOff className="h-8 w-8" aria-hidden="true" />
              <span className="text-sm">Image unavailable</span>
            </div>
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              width="940"
              height="650"
              loading={index < 3 ? 'eager' : 'lazy'}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              onError={() => setImageError(true)}
            />
          )}
          {!imageError && (
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-forest-950/80 px-3 py-2 text-xs font-semibold text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
              View image
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          )}
        </div>
      </button>

      <div className="p-5">
        <p className="type-meta text-leaf-700">{item.category}</p>
        <h2 className="mt-2 text-card text-forest-900">{item.title}</h2>
        <p className="mt-2 text-caption text-forest-700/75">{item.caption}</p>
        <p className="mt-3 text-xs leading-5 text-forest-700/60">{item.credit}</p>
      </div>
    </article>
  );
}

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('All Projects');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visibleItems =
    activeFilter === 'All Projects'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);
  const selectedIndex = visibleItems.findIndex((item) => item.id === selectedId);
  const selectedItem = selectedIndex >= 0 ? visibleItems[selectedIndex] : null;

  const selectFilter = (filter: GalleryFilter) => {
    setActiveFilter(filter);
    setSelectedId(null);
  };

  const openLightbox = (item: GalleryItem) => {
    setSelectedId(item.id);
  };

  return (
    <>
      <section className="bg-forest-900 pb-16 pt-28 text-cream">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-cream/65" aria-label="Breadcrumb">
            <Link to="/" className="rounded-sm transition-colors hover:text-cream focus-visible:text-cream">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-cream/90">
              Gallery
            </span>
          </nav>

          <div className="mt-9 max-w-3xl">
            <p className="type-label mb-3 text-leaf-300">Our Work in Action</p>
            <h1 className="text-page text-cream">Our Project Gallery</h1>
            <p className="mt-5 max-w-2xl text-lead text-cream/85">
              Explore the environmental activities, community initiatives, and practical action that support FutureNow Africa&apos;s vision of a sustainable and resilient future.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-forest-800/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="type-label text-leaf-700">Browse the visual library</p>
            <p className="mt-2 text-body text-forest-700/75">
              {visibleItems.length} of {galleryItems.length} images shown
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
            {galleryCategories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectFilter(category)}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-forest-800 bg-forest-800 text-cream shadow-sm'
                      : 'border-forest-800/20 bg-white/50 text-forest-800 hover:border-forest-600 hover:bg-forest-100'
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-earth-300/50 bg-earth-50/80 p-5 text-forest-800 sm:p-6">
          <p className="font-semibold">Image library note</p>
          <p className="mt-1 text-caption text-forest-700/80">
            The current gallery uses licensed Pexels stock imagery as clearly marked temporary placeholders. It does not depict verified FutureNow Africa projects; approved project photographs can replace these records without changing the gallery structure.
          </p>
        </div>

        {visibleItems.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} onOpen={openLightbox} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-forest-800/10 bg-white/55 px-6 py-16 text-center">
            <h2 className="text-section text-forest-900">No images in this category yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-body text-forest-700/75">
              Choose another category to continue exploring the available image library.
            </p>
          </div>
        )}
      </section>

      <CtaBand
        title="Be Part of the Change"
        description="Learn how you can support environmental education, conservation, and community-led climate action."
        primary={{ to: '/programs', label: 'Explore Our Programs' }}
        secondary={{ to: '/get-involved', label: 'Get Involved' }}
      />

      <ImageLightbox
        open={selectedItem !== null}
        item={selectedItem}
        index={Math.max(selectedIndex, 0)}
        total={visibleItems.length}
        onClose={() => setSelectedId(null)}
        onPrevious={() => {
          if (selectedIndex > 0) setSelectedId(visibleItems[selectedIndex - 1].id);
        }}
        onNext={() => {
          if (selectedIndex >= 0 && selectedIndex < visibleItems.length - 1) {
            setSelectedId(visibleItems[selectedIndex + 1].id);
          }
        }}
      />
    </>
  );
}
