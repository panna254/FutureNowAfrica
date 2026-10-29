import { Mail, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Link } from '@/router';
import { routes } from '@/router-state';
import { site } from '@/data/site';
import { requestCookieSettings } from '@/lib/cookieConsent';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-950 text-forest-100 mt-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block rounded-lg" ariaLabel="FutureNow Africa home">
              <BrandLogo variant="dark" alt="" className="h-11 w-auto" />
            </Link>
            <p className="mt-4 text-caption text-forest-200/80 max-w-xs">
              {site.tagline} The future of Africa depends on the actions we take
              today.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="type-label text-leaf-300 mb-4">
              Explore
            </h2>
            <ul className="space-y-2.5">
              {routes.map((r) => (
                <li key={r.path}>
                  <Link
                    to={r.path}
                    className="text-ui text-forest-200/80 hover:text-cream transition-colors"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="type-label text-leaf-300 mb-4">
              Contact
            </h2>
            <ul className="space-y-3 text-caption text-forest-200/80">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-leaf-400 shrink-0" aria-hidden="true" />
                <span className="min-w-0 break-words">{site.contact.email || 'Email to be confirmed'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-leaf-400 shrink-0" aria-hidden="true" />
                <span>{site.contact.phone || 'Phone to be confirmed'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-leaf-400 shrink-0" aria-hidden="true" />
                <span>{site.contact.operatingArea}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="type-label text-leaf-300 mb-4">
              Follow
            </h2>
            <ul className="space-y-2.5">
              {site.contact.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a
                      href={s.href}
                      className="text-ui text-forest-200/80 hover:text-cream transition-colors"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {s.label}
                    </a>
                  ) : (
                    <span className="text-caption text-forest-300">{s.label} (to be confirmed)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-forest-800 pt-8 sm:flex-row">
          <p className="text-caption text-forest-300">
            © {year} FutureNow Africa. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <p className="text-caption text-forest-300">
              Placeholder photography by IncluDev replace with licensed assets before launch.
            </p>
            <button
              type="button"
              onClick={requestCookieSettings}
              className="min-h-11 rounded-lg px-2 text-caption text-forest-200 underline decoration-forest-400 underline-offset-4 transition-colors hover:text-cream focus-visible:text-cream"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
