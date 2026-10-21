import { ButtonLink } from '@/components/Button';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/25961227/pexels-photo-25961227.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Children planting seedlings — placeholder, not an actual FutureNow Africa project"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-900/70 to-forest-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/30" />
      </div>

      {/* Content */}
      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
        <div className="max-w-2xl animate-fade-up">
          <p className="inline-flex items-center gap-2 text-leaf-300 font-semibold text-sm uppercase tracking-widest mb-5">
            <span className="w-8 h-px bg-leaf-300" aria-hidden="true" />
            {site.tagline}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-cream leading-[1.1]">
            The future of Africa depends on the actions we take today.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-cream/85 leading-relaxed max-w-xl">
            FutureNow Africa is a community-based environmental initiative —
            working alongside schools, youth and neighbourhoods to conserve
            nature, raise climate awareness and build sustainable livelihoods.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink to="/get-involved" variant="primary">
              Get Involved
            </ButtonLink>
            <ButtonLink to="/programs" variant="outline" className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-forest-900">
              Explore Our Programs
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border-2 border-cream/40 flex items-start justify-center p-1.5">
          <span className="w-1 h-2 bg-cream/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
