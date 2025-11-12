// src/app/emi-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { DollarSign, BookOpen, Banknote, Clock, Percent, PiggyBank, BarChartHorizontal } from 'lucide-react';

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('100000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [loanTenure, setLoanTenure] = useState('5');
  const [emiResult, setEmiResult] = useState('');

  // Calculate EMI on load
  useEffect(() => {
    calculateEMI();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculateEMI();
      }
      if (event.key === 'Escape') {
        setLoanAmount('');
        setInterestRate('');
        setLoanTenure('');
        setEmiResult('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(loanTenure) * 12; // Number of months

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
      setEmiResult('Invalid Input');
      return;
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiResult(emi.toFixed(2));
  };

  const tutorials = {
    title: "How to Use the EMI Calculator",
    sections: [
      {
        title: "Step-by-Step Guide",
        content: [
          "**1. Enter Loan Amount:** Type the total principal amount you plan to borrow.",
          "**2. Enter Interest Rate:** Add the annual interest rate (e.g., 8.5 for 8.5%).", 
          "**3. Enter Loan Tenure:** Type the total loan duration in **years** (e.g., 5 for 5 years).",
          "**4. Calculate:** Press Enter or click the 'Calculate EMI' button.",
          "**5. View Result:** Your calculated Equated Monthly Installment (EMI) will appear below.",
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          EMI / Loan Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Calculate your monthly loan payments instantly
        </p>
      </div>

      {/* --- EMI Calculator Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Calculate Your EMI
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to calculate, Escape to clear
        </p>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="loanAmount">
            Loan Amount (e.g., 100000)
          </label>
          <input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="interestRate">
            Interest Rate (% per year) (e.g., 8.5)
          </label>
          <input
            id="interestRate"
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter annual interest rate"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="loanTenure">
            Loan Tenure (in years) (e.g., 5)
          </label>
          <input
            id="loanTenure"
            type="number"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            placeholder="Enter tenure in years"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <button
          onClick={calculateEMI}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
        >
          Calculate EMI
        </button>

        {emiResult && (
          <div className="p-4 rounded-lg bg-muted text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Your Monthly EMI (Payment):
            </p>
            <p className="text-4xl font-bold text-primary">
              ${emiResult}
            </p>
          </div>
        )}
      </div>

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- What is EMI? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Banknote className="h-6 w-6 text-primary" />
            What is an EMI?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>An **Equated Monthly Installment (EMI)** is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.</p>
            <p>This calculator helps you determine the exact monthly payment you will need to make to repay your loan over the desired period.</p>
          </div>
        </div>

        {/* --- How is EMI Calculated? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Percent className="h-6 w-6 text-primary" />
            How is EMI Calculated?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>The calculation for an EMI is based on a standard mathematical formula:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>EMI = [P × r × (1+r)ⁿ] / [(1+r)ⁿ-1]</code>
            </pre>
            <p>Where:</p>
            <ul>
              <li><strong>P</strong> = Principal Loan Amount (the total amount you borrow)</li>
              <li><strong>r</strong> = Monthly Interest Rate (your annual rate divided by 12)</li>
              <li><strong>n</strong> = Number of Monthly Installments (your loan tenure in years multiplied by 12)</li>
            </ul>
          </div>
        </div>
        
        {/* --- Fixed vs Floating Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChartHorizontal className="h-6 w-6 text-primary" />
            Fixed vs. Floating Interest Rates
          </h2>
          <p className="text-muted-foreground mb-4">Understanding the type of interest rate is as important as the EMI amount itself.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Feature</th>
                  <th className="p-3 border border-border">Fixed Rate</th>
                  <th className="p-3 border border-border">Floating Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">EMI Amount</td>
                  <td className="p-3 border border-border">Remains the same for the entire loan tenure.</td>
                  <td className="p-3 border border-border">Changes based on market conditions (e.g., changes in the repo rate).</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Budgeting</td>
                  <td className="p-3 border border-border">Easy to budget and plan finances.</td>
                  <td className="p-3 border border-border">Difficult to budget as payments can increase or decrease.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Interest Rate</td>
                  <td className="p-3 border border-border">Generally 1-2% higher than floating rates.</td>
                  <td className="p-3 border border-border">Generally lower than fixed rates to begin with.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Risk</td>
                  <td className="p-3 border border-border">No risk of market fluctuations. You are safe if rates go up.</td>
                  <td className="p-3 border border-border">You benefit if market rates go down, but you pay more if they go up.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- How to Use (Tutorial) --- */}
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
        
        {/* --- Amortization & Tips --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-primary" />
            Loan Amortization & Tips
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>An **amortization schedule** is a table detailing each periodic payment on a loan. It shows how much of each payment goes towards interest and how much goes towards paying down the principal (the original loan amount).</p>
            <p>In the beginning of your loan, a larger portion of your EMI goes towards interest. As you continue to pay, more of your EMI goes towards the principal, reducing your debt faster.</p>
            
            {/* --- Image Placeholder --- */}
            <div className="my-4 p-4 bg-muted rounded-lg flex flex-col items-center text-center">
              
              <p className="text-sm text-muted-foreground mt-2">This is a placeholder. A graph here would show the principal vs. interest paid over the life of the loan.</p>
            </div>

            <h3 className="text-xl font-semibold">Tips for Managing Your Loan</h3>
            <ul>
              <li><strong>Make Prepayments:</strong> If you have extra cash, making a partial payment towards your principal can drastically reduce your total interest and loan tenure.</li>
              <li><strong>Choose Tenure Wisely:</strong> A shorter loan tenure (e.g., 15 years) means a higher EMI, but you will pay significantly less interest overall. A longer tenure (e.g., 30 years) means a smaller, more manageable EMI, but you will pay much more in total interest.</li>
              <li><strong>Check Your Credit Score:</strong> A higher credit score can help you get a lower interest rate, saving you thousands over the life of the loan.</li>
            </ul>
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
          <a href="/scientific-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Scientific Calculator
          </a>
          <a href="/bmi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            BMI Calculator
          </a>
          <a href="/gpa-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            GPA Calculator
          </a>
        </div>
      </div>
    </div>
  );
}