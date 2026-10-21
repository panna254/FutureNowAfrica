import { useEffect, useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { routes, Link, useRoute } from '@/router';
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

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (path: string) =>
    path === '/' ? current === '/' : current === path;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm shadow-sm border-b border-forest-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            ariaLabel={`${site.name} home`}
            className="flex items-center gap-2.5 group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-forest-800 text-leaf-300 group-hover:bg-forest-700 transition-colors">
              <Leaf className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display font-semibold text-lg text-forest-900">
                FutureNow
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-leaf-600 font-semibold">
                Africa
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {routes.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
            className="lg:hidden p-2 -mr-2 text-forest-800 hover:bg-forest-100 rounded-lg"
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
          className="lg:hidden fixed inset-0 top-16 bg-cream z-40 animate-fade-in overflow-y-auto"
        >
          <nav className="px-4 py-6 flex flex-col gap-1" aria-label="Mobile">
            {routes.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
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
