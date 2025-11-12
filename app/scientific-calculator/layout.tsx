// src/app/scientific-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Scientific Calculator | WorksyHub',
  description:
    'A free online scientific calculator with advanced functions: sin, cos, tan, log, ln, square root, and more. Keyboard support included.',
  keywords: [
    'scientific calculator',
    'online scientific calculator',
    'free scientific calculator',
    'trigonometry calculator',
    'log calculator',
    'advanced calculator',
    'math tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/scientific-calculator',
  },
  openGraph: {
    title: 'Free Online Scientific Calculator | WorksyHub',
    description:
      'Perform advanced math calculations with our free scientific calculator.',
    url: 'https://worksyhub.online/scientific-calculator',
  },
};

export default function ScientificCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Scientific Calculator',
    description:
      'A free online scientific calculator with advanced functions like trigonometry, logarithms, and powers.',
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
        name: 'Scientific Calculator',
        item: 'https://worksyhub.online/scientific-calculator',
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