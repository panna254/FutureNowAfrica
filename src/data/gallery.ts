import { programmes } from '@/data/programmes';

export const galleryCategories = [
  'All Projects',
  'Environmental Education',
  'Waste Management & Recycling',
  'Sustainable Agriculture',
  'Water Conservation',
  'Tree Planting & Restoration',
  'Climate Action',
] as const;

export type GalleryFilter = (typeof galleryCategories)[number];
export type GalleryCategory = Exclude<GalleryFilter, 'All Projects'>;

export type GalleryItem = {
  id: string;
  src: string;
  fullSrc: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  caption: string;
  credit: string;
};

function getLargeImageUrl(src: string) {
  return src.replace('&h=650&w=940', '&w=1600');
}

const placeholderCredit =
  'Pexels stock image; temporary placeholder, not a verified FutureNow Africa project.';

export const galleryItems: GalleryItem[] = [
  {
    id: 'environmental-education-placeholder',
    src: programmes[0].image,
    fullSrc: getLargeImageUrl(programmes[0].image),
    alt: programmes[0].imageAlt,
    title: 'Environmental Education',
    category: 'Environmental Education',
    caption:
      'Temporary visual placeholder for environmental education activities.',
    credit: placeholderCredit,
  },
  {
    id: 'waste-management-placeholder',
    src: programmes[1].image,
    fullSrc: getLargeImageUrl(programmes[1].image),
    alt: programmes[1].imageAlt,
    title: 'Waste Management and Recycling',
    category: 'Waste Management & Recycling',
    caption:
      'Temporary visual placeholder for waste collection and recycling activities.',
    credit: placeholderCredit,
  },
  {
    id: 'sustainable-agriculture-placeholder',
    src: programmes[2].image,
    fullSrc: getLargeImageUrl(programmes[2].image),
    alt: programmes[2].imageAlt,
    title: 'Sustainable Agriculture',
    category: 'Sustainable Agriculture',
    caption:
      'Temporary visual placeholder for sustainable agriculture activities.',
    credit: placeholderCredit,
  },
  {
    id: 'water-conservation-placeholder',
    src: programmes[3].image,
    fullSrc: getLargeImageUrl(programmes[3].image),
    alt: programmes[3].imageAlt,
    title: 'Water Conservation',
    category: 'Water Conservation',
    caption:
      'Temporary visual placeholder for water conservation activities.',
    credit: placeholderCredit,
  },
  {
    id: 'tree-planting-placeholder',
    src: programmes[4].image,
    fullSrc: getLargeImageUrl(programmes[4].image),
    alt: programmes[4].imageAlt,
    title: 'Tree Planting and Restoration',
    category: 'Tree Planting & Restoration',
    caption:
      'Temporary visual placeholder for tree planting and restoration activities.',
    credit: placeholderCredit,
  },
  {
    id: 'climate-action-placeholder',
    src: programmes[5].image,
    fullSrc: getLargeImageUrl(programmes[5].image),
    alt: programmes[5].imageAlt,
    title: 'Climate Action',
    category: 'Climate Action',
    caption: 'Temporary visual placeholder for climate action activities.',
    credit: placeholderCredit,
  },
];
