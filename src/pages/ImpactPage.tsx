import { SectionHeading } from '@/components/SectionHeading';
import { ImpactSection } from '@/components/ImpactSection';
import { CtaBand } from '@/components/CtaBand';

export function ImpactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-forest-900 text-cream">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="type-label text-leaf-300 mb-3">
            Our Impact
          </p>
          <h1 className="text-page text-cream max-w-3xl">
            Honest about where we stand
          </h1>
          <p className="mt-5 text-lead text-cream/85 max-w-2xl">
            We share verified outcomes — and we are clear when the data is not
            ready yet. This page shows what a fully populated impact section
            will look like once approved metrics and stories are supplied.
          </p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
        <SectionHeading
          eyebrow="Empty state"
          title="Measurable outcomes — coming soon"
          description="No invented metrics. Trees planted, waste collected, gardens established and people reached will appear here once the data is verified and approved."
        />
      </section>

      <ImpactSection />

      <CtaBand
        title="Help us build the evidence"
        description="Volunteering, partnerships and in-kind support all help turn early activity into measurable outcomes."
        primary={{ to: '/get-involved', label: 'Get Involved' }}
        secondary={{ to: '/about', label: 'Learn About Us' }}
      />
    </>
  );
}
