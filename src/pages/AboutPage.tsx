import { Leaf, Eye, Target, Compass } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { site } from '@/data/site';

export function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative pt-28 pb-16 bg-forest-900 text-cream overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8613887/pexels-photo-8613887.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Children sitting in a tree — placeholder, not an actual FutureNow Africa project"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 to-forest-900/90" />
        </div>
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-leaf-300 font-semibold text-sm uppercase tracking-widest mb-3">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl text-cream max-w-3xl">
            Who we are
          </h1>
          <p className="mt-5 text-lg text-cream/85 max-w-2xl leading-relaxed">
            {site.intro}
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white border border-forest-100 shadow-sm p-8">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-leaf-100 text-leaf-700 mb-5">
              <Eye className="w-6 h-6" aria-hidden="true" />
            </span>
            <h2 className="text-2xl text-forest-900">Vision</h2>
            <p className="mt-3 text-forest-700/80 text-lg leading-relaxed">
              {site.vision}
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-forest-100 shadow-sm p-8">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-earth-100 text-earth-700 mb-5">
              <Target className="w-6 h-6" aria-hidden="true" />
            </span>
            <h2 className="text-2xl text-forest-900">Mission</h2>
            <p className="mt-3 text-forest-700/80 text-lg leading-relaxed">
              {site.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-forest-50/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading
            eyebrow="What guides us"
            title="Our values"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-forest-100 shadow-sm p-7"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-forest-100 text-forest-700 mb-4">
                  <Compass className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg text-forest-900">{v.title}</h3>
                <p className="mt-2 text-sm text-forest-700/80 leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Our approach"
          title="Identify. Educate. Act. Sustain."
          description="A cycle that keeps communities in the lead and keeps the work going."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
          {site.approach.map((a, i) => (
            <li
              key={a.step}
              className="relative rounded-2xl border border-forest-100 bg-white p-7 shadow-sm"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-leaf-600 text-white font-semibold">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl text-forest-900">{a.step}</h3>
              <p className="mt-2 text-sm text-forest-700/80 leading-relaxed">
                {a.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team placeholder */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-2xl border-2 border-dashed border-forest-200 bg-forest-50/50 p-8 sm:p-10 text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-forest-100 text-forest-700 mb-4">
            <Leaf className="w-6 h-6" aria-hidden="true" />
          </span>
          <h3 className="text-xl text-forest-800">Team &amp; story</h3>
          <p className="mt-3 text-forest-700/80 max-w-xl mx-auto">
            Our team and founding story will appear here once approved content
            is supplied. We don't publish names, photos or biographies without
            consent.
          </p>
        </div>
      </section>

      <CtaBand
        title="Want to work with us?"
        description="From partnerships to volunteering, there are many ways to take part."
        primary={{ to: '/get-involved', label: 'Get Involved' }}
        secondary={{ to: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
