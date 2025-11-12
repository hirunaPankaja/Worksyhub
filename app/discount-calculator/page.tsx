// src/app/discount-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Tag, BookOpen, Percent, Calculator, ShoppingCart } from 'lucide-react';

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState('100');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [finalPrice, setFinalPrice] = useState('');
  const [savedAmount, setSavedAmount] = useState('');

  // Calculate on load
  useEffect(() => {
    calculateDiscount();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculateDiscount();
      }
      if (event.key === 'Escape') {
        setOriginalPrice('');
        setDiscountPercent('');
        setFinalPrice('');
        setSavedAmount('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [originalPrice, discountPercent]);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    if (isNaN(price) || isNaN(discount) || price < 0 || discount < 0) {
      setFinalPrice('Invalid Input');
      setSavedAmount('');
      return;
    }

    const discountAmount = (price * discount) / 100;
    const final = price - discountAmount;
    setFinalPrice(final.toFixed(2));
    setSavedAmount(discountAmount.toFixed(2));
  };

  const tutorials = {
    title: 'How to Use the Discount Calculator',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Original Price:** Type the full price of the item before the discount.',
          '**2. Enter Discount (%):** Type the percentage off (e.g., 15 for 15% off).',
          "**3. Calculate:** Press Enter or click the 'Calculate Final Price' button.",
          '**4. View Result:** You will see the new **Final Price** and the total amount **You Save**.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Discount Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Find the sale price and your total savings instantly.
        </p>
      </div>

      {/* --- Discount Calculator Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Calculate Your Discount
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to calculate, Escape to clear
        </p>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="originalPrice">
            Original Price
          </label>
          <input
            id="originalPrice"
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="e.g., 100"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="discountPercent">
            Discount Percentage (%)
          </label>
          <input
            id="discountPercent"
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="e.g., 20"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <button
          onClick={calculateDiscount}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
        >
          Calculate Final Price
        </button>

        {finalPrice && finalPrice !== 'Invalid Input' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/50 text-center">
              <p className="text-sm text-green-700 dark:text-green-300 mb-1">
                You Save:
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                ${savedAmount}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Final Price:
              </p>
              <p className="text-3xl font-bold text-foreground">
                ${finalPrice}
              </p>
            </div>
          </div>
        )}
        {finalPrice === 'Invalid Input' && (
           <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/50 text-center">
             <p className="text-xl font-bold text-red-700 dark:text-red-300">
               {finalPrice}
             </p>
           </div>
        )}
      </div>

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Calculator
          </h2>
          <div className="space-y-6">
            {tutorials.sections.map((section: { title: string, content: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h3>
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

        {/* --- Formulas and Examples --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            How to Calculate Discount Manually
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>You can calculate the final price manually using two simple formulas:</p>
            
            <h3 className="text-xl font-semibold mt-4">1. Find the Savings Amount</h3>
            <p>First, convert the discount percentage to a decimal by dividing it by 100. Then, multiply it by the original price.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>Savings = (Discount % / 100) * Original Price</code>
              <br />
              <code>Example: (20 / 100) * $80 = 0.2 * 80 = $16</code>
            </pre>
            
            <h3 className="text-xl font-semibold mt-6">2. Calculate the Final Price</h3>
            <p>Subtract the savings amount from the original price to get the final sale price.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>Final Price = Original Price - Savings</code>
              <br />
              <code>Example: $80 - $16 = $64</code>
            </pre>
          </div>
        </div>
        
        {/* --- Common Discounts Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            Common Discount Examples
          </h2>
          <p className="text-muted-foreground mb-4">Here is a quick reference table for common discounts on a $100 item.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Original Price</th>
                  <th className="p-3 border border-border">Discount %</th>
                  <th className="p-3 border border-border">You Save</th>
                  <th className="p-3 border border-border">Final Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border">$100.00</td>
                  <td className="p-3 border border-border">10%</td>
                  <td className="p-3 border border-border text-green-600 font-medium">-$10.00</td>
                  <td className="p-3 border border-border font-bold">$90.00</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">$100.00</td>
                  <td className="p-3 border border-border">15%</td>
                  <td className="p-3 border border-border text-green-600 font-medium">-$15.00</td>
                  <td className="p-3 border border-border font-bold">$85.00</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">$100.00</td>
                  <td className="p-3 border border-border">20%</td>
                  <td className="p-3 border border-border text-green-600 font-medium">-$20.00</td>
                  <td className="p-3 border border-border font-bold">$80.00</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">$100.00</td>
                  <td className="p-3 border border-border">30%</td>
                  <td className="p-3 border border-border text-green-600 font-medium">-$30.00</td>
                  <td className="p-3 border border-border font-bold">$70.00</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">$100.00</td>
                  <td className="p-3 border border-border">50%</td>
                  <td className="p-3 border border-border text-green-600 font-medium">-$50.00</td>
                  <td className="p-3 border border-border font-bold">$50.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/basic-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Basic Calculator
          </a>
          <a href="/percentage-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Percentage Calculator
          </a>
          <a href="/bmi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            BMI Calculator
          </a>
          <a href="/emi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            EMI Calculator
          </a>
        </div>
      </div>
    </div>
  );
}