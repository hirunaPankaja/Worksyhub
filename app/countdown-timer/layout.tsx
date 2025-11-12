// src/app/countdown-timer/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Countdown Timer - Count Down to Any Date | WorksyHub',
  description:
    'Free online countdown timer. Set a future date and time to see the remaining days, hours, and minutes. Perfect for events, holidays, or deadlines.',
  keywords: [
    'countdown timer',
    'countdown clock',
    'days until',
    'time until',
    'event countdown',
    'date calculator',
    'time tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/countdown-timer',
  },
  openGraph: {
    title: 'Free Online Countdown Timer | WorksyHub',
    description:
      'Count down to any date and time with this free online timer.',
    url: 'https://worksyhub.online/countdown-timer',
  },
};

export default function CountdownTimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Countdown Timer',
    description:
      'Free online tool to create a countdown to any specific date and time.',
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
        name: 'Countdown Timer',
        item: 'https://worksyhub.online/countdown-timer',
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