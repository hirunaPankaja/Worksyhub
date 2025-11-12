// src/app/word-counter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Word Counter & Character Counter Tool | WorksyHub',
  description:
    'Instantly count words and characters in your text. A free online tool for students, writers, and professionals. 100% client-side and private.',
  keywords: [
    'word counter',
    'character counter',
    'count words',
    'text counter',
    'word count tool',
    'character count tool',
    'text tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/word-counter',
  },
  openGraph: {
    title: 'Free Word & Character Counter | WorksyHub',
    description:
      'Instantly count words and characters in your text as you type.',
    url: 'https://worksyhub.online/word-counter',
  },
};

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Word & Character Counter',
    description:
      'A free online tool to count the number of words and characters in a block of text, updated in real-time.',
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
        name: 'Word Counter',
        item: 'https://worksyhub.online/word-counter',
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