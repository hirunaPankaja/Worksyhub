// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdBanner } from '@/components/AdBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | WorksyHub',
    default: 'WorksyHub - Free Online Converters, Calculators & Simple Tools',
  },
  description:
    'WorksyHub offers a free collection of online tools — converters, calculators, productivity utilities, design tools, and more.',
  keywords: [
    'online converter',
    'pdf tools',
    'time converter',
    'measurement converter',
    'calculator',
    'productivity tools',
    'design utilities',
    'worksyhub',
    'free tools online',
  ],
  openGraph: {
    title: 'WorksyHub - Free Online Tools',
    description:
      'Free online converters, calculators, text utilities, and productivity tools at WorksyHub.',
    url: 'https://worksyhub.online',
    siteName: 'WorksyHub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WorksyHub - Free Online Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WorksyHub - Free Online Tools',
    description:
      'Free converters, calculators, text utilities, and design tools.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://worksyhub.online'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WorksyHub',
    url: 'https://worksyhub.online',
    description:
      'WorksyHub provides free, simple online tools for productivity, conversions, and calculations.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://worksyhub.online/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ✅ Favicon Setup for Google Search */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#ffffff" />

        {/* ✅ Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body
        className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="mx-auto w-full max-w-7xl flex-grow px-3 sm:px-5 md:px-8 py-8 md:py-12">
            {children}
            <div className="mt-8 md:mt-12">
              <AdBanner />
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
