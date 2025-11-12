// src/app/percentage-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Percentage Calculator | WorksyHub',
  description:
    'A free and easy-to-use online percentage calculator. Quickly calculate "what is X% of Y", percentages, and more.',
  keywords: [
    'percentage calculator',
    'percent calculator',
    'calculate percentage',
    'what is x percent of y',
    'math calculator',
    'free calculator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/percentage-calculator',
  },
  openGraph: {
    title: 'Free Percentage Calculator | WorksyHub',
    description: 'A simple online calculator for all your percentage calculations.',
    url: 'https://worksyhub.online/percentage-calculator',
  },
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Percentage Calculator',
    description:
      'A free online tool to easily calculate percentages, such as "what is X% of Y".',
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
        name: 'Percentage Calculator',
        item: 'https://worksyhub.online/percentage-calculator',
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