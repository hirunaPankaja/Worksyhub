// src/app/area-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Area Converter - Acres, Square Feet, Hectares | WorksyHub',
  description:
    'Instantly convert area units. Free online tool to convert acres to hectares, square feet (sq ft) to square meters (m²), and more.',
  keywords: [
    'area converter',
    'acre to hectare',
    'square feet to square meter',
    'sq ft to m2',
    'land area calculator',
    'unit converter',
    'measurement converter',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/area-converter',
  },
  openGraph: {
    title: 'Free Area Converter | WorksyHub',
    description:
      'Instantly convert between metric and imperial area units (e.g., acres, hectares, m², sq ft).',
    url: 'https://worksyhub.online/area-converter',
  },
};

export default function AreaConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Area Converter',
    description:
      'Free online tool to convert units of area, such as acres, hectares, square meters, and square feet.',
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
        name: 'Area Converter',
        item: 'https://worksyhub.online/area-converter',
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