// src/app/time-zone-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Time Zone Converter | WorksyHub',
  description:
    'Instantly convert time between different time zones. Free, fast, and easy-to-use world clock converter for UTC, EST, PST, GMT, and more.',
  keywords: [
    'time zone converter',
    'world clock',
    'time converter',
    'date calculator',
    'timezone tool',
    'UTC converter',
    'EST to PST',
    'time difference calculator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/time-zone-converter',
  },
  openGraph: {
    title: 'Free Time Zone Converter | WorksyHub',
    description:
      'Instantly convert time between global time zones like UTC, EST, PST, and more.',
    url: 'https://worksyhub.online/time-zone-converter',
  },
};

export default function TimeZoneConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Time Zone Converter',
    description:
      'Free online tool to convert time between international time zones instantly.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}