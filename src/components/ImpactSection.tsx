import { ButtonLink } from '@/components/Button';

type StoryCard = {
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  location: string;
};

/**
 * DEMO story cards — these do not represent real FutureNow Africa projects.
 * Replace with approved stories and photographs once supplied.
 */
const demoStories: StoryCard[] = [
  {
    title: 'A school garden takes root',
    summary:
      'This placeholder story shows how a project story will appear here once approved content is supplied. (Demo.)',
    image:
      'https://images.pexels.com/photos/34411687/pexels-photo-34411687.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Farmer inspecting plants — placeholder, not an actual project',
    location: 'Location to be confirmed',
  },
  {
    title: 'A neighbourhood recycling point opens',
    summary:
      'This placeholder story illustrates the layout for sharing milestones once approved data is available. (Demo.)',
    image:
      'https://images.pexels.com/photos/38117883/pexels-photo-38117883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Person sorting plastic bottles for recycling — placeholder, not an actual project',
    location: 'Location to be confirmed',
  },
  {
    title: 'Young voices at a climate dialogue',
    summary:
      'This placeholder story shows how a community event update will be presented when approved. (Demo.)',
    image:
      'https://images.pexels.com/photos/31748020/pexels-photo-31748020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Children holding a Climate Action sign — placeholder, not an actual project',
    location: 'Location to be confirmed',
  },
];

export function ImpactSection() {
  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Empty state for measurable outcomes */}
      <div className="rounded-2xl border-2 border-dashed border-forest-200 bg-forest-50/50 p-8 sm:p-10 text-center">
        <h3 className="text-card text-forest-800">
          Measurable outcomes — coming soon
        </h3>
        <p className="mt-3 text-body text-forest-700/80 max-w-xl mx-auto">
          We will share verified impact metrics (trees planted, waste
          collected, gardens established, people reached) here once approved
          data is available. We do not publish unverified numbers.
        </p>
      </div>

      {/* Demo story cards */}
      <div className="mt-14">
        <p className="type-label text-earth-700 mb-6">
          Stories — demo content (not real)
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoStories.map((s) => (
            <article
              key={s.title}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-xs"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-earth-700 text-white text-caption font-semibold px-3 py-1">
                  Demo
                </span>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <p className="text-caption text-forest-600 mb-2">{s.location}</p>
                <h3 className="text-card text-forest-900">{s.title}</h3>
                <p className="mt-2 text-body text-forest-700/80 flex-1">
                  {s.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink to="/get-involved" variant="outline">
            Help build these stories
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
