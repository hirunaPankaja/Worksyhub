// src/app/world-clock/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Clock - Current Local Time Worldwide | Real-Time Global Time Zone Converter | WorksyHub',
  description:
    'Free online world clock showing current local times worldwide. Track multiple time zones simultaneously with analog & digital clocks. Perfect for business, travel, and international communication.',
  keywords: [
    'world clock',
    'current time worldwide',
    'international time zones',
    'global time checker',
    'local time converter',
    'time zone map',
    'world time zones',
    'live world clock',
    'digital world clock',
    'analog world clock',
    'online time converter',
    'international business time',
    'global meeting planner',
    'time zone calculator',
    'world time now',
    'global clock online',
    'multi timezone clock',
    'time zone converter tool',
    'world clock with seconds',
    'real time world clock',
    'international clock online',
    'time difference calculator',
    'global time tracker',
    'world clock digital analog',
    'time zone map interactive',
    'world clock for business',
    'international time converter',
    'global time zone map',
    'world clock live update',
    'time zone database',
    'world clock professional',
    'international time checker',
    'global clock synchronized',
    'world time zone converter',
    'multi city world clock',
    'time zone meeting planner',
    'world clock for travelers',
    'international conference time',
    'global business hours',
    'world clock with DST',
    'time zone offset calculator',
    'world clock mobile friendly',
    'international time display',
    'global time management',
    'world clock web app',
    'time zone coordination tool',
    'world clock for remote teams',
    'international collaboration time',
    'global time synchronizer',
    'world clock with alarms',
    'time zone converter free',
    'world clock accurate',
    'international time zone database',
    'global clock real-time',
    'world clock multiple views',
    'time zone difference tool',
    'world clock for scheduling',
    'international meeting time',
    'global time zone tracker',
    'world clock with cities',
    'time zone map worldwide',
    'world clock business tool',
    'international time manager',
    'global clock professional',
    'world clock for teams',
    'time zone converter online',
    'world clock free tool',
    'international business clock',
    'global time zone calculator',
    'world clock with locations',
    'time zone difference finder',
    'world clock for conferences',
    'international time zone map',
    'global clock with seconds',
    'world clock accurate time',
    'time zone converter business',
    'world clock for professionals',
    'international time display',
    'global time zone database',
    'world clock real-time update',
    'time zone meeting scheduler',
    'world clock for remote work',
    'international business hours',
    'global time coordination',
    'world clock multiple timezones',
    'time zone converter tool free',
    'world clock live seconds',
    'international time calculator',
    'global clock web based',
    'world clock for travel planning',
    'time zone difference calculator',
    'world clock business meetings',
    'international conference planner',
    'global time zone display',
    'world clock with major cities',
    'time zone converter accurate',
    'world clock professional tool',
    'international team scheduler',
    'global business clock',
    'world clock real-time sync',
    'time zone meeting calculator',
    'world clock for international',
    'global time zone checker',
    'world clock multiple displays',
    'time zone business tool',
    'world clock free online',
    'international time zone converter',
    'global clock with analog digital',
    'world clock for scheduling meetings',
    'time zone difference map',
    'world clock business professional'
  ],
  alternates: {
    canonical: 'https://worksyhub.online/world-clock',
  },
  openGraph: {
    title: 'Free Online World Clock - Current Times Worldwide | WorksyHub',
    description:
      'Track multiple time zones simultaneously with our free world clock. Features analog & digital displays, major cities, and real-time updates.',
    url: 'https://worksyhub.online/world-clock',
  },
};

export default function WorldClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Professional World Clock',
    description:
      'Free online world clock showing current local times worldwide with analog and digital displays. Track multiple time zones for business, travel, and international communication.',
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
        name: 'World Clock',
        item: 'https://worksyhub.online/world-clock',
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