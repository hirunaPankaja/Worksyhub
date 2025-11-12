// src/app/stopwatch/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Stopwatch with Laps | WorksyHub',
  description:
    'A free, simple, and accurate online stopwatch with a lap timer. Works perfectly for timing sports, work, or study sessions. Keyboard shortcuts enabled.',
  keywords: [
    'stopwatch',
    'online stopwatch',
    'lap timer',
    'timer',
    'stopwatch online',
    'timer stopwatch',
    'free stopwatch',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/stopwatch',
  },
  openGraph: {
    title: 'Free Online Stopwatch with Laps | WorksyHub',
    description:
      'A precise and easy-to-use online stopwatch with lap functionality.',
    url: 'https://worksyhub.online/stopwatch',
  },
};

export default function StopwatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online Stopwatch',
    description:
      'A free, simple, and accurate online stopwatch with a lap timer and keyboard shortcuts.',
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
        name: 'Stopwatch',
        item: 'https://worksyhub.online/stopwatch',
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