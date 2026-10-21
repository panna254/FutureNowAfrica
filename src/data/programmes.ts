import {
  BookOpen,
  Recycle,
  Sprout,
  Droplets,
  TreePine,
  Globe2,
  type LucideIcon,
} from 'lucide-react';

export type Programme = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
};

/**
 * NOTE: Photos are licensed stock imagery (Pexels) used as replaceable placeholders.
 * They do not depict actual FutureNow Africa projects. Replace with supplied/
 * licensed photography of real programmes before launch.
 */
export const programmes: Programme[] = [
  {
    slug: 'environmental-education',
    title: 'Environmental Education',
    tagline: 'Knowledge that grows into action',
    description:
      'Workshops, school clubs and community sessions that build environmental literacy — helping children, youth and families understand local ecosystems and the choices that protect them.',
    icon: BookOpen,
    image:
      'https://images.pexels.com/photos/12448839/pexels-photo-12448839.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Children in a classroom engaged in learning — placeholder, not an actual FutureNow Africa project',
  },
  {
    slug: 'waste-collection-recycling',
    title: 'Waste Collection and Recycling',
    tagline: 'Cleaner communities, circular livelihoods',
    description:
      'Community-led collection drives and recycling points that keep neighbourhoods clean while creating small income opportunities from sorted plastic, paper and metal.',
    icon: Recycle,
    image:
      'https://images.pexels.com/photos/38117883/pexels-photo-38117883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Person sorting plastic bottles for recycling — placeholder, not an actual FutureNow Africa project',
  },
  {
    slug: 'urban-farming-sustainable-agriculture',
    title: 'Urban Farming and Sustainable Agriculture',
    tagline: 'Food security, grown close to home',
    description:
      'Backyard, school and community gardens that model regenerative practices, improve household nutrition and equip young people with practical growing skills.',
    icon: Sprout,
    image:
      'https://images.pexels.com/photos/34411687/pexels-photo-34411687.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Farmer inspecting plants in a field — placeholder, not an actual FutureNow Africa project',
  },
  {
    slug: 'rainwater-harvesting-water-conservation',
    title: 'Rainwater Harvesting and Water Conservation',
    tagline: 'Every drop, made to count',
    description:
      'Low-cost harvesting systems and water-wise practices that help households and schools capture, store and use rainwater — easing pressure on local supply.',
    icon: Droplets,
    image:
      'https://images.pexels.com/photos/17991182/pexels-photo-17991182.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Close-up of dew droplets on a green leaf — placeholder, not an actual FutureNow Africa project',
  },
  {
    slug: 'tree-planting-ecosystem-restoration',
    title: 'Tree Planting and Ecosystem Restoration',
    tagline: 'Roots for the next generation',
    description:
      'Community planting days and restoration of degraded green spaces that rebuild shade, soil and habitat — one tree, one school, one neighbourhood at a time.',
    icon: TreePine,
    image:
      'https://images.pexels.com/photos/11130997/pexels-photo-11130997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Two young people planting a tree outdoors — placeholder, not an actual FutureNow Africa project',
  },
  {
    slug: 'climate-awareness-action',
    title: 'Climate Awareness and Action',
    tagline: 'Local voices, climate decisions',
    description:
      'Campaigns, youth dialogues and public events that connect everyday community action to the wider climate story — making climate change understandable and addressable.',
    icon: Globe2,
    image:
      'https://images.pexels.com/photos/31748020/pexels-photo-31748020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Children holding a Climate Action sign — placeholder, not an actual FutureNow Africa project',
  },
];
