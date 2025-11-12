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