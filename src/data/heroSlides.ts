import type { RoutePath } from '@/router-state';

export type HeroSlideData = {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: {
    pexelsId: number;
    alt: string;
    objectPosition: string;
  };
  primary: { label: string; to: RoutePath };
  secondary?: { label: string; to: RoutePath };
};

/**
 * Photographs are licensed Pexels images referenced by URL. They are stock placeholders
 * and do not depict FutureNow Africa's own activities. Replace with approved photography
 * (with safeguarding consent for identifiable children) before launch.
 */
export const heroSlides: HeroSlideData[] = [
  {
    id: 'environmental-education',
    eyebrow: 'Environmental Education',
    headline: 'Empowering a Generation to Protect Our Planet',
    description:
      'Building environmental awareness and practical knowledge among children, young people, and communities.',
    image: {
      pexelsId: 25457343,
      alt: 'African schoolchildren learning in an outdoor class setting (stock placeholder, not an actual FutureNow Africa activity)',
      objectPosition: '50% 40%',
    },
    primary: { label: 'Explore Our Programs', to: '/programs' },
    secondary: { label: 'About FutureNow Africa', to: '/about' },
  },
  {
    id: 'waste-recycling',
    eyebrow: 'Waste Collection and Recycling',
    headline: 'Turn Waste Into Opportunity',
    description:
      'Promoting responsible waste management and community-led solutions for cleaner, healthier environments.',
    image: {
      pexelsId: 37638737,
      alt: 'Community members clearing a path through greenery in Uganda (stock placeholder, not an actual FutureNow Africa activity)',
      objectPosition: '50% 60%',
    },
    primary: { label: 'Explore Our Programs', to: '/programs' },
  },
  {
    id: 'sustainable-agriculture',
    eyebrow: 'Urban Farming and Sustainable Agriculture',
    headline: 'Grow Sustainably. Thrive Together.',
    description:
      'Encouraging sustainable agriculture, urban farming, and practical livelihood opportunities that support resilient communities.',
    image: {
      pexelsId: 18468251,
      alt: 'African woman planting a seedling in a garden (stock placeholder, not an actual FutureNow Africa activity)',
      objectPosition: '50% 50%',
    },
    primary: { label: 'Discover Our Programs', to: '/programs' },
  },
  {
    id: 'water-conservation',
    eyebrow: 'Rainwater Harvesting and Water Conservation',
    headline: 'Every Drop Shapes Our Future',
    description:
      'Promoting responsible water use, rainwater harvesting, and practical conservation for a more resilient future.',
    image: {
      pexelsId: 16566547,
      alt: 'Rural water well with a yellow container in Kitale, Kenya (stock placeholder, not an actual FutureNow Africa activity)',
      objectPosition: '50% 55%',
    },
    primary: { label: 'Learn About Our Mission', to: '/about' },
  },
  {
    id: 'tree-planting',
    eyebrow: 'Tree Planting and Ecosystem Restoration',
    headline: 'Plant Today. Protect Tomorrow.',
    description:
      'Encouraging tree planting, biodiversity protection, and community participation in restoring our natural environment.',
    image: {
      pexelsId: 40538756,
      alt: 'Young people planting a tree outdoors in Katsina, Nigeria (stock placeholder, not an actual FutureNow Africa activity)',
      objectPosition: '50% 45%',
    },
    primary: { label: 'Get Involved', to: '/get-involved' },
  },
  {
    id: 'climate-action',
    eyebrow: 'Climate Awareness and Action',
    headline: 'The Future of Africa Starts With Us',
    description:
      'Equipping communities with the knowledge and motivation to take meaningful action for a sustainable future.',
    image: {
      pexelsId: 31748020,
      alt: 'Group of children holding a Climate Action sign (stock placeholder, not an actual FutureNow Africa activity)',
      objectPosition: '50% 40%',
    },
    primary: { label: 'Join the Movement', to: '/get-involved' },
  },
];
