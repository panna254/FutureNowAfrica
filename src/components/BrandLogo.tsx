type BrandLogoProps = {
  variant?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
  alt?: string;
};

export function BrandLogo({
  variant = 'light',
  compact = false,
  className = '',
  alt = 'FutureNow Africa',
}: BrandLogoProps) {
  const filename = compact
    ? variant === 'dark'
      ? 'futurenow-africa-mark-dark.svg'
      : 'futurenow-africa-mark.svg'
    : variant === 'dark'
      ? 'futurenow-africa-logo-dark.svg'
      : 'futurenow-africa-logo.svg';

  return (
    <img
      src={'/assets/branding/' + filename}
      alt={alt}
      className={'block h-auto max-w-full ' + className}
    />
  );
}
