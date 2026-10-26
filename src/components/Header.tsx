import { useEffect, useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Link } from '@/router';
import { routes, useRoute } from '@/router-state';
import { site } from '@/data/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const current = useRoute();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Match the desktop navigation breakpoint so resizing releases mobile scroll lock.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 80rem)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (path: string) =>
    path === '/' ? current === '/' : current === path;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-cream/95 backdrop-blur-xs border-b transition-colors duration-300 ${
        scrolled ? 'shadow-xs border-forest-100' : 'border-transparent'
      } ${open ? 'h-dvh overflow-y-auto xl:h-auto' : ''}`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 min-h-16 xl:min-h-20 py-2">
          <Link
            to="/"
            ariaLabel={`${site.name} home`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-forest-800 text-leaf-300 group-hover:bg-forest-700 transition-colors">
              <Leaf className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-card text-forest-900">
                FutureNow
              </span>
              <span className="type-label text-leaf-700">
                Africa
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
            {routes.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                className={`type-nav px-4 py-2 rounded-full transition-colors ${
                  isActive(r.path)
                    ? 'text-forest-900 bg-forest-100'
                    : 'text-forest-700 hover:text-forest-900 hover:bg-forest-50'
                }`}
              >
                {r.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden flex items-center justify-center min-h-11 min-w-11 p-2 -mr-2 text-forest-800 hover:bg-forest-100 rounded-lg"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-nav"
          className="xl:hidden bg-cream animate-fade-in"
        >
          <nav className="px-4 py-6 flex flex-col gap-1" aria-label="Mobile">
            {routes.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                onClick={() => setOpen(false)}
                className={`text-card px-4 py-3 rounded-xl transition-colors ${
                  isActive(r.path)
                    ? 'bg-forest-100 text-forest-900'
                    : 'text-forest-700 hover:bg-forest-50'
                }`}
              >
                {r.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
