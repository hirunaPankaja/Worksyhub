import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Free Online % Calculator | Find Percent Increase, Decrease, Discount',
  description:
    'Free percentage calculator - Calculate what is X% of Y, percent increase/decrease, tip calculator, discount percentage & more. Instant results, no signup required!',
  keywords: [
    'percentage calculator',
    'percent calculator',
    'calculate percentage',
    'what is x percent of y',
    'percentage formula',
    'how to calculate percentage',
    'percent increase calculator',
    'percent decrease calculator',
    'percentage change calculator',
    'percentage difference calculator',
    'tip calculator',
    'discount calculator',
    'markup calculator',
    'margin calculator',
    'percentage off calculator',
    'free percentage calculator online',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/percentage-calculator',
  },
  openGraph: {
    title: 'Free Percentage Calculator - Calculate %, Increase, Decrease Online',
    description: 'Calculate percentages instantly! What is X% of Y, percent increase/decrease, tips, discounts & more. Free, fast, no signup.',
    url: 'https://worksyhub.online/percentage-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Percentage Calculator Online',
    description: 'Calculate what is X% of Y, percentage increase & decrease instantly!',
  }
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Percentage Calculator',
    description: 'A free online percentage calculator to calculate X% of Y, percentage increase/decrease, tips, discounts, margins & more. Instant results.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: 'https://worksyhub.online/percentage-calculator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: 'WorksyHub' }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Percentage Calculator', item: 'https://worksyhub.online/percentage-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I calculate percentage?', acceptedAnswer: { '@type': 'Answer', text: 'To calculate X% of Y, multiply Y by X and divide by 100. For example, 15% of 200 = (200 × 15) ÷ 100 = 30.' } },
      { '@type': 'Question', name: 'How do I calculate percent increase?', acceptedAnswer: { '@type': 'Answer', text: 'Percent increase = ((New Value - Old Value) / Old Value) × 100. For example, from 100 to 125 is a 25% increase.' } },
      { '@type': 'Question', name: 'How do I calculate percent decrease?', acceptedAnswer: { '@type': 'Answer', text: 'Percent decrease = ((Old Value - New Value) / Old Value) × 100. For example, from 100 to 80 is a 20% decrease.' } },
      { '@type': 'Question', name: 'What is the percentage formula?', acceptedAnswer: { '@type': 'Answer', text: 'The basic percentage formula is: Percentage = (Part / Whole) × 100. This tells you what percentage the part is of the whole.' } },
      { '@type': 'Question', name: 'How do I calculate a discount percentage?', acceptedAnswer: { '@type': 'Answer', text: 'Discount % = ((Original Price - Sale Price) / Original Price) × 100. For example, an item marked down from $80 to $60 has a 25% discount.' } },
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
          <SEOHeading level={2} id="what-is-percentage">What is a Percentage? Complete Guide to Percentage Calculations</SEOHeading>
          <SEOParagraph>
            A <strong>percentage</strong> is a mathematical concept that represents a number or ratio as a fraction of 100. The word itself comes from the Latin &quot;per centum,&quot; meaning &quot;by the hundred.&quot; Percentages are one of the most commonly used mathematical concepts in everyday life — from calculating discounts during shopping to understanding interest rates on loans, tax calculations, grade scoring, statistical data, nutritional information, and much more.
          </SEOParagraph>
          <SEOParagraph>
            Our <strong>free percentage calculator</strong> handles all types of percentage calculations instantly. Whether you need to find what percentage one number is of another, calculate a percentage increase or decrease, figure out a tip, or determine a discount amount — this tool does it all in your browser with zero data collection and no signup required.
          </SEOParagraph>
          <SEOParagraph>
            Understanding percentages is essential for financial literacy, academic success, and informed decision-making. This comprehensive guide below covers every type of percentage calculation with formulas, step-by-step examples, reference tables, and practical applications you can use immediately.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="percentage-formulas">All Percentage Formulas You Need to Know</SEOHeading>
          <SEOParagraph>
            There are several fundamental percentage formulas that cover virtually every calculation you will ever need. Below is a comprehensive reference of every percentage formula, explained with clear examples.
          </SEOParagraph>
          <SEOTable
            caption="Complete Percentage Formula Reference"
            headers={['Calculation Type', 'Formula', 'Example', 'Result']}
            rows={[
              ['X% of Y', '(X / 100) × Y', '15% of 200', '30'],
              ['What % is X of Y?', '(X / Y) × 100', '45 is what % of 180?', '25%'],
              ['Percent Increase', '((New - Old) / Old) × 100', '80 → 100', '25% increase'],
              ['Percent Decrease', '((Old - New) / Old) × 100', '100 → 75', '25% decrease'],
              ['Percent Change', '((New - Old) / Old) × 100', '50 → 65', '30% change'],
              ['Add X% to Y', 'Y × (1 + X/100)', 'Add 20% to 150', '180'],
              ['Subtract X% from Y', 'Y × (1 - X/100)', 'Subtract 15% from 200', '170'],
              ['Percent Difference', '|A - B| / ((A + B) / 2) × 100', 'Between 40 and 60', '40%'],
              ['Markup Percentage', '((Selling - Cost) / Cost) × 100', 'Cost $50, Sell $75', '50% markup'],
              ['Margin Percentage', '((Selling - Cost) / Selling) × 100', 'Cost $50, Sell $75', '33.3% margin'],
              ['Discount Amount', 'Original Price × (Discount% / 100)', '25% off $120', '$30 discount'],
              ['Sale Price', 'Original × (1 - Discount% / 100)', '25% off $120', '$90'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="how-to-calculate">How to Calculate Percentage: Step-by-Step Guide</SEOHeading>

          <SEOHeading level={3}>Type 1: Finding X% of a Number</SEOHeading>
          <SEOParagraph>
            This is the most common percentage calculation. You want to find a specific percentage of a given number. The formula is: <strong>Result = (Percentage / 100) × Number</strong>.
          </SEOParagraph>
          <SEONumberedList items={[
            'Convert the percentage to a decimal by dividing by 100. For example, 25% becomes 0.25.',
            'Multiply the decimal by the number you want to find the percentage of. For example, 0.25 × 80 = 20.',
            'The result is your answer: 25% of 80 is 20.',
          ]} />

          <SEOTable
            caption="Quick Reference: Common Percentages"
            headers={['Percentage', 'Of 50', 'Of 100', 'Of 200', 'Of 500', 'Of 1000']}
            rows={[
              ['5%', '2.50', '5', '10', '25', '50'],
              ['10%', '5', '10', '20', '50', '100'],
              ['15%', '7.50', '15', '30', '75', '150'],
              ['20%', '10', '20', '40', '100', '200'],
              ['25%', '12.50', '25', '50', '125', '250'],
              ['30%', '15', '30', '60', '150', '300'],
              ['33.3%', '16.67', '33.33', '66.67', '166.67', '333.33'],
              ['40%', '20', '40', '80', '200', '400'],
              ['50%', '25', '50', '100', '250', '500'],
              ['60%', '30', '60', '120', '300', '600'],
              ['75%', '37.50', '75', '150', '375', '750'],
              ['80%', '40', '80', '160', '400', '800'],
              ['90%', '45', '90', '180', '450', '900'],
              ['100%', '50', '100', '200', '500', '1000'],
            ]}
          />

          <SEOHeading level={3}>Type 2: Finding What Percentage X is of Y</SEOHeading>
          <SEOParagraph>
            When you need to express one number as a percentage of another, use: <strong>Percentage = (Part / Whole) × 100</strong>. For example, to find what percentage 35 is of 140: (35 / 140) × 100 = 25%. This means 35 is 25% of 140.
          </SEOParagraph>

          <SEOHeading level={3}>Type 3: Percentage Increase and Decrease</SEOHeading>
          <SEOParagraph>
            Percentage change is used to compare an old value with a new value. It is crucial for understanding price changes, salary increases, population growth, stock market movements, and more.
          </SEOParagraph>
          <SEOParagraph>
            <strong>Percentage Increase Formula:</strong> ((New Value - Old Value) / Old Value) × 100. If a product price went from $40 to $52: ((52 - 40) / 40) × 100 = 30% increase.
          </SEOParagraph>
          <SEOParagraph>
            <strong>Percentage Decrease Formula:</strong> ((Old Value - New Value) / Old Value) × 100. If your electricity bill dropped from $120 to $90: ((120 - 90) / 120) × 100 = 25% decrease.
          </SEOParagraph>
          <SEOCallout type="tip">
            <strong>Common mistake:</strong> A 50% increase followed by a 50% decrease does NOT bring you back to the original number. If 100 increases by 50% to 150, then decreases by 50%, it becomes 75, not 100. This is because the decrease is calculated on the new (larger) number.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="percentage-applications">Real-World Applications of Percentage Calculations</SEOHeading>

          <SEOHeading level={3}>Shopping and Discounts</SEOHeading>
          <SEOParagraph>
            Percentage calculations are essential for smart shopping. When a store advertises &quot;30% off,&quot; you need to calculate the actual savings and final price. Understanding how to quickly compute discounts helps you compare deals, identify genuine bargains, and make better purchasing decisions.
          </SEOParagraph>
          <SEOTable
            caption="Common Discount Calculations"
            headers={['Original Price', '10% Off', '20% Off', '25% Off', '30% Off', '40% Off', '50% Off']}
            rows={[
              ['$25', '$22.50', '$20', '$18.75', '$17.50', '$15', '$12.50'],
              ['$50', '$45', '$40', '$37.50', '$35', '$30', '$25'],
              ['$75', '$67.50', '$60', '$56.25', '$52.50', '$45', '$37.50'],
              ['$100', '$90', '$80', '$75', '$70', '$60', '$50'],
              ['$150', '$135', '$120', '$112.50', '$105', '$90', '$75'],
              ['$200', '$180', '$160', '$150', '$140', '$120', '$100'],
              ['$300', '$270', '$240', '$225', '$210', '$180', '$150'],
              ['$500', '$450', '$400', '$375', '$350', '$300', '$250'],
            ]}
          />

          <SEOHeading level={3}>Tips and Gratuity</SEOHeading>
          <SEOParagraph>
            Calculating tips at restaurants is one of the most common real-world uses of percentages. The standard tip in the United States ranges from 15% to 20% of the pre-tax bill, though customs vary by country.
          </SEOParagraph>
          <SEOTable
            caption="Tip Calculator Quick Reference"
            headers={['Bill Amount', '10% Tip', '15% Tip', '18% Tip', '20% Tip', '25% Tip']}
            rows={[
              ['$20', '$2.00', '$3.00', '$3.60', '$4.00', '$5.00'],
              ['$30', '$3.00', '$4.50', '$5.40', '$6.00', '$7.50'],
              ['$50', '$5.00', '$7.50', '$9.00', '$10.00', '$12.50'],
              ['$75', '$7.50', '$11.25', '$13.50', '$15.00', '$18.75'],
              ['$100', '$10.00', '$15.00', '$18.00', '$20.00', '$25.00'],
              ['$150', '$15.00', '$22.50', '$27.00', '$30.00', '$37.50'],
              ['$200', '$20.00', '$30.00', '$36.00', '$40.00', '$50.00'],
            ]}
          />

          <SEOHeading level={3}>Finance and Investments</SEOHeading>
          <SEOBulletList items={[
            'Interest rates: Banks express savings account yields and loan costs as annual percentage rates (APR). A 5% APR on a $10,000 savings account earns $500 per year in simple interest.',
            'Stock market returns: Investors track portfolio performance using percentage gains and losses. A stock that moves from $50 to $65 has gained 30%.',
            'GDP growth: Economists measure national economic health using GDP growth percentage. A 3% GDP growth rate indicates a healthy, expanding economy.',
            'Inflation rate: The consumer price index (CPI) measures how prices change over time as a percentage, helping you understand purchasing power.',
            'Tax calculations: Income tax brackets, sales tax, property tax, and capital gains tax are all expressed as percentages.',
            'Compound interest: The most powerful financial concept — earning interest on interest. The formula A = P(1 + r/n)^(nt) relies heavily on percentage calculations.',
          ]} />

          <SEOHeading level={3}>Academic Grading</SEOHeading>
          <SEOParagraph>
            Grade percentages help students understand their academic standing. If you scored 42 out of 50 on a test, your percentage score is (42/50) × 100 = 84%. Most grading scales use the following ranges:
          </SEOParagraph>
          <SEOTable
            caption="Standard Academic Grading Scale"
            headers={['Percentage Range', 'Letter Grade', 'GPA (4.0 Scale)', 'Description']}
            rows={[
              ['93-100%', 'A', '4.0', 'Excellent / Outstanding'],
              ['90-92%', 'A-', '3.7', 'Excellent'],
              ['87-89%', 'B+', '3.3', 'Very Good'],
              ['83-86%', 'B', '3.0', 'Good'],
              ['80-82%', 'B-', '2.7', 'Above Average'],
              ['77-79%', 'C+', '2.3', 'Average Plus'],
              ['73-76%', 'C', '2.0', 'Average'],
              ['70-72%', 'C-', '1.7', 'Below Average'],
              ['67-69%', 'D+', '1.3', 'Poor'],
              ['60-66%', 'D', '1.0', 'Barely Passing'],
              ['Below 60%', 'F', '0.0', 'Failing'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="percentage-tricks">Mental Math Tricks for Quick Percentage Calculations</SEOHeading>
          <SEOParagraph>
            Being able to calculate percentages mentally is a valuable life skill. These proven tricks make percentage math fast and easy, even without a calculator:
          </SEOParagraph>
          <SEONumberedList items={[
            'To find 10%: Simply move the decimal point one place to the left. 10% of 250 = 25.0. This is the foundation for most mental percentage calculations.',
            'To find 5%: Find 10% first, then halve it. 5% of 250 = 25 ÷ 2 = 12.50.',
            'To find 1%: Move the decimal point two places to the left. 1% of 250 = 2.50.',
            'To find 15%: Calculate 10% + 5%. For 15% of 80: 10% = 8, 5% = 4, total = 12.',
            'To find 20%: Calculate 10% and double it. 20% of 350 = 35 × 2 = 70.',
            'To find 25%: Divide by 4. 25% of 200 = 200 ÷ 4 = 50.',
            'To find 33%: Divide by 3. 33% of 90 = 90 ÷ 3 = 30.',
            'To find 50%: Simply halve the number. 50% of 180 = 90.',
            'To find 75%: Find 50% + 25%. 75% of 200 = 100 + 50 = 150.',
            'Swap trick: X% of Y = Y% of X. So 8% of 25 = 25% of 8 = 2. Choose whichever is easier to calculate!',
          ]} />
          <SEOCallout type="info">
            <strong>The swap trick</strong> is incredibly powerful and works because multiplication is commutative. Whenever you face a difficult percentage calculation, try swapping the numbers. For example, 4% of 75 is hard, but 75% of 4 = 3 — much easier!
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="markup-vs-margin">Understanding Markup vs. Margin: Why It Matters</SEOHeading>
          <SEOParagraph>
            One of the most common sources of confusion in business is the difference between <strong>markup</strong> and <strong>margin</strong>. While both express profit as a percentage, they use different denominators and produce very different numbers for the same transaction.
          </SEOParagraph>
          <SEOTable
            caption="Markup vs. Margin Comparison"
            headers={['Cost Price', 'Selling Price', 'Profit', 'Markup %', 'Margin %']}
            rows={[
              ['$10', '$15', '$5', '50%', '33.3%'],
              ['$20', '$30', '$10', '50%', '33.3%'],
              ['$50', '$75', '$25', '50%', '33.3%'],
              ['$100', '$120', '$20', '20%', '16.7%'],
              ['$100', '$150', '$50', '50%', '33.3%'],
              ['$100', '$200', '$100', '100%', '50%'],
              ['$100', '$300', '$200', '200%', '66.7%'],
            ]}
          />
          <SEOParagraph>
            <strong>Markup</strong> = ((Selling Price - Cost) / Cost) × 100. It tells you how much you added on top of the cost. <strong>Margin</strong> = ((Selling Price - Cost) / Selling Price) × 100. It tells you what percentage of the revenue is profit. Markup is always higher than margin for the same transaction. A 100% markup equals a 50% margin.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="compound-growth">Compound Percentage Growth Explained</SEOHeading>
          <SEOParagraph>
            Compound growth is when growth is calculated on both the original amount and any accumulated growth from previous periods. This concept is critical for understanding investment returns, population growth, inflation effects, and the power of consistent saving.
          </SEOParagraph>
          <SEOTable
            caption="Compound Growth: $1,000 Investment at Different Annual Rates"
            headers={['Years', '3% Annual', '5% Annual', '7% Annual', '10% Annual', '12% Annual']}
            rows={[
              ['1', '$1,030', '$1,050', '$1,070', '$1,100', '$1,120'],
              ['5', '$1,159', '$1,276', '$1,403', '$1,611', '$1,762'],
              ['10', '$1,344', '$1,629', '$1,967', '$2,594', '$3,106'],
              ['15', '$1,558', '$2,079', '$2,759', '$4,177', '$5,474'],
              ['20', '$1,806', '$2,653', '$3,870', '$6,727', '$9,646'],
              ['25', '$2,094', '$3,386', '$5,427', '$10,835', '$17,000'],
              ['30', '$2,427', '$4,322', '$7,612', '$17,449', '$29,960'],
            ]}
          />
          <SEOCallout type="tip">
            <strong>The Rule of 72:</strong> To estimate how long it takes to double your investment, divide 72 by the annual percentage rate. At 6% interest, your money doubles in approximately 72 ÷ 6 = 12 years. At 8%, it doubles in about 9 years. This is one of the most useful mental math shortcuts in finance.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="percentage-faq">Frequently Asked Questions About Percentages</SEOHeading>
          <SEOFAQ items={[
            { question: 'How do I calculate what percentage one number is of another?', answer: 'Use the formula: Percentage = (Part / Whole) × 100. For example, to find what percentage 30 is of 120: (30 / 120) × 100 = 25%. This means 30 is 25% of 120. This formula works for any two numbers — just divide the part by the whole and multiply by 100.' },
            { question: 'How do I calculate percentage increase between two numbers?', answer: 'Use the formula: Percentage Increase = ((New Value - Old Value) / Old Value) × 100. For example, if a stock price went from $40 to $52: ((52 - 40) / 40) × 100 = 30% increase. Always divide by the OLD (original) value, not the new value.' },
            { question: 'How do I reverse a percentage to find the original number?', answer: 'To find the original number before a percentage was applied, divide by (1 + percentage/100) for increases, or by (1 - percentage/100) for decreases. For example, if a price after a 20% increase is $120, the original was $120 / 1.20 = $100. If a price after a 25% discount is $75, the original was $75 / 0.75 = $100.' },
            { question: 'What is the difference between percentage and percentile?', answer: 'A percentage is a ratio out of 100 that shows a proportion (e.g., "you scored 85% on the test"). A percentile indicates your ranking relative to others (e.g., "you scored in the 90th percentile" means you scored higher than 90% of test takers). Percentage measures your performance, percentile measures your position.' },
            { question: 'How do I calculate percentage change when the original value is zero?', answer: 'Percentage change from zero is mathematically undefined because you would be dividing by zero. In practice, when the starting value is zero, you can report the change as an absolute number rather than a percentage, or use a small positive starting value as an approximation.' },
            { question: 'How do I add or subtract percentages?', answer: 'You can only directly add or subtract percentages if they are percentages of the same base number. 10% of 200 plus 5% of 200 = 15% of 200 = 30. However, 10% of 200 plus 10% of 300 is NOT 10% of 500 — you must calculate each one separately (20 + 30 = 50) and then express as a percentage of the combined total if needed.' },
            { question: 'What is a basis point?', answer: 'A basis point (bp or bps) is 1/100th of a percentage point, or 0.01%. It is commonly used in finance to describe small changes in interest rates or bond yields. For example, if an interest rate moves from 3.25% to 3.50%, it increased by 25 basis points. Using basis points avoids confusion between "percentage" and "percentage point" changes.' },
            { question: 'How do I calculate tax percentage?', answer: 'To find the tax amount: Tax = Price × (Tax Rate / 100). For a $50 item with 8.5% sales tax: $50 × 0.085 = $4.25 in tax. Total price = $50 + $4.25 = $54.25. To find the pre-tax price from a total: Original = Total / (1 + Tax Rate / 100). From $54.25 with 8.5% tax: $54.25 / 1.085 = $50.' },
            { question: 'Is this percentage calculator free to use?', answer: 'Yes, this percentage calculator is completely free to use with no limits. There is no signup required, no account needed, no ads, and no hidden costs. All calculations are performed instantly in your browser for complete privacy — your data never leaves your device.' },
            { question: 'How do percentage points differ from percentages?', answer: 'A percentage point is the arithmetic difference between two percentages. If unemployment rises from 5% to 7%, it increased by 2 percentage POINTS (the difference). However, it increased by 40% in PERCENTAGE terms ((7-5)/5 × 100). This distinction matters greatly in economics, finance, and statistics.' },
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="percentage-converter">Percentage, Decimal, and Fraction Conversion Chart</SEOHeading>
          <SEOParagraph>
            Converting between percentages, decimals, and fractions is a fundamental math skill. Use this comprehensive reference table for quick conversions:
          </SEOParagraph>
          <SEOTable
            caption="Percentage ↔ Decimal ↔ Fraction Conversion"
            headers={['Percentage', 'Decimal', 'Fraction', 'Percentage', 'Decimal', 'Fraction']}
            rows={[
              ['1%', '0.01', '1/100', '50%', '0.50', '1/2'],
              ['5%', '0.05', '1/20', '60%', '0.60', '3/5'],
              ['10%', '0.10', '1/10', '66.67%', '0.6667', '2/3'],
              ['12.5%', '0.125', '1/8', '70%', '0.70', '7/10'],
              ['15%', '0.15', '3/20', '75%', '0.75', '3/4'],
              ['20%', '0.20', '1/5', '80%', '0.80', '4/5'],
              ['25%', '0.25', '1/4', '87.5%', '0.875', '7/8'],
              ['30%', '0.30', '3/10', '90%', '0.90', '9/10'],
              ['33.33%', '0.3333', '1/3', '95%', '0.95', '19/20'],
              ['40%', '0.40', '2/5', '100%', '1.00', '1/1'],
            ]}
          />
        </section>

        <SEOInternalLinks links={[
          { href: '/bmi-calculator', title: 'BMI Calculator', description: 'Check your health' },
          { href: '/discount-calculator', title: 'Discount Calculator', description: 'Calculate savings' },
          { href: '/emi-calculator', title: 'EMI Calculator', description: 'Loan payments' },
          { href: '/unit-converter', title: 'Unit Converter', description: 'Convert units' },
        ]} />

      </SEOContentSection>
    </>
  );
}