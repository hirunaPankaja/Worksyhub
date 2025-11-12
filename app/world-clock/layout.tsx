// src/app/world-clock/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Clock - Check Current Local Time Anywhere | WorksyHub',
  description:
    'Free online world clock. Check the current local time in cities worldwide, including New York (EST), London (GMT), Tokyo (JST), and more. Features analog and digital views.',
  keywords: [
    'world clock',
    'current time',
    'local time',
    'time zones',
    'est time',
    'pst time',
    'gmt time',
    'analog clock',
    'digital clock',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/world-clock',
  },
  openGraph: {
    title: 'Free Online World Clock | WorksyHub',
    description:
      'Check the current local time in major cities across all time zones.',
    url: 'https://worksyhub.online/world-clock',
  },
};

export default function WorldClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'World Clock',
    description:
      'Free online world clock to check the current local time in cities worldwide with analog and digital views.',
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
        name: 'World Clock',
        item: 'https://worksyhub.online/world-clock',
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