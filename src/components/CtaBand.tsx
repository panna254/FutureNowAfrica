import { ButtonLink } from '@/components/Button';

export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-forest-800 px-8 sm:px-12 py-12 sm:py-16">
        {/* Decorative leaves */}
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-leaf-600/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-earth-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl sm:text-4xl text-cream">{title}</h2>
          <p className="mt-4 text-cream/80 text-lg leading-relaxed">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink to={primary.to} variant="primary">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink
                to={secondary.to}
                variant="outline"
                className="border-cream/40! text-cream! hover:bg-cream! hover:text-forest-900!"
              >
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
