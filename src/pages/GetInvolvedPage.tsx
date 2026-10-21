import {
  HeartHandshake,
  School,
  Building2,
  Gift,
  Users,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { site } from '@/data/site';

const involvement = [
  {
    icon: Users,
    title: 'Volunteer',
    description:
      'Join planting days, recycling drives, workshops and community events. No experience needed — just willingness.',
    points: ['Tree planting & restoration', 'Recycling & clean-up drives', 'Event support'],
  },
  {
    icon: School,
    title: 'School & community participation',
    description:
      'Schools, youth groups and neighbourhood associations can start an environmental club or host a workshop.',
    points: ['Start a green club', 'Host a workshop', 'Curriculum-friendly activities'],
  },
  {
    icon: Building2,
    title: 'Partnerships',
    description:
      'NGOs, local government and businesses can partner on programmes, co-host events or share resources.',
    points: ['Programme co-delivery', 'Event sponsorship (non-payment)', 'Resource sharing'],
  },
  {
    icon: Gift,
    title: 'Donations & sponsorships',
    description:
      'In-kind support — tools, seedlings, space, transport — helps programmes reach more communities.',
    points: ['Tools & materials', 'Seedlings & trees', 'Space & logistics'],
  },
];

export function GetInvolvedPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-forest-900 text-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-leaf-300 font-semibold text-sm uppercase tracking-widest mb-3">
            Get Involved
          </p>
          <h1 className="text-4xl sm:text-5xl text-cream max-w-3xl">
            There is a role for everyone
          </h1>
          <p className="mt-5 text-lg text-cream/85 max-w-2xl leading-relaxed">
            Individuals, schools, community groups and organisations can all
            take part. Choose the path that fits you.
          </p>
        </div>
      </section>

      {/* Involvement cards */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {involvement.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-forest-100 shadow-xs p-8 flex flex-col"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-leaf-100 text-leaf-700 mb-5">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h2 className="text-xl text-forest-900">{item.title}</h2>
                <p className="mt-2 text-forest-700/80 leading-relaxed">
                  {item.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {item.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-2 text-sm text-forest-700"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-leaf-500"
                        aria-hidden="true"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Note about donations & payments */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-2xl bg-earth-50 border border-earth-200 p-6 sm:p-8 flex items-start gap-4">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-earth-100 text-earth-700 shrink-0">
            <HeartHandshake className="w-5 h-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg text-forest-900">
              About financial donations
            </h2>
            <p className="mt-2 text-sm text-forest-700/80 leading-relaxed max-w-2xl">
              We do not currently process financial donations online. An
              approved donation destination and, where relevant, regulatory
              status must be confirmed before any &ldquo;Support Our Work&rdquo;
              option is shown. For now, we welcome in-kind support and
              partnership enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* How to reach us */}
      <section className="bg-forest-50/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading
            eyebrow="Next step"
            title="Get in touch"
            description="Tell us how you would like to take part and we will follow up."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="bg-white rounded-2xl border border-forest-100 shadow-xs p-6 flex items-start gap-3">
              <Mail className="w-5 h-5 text-leaf-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-forest-900">Email</p>
                <p className="text-sm text-forest-700/80">
                  {site.contact.email || 'To be confirmed'}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-forest-100 shadow-xs p-6 flex items-start gap-3">
              <Phone className="w-5 h-5 text-leaf-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-forest-900">Phone</p>
                <p className="text-sm text-forest-700/80">
                  {site.contact.phone || 'To be confirmed'}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-forest-100 shadow-xs p-6 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-leaf-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-forest-900">Where we work</p>
                <p className="text-sm text-forest-700/80">
                  {site.contact.operatingArea}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Partner with us"
        description="Organisations and institutions can help scale community-led action."
        primary={{ to: '/contact', label: 'Contact Us' }}
        secondary={{ to: '/programs', label: 'See Our Programs' }}
      />
    </>
  );
}
