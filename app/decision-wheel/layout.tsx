// src/app/decision-wheel/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Decision Wheel - Random Picker | WorksyHub',
  description:
    'Make random decisions easily with our free online decision wheel. Add your options, spin the wheel, and get a winner. Perfect for giveaways or choosing options.',
  keywords: [
    'decision wheel',
    'spinner wheel',
    'random picker',
    'random choice generator',
    'wheel of fortune',
    'prize wheel',
    'fun tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/decision-wheel',
  },
  openGraph: {
    title: 'Free Decision Spinner Wheel | WorksyHub',
    description:
      'A free, customizable spinner wheel to help you make random decisions or pick a winner.',
    url: 'https://worksyhub.online/decision-wheel',
  },
};

export default function DecisionWheelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Decision Wheel',
    description:
      'A free online spinner wheel to make random decisions, pick prizes, or choose winners.',
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
        name: 'Decision Wheel',
        item: 'https://worksyhub.online/decision-wheel',
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