// src/app/barcode-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Barcode Generator Tool - Create Custom Barcodes Instantly | WorksyHub',
  description:
    'Generate professional barcodes for free with our advanced online barcode generator. Create Code 128, UPC, EAN-13, CODE39 barcodes instantly. Download high-quality PNG barcode images for retail, inventory, and business applications.',
  keywords: [
    'barcode generator',
    'free barcode generator',
    'online barcode maker',
    'create barcode online',
    'barcode creator',
    'generate barcode',
    'custom barcode generator',
    'barcode printing software',
    'retail barcode generator',
    'inventory barcode maker',
    'UPC barcode generator',
    'EAN barcode creator',
    'CODE128 barcode maker',
    'barcode PNG download',
    'professional barcode tool',
    'business barcode solution',
    'product barcode generator',
    'shipping barcode creator',
    'warehouse barcode system',
    'barcode for small business',
    'free barcode maker online',
    'barcode without software',
    'instant barcode generator',
    'high quality barcode',
    'printable barcode',
    'digital barcode creator',
    'barcode for labels',
    'barcode for products',
    'barcode for packaging',
    'barcode for retail stores',
    'barcode for ecommerce',
    'barcode for amazon',
    'barcode for shopify',
    'barcode for inventory management',
    'barcode for asset tracking',
    'barcode for library systems',
    'barcode for healthcare',
    'barcode for manufacturing',
    'barcode for logistics',
    'barcode for supply chain',
    'barcode for POS systems',
    'barcode scanner compatible',
    'industry standard barcode',
    'commercial barcode generator',
    'retail ready barcode',
    'GS1 compliant barcode',
    'barcode with custom data',
    'barcode with numbers',
    'barcode with text',
    'alphanumeric barcode',
    'numeric barcode generator',
    '1D barcode creator',
    'linear barcode maker',
    'barcode color customization',
    'barcode size adjustment',
    'barcode width settings',
    'barcode height control',
    'barcode background color',
    'barcode bar color',
    'download barcode image',
    'barcode PNG export',
    'barcode for printing',
    'barcode for digital use',
    'mobile barcode generator',
    'responsive barcode tool',
    'barcode generator 2024',
    'modern barcode creator',
    'advanced barcode features',
    'multiple barcode formats',
    'barcode type selector',
    'barcode validation system',
    'barcode error checking',
    'barcode format guide',
    'barcode tutorial',
    'barcode how-to',
    'barcode best practices',
    'barcode scanning tips',
    'barcode printing guide',
    'barcode implementation',
    'barcode for beginners',
    'barcode for professionals',
    'enterprise barcode solution',
    'small business barcode tool',
    'free alternative to barcode software',
    'online barcode replacement',
    'web-based barcode generator',
    'cloud barcode creator',
    'no download barcode tool',
    'browser based barcode maker',
    'client-side barcode generator',
    'privacy focused barcode tool',
    'secure barcode generator',
    'fast barcode creation',
    'instant barcode preview',
    'real-time barcode generator',
    'live barcode updates',
    'interactive barcode tool',
    'user-friendly barcode interface',
    'simple barcode generator',
    'easy barcode maker',
    'quick barcode creator',
    'efficient barcode tool',
    'professional barcode design',
    'customizable barcode options',
    'flexible barcode settings',
    'comprehensive barcode solution',
    'all-in-one barcode platform',
    'multi-format barcode support',
    'universal barcode generator',
    'global barcode standards',
    'international barcode formats',
    'regional barcode compatibility',
    'industry specific barcode',
    'specialized barcode generator'
  ],
  alternates: {
    canonical: 'https://worksyhub.online/barcode-generator',
  },
  openGraph: {
    title: 'Free Online Barcode Generator - Create Custom Barcodes in Seconds | WorksyHub',
    description:
      'Generate professional barcodes instantly with our free online tool. Create Code 128, UPC, EAN-13 barcodes with custom colors and sizes. Download high-quality PNG images.',
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
    name: 'Professional Barcode Generator',
    description:
      'A free online tool to generate various 1D barcode formats like Code 128, UPC, and EAN with advanced customization options for retail, inventory, and business applications.',
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