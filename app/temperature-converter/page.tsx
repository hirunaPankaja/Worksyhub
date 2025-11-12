// src/app/temperature-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Thermometer, BookOpen, Sun, Snowflake } from 'lucide-react';

// Define the units as a specific type
type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

const units: TempUnit[] = ['celsius', 'fahrenheit', 'kelvin'];

export default function TemperatureConverterPage() {
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState<TempUnit>('celsius');
  const [toUnit, setToUnit] = useState<TempUnit>('fahrenheit');
  const [result, setResult] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        convert();
      }
      if (event.key === 'Escape') {
        setInputValue('0');
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

    let celsius = value;

    // 1. Convert input value to base unit (Celsius)
    if (fromUnit === 'fahrenheit') {
      celsius = ((value - 32) * 5) / 9;
    } else if (fromUnit === 'kelvin') {
      celsius = value - 273.15;
    }

    // 2. Convert from Celsius to target unit
    let output = celsius;
    if (toUnit === 'fahrenheit') {
      output = (celsius * 9) / 5 + 32;
    } else if (toUnit === 'kelvin') {
      output = celsius + 273.15;
    }

    setResult(output.toFixed(2));
  };

  const tutorials = {
    title: 'How to Use the Temperature Converter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Value:** Type the temperature you want to convert in the "From" box.',
          '**2. Select Units:** Choose your starting unit (e.g., "Celsius") and your target unit (e.g., "Fahrenheit").',
          '**3. View Result:** The conversion happens automatically. The converted temperature will appear in the "To" box.',
          '',
          "**Example:** To convert 100° Celsius to Fahrenheit:",
          "  - 1. Enter **100** in the input field.",
          "  - 2. Select **celsius** from the 'From' dropdown.",
          "  - 3. Select **fahrenheit** from the 'To' dropdown.",
          "  - 4. The result **212.00** will instantly appear.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Temperature Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K)
        </p>
      </div>

      {/* --- Temperature Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground capitalize">
          Temperature Converter
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
              onChange={(e) => setFromUnit(e.target.value as TempUnit)}
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
              placeholder="Enter temperature"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          {/* TO */}
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="toUnit">To</label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as TempUnit)}
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

        {/* --- Understanding Temperature Scales --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Thermometer className="h-6 w-6 text-primary" />
            Understanding Temperature Scales
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Temperature measures how hot or cold something is. The three most common scales are Celsius, Fahrenheit, and Kelvin.</p>
            
            <h3 className="text-xl font-semibold mt-6 flex items-center gap-2"><Snowflake className="h-5 w-5" />Celsius (°C)</h3>
            <p>Part of the Metric system, the Celsius scale is used by most of the world. It is based on the freezing and boiling points of water.</p>
            <ul>
              <li>**0°C:** Freezing point of water</li>
              <li>**100°C:** Boiling point of water</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 flex items-center gap-2"><Sun className="h-5 w-5" />Fahrenheit (°F)</h3>
            <p>Part of the Imperial system, the Fahrenheit scale is used primarily in the United States. It is also based on the freezing and boiling points of water, but with different values.</p>
            <ul>
              <li>**32°F:** Freezing point of water</li>
              <li>**212°F:** Boiling point of water</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6">Kelvin (K)</h3>
            <p>Kelvin is the base unit of temperature in the International System of Units (SI). It is an absolute scale, meaning **0 K** is **absolute zero**, the point where all atomic motion stops. It is primarily used in science and engineering.</p>
            <ul>
              <li>**0 K:** Absolute Zero (-273.15°C)</li>
              <li>**273.15 K:** Freezing point of water (0°C)</li>
            </ul>
          </div>
        </div>
        
        {/* --- Conversion Formulas Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Temperature Conversion Formulas
          </h2>
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
                  <td className="p-3 border border-border font-semibold">Celsius (°C)</td>
                  <td className="p-3 border border-border font-semibold">Fahrenheit (°F)</td>
                  <td className="p-3 border border-border font-mono">(°C * 9/5) + 32</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Fahrenheit (°F)</td>
                  <td className="p-3 border border-border font-semibold">Celsius (°C)</td>
                  <td className="p-3 border border-border font-mono">(°F - 32) * 5/9</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Celsius (°C)</td>
                  <td className="p-3 border border-border font-semibold">Kelvin (K)</td>
                  <td className="p-3 border border-border font-mono">°C + 273.15</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Kelvin (K)</td>
                  <td className="p-3 border border-border font-semibold">Celsius (°C)</td>
                  <td className="p-3 border border-border font-mono">K - 273.15</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Fahrenheit (°F)</td>
                  <td className="p-3 border border-border font-semibold">Kelvin (K)</td>
                  <td className="p-3 border border-border font-mono">(°F - 32) * 5/9 + 273.15</td>
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