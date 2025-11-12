// src/app/case-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Text Case Converter - Uppercase, Lowercase, Title Case | WorksyHub',
  description:
    'Instantly convert text to UPPERCASE, lowercase, Title Case, or Sentence case with our free online tool. 100% client-side and secure.',
  keywords: [
    'case converter',
    'text case converter',
    'uppercase',
    'lowercase',
    'title case',
    'sentence case',
    'convert text',
    'text tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/case-converter',
  },
  openGraph: {
    title: 'Free Text Case Converter | WorksyHub',
    description:
      'Easily convert your text between UPPERCASE, lowercase, Title Case, and Sentence case.',
    url: 'https://worksyhub.online/case-converter',
  },
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Text Case Converter',
    description:
      'A free online tool to convert text between different cases, such as UPPERCASE, lowercase, Title Case, and Sentence case.',
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
        name: 'Case Converter',
        item: 'https://worksyhub.online/case-converter',
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