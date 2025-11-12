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
    'WorksyHub offers a free collection of simple online tools including time converters, measurement converters, calculators, productivity utilities, design tools, text utilities, and more.',
  keywords: [
    'time converter',
    'measurement converter',
    'online calculator',
    'free tools',
    'online utilities',
    'worksyhub',
    'unit converter',
    'password generator',
    'qr code generator',
    'color picker',
    'json formatter',
    'image tools',
    'productivity tools',
  ],
  openGraph: {
    title: 'WorksyHub - Free Online Tools',
    description:
      'Use WorksyHub for free online converters, calculators, productivity tools, design utilities, and more.',
    url: 'https://worksyhub.online',
    siteName: 'WorksyHub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WorksyHub - Free Online Tools',
    description:
      'Free simple converters, calculators, productivity tools & utilities at WorksyHub.',
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
      'WorksyHub provides free simple online tools like converters, calculators, productivity utilities, design tools, and text utilities.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://worksyhub.online/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* --- PWA Manifest Link (NEW) --- */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        {/* --- End PWA Links --- */}
        
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
          {/* Header Section */}
          <Header />

          {/* Main Content Area with balanced padding */}
          <main className="mx-auto w-full max-w-7xl flex-grow px-2 sm:px-4 md:px-6 py-8 md:py-12">
            {children}

            {/* Ad Banner Placement */}
            <div className="mt-8 md:mt-12">
              <AdBanner />
            </div>
          </main>

          {/* Footer Section */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}