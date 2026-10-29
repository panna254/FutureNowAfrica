import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { HeroSlide } from '@/components/HeroSlide';
import { heroSlides } from '@/data/heroSlides';

const SLIDE_INTERVAL_MS = 7000;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const slideCount = heroSlides.length;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

const controlClass =
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-cream/40 bg-forest-950/50 text-cream backdrop-blur-sm transition-colors hover:bg-cream hover:text-forest-950 active:scale-[.97]';

export function Hero() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === 'visible');
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const autoplayPaused = userPaused || hovered || focusWithin || !inView || !pageVisible || reducedMotion;

  useEffect(() => {
    if (autoplayPaused) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % slideCount), SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, autoplayPaused]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  const goTo = (next: number) => setIndex((next + slideCount) % slideCount);

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocusWithin(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Our programmes"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={handleBlur}
      className="relative isolate min-h-[640px] h-[88svh] overflow-hidden bg-forest-950 text-cream lg:min-h-[620px] lg:h-[84svh] lg:max-h-[860px]"
    >
      <h1 className="sr-only">FutureNow Africa: Learn. Act. Sustain.</h1>

      {heroSlides.map((slide, i) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          index={i}
          total={slideCount}
          active={i === index}
          priority={i === 0}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 z-20 pb-6 sm:pb-8">
        <div className="mx-auto flex max-w-content flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-1" role="group" aria-label="Choose a slide">
            {heroSlides.map((slide, i) => {
              const active = i === index;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show slide ${i + 1}: ${slide.eyebrow}`}
                  aria-current={active ? 'true' : undefined}
                  className="inline-flex min-h-11 min-w-8 items-center justify-center px-1"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      active ? 'w-10 bg-cream' : 'w-4 bg-cream/45 hover:bg-cream/75'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="type-meta mr-2 text-cream/80" aria-hidden="true">
              {String(index + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
            </span>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((paused) => !paused)}
                aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
                className={controlClass}
              >
                {userPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous slide"
              className={controlClass}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next slide"
              className={controlClass}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
