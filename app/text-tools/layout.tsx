// src/app/text-tools/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text & Coding Tools - JSON, Base64, URL, Lorem Ipsum | WorksyHub',
  description:
    'Free developer tools: JSON formatter & beautifier, Base64 encoder & decoder, URL encoder & decoder, and a Lorem Ipsum text generator.',
  keywords: [
    'text tools',
    'coding tools',
    'json formatter',
    'json beautifier',
    'base64 encode',
    'base64 decode',
    'url encoder',
    'url decoder',
    'lorem ipsum generator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/text-tools',
  },
  openGraph: {
    title: 'Free Text & Coding Utilities | WorksyHub',
    description:
      'Format JSON, encode/decode Base64, encode/decode URLs, and generate Lorem Ipsum placeholder text instantly.',
    url: 'https://worksyhub.online/text-tools',
  },
};

export default function TextToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Text & Coding Utilities',
    description:
      'Free online tools for developers, including JSON formatter, Base64 encoder/decoder, URL encoder/decoder, and Lorem Ipsum generator.',
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