// src/app/mood-tracker/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Mood Tracker & Journal | WorksyHub',
  description:
    'A 100% private online mood tracker and journal. Log your daily mood and notes. All data stays on your device, nothing is uploaded to a server.',
  keywords: [
    'mood tracker',
    'mood journal',
    'daily mood',
    'mental health tracker',
    'private journal',
    'local storage',
    'lifestyle tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/mood-tracker',
  },
  openGraph: {
    title: 'Free & Private Mood Tracker | WorksyHub',
    description:
      'Log your daily mood and notes with this 100% private tool. All data is saved locally on your device.',
    url: 'https://worksyhub.online/mood-tracker',
  },
};

export default function MoodTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Private Mood Tracker',
    description:
      'A free online mood tracker and journal that saves all data locally to the user\'s device for 100% privacy.',
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
        name: 'Mood Tracker',
        item: 'https://worksyhub.online/mood-tracker',
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