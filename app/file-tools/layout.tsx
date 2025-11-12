// src/app/file-tools/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'File & Media Tools - Image, PDF (Client-Side) | WorksyHub',
  description:
    'Free client-side file tools: Image resizer, image cropper, image to Base64 converter, and PDF merger. No files are uploaded to any server. 100% private.',
  keywords: [
    'file tools',
    'media tools',
    'image resizer',
    'image cropper',
    'image to base64',
    'pdf merger',
    'pdf merge online',
    'client-side pdf',
    'no upload',
    'private tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/file-tools',
  },
  openGraph: {
    title: 'Free Client-Side File & Media Tools | WorksyHub',
    description:
      'Resize, crop, and convert images, or merge PDF files directly in your browser. No uploads, 100% private.',
    url: 'https://worksyhub.online/file-tools',
  },
};

export default function FileToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'File & Media Tools',
    description:
      'Free client-side tools for file manipulation, including image resizing, cropping, Base64 conversion, and PDF merging. All processing happens in the browser.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}