'use client';

import { useState, useEffect } from 'react';
import { ToolWrapper } from '@/components/ToolWrapper';
import { Schema } from '@/components/Schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Activity, RefreshCcw, Info } from 'lucide-react';

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<string | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = () => {
    setError('');
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to meters

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      setBmiResult(null);
      setBmiCategory('');
      return;
    }

    const bmi = w / (h * h);
    const result = bmi.toFixed(1);
    setBmiResult(result);

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    setBmiCategory(category);
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setBmiResult(null);
    setBmiCategory('');
    setError('');
  };

  // Helper to get color class based on BMI category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Normal weight': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Underweight': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Overweight': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'Obese': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <ToolWrapper
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) instantly to understand your health better."
      category="Health"
    >
      <Schema
        name="BMI Calculator"
        description="Free online Body Mass Index (BMI) calculator. Calculate your BMI instantly based on height and weight. Includes health categories and tips."
        url="/bmi-calculator"
        category="HealthApplication"
        instructions={[
          "Enter your weight in kilograms (kg).",
          "Enter your height in centimeters (cm).",
          "Click the 'Calculate BMI' button.",
          "View your BMI score and health category instantly."
        ]}
      />

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Weight (kg)</label>
              <div className="relative">
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="pl-10"
                />
                <Activity className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Height (cm)</label>
              <div className="relative">
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="pl-10"
                />
                <Activity className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="flex gap-3">
            <Button onClick={calculateBMI} size="lg" className="flex-1">
              Calculate BMI
            </Button>
            <Button onClick={reset} variant="outline" size="icon">
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          {bmiResult ? (
            <Card className={`p-8 text-center border-2 space-y-4 animate-slide-up ${getCategoryColor(bmiCategory)}`}>
              <div>
                <p className="text-sm font-medium uppercase tracking-wider opacity-80">Your BMI Score</p>
                <div className="text-6xl font-black tracking-tight my-2">
                  {bmiResult}
                </div>
              </div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/50 dark:bg-black/20 font-bold backdrop-blur-sm">
                {bmiCategory}
              </div>
              <p className="text-sm opacity-80 max-w-[200px] mx-auto">
                {bmiCategory === 'Normal weight' ? 'Great job! Maintain this healthy weight.' :
                  bmiCategory === 'Underweight' ? 'Consider consulting a nutritionist to gain healthy weight.' :
                    'Aim for a balanced diet and regular exercise.'}
              </p>
            </Card>
          ) : (
            <Card className="p-8 text-center bg-muted/40 border-dashed border-2 flex flex-col items-center justify-center min-h-[250px] text-muted-foreground">
              <Info className="w-12 h-12 mb-4 opacity-20" />
              <p>Enter your details to see your calculated BMI result here.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Content for SEO */}
      <div className="mt-12 space-y-8 border-t pt-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Understanding BMI</h2>
          <p className="text-muted-foreground leading-relaxed">
            Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults. It is defined as a person's weight in kilograms divided by the square of his height in meters (kg/m²).
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {[
              { label: 'Underweight', range: '< 18.5', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
              { label: 'Normal weight', range: '18.5 – 24.9', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
              { label: 'Overweight', range: '25 – 29.9', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
              { label: 'Obesity', range: '≥ 30', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
            ].map((item) => (
              <div key={item.label} className={`p-4 rounded-lg border ${item.color.replace('bg-', 'border-').replace('100', '200')}`}>
                <div className="font-bold text-lg">{item.range}</div>
                <div className="text-sm font-medium opacity-80">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Is BMI accurate for athletes?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                BMI may not be accurate for athletes or bodybuilders because it does not distinguish between muscle and fat. Muscle is denser than fat, so an athlete might have a high BMI but low body fat.
              </p>
            </details>
            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What is the best time to weigh myself?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                For the most consistent results, weigh yourself first thing in the morning after using the bathroom and before eating or drinking.
              </p>
            </details>
          </div>
        </section>
      </div>
    </ToolWrapper>
  );
}