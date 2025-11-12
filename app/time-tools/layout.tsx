// src/app/time-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Zone Converter & Date Calculator - Free Online Tools',
  description:
    'Free time zone converter, age calculator, days between dates calculator, countdown timer, and Unix timestamp converter. Convert time zones instantly between UTC, EST, PST, GMT, and more.',
  keywords: [
    'time zone converter',
    'age calculator',
    'days between dates',
    'countdown timer',
    'unix timestamp converter',
    'world clock',
    'time converter',
    'date calculator',
    'timezone tool',
    'UTC converter',
    'EST to PST',
    'time difference calculator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/time-converter',
  },
  openGraph: {
    title: 'Time Zone Converter & Date Tools | WorksyHub',
    description:
      'Convert time zones, calculate age, count days between dates, and more. Free online time and date tools.',
    url: 'https://worksyhub.online/time-converter',
  },
};

export default function TimeConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Time Zone Converter & Date Calculator',
    description:
      'Free online time zone converter and date calculation tools including age calculator, days between dates, countdown timer',
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