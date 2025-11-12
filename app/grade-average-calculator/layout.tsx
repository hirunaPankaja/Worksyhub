// src/app/grade-average-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Grade Average Calculator | WorksyHub',
  description:
    'Calculate your average grade for free. Our simple online tool helps students quickly find their average score from a list of grades.',
  keywords: [
    'grade calculator',
    'average grade calculator',
    'calculate my average',
    'student calculator',
    'test score calculator',
    'free calculator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/grade-average-calculator',
  },
  openGraph: {
    title: 'Free Grade Average Calculator | WorksyHub',
    description:
      'Instantly calculate your average grade from a list of test or assignment scores.',
    url: 'https://worksyhub.online/grade-average-calculator',
  },
};

export default function GradeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Grade Average Calculator',
    description:
      'A free online tool for students to calculate their average grade from a list of scores.',
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
        name: 'Grade Average Calculator',
        item: 'https://worksyhub.online/grade-average-calculator',
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