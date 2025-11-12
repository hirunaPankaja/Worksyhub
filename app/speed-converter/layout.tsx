// src/app/speed-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Speed Converter - km/h, mph, m/s, knots | WorksyHub',
  description:
    'Instantly convert speed units. Free online tool to convert kilometers per hour (km/h) to miles per hour (mph), meters per second (m/s) to km/h, and knots.',
  keywords: [
    'speed converter',
    'km/h to mph',
    'mph to km/h',
    'm/s to km/h',
    'knots to mph',
    'unit converter',
    'measurement converter',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/speed-converter',
  },
  openGraph: {
    title: 'Free Speed Converter | WorksyHub',
    description:
      'Instantly convert between km/h, mph, m/s, and knots with this free online speed tool.',
    url: 'https://worksyhub.online/speed-converter',
  },
};

export default function SpeedConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Speed Converter',
    description:
      'Free online tool to convert units of speed, such as kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), and knots.',
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
        name: 'Speed Converter',
        item: 'https://worksyhub.online/speed-converter',
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