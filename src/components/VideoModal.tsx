import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Play, X } from 'lucide-react';

type VideoModalProps = {
  open: boolean;
  title: string;
  videoUrl: string;
  sourceUrl: string;
  onClose: () => void;
};

const FOCUSABLE_ELEMENTS =
  'button:not([disabled]), a[href], video[controls], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function VideoModal({
  open,
  title,
  videoUrl,
  sourceUrl,
  onClose,
}: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const closeModalRef = useRef<() => void>(() => undefined);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const stopPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  const closeModal = () => {
    stopPlayback();
    onCloseRef.current();
  };

  closeModalRef.current = closeModal;

  useEffect(() => {
    if (!open) return;

    previouslyFocusedElement.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setAutoplayBlocked(false);
    setVideoError(false);
    setIsLoading(true);

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const playbackFrame = window.requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = 0;
      const playPromise = video.play();
      playPromise?.catch(() => setAutoplayBlocked(true));
    });

    const handleWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      closeModalRef.current();
    };

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.cancelAnimationFrame(playbackFrame);
      window.removeEventListener('keydown', handleWindowKeyDown);
      stopPlayback();
      document.body.style.overflow = previousBodyOverflow;

      const elementToRestore = previouslyFocusedElement.current;
      if (elementToRestore?.isConnected) {
        window.requestAnimationFrame(() => elementToRestore.focus());
      }
    };
  }, [open]);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
    if (!focusableElements?.length) {
      event.preventDefault();
      closeButtonRef.current?.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(
      () => setAutoplayBlocked(false),
      () => setAutoplayBlocked(true),
    );
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-forest-950/80 p-4 backdrop-blur-sm sm:p-6"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        ref={dialogRef}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-auto rounded-2xl border border-cream/20 bg-forest-950/95 p-4 text-cream shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="conservation-video-title"
        onKeyDown={handleDialogKeyDown}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="conservation-video-title" className="text-xl font-semibold sm:text-2xl">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeModal}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-cream/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950 active:bg-cream/90 focus-visible:bg-cream focus-visible:text-forest-950"
            aria-label="Close video"
          >
            <span>Close</span>
            <span aria-hidden="true">×</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {videoError ? (
          <div className="flex aspect-video items-center justify-center rounded-xl bg-black px-6 text-center">
            <div>
              <p className="text-lg font-semibold">This video could not be loaded.</p>
              <p className="mt-2 text-sm text-cream/75">
                Please try again later or open the original conservation report.
              </p>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex min-h-11 items-center rounded-full border border-cream/40 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950 focus-visible:bg-cream focus-visible:text-forest-950"
              >
                Open original report
              </a>
            </div>
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              controls
              playsInline
              autoPlay
              preload="metadata"
              onCanPlay={() => setIsLoading(false)}
              onLoadedData={() => setIsLoading(false)}
              onPlay={() => {
                setAutoplayBlocked(false);
                setIsLoading(false);
              }}
              onError={() => {
                setVideoError(true);
                setIsLoading(false);
              }}
            >
              <source src={videoUrl} type="video/webm" />
              Your browser does not support WebM video.
            </video>

            {isLoading && (
              <p className="pointer-events-none absolute inset-x-0 top-4 text-center text-sm text-cream/75">
                Loading conservation video…
              </p>
            )}

            {autoplayBlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-forest-950/45">
                <button
                  type="button"
                  onClick={handlePlay}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-cream px-5 py-3 font-semibold text-forest-950 shadow-lg transition-colors hover:bg-leaf-200 active:bg-leaf-300 focus-visible:bg-leaf-200"
                >
                  <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                  Play video
                </button>
              </div>
            )}
          </div>
        )}

        <p className="mt-4 text-sm leading-6 text-cream/75">
          <span className="font-semibold text-cream">External conservation coverage:</span>{' '}
          Voice of America / Ahmed Hussein, 2023.{' '}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-leaf-200 underline decoration-leaf-300/60 underline-offset-4 transition-colors hover:text-cream focus-visible:text-cream"
          >
            Read the original report
          </a>
        </p>
      </div>
    </div>
  );
}
