import { navigate } from '@/router-state';

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
