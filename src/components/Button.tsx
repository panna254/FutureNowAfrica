import { Link } from '@/router';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

const variants: Record<Variant, string> = {
  primary:
    'bg-leaf-600 text-white hover:bg-leaf-700 shadow-sm focus-visible:ring-leaf-500',
  secondary:
    'bg-earth-500 text-white hover:bg-earth-600 shadow-sm focus-visible:ring-earth-400',
  outline:
    'border-2 border-forest-700 text-forest-800 hover:bg-forest-700 hover:text-white focus-visible:ring-forest-600',
  ghost:
    'text-forest-800 hover:bg-forest-100 focus-visible:ring-forest-500',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed';

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
  onClick,
  ariaLabel,
}: {
  to: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      ariaLabel={ariaLabel}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
