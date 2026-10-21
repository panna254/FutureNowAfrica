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

export function Link({
  to,
  children,
  className,
  onClick,
  ariaLabel,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
    onClick?.();
  };
  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
