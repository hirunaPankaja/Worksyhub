// src/app/volume-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Droplet, BookOpen, Beaker, ChefHat, Car, HelpCircle } from 'lucide-react';

// Conversion factors relative to 1 liter
const volumeConversionRates = {
  liter: 1,
  milliliter: 1000,
  gallon: 0.264172, // US Gallon
  quart: 1.05669,
  pint: 2.11338,
  cup: 4.22675,
  'fluid ounce': 33.814,
};

type VolumeUnit = keyof typeof volumeConversionRates;

export default function VolumeConverterPage() {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<VolumeUnit>('liter');
  const [toUnit, setToUnit] = useState<VolumeUnit>('gallon');
  const [result, setResult] = useState('');

  const units = Object.keys(volumeConversionRates) as VolumeUnit[];

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

    const baseValue = value / volumeConversionRates[fromUnit];
    const convertedValue = baseValue * volumeConversionRates[toUnit];
    setResult(convertedValue.toFixed(6));
  };

  const tutorials = {
    title: 'How to Use the Volume Converter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Value:** Type the volume you want to convert in the "From" box.',
          '**2. Select Units:** Choose your starting unit (e.g., "liter") and your target unit (e.g., "gallon").',
          '**3. View Result:** The conversion happens automatically. The converted volume will appear in the "To" box.',
          '',
          "**Example:** To convert 2.5 liters to cups:",
          "  - 1. Enter **2.5** in the input field.",
          "  - 2. Select **liter** from the 'From' dropdown.",
          "  - 3. Select **cup** from the 'To' dropdown.",
          "  - 4. The result **10.566875** will instantly appear.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Volume Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert liters, gallons, milliliters, cups, fluid ounces, and more.
        </p>
      </div>

      {/* --- Volume Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground capitalize">
          Volume Converter
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
              onChange={(e) => setFromUnit(e.target.value as VolumeUnit)}
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
              onChange={(e) => setToUnit(e.target.value as VolumeUnit)}
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

        {/* --- Understanding Volume Units --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Beaker className="h-6 w-6 text-primary" />
            Understanding Volume: Metric vs. US Customary
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Volume is the measure of three-dimensional space. The two most common systems are the Metric system (liters) and the US Customary system (gallons).</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold">Metric System (Liters)</h3>
                <p>Based on the **liter (L)**, this system is used globally. It scales by powers of 10, making it simple to use.</p>
                <ul className="list-disc pl-5">
                  <li>1 Liter (L) = 1,000 Milliliters (mL)</li>
                  <li>1 Milliliter (mL) = 1 Cubic Centimeter (cc)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">US Customary (Gallons)</h3>
                <p>Used primarily in the United States, this system is based on the **gallon (gal)**.</p>
                <ul className="list-disc pl-5">
                  <li>1 Gallon (gal) = 4 Quarts (qt)</li>
                  <li>1 Quart (qt) = 2 Pints (pt)</li>
                  <li>1 Pint (pt) = 2 Cups (c)</li>
                  <li>1 Cup (c) = 8 Fluid Ounces (fl oz)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* --- US vs. Imperial Gallon --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            What's the Difference: US vs. Imperial Gallon?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>To make things more confusing, the US gallon and the UK (Imperial) gallon are **not the same size!**</p>
            <ul className="list-disc pl-5">
              <li>**1 US Gallon** ≈ 3.785 Liters</li>
              <li>**1 Imperial (UK) Gallon** ≈ 4.546 Liters</li>
            </ul>
            <p>This converter uses the **US Gallon** by default, as it is more common for online conversions, especially for consumer products and recipes.</p>
          </div>
        </div>
        
        {/* --- Practical Applications --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Practical Applications
          </h2>
          <div className="prose prose-lg max-w-none text-foreground grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2"><ChefHat className="h-5 w-5 text-primary" />Cooking & Recipes</h3>
              <p>Following a recipe from another country almost always requires volume conversion. An American recipe might call for "1 cup of milk," while a European one asks for "240 mL".</p>
              <ul className="text-sm list-disc pl-5">
                <li>1 Cup (US) ≈ 236.5 mL</li>
                <li>1 Fluid Ounce (US) ≈ 29.57 mL</li>
                <li>1 Tablespoon (US) ≈ 14.79 mL</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2"><Car className="h-5 w-5 text-primary" />Fuel & Automotive</h3>
              <p>Gas prices and fuel economy are measured differently. In the U.S., it's "miles per gallon" (MPG), while in Canada and Europe, it's "liters per 100 kilometers" (L/100km).</p>
              <ul className="text-sm list-disc pl-5">
                <li>1 US Gallon ≈ 3.785 Liters</li>
                <li>To convert MPG to L/100km, the formula is: 235.21 / (MPG)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Conversion Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Volume Conversion Table (US)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Unit</th>
                  <th className="p-3 border border-border">Equivalent to 1 Liter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Liter (L)</td>
                  <td className="p-3 border border-border">1</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Milliliter (mL)</td>
                  <td className="p-3 border border-border">1000</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">US Gallon (gal)</td>
                  <td className="p-3 border border-border">0.264172</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">US Quart (qt)</td>
                  <td className="p-3 border border-border">1.05669</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">US Pint (pt)</td>
                  <td className="p-3 border border-border">2.11338</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">US Cup (c)</td>
                  <td className="p-3 border border-border">4.22675</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">US Fluid Ounce (fl oz)</td>
                  <td className="p-3 border border-border">33.814</td>
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
          <a href="/speed-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Speed Converter
          </a>
        </div>
      </div>
    </div>
  );
}