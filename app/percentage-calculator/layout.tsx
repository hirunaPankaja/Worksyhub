// src/app/percentage-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Free Online % Calculator | Find Percent Increase, Decrease, Discount',
  description:
    'Free percentage calculator - Calculate what is X% of Y, percent increase/decrease, tip calculator, discount percentage & more. Instant results, no signup required!',
  keywords: [
    // Primary high-volume keywords
    'percentage calculator',
    'percent calculator',
    'calculate percentage',
    'what is x percent of y',
    'percentage formula',
    'how to calculate percentage',
    // Specific calculations
    'percent increase calculator',
    'percent decrease calculator',
    'percentage change calculator',
    'percentage difference calculator',
    'tip calculator',
    'discount calculator',
    'markup calculator',
    'margin calculator',
    'percentage off calculator',
    // Question-based keywords
    'what percent is',
    'how to find percentage',
    'calculate percent of',
    'percentage of a number',
    'what is 20 percent of',
    'what is 15 percent of',
    'what is 10 percent of',
    // Long-tail keywords
    'free percentage calculator online',
    'simple percent calculator',
    'easy percentage calculator',
    'quick percentage calculator',
    'instant percentage calculator',
    'math percentage calculator',
    'percentage calculator free',
    'online percent calculator',
    'percentage finder'
  ],
  alternates: {
    canonical: 'https://worksyhub.online/percentage-calculator',
  },
  openGraph: {
    title: 'Free Percentage Calculator - Calculate %, Increase, Decrease Online',
    description: 'Calculate percentages instantly! What is X% of Y, percent increase/decrease, tips, discounts & more. Free, fast, no signup.',
    url: 'https://worksyhub.online/percentage-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Percentage Calculator Online',
    description: 'Calculate what is X% of Y, percentage increase & decrease instantly!',
  }
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Percentage Calculator',
    description:
      'A free online percentage calculator to calculate X% of Y, percentage increase/decrease, tips, discounts, margins & more. Instant results.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: 'https://worksyhub.online/percentage-calculator',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'WorksyHub'
    }
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
        name: 'Percentage Calculator',
        item: 'https://worksyhub.online/percentage-calculator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate percentage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To calculate X% of Y, multiply Y by X and divide by 100. For example, 15% of 200 = (200 × 15) ÷ 100 = 30. Our calculator does this instantly for you.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I calculate percent increase?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Percent increase = ((New Value - Old Value) / Old Value) × 100. For example, from 100 to 125 is a 25% increase.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I calculate percent decrease?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Percent decrease = ((Old Value - New Value) / Old Value) × 100. For example, from 100 to 80 is a 20% decrease.'
        }
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}