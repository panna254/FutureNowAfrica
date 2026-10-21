import { useEffect, useState } from 'react';

export type Route =
  | { path: '/'; label: 'Home' }
  | { path: '/about'; label: 'About Us' }
  | { path: '/programs'; label: 'Our Programs' }
  | { path: '/impact'; label: 'Our Impact' }
  | { path: '/get-involved'; label: 'Get Involved' }
  | { path: '/news'; label: 'News & Resources' }
  | { path: '/contact'; label: 'Contact Us' };

export const routes: Route[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/programs', label: 'Our Programs' },
  { path: '/impact', label: 'Our Impact' },
  { path: '/get-involved', label: 'Get Involved' },
  { path: '/news', label: 'News & Resources' },
  { path: '/contact', label: 'Contact Us' },
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
