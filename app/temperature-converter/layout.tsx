// src/app/temperature-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Temperature Converter - C to F, F to C, Kelvin | WorksyHub',
  description:
    'Instantly convert temperature units. Free online tool to convert Celsius (°C) to Fahrenheit (°F), Fahrenheit to Celsius, and to/from Kelvin (K).',
  keywords: [
    'temperature converter',
    'celsius to fahrenheit',
    'fahrenheit to celsius',
    'c to f',
    'f to c',
    'kelvin converter',
    'unit converter',
    'measurement converter',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/temperature-converter',
  },
  openGraph: {
    title: 'Free Temperature Converter | WorksyHub',
    description:
      'Instantly convert between Celsius, Fahrenheit, and Kelvin temperature scales.',
    url: 'https://worksyhub.online/temperature-converter',
  },
};

export default function TemperatureConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Temperature Converter',
    description:
      'Free online tool to convert temperature units, including Celsius, Fahrenheit, and Kelvin.',
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
        name: 'Temperature Converter',
        item: 'https://worksyhub.online/temperature-converter',
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