// src/app/speed-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Gauge, BookOpen, Car, Wind, Sailboat } from 'lucide-react';
import Image from 'next/image';

// Conversion factors relative to 1 km/h
const speedConversionRates = {
  'km/h': 1,
  mph: 0.621371,
  'm/s': 0.277778,
  knots: 0.539957,
};

type SpeedUnit = keyof typeof speedConversionRates;

export default function SpeedConverterPage() {
  const [inputValue, setInputValue] = useState('100');
  const [fromUnit, setFromUnit] = useState<SpeedUnit>('km/h');
  const [toUnit, setToUnit] = useState<SpeedUnit>('mph');
  const [result, setResult] = useState('');

  const units = Object.keys(speedConversionRates) as SpeedUnit[];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        convert();
      }
      if (event.key === 'Escape') {
        setInputValue('100');
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

    const baseValue = value / speedConversionRates[fromUnit];
    const convertedValue = baseValue * speedConversionRates[toUnit];
    setResult(convertedValue.toFixed(4));
  };

  const tutorials = {
    title: 'How to Use the Speed Converter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Value:** Type the speed you want to convert in the "From" box.',
          '**2. Select Units:** Choose your starting unit (e.g., "km/h") and your target unit (e.g., "mph").',
          '**3. View Result:** The conversion happens automatically. The converted speed will appear in the "To" box.',
          '',
          "**Example:** To convert 100 km/h to mph:",
          "  - 1. Enter **100** in the input field.",
          "  - 2. Select **km/h** from the 'From' dropdown.",
          "  - 3. Select **mph** from the 'To' dropdown.",
          "  - 4. The result **62.1371** will instantly appear.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Speed Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert km/h, mph, m/s, and knots instantly.
        </p>
      </div>

      {/* --- Speed Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground capitalize">
          Speed Converter
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
              onChange={(e) => setFromUnit(e.target.value as SpeedUnit)}
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
              onChange={(e) => setToUnit(e.target.value as SpeedUnit)}
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

        {/* --- Understanding Speed Units --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Gauge className="h-6 w-6 text-primary" />
            Understanding Speed Units
          </h2>
          <div className="prose prose-lg max-w-none text-foreground space-y-4">
            <p>Speed is the measure of how quickly an object moves, defined as distance traveled over a period of time. Different fields and regions use different units.</p>
            
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2"><Car className="h-5 w-5" />Kilometers per Hour (km/h) & Miles per Hour (mph)</h3>
              <p>These are the most common units for road travel. Most of the world uses **km/h**, while the United States, United Kingdom, and a few other countries use **mph**.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mt-6 flex items-center gap-2"><Wind className="h-5 w-5" />Meters per Second (m/s)</h3>
              <p>This is the standard (SI) unit for speed, used widely in science, physics, and engineering. It measures the number of meters traveled in a single second.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mt-6 flex items-center gap-2"><Sailboat className="h-5 w-5" />Knots (kn)</h3>
              <p>A knot is a unit of speed equal to one nautical mile per hour. It is used extensively in maritime and aviation navigation.</p>
            </div>
          </div>
        </div>
        
        {/* --- Conversion Formulas Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Speed Conversion Formulas
          </h2>
          <p className="text-muted-foreground mb-4">Here are the formulas used for converting between common speed units.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">From</th>
                  <th className="p-3 border border-border">To</th>
                  <th className="p-3 border border-border">Formula</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">km/h</td>
                  <td className="p-3 border border-border font-semibold">mph</td>
                  <td className="p-3 border border-border font-mono">value × 0.621371</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">mph</td>
                  <td className="p-3 border border-border font-semibold">km/h</td>
                  <td className="p-3 border border-border font-mono">value / 0.621371</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">km/h</td>
                  <td className="p-3 border border-border font-semibold">m/s</td>
                  <td className="p-3 border border-border font-mono">value × 0.277778</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">m/s</td>
                  <td className="p-3 border border-border font-semibold">km/h</td>
                  <td className="p-3 border border-border font-mono">value * 3.6</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">km/h</td>
                  <td className="p-3 border border-border font-semibold">knots</td>
                  <td className="p-3 border border-border font-mono">value × 0.539957</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">knots</td>
                  <td className="p-3 border border-border font-semibold">km/h</td>
                  <td className="p-3 border border-border font-mono">value / 0.539957</td>
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
          <a href="/area-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Area Converter
          </a>
        </div>
      </div>
    </div>
  );
}