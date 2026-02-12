import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Basic Calculator Online Free - Simple Math Calculator | Add Subtract Multiply Divide',
  description:
    'Free online basic calculator for everyday math. Add, subtract, multiply, divide instantly. Keyboard support, percentage, memory functions. No download needed.',
  keywords: [
    'basic calculator', 'simple calculator', 'online calculator', 'free calculator',
    'math calculator', 'calculator online', 'calculator free online',
    'addition calculator', 'subtraction calculator', 'multiplication calculator',
    'division calculator', 'percentage calculator online', 'quick calculator',
    'everyday calculator', 'web calculator', 'browser calculator',
    'calculator app online', 'arithmetic calculator', 'number calculator',
    'desktop calculator online', 'calculator with keyboard', 'easy calculator',
    'calculator tool', 'digital calculator', 'virtual calculator',
    'calculator no download', 'instant calculator', 'mobile calculator online',
    'google calculator alternative', 'iphone calculator online',
    'tip calculator', 'tax calculator simple', 'bill split calculator',
    'calculator for kids', 'homework calculator', 'student calculator',
  ],
  alternates: { canonical: 'https://worksyhub.online/basic-calculator' },
  openGraph: {
    title: 'Free Online Basic Calculator — Simple Math Made Easy',
    description: 'Add, subtract, multiply, divide. Keyboard support, percentage calculations. Free, instant, no download.',
    url: 'https://worksyhub.online/basic-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Basic Calculator Online',
    description: 'Simple math calculator with keyboard support. Perfect for quick everyday calculations!',
  },
};

export default function BasicCalculatorLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'Free Online Basic Calculator',
    description: 'Simple, fast, and free online calculator for addition, subtraction, multiplication, division, and percentage calculations.',
    applicationCategory: 'UtilityApplication', operatingSystem: 'Any',
    url: 'https://worksyhub.online/basic-calculator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Basic Calculator', item: 'https://worksyhub.online/basic-calculator' },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What can a basic calculator do?', acceptedAnswer: { '@type': 'Answer', text: 'A basic calculator performs the four fundamental arithmetic operations: addition (+), subtraction (−), multiplication (×), and division (÷). Most also include percentage (%), memory functions (M+, M-, MR, MC), decimal point, positive/negative toggle, and clear/backspace functions.' } },
      { '@type': 'Question', name: 'Can I use keyboard shortcuts?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our calculator supports full keyboard input: number keys (0-9), operators (+, -, *, /), Enter or = for equals, Backspace to delete, Escape to clear all, period for decimal, and % for percentage. This makes calculations much faster than clicking buttons.' } },
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
          <SEOHeading level={2} id="about-basic-calculator">Free Online Basic Calculator for Everyday Math</SEOHeading>
          <SEOParagraph>
            Our <strong>free online basic calculator</strong> is the fastest way to perform everyday arithmetic — addition, subtraction, multiplication, and division — directly in your web browser. No download, no installation, no signup required. With full keyboard support, percentage calculations, and memory functions, it handles everything from splitting a restaurant bill to calculating sales tax to checking homework answers.
          </SEOParagraph>
          <SEOParagraph>
            This calculator is designed for speed and simplicity. Unlike complex scientific calculators, our basic calculator focuses on the math operations you use most often. The clean, intuitive interface works on any device — desktop, laptop, tablet, or smartphone — making it the perfect replacement for your phone calculator app or the built-in Windows/Mac calculator.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="mental-math-tricks">Mental Math Tricks to Calculate Faster</SEOHeading>
          <SEOTable
            caption="Quick Mental Math Shortcuts"
            headers={['Trick', 'Example', 'How It Works']}
            rows={[
              ['Multiply by 5', '48 × 5 = 240', 'Divide by 2, multiply by 10: 48/2 = 24, × 10 = 240'],
              ['Multiply by 9', '7 × 9 = 63', 'Multiply by 10 and subtract: 70 - 7 = 63'],
              ['Multiply by 11', '72 × 11 = 792', 'Add digits (7+2=9), place between: 7_9_2'],
              ['Multiply by 25', '36 × 25 = 900', 'Divide by 4, multiply by 100: 36/4 = 9, × 100 = 900'],
              ['Square numbers ending in 5', '35² = 1,225', 'Multiply n × (n+1), append 25: 3×4=12, append 25 = 1,225'],
              ['Add percentages', '15% tip on $80', '10% = $8, 5% = $4, total = $12'],
              ['Subtract from 1000', '1000 - 637', 'Subtract each digit from 9 (except last from 10): 3,6,3 = 363'],
              ['Double and halve', '16 × 25', 'Double 25 → 50, halve 16 → 8, so 8 × 50 = 400'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="percentage-guide">How to Calculate Percentages: Complete Guide</SEOHeading>
          <SEOParagraph>
            Percentage calculations are among the most common uses of a basic calculator. Here are the essential percentage formulas you will use regularly:
          </SEOParagraph>
          <SEOTable
            caption="Essential Percentage Formulas"
            headers={['Calculation', 'Formula', 'Example', 'Answer']}
            rows={[
              ['X% of a number', 'Number × (X ÷ 100)', '15% of $200', '$200 × 0.15 = $30'],
              ['What % is A of B?', '(A ÷ B) × 100', '45 out of 180', '(45÷180) × 100 = 25%'],
              ['Percentage increase', '[(New−Old) ÷ Old] × 100', '$80 → $100', '(20÷80) × 100 = 25% increase'],
              ['Percentage decrease', '[(Old−New) ÷ Old] × 100', '$100 → $75', '(25÷100) × 100 = 25% decrease'],
              ['Final price after discount', 'Price × (1 − Discount%/100)', '$80 with 20% off', '$80 × 0.80 = $64'],
              ['Add tax to price', 'Price × (1 + Tax%/100)', '$50 + 8.5% tax', '$50 × 1.085 = $54.25'],
              ['Tip amount', 'Bill × (Tip%/100)', '$65 bill, 18% tip', '$65 × 0.18 = $11.70'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="tip-calculator">Tipping Guide: How Much to Tip</SEOHeading>
          <SEOTable
            caption="Standard Tipping Guidelines (USA)"
            headers={['Service', 'Standard Tip %', 'Excellent Service', 'Quick Calculation on $50']}
            rows={[
              ['Restaurant (dine-in)', '15-20%', '20-25%', '$7.50 - $10.00'],
              ['Delivery (food)', '15-20%', '20%+', '$7.50 - $10.00'],
              ['Coffee shop / café', '$1-2 or 15%', '20%', '$7.50'],
              ['Hair salon / barber', '15-20%', '20-25%', '$7.50 - $10.00'],
              ['Taxi / rideshare', '15-20%', '20%', '$7.50 - $10.00'],
              ['Hotel housekeeping', '$2-5 per night', '$5-10 per night', '$2-5 per night'],
              ['Valet parking', '$2-5', '$5-10', '$2-5'],
              ['Spa / massage', '15-20%', '20-25%', '$7.50 - $10.00'],
              ['Movers', '$20-50 per person', '$50-100 per person', 'Per mover, not %'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="basic-calculator-faq">Frequently Asked Questions</SEOHeading>
          <SEOFAQ items={[
            { question: 'Why use an online calculator instead of my phone calculator?', answer: 'An online calculator offers several advantages: larger display for easy reading, full keyboard support for faster input (use number keys, +, -, *, /, Enter), no need to switch between apps on your computer, works on any device with a browser, and our calculator includes percentage and memory functions that some basic phone calculators lack.' },
            { question: 'Does this calculator follow order of operations (PEMDAS)?', answer: 'Our basic calculator operates in immediate execution mode (like a standard desktop calculator) — operations are calculated as entered, left to right. For complex expressions requiring PEMDAS/BODMAS order of operations, use our Scientific Calculator which parses full mathematical expressions correctly.' },
            { question: 'What keyboard shortcuts are supported?', answer: 'Full keyboard support: 0-9 for digits, + - * / for operations, Enter or = for equals, . for decimal, % for percentage, Backspace to delete last digit, Escape or C to clear all, and M keys for memory functions.' },
            { question: 'Is my calculation history saved?', answer: 'All calculations are performed locally in your browser. We do not save, track, or store any of your calculations on our servers. Your privacy is 100% protected.' },
            { question: 'What is the maximum number this calculator can handle?', answer: 'Our calculator uses JavaScript double-precision floating-point arithmetic, supporting numbers up to approximately 1.8 × 10³⁰⁸. For most everyday calculations, you will never reach this limit. For very large numbers or extreme precision needs, consider our Scientific Calculator.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/scientific-calculator', title: 'Scientific Calculator', description: 'Advanced math & trig' },
          { href: '/percentage-calculator', title: 'Percentage Calculator', description: 'Detailed percentage math' },
          { href: '/discount-calculator', title: 'Discount Calculator', description: 'Calculate sale savings' },
          { href: '/emi-calculator', title: 'EMI Calculator', description: 'Loan payments' },
          { href: '/unit-converter', title: 'Unit Converter', description: 'Convert measurements' },
          { href: '/bmi-calculator', title: 'BMI Calculator', description: 'Body mass index' },
        ]} />
      </SEOContentSection>
    </>
  );
}