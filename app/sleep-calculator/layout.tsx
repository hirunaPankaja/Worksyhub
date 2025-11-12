// src/app/sleep-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sleep Cycle Calculator - When to Wake Up? | WorksyHub',
  description:
    'Free online sleep cycle calculator. Find the best time to wake up or go to bed based on 90-minute sleep cycles. Wake up refreshed.',
  keywords: [
    'sleep calculator',
    'sleep cycle calculator',
    'when to wake up',
    'when to go to bed',
    'rem sleep calculator',
    '90 minute sleep cycle',
    'health tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/sleep-calculator',
  },
  openGraph: {
    title: 'Free Sleep Cycle Calculator | WorksyHub',
    description:
      'Find the best time to wake up or go to bed based on 90-minute sleep cycles.',
    url: 'https://worksyhub.online/sleep-calculator',
  },
};

export default function SleepCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sleep Cycle Calculator',
    description:
      'A free online tool to calculate the best times to sleep or wake up based on natural 90-minute sleep cycles.',
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
        name: 'Sleep Calculator',
        item: 'https://worksyhub.online/sleep-calculator',
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