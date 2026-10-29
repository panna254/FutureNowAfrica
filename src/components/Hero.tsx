import { ButtonLink } from '@/components/Button';
import { site } from '@/data/site';

type HeroPhoto = {
  id: number;
  alt: string;
};

/**
 * Licensed Pexels placeholders. They do not depict actual FutureNow Africa projects
 * and should be replaced with approved photography before launch.
 */
const featurePhoto: HeroPhoto = {
  id: 35305030,
  alt: 'Children walking through a green rural landscape toward school (placeholder image, not an actual FutureNow Africa project)',
};

const supportingPhotos = {
  planting: {
    id: 35744764,
    alt: 'Hands planting a sapling in brown soil (placeholder image, not an actual FutureNow Africa project)',
  },
  community: {
    id: 37638737,
    alt: 'Community members clearing a path among greenery (placeholder image, not an actual FutureNow Africa project)',
  },
} satisfies Record<string, HeroPhoto>;

const WIDTHS = [480, 800, 1200] as const;

function pexelsUrl(id: number, width: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

function HeroImage({
  photo,
  sizes,
  priority = false,
  objectPosition,
  className,
}: {
  photo: HeroPhoto;
  sizes: string;
  priority?: boolean;
  objectPosition: string;
  className?: string;
}) {
  return (
    <img
      src={pexelsUrl(photo.id, 800)}
      srcSet={WIDTHS.map((w) => `${pexelsUrl(photo.id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={photo.alt}
      width={800}
      height={1000}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`h-full w-full object-cover ${className ?? ''}`}
      style={{ objectPosition }}
    />
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-linear-to-b from-leaf-50 via-cream to-cream pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12 lg:px-8">
        <div className="animate-fade-up">
          <p className="type-label font-semibold text-leaf-700">{site.tagline}</p>
          <h1
            id="hero-title"
            className="mt-4 max-w-[16ch] text-hero text-forest-950"
          >
            The future of Africa depends on the actions we take today.
          </h1>
          <p className="mt-6 max-w-md text-lead text-forest-800">
            We work with schools, youth and neighbourhoods on conservation,
            climate awareness and sustainable livelihoods.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink to="/get-involved" variant="primary" className="w-full sm:w-auto">
              Get Involved
            </ButtonLink>
            <ButtonLink to="/programs" variant="outline" className="w-full sm:w-auto">
              Explore Our Programs
            </ButtonLink>
          </div>
        </div>

        <div className="relative w-full max-w-xl justify-self-center pr-6 pb-16 sm:pr-10 sm:pb-20 lg:max-w-none lg:justify-self-end">
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[3rem] bg-leaf-200/60 blur-3xl"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl sm:aspect-[5/4]">
            <HeroImage
              photo={featurePhoto}
              sizes="(min-width: 1024px) 56vw, 100vw"
              priority
              objectPosition="50% 45%"
            />
          </div>

          <div className="absolute bottom-0 left-0 aspect-[4/5] w-[40%] overflow-hidden rounded-2xl border-4 border-cream shadow-lg sm:-left-10 sm:w-[36%]">
            <HeroImage
              photo={supportingPhotos.planting}
              sizes="(min-width: 1024px) 18vw, 40vw"
              objectPosition="50% 50%"
            />
          </div>

          <div className="absolute top-0 right-0 aspect-square w-[34%] overflow-hidden rounded-2xl border-4 border-cream shadow-lg sm:-right-2 sm:w-[30%]">
            <HeroImage
              photo={supportingPhotos.community}
              sizes="(min-width: 1024px) 16vw, 34vw"
              objectPosition="50% 50%"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
