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
    template: '%s - WorksyHub', // <-- UPDATED: Brand name at the end
    default: 'WorksyHub - 40+ Free Online Converters, Calculators & Tools',
  },
  description:
    'WorksyHub offers a free collection of 40+ simple online tools including time zone converters, image resizers, PDF mergers, password generators, and health calculators. All tools are 100% private and client-side.',
  keywords: [
    // --- UPDATED & EXPANDED KEYWORDS ---
    'free online tools',
    'online converters',
    'online calculators',
    'developer tools',
    'productivity tools',
    'worksyhub',
    'image resizer',
    'pdf merger',
    'time zone converter',
    'age calculator',
    'bmi calculator',
    'gpa calculator',
    'password generator',
    'qr code generator',
    'color picker',
    'json formatter',
    'base64 encoder',
    'word counter',
    'client-side tools',
    'no upload tools',
    'private online tools',
    'css gradient generator',
    'lorem ipsum generator',
    'online stopwatch',
    'world clock',
    'sleep calculator',
    'online file tools',
    'text case converter',
    'url encoder decoder',
    'random number generator',
    'decision wheel',
    'magic 8 ball',
    'rock paper scissors',
    'how to resize an image',
    'how to merge pdf',
    'what is my bmi',
    'when should i wake up',
    'free tools for developers',
    'free tools for students',
    'free tools for designers',
    'online utilities',
    'web tools',
    'online text editor',
    'image to base64',
    'image cropper online',
    'emi calculator',
    'discount calculator',
    'unit converter',
    'length converter',
    'weight converter',
    'temperature converter',
    'area converter',
    'speed converter',
    'volume converter',
    'unix timestamp converter',
    'days between dates',
    'barcode generator',
    'secure password creator',
    'custom qr code with logo',
    'hex to rgb converter',
    'rgb to hex',
    'color palette generator',
    'code beautifier',
    'minify json',
    'decode base64',
    'encode url',
    'decode url',
    'placeholder text generator',
    'online mood journal',
    'private mood tracker',
    'offline tools',
    'pwa tools',
    'best free online tools',
    'all-in-one tools website',
    'time tools',
    'math calculators',
    'text analysis tools',
    'random generators',
    'online games',
    'quote of the day',
    'image editing tools',
    'pdf utilities',
    'health calculators',
    'financial calculators',
    'academic calculators',
    'no-sign-up tools',
    'fast online tools',
    'simple online tools',
    'what is my ip',
    'md5 generator',
    'sha256 generator',
    'online notepad',
    'character count',
    'word count tool',
    'what is my user agent',
    'free web utilities',
    'privacy-first tools',
    'no-server tools',
    'image compressor',
  ],
   openGraph: {
   title: 'WorksyHub - 50+ Free Online Tools: Converters, Calculators, Productivity Utilities',
    description:
      'Explore WorksyHub for free online image resizers, PDF mergers, time zone converters, BMI calculators, password generators, QR codes, JSON formatters, and more. 100% private, client-side processing for instant, secure results.',
    url: 'https://worksyhub.online',
    siteName: 'WorksyHub',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://worksyhub.online/og-image.png', // <-- put og-image.png in /public
        width: 1200,
        height: 630,
        alt: 'WorksyHub - Free Online Tools',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'WorksyHub - 40+ Free Online Tools',
    description:
      'Free converters, calculators, and no-upload client-side tools.',
    images: ['https://worksyhub.online/og-image.png'],
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