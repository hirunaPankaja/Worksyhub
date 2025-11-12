// src/app/qr-code-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free QR Code Generator (Custom with Logo) | WorksyHub',
  description:
    'Create custom QR codes online for free. Add colors, logos, or images to your QR code. Works offline, 100% client-side, and generates high-quality PNGs.',
  keywords: [
    'qr code generator',
    'free qr code generator',
    'custom qr code',
    'qr code with logo',
    'qr code styles',
    'qrcode generator',
    'qr code png',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/qr-code-generator',
  },
  openGraph: {
    title: 'Free QR Code Generator with Custom Logo & Colors | WorksyHub',
    description:
      'Generate high-quality, custom QR codes for free. Add your own logo, change colors, and download instantly as a PNG.',
    url: 'https://worksyhub.online/qr-code-generator',
  },
};

export default function QRCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QR Code Generator',
    description:
      'A free online tool to generate custom QR codes with logos and colors. Works offline.',
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
        name: 'QR Code Generator',
        item: 'https://worksyhub.online/qr-code-generator',
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