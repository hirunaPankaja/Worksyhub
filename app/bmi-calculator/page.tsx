// src/app/bmi-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Heart, BookOpen } from 'lucide-react';

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [bmiCategory, setBmiCategory] = useState('');

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculateBMI();
      }
      if (event.key === 'Escape') {
        setWeight('');
        setHeight('');
        setBmiResult('');
        setBmiCategory('');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [weight, height]);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to meters
    if (isNaN(w) || isNaN(h) || h === 0 || w === 0) {
      setBmiResult('Invalid Input');
      setBmiCategory('');
      return;
    }

    const bmi = w / (h * h);
    setBmiResult(bmi.toFixed(1));

    if (bmi < 18.5) setBmiCategory('Underweight');
    else if (bmi < 25) setBmiCategory('Normal weight');
    else if (bmi < 30) setBmiCategory('Overweight');
    else setBmiCategory('Obese');
  };

  const tutorials = {
    title: 'BMI Calculator Health Guide',
    sections: [
      {
        title: 'Understanding Your BMI',
        content: [
          'BMI (Body Mass Index) is a crucial health indicator that measures body fat based on your height and weight.',
          '',
          '**BMI Formula:**',
          'BMI = Weight (kg) / [Height (m)]²',
          '',
          '**BMI Categories:**',
          '  - Underweight: &lt; 18.5', // <-- FIXED
          '  - Normal weight: 18.5 - 24.9',
          '  - Overweight: 25 - 29.9',
          '  - Obese: &ge; 30', // <-- FIXED
          '',
          '**How to Use:**',
          '  - 1. Enter weight in kilograms',
          '  - 2. Enter height in centimeters',
          "  - 3. Click 'Calculate BMI'",
          '  - 4. Get instant results with category',
        ],
      },
      {
        title: 'Health Insights & Tips',
        content: [
          '**Important Considerations:**',
          "  - BMI doesn't account for muscle mass",
          '  - Not suitable for athletes or pregnant women',
          '  - Consult healthcare professionals for personalized advice',
          '',
          '**Healthy BMI Tips:**',
          '  - Maintain balanced diet and exercise',
          '  - Regular health check-ups',
          '  - Focus on overall wellness, not just weight',
        ],
      },
    ],
  };

  // Helper to get color class based on BMI category
  const getBmiCategoryClass = () => {
    if (bmiCategory === 'Normal weight') {
      return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
    }
    if (bmiCategory === 'Underweight') {
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
    }
    if (bmiCategory === 'Overweight') {
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300';
    }
    if (bmiCategory === 'Obese') {
      return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
    }
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">BMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Check your Body Mass Index (BMI)
        </p>
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Enter Your Details
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to calculate, Escape to clear
        </p>

        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
        >
          Calculate BMI
        </button>

        {bmiResult && (
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-muted text-center">
              <p className="text-sm text-muted-foreground mb-1">Your BMI:</p>
              <p className="text-4xl font-bold text-foreground">{bmiResult}</p>
            </div>
            {bmiCategory && (
              <div
                className={`p-4 rounded-lg text-center ${getBmiCategoryClass()}`}
              >
                <p className="text-xl font-semibold">{bmiCategory}</p>
              </div>
            )}
          </div>
        )}

        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground mb-2">
            BMI Formula: Weight (kg) / [Height (m)]²
          </p>
          <p className="text-sm text-muted-foreground">
            Categories: Underweight (&lt;18.5), Normal (18.5-24.9), Overweight
            (25-29.9), Obese (&ge;30)
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
            {tutorials.sections.map(
              (
                section: { title: string; content: string[] },
                sectionIndex: number
              ) => (
                <div key={sectionIndex} className="space-y-4">
                  <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                    {section.title}
                  </h4>

                  <div className="prose prose-lg max-w-none text-foreground">
                    {section.content.map((line: string, lineIndex: number) => (
                      <div key={lineIndex} className="mb-3">
                        {line.startsWith('**') ? (
                          <strong className="text-foreground text-lg">
                            {line.replace(/\*\*/g, '')}
                          </strong>
                        ) : line.trim().startsWith('-') ? (
                          <p className="text-foreground leading-relaxed ml-4">
                            {line}
                          </p>
                        ) : line === '' ? (
                          <div className="my-4 border-t border-border"></div>
                        ) : (
                          <p className="text-foreground leading-relaxed">
                            {line}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Need More Tools?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a
            href="/basic-calculator"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Basic Calculator
          </a>
          <a
            href="/scientific-calculator"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Scientific Calculator
          </a>
          <a
            href="/emi-calculator"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            EMI Calculator
          </a>
          <a
            href="/gpa-calculator"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            GPA Calculator
          </a>
        </div>
      </div>
    </div>
  );
}