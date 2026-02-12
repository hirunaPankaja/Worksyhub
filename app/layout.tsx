// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdBanner } from '@/components/AdBanner';
import { FavoritesProvider } from '@/components/features/FavoritesProvider';
import { HistoryTracker } from '@/components/features/HistoryTracker';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: {
    template: '%s | WorksyHub - Free Online Tools',
    default: 'WorksyHub - Free Online Calculator, Unit Converter & Tools',
  },
  description:
    'Free online calculators & tools: BMI Calculator, Age Calculator, Percentage Calculator, Unit Converter, Password Generator, QR Code Generator & more. 100% free, no signup, instant results!',
  keywords: [
    // High volume keywords
    'free online calculator',
    'online calculator',
    'bmi calculator',
    'age calculator',
    'percentage calculator',
    'unit converter',
    'password generator',
    'qr code generator',
    'word counter',
    'scientific calculator',
    'emi calculator',
    'loan calculator',
    'discount calculator',
    'free tools online',
    'online tools',
    'calculate bmi',
    'convert units',
    'meters to feet',
    'kg to lbs',
    'celsius to fahrenheit',
    'secure password generator',
    'free qr code',
    'countdown timer online',
    'stopwatch online',
    'world clock',
    'worksyhub'
  ],
  metadataBase: new URL('https://worksyhub.online'),
  alternates: {
    canonical: 'https://worksyhub.online',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://worksyhub.online',
    siteName: 'WorksyHub',
    title: 'WorksyHub - Free Online Calculator, Converter & Tools',
    description: 'Free online calculators & tools. Calculate BMI, convert units, generate passwords & QR codes. 100% free, instant results, no signup!',
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
    description: 'Free calculators & tools: BMI, Age, Percentage Calculator, Unit Converter, Password Generator & more!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FavoritesProvider>
            <HistoryTracker />
            <Header />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
              {children}
              <div className="mt-16 mb-8">
                <AdBanner />
              </div>
            </main>
            <Footer />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
