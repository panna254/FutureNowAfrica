import { Leaf, Mail, MapPin, Phone } from 'lucide-react';
import { Link, routes } from '@/router';
import { site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-950 text-forest-100 mt-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5" ariaLabel="FutureNow Africa home">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-leaf-600 text-forest-950">
                <Leaf className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="font-display font-semibold text-lg text-cream">
                FutureNow Africa
              </span>
            </Link>
            <p className="mt-4 text-sm text-forest-200/80 max-w-xs leading-relaxed">
              {site.tagline} The future of Africa depends on the actions we take
              today.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-leaf-300 mb-4">
              Explore
            </h2>
            <ul className="space-y-2.5">
              {routes.map((r) => (
                <li key={r.path}>
                  <Link
                    to={r.path}
                    className="text-sm text-forest-200/80 hover:text-cream transition-colors"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-leaf-300 mb-4">
              Contact
            </h2>
            <ul className="space-y-3 text-sm text-forest-200/80">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-leaf-400 shrink-0" aria-hidden="true" />
                <span>{site.contact.email || 'Email to be confirmed'}</span>
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
            <h2 className="text-sm font-semibold uppercase tracking-widest text-leaf-300 mb-4">
              Follow
            </h2>
            <ul className="space-y-2.5">
              {site.contact.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a
                      href={s.href}
                      className="text-sm text-forest-200/80 hover:text-cream transition-colors"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {s.label}
                    </a>
                  ) : (
                    <span className="text-sm text-forest-300/50">{s.label} (to be confirmed)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-forest-300/60">
            © {year} FutureNow Africa. All rights reserved.
          </p>
          <p className="text-xs text-forest-300/60">
            Placeholder photography via Pexels — replace with licensed assets before launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
