// src/app/days-between-dates/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Days Between Dates Calculator | WorksyHub',
  description:
    'Free online calculator to find the number of days between two dates. Instantly calculate the duration, count days, and track time for events or deadlines.',
  keywords: [
    'days between dates',
    'date calculator',
    'day counter',
    'duration calculator',
    'how many days until',
    'date difference',
    'time tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/days-between-dates',
  },
  openGraph: {
    title: 'Days Between Dates Calculator | WorksyHub',
    description:
      'Instantly calculate the number of days between any two dates.',
    url: 'https://worksyhub.online/days-between-dates',
  },
};

export default function DaysBetweenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Days Between Dates Calculator',
    description:
      'Free online tool to calculate the exact number of days between two dates.',
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
        name: 'Days Between Dates Calculator',
        item: 'https://worksyhub.online/days-between-dates',
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