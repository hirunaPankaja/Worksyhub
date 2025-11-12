// src/app/measurement-converter/layout.tsx
import type { Metadata } from 'next';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Free Measurement Converter - Length, Weight, Temp & More',
  description:
    'Use our free measurement converter to instantly convert units for length, weight, temperature, area, speed, and volume. (e.g., meters to feet, kg to lbs, C to F).',
  keywords: [
    'measurement converter',
    'unit converter',
    'convert length',
    'convert weight',
    'convert temperature',
    'convert area',
    'convert speed',
    'convert volume',
    'meters to feet',
    'kg to lbs',
    'celsius to fahrenheit',
    'worksyhub',
  ],
  // ⚠️ Add canonical URL if this is your main converter page
  // canonical: 'https://worksyhub.online/measurement-converter',
};

// --- JSON-LD SCHEMA FOR SEO ---
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Measurement Converter',
  description: 'A free online tool to convert various units of measurement including length, weight, temperature, area, speed, and volume.',
  applicationCategory: 'Utilities',
  operatingSystem: 'Any', // Web-based
  url: 'https://worksyhub.online/measurement-converter', // ⚠️ Update this URL
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  publisher: {
    '@type': 'Organization',
    name: 'WorksyHub',
    url: 'https://worksyhub.online', // ⚠️ Update this URL
  },
};

export default function MeasurementConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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