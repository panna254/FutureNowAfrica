import { useState } from 'react';
import { ButtonLink } from '@/components/Button';
import type { HeroSlideData } from '@/data/heroSlides';

const IMAGE_WIDTHS = [960, 1600, 2400] as const;

function pexelsUrl(id: number, width: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

type Props = {
  slide: HeroSlideData;
  index: number;
  total: number;
  active: boolean;
  priority: boolean;
};

export function HeroSlide({ slide, index, total, active, priority }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const { image } = slide;

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${slide.eyebrow}`}
      aria-hidden={!active}
      {...(active ? {} : { inert: '' })}
      className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
        active ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-forest-950">
        {!imageFailed && (
          <img
            src={pexelsUrl(image.pexelsId, 1600)}
            srcSet={IMAGE_WIDTHS.map((w) => `${pexelsUrl(image.pexelsId, w)} ${w}w`).join(', ')}
            sizes="100vw"
            alt={image.alt}
            width={1920}
            height={1080}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
            style={{ objectPosition: image.objectPosition }}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-forest-950/90 via-forest-950/60 to-forest-900/15" />
        <div className="absolute inset-0 bg-linear-to-t from-forest-950/80 via-transparent to-forest-950/30" />
      </div>

      <div className="relative flex h-full items-center px-4 pt-28 pb-36 sm:px-6 sm:pb-40 lg:px-8">
        <div className="mx-auto w-full max-w-content">
          <div
            className={`max-w-2xl transition-[opacity,transform] duration-700 ease-out ${
              active ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            <p className="type-label font-semibold text-leaf-300">{slide.eyebrow}</p>
            <h2 className="mt-4 text-hero text-cream">{slide.headline}</h2>
            <p className="mt-5 max-w-xl text-lead text-cream/90">{slide.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <ButtonLink to={slide.primary.to} variant="primary" className="w-full sm:w-auto">
                {slide.primary.label}
              </ButtonLink>
              {slide.secondary && (
                <ButtonLink
                  to={slide.secondary.to}
                  variant="outline"
                  className="w-full border-cream/50! text-cream! hover:bg-cream! hover:text-forest-950! sm:w-auto"
                >
                  {slide.secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
