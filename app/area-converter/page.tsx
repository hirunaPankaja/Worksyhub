// src/app/area-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Square, BookOpen, Map, Home } from 'lucide-react';
import Image from 'next/image';

// Conversion factors relative to 1 square meter
const areaConversionRates = {
  'square meter': 1,
  'square kilometer': 0.000001,
  'square mile': 3.861e-7,
  'square yard': 1.19599,
  'square foot': 10.7639,
  acre: 0.000247105,
  hectare: 0.0001,
};

type AreaUnit = keyof typeof areaConversionRates;

export default function AreaConverterPage() {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<AreaUnit>('square meter');
  const [toUnit, setToUnit] = useState<AreaUnit>('square foot');
  const [result, setResult] = useState('');

  const units = Object.keys(areaConversionRates) as AreaUnit[];

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

    const baseValue = value / areaConversionRates[fromUnit];
    const convertedValue = baseValue * areaConversionRates[toUnit];
    setResult(convertedValue.toFixed(6));
  };

  const tutorials = {
    title: 'How to Use the Area Converter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Value:** Type the area you want to convert in the "From" box.',
          '**2. Select Units:** Choose your starting unit (e.g., "acre") and your target unit (e.g., "hectare").',
          '**3. View Result:** The conversion happens automatically. The converted area will appear in the "To" box.',
          '',
          "**Example:** To convert 5 acres to square feet:",
          "  - 1. Enter **5** in the input field.",
          "  - 2. Select **acre** from the 'From' dropdown.",
          "  - 3. Select **square foot** from the 'To' dropdown.",
          "  - 4. The result **217800.00** will instantly appear.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Area Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert acres, hectares, square feet, square meters, and more.
        </p>
      </div>

      {/* --- Area Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground capitalize">
          Area Converter
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
              onChange={(e) => setFromUnit(e.target.value as AreaUnit)}
              className="w-full p-3 rounded-lg border bg-background mb-3 capitalize"
            >
              {units.map((unit) => (
                <option key={unit} value={unit} className="capitalize">
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
              onChange={(e) => setToUnit(e.target.value as AreaUnit)}
              className="w-full p-3 rounded-lg border bg-background mb-3 capitalize"
            >
              {units.map((unit) => (
                <option key={unit} value={unit} className="capitalize">
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

        {/* --- What is Area? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Square className="h-6 w-6 text-primary" />
            What is Area?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Area is the measure of a two-dimensional space enclosed within a boundary. It tells you how much surface a flat shape covers. For example, the area of a room tells you how much carpet you need to buy.</p>
            <p>Like length, area is measured using both the **Metric** and **Imperial** systems, which can be confusing. This tool makes it easy to switch between them.</p>
            
            <h3 className="text-xl font-semibold mt-6">Common Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Home className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Real Estate & Construction</h4>
                  <p className="text-sm">Calculating the size of a house in square feet (sq ft) or a plot of land in acres or hectares (ha).</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Map className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Agriculture & Geography</h4>
                  <p className="text-sm">Measuring farmland in acres or hectares, or mapping the size of a national park in square miles (sq mi) or square kilometers (km²).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* --- Common Area Conversions Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Common Area Conversions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Unit</th>
                  <th className="p-3 border border-border">Equivalent to...</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Acre</td>
                  <td className="p-3 border border-border">43,560 Square Feet</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Hectare</td>
                  <td className="p-3 border border-border">10,000 Square Meters</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Hectare</td>
                  <td className="p-3 border border-border">2.471 Acres</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Square Mile</td>
                  <td className="p-3 border border-border">640 Acres</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Square Kilometer</td>
                  <td className="p-3 border border-border">100 Hectares</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Square Meter</td>
                  <td className="p-3 border border-border">10.764 Square Feet</td>
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
          <a href="/weight-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Weight Converter
          </a>
          <a href="/temperature-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Temperature Converter
          </a>
          <a href="/volume-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Volume Converter
          </a>
        </div>
      </div>
    </div>
  );
}