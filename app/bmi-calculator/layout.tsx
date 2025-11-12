// src/app/bmi-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free BMI Calculator - Check Your Body Mass Index | WorksyHub',
  description:
    'Calculate your Body Mass Index (BMI) for free. Our online calculator provides your BMI score and category (Underweight, Normal, Overweight, Obese).',
  keywords: [
    'bmi calculator',
    'body mass index',
    'check bmi',
    'health calculator',
    'weight calculator',
    'am i overweight',
    'worksyhub',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/bmi-calculator',
  },
  openGraph: {
    title: 'Free BMI Calculator | WorksyHub',
    description:
      'Instantly calculate your Body Mass Index (BMI) and see your health category.',
    url: 'https://worksyhub.online/bmi-calculator',
  },
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BMI Calculator',
    description:
      'Free online tool to calculate Body Mass Index (BMI) based on weight and height.',
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
        name: 'BMI Calculator',
        item: 'https://worksyhub.online/bmi-calculator',
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