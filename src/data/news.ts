export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'Resource' | 'Update' | 'Story';
  readTime: string;
  /** DEMO content, not a real published article. Replace before launch. */
  isDemo: boolean;
};

/**
 * All items below are DEMO content for layout purposes only.
 * They must not be presented as real news, real stories or real project updates.
 * Replace with approved content before launch, or connect a CMS if approved.
 */
export const newsItems: NewsItem[] = [
  {
    id: 'demo-1',
    title: 'Understanding the basics of climate change',
    excerpt:
      'A plain-language primer for community sessions, what climate change is, why it matters here, and where local action fits in. (Demo content.)',
    date: '2026-09-01',
    category: 'Resource',
    readTime: '6 min read',
    isDemo: true,
  },
  {
    id: 'demo-2',
    title: 'Starting a school environmental club: a simple guide',
    excerpt:
      'Practical steps for teachers and students who want to start a green club, with example activities. (Demo content.)',
    date: '2026-09-08',
    category: 'Resource',
    readTime: '5 min read',
    isDemo: true,
  },
  {
    id: 'demo-3',
    title: 'Community story: turning a vacant lot into a garden',
    excerpt:
      'A demo story showing how project updates will be presented here once approved stories are supplied. (Demo content.)',
    date: '2026-09-15',
    category: 'Story',
    readTime: '4 min read',
    isDemo: true,
  },
  {
    id: 'demo-4',
    title: 'Project update: recycling point, what a real update could look like',
    excerpt:
      'A demo project update illustrating the layout for sharing milestones once approved data is available. (Demo content.)',
    date: '2026-09-22',
    category: 'Update',
    readTime: '3 min read',
    isDemo: true,
  },
];
