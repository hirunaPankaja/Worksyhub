// src/app/image-to-base64/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter | WorksyHub',
  description:
    'Free online tool to convert images (PNG, JPG, SVG) to Base64 data URLs. 100% client-side, secure, and fast. No uploads required.',
  keywords: [
    'image to base64',
    'base64 image converter',
    'convert image to base64',
    'base64 encoder',
    'data url',
    'developer tools',
    'client-side',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/image-to-base64',
  },
  openGraph: {
    title: 'Free Image to Base64 Converter | WorksyHub',
    description:
      'Instantly convert your images into Base64 data URLs directly in your browser. No data is uploaded.',
    url: 'https://worksyhub.online/image-to-base64',
  },
};

export default function ImageToBase64Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image to Base64 Converter',
    description:
      'A free online tool to convert image files (PNG, JPG, etc.) into Base64 data URLs.',
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
        name: 'Image to Base64 Converter',
        item: 'https://worksyhub.online/image-to-base64',
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