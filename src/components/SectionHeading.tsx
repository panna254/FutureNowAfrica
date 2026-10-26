type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  tone?: 'light' | 'dark';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  tone = 'light',
}: Props) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <p className={`type-label mb-3 ${tone === 'dark' ? 'text-leaf-300' : 'text-leaf-700'} ${align === 'center' ? 'mx-auto' : ''}`}>
          {eyebrow}
        </p>
      )}
      <Tag className={`${Tag === 'h1' ? 'text-page' : 'text-section'} ${tone === 'dark' ? 'text-cream' : 'text-forest-900'}`}>{title}</Tag>
      {description && (
        <p className={`mt-4 text-lead ${tone === 'dark' ? 'text-cream/85' : 'text-forest-700/80'} ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
