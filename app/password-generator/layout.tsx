// src/app/password-generator/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator - Free Strong Password Generator Online | Secure & Random',
  description:
    'Free password generator - Create strong, secure, uncrackable passwords instantly! Generate random passwords with letters, numbers, symbols. 100% private, works offline.',
  keywords: [
    // Primary high-volume keywords
    'password generator',
    'free password generator',
    'strong password generator',
    'secure password generator',
    'random password generator',
    'password creator',
    'generate password',
    // Specific features
    'strong password',
    'secure password',
    'random password',
    'complex password',
    'unique password generator',
    '16 character password',
    '20 character password',
    'alphanumeric password',
    'password with symbols',
    'uncrackable password',
    'unhackable password',
    // Question-based keywords
    'how to create strong password',
    'what is a good password',
    'how to make secure password',
    // Long-tail keywords
    'online password generator',
    'instant password generator',
    'safe password generator',
    'free random password generator',
    'password generator no signup',
    'password generator free online',
    'best password generator',
    'easy password generator',
    'quick password generator',
    'memorable password generator',
    'passphrase generator'
  ],
  alternates: {
    canonical: 'https://worksyhub.online/password-generator',
  },
  openGraph: {
    title: 'Free Password Generator - Create Strong Secure Passwords Instantly',
    description:
      'Generate strong, secure, random passwords instantly. Customizable length, symbols, numbers. 100% free, private, no signup required.',
    url: 'https://worksyhub.online/password-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Password Generator - Strong & Secure',
    description: 'Create uncrackable passwords instantly with our free password generator!',
  }
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Secure Password Generator',
    description:
      'A free online tool to generate strong, random, secure passwords. Customizable options for length, symbols, numbers, and case.',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    url: 'https://worksyhub.online/password-generator',
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
        name: 'Password Generator',
        item: 'https://worksyhub.online/password-generator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes a password strong?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A strong password is at least 12-16 characters long, includes uppercase and lowercase letters, numbers, and special symbols. It should be random and not contain dictionary words or personal information.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this password generator secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our password generator runs 100% in your browser. No passwords are ever sent to our servers or stored anywhere. Your generated passwords are completely private and secure.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long should my password be?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend at least 12 characters for most accounts, and 16+ characters for sensitive accounts like banking or email. Longer passwords are exponentially harder to crack.'
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