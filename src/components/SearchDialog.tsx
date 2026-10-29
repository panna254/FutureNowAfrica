import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUp, CornerDownLeft, Search, X } from 'lucide-react';
import { Link } from '@/router';
import { programmes } from '@/data/programmes';
import { routes, type RoutePath } from '@/router-state';
import { site } from '@/data/site';

type SearchEntry = {
  id: string;
  title: string;
  description: string;
  path: RoutePath;
  type: 'Page' | 'Programme';
  searchText: string;
};

const pageDescriptions: Record<RoutePath, string> = {
  '/': site.intro,
  '/about': 'Our mission, vision, values and community-led approach.',
  '/programs': 'Environmental education, recycling, farming, water and restoration programmes.',
  '/impact': 'How we measure progress and learn from community-led environmental action.',
  '/gallery': 'Project photographs, environmental activities and community initiatives.',
  '/get-involved': 'Volunteer, participate, partner or learn how to support FutureNow Africa.',
  '/news': 'Environmental education resources, climate primers and project updates.',
  '/contact': 'Contact FutureNow Africa about programmes, partnerships and participation.',
};

const searchEntries: SearchEntry[] = [
  ...routes.map((route) => ({
    id: 'page-' + route.path,
    title: route.label,
    description: pageDescriptions[route.path],
    path: route.path,
    type: 'Page' as const,
    searchText: `${route.label} ${pageDescriptions[route.path]}`.toLowerCase(),
  })),
  ...programmes.map((programme) => ({
    id: 'programme-' + programme.slug,
    title: programme.title,
    description: programme.tagline,
    path: '/programs' as const,
    type: 'Programme' as const,
    searchText: `${programme.title} ${programme.tagline} ${programme.description}`.toLowerCase(),
  })),
];

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];

    return searchEntries.filter((entry) =>
      terms.every((term) => entry.searchText.includes(term)),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => previouslyFocused?.focus());
    };
  }, [onClose, open]);

  useEffect(() => {
    setActiveIndex(0);
    resultRefs.current = [];
  }, [query]);

  if (!open) return null;

  const focusResult = (index: number) => {
    if (results.length === 0) return;
    const nextIndex = (index + results.length) % results.length;
    setActiveIndex(nextIndex);
    window.requestAnimationFrame(() => resultRefs.current[nextIndex]?.focus());
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusResult(activeIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusResult(activeIndex - 1);
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      resultRefs.current[activeIndex]?.click();
    }
  };

  const handleResultKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusResult(index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (index === 0) {
        inputRef.current?.focus();
        setActiveIndex(0);
      } else {
        focusResult(index - 1);
      }
    }
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[70] flex items-start justify-center bg-forest-950/40 p-3 pt-[5.5rem] backdrop-blur-sm sm:p-6 sm:pt-28"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        id="site-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-search-title"
        aria-describedby="site-search-help"
        className="navbar-dropdown w-full max-w-2xl rounded-2xl p-3 sm:p-4"
        onKeyDown={handleDialogKeyDown}
      >
        <div className="flex items-center gap-2 rounded-xl border border-forest-800/10 bg-white/40 px-3">
          <Search className="h-5 w-5 shrink-0 text-forest-600" aria-hidden="true" />
          <h2 id="site-search-title" className="sr-only">
            Search FutureNow Africa
          </h2>
          <p id="site-search-help" className="sr-only">
            Search existing pages and programmes. Use the arrow keys to navigate results.
          </p>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            className="min-h-12 min-w-0 flex-1 bg-transparent text-ui text-forest-950 outline-none placeholder:text-forest-600/70"
            placeholder="Search pages and programmes"
            aria-label="Search pages and programmes"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-forest-800 transition-colors hover:bg-forest-100 active:bg-forest-200 focus-visible:bg-forest-100"
            aria-label="Close search"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          className="mt-3 max-h-[min(60vh,28rem)] overflow-y-auto"
          aria-live="polite"
          aria-atomic="true"
        >
          {query.trim() === '' ? (
            <p className="px-3 py-8 text-center text-caption text-forest-700/80">
              Search the existing pages and programme descriptions.
            </p>
          ) : results.length > 0 ? (
            <ul className="space-y-1" aria-label="Search results">
              {results.map((result, index) => (
                <li key={result.id}>
                  <Link
                    ref={(element) => {
                      resultRefs.current[index] = element;
                    }}
                    to={result.path}
                    onClick={onClose}
                    onKeyDown={(event) => handleResultKeyDown(event, index)}
                    className={`group flex min-h-14 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors focus-visible:bg-forest-100 ${
                      index === activeIndex ? 'bg-forest-100' : 'hover:bg-forest-50'
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-ui font-semibold text-forest-950">{result.title}</span>
                        <span className="type-meta text-forest-600">{result.type}</span>
                      </span>
                      <span className="mt-0.5 block text-caption text-forest-700/80">
                        {result.description}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-forest-500 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-8 text-center text-caption text-forest-700/80">
              No matching pages or programmes found.
            </p>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-forest-800/10 px-3 pt-3 text-caption text-forest-600">
          <span className="inline-flex items-center gap-1.5">
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            Navigate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CornerDownLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Open
          </span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
