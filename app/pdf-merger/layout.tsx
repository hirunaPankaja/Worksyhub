// src/app/pdf-merger/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free PDF Merger - Combine PDFs Offline | WorksyHub',
  description:
    'Combine multiple PDF files into one. Our free online PDF merger works 100% in your browser. No file uploads, no watermarks, and completely private.',
  keywords: [
    'pdf merger',
    'combine pdf',
    'merge pdf',
    'pdf joiner',
    'free pdf merger',
    'offline pdf merger',
    'client-side',
    'no upload',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/pdf-merger',
  },
  openGraph: {
    title: 'Free Client-Side PDF Merger | WorksyHub',
    description:
      'Combine multiple PDF files into a single document instantly in your browser. 100% private, no uploads.',
    url: 'https://worksyhub.online/pdf-merger',
  },
};

export default function PDFMergerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PDF Merger',
    description:
      'A free online tool to merge multiple PDF files into one. All processing is done client-side, no files are uploaded.',
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
        name: 'PDF Merger',
        item: 'https://worksyhub.online/pdf-merger',
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