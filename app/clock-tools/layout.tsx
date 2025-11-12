// src/app/clock-tools/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Clock & Stopwatch - Free Online Tools | WorksyHub',
  description:
    'Free online world clock to check time in any city (UTC, EST, PST, etc.) and a high-precision stopwatch with lap timer. Simple and easy-to-use clock tools.',
  keywords: [
    'world clock',
    'stopwatch',
    'online stopwatch',
    'lap timer',
    'current time',
    'time zones',
    'clock tool',
    'digital clock',
    'analog clock',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/clock-tools',
  },
  openGraph: {
    title: 'World Clock & Stopwatch | WorksyHub',
    description:
      'Check current time worldwide and use a precision stopwatch with lap functionality. Free, fast, and private online tools.',
    url: 'https://worksyhub.online/clock-tools',
  },
};

export default function ClockToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'World Clock & Stopwatch',
    description:
      'Free online world clock for multiple time zones and a high-precision stopwatch with lap timer.',
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