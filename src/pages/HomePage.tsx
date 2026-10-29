import { ArrowRight, Compass, GraduationCap, HandHeart, RefreshCw } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { SectionHeading } from '@/components/SectionHeading';
import { ProgrammeCard } from '@/components/ProgrammeCard';
import { CtaBand } from '@/components/CtaBand';
import { ButtonLink } from '@/components/Button';
import { programmes } from '@/data/programmes';
import { site } from '@/data/site';

const approachIcons = [Compass, GraduationCap, HandHeart, RefreshCw];

export function HomePage() {
  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Who we are"
          title="Community-led, for the long term"
          description={site.intro}
        />
      </section>

      {/* Vision & Mission */}
      <section className="bg-forest-50/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-white rounded-2xl p-8 border border-forest-100 shadow-xs">
              <h2 className="text-section text-forest-900">Our Vision</h2>
              <p className="mt-4 text-lead text-forest-700/80">
                {site.vision}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-forest-100 shadow-xs">
              <h2 className="text-section text-forest-900">Our Mission</h2>
              <p className="mt-4 text-lead text-forest-700/80">
                {site.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured programmes */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="What we do"
            title="Our six programmes"
            description="Every programme is designed to be led by the community it serves, practical, measurable and built to continue."
          />
          <ButtonLink to="/programs" variant="outline" className="shrink-0">
            View all programmes
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <ProgrammeCard key={p.slug} programme={p} index={i} />
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="bg-forest-900 text-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading
            eyebrow="How we work"
            title="Identify. Educate. Act. Sustain."
            description="A simple cycle that keeps communities in the lead, and keeps the work going after we step back."
            align="center"
            tone="dark"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.approach.map((a, i) => {
              const Icon = approachIcons[i];
              return (
                <div
                  key={a.step}
                  className="relative rounded-2xl bg-forest-800/60 border border-forest-700 p-7"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-leaf-600/20 text-leaf-300 mb-5">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <p className="type-meta text-leaf-400">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 text-card text-cream">{a.step}</h3>
                  <p className="mt-3 text-body text-forest-100/80">
                    {a.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <CtaBand
        title="Join the work"
            description="Whether you have time, a school, a community group or an organisation, there is a role for you."
        primary={{ to: '/get-involved', label: 'Get Involved' }}
        secondary={{ to: '/about', label: 'Learn About Us' }}
      />
    </>
  );
}
