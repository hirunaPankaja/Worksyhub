// src/app/age-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Age Calculator - How Old Am I? | WorksyHub',
  description:
    'Free online age calculator. Find your exact age in years, months, and days based on your date of birth. Instantly calculate your age.',
  keywords: [
    'age calculator',
    'how old am i',
    'date of birth calculator',
    'calculate age',
    'age in years months days',
    'online age tool',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/age-calculator',
  },
  openGraph: {
    title: 'Free Age Calculator | WorksyHub',
    description:
      'Instantly calculate your age in years, months, and days from your birth date.',
    url: 'https://worksyhub.online/age-calculator',
  },
};

export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Age Calculator',
    description:
      'Free online tool to calculate age in years, months, and days from a date of birth.',
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