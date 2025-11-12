// src/app/lorem-ipsum-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Free Placeholder Text | WorksyHub',
  description:
    'Generate Lorem Ipsum placeholder text for your designs. Select the number of paragraphs, sentences, or words you need and copy instantly.',
  keywords: [
    'lorem ipsum generator',
    'placeholder text',
    'dummy text',
    'text generator',
    'design tools',
    'web design',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/lorem-ipsum-generator',
  },
  openGraph: {
    title: 'Free Lorem Ipsum Placeholder Text Generator | WorksyHub',
    description:
      'Quickly generate placeholder text (Lorem Ipsum) in paragraphs, sentences, or words.',
    url: 'https://worksyhub.online/lorem-ipsum-generator',
  },
};

export default function LoremIpsumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Lorem Ipsum Generator',
    description:
      'A free online tool to generate Lorem Ipsum placeholder text by paragraph, sentence, or word.',
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
        name: 'Lorem Ipsum Generator',
        item: 'https://worksyhub.online/lorem-ipsum-generator',
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