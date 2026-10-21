/**
 * Site-wide configuration. Values marked TODO are client decisions still needed —
 * they are left as clearly labelled placeholders rather than invented content.
 */
export const site = {
  name: 'FutureNow Africa',
  tagline: 'Learn. Act. Sustain.',
  coreMessage: 'The future of Africa depends on the actions we take today.',
  intro:
    'FutureNow Africa is a community-based environmental initiative. We work alongside schools, youth groups and neighbourhoods to protect nature, respond to climate change and build sustainable livelihoods — one community at a time.',
  vision:
    'A continent where every community has the knowledge, tools and confidence to protect its environment and shape a sustainable future.',
  mission:
    'To enable community-led environmental action across Africa through education, practical projects and partnerships that turn awareness into lasting change.',
  values: [
    {
      title: 'Community-led',
      body: 'Communities set priorities and lead the work; we help equip and support them.',
    },
    {
      title: 'Evidence over assumption',
      body: 'We measure what we do and share honest results — even when they are modest.',
    },
    {
      title: 'Inclusion',
      body: 'Children, youth, women and elders all have a role in the environmental decisions that affect them.',
    },
    {
      title: 'Long-term thinking',
      body: 'We plan for seasons and generations, not single events.',
    },
  ],
  approach: [
    {
      step: 'Identify',
      description:
        'Work with communities to understand local environmental challenges and the resources already present.',
    },
    {
      step: 'Educate',
      description:
        'Share practical knowledge through schools, clubs and community sessions so people can act with confidence.',
    },
    {
      step: 'Act',
      description:
        'Run hands-on projects — planting, recycling, farming, harvesting — that turn knowledge into visible change.',
    },
    {
      step: 'Sustain',
      description:
        'Hand ownership to the community, document what worked, and help the work continue beyond our involvement.',
    },
  ],
  // TODO: Client to confirm official contact details before launch.
  contact: {
    email: 'hello@futurenowafrica.org', // placeholder — replace with approved address
    phone: '', // TODO: provide approved contact number
    operatingArea: 'Communities across Africa — specific regions to be confirmed.',
    // TODO: confirm official social handles
    social: [
      { label: 'Facebook', href: '' },
      { label: 'Instagram', href: '' },
      { label: 'X (Twitter)', href: '' },
    ],
  },
};
