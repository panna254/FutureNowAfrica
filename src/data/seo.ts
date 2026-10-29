import { site } from '@/data/site';
import type { RoutePath } from '@/router-state';

// This is the supplied production hostname. Replace it if the organization
// adopts an official domain before launch.
export const SITE_URL = 'https://future-now-africa-eapa.vercel.app';
export const SOCIAL_IMAGE_URL = `${SITE_URL}/assets/branding/futurenow-africa-logo.svg`;

export type PageSeo = {
  title: string;
  description: string;
  label: string;
};

export const pageSeo: Record<RoutePath, PageSeo> = {
  '/': {
    title: 'FutureNow Africa | Environmental Education & Community Action',
    description:
      'FutureNow Africa works with schools, youth groups and neighbourhoods on community-led environmental education, conservation and climate action across Africa.',
    label: 'Home',
  },
  '/about': {
    title: 'About FutureNow Africa | Our Mission and Vision',
    description:
      'Learn about FutureNow Africa\'s mission, vision and community-led approach to environmental education, conservation and sustainable livelihoods.',
    label: 'About Us',
  },
  '/programs': {
    title: 'Environmental Programmes | FutureNow Africa',
    description:
      'Explore FutureNow Africa\'s environmental programmes covering education, recycling, sustainable agriculture, water conservation, restoration and climate action.',
    label: 'Our Programs',
  },
  '/impact': {
    title: 'Our Impact | FutureNow Africa',
    description:
      'See how FutureNow Africa approaches evidence, verified outcomes and honest reporting for community-led environmental action.',
    label: 'Our Impact',
  },
  '/gallery': {
    title: 'Project Gallery | FutureNow Africa',
    description:
      'Browse FutureNow Africa\'s environmental activity image library, with temporary stock placeholders clearly identified until approved project photographs are available.',
    label: 'Gallery',
  },
  '/get-involved': {
    title: 'Get Involved | FutureNow Africa',
    description:
      'Find ways to volunteer, support, partner with or participate in FutureNow Africa\'s community-led environmental work.',
    label: 'Get Involved',
  },
  '/news': {
    title: 'News & Resources | FutureNow Africa',
    description:
      'Explore FutureNow Africa\'s environmental education resources, climate primers and approved project updates as content becomes available.',
    label: 'News & Resources',
  },
  '/contact': {
    title: 'Contact FutureNow Africa',
    description:
      'Contact FutureNow Africa about environmental programmes, partnerships, volunteering and community participation.',
    label: 'Contact Us',
  },
};

export function getPageSeo(path: string) {
  return (
    pageSeo[path as RoutePath] ?? {
      title: 'Page not found | FutureNow Africa',
      description: 'The requested FutureNow Africa page could not be found.',
      label: 'Page not found',
    }
  );
}

export function getCanonicalUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}

export const organizationStructuredData = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: site.name,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: SOCIAL_IMAGE_URL,
  },
  description: site.intro,
};
