// src/app/password-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Password Generator (Random & Memorable) | WorksyHub',
  description:
    'Generate strong, secure, and random passwords. Or, create a memorable password from your own keywords. 100% client-side and secure.',
  keywords: [
    'password generator',
    'secure password generator',
    'random password generator',
    'memorable password generator',
    'passphrase generator',
    'create password',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/password-generator',
  },
  openGraph: {
    title: 'Secure Password Generator | WorksyHub',
    description:
      'Generate strong random passwords or create memorable passphrases from keywords.',
    url: 'https://worksyhub.online/password-generator',
  },
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Secure Password Generator',
    description:
      'A free online tool to generate strong, random passwords or memorable passphrases based on user keywords.',
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
        name: 'Password Generator',
        item: 'https://worksyhub.online/password-generator',
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