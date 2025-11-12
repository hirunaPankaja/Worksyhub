// src/app/volume-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Volume Converter - Liters, Gallons, Cups, oz | WorksyHub',
  description:
    'Instantly convert volume units. Free online tool to convert liters (L) to gallons (gal), milliliters (mL) to fluid ounces (fl oz), cups to liters, and more.',
  keywords: [
    'volume converter',
    'liters to gallons',
    'gallons to liters',
    'ml to fl oz',
    'cups to liters',
    'unit converter',
    'measurement converter',
    'liquid converter',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/volume-converter',
  },
  openGraph: {
    title: 'Free Volume Converter | WorksyHub',
    description:
      'Instantly convert between metric and imperial volume units (e.g., liters, gallons, ml, cups).',
    url: 'https://worksyhub.online/volume-converter',
  },
};

export default function VolumeConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Volume Converter',
    description:
      'Free online tool to convert units of volume, such as liters, gallons, milliliters, cups, and fluid ounces.',
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
        name: 'Volume Converter',
        item: 'https://worksyhub.online/volume-converter',
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