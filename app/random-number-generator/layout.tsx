// src/app/random-number-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Random Number Generator (RNG) | WorksyHub',
  description:
    'Generate a random number between a custom range (min and max). Free, fast, and easy-to-use online RNG tool.',
  keywords: [
    'random number generator',
    'rng',
    'random number',
    'generate random number',
    'min max random',
    'fun tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/random-number-generator',
  },
  openGraph: {
    title: 'Free Random Number Generator | WorksyHub',
    description:
      'Instantly generate a random number within a custom minimum and maximum range.',
    url: 'https://worksyhub.online/random-number-generator',
  },
};

export default function RNGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Random Number Generator',
    description:
      'A free online tool to generate a random number between a specified minimum and maximum value.',
    applicationCategory: 'UtilityApplication',
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
        name: 'Random Number Generator',
        item: 'https://worksyhub.online/random-number-generator',
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