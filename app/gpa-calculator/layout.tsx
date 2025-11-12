// src/app/gpa-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GPA Calculator - College & University | WorksyHub',
  description:
    'Free online GPA calculator for college and university students. Calculate your weighted or unweighted GPA on a 4.0, 5.0, or custom scale. Easy to use.',
  keywords: [
    'gpa calculator',
    'college gpa calculator',
    'university gpa calculator',
    'calculate gpa',
    'weighted gpa calculator',
    'unweighted gpa calculator',
    '4.0 scale',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/gpa-calculator',
  },
  openGraph: {
    title: 'Free GPA Calculator | WorksyHub',
    description:
      'Instantly calculate your semester or cumulative GPA on a 4.0, 5.0, or custom scale.',
    url: 'https://worksyhub.online/gpa-calculator',
  },
};

export default function GPACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GPA Calculator',
    description:
      'A free online tool for students to calculate their weighted or unweighted GPA on various scales.',
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
        name: 'GPA Calculator',
        item: 'https://worksyhub.online/gpa-calculator',
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