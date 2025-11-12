// src/app/quote-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Quote Generator | WorksyHub',
  description:
    'Get inspired with a random quote from famous authors, philosophers, and thinkers. Free, simple, and easy to use.',
  keywords: [
    'quote generator',
    'random quote',
    'inspirational quotes',
    'famous quotes',
    'daily quote',
    'fun tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/quote-generator',
  },
  openGraph: {
    title: 'Random Quote Generator | WorksyHub',
    description: 'Get inspired with a new random quote every time you click.',
    url: 'https://worksyhub.online/quote-generator',
  },
};

export default function QuoteGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Random Quote Generator',
    description:
      'A free online tool to generate random inspirational and famous quotes.',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://worksyhub.online',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Quote Generator',
        item: 'https://worksyhub.online/quote-generator',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}