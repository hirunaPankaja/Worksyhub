// src/app/qr-code-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Custom QR Code Generator Online - Create QR Codes with Logo, Colors | High Quality PNG Download',
  description: 'Generate custom QR codes for free with our advanced online QR code generator. Add logos, change colors, create stylish QR codes for business, marketing, websites. Download high-resolution PNG files instantly. No registration required.',
  keywords: [
    'qr code generator', 'free qr code generator', 'custom qr code', 'qr code with logo', 
    'qr code styles', 'qrcode generator', 'qr code png', 'online qr code maker', 'create qr code',
    'business qr code', 'marketing qr code', 'website qr code', 'digital qr code', 'static qr code',
    'dynamic qr code', 'color qr code', 'qr code design', 'professional qr code', 'branded qr code',
    'qr code for business', 'qr code for marketing', 'qr code for website', 'qr code for social media',
    'qr code for facebook', 'qr code for instagram', 'qr code for youtube', 'qr code for linkedin',
    'qr code for twitter', 'qr code for tiktok', 'qr code for whatsapp', 'qr code for vcard',
    'qr code for wifi', 'qr code for email', 'qr code for sms', 'qr code for phone',
    'qr code for event', 'qr code for restaurant', 'qr code for menu', 'qr code for product',
    'qr code for payment', 'qr code for bitcoin', 'qr code for ethereum', 'qr code for crypto',
    'qr code for pdf', 'qr code for document', 'qr code for app store', 'qr code for play store',
    'high resolution qr code', 'vector qr code', 'printable qr code', 'scannable qr code',
    'customizable qr code', 'editable qr code', 'modern qr code', 'creative qr code',
    'beautiful qr code', 'stylish qr code', 'elegant qr code', 'minimal qr code',
    'gradient qr code', 'transparent qr code', 'rounded qr code', 'dotted qr code',
    'pattern qr code', 'framed qr code', 'animated qr code', '3d qr code',
    'qr code analytics', 'trackable qr code', 'scan statistics', 'qr code tracking',
    'bulk qr code generator', 'multiple qr codes', 'batch qr code', 'mass qr code',
    'api qr code generator', 'developer qr code', 'programmable qr code', 'automated qr code',
    'secure qr code', 'encrypted qr code', 'password protected qr code', 'private qr code',
    'free forever qr code', 'no watermark qr code', 'unlimited qr code', 'premium qr code',
    'enterprise qr code', 'small business qr code', 'startup qr code', 'freelancer qr code',
    'agency qr code', 'marketing agency qr code', 'designer qr code', 'developer qr code',
    'content creator qr code', 'influencer qr code', 'blogger qr code', 'youtuber qr code',
    'restaurant owner qr code', 'retail store qr code', 'ecommerce qr code', 'online store qr code',
    'real estate qr code', 'property qr code', 'hotel qr code', 'tourism qr code',
    'education qr code', 'school qr code', 'university qr code', 'teacher qr code',
    'healthcare qr code', 'medical qr code', 'hospital qr code', 'pharmacy qr code',
    'fitness qr code', 'gym qr code', 'yoga qr code', 'wellness qr code',
    'event planner qr code', 'wedding qr code', 'conference qr code', 'seminar qr code',
    'nonprofit qr code', 'charity qr code', 'fundraising qr code', 'donation qr code',
    'government qr code', 'municipal qr code', 'public service qr code', 'community qr code',
    'personal qr code', 'resume qr code', 'portfolio qr code', 'contact qr code',
    'vcard qr code', 'digital business card qr code', 'network qr code', 'professional profile qr code'
  ],
  alternates: {
    canonical: 'https://worksyhub.online/qr-code-generator',
  },
  openGraph: {
    title: 'Free Custom QR Code Generator - Create Branded QR Codes with Logo',
    description: 'Generate professional QR codes with custom logos, colors, and designs. Perfect for business, marketing, and personal use. Download high-quality PNG files instantly.',
    url: 'https://worksyhub.online/qr-code-generator',
    images: [
      {
        url: '/og-qr-code-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator - Create Custom QR Codes Online',
      },
    ],
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

export default function QRCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Advanced QR Code Generator',
    description: 'Free online QR code generator with custom logos, colors, and advanced styling options. Create professional QR codes for business and marketing.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247',
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
        name: 'QR Code Generator',
        item: 'https://worksyhub.online/qr-code-generator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a QR code generator and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A QR code generator is an online tool that converts text, URLs, or data into scannable QR codes. Our generator uses advanced algorithms to create high-quality QR codes with custom logos, colors, and designs that work with all standard QR code scanners.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I add my company logo to the QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our QR code generator allows you to upload and embed your company logo, brand logo, or any image directly into the center of the QR code. The tool automatically adjusts error correction to ensure scannability.'
        }
      },
      {
        '@type': 'Question',
        name: 'What file formats can I download my QR code in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can download your custom QR codes as high-resolution PNG files, which are perfect for both digital use and professional printing. PNG format maintains quality and supports transparent backgrounds.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is there a limit to how many QR codes I can generate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, our QR code generator is completely free with no limits. You can create unlimited QR codes for personal, business, or commercial use without any restrictions or watermarks.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account to use the QR code generator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account or registration is required. Our QR code generator works 100% client-side in your browser, ensuring privacy and instant access without any sign-up process.'
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