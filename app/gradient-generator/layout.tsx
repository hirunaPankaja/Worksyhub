// src/app/gradient-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free CSS Gradient Generator (Linear, Radial) | WorksyHub',
  description:
    'Create beautiful CSS gradients instantly. A free online tool to generate linear and radial gradients and get the CSS, Flutter, and React Native code.',
  keywords: [
    'css gradient generator',
    'gradient generator',
    'linear-gradient',
    'radial-gradient',
    'css gradient',
    'flutter gradient',
    'react native gradient',
    'design tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/gradient-generator',
  },
  openGraph: {
    title: 'Free CSS Gradient Generator | WorksyHub',
    description:
      'Create custom linear and radial gradients and get the code for CSS, Flutter, and React Native.',
    url: 'https://worksyhub.online/gradient-generator',
  },
};

export default function GradientGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CSS Gradient Generator',
    description:
      'A free online tool to generate linear and radial gradients and get the CSS, Flutter, and React Native code.',
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
        name: 'Gradient Generator',
        item: 'https://worksyhub.online/gradient-generator',
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