// src/app/design-tools/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Tools - Picker, Gradient Generator, Converter | WorksyHub',
  description:
    'Free design tools for creatives. Includes an advanced color picker, CSS gradient generator, and a color converter (HEX to RGB, RGB to HSL).',
  keywords: [
    'color tools',
    'color picker',
    'gradient generator',
    'css gradient',
    'hex to rgb',
    'rgb to hsl',
    'color converter',
    'design tools',
    'color palette generator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/design-tools',
  },
  openGraph: {
    title: 'Free Color & Design Tools | WorksyHub',
    description:
      'Pick colors, generate beautiful CSS gradients, and convert between HEX, RGB, and HSL formats instantly.',
    url: 'https://worksyhub.online/design-tools',
  },
};

export default function DesignToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Design & Color Tools',
    description:
      'A collection of free online design tools including a color picker, CSS gradient generator, and HEX/RGB/HSL color converter.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

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