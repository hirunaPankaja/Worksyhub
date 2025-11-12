// src/app/productivity-tools/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productivity Tools - Password, QR Code, Case Converter | WorksyHub',
  description:
    'Free productivity tools: secure random password generator, QR code generator (works offline), text case converter (uppercase, lowercase), and word/character counter.',
  keywords: [
    'productivity tools',
    'password generator',
    'qr code generator',
    'text case converter',
    'word counter',
    'character counter',
    'free online tools',
    'uppercase to lowercase',
    'title case converter',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/productivity-tools',
  },
  openGraph: {
    title: 'Free Productivity Tools | WorksyHub',
    description:
      'Generate secure passwords, create QR codes, convert text case, and count words/characters instantly.',
    url: 'https://worksyhub.online/productivity-tools',
  },
};

export default function ProductivityToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Productivity Tools',
    description:
      'A collection of free online productivity tools including a password generator, QR code generator, text case converter, and word counter.',
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