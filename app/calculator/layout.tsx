// src/app/calculator/layout.tsx
import type { Metadata } from 'next';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Free Online Calculators - Basic, BMI, EMI, Percent & More',
  description:
    'A suite of free online calculators. Includes a basic math calculator, percentage calculator, BMI calculator, EMI/loan calculator, discount, and grade calculator.',
  keywords: [
    'online calculator',
    'calculator',
    'percentage calculator',
    'bmi calculator',
    'emi calculator',
    'loan calculator',
    'discount calculator',
    'grade calculator',
    'free calculators',
    'worksyhub',
  ],
  // ⚠️ Add canonical URL
  // canonical: 'https://worksyhub.online/calculator',
};

// --- JSON-LD SCHEMA FOR SEO ---
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Online Calculator Suite',
  description: 'A suite of free online calculators including Basic, Percentage, BMI, EMI, Discount, and Grade calculators.',
  applicationCategory: 'Utilities',
  operatingSystem: 'Any', // Web-based
  url: 'https://worksyhub.online/calculator', // ⚠️ Update this URL
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  publisher: {
    '@type': 'Organization',
    name: 'WorksyHub',
    url: 'https://worksyhub.online', // ⚠️ Update this URL
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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