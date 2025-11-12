// src/app/unix-timestamp/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter - Epoch Time | WorksyHub',
  description:
    'Free online Unix timestamp converter. Convert Unix time (Epoch time) to a human-readable date and time, or convert a date to a Unix timestamp.',
  keywords: [
    'unix timestamp converter',
    'epoch time',
    'unix time',
    'convert unix to date',
    'convert date to unix',
    'timestamp converter',
    'developer tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/unix-timestamp',
  },
  openGraph: {
    title: 'Unix Timestamp Converter | WorksyHub',
    description:
      'Instantly convert Unix/Epoch time to a readable date, or a date to a timestamp.',
    url: 'https://worksyhub.online/unix-timestamp',
  },
};

export default function UnixTimestampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Unix Timestamp Converter',
    description:
      'Free online tool to convert Unix time (Epoch time) to a human-readable date and vice-versa.',
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
        name: 'Unix Timestamp Converter',
        item: 'https://worksyhub.online/unix-timestamp',
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