import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '@/data/gallery';

type ImageLightboxProps = {
  open: boolean;
  item: GalleryItem | null;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

const FOCUSABLE_ELEMENTS =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export function ImageLightbox({
  open,
  item,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const onPreviousRef = useRef(onPrevious);
  const onNextRef = useRef(onNext);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
    onPreviousRef.current = onPrevious;
    onNextRef.current = onNext;
  }, [onClose, onNext, onPrevious]);

  useEffect(() => {
    setImageError(false);
  }, [item?.id]);

  useEffect(() => {
    if (!open || !item) return;

    previouslyFocusedElement.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      } else if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        onPreviousRef.current();
      } else if (event.key === 'ArrowRight' && index < total - 1) {
        event.preventDefault();
        onNextRef.current();
      }
    };

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleWindowKeyDown);
      document.body.style.overflow = previousBodyOverflow;

      const elementToRestore = previouslyFocusedElement.current;
      if (elementToRestore?.isConnected) {
        window.requestAnimationFrame(() => elementToRestore.focus());
      }
    };
  }, [index, item, open, total]);

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

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-forest-950/85 p-4 backdrop-blur-sm sm:p-6"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCloseRef.current();
      }}
    >
      <div
        ref={dialogRef}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-auto rounded-2xl border border-cream/20 bg-forest-950/95 p-4 text-cream shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-lightbox-title"
        onKeyDown={handleDialogKeyDown}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="type-meta text-leaf-300">{item.category}</p>
            <h2 id="gallery-lightbox-title" className="mt-1 text-xl font-semibold sm:text-2xl">
              {item.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onCloseRef.current}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-cream/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950 active:bg-cream/90 focus-visible:bg-cream focus-visible:text-forest-950"
            aria-label="Close image viewer"
          >
            <span>Close</span>
            <span aria-hidden="true">×</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex min-h-[14rem] items-center justify-center overflow-hidden rounded-xl bg-black sm:min-h-[20rem]">
          {imageError ? (
            <p className="px-6 py-16 text-center text-cream/80">
              This image is currently unavailable. Please close the viewer and try again later.
            </p>
          ) : (
            <img
              src={item.fullSrc}
              alt={item.alt}
              className="max-h-[65dvh] w-full object-contain"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onPreviousRef.current}
            disabled={index === 0}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950 active:bg-cream/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:bg-cream focus-visible:text-forest-950"
            aria-label="Previous gallery image"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </button>
          <p className="type-meta text-center text-cream/65" aria-live="polite">
            {index + 1} of {total}
          </p>
          <button
            type="button"
            onClick={onNextRef.current}
            disabled={index === total - 1}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950 active:bg-cream/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:bg-cream focus-visible:text-forest-950"
            aria-label="Next gallery image"
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-cream/75">
          {item.caption} {item.credit}
        </p>
      </div>
    </div>
  );
}
