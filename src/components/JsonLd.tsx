import { useEffect } from 'react';
import { insertJsonLd, removeJsonLdById } from '../lib/seo';

interface JsonLdProps {
  id: string;
  data: Record<string, unknown>;
}

export default function JsonLd({ id, data }: JsonLdProps) {
  const dataStr = JSON.stringify(data);

  useEffect(() => {
    insertJsonLd(id, JSON.parse(dataStr));
    return () => removeJsonLdById(id);
  }, [id, dataStr]);

  return null;
}

/* ─── Pre-built Schemas ──────────────────────────────────────────────── */

export function OrganizationJsonLd() {
  return (
    <JsonLd
      id="jsonld-organization"
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Nagriva',
        url: 'https://nagriva.com',
        logo: 'https://nagriva.com/favicon.png',
        description: 'AI Agent Platform that enables businesses to create, deploy, and manage AI Employees in minutes.',
        sameAs: [
          'https://twitter.com/nagriva',
          'https://linkedin.com/company/nagriva',
        ],
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      id="jsonld-website"
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nagriva',
        url: 'https://nagriva.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://nagriva.com/#/blog?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function BlogJsonLd({ count }: { count: number }) {
  return (
    <JsonLd
      id="jsonld-blog"
      data={{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Nagriva Blog',
        url: 'https://nagriva.com/#/blog',
        description: 'Insights, tutorials and resources about AI Employees, automation, productivity and business growth.',
        blogPost: {
          '@type': 'ItemList',
          numberOfItems: count,
        },
      }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  image,
  url,
  datePublished,
  dateModified,
  author,
  category,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  category: string;
}) {
  return (
    <JsonLd
      id="jsonld-blogposting"
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image,
        url,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Nagriva',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nagriva.com/favicon.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        articleSection: category,
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <JsonLd
      id="jsonld-breadcrumb"
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
