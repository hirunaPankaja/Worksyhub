// src/app/bmi-calculator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI Calculator - Free Body Mass Index Calculator Online | Check If You\'re Healthy Weight',
  description:
    'Free BMI Calculator - Calculate your Body Mass Index instantly! Enter height & weight to check if you\'re underweight, normal, overweight or obese. Accurate BMI chart & health tips included. No signup required!',
  keywords: [
    // Primary high-volume keywords
    'bmi calculator',
    'body mass index calculator',
    'free bmi calculator',
    'bmi calculator online',
    'calculate bmi',
    'bmi check',
    'check my bmi',
    'what is my bmi',
    'bmi chart',
    'bmi scale',
    'bmi range',
    // Question-based (voice search optimized)
    'am i overweight',
    'am i obese',
    'am i healthy weight',
    'how to calculate bmi',
    'what is a healthy bmi',
    'what should my bmi be',
    'is my bmi normal',
    // Long-tail keywords
    'bmi calculator for adults',
    'bmi calculator for women',
    'bmi calculator for men',
    'bmi calculator metric',
    'bmi calculator kg cm',
    'body mass index chart',
    'healthy weight calculator',
    'weight for height calculator',
    'ideal weight calculator',
    'obesity calculator',
    'underweight calculator',
    'health calculator free',
    'worksyhub bmi'
  ],
  alternates: {
    canonical: 'https://worksyhub.online/bmi-calculator',
  },
  openGraph: {
    title: 'Free BMI Calculator - Check Your Body Mass Index Instantly',
    description:
      'Calculate your BMI online free! Instant results with health categories. Check if you\'re underweight, normal, overweight or obese. No signup needed.',
    url: 'https://worksyhub.online/bmi-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free BMI Calculator - Check Your Health Now',
    description: 'Calculate your Body Mass Index instantly. Free, accurate, no signup required!',
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
    name: 'Free BMI Calculator - Body Mass Index Calculator Online',
    description:
      'Free online BMI calculator. Calculate your Body Mass Index instantly using height and weight. Includes BMI chart, health categories, and tips.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    url: 'https://worksyhub.online/bmi-calculator',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'WorksyHub',
      url: 'https://worksyhub.online'
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
        name: 'BMI Calculator',
        item: 'https://worksyhub.online/bmi-calculator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate my BMI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BMI is calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). Simply enter your weight and height in our calculator to get instant results.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is a healthy BMI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A healthy BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is classified as obese.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is BMI accurate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BMI is a useful screening tool but doesn\'t account for muscle mass, bone density, or body composition. Athletes may have high BMI but low body fat. Consult a healthcare professional for comprehensive assessment.'
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