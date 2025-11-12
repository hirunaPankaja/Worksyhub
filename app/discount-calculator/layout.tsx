// src/app/discount-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Discount Calculator - Sale Price & Savings | WorksyHub',
  description:
    'Free online discount calculator. Instantly find the final price after a percentage off, and see how much money you save. Perfect for sales and shopping.',
  keywords: [
    'discount calculator',
    'sale price calculator',
    'percentage off calculator',
    'how to calculate discount',
    'savings calculator',
    'percent off',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/discount-calculator',
  },
  openGraph: {
    title: 'Free Discount & Sale Price Calculator | WorksyHub',
    description:
      'Instantly calculate the final sale price and the amount of money you save.',
    url: 'https://worksyhub.online/discount-calculator',
  },
};

export default function DiscountCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Discount Calculator',
    description:
      'Free online tool to calculate the final price after a percentage discount and see the total savings.',
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
        name: 'Discount Calculator',
        item: 'https://worksyhub.online/discount-calculator',
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