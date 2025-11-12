// src/app/basic-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Basic Calculator | WorksyHub',
  description:
    'A free, simple, and easy-to-use online basic calculator for everyday math. Add, subtract, multiply, and divide with keyboard support.',
  keywords: [
    'basic calculator',
    'simple calculator',
    'online calculator',
    'free calculator',
    'math calculator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/basic-calculator',
  },
  openGraph: {
    title: 'Free Online Basic Calculator | WorksyHub',
    description: 'A simple online calculator for all your basic arithmetic needs.',
    url: 'https://worksyhub.online/basic-calculator',
  },
};

export default function BasicCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Basic Calculator',
    description:
      'A free, simple, and easy-to-use online basic calculator for everyday math, supporting addition, subtraction, multiplication, and division.',
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
        name: 'Basic Calculator',
        item: 'https://worksyhub.online/basic-calculator',
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