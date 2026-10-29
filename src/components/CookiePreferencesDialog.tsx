import { useEffect, useRef } from 'react';
import { Check, Cookie, ShieldCheck, X } from 'lucide-react';

type CookiePreferencesDialogProps = {
  open: boolean;
  onClose: () => void;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onSavePreferences: () => void;
};

export function CookiePreferencesDialog({
  open,
  onClose,
  onAcceptAll,
  onRejectNonEssential,
  onSavePreferences,
}: CookiePreferencesDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => previouslyFocused?.focus());
    };
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[90] flex items-end justify-center bg-forest-950/45 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        id="cookie-preferences-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        aria-describedby="cookie-preferences-description"
        className="w-full max-w-2xl rounded-2xl border border-forest-800/15 bg-cream p-4 text-forest-900 shadow-2xl animate-fade-up motion-reduce:animate-none sm:p-6"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="cookie-preferences-title" className="text-card text-forest-950">
                Cookie preferences
              </h2>
              <p
                id="cookie-preferences-description"
                className="mt-1 max-w-xl text-caption text-forest-700/80"
              >
                Choose how FutureNow Africa should remember your consent. You can
                reopen these settings from the footer at any time.
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-forest-800 transition-colors hover:bg-forest-100 active:bg-forest-200 focus-visible:bg-forest-100"
            aria-label="Close cookie preferences"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-forest-800/10 bg-white/45 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-700" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-ui font-semibold text-forest-950">Essential cookies</h3>
                  <span className="type-meta text-leaf-700">Always on</span>
                </div>
                <p className="mt-1 text-caption text-forest-700/80">
                  These support necessary website functionality and remember this
                  consent decision. They cannot be switched off here.
                </p>
              </div>
              <input
                type="checkbox"
                checked
                disabled
                readOnly
                aria-label="Essential cookies are always enabled"
                className="mt-1 h-5 w-5 accent-leaf-600"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-forest-800/15 bg-forest-50/60 p-4">
            <p className="text-ui font-semibold text-forest-950">Optional cookies are not active</p>
            <p className="mt-1 text-caption text-forest-700/80">
              This website currently has no analytics, advertising, marketing, or
              other optional cookie integrations. No optional services will load
              from any choice made here.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-forest-800/10 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-forest-700 px-4 text-ui font-semibold text-forest-800 transition-colors hover:bg-forest-100 active:bg-forest-200"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={onSavePreferences}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-forest-800 px-4 text-ui font-semibold text-cream transition-colors hover:bg-forest-700 active:bg-forest-900"
          >
            Save my preferences
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-leaf-600 px-4 text-ui font-semibold text-white transition-colors hover:bg-leaf-700 active:bg-leaf-800"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            Accept all
          </button>
        </div>

        <p className="mt-4 text-caption text-forest-600">
          Cookie and privacy policy pages are not yet published. They should be
          added here once approved policy content is available.
        </p>
      </div>
    </div>
  );
}
