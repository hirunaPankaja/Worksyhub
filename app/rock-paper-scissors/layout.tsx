// src/app/rock-paper-scissors/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rock Paper Scissors Game | WorksyHub',
  description:
    'Play a free game of Rock Paper Scissors against the computer. See if you can win this classic game of chance and strategy.',
  keywords: [
    'rock paper scissors',
    'play rock paper scissors',
    'online game',
    'fun tools',
    'classic game',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/rock-paper-scissors',
  },
  openGraph: {
    title: 'Rock Paper Scissors Game | WorksyHub',
    description: 'Play a free game of Rock Paper Scissors against the computer.',
    url: 'https://worksyhub.online/rock-paper-scissors',
  },
};

export default function RockPaperScissorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Rock Paper Scissors',
    description:
      'A free online game of Rock Paper Scissors to play against a computer opponent.',
    applicationCategory: 'GameApplication',
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
        name: 'Rock Paper Scissors',
        item: 'https://worksyhub.online/rock-paper-scissors',
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