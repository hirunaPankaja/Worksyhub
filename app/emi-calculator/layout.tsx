// src/app/emi-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free EMI Calculator - Calculate Loan Payments | WorksyHub',
  description:
    'Calculate your Equated Monthly Installment (EMI) for a home, car, or personal loan. Free, fast, and easy-to-use online loan payment calculator.',
  keywords: [
    'emi calculator',
    'loan calculator',
    'monthly payment calculator',
    'home loan emi calculator',
    'car loan emi calculator',
    'personal loan emi',
    'mortgage calculator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/emi-calculator',
  },
  openGraph: {
    title: 'Free EMI & Loan Calculator | WorksyHub',
    description:
      'Instantly calculate your monthly loan payments (EMI) for home, car, or personal loans.',
    url: 'https://worksyhub.online/emi-calculator',
  },
};

export default function EMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EMI Loan Calculator',
    description:
      'Free online tool to calculate Equated Monthly Installment (EMI) for home, car, or personal loans.',
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
        name: 'EMI Calculator',
        item: 'https://worksyhub.online/emi-calculator',
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