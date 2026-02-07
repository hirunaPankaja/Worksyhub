// src/app/percentage-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

export default function PercentageCalculatorPage() {
  const [percentValue, setPercentValue] = useState('');
  const [percentOf, setPercentOf] = useState('');
  const [percentResult, setPercentResult] = useState('');

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculatePercentage();
      }
      if (event.key === 'Escape') {
        setPercentValue('');
        setPercentOf('');
        setPercentResult('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [percentValue, percentOf]);

  const calculatePercentage = () => {
    const value = parseFloat(percentValue);
    const total = parseFloat(percentOf);
    if (isNaN(value) || isNaN(total)) {
      setPercentResult('Invalid Input');
      return;
    }
    const result = (value / 100) * total;
    setPercentResult(result.toFixed(2));
  };

  const tutorials = {
    title: 'Percentage Calculator Guide',
    sections: [
      {
        title: 'How to Use the Percentage Calculator',
        content: [
          'This tool helps you find the percentage of a number.',
          '',
          "**Example:** To find '20% of 150':",
          '1. Enter **20** in the "What is % (percentage)" field.',
          "2. Enter **150** in the field.",
          "3. Press Enter or click 'Calculate'.",
          "4. The result **30.00** will appear.",
        ],
      },
      {
        title: "Practical Applications",
        content: [
          "**Shopping:** Calculate a 25% discount on a $80 item.",
          "**Tipping:** Find 18% of a $50 restaurant bill.",
          "**Finance:** Determine what 5% interest on $1000 is.",
        ]
      }
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Percentage Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Quickly calculate percentages (e.g., "What is 20% of 50?")
        </p>
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Calculate a Percentage
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to calculate, Escape to clear
        </p>

        <div>
          <label className="block text-sm font-medium mb-2">
            What is... (percentage)
          </label>
          <input
            type="number"
            value={percentValue}
            onChange={(e) => setPercentValue(e.target.value)}
            placeholder="e.g., 20"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            ...of (total value)
          </label>
          <input
            type="number"
            value={percentOf}
            onChange={(e) => setPercentOf(e.target.value)}
            placeholder="e.g., 150"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <button
          onClick={calculatePercentage}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
        >
          Calculate
        </button>

        {percentResult && (
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Result:</p>
            <p className="text-3xl font-bold text-foreground">
              {percentResult}
            </p>
          </div>
        )}

        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Formula: (Percentage / 100) × Total Value
          </p>
        </div>
      </div>

      {/* --- Tutorials Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Tutorials & Guides</h2>
        </div>

        <div className="bg-background border rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            {tutorials.title}
          </h3>

          <div className="space-y-6">
            {tutorials.sections.map((section: { title: string, content: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h4>

                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line: string, lineIndex: number) => (
                    <div key={lineIndex} className="mb-3">
                      {line.startsWith('**') ? (
                        <strong className="text-foreground text-lg">{line.replace(/\*\*/g, '')}</strong>
                      ) : line.trim().startsWith('-') ? (
                        <p className="text-foreground leading-relaxed ml-4">{line}</p>
                      ) : line === '' ? (
                        <div className="my-4 border-t border-border"></div>
                      ) : (
                        <p className="text-foreground leading-relaxed">{line}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive SEO Content */}
      <div className="space-y-10 border-t pt-8 mt-8">

        {/* What is Percentage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">What is a Percentage? Complete Guide to Percentage Calculations</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              A <strong>percentage</strong> is a way of expressing a number as a fraction of 100. The term comes from the Latin "per centum," meaning "by the hundred." Percentages are everywhere in daily life – from calculating discounts while shopping, to understanding interest rates on loans, to figuring out tips at restaurants.
            </p>
            <p className="leading-relaxed">
              Our <strong>free online percentage calculator</strong> makes these calculations instant and error-free. Simply enter your values and get accurate results in seconds. All calculations happen directly in your browser, ensuring complete privacy and instant results without any signup required.
            </p>
          </div>
        </section>

        {/* Percentage Formulas */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Essential Percentage Formulas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border-2 bg-primary/5">
              <h3 className="font-bold text-lg mb-3">Finding X% of a Number</h3>
              <p className="font-mono text-lg mb-2">Result = (Percentage ÷ 100) × Number</p>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> What is 25% of 200?<br />
                Result = (25 ÷ 100) × 200 = <strong>50</strong>
              </p>
            </div>
            <div className="p-6 rounded-xl border-2 bg-blue-50 dark:bg-blue-900/20">
              <h3 className="font-bold text-lg mb-3">Finding What Percentage X is of Y</h3>
              <p className="font-mono text-lg mb-2">Percentage = (X ÷ Y) × 100</p>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> 30 is what percent of 150?<br />
                Percentage = (30 ÷ 150) × 100 = <strong>20%</strong>
              </p>
            </div>
            <div className="p-6 rounded-xl border-2 bg-green-50 dark:bg-green-900/20">
              <h3 className="font-bold text-lg mb-3">Percentage Increase</h3>
              <p className="font-mono text-lg mb-2">Increase = ((New - Old) ÷ Old) × 100</p>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> Price went from $100 to $125<br />
                Increase = ((125 - 100) ÷ 100) × 100 = <strong>25%</strong>
              </p>
            </div>
            <div className="p-6 rounded-xl border-2 bg-yellow-50 dark:bg-yellow-900/20">
              <h3 className="font-bold text-lg mb-3">Percentage Decrease</h3>
              <p className="font-mono text-lg mb-2">Decrease = ((Old - New) ÷ Old) × 100</p>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> Price dropped from $80 to $60<br />
                Decrease = ((80 - 60) ÷ 80) × 100 = <strong>25%</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Real-World Percentage Examples</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🛒</div>
              <h3 className="font-bold text-lg mb-2">Shopping Discounts</h3>
              <p className="text-sm text-muted-foreground mb-3">Calculate how much you save with sales and discounts.</p>
              <div className="text-xs bg-muted p-3 rounded-lg">
                <strong>Example:</strong> A $120 jacket is 30% off.<br />
                Discount = 30% of $120 = $36<br />
                <strong>Final price: $84</strong>
              </div>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🍽️</div>
              <h3 className="font-bold text-lg mb-2">Restaurant Tips</h3>
              <p className="text-sm text-muted-foreground mb-3">Quickly calculate tips for good service.</p>
              <div className="text-xs bg-muted p-3 rounded-lg">
                <strong>Example:</strong> 18% tip on a $65 bill.<br />
                Tip = 18% of $65 = $11.70<br />
                <strong>Total: $76.70</strong>
              </div>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold text-lg mb-2">Interest Rates</h3>
              <p className="text-sm text-muted-foreground mb-3">Understand interest on savings and loans.</p>
              <div className="text-xs bg-muted p-3 rounded-lg">
                <strong>Example:</strong> 5% annual interest on $1,000.<br />
                Interest = 5% of $1,000 = $50<br />
                <strong>After 1 year: $1,050</strong>
              </div>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-lg mb-2">Tax Calculations</h3>
              <p className="text-sm text-muted-foreground mb-3">Figure out sales tax or income tax amounts.</p>
              <div className="text-xs bg-muted p-3 rounded-lg">
                <strong>Example:</strong> 8% sales tax on $250.<br />
                Tax = 8% of $250 = $20<br />
                <strong>Total: $270</strong>
              </div>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold text-lg mb-2">Investment Returns</h3>
              <p className="text-sm text-muted-foreground mb-3">Track your investment growth over time.</p>
              <div className="text-xs bg-muted p-3 rounded-lg">
                <strong>Example:</strong> Stock rose from $50 to $65.<br />
                Return = ((65-50) ÷ 50) × 100<br />
                <strong>Return: 30%</strong>
              </div>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-bold text-lg mb-2">Grade Calculations</h3>
              <p className="text-sm text-muted-foreground mb-3">Convert scores to percentages.</p>
              <div className="text-xs bg-muted p-3 rounded-lg">
                <strong>Example:</strong> Scored 42 out of 50.<br />
                Percentage = (42 ÷ 50) × 100<br />
                <strong>Score: 84%</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions About Percentages</h2>
          <div className="space-y-3">
            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How do I calculate a percentage of a number?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                To calculate a percentage of a number, multiply the number by the percentage and divide by 100. For example, to find 15% of 200: (15 × 200) ÷ 100 = 30. Alternatively, convert the percentage to a decimal (15% = 0.15) and multiply: 0.15 × 200 = 30.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How do I calculate percentage increase or decrease?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                For percentage change, subtract the old value from the new value, divide by the old value, then multiply by 100. Formula: ((New - Old) ÷ Old) × 100. A positive result means increase, negative means decrease. Example: If a price goes from $50 to $60, the increase is ((60-50) ÷ 50) × 100 = 20%.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What is the difference between percentage and percent?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                "Percent" and "percentage" are often used interchangeably, but technically "percent" is used with a specific number (25 percent), while "percentage" is used when speaking generally without a number (the percentage of correct answers). Both refer to parts per hundred.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How do I convert a fraction to a percentage?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                To convert a fraction to a percentage, divide the numerator by the denominator and multiply by 100. For example, 3/4 as a percentage: (3 ÷ 4) × 100 = 75%. Similarly, 1/8 becomes (1 ÷ 8) × 100 = 12.5%.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How do I convert a percentage to a decimal?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                To convert a percentage to a decimal, divide by 100 (or move the decimal point two places to the left). Examples: 25% = 0.25, 7.5% = 0.075, 150% = 1.50. To convert back, multiply by 100.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How do I calculate the original price before a discount?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                To find the original price before a discount, divide the sale price by (1 - discount percentage as decimal). Formula: Original = Sale Price ÷ (1 - Discount%). Example: If an item costs $75 after a 25% discount, original price = $75 ÷ (1 - 0.25) = $75 ÷ 0.75 = $100.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Can a percentage be more than 100%?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Yes, percentages can exceed 100%. This happens when comparing to a smaller reference value, indicating growth beyond the original. For example, if sales grew from $100 to $250, that's a 150% increase. Similarly, 200% of 50 equals 100 (double the original).
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How do I calculate percentage difference between two numbers?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Percentage difference compares two values without designating one as the "original." Formula: |Value1 - Value2| ÷ ((Value1 + Value2) ÷ 2) × 100. This is useful when comparing two independent values rather than tracking change over time.
              </p>
            </details>
          </div>
        </section>

        {/* Related Tools */}
        <section className="p-6 rounded-xl bg-primary/5 border border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-center">Related Math & Finance Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <a href="/basic-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Basic Calculator</div>
              <div className="text-xs text-muted-foreground">Quick calculations</div>
            </a>
            <a href="/scientific-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Scientific Calculator</div>
              <div className="text-xs text-muted-foreground">Advanced math</div>
            </a>
            <a href="/discount-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Discount Calculator</div>
              <div className="text-xs text-muted-foreground">Calculate savings</div>
            </a>
            <a href="/emi-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">EMI Calculator</div>
              <div className="text-xs text-muted-foreground">Loan payments</div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}