import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { NavigationDropdown } from '@/components/NavigationDropdown';
import { SearchDialog } from '@/components/SearchDialog';
import { Link } from '@/router';
import {
  homeRoute,
  navigationGroups,
  type NavigationGroup,
  type RoutePath,
  useRoute,
} from '@/router-state';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenGroups, setMobileOpenGroups] = useState<Record<string, boolean>>({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const current = useRoute();
  const desktopNavigationRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const isActive = (path: RoutePath) => current === path;
  const isGroupActive = (group: NavigationGroup) =>
    group.items.some((item) => item.path === current);

  const closeMobileNavigation = () => {
    setMobileOpen(false);
    setMobileOpenGroups({});
  };

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const closeAllNavigation = () => {
    setOpenDropdown(null);
    closeMobileNavigation();
    closeSearch();
  };

  const openSearch = () => {
    setOpenDropdown(null);
    closeMobileNavigation();
    setSearchOpen(true);
  };

  useEffect(() => {
    const updateScrollState = () => {
      scrollFrameRef.current = null;
      const nextScrolled = window.scrollY > 16;
      setScrolled((currentScrolled) =>
        currentScrolled === nextScrolled ? currentScrolled : nextScrolled,
      );
    };

    const onScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  // A completed route change always resets temporary navigation UI.
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileOpenGroups({});
    setSearchOpen(false);
  }, [current]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (openDropdown) {
        setOpenDropdown(null);
        return;
      }

      if (mobileOpen) {
        setMobileOpen(false);
        setMobileOpenGroups({});
        window.requestAnimationFrame(() => mobileToggleRef.current?.focus());
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, openDropdown]);

  useEffect(() => {
    if (!openDropdown) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !desktopNavigationRef.current?.contains(target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openDropdown]);

  // Match the desktop breakpoint so a resize cannot leave mobile scroll locked.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const closeOnDesktop = () => {
      if (desktop.matches) {
        setMobileOpen(false);
        setMobileOpenGroups({});
      }
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const toggleMobileGroup = (id: string) => {
    setMobileOpenGroups((groups) => ({
      ...groups,
      [id]: !groups[id],
    }));
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
      <div
        className="navbar-glass pointer-events-auto mx-auto w-full max-w-content rounded-2xl transition-[background-color,border-color,box-shadow] duration-300"
        data-scrolled={scrolled ? 'true' : 'false'}
      >
        <div className="grid min-h-[4.5rem] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 sm:px-5">
          <Link
            to={homeRoute.path}
            ariaLabel="FutureNow Africa home"
            onClick={closeAllNavigation}
            className="shrink-0 rounded-lg"
          >
            <BrandLogo
              alt=""
              className="hidden h-10 w-auto sm:block lg:h-11"
            />
            <BrandLogo
              compact
              alt=""
              className="h-10 w-10 sm:hidden"
            />
          </Link>

          <nav
            ref={desktopNavigationRef}
            className="col-start-2 hidden items-center justify-self-center gap-1 lg:flex"
            aria-label="Primary navigation"
          >
            <Link
              to={homeRoute.path}
              ariaCurrent={isActive(homeRoute.path) ? 'page' : undefined}
              className={[
                'type-nav rounded-full px-3.5 py-2 transition-colors duration-200',
                isActive(homeRoute.path)
                  ? 'bg-forest-800 text-cream shadow-sm'
                  : 'text-forest-800 hover:bg-forest-100/90 hover:text-forest-950',
              ].join(' ')}
            >
              {homeRoute.label}
            </Link>

            {navigationGroups.map((group) => (
              <NavigationDropdown
                key={group.id}
                group={group}
                currentPath={current}
                active={isGroupActive(group)}
                open={openDropdown === group.id}
                onToggle={() =>
                  setOpenDropdown((active) => active === group.id ? null : group.id)
                }
                onNavigate={() => setOpenDropdown(null)}
              />
            ))}
            <Link
              to="/gallery"
              onClick={closeAllNavigation}
              ariaCurrent={isActive('/gallery') ? 'page' : undefined}
              className={[
                'type-nav rounded-full px-3.5 py-2 transition-colors duration-200',
                isActive('/gallery')
                  ? 'bg-forest-800 text-cream shadow-sm'
                  : 'text-forest-800 hover:bg-forest-100/90 hover:text-forest-950',
              ].join(' ')}
            >
              Gallery
            </Link>
          </nav>

          <div className="col-start-2 flex min-w-0 items-center justify-end gap-1.5 lg:col-start-3 lg:gap-2">
            <button
              ref={searchTriggerRef}
              type="button"
              onClick={openSearch}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl p-2 text-forest-900 transition-colors hover:bg-forest-100 active:bg-forest-200 focus-visible:bg-forest-100"
              aria-expanded={searchOpen}
              aria-controls="site-search-dialog"
              aria-label="Search"
              title="Search"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Search</span>
            </button>

            <Link
              to="/get-involved"
              onClick={closeAllNavigation}
              ariaLabel="Donate - learn how to support FutureNow Africa"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-leaf-600 px-3 text-ui font-semibold text-white shadow-xs transition-colors hover:bg-leaf-700 active:scale-[.98] active:bg-leaf-800 focus-visible:ring-2 focus-visible:ring-leaf-400 sm:px-4"
            >
              DONATE
            </Link>
          </div>

          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => {
              if (mobileOpen) {
                closeMobileNavigation();
              } else {
                setMobileOpen(true);
              }
            }}
            className="col-start-3 inline-flex min-h-11 min-w-11 items-center justify-center justify-self-end rounded-xl p-2 text-forest-900 transition-colors hover:bg-forest-100 active:bg-forest-200 focus-visible:bg-forest-100 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {mobileOpen && (
          <div
            id="mobile-nav"
            className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto border-t border-forest-800/10 px-3 pb-4 pt-3 animate-fade-in lg:hidden"
          >
            <div className="mb-2 flex items-center justify-between px-2">
              <p className="type-label text-forest-600">Navigate</p>
              <button
                type="button"
                onClick={closeMobileNavigation}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-ui text-forest-800 transition-colors hover:bg-forest-100"
              >
                Close menu
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <nav className="space-y-2" aria-label="Mobile primary navigation">
              <Link
                to={homeRoute.path}
                onClick={closeMobileNavigation}
                ariaCurrent={isActive(homeRoute.path) ? 'page' : undefined}
                className={[
                  'block rounded-xl px-4 py-3 text-card transition-colors',
                  isActive(homeRoute.path)
                    ? 'bg-forest-800 text-cream'
                    : 'text-forest-800 hover:bg-forest-100',
                ].join(' ')}
              >
                {homeRoute.label}
              </Link>

              {navigationGroups.map((group) => {
                const groupOpen = Boolean(mobileOpenGroups[group.id]);
                const groupActive = isGroupActive(group);
                const panelId = 'mobile-group-' + group.id;
                return (
                  <div
                    key={group.id}
                    className="overflow-hidden rounded-xl border border-forest-800/10 bg-white/35"
                  >
                    <button
                      id={group.id + '-mobile-trigger'}
                      type="button"
                      onClick={() => toggleMobileGroup(group.id)}
                      className={[
                        'flex min-h-13 w-full items-center justify-between gap-4 px-4 py-3 text-left text-card transition-colors',
                        groupActive
                          ? 'bg-forest-100 text-forest-950'
                          : 'text-forest-800 hover:bg-forest-50',
                      ].join(' ')}
                      aria-expanded={groupOpen}
                      aria-controls={panelId}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={'h-5 w-5 shrink-0 transition-transform duration-200 ' + (groupOpen ? 'rotate-180' : '')}
                        aria-hidden="true"
                      />
                    </button>

                    {groupOpen && (
                      <ul
                        id={panelId}
                        className="space-y-1 border-t border-forest-800/10 px-2 py-2"
                        aria-labelledby={group.id + '-mobile-trigger'}
                      >
                        {group.items.map((item) => {
                          const itemActive = isActive(item.path);
                          return (
                            <li key={item.path}>
                              <Link
                                to={item.path}
                                onClick={closeMobileNavigation}
                                ariaCurrent={itemActive ? 'page' : undefined}
                                className={[
                                  'block rounded-lg px-3 py-2.5 text-ui transition-colors',
                                  itemActive
                                    ? 'bg-forest-800 text-cream'
                                    : 'text-forest-800 hover:bg-forest-100',
                                ].join(' ')}
                              >
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
              <Link
                to="/gallery"
                onClick={closeMobileNavigation}
                ariaCurrent={isActive('/gallery') ? 'page' : undefined}
                className={[
                  'block rounded-xl px-4 py-3 text-card transition-colors',
                  isActive('/gallery')
                    ? 'bg-forest-800 text-cream'
                    : 'text-forest-800 hover:bg-forest-100',
                ].join(' ')}
              >
                Gallery
              </Link>
            </nav>
          </div>
        )}
      </div>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
