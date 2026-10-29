import { useEffect, useState } from 'react';
import { Cookie, Settings2 } from 'lucide-react';
import { CookiePreferencesDialog } from '@/components/CookiePreferencesDialog';
import {
  COOKIE_SETTINGS_REQUEST_EVENT,
  readCookieConsent,
  saveCookieConsent,
  type CookieConsentRecord,
} from '@/lib/cookieConsent';

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsentRecord | null | undefined>(undefined);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsent(readCookieConsent());

    const openSettings = () => setPreferencesOpen(true);
    window.addEventListener(COOKIE_SETTINGS_REQUEST_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_REQUEST_EVENT, openSettings);
  }, []);

  const saveChoice = () => {
    const savedConsent = saveCookieConsent();
    setPreferencesOpen(false);

    if (preferencesOpen) {
      // Let the dialog restore focus to the still-mounted customize button
      // before the first-visit banner is removed from the document.
      window.requestAnimationFrame(() => setConsent(savedConsent));
    } else {
      setConsent(savedConsent);
    }
  };

  if (consent === undefined) return null;

  return (
    <>
      {consent === null && (
        <aside
          role="region"
          aria-label="Cookie consent"
          aria-hidden={preferencesOpen}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:p-5 sm:pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
        >
          <div className={`${preferencesOpen ? 'pointer-events-none' : 'pointer-events-auto'} mx-auto w-full max-w-5xl rounded-2xl border border-forest-800/15 bg-cream/95 p-4 text-forest-900 shadow-2xl backdrop-blur-md animate-fade-up motion-reduce:animate-none sm:p-5`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                  <Cookie className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-card text-forest-950">Your privacy matters</h2>
                  <p className="mt-1 max-w-3xl text-caption text-forest-700/85">
                    This website uses essential browser storage to remember your
                    consent. No analytics or marketing services are currently active.
                    Choose an option below to continue.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
                <button
                  type="button"
                  onClick={saveChoice}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-forest-700 px-4 text-ui font-semibold text-forest-800 transition-colors hover:bg-forest-100 active:bg-forest-200"
                >
                  Reject non-essential
                </button>
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(true)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-forest-300 px-4 text-ui font-semibold text-forest-800 transition-colors hover:bg-forest-100 active:bg-forest-200"
                  aria-haspopup="dialog"
                  aria-controls="cookie-preferences-dialog"
                >
                  <Settings2 className="h-4 w-4" aria-hidden="true" />
                  Customize preferences
                </button>
                <button
                  type="button"
                  onClick={saveChoice}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-leaf-600 px-4 text-ui font-semibold text-white transition-colors hover:bg-leaf-700 active:bg-leaf-800"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      <CookiePreferencesDialog
        open={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        onAcceptAll={saveChoice}
        onRejectNonEssential={saveChoice}
        onSavePreferences={saveChoice}
      />
    </>
  );
}
