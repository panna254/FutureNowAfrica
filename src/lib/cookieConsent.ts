export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_STORAGE_KEY = 'futurenow-africa-cookie-consent';
export const COOKIE_CONSENT_CHANGE_EVENT = 'futurenow-africa-cookie-consent-change';
export const COOKIE_SETTINGS_REQUEST_EVENT = 'futurenow-africa-cookie-settings-request';

export type CookieConsentCategories = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export type CookieConsentRecord = {
  version: typeof COOKIE_CONSENT_VERSION;
  decidedAt: string;
  categories: CookieConsentCategories;
};

export const essentialOnlyCategories: CookieConsentCategories = {
  essential: true,
  analytics: false,
  marketing: false,
};

function isValidConsentRecord(value: unknown): value is CookieConsentRecord {
  if (!value || typeof value !== 'object') return false;

  const record = value as Partial<CookieConsentRecord>;
  const categories = record.categories;

  return (
    record.version === COOKIE_CONSENT_VERSION &&
    typeof record.decidedAt === 'string' &&
    !Number.isNaN(Date.parse(record.decidedAt)) &&
    Boolean(categories) &&
    categories?.essential === true &&
    typeof categories.analytics === 'boolean' &&
    typeof categories.marketing === 'boolean'
  );
}

export function readCookieConsent(): CookieConsentRecord | null {
  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    return isValidConsentRecord(parsed) ? parsed : null;
  } catch {
    // Storage can be unavailable or contain malformed data. A missing decision
    // is the safe fallback and causes the banner to be shown again.
    return null;
  }
}

export function saveCookieConsent(
  categories: CookieConsentCategories = essentialOnlyCategories,
): CookieConsentRecord {
  const record: CookieConsentRecord = {
    version: COOKIE_CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    categories: {
      essential: true,
      analytics: Boolean(categories.analytics),
      marketing: Boolean(categories.marketing),
    },
  };

  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
    window.dispatchEvent(
      new CustomEvent<CookieConsentRecord>(COOKIE_CONSENT_CHANGE_EVENT, {
        detail: record,
      }),
    );
  } catch {
    // Keep the in-memory decision for this session even when browser storage is blocked.
  }

  return record;
}

export function requestCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_REQUEST_EVENT));
}

/**
 * Future analytics/marketing loaders can call this before initialization.
 * No optional technologies are currently registered by this project.
 */
export function hasCookieConsentFor(
  category: keyof Omit<CookieConsentCategories, 'essential'>,
): boolean {
  const record = readCookieConsent();
  return Boolean(record?.categories[category]);
}
