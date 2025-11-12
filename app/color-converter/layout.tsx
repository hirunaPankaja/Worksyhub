// src/app/color-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Color Converter - HEX, RGB, HSL | WorksyHub',
  description:
    'Instantly convert color codes between HEX, RGB, and HSL formats. A free online tool for designers and developers to manage color values.',
  keywords: [
    'color converter',
    'hex to rgb',
    'rgb to hex',
    'hex to hsl',
    'hsl to rgb',
    'color code converter',
    'css color converter',
    'design tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/color-converter',
  },
  openGraph: {
    title: 'Free Color Converter (HEX, RGB, HSL) | WorksyHub',
    description:
      'A free, real-time tool to convert color codes between HEX, RGB, and HSL formats.',
    url: 'https://worksyhub.online/color-converter',
  },
};

export default function ColorConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Color Converter',
    description:
      'A free online tool to convert color codes between HEX, RGB, and HSL formats in real-time.',
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
        name: 'Color Converter',
        item: 'https://worksyhub.online/color-converter',
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