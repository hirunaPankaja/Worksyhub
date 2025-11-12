// src/app/url-encoder-decoder/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder | WorksyHub',
  description:
    'Free online URL encoder and decoder. Convert text and special characters to URL-safe format (percent-encoding) or decode them back.',
  keywords: [
    'url encoder',
    'url decoder',
    'percent encoding',
    'url encode online',
    'url decode online',
    'developer tools',
    'text tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/url-encoder-decoder',
  },
  openGraph: {
    title: 'Free URL Encoder & Decoder | WorksyHub',
    description:
      'Instantly encode text into a URL-safe format or decode it back to plain text.',
    url: 'https://worksyhub.online/url-encoder-decoder',
  },
};

export default function URLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'URL Encoder & Decoder',
    description:
      'A free online tool to encode or decode text using percent-encoding for URLs.',
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
        name: 'URL Encoder/Decoder',
        item: 'https://worksyhub.online/url-encoder-decoder',
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