import { CtaBand } from '@/components/CtaBand';
import { ButtonLink } from '@/components/Button';
import { programmes } from '@/data/programmes';

export function ProgramsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-forest-900 text-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="type-label text-leaf-300 mb-3">
            Our Programs
          </p>
          <h1 className="text-page text-cream max-w-3xl">
            Six programmes, one goal
          </h1>
          <p className="mt-5 text-lead text-cream/85 max-w-2xl">
            Each programme is designed to be community-led, practical and
            durable. Together they cover education, restoration, livelihoods
            and climate awareness.
          </p>
        </div>
      </section>

      {/* Programme detail list */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {programmes.map((p, i) => {
            const Icon = p.icon;
            const reversed = i % 2 === 1;
            return (
              <article
                key={p.slug}
                className={`grid gap-8 lg:grid-cols-2 items-center ${
                  reversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-md aspect-16/10 ${
                    reversed ? 'lg:col-start-2' : ''
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 rounded-xl bg-cream/95 text-forest-800 shadow-xs">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                </div>
                <div className={reversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <p className="type-meta text-leaf-600 mb-2">
                    Programme {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-section text-forest-900">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-body text-leaf-700 font-medium">{p.tagline}</p>
                  <p className="mt-4 text-body text-forest-700/80">
                    {p.description}
                  </p>
                  <div className="mt-6">
                    <ButtonLink to="/get-involved" variant="outline">
                      Get involved in this programme
                    </ButtonLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand
        title="Ready to take part?"
        description="Find the role that fits you — volunteer, school, community group or partner."
        primary={{ to: '/get-involved', label: 'Get Involved' }}
        secondary={{ to: '/contact', label: 'Ask a Question' }}
      />
    </>
  );
}
