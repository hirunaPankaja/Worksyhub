// src/app/lifestyle-tools/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lifestyle & Health Tools - Sleep Calculator, Mood Tracker | WorksyHub',
  description:
    'Free lifestyle tools: Calculate the best time to wake up or go to bed with the sleep cycle calculator. Track your daily mood privately with the local mood tracker.',
  keywords: [
    'lifestyle tools',
    'health tools',
    'sleep calculator',
    'sleep cycle calculator',
    'when to wake up',
    'mood tracker',
    'daily mood log',
    'mental health tools',
    'private mood journal',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/lifestyle-tools',
  },
  openGraph: {
    title: 'Free Lifestyle & Health Tools | WorksyHub',
    description:
      'Optimize your sleep with the sleep cycle calculator and track your mood privately with the local-first mood tracker.',
    url: 'https://worksyhub.online/lifestyle-tools',
  },
};

export default function LifestyleToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Lifestyle & Health Tools',
    description:
      'Free online tools to help manage lifestyle and health, including a sleep cycle calculator and a private mood tracker.',
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