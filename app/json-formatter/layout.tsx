// src/app/json-formatter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator | WorksyHub',
  description:
    'Free online JSON Formatter and Beautifier. Paste your minified or messy JSON to validate, format, and make it readable. 100% client-side.',
  keywords: [
    'json formatter',
    'json beautifier',
    'json validator',
    'format json',
    'json viewer',
    'json tool',
    'developer tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/json-formatter',
  },
  openGraph: {
    title: 'Free JSON Formatter & Validator | WorksyHub',
    description:
      'Instantly validate, format, and beautify your JSON data for free. Works 100% in your browser.',
    url: 'https://worksyhub.online/json-formatter',
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JSON Formatter',
    description:
      'A free online tool to validate, format, beautify, and minify JSON data.',
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
        name: 'JSON Formatter',
        item: 'https://worksyhub.online/json-formatter',
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