// src/app/weight-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Weight, BookOpen, Scale, ChefHat, Dumbbell, Zap, RotateCcw, Copy, Check } from 'lucide-react';

// Conversion factors relative to 1 kilogram
const weightConversionRates = {
  kilogram: 1,
  gram: 1000,
  milligram: 1000000,
  pound: 2.20462,
  ounce: 35.274,
  ton: 0.001,
  stone: 0.157473,
  carat: 5000,
};

type WeightUnit = keyof typeof weightConversionRates;

export default function WeightConverterPage() {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<WeightUnit>('kilogram');
  const [toUnit, setToUnit] = useState<WeightUnit>('pound');
  const [result, setResult] = useState('2.20462');
  const [copied, setCopied] = useState(false);
  const [conversionHistory, setConversionHistory] = useState<Array<{
    from: string;
    to: string;
    value: string;
    result: string;
  }>>([]);

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
        setConversionHistory([]);
      }
      if (event.ctrlKey && event.key === 'c' && result) {
        copyToClipboard();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputValue, fromUnit, toUnit, result]);

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
    const formattedResult = convertedValue.toFixed(6).replace(/\.?0+$/, '');
    setResult(formattedResult);

    // Add to history
    if (value && convertedValue) {
      setConversionHistory(prev => [{
        from: `${value} ${fromUnit}`,
        to: `${formattedResult} ${toUnit}`,
        value: inputValue,
        result: formattedResult
      }, ...prev.slice(0, 4)]);
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const resetConverter = () => {
    setInputValue('1');
    setFromUnit('kilogram');
    setToUnit('pound');
    setResult('2.20462');
  };

  const tutorials = {
    title: 'How to Use the Weight Converter - Complete Guide',
    sections: [
      {
        title: 'Step-by-Step Weight Conversion Guide',
        content: [
          '**1. Enter Value:** Type the number you want to convert in the "From" box. Our weight converter accepts any numerical value.',
          '**2. Select Units:** Choose your starting weight unit (e.g., "kilogram") and your target weight unit (e.g., "pound").',
          '**3. View Result:** The weight conversion happens automatically. The converted weight value will appear in the "To" box.',
          '',
          "**Example Weight Conversion:** To convert 5 kilograms to pounds:",
          "  - 1. Enter **5** in the input field.",
          "  - 2. Select **kilogram** from the 'From' dropdown.",
          "  - 3. Select **pound** from the 'To' dropdown.",
          "  - 4. The result **11.02310** will instantly appear.",
          '',
          "**Advanced Features:**",
          "  - Use **Enter** key to convert weight instantly",
          "  - Use **Escape** key to reset the weight converter",
          "  - Use **Swap** button to reverse weight units",
          "  - Use **Copy** button to copy weight results",
          "  - View **Conversion History** of your recent weight conversions",
        ],
      },
    ],
  };

  const popularConversions = [
    { from: 'kilogram', to: 'pound', value: '1' },
    { from: 'pound', to: 'kilogram', value: '1' },
    { from: 'ounce', to: 'gram', value: '1' },
    { from: 'gram', to: 'ounce', value: '100' },
    { from: 'stone', to: 'kilogram', value: '1' },
    { from: 'kilogram', to: 'stone', value: '1' },
  ];

  const setPopularConversion = (from: WeightUnit, to: WeightUnit, value: string) => {
    setFromUnit(from);
    setToUnit(to);
    setInputValue(value);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      

      {/* --- Weight Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-card-foreground capitalize flex items-center gap-2">
            <Weight className="h-6 w-6 text-primary" />
            Weight Converter Tool
          </h2>
          <div className="flex gap-2">
            <button
              onClick={swapUnits}
              className="p-2 rounded-lg border bg-background hover:bg-muted transition-colors"
              title="Swap units"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={resetConverter}
              className="p-2 rounded-lg border bg-background hover:bg-muted transition-colors"
              title="Reset converter"
            >
              <Zap className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Use keyboard: Enter to convert, Escape to clear, Ctrl+C to copy result
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
            <div className="relative">
              <div className="w-full p-3 rounded-lg border bg-muted min-h-[48px] flex items-center">
                {result ? (
                  <p className="text-2xl font-bold text-foreground break-all">
                    {result}
                  </p>
                ) : (
                  <p className="text-muted-foreground">Result</p>
                )}
              </div>
              <button
                onClick={copyToClipboard}
                className="absolute right-2 top-2 p-1 rounded bg-background border hover:bg-muted transition-colors"
                title="Copy result"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Popular Conversions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Popular Weight Conversions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {popularConversions.map((conv, index) => (
              <button
                key={index}
                onClick={() => setPopularConversion(conv.from as WeightUnit, conv.to as WeightUnit, conv.value)}
                className="p-2 text-sm rounded border bg-background hover:bg-muted transition-colors text-left"
              >
                {conv.value} {conv.from} → {conv.to}
              </button>
            ))}
          </div>
        </div>

        {/* Conversion History */}
        {conversionHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Recent Conversions</h3>
            <div className="space-y-2">
              {conversionHistory.map((item, index) => (
                <div key={index} className="p-3 rounded border bg-muted/50 text-sm">
                  <span className="font-medium">{item.from}</span> = <span className="font-bold text-primary">{item.to}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

{/* SEO Intro Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Weight Converter Online - Instant Mass Conversion Tool
        </h1>
        <p className="text-xl text-gray-700 mb-4 font-semibold">
          Convert kilograms to pounds, ounces to grams, and all weight units instantly with our accurate weight converter
        </p>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
            Welcome to the most comprehensive <strong>free online weight converter</strong> tool available. 
            Our advanced <strong>weight conversion calculator</strong> allows you to instantly convert between 
            all major weight and mass units including <strong>kilograms (kg)</strong>, <strong>pounds (lbs)</strong>, 
            <strong> ounces (oz)</strong>, <strong>grams (g)</strong>, <strong>milligrams (mg)</strong>, <strong>tons</strong>, 
            <strong> stones</strong>, and <strong>carats</strong>. Whether you're cooking and need to convert recipe measurements, 
            working out at the gym and tracking weight progress, conducting scientific research requiring precise mass conversions, 
            or simply need quick weight calculations for daily tasks, our weight converter provides accurate, real-time results.
          </p>
          <p>
            This powerful <strong>mass conversion tool</strong> features an intuitive interface with keyboard shortcuts, 
            conversion history, unit swapping capability, and copy-to-clipboard functionality. Unlike other weight converters, 
            our tool offers comprehensive educational content including weight conversion tables, practical examples from cooking 
            and fitness, detailed explanations of weight versus mass concepts, and step-by-step tutorials. The weight converter 
            automatically calculates as you type and supports both metric and imperial weight systems, making it the perfect 
            solution for international users, students, professionals, and anyone needing reliable weight conversions.
          </p>
        </div>
      </div>
      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Weight Converter - Complete Tutorial
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
            Understanding Weight and Mass - Scientific Explanation
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>While often used interchangeably in daily life, <strong>weight</strong> and <strong>mass</strong> are different scientific concepts that our weight converter helps you understand and convert between practical units:</p>
            <ul>
              <li><strong>Mass</strong> is the amount of "stuff" (matter) in an object. It is constant everywhere (on Earth, on the Moon, etc.). The base unit is the <strong>kilogram (kg)</strong>. Mass conversion is what this weight converter primarily handles for practical purposes.</li>
              <li><strong>Weight</strong> is the force of gravity acting on an object's mass. Your weight would be less on the Moon, but your mass would be the same. The base unit is the <strong>Newton (N)</strong>.</li>
            </ul>
            <p>This <strong>weight converter tool</strong> is designed for common usage, meaning it converts between units of mass (like kg and lbs) as they are used to express weight on Earth. For most practical weight conversion needs including cooking weight conversion, fitness weight tracking, and scientific mass calculation, this weight converter provides accurate and instant results.</p>
          </div>
        </div>
        
        {/* --- Common Applications --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            Common Weight Conversions - Practical Applications
          </h2>
          <p className="text-muted-foreground mb-4">Here are practical examples of where weight conversions are used every day with our weight converter tool.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cooking */}
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold flex items-center gap-2"><ChefHat className="h-5 w-5" />Cooking & Baking Weight Conversion</h3>
              <p>Recipes from different parts of the world use different weight units. A European recipe might call for 250 grams (g) of flour, while an American one might call for 9 ounces (oz). Our weight converter makes recipe adaptation simple.</p>
              <ul className="text-sm">
                <li>1 Ounce (oz) ≈ 28.35 Grams (g)</li>
                <li>1 Pound (lb) ≈ 453.6 Grams (g)</li>
                <li>1 Kilogram (kg) ≈ 2.2 Pounds (lb)</li>
                <li>1 Gram (g) ≈ 0.035 Ounces (oz)</li>
              </ul>
            </div>
            
            {/* Fitness */}
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold flex items-center gap-2"><Dumbbell className="h-5 w-5" />Fitness & Health Weight Conversion</h3>
              <p>Gym equipment is often in kilograms (kg), but you might track your personal body weight in pounds (lbs). Converting between them is essential for tracking progress and following international fitness programs.</p>
              <ul className="text-sm">
                <li>20 Kilograms (kg) ≈ 44.1 Pounds (lb)</li>
                <li>100 Pounds (lb) ≈ 45.36 Kilograms (kg)</li>
                <li>1 Stone ≈ 6.35 Kilograms (kg)</li>
                <li>1 Pound (lb) ≈ 0.4536 Kilograms (kg)</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Science */}
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold flex items-center gap-2"><Scale className="h-5 w-5" />Science & Laboratory Weight Conversion</h3>
              <p>Scientific research often requires precise weight conversions between metric units. Our weight converter ensures accuracy for laboratory measurements and experimental data.</p>
              <ul className="text-sm">
                <li>1 Milligram (mg) = 0.001 Grams (g)</li>
                <li>1 Gram (g) = 1000 Milligrams (mg)</li>
                <li>1 Kilogram (kg) = 1000 Grams (g)</li>
                <li>1 Metric Ton = 1000 Kilograms (kg)</li>
              </ul>
            </div>
            
            {/* Jewelry */}
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold flex items-center gap-2">💎 Jewelry & Precious Metals Weight Conversion</h3>
              <p>Precious metals and gemstones use specialized weight units. Convert between carats, grams, and ounces for accurate valuation and comparison.</p>
              <ul className="text-sm">
                <li>1 Carat = 0.2 Grams (g)</li>
                <li>1 Gram (g) = 5 Carats</li>
                <li>1 Ounce (oz) ≈ 141.75 Carats</li>
                <li>1 Troy Ounce ≈ 31.1035 Grams (g)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Conversion Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Complete Weight Conversion Table</h2>
          <p className="text-muted-foreground mb-4">Reference table showing equivalent values for 1 kilogram in all supported weight units</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border font-semibold">Weight Unit</th>
                  <th className="p-3 border border-border font-semibold">Equivalent to 1 Kilogram</th>
                  <th className="p-3 border border-border font-semibold">Common Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Kilogram (kg)</td>
                  <td className="p-3 border border-border">1</td>
                  <td className="p-3 border border-border text-sm">International standard, science</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Gram (g)</td>
                  <td className="p-3 border border-border">1,000</td>
                  <td className="p-3 border border-border text-sm">Cooking, groceries</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Milligram (mg)</td>
                  <td className="p-3 border border-border">1,000,000</td>
                  <td className="p-3 border border-border text-sm">Medicine, chemistry</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Pound (lb)</td>
                  <td className="p-3 border border-border">2.20462</td>
                  <td className="p-3 border border-border text-sm">USA, UK body weight</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Ounce (oz)</td>
                  <td className="p-3 border border-border">35.274</td>
                  <td className="p-3 border border-border text-sm">Cooking, precious metals</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Metric Ton (t)</td>
                  <td className="p-3 border border-border">0.001</td>
                  <td className="p-3 border border-border text-sm">Shipping, industry</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Stone (st)</td>
                  <td className="p-3 border border-border">0.157473</td>
                  <td className="p-3 border border-border text-sm">UK body weight</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Carat (ct)</td>
                  <td className="p-3 border border-border">5,000</td>
                  <td className="p-3 border border-border text-sm">Gemstones, diamonds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Blog Section --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Weight Conversion Blog & Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold mb-3">The History of Weight Measurement</h3>
              <p>Weight measurement has evolved from ancient grain-based systems to today's precise metric standards. The kilogram was originally defined as the mass of one liter of water, but is now based on fundamental physical constants. Understanding this history helps appreciate the importance of accurate weight conversion in global trade and science.</p>
              <p>Modern weight converters like ours build on centuries of measurement standardization, making international communication and commerce possible through reliable unit conversion.</p>
            </div>
            
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold mb-3">Why Accurate Weight Conversion Matters</h3>
              <p>Precise weight conversion is crucial in many fields. In pharmaceuticals, a milligram conversion error could have serious consequences. In international trade, incorrect pound to kilogram conversion can cause significant financial losses. In sports, proper weight conversion ensures fair competition across different measurement systems.</p>
              <p>Our weight converter provides the accuracy needed for these critical applications while remaining accessible for everyday cooking and fitness weight conversion needs.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold mb-3">Metric vs Imperial Weight Systems</h3>
              <p>The metric system uses kilograms and grams based on powers of ten, making weight conversion straightforward. The imperial system with pounds and ounces uses more complex conversion factors. Most countries have officially adopted the metric system, but the United States continues to use imperial units for many everyday weight measurements.</p>
              <p>This is why weight converters remain essential tools for international communication, travel, and commerce between metric and imperial measurement regions.</p>
            </div>
            
            <div className="prose prose-lg max-w-none text-foreground">
              <h3 className="text-xl font-semibold mb-3">Digital Weight Conversion Advantages</h3>
              <p>Before digital weight converters, people relied on printed conversion tables and manual calculations. Modern online weight converters provide instant, accurate results with additional features like conversion history, unit swapping, and multiple decimal precision.</p>
              <p>Our weight converter represents the evolution of this technology - fast, reliable, accessible from any device, and completely free to use for all your weight conversion needs.</p>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Weight Converter FAQ</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How accurate is this weight converter?</h3>
              <p className="text-foreground">Our weight converter uses precise conversion factors with up to 6 decimal places for most calculations, ensuring professional-grade accuracy suitable for cooking, fitness, scientific, and commercial applications.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I convert between metric and imperial weight units?</h3>
              <p className="text-foreground">Yes! Our weight converter supports both metric (kilograms, grams, milligrams) and imperial (pounds, ounces, stones) weight units, making it perfect for international users and anyone needing cross-system weight conversion.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Is this weight converter completely free to use?</h3>
              <p className="text-foreground">Absolutely. Our weight converter is 100% free with no hidden costs, registration requirements, or usage limits. We believe everyone should have access to accurate weight conversion tools.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between weight and mass in conversion?</h3>
              <p className="text-foreground">While scientifically distinct, for practical everyday purposes our weight converter treats them interchangeably. We convert between mass units as they're commonly used to express weight on Earth's surface.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I use this weight converter on mobile devices?</h3>
              <p className="text-foreground">Yes, our weight converter is fully responsive and works perfectly on smartphones, tablets, and desktop computers. The interface adapts to your screen size for optimal usability.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Conversion Tools?</h3>
        <p className="text-center text-muted-foreground mb-4">Explore our full suite of free online conversion tools</p>
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