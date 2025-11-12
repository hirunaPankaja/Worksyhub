// src/app/length-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Ruler, BookOpen, Scaling, Map } from 'lucide-react';
import Image from 'next/image'; // Import Image

// Conversion factors relative to 1 meter
const lengthConversionRates = {
  meter: 1,
  kilometer: 0.001,
  centimeter: 100,
  millimeter: 1000,
  mile: 0.000621371,
  yard: 1.09361,
  foot: 3.28084,
  inch: 39.3701,
};

type LengthUnit = keyof typeof lengthConversionRates;

export default function LengthConverterPage() {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<LengthUnit>('meter');
  const [toUnit, setToUnit] = useState<LengthUnit>('foot');
  const [result, setResult] = useState('');

  const units = Object.keys(lengthConversionRates) as LengthUnit[];

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
  }, [inputValue, fromUnit, toUnit]); // Dependencies

  // Auto-calculate on load
  useEffect(() => {
    convert();
  }, [fromUnit, toUnit, inputValue]);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Invalid input');
      return;
    }

    const baseValue = value / lengthConversionRates[fromUnit];
    const convertedValue = baseValue * lengthConversionRates[toUnit];
    setResult(convertedValue.toFixed(6));
  };

  const tutorials = {
    title: 'How to Use the Length Converter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Value:** Type the number you want to convert in the "From" box.',
          '**2. Select Units:** Choose your starting unit (e.g., "meter") and your target unit (e.g., "foot").',
          '**3. View Result:** The conversion happens automatically. The converted value will appear in the "To" box.',
          '',
          "**Example:** To convert 5 kilometers to miles:",
          "  - 1. Enter **5** in the input field.",
          "  - 2. Select **kilometer** from the 'From' dropdown.",
          "  - 3. Select **mile** from the 'To' dropdown.",
          "  - 4. The result **3.106855** will instantly appear.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Length & Distance Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Instantly convert between metric and imperial units of length
        </p>
      </div>

      {/* --- Length Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground capitalize">
          Length Converter
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
              onChange={(e) => setFromUnit(e.target.value as LengthUnit)}
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
              onChange={(e) => setToUnit(e.target.value as LengthUnit)}
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

        {/* --- What is Length? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Scaling className="h-6 w-6 text-primary" />
            Metric vs. Imperial Systems
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Length is the measure of distance between two points. The two most common systems for measuring length are the "Metric" system and the "Imperial" system.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold">Metric System</h3>
                <p>Used by most of the world, the metric system is based on the "meter (m)". It's a decimal system, meaning all units are powers of 10.</p>
                <ul>
                  <li>1 Kilometer (km) = 1,000 meters</li>
                  <li>1 Meter (m) = Base unit</li>
                  <li>1 Centimeter (cm) = 0.01 meters</li>
                  <li>1 Millimeter (mm) = 0.001 meters</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Imperial System</h3>
                <p>Used primarily in the United States, the imperial system uses units like the **foot (ft)**, **inch (in)**, and **mile (mi)**.</p>
                <ul>
                  <li>1 Mile (mi) = 1,760 yards</li>
                  <li>1 Mile (mi) = 5,280 feet</li>
                  <li>1 Yard (yd) = 3 feet</li>
                  <li>1 Foot (ft) = 12 inches</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* --- Common Conversions Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Map className="h-6 w-6 text-primary" />
            Common Length Conversions
          </h2>
          <p className="text-muted-foreground mb-4">Here is a quick reference table for common length conversions.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">From (Imperial)</th>
                  <th className="p-3 border border-border">To (Metric)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Inch</td>
                  <td className="p-3 border border-border">2.54 Centimeters</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Foot</td>
                  <td className="p-3 border border-border">0.3048 Meters</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Yard</td>
                  <td className="p-3 border border-border">0.9144 Meters</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Mile</td>
                  <td className="p-3 border border-border">1.60934 Kilometers</td>
                </tr>
              </tbody>
              <thead className="mt-4">
                <tr className="bg-muted">
                  <th className="p-3 border border-border">From (Metric)</th>
                  <th className="p-3 border border-border">To (Imperial)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Centimeter</td>
                  <td className="p-3 border border-border">0.3937 Inches</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Meter</td>
                  <td className="p-3 border border-border">3.28084 Feet</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">1 Kilometer</td>
                  <td className="p-3 border border-border">0.62137 Miles</td>
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
          <a href="/weight-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Weight Converter
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