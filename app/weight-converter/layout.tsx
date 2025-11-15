// src/app/weight-converter/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weight Converter Online - Convert kg to lbs, lbs to kg, oz to g, g to oz | Free Mass Conversion Tool',
  description: 'Free online weight converter tool. Instantly convert between kilograms, pounds, ounces, grams, milligrams, and tons. Accurate weight conversion calculator for cooking, fitness, science, and daily use.',
  keywords: [
    'weight converter', 'kg to lbs', 'lbs to kg', 'ounces to grams', 'grams to ounces', 'unit converter', 'mass converter', 
    'measurement converter', 'kilograms to pounds', 'pounds to kilograms', 'weight conversion calculator', 'online weight converter',
    'metric weight converter', 'imperial weight converter', 'convert weight units', 'mass conversion tool', 'weight calculator',
    'kg to pounds converter', 'lbs to kilograms converter', 'oz to grams calculator', 'grams to oz converter', 'mg to g converter',
    'tons to kg converter', 'weight measurement converter', 'free weight converter', 'accurate weight conversion', 'weight unit calculator',
    'digital weight converter', 'instant weight conversion', 'cooking weight converter', 'fitness weight converter', 'science weight converter',
    'weight conversion table', 'mass unit converter', 'weight scale converter', 'professional weight converter', 'precise weight calculator',
    'weight converter tool', 'mass measurement converter', 'weight conversion chart', 'convert mass units', 'weight unit conversion',
    'metric to imperial weight', 'imperial to metric weight', 'weight conversion formula', 'auto weight converter', 'best weight converter',
    'easy weight converter', 'simple weight calculator', 'advanced weight converter', 'multi-unit weight converter', 'comprehensive weight tool',
    'weight conversion guide', 'how to convert weight', 'weight converter tutorial', 'learn weight conversion', 'weight conversion examples',
    'common weight conversions', 'weight converter for cooking', 'weight converter for fitness', 'weight converter for science',
    'weight converter for students', 'weight converter for professionals', 'weight converter for daily use', 'weight converter for recipes',
    'body weight converter', 'gym weight converter', 'kitchen weight converter', 'laboratory weight converter', 'educational weight converter',
    'weight converter app', 'web weight converter', 'mobile weight converter', 'responsive weight converter', 'fast weight converter',
    'reliable weight converter', 'trusted weight converter', 'popular weight converter', 'featured weight converter', 'recommended weight converter',
    'weight converter with table', 'weight converter with chart', 'weight converter with examples', 'weight converter with tutorial',
    'weight converter with guide', 'weight converter with tips', 'weight converter with formulas', 'weight converter with explanations',
    'weight converter for kg lbs oz g', 'all weight units converter', 'complete weight converter', 'ultimate weight converter',
    'premium weight converter', 'free online weight calculator', 'no cost weight converter', 'accessible weight converter',
    'user-friendly weight converter', 'intuitive weight converter', 'smart weight converter', 'automatic weight converter',
    'real-time weight converter', 'live weight converter', 'dynamic weight converter', 'interactive weight converter',
    'weight converter keyboard shortcuts', 'weight converter enter key', 'weight converter escape key', 'weight converter hotkeys',
    'weight converter quick use', 'weight converter efficient', 'weight converter time-saving', 'weight converter productive'
  ],
  alternates: {
    canonical: 'https://worksyhub.online/weight-converter',
  },
  openGraph: {
    title: 'Free Weight & Mass Converter | Convert kg, lbs, oz, g Instantly',
    description: 'Professional weight converter tool. Convert between kilograms, pounds, ounces, grams, milligrams, and tons with precision.',
    url: 'https://worksyhub.online/weight-converter',
  },
};

export default function WeightConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Weight Converter - Free Online Mass Conversion Tool',
    description: 'Free online tool to convert units of weight and mass, such as kilograms, pounds, ounces, and grams with high accuracy.',
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
        name: 'Weight Converter',
        item: 'https://worksyhub.online/weight-converter',
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