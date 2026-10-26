import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { site } from '@/data/site';

export function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-forest-900 text-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="type-label text-leaf-300 mb-3">
            Contact Us
          </p>
          <h1 className="text-page text-cream max-w-3xl">
            Let&rsquo;s talk
          </h1>
          <p className="mt-5 text-lead text-cream/85 max-w-2xl">
            Questions, partnerships, volunteering or press — reach out and we
            will get back to you.
          </p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-section text-forest-900">Contact details</h2>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-leaf-100 text-leaf-700 shrink-0">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-ui text-forest-900">Email</p>
                  <p className="text-body text-forest-700/80 mt-0.5">
                    {site.contact.email || 'To be confirmed'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-leaf-100 text-leaf-700 shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-ui text-forest-900">Phone</p>
                  <p className="text-body text-forest-700/80 mt-0.5">
                    {site.contact.phone || 'To be confirmed'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-leaf-100 text-leaf-700 shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-ui text-forest-900">Where we work</p>
                  <p className="text-body text-forest-700/80 mt-0.5">
                    {site.contact.operatingArea}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-leaf-100 text-leaf-700 shrink-0">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-ui text-forest-900">Response time</p>
                  <p className="text-body text-forest-700/80 mt-0.5">
                    We aim to reply within a few working days.
                  </p>
                </div>
              </li>
            </ul>

            {/* Social */}
            <div className="pt-6 border-t border-forest-100">
              <p className="text-ui text-forest-900 mb-3">
                Follow us
              </p>
              <ul className="flex flex-wrap gap-3">
                {site.contact.social.map((s) =>
                  s.href ? (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center rounded-full border border-forest-200 px-4 py-2 type-action text-forest-800 hover:bg-forest-100 transition-colors"
                      >
                        {s.label}
                      </a>
                    </li>
                  ) : (
                    <li key={s.label}>
                      <span className="inline-flex items-center rounded-full border border-forest-100 px-4 py-2 text-caption text-forest-600">
                        {s.label} (TBC)
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-forest-100 shadow-xs p-7 sm:p-9">
              <h2 className="text-section text-forest-900">Send a message</h2>
              <p className="mt-2 text-body text-forest-700/80">
                Fill in the form and we will respond by email. Fields marked *
                are required.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
