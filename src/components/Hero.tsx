import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { VideoModal } from '@/components/VideoModal';
import { site } from '@/data/site';
import { programmes } from '@/data/programmes';

type HeroSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: {
    label: string;
    to: string;
  };
  secondaryCta?: {
    label: string;
    to: string;
  };
};

/*
  The first slide intentionally keeps the original hero source, copy and CTAs.
  The remaining images are the existing Pexels programme placeholders from
  src/data/programmes.ts; they are not presented as FutureNow Africa projects.
*/
const heroSlides: HeroSlide[] = [
  {
    id: 'future-now-africa',
    eyebrow: site.tagline,
    headline: 'The future of Africa depends on the actions we take today.',
    description:
      'FutureNow Africa is a community-based environmental initiative, working alongside schools, youth and neighbourhoods to conserve nature, raise climate awareness and build sustainable livelihoods.',
    image:
      'https://images.pexels.com/photos/25961227/pexels-photo-25961227.jpeg?auto=compress&cs=tinysrgb&w=1920',
    imageAlt: 'Children planting seedlings, placeholder, not an actual FutureNow Africa project',
    primaryCta: { label: 'Get Involved', to: '/get-involved' },
    secondaryCta: { label: 'Explore Our Programs', to: '/programs' },
  },
  {
    id: 'environmental-education',
    eyebrow: 'ENVIRONMENTAL EDUCATION',
    headline: 'Empowering a Generation to Protect Our Planet',
    description:
      'Build environmental awareness and practical knowledge among children, young people, and communities.',
    image: programmes[0].image,
    imageAlt: programmes[0].imageAlt,
    primaryCta: { label: 'Explore Our Programs', to: '/programs' },
  },
  {
    id: 'waste-management',
    eyebrow: 'WASTE MANAGEMENT',
    headline: 'Turn Waste Into Opportunity',
    description:
      'Promote responsible waste management and community-led solutions for cleaner, healthier environments.',
    image: programmes[1].image,
    imageAlt: programmes[1].imageAlt,
    primaryCta: { label: 'Explore Our Programs', to: '/programs' },
  },
  {
    id: 'sustainable-agriculture',
    eyebrow: 'SUSTAINABLE AGRICULTURE',
    headline: 'Grow Sustainably. Thrive Together.',
    description:
      'Encourage sustainable agriculture, urban farming, and practical approaches to resilient community livelihoods.',
    image: programmes[2].image,
    imageAlt: programmes[2].imageAlt,
    primaryCta: { label: 'Discover Our Programs', to: '/programs' },
  },
  {
    id: 'water-conservation',
    eyebrow: 'WATER CONSERVATION',
    headline: 'Every Drop Shapes Our Future',
    description:
      'Promote responsible water use, rainwater harvesting, and practical conservation for a more resilient future.',
    image: programmes[3].image,
    imageAlt: programmes[3].imageAlt,
    primaryCta: { label: 'Learn About Our Mission', to: '/about' },
  },
  {
    id: 'climate-action',
    eyebrow: 'CLIMATE ACTION',
    headline: 'Plant Today. Protect Tomorrow.',
    description:
      'Inspire communities to restore green spaces, protect biodiversity, and take meaningful action for a sustainable African future.',
    image: programmes[4].image,
    imageAlt: programmes[4].imageAlt,
    primaryCta: { label: 'Get Involved', to: '/get-involved' },
  },
];

const AUTO_ADVANCE_MS = 7000;
const CONSERVATION_VIDEO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/6/63/Rare_Giraffe_in_Kenya_Faces_Extinction_Threat_Because_of_Poaching%2C_Climate_Change.webm';
const CONSERVATION_REPORT_URL =
  'https://www.voanews.com/a/rare-giraffe-in-kenya-faces-extinction-threat-because-of-poaching-climate-change-/7147089.html';

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || isVideoOpen) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, isVideoOpen, prefersReducedMotion]);

  // Warm the next photograph without keeping six hidden image layers in the DOM.
  useEffect(() => {
    const nextSlide = heroSlides[(activeIndex + 1) % heroSlides.length];
    const nextImage = new window.Image();
    nextImage.src = nextSlide.image;
  }, [activeIndex]);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? heroSlides.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
  };

  const handleCarouselKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (isVideoOpen) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  const openVideo = () => {
    setIsPaused(true);
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setIsPaused(false);
  };

  const activeSlide = heroSlides[activeIndex];

  return (
    <>
      <section
        id="hero-carousel"
        className="relative min-h-svh overflow-hidden bg-forest-950"
        role="region"
        aria-label="FutureNow Africa highlights"
        aria-roledescription="carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={(event) => {
          const nextFocusedElement = event.relatedTarget;
          if (!(nextFocusedElement instanceof Node) || !event.currentTarget.contains(nextFocusedElement)) {
            setIsPaused(false);
          }
        }}
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        onPointerCancel={() => setIsPaused(false)}
        onKeyDown={handleCarouselKeyDown}
      >
      {/* Background images and the original hero overlays */}
      <div className="absolute inset-0">
        <img
          key={activeSlide.id}
          src={activeSlide.image}
          alt={activeSlide.imageAlt}
          className={`absolute inset-0 h-full w-full object-cover ${
            activeIndex === 0 ? '' : 'animate-fade-in motion-reduce:animate-none'
          }`}
          loading="eager"
          decoding={activeIndex === 0 ? 'sync' : 'async'}
          onError={(event) => {
            // Keep the forest background visible instead of showing a broken image.
            event.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-forest-950/90 via-forest-900/85 to-forest-900/80" />
        <div className="absolute inset-0 bg-linear-to-t from-forest-950/80 via-transparent to-forest-950/30" />
      </div>

      {/* Slide content */}
      <div className="relative z-20 flex min-h-svh w-full items-center">
        <div className="mx-auto w-full max-w-content px-4 pb-32 pt-28 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
          <div
            key={activeSlide.id}
            className="max-w-2xl animate-fade-up"
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeIndex + 1} of ${heroSlides.length}`}
          >
            <p className="text-leaf-300 type-label mb-5">{activeSlide.eyebrow}</p>
            <h1 className="text-hero text-cream">{activeSlide.headline}</h1>
            <p className="mt-6 max-w-xl text-lead text-cream/85">
              {activeSlide.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink to={activeSlide.primaryCta.to} variant="primary">
                {activeSlide.primaryCta.label}
              </ButtonLink>
              {activeSlide.secondaryCta && (
                <ButtonLink
                  to={activeSlide.secondaryCta.to}
                  variant="outline"
                  className="border-cream/40! text-cream! hover:bg-cream! hover:text-forest-900!"
                >
                  {activeSlide.secondaryCta.label}
                </ButtonLink>
              )}
              <button
                type="button"
                onClick={openVideo}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950 active:bg-cream/90 focus-visible:bg-cream focus-visible:text-forest-950"
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-5 right-4 z-30 flex items-center gap-2 sm:bottom-6 sm:right-8 lg:right-12">
        <button
          type="button"
          onClick={goToPrevious}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-cream/35 bg-forest-950/35 text-cream backdrop-blur-sm transition-colors hover:bg-forest-800/70 active:bg-forest-800 focus-visible:bg-forest-800"
          aria-label="Previous hero slide"
          aria-controls="hero-carousel"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1.5 rounded-full border border-cream/25 bg-forest-950/35 px-2 py-1.5 backdrop-blur-sm" aria-label="Choose hero slide">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`min-h-3 min-w-3 rounded-full border border-cream/60 transition-all motion-reduce:transition-none focus-visible:bg-cream ${
                index === activeIndex
                  ? 'bg-cream px-3'
                  : 'bg-transparent hover:bg-cream/70'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              aria-controls="hero-carousel"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToNext}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-cream/35 bg-forest-950/35 text-cream backdrop-blur-sm transition-colors hover:bg-forest-800/70 active:bg-forest-800 focus-visible:bg-forest-800"
          aria-label="Next hero slide"
          aria-controls="hero-carousel"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Existing scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 sm:block" aria-hidden="true">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-cream/40 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-cream/60" />
        </div>
      </div>
      </section>

      <VideoModal
        open={isVideoOpen}
        title="Rare giraffe conservation coverage"
        videoUrl={CONSERVATION_VIDEO_URL}
        sourceUrl={CONSERVATION_REPORT_URL}
        onClose={closeVideo}
      />
    </>
  );
}
