// src/app/color-picker/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Color Picker (HEX, RGB, HSL) | WorksyHub',
  description:
    'A free online color picker tool. Browse and pick colors, and get their HEX, RGB, and HSL values instantly. Perfect for designers and developers.',
  keywords: [
    'color picker',
    'online color picker',
    'hex color picker',
    'rgb color picker',
    'color wheel',
    'color tool',
    'design tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/color-picker',
  },
  openGraph: {
    title: 'Free Online Color Picker | WorksyHub',
    description:
      'A simple, large-format color picker to find the perfect HEX, RGB, or HSL color code.',
    url: 'https://worksyhub.online/color-picker',
  },
};

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Color Picker',
    description:
      'A free online tool to pick colors and get their corresponding HEX, RGB, and HSL values.',
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
        name: 'Color Picker',
        item: 'https://worksyhub.online/color-picker',
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