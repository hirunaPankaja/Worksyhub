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

      {/* Comprehensive SEO Content */}
      <div className="mt-12 space-y-10 border-t pt-8">

        {/* What is BMI Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">What is BMI? Complete Guide to Body Mass Index</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              <strong>Body Mass Index (BMI)</strong> is a widely-used health screening tool that estimates body fat based on your height and weight. Originally developed by Belgian mathematician Adolphe Quetelet in the 1800s, BMI has become the standard method used by doctors, nutritionists, and health professionals worldwide to quickly assess whether a person's weight falls within a healthy range.
            </p>
            <p className="leading-relaxed">
              Our <strong>free online BMI calculator</strong> provides instant results without requiring any personal information or signup. Simply enter your weight in kilograms and height in centimeters, and you'll immediately see your BMI score along with your health category. All calculations happen directly in your browser, ensuring complete privacy.
            </p>
          </div>
        </section>

        {/* How BMI is Calculated */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">How is BMI Calculated? The BMI Formula Explained</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              The <strong>BMI formula</strong> is straightforward: divide your weight in kilograms by your height in meters squared. This gives you a single number that represents your body mass relative to your height.
            </p>
          </div>
          <Card className="p-6 bg-muted/30 border-2">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">BMI Formula</p>
              <p className="text-2xl font-bold font-mono">BMI = Weight (kg) ÷ Height² (m²)</p>
              <div className="mt-4 text-sm text-muted-foreground">
                <p><strong>Example:</strong> If you weigh 70 kg and are 1.75 m tall:</p>
                <p className="font-mono mt-1">BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = <strong>22.9</strong></p>
              </div>
            </div>
          </Card>
        </section>

        {/* BMI Categories */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">BMI Categories: Understanding Your Results</h2>
          <p className="text-muted-foreground leading-relaxed">
            The World Health Organization (WHO) classifies BMI into four main categories. Each category provides guidance on potential health risks and recommended actions:
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <Card className="p-6 border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
              <div className="text-blue-700 dark:text-blue-300">
                <h3 className="font-bold text-xl mb-2">Underweight (BMI {"<"} 18.5)</h3>
                <p className="text-sm opacity-90">Being underweight may indicate malnutrition, eating disorders, or other health conditions. Consider consulting a healthcare provider to discuss healthy ways to gain weight through proper nutrition.</p>
              </div>
            </Card>
            <Card className="p-6 border-2 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20">
              <div className="text-green-700 dark:text-green-300">
                <h3 className="font-bold text-xl mb-2">Normal Weight (BMI 18.5 – 24.9)</h3>
                <p className="text-sm opacity-90">Congratulations! A BMI in this range is associated with the lowest health risks. Maintain your healthy weight through balanced nutrition and regular physical activity.</p>
              </div>
            </Card>
            <Card className="p-6 border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/20">
              <div className="text-yellow-700 dark:text-yellow-300">
                <h3 className="font-bold text-xl mb-2">Overweight (BMI 25 – 29.9)</h3>
                <p className="text-sm opacity-90">Being overweight increases risk for heart disease, diabetes, and other conditions. Consider lifestyle changes including improved diet and increased physical activity.</p>
              </div>
            </Card>
            <Card className="p-6 border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20">
              <div className="text-red-700 dark:text-red-300">
                <h3 className="font-bold text-xl mb-2">Obese (BMI ≥ 30)</h3>
                <p className="text-sm opacity-90">Obesity significantly increases health risks. Consult with healthcare professionals about weight management strategies, which may include dietary changes, exercise programs, or medical interventions.</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Benefits of Knowing Your BMI */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Why Should You Calculate Your BMI?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Quick Health Screening</h3>
                  <p className="text-sm text-muted-foreground">BMI provides an instant snapshot of whether your weight is in a healthy range for your height.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">Monitor your weight management journey by calculating BMI regularly to see trends over time.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Identify Health Risks</h3>
                  <p className="text-sm text-muted-foreground">High or low BMI can indicate increased risk for certain health conditions, prompting early intervention.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold">Set Realistic Goals</h3>
                  <p className="text-sm text-muted-foreground">Understanding your current BMI helps set achievable weight targets for fitness and health goals.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold">Insurance & Medical Purposes</h3>
                  <p className="text-sm text-muted-foreground">Many insurance companies and medical providers use BMI as part of health assessments and eligibility criteria.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">6</span>
                </div>
                <div>
                  <h3 className="font-semibold">Free & Private</h3>
                  <p className="text-sm text-muted-foreground">Our online BMI calculator is 100% free, requires no signup, and keeps your data completely private.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions About BMI</h2>
          <div className="space-y-3">
            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What is a healthy BMI for adults?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                A healthy BMI for adults is between 18.5 and 24.9. This range is associated with the lowest risk of weight-related health problems. However, individual health should be evaluated by considering other factors like muscle mass, age, and overall fitness level.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Is BMI accurate for athletes and bodybuilders?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                BMI may not be accurate for athletes or bodybuilders because it doesn't distinguish between muscle and fat mass. Since muscle is denser than fat, highly muscular individuals may have a high BMI while having low body fat. Athletes should consider additional metrics like body fat percentage, waist circumference, or DEXA scans.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Does BMI change with age?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                While the BMI formula remains the same, interpretation may vary with age. Older adults tend to have more body fat and less muscle mass, so a slightly higher BMI (25-27) might still be healthy for seniors. Children and teenagers use age-specific BMI percentile charts for accurate assessment.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What is the best time to weigh myself for BMI calculation?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                For the most consistent and accurate results, weigh yourself first thing in the morning after using the bathroom and before eating or drinking. Wear minimal clothing and use the same scale each time. Your weight can fluctuate 2-4 pounds throughout the day due to food, water, and activity.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Can BMI be used during pregnancy?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Standard BMI categories are not applicable during pregnancy due to expected weight gain. Healthcare providers use pre-pregnancy BMI to guide healthy weight gain recommendations during pregnancy. Always consult with your doctor for pregnancy-specific health assessments.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How accurate is an online BMI calculator?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Online BMI calculators are just as accurate as manual calculations since they use the same standardized formula (weight ÷ height²). The key to accuracy is ensuring you enter your correct weight and height measurements. Our calculator uses the WHO-approved formula used by healthcare professionals worldwide.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What are the limitations of BMI?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                BMI has several limitations: it doesn't distinguish between muscle and fat, doesn't account for fat distribution (belly fat vs. overall fat), doesn't consider age or gender differences, and may not be accurate for all ethnic groups. For a complete health picture, combine BMI with waist circumference measurements and professional medical advice.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How can I lower my BMI safely?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                To safely lower your BMI, focus on gradual lifestyle changes: eat a balanced diet rich in vegetables, fruits, lean proteins, and whole grains; exercise regularly (aim for 150+ minutes per week of moderate activity); stay hydrated; get adequate sleep; and manage stress. Aim to lose 1-2 pounds per week for sustainable results. Consult a healthcare provider before starting any weight loss program.
              </p>
            </details>
          </div>
        </section>

        {/* Related Tools */}
        <section className="p-6 rounded-xl bg-primary/5 border border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-center">Related Health & Fitness Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <a href="/age-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Age Calculator</div>
              <div className="text-xs text-muted-foreground">Calculate exact age</div>
            </a>
            <a href="/percentage-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Percentage Calculator</div>
              <div className="text-xs text-muted-foreground">Calculate percentages</div>
            </a>
            <a href="/unit-converter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Unit Converter</div>
              <div className="text-xs text-muted-foreground">Convert kg to lbs</div>
            </a>
            <a href="/emi-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">EMI Calculator</div>
              <div className="text-xs text-muted-foreground">Plan your finances</div>
            </a>
          </div>
        </section>

      </div>
    </ToolWrapper>
  );
}