import { useEffect, useState } from 'react';

export type RoutePath =
  | '/'
  | '/about'
  | '/programs'
  | '/impact'
  | '/get-involved'
  | '/news'
  | '/contact';

export interface Route {
  path: RoutePath;
  label: string;
}

export interface NavigationGroup {
  id: 'about' | 'explore' | 'take-action';
  label: 'About' | 'Explore' | 'Take Action';
  items: Route[];
}

export const homeRoute: Route = { path: '/', label: 'Home' };

const aboutRoute: Route = { path: '/about', label: 'About Us' };
const programsRoute: Route = { path: '/programs', label: 'Our Programs' };
const impactRoute: Route = { path: '/impact', label: 'Our Impact' };
const getInvolvedRoute: Route = { path: '/get-involved', label: 'Get Involved' };
const newsRoute: Route = { path: '/news', label: 'News & Resources' };
const contactRoute: Route = { path: '/contact', label: 'Contact Us' };

// Keep every destination in one source of truth while allowing the header to
// present the same routes in meaningful groups on desktop and mobile.
export const routes: Route[] = [
  homeRoute,
  aboutRoute,
  programsRoute,
  impactRoute,
  getInvolvedRoute,
  newsRoute,
  contactRoute,
];

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'about',
    label: 'About',
    items: [aboutRoute, impactRoute],
  },
  {
    id: 'explore',
    label: 'Explore',
    items: [programsRoute, newsRoute],
  },
  {
    id: 'take-action',
    label: 'Take Action',
    items: [getInvolvedRoute, contactRoute],
  },
];

function getCurrentPath(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash === '' ? '/' : hash;
}

export function useRoute(): string {
  const [path, setPath] = useState<string>(getCurrentPath());

  useEffect(() => {
    const onChange = () => {
      setPath(getCurrentPath());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return path;
}

export function navigate(path: string) {
  window.location.hash = path;
}
