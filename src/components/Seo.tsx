import { useEffect } from 'react';
import {
  getCanonicalUrl,
  getPageSeo,
  organizationStructuredData,
  SITE_URL,
  SOCIAL_IMAGE_URL,
  pageSeo,
} from '@/data/seo';
import { site } from '@/data/site';

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

export function Seo({ path }: { path: string }) {
  useEffect(() => {
    const metadata = getPageSeo(path);
    const canonicalUrl = getCanonicalUrl(path in pageSeo ? path : '/');
    const isIndexable = path in pageSeo;
    const pageUrl = isIndexable ? canonicalUrl : `${SITE_URL}/`;

    document.title = metadata.title;
    document.documentElement.lang = 'en';
    setCanonical(canonicalUrl);

    setMeta('name', 'description', metadata.description);
    setMeta('name', 'robots', isIndexable ? 'index,follow' : 'noindex,nofollow');
    setMeta('property', 'og:title', metadata.title);
    setMeta('property', 'og:description', metadata.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:site_name', site.name);
    setMeta('property', 'og:image', SOCIAL_IMAGE_URL);
    setMeta('property', 'og:image:alt', `${site.name} logo`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', metadata.title);
    setMeta('name', 'twitter:description', metadata.description);
    setMeta('name', 'twitter:image', SOCIAL_IMAGE_URL);

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      ...(path !== '/' && isIndexable
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: metadata.label,
              item: canonicalUrl,
            },
          ]
        : []),
    ];

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationStructuredData,
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: site.name,
          description: site.intro,
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: metadata.title,
          description: metadata.description,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#organization` },
        },
        ...(isIndexable && path !== '/'
          ? [
              {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumb`,
                itemListElement: breadcrumbItems,
              },
            ]
          : []),
      ],
    };

    let script = document.head.querySelector<HTMLScriptElement>(
      'script[data-seo-structured-data="true"]',
    );
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoStructuredData = 'true';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [path]);

  return null;
}
