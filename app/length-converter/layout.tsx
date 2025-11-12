// src/app/length-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Length & Distance Converter | WorksyHub',
  description:
    'Instantly convert length and distance units. Free online tool to convert meters (m) to feet (ft), miles (mi) to kilometers (km), inches (in) to centimeters (cm), and more.',
  keywords: [
    'length converter',
    'distance converter',
    'meters to feet',
    'miles to km',
    'inches to cm',
    'unit converter',
    'measurement converter',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/length-converter',
  },
  openGraph: {
    title: 'Free Length & Distance Converter | WorksyHub',
    description:
      'Instantly convert between metric and imperial units of length (e.g., m, km, ft, mi, in).',
    url: 'https://worksyhub.online/length-converter',
  },
};

export default function LengthConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Length Converter',
    description:
      'Free online tool to convert units of length and distance, such as meters, feet, miles, and kilometers.',
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
        name: 'Length Converter',
        item: 'https://worksyhub.online/length-converter',
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