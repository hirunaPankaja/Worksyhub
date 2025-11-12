// src/app/misc-tools/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fun Tools - Coin Flip, Dice Roll, Random Number, Spinner | WorksyHub',
  description:
    'Free online fun & miscellaneous tools. Includes a coin flipper, dice roller, random number generator, and a customizable decision spinner wheel.',
  keywords: [
    'fun tools',
    'misc tools',
    'coin flip',
    'dice roll',
    'random number generator',
    'decision wheel',
    'spinner wheel',
    'random picker',
    'what to eat',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/misc-tools',
  },
  openGraph: {
    title: 'Free Fun & Random Tools | WorksyHub',
    description:
      'Flip a coin, roll a die, generate a random number, or let the decision wheel make a choice for you. Free, fun, and client-side.',
    url: 'https://worksyhub.online/misc-tools',
  },
};

export default function MiscToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Miscellaneous & Fun Tools',
    description:
      'A collection of free online fun tools, including a coin flip, dice roller, random number generator, and a customizable decision wheel.',
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