// src/app/weight-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Weight Converter - kg, lbs, oz, grams | WorksyHub',
  description:
    'Instantly convert weight units. Free online tool to convert kilograms (kg) to pounds (lbs), ounces (oz) to grams (g), tons to kg, and more.',
  keywords: [
    'weight converter',
    'kg to lbs',
    'lbs to kg',
    'ounces to grams',
    'grams to ounces',
    'unit converter',
    'mass converter',
    'measurement converter',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/weight-converter',
  },
  openGraph: {
    title: 'Free Weight & Mass Converter | WorksyHub',
    description:
      'Instantly convert between metric and imperial units of weight (e.g., kg, lbs, oz, g).',
    url: 'https://worksyhub.online/weight-converter',
  },
};

export default function WeightConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Weight Converter',
    description:
      'Free online tool to convert units of weight and mass, such as kilograms, pounds, ounces, and grams.',
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
        name: 'Weight Converter',
        item: 'https://worksyhub.online/weight-converter',
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