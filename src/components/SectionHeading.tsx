type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
}: Props) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <p className="text-leaf-600 font-semibold text-sm uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl sm:text-4xl text-forest-900">{title}</Tag>
      {description && (
        <p className="mt-4 text-forest-700/80 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
