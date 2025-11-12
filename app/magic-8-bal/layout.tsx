// src/app/magic-8-ball/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Magic 8-Ball | WorksyHub',
  description:
    'Ask the mystical Magic 8-Ball a yes-or-no question to receive your fortune. A fun, free online tool for answers and decisions.',
  keywords: [
    'magic 8 ball',
    'online magic 8 ball',
    'magic eight ball',
    'ask a question',
    'fortune teller',
    'fun tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/magic-8-ball',
  },
  openGraph: {
    title: 'Free Online Magic 8-Ball | WorksyHub',
    description: 'Ask a yes-or-no question and get a mystical answer.',
    url: 'https://worksyhub.online/magic-8-ball',
  },
};

export default function Magic8BallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Magic 8-Ball',
    description:
      'A free online version of the classic Magic 8-Ball toy that provides answers to yes-or-no questions.',
    applicationCategory: 'EntertainmentApplication',
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
        name: 'Magic 8-Ball',
        item: 'https://worksyhub.online/magic-8-ball',
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