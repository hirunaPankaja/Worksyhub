// src/app/weight-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Weight, BookOpen, Scale, ChefHat, Dumbbell } from 'lucide-react';

// Conversion factors relative to 1 kilogram
const weightConversionRates = {
  kilogram: 1,
  gram: 1000,
  milligram: 1000000,
  pound: 2.20462,
  ounce: 35.274,
  ton: 0.001,
};

type WeightUnit = keyof typeof weightConversionRates;

export default function WeightConverterPage() {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<WeightUnit>('kilogram');
  const [toUnit, setToUnit] = useState<WeightUnit>('pound');
  const [result, setResult] = useState('');

  const units = Object.keys(weightConversionRates) as WeightUnit[];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        convert();
      }
      if (event.key === 'Escape') {
        setInputValue('1');
        setResult('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputValue, fromUnit, toUnit]);

  // Auto-calculate on load and change
  useEffect(() => {
    convert();
  }, [fromUnit, toUnit, inputValue]);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Invalid input');
      return;
    }

    const baseValue = value / weightConversionRates[fromUnit];
    const convertedValue = baseValue * weightConversionRates[toUnit];
    setResult(convertedValue.toFixed(6));
  };

  const tutorials = {
    title: 'How to Use the Weight Converter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Value:** Type the number you want to convert in the "From" box.',
          '**2. Select Units:** Choose your starting unit (e.g., "kilogram") and your target unit (e.g., "pound").',
          '**3. View Result:** The conversion happens automatically. The converted value will appear in the "To" box.',
          '',
          "**Example:** To convert 5 kilograms to pounds:",
          "  - 1. Enter **5** in the input field.",
          "  - 2. Select **kilogram** from the 'From' dropdown.",
          "  - 3. Select **pound** from the 'To' dropdown.",
          "  - 4. The result **11.02310** will instantly appear.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Weight & Mass Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Instantly convert kilograms, pounds, ounces, grams, and more.
        </p>
      </div>

      {/* --- Weight Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground capitalize">
          Weight Converter
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to convert, Escape to clear
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FROM */}
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="fromUnit">From</label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as WeightUnit)}
              className="w-full p-3 rounded-lg border bg-background mb-3"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          {/* TO */}
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="toUnit">To</label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as WeightUnit)}
              className="w-full p-3 rounded-lg border bg-background mb-3"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <div className="w-full p-3 rounded-lg border bg-muted min-h-[48px] flex items-center">
              {result ? (
                <p className="text-2xl font-bold text-foreground break-all">
                  {result}
                </p>
              ) : (
                <p className="text-muted-foreground">Result</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Converter
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

        {/* --- What is Weight vs. Mass? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            Understanding Weight and Mass
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>While often used interchangeably in daily life, **weight** and **mass** are different scientific concepts:</p>
            <ul>
              <li><strong>Mass</strong> is the amount of "stuff" (matter) in an object. It is constant everywhere (on Earth, on the Moon, etc.). The base unit is the **kilogram (kg)**.</li>
              <li><strong>Weight</strong> is the force of gravity acting on an object's mass. Your weight would be less on the Moon, but your mass would be the same. The base unit is the **Newton (N)**.</li>
            </ul>
            <p>This tool is a **weight converter** for common usage, meaning it converts between units of mass (like kg and lbs) as they are used to express weight on Earth.</p>
          </div>
        </div>
        
        {/* --- Common Applications --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            Common Weight Conversions
          </h2>
          <p className="text-muted-foreground mb-4">Here are some practical examples of where weight conversions are used every day.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cooking */}
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold flex items-center gap-2"><ChefHat className="h-5 w-5" />Cooking & Baking</h3>
              <p>Recipes from different parts of the world use different units. A European recipe might call for 250 grams (g) of flour, while an American one might call for 9 ounces (oz).</p>
              <ul className="text-sm">
                <li>1 Ounce (oz) ≈ 28.35 Grams (g)</li>
                <li>1 Pound (lb) ≈ 453.6 Grams (g)</li>
                <li>1 Kilogram (kg) ≈ 2.2 Pounds (lb)</li>
              </ul>
            </div>
            
            {/* Fitness */}
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold flex items-center gap-2"><Dumbbell className="h-5 w-5" />Fitness & Health</h3>
              <p>Gym equipment is often in kilograms (kg), but you might track your personal body weight in pounds (lbs). Converting between them is essential for tracking progress.</p>
              <ul className="text-sm">
                <li>20 Kilograms (kg) ≈ 44.1 Pounds (lb)</li>
                <li>100 Pounds (lb) ≈ 45.36 Kilograms (kg)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Conversion Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Weight Conversion Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Unit</th>
                  <th className="p-3 border border-border">Equivalent to 1 Kilogram</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Kilogram (kg)</td>
                  <td className="p-3 border border-border">1</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Gram (g)</td>
                  <td className="p-3 border border-border">1,000</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Milligram (mg)</td>
                  <td className="p-3 border border-border">1,000,000</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Pound (lb)</td>
                  <td className="p-3 border border-border">2.20462</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Ounce (oz)</td>
                  <td className="p-3 border border-border">35.274</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Metric Ton (t)</td>
                  <td className="p-3 border border-border">0.001</td>
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
          <a href="/length-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Length Converter
          </a>
          <a href="/temperature-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Temperature Converter
          </a>
          <a href="/area-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Area Converter
          </a>
          <a href="/volume-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Volume Converter
          </a>
        </div>
      </div>
    </div>
  );
}