// src/app/base64-encoder-decoder/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder | WorksyHub',
  description:
    'Free online Base64 tool. Encode plain text to Base64 or decode Base64 to plain text. Supports UTF-8 and special characters.',
  keywords: [
    'base64 encode',
    'base64 decode',
    'base64 converter',
    'base64 to text',
    'text to base64',
    'coding tools',
    'developer tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/base64-encoder-decoder',
  },
  openGraph: {
    title: 'Free Base64 Encoder & Decoder | WorksyHub',
    description:
      'Instantly encode text to Base64 or decode Base64 back to text with UTF-8 support.',
    url: 'https://worksyhub.online/base64-encoder-decoder',
  },
};

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Base64 Encoder & Decoder',
    description:
      'A free online tool to encode plain text into Base64 and decode Base64 back into text.',
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
        name: 'Base64 Encoder/Decoder',
        item: 'https://worksyhub.online/base64-encoder-decoder',
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