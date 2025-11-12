// src/app/image-cropper/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Image Cropper & Rotator | WorksyHub',
  description:
    'Crop and rotate JPG, PNG, and WEBP images online for free. Set custom aspect ratios (1:1, 16:9) or free-crop. 100% client-side and private.',
  keywords: [
    'image cropper',
    'crop image',
    'free image cropper',
    'rotate image',
    'aspect ratio',
    '1:1',
    '16:9',
    'client-side',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/image-cropper',
  },
  openGraph: {
    title: 'Free Online Image Cropper & Rotator | WorksyHub',
    description:
      'Easily crop and rotate your images in your browser. No files are uploaded, ensuring 100% privacy.',
    url: 'https://worksyhub.online/image-cropper',
  },
};

export default function ImageCropperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Cropper',
    description:
      'A free online tool to crop and rotate images with aspect ratio locking. 100% client-side.',
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
        name: 'Image Cropper',
        item: 'https://worksyhub.online/image-cropper',
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