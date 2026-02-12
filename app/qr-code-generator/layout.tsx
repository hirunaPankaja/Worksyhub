import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'QR Code Generator - Free Custom QR Code Maker Online | Add Logo, Colors, Download PNG',
  description:
    'Free QR code generator - Create custom QR codes with logos, colors & designs! Download high-res PNG instantly. Perfect for business cards, marketing, menus & events. No signup needed!',
  keywords: [
    'qr code generator',
    'free qr code generator',
    'custom qr code',
    'qr code with logo',
    'qr code maker',
    'create qr code',
    'qr code png download',
    'business qr code',
    'qr code for website',
    'qr code for business card',
    'qr code for menu',
    'color qr code',
    'branded qr code',
    'high resolution qr code',
    'online qr code maker',
    'free qr code no signup',
    'qr code design',
    'professional qr code',
    'qr code generator free',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/qr-code-generator',
  },
  openGraph: {
    title: 'Free Custom QR Code Generator - Create QR Codes with Logo & Colors',
    description: 'Generate professional QR codes with custom logos, colors, and designs. Download high-quality PNG files instantly. Free, no signup.',
    url: 'https://worksyhub.online/qr-code-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator - Custom Logo & Colors',
    description: 'Create branded QR codes instantly. Add logos, colors, download PNG. 100% free!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 },
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
    name: 'Free Custom QR Code Generator',
    description: 'Create custom QR codes with logos, colors, and advanced styling. Download high-res PNG files instantly.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: 'https://worksyhub.online/qr-code-generator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: 'WorksyHub' }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'QR Code Generator', item: 'https://worksyhub.online/qr-code-generator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is a QR code?', acceptedAnswer: { '@type': 'Answer', text: 'A QR (Quick Response) code is a two-dimensional barcode that stores data like URLs, text, or contact information. When scanned with a smartphone camera, it instantly opens the encoded content.' } },
      { '@type': 'Question', name: 'Can I add my logo to QR codes?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, our QR code generator lets you upload and embed your company logo into the center of the QR code. Error correction ensures the code remains scannable even with a logo.' } },
      { '@type': 'Question', name: 'Is this QR code generator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No signup, no limits, no watermarks. Create unlimited QR codes for any purpose — personal or commercial.' } },
      { '@type': 'Question', name: 'What can I encode in a QR code?', acceptedAnswer: { '@type': 'Answer', text: 'You can encode URLs, plain text, phone numbers, email addresses, WiFi credentials, vCard contact info, SMS messages, GPS coordinates, and more.' } },
      { '@type': 'Question', name: 'How small can I print a QR code?', acceptedAnswer: { '@type': 'Answer', text: 'The minimum recommended print size is 2×2 cm (about 0.8×0.8 inches) for most scanning distances. For signs or posters viewed from a distance, use larger sizes. A general rule is 10:1 distance-to-size ratio.' } },
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}

      <SEOContentSection>

        <section className="space-y-4">
          <SEOHeading level={2} id="what-is-qr-code">What is a QR Code? Complete Guide to Quick Response Codes</SEOHeading>
          <SEOParagraph>
            A <strong>QR code</strong> (Quick Response code) is a two-dimensional barcode that can store and transmit data like URLs, text, contact information, WiFi credentials, and more. Invented in 1994 by Denso Wave, a subsidiary of Toyota, QR codes were originally designed to track vehicle parts during manufacturing. Today, they have become ubiquitous in marketing, payments, identification, and everyday communication.
          </SEOParagraph>
          <SEOParagraph>
            Unlike traditional one-dimensional barcodes that can only store about 20 digits, QR codes can encode up to <strong>7,089 numeric characters or 4,296 alphanumeric characters</strong>. Their built-in error correction means they can be scanned even when partially damaged, dirty, or covered — which is why adding a logo to the center still allows reliable scanning.
          </SEOParagraph>
          <SEOParagraph>
            Our <strong>free QR code generator</strong> creates high-quality, fully customizable QR codes with custom colors, uploaded logos, and multiple design styles. All QR codes are generated directly in your browser for instant results and complete privacy. Download your codes as high-resolution PNG files suitable for both digital use and professional printing.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="how-qr-works">How QR Codes Work: The Technology Explained</SEOHeading>
          <SEOParagraph>
            Every QR code consists of several key components that work together to enable fast, reliable scanning:
          </SEOParagraph>
          <SEOBulletList items={[
            'Finder patterns (3 large squares): The three distinctive squares in the corners help scanners detect the QR code and determine its orientation, allowing scanning from any angle.',
            'Alignment patterns: Smaller squares that help correct for distortion when the code is printed on curved surfaces or photographed at an angle.',
            'Timing patterns: Alternating black and white modules (the rows between finder patterns) that help the scanner determine the grid size.',
            'Format information: Data near the finder patterns that specifies the error correction level and mask pattern used.',
            'Data and error correction: The main body of the QR code contains the encoded data along with redundant error correction data using Reed-Solomon codes.',
            'Quiet zone: The white border around the QR code that helps scanners distinguish the code from its surroundings. Always maintain this border when placing QR codes.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="qr-code-types">Types of QR Codes and What You Can Encode</SEOHeading>
          <SEOTable
            caption="QR Code Data Types and Use Cases"
            headers={['Data Type', 'What It Does', 'Common Use Cases', 'Example']}
            rows={[
              ['URL / Website', 'Opens a web page', 'Marketing, business cards, products', 'https://worksyhub.online'],
              ['Plain Text', 'Displays text message', 'Instructions, serial numbers, notes', 'Welcome to our store!'],
              ['Phone Number', 'Initiates a phone call', 'Business signs, ads, contacts', 'tel:+1234567890'],
              ['Email', 'Opens email composer', 'Customer service, feedback forms', 'mailto:info@company.com'],
              ['SMS', 'Opens text message', 'Customer support, voting, contests', 'smsto:12345:Vote YES'],
              ['WiFi', 'Auto-connects to WiFi', 'Hotels, cafes, offices, AirBnBs', 'WIFI:S:NetworkName;T:WPA;P:password;;'],
              ['vCard', 'Saves contact info', 'Business cards, conference badges', 'Full name, phone, email, address'],
              ['Calendar Event', 'Adds calendar event', 'Event invitations, conferences', 'Date, time, location, description'],
              ['GPS Coordinates', 'Opens map location', 'Restaurants, stores, real estate', 'geo:40.7128,-74.0060'],
              ['App Store / Play Store', 'Opens app listing', 'App promotion, downloads', 'Direct link to app store page'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="qr-error-correction">QR Code Error Correction Levels Explained</SEOHeading>
          <SEOParagraph>
            One of the most powerful features of QR codes is their built-in error correction, which allows codes to remain scannable even when partially damaged or obscured. This is also what makes embedding logos possible. There are four error correction levels:
          </SEOParagraph>
          <SEOTable
            caption="QR Code Error Correction Levels"
            headers={['Level', 'Name', 'Data Recovery', 'Best For', 'QR Code Size Impact']}
            rows={[
              ['L', 'Low', '~7% recoverable', 'Clean environments, digital displays', 'Smallest QR code'],
              ['M', 'Medium', '~15% recoverable', 'Standard use, printed materials', 'Balanced size'],
              ['Q', 'Quartile', '~25% recoverable', 'Outdoor use, possible wear & tear', 'Larger QR code'],
              ['H', 'High', '~30% recoverable', 'Adding logos, harsh environments', 'Largest QR code'],
            ]}
          />
          <SEOCallout type="tip">
            <strong>When to use High (H) error correction:</strong> If you plan to add a logo to your QR code, always use High error correction. The logo covers approximately 10-15% of the code area, and High error correction can recover up to 30% of the data, ensuring reliable scanning.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="qr-business-uses">How Businesses Use QR Codes: Marketing and Operations</SEOHeading>
          <SEONumberedList items={[
            'Restaurant menus: Since COVID-19, contactless QR menus have become standard. Diners scan a code at their table to view the menu on their phone, reducing physical contact and printing costs.',
            'Business cards: Digital vCard QR codes let you share your complete contact information (name, phone, email, website, social media) with a single scan, making networking effortless.',
            'Product packaging: QR codes on products link to detailed information, user manuals, warranty registration, or reorder pages — enhancing the customer experience.',
            'Marketing campaigns: Track the effectiveness of print ads, flyers, and billboards by linking QR codes to specific landing pages with UTM tracking parameters.',
            'Payment systems: In many countries, QR codes drive mobile payments. Services like WeChat Pay, Alipay, PayPal, and Venmo use QR codes for instant peer-to-peer and merchant payments.',
            'Event management: QR codes on tickets serve as digital entry passes, reducing fraud and enabling contactless check-in at concerts, conferences, and sports events.',
            'Real estate: Property listings with QR codes allow potential buyers to instantly access virtual tours, floor plans, pricing, and agent contact information from "For Sale" signs.',
            'Healthcare: Patient identification wristbands, prescription labels, and medical records increasingly use QR codes for accurate, fast information retrieval.',
            'Education: Teachers use QR codes in classrooms to link to supplementary materials, homework assignments, videos, and interactive content.',
            'Inventory and logistics: QR codes on packages enable precise tracking through supply chains, from manufacturing to delivery.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="qr-design-tips">QR Code Design Best Practices</SEOHeading>
          <SEOParagraph>
            Creating an effective QR code requires balancing aesthetics with functionality. A beautifully designed QR code that cannot be scanned is useless. Follow these best practices to create QR codes that look great and scan reliably:
          </SEOParagraph>
          <SEOBulletList items={[
            'Maintain high contrast: The most important rule is contrast between the foreground (modules) and background. Dark modules on a light background works best. Avoid low-contrast color combinations.',
            'Keep the quiet zone: Always maintain at least a 4-module-wide white (or light) border around the QR code. This helps scanners identify where the code begins and ends.',
            'Test before printing: Always test your QR code with multiple devices and scanning apps before printing. Scan at different distances and angles to ensure reliability.',
            'Size appropriately: The minimum recommended size is 2×2 cm for close-range scanning (phone at arm\'s length). For a sign at 3 meters distance, the code should be at least 30×30 cm.',
            'Do not invert colors: While custom colors work, never make the modules lighter than the background. QR scanners expect dark-on-light patterns. A white-on-black QR code may fail with some scanners.',
            'Logo size: If adding a logo, keep it under 15% of the total QR code area. Use High (H) error correction to compensate for the covered data modules.',
            'Use URL shorteners for long URLs: Shorter data creates simpler QR codes with fewer modules, which are easier to scan, smaller to print, and more forgiving of scanning conditions.',
            'Add a call-to-action: Print "Scan to view menu," "Scan for WiFi," or similar text near the QR code. People scan more often when they know what to expect.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="qr-print-size">QR Code Print Size Guide</SEOHeading>
          <SEOTable
            caption="Recommended QR Code Sizes by Application"
            headers={['Application', 'Scanning Distance', 'Minimum Size', 'Recommended Size']}
            rows={[
              ['Business card', '15-30 cm (6-12 in)', '1.5×1.5 cm', '2×2 cm'],
              ['Flyer / Brochure', '30-60 cm (1-2 ft)', '2×2 cm', '3×3 cm'],
              ['Restaurant table tent', '30-60 cm (1-2 ft)', '2.5×2.5 cm', '4×4 cm'],
              ['Product packaging', '15-45 cm (6-18 in)', '1.5×1.5 cm', '2.5×2.5 cm'],
              ['Poster (indoor)', '1-3 m (3-10 ft)', '10×10 cm', '15×15 cm'],
              ['Banner (trade show)', '2-5 m (6-16 ft)', '20×20 cm', '30×30 cm'],
              ['Billboard (outdoor)', '5-20 m (16-65 ft)', '50×50 cm', '75×75 cm'],
              ['Window decal (storefront)', '1-3 m (3-10 ft)', '15×15 cm', '25×25 cm'],
            ]}
          />
          <SEOCallout type="info">
            <strong>Rule of thumb:</strong> The QR code size should be at least 1/10th of the expected scanning distance. If people will scan from 3 meters away, the code should be at least 30 cm across.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="qr-faq">Frequently Asked Questions About QR Codes</SEOHeading>
          <SEOFAQ items={[
            { question: 'How do I scan a QR code?', answer: 'Most modern smartphones can scan QR codes directly using the built-in camera app — just point your camera at the QR code and a notification will appear with the encoded content. On iPhones running iOS 11+ and Android phones running Android 9+, no additional app is needed. For older devices, download a free QR scanner app from your app store.' },
            { question: 'What is the difference between static and dynamic QR codes?', answer: 'A static QR code permanently encodes the data into the code itself — once created, the destination cannot be changed. A dynamic QR code encodes a short redirect URL that can be updated to point to different destinations without changing the printed code. Our generator creates static QR codes, which are ideal for most uses and do not expire or require ongoing subscriptions.' },
            { question: 'Can I customize the colors of my QR code?', answer: 'Yes! Our generator lets you customize the foreground (module) color, background color, and even add gradient effects. The key rule is maintaining contrast — the foreground should always be significantly darker than the background. Avoid using very similar colors for foreground and background as this will make scanning unreliable.' },
            { question: 'Do QR codes expire?', answer: 'Static QR codes never expire. Once generated, they will work forever because the data is encoded directly in the pattern. Dynamic QR codes (not created by our tool) may expire if the service provider discontinues the redirect service. Our free static QR codes are permanent and will always work.' },
            { question: 'How much data can a QR code hold?', answer: 'A single QR code can hold up to 7,089 numeric characters, 4,296 alphanumeric characters, 2,953 bytes of binary data, or 1,817 Japanese kanji characters. However, more data creates more complex (denser) codes that are harder to scan, especially when printed small. For best results, keep the data under 100 characters.' },
            { question: 'Is this QR code generator free?', answer: 'Yes, 100% free with no hidden costs, no limits, and no watermarks. You can create unlimited QR codes with custom logos and colors. All generation happens in your browser — no account or registration required.' },
            { question: 'What resolution should my QR code be for printing?', answer: 'For professional printing, we recommend generating QR codes at the highest resolution available. Our PNG downloads are high-resolution and suitable for most print applications. For very large format printing (billboards, banners), ensure the file resolution is at least 300 DPI at the final print size. Vector formats (SVG) are ideal for unlimited scaling.' },
            { question: 'Can QR codes be hacked or contain viruses?', answer: 'QR codes themselves cannot contain viruses or malware. However, they can link to malicious websites, just like any hyperlink. Always check the URL that appears on your phone before opening it. Reputable scanning apps will show you the encoded URL before navigating to it. Never scan QR codes from untrusted sources, especially those placed over existing codes (a common scam technique).' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/password-generator', title: 'Password Generator', description: 'Create strong passwords' },
          { href: '/word-counter', title: 'Word Counter', description: 'Count words & characters' },
          { href: '/image-resizer', title: 'Image Resizer', description: 'Resize images online' },
          { href: '/bmi-calculator', title: 'BMI Calculator', description: 'Check your health' },
        ]} />

      </SEOContentSection>
    </>
  );
}