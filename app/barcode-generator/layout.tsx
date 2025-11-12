// src/app/barcode-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Barcode Generator | WorksyHub',
  description:
    'Generate high-quality barcodes online for free. Create Code 128, UPC, EAN-13, and more. 100% client-side, fast, and downloadable as PNG.',
  keywords: [
    'barcode generator',
    'free barcode generator',
    'create barcode',
    'code 128 generator',
    'upc generator',
    'ean generator',
    'online barcode tool',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/barcode-generator',
  },
  openGraph: {
    title: 'Free Online Barcode Generator | WorksyHub',
    description:
      'Generate, style, and download various barcode formats like Code 128, UPC, and EAN instantly.',
    url: 'https://worksyhub.online/barcode-generator',
  },
};

export default function BarcodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Barcode Generator',
    description:
      'A free online tool to generate various 1D barcode formats like Code 128, UPC, and EAN.',
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
        name: 'Barcode Generator',
        item: 'https://worksyhub.online/barcode-generator',
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