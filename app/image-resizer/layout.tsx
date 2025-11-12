// src/app/image-resizer/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Image Resizer | WorksyHub',
  description:
    'Resize JPG, PNG, and WEBP images online for free. Our client-side image resizer is fast, secure, and maintains aspect ratio. No uploads required.',
  keywords: [
    'image resizer',
    'resize image',
    'free image resizer',
    'resize jpg',
    'resize png',
    'client-side resizer',
    'no upload',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/image-resizer',
  },
  openGraph: {
    title: 'Free Online Image Resizer (Client-Side) | WorksyHub',
    description:
      'Quickly resize your images in your browser. No files are uploaded to any server, ensuring 100% privacy.',
    url: 'https://worksyhub.online/image-resizer',
  },
};

export default function ImageResizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Resizer',
    description:
      'A free online tool to resize images (JPG, PNG, WEBP) directly in the browser. No files are uploaded.',
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
        name: 'Image Resizer',
        item: 'https://worksyhub.online/image-resizer',
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