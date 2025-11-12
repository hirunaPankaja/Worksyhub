// src/app/coin-flip-dice-roll/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Coin Flipper & Dice Roller | WorksyHub',
  description:
    'A simple, free tool to flip a coin (Heads or Tails) or roll a standard 6-sided die. Perfect for games or making random decisions.',
  keywords: [
    'coin flip',
    'coin flipper',
    'dice roller',
    'roll a die',
    'random generator',
    'heads or tails',
    'fun tools',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/coin-flip-dice-roll',
  },
  openGraph: {
    title: 'Free Online Coin Flipper & Dice Roller | WorksyHub',
    description: 'Instantly flip a coin or roll a die with our free online tool.',
    url: 'https://worksyhub.online/coin-flip-dice-roll',
  },
};

export default function CoinDiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Coin Flip & Dice Roll',
    description:
      'A free online tool to simulate a coin flip (Heads or Tails) and a 6-sided die roll.',
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
        name: 'Coin Flip & Dice Roll',
        item: 'https://worksyhub.online/coin-flip-dice-roll',
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