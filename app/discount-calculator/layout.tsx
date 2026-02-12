import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Discount Calculator - Free Sale Price & Savings Calculator | Percentage Off',
  description:
    'Free discount calculator — find the final sale price after percentage off instantly! Calculate savings, double discounts, tax after discount. Perfect for shopping, Black Friday & sales.',
  keywords: [
    'discount calculator', 'sale price calculator', 'percentage off calculator',
    'how to calculate discount', 'savings calculator', 'percent off calculator',
    'discount percentage calculator', 'percentage discount calculator',
    'sale calculator', 'shopping discount calculator', 'price after discount',
    'what is 20% off', 'what is 30% off', 'what is 50% off', 'what is 10% off',
    'calculate sale price', 'final price after discount', 'discount finder',
    'Black Friday calculator', 'Cyber Monday deals calculator',
    'price reduction calculator', 'markdown calculator',
    'original price calculator', 'reverse discount calculator',
    'double discount calculator', 'stacked discount calculator',
    'tax after discount calculator', 'coupon savings calculator',
    'bulk discount calculator', 'wholesale discount calculator',
    'clearance sale calculator', 'how much do I save calculator',
    'money saved calculator', 'deal analyzer', 'best deal calculator',
    'compare prices calculator', 'unit price calculator',
    'how to calculate percentage off a price',
    'how to figure out sale price', 'discount formula',
  ],
  alternates: { canonical: 'https://worksyhub.online/discount-calculator' },
  openGraph: {
    title: 'Free Discount Calculator — Calculate Sale Price & Savings',
    description: 'Find final price after percentage off. Double discounts, tax calculations, savings comparison.',
    url: 'https://worksyhub.online/discount-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Discount & Sale Price Calculator',
    description: 'Calculate any percentage off. See how much you save! Perfect for smart shopping.',
  },
};

export default function DiscountCalculatorLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'Free Discount & Sale Price Calculator',
    description: 'Calculate the final price after a percentage discount and see total savings. Double discounts, tax calculations.',
    applicationCategory: 'UtilityApplication', operatingSystem: 'Any',
    url: 'https://worksyhub.online/discount-calculator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Discount Calculator', item: 'https://worksyhub.online/discount-calculator' },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I calculate a discount?', acceptedAnswer: { '@type': 'Answer', text: 'To calculate a discount: Discount Amount = Original Price × (Discount Percentage ÷ 100). Final Price = Original Price - Discount Amount. For example: $80 item with 25% off: Discount = $80 × 0.25 = $20. Final price = $80 - $20 = $60. You save $20.' } },
      { '@type': 'Question', name: 'How do double discounts work?', acceptedAnswer: { '@type': 'Answer', text: 'Double (or stacked) discounts apply sequentially, not additively. A 20% off followed by 10% off is NOT 30% off. Example: $100 item → 20% off = $80 → additional 10% off $80 = $72. Total discount is 28%, not 30%.' } },
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
          <SEOHeading level={2} id="about-discount-calculator">Free Discount Calculator: Find Your Sale Price Instantly</SEOHeading>
          <SEOParagraph>
            Our <strong>free discount calculator</strong> instantly shows you the final price after applying any percentage discount, plus exactly how much money you save. Whether you are shopping during Black Friday sales, comparing Cyber Monday deals, checking if a clearance rack price is correct, or calculating wholesale discounts for your business, this tool gives you instant answers.
          </SEOParagraph>
          <SEOParagraph>
            Simply enter the original price and the discount percentage to see the sale price and your savings. The calculator handles any discount percentage from 1% to 99% and works with any currency. No signup, no download — just fast, accurate discount math.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="quick-discount-table">Quick Discount Reference: Common Percentage-Off Values</SEOHeading>
          <SEOTable
            caption="Discount Quick Reference — How Much You Save"
            headers={['Original Price', '10% Off', '15% Off', '20% Off', '25% Off', '30% Off', '40% Off', '50% Off']}
            rows={[
              ['$10', '$9.00', '$8.50', '$8.00', '$7.50', '$7.00', '$6.00', '$5.00'],
              ['$20', '$18.00', '$17.00', '$16.00', '$15.00', '$14.00', '$12.00', '$10.00'],
              ['$25', '$22.50', '$21.25', '$20.00', '$18.75', '$17.50', '$15.00', '$12.50'],
              ['$30', '$27.00', '$25.50', '$24.00', '$22.50', '$21.00', '$18.00', '$15.00'],
              ['$50', '$45.00', '$42.50', '$40.00', '$37.50', '$35.00', '$30.00', '$25.00'],
              ['$75', '$67.50', '$63.75', '$60.00', '$56.25', '$52.50', '$45.00', '$37.50'],
              ['$100', '$90.00', '$85.00', '$80.00', '$75.00', '$70.00', '$60.00', '$50.00'],
              ['$150', '$135.00', '$127.50', '$120.00', '$112.50', '$105.00', '$90.00', '$75.00'],
              ['$200', '$180.00', '$170.00', '$160.00', '$150.00', '$140.00', '$120.00', '$100.00'],
              ['$300', '$270.00', '$255.00', '$240.00', '$225.00', '$210.00', '$180.00', '$150.00'],
              ['$500', '$450.00', '$425.00', '$400.00', '$375.00', '$350.00', '$300.00', '$250.00'],
              ['$1,000', '$900.00', '$850.00', '$800.00', '$750.00', '$700.00', '$600.00', '$500.00'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="double-discounts">Understanding Double & Stacked Discounts</SEOHeading>
          <SEOParagraph>
            Many stores offer <strong>stacked discounts</strong> — such as &quot;take an extra 20% off already reduced items.&quot; A critical mistake shoppers make is adding the percentages together. Two discounts of 20% and 10% do NOT equal 30% off. Here is why:
          </SEOParagraph>
          <SEOTable
            caption="Double Discount Examples on $100 Item"
            headers={['First Discount', 'Second Discount', 'What You Might Think', 'Actual Total Discount', 'Final Price']}
            rows={[
              ['10% off', '10% off', '20% off = $80', '19% off', '$81.00'],
              ['20% off', '10% off', '30% off = $70', '28% off', '$72.00'],
              ['20% off', '20% off', '40% off = $60', '36% off', '$64.00'],
              ['25% off', '15% off', '40% off = $60', '36.25% off', '$63.75'],
              ['30% off', '20% off', '50% off = $50', '44% off', '$56.00'],
              ['40% off', '20% off', '60% off = $40', '52% off', '$48.00'],
              ['50% off', '20% off', '70% off = $30', '60% off', '$40.00'],
              ['50% off', '50% off', '100% off = $0', '75% off', '$25.00'],
            ]}
          />
          <SEOCallout type="tip">
            <strong>Pro shopping tip:</strong> The order of stacked discounts does not matter mathematically. 30% off then 20% off gives the same final price as 20% off then 30% off. The formula is: Final Price = Original × (1 - d₁/100) × (1 - d₂/100).
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="shopping-sales">Major Shopping Sales Calendar 2025</SEOHeading>
          <SEOTable
            caption="Biggest Sales Events and Typical Discounts"
            headers={['Sale Event', 'When', 'Typical Discount Range', 'Best For']}
            rows={[
              ['New Year Sales', 'January 1-15', '20-50% off', 'Winter clothing, electronics'],
              ['Valentine\'s Day', 'February 7-14', '15-30% off', 'Jewelry, flowers, dining'],
              ['Presidents\' Day (US)', 'Third Mon in February', '20-40% off', 'Mattresses, appliances, furniture'],
              ['Easter Sales', 'March-April', '15-30% off', 'Spring clothing, chocolate, décor'],
              ['Memorial Day (US)', 'Last Mon in May', '20-40% off', 'Mattresses, appliances, outdoor'],
              ['Amazon Prime Day', 'July', '20-50%+ off', 'Electronics, Amazon devices, tech'],
              ['Back to School', 'August', '20-40% off', 'Laptops, supplies, clothing'],
              ['Labor Day (US)', 'First Mon in September', '20-40% off', 'Appliances, mattresses, fashion'],
              ['Singles\' Day (11.11)', 'November 11', '30-70% off', 'Online shopping (biggest globally)'],
              ['Black Friday', 'Fourth Fri in November', '30-70% off', 'Electronics, fashion, everything'],
              ['Cyber Monday', 'Monday after Black Friday', '30-60% off', 'Online deals, tech, subscriptions'],
              ['Christmas Sales', 'December 20-25+', '30-50% off', 'Gifts, decorations, fashion'],
              ['After-Christmas / Boxing Day', 'December 26+', '40-70% off', 'Clearance, leftover stock'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="discount-faq">Frequently Asked Questions</SEOHeading>
          <SEOFAQ items={[
            { question: 'How do I calculate what percentage off I am getting?', answer: 'Use this formula: Discount Percentage = [(Original Price - Sale Price) ÷ Original Price] × 100. Example: item originally $80, on sale for $56. Discount = ($80-$56)/$80 × 100 = $24/$80 × 100 = 30% off.' },
            { question: 'How do I find the original price from the sale price?', answer: 'Use this formula: Original Price = Sale Price ÷ (1 - Discount%/100). Example: if an item is $60 after 25% off, the original price was $60 ÷ 0.75 = $80.' },
            { question: 'Should I calculate discount before or after tax?', answer: 'Discounts are almost always applied before tax. The correct order is: Start with original price → apply discount to get sale price → then add sales tax to the discounted price. This means you pay tax only on what you actually spend, not on the original price.' },
            { question: 'Is 20% off twice the same as 40% off?', answer: 'No! Two separate 20% discounts result in a 36% total discount, not 40%. The first 20% off $100 = $80. The second 20% off $80 = $64. That is $36 saved out of $100, or 36% off, not 40%. Sequential discounts always yield less than the sum would suggest.' },
            { question: 'How can I tell if a sale is actually a good deal?', answer: 'Compare the sale price to the product\'s historical pricing (use tools like CamelCamelCamel for Amazon). Check if the store inflated the "original price" before the sale. Compare per-unit or per-ounce prices for bulk items. Look at competitor pricing. A genuine 30%+ discount on a product at its real regular price is typically a good deal.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/percentage-calculator', title: 'Percentage Calculator', description: 'All percentage math' },
          { href: '/basic-calculator', title: 'Basic Calculator', description: 'Simple arithmetic' },
          { href: '/emi-calculator', title: 'EMI Calculator', description: 'Loan payments' },
          { href: '/unit-converter', title: 'Unit Converter', description: 'Convert measurements' },
        ]} />
      </SEOContentSection>
    </>
  );
}