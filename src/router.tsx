import { forwardRef } from 'react';
import { navigate } from '@/router-state';

type LinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
  ariaCurrent?: 'page';
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    to,
    children,
    className,
    onClick,
    onKeyDown,
    ariaLabel,
    ariaCurrent,
  },
  ref,
) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(to);
    onClick?.();
  };

  return (
    <a
      ref={ref}
      href={to}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        handleClick(event);
      }}
      onKeyDown={onKeyDown}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  );
});
