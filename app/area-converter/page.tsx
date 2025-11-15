// src/app/area-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Square, BookOpen, Map, Home, Calculator, Ruler, Building, Trees, Crop, Globe, Zap, Target, Copy, Share2 } from 'lucide-react';

// Conversion factors relative to 1 square meter
const areaConversionRates = {
  'square meter': 1,
  'square kilometer': 0.000001,
  'square mile': 3.861e-7,
  'square yard': 1.19599,
  'square foot': 10.7639,
  acre: 0.000247105,
  hectare: 0.0001,
  'square centimeter': 10000,
  'square millimeter': 1000000,
  'square inch': 1550,
  'square rod': 0.0395369,
  'square chain': 0.00247105,
  'square furlong': 0.0000247105,
};

type AreaUnit = keyof typeof areaConversionRates;

export default function AreaConverterPage() {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<AreaUnit>('square meter');
  const [toUnit, setToUnit] = useState<AreaUnit>('square foot');
  const [result, setResult] = useState('');
  const [precision, setPrecision] = useState(6);
  const [copied, setCopied] = useState(false);

  const units = Object.keys(areaConversionRates) as AreaUnit[];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        document.getElementById('fromInput')?.focus();
      }
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
  }, [fromUnit, toUnit, inputValue, precision]);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Invalid input');
      return;
    }

    const baseValue = value / areaConversionRates[fromUnit];
    const convertedValue = baseValue * areaConversionRates[toUnit];
    const formattedResult = convertedValue.toFixed(precision);
    setResult(formattedResult);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Area Conversion Result',
        text: `${inputValue} ${fromUnit} = ${result} ${toUnit}`,
        url: window.location.href,
      });
    }
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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- Advanced Area Converter Tool --- */}
      <div className="p-8 rounded-2xl border bg-card shadow-xl space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-card-foreground capitalize flex items-center gap-3">
            <Calculator className="h-8 w-8 text-primary" />
            Advanced Area Converter
          </h1>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <select
              value={precision}
              onChange={(e) => setPrecision(Number(e.target.value))}
              className="p-2 rounded border bg-background text-foreground"
            >
              {[2, 4, 6, 8, 10].map(p => (
                <option key={p} value={p}>{p} decimals</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Use keyboard: Ctrl+K to focus | Enter to convert | Escape to clear
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FROM UNIT */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-card-foreground" htmlFor="fromUnit">
              From Unit
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as AreaUnit)}
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground text-lg capitalize focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            >
              {units.map((unit) => (
                <option key={unit} value={unit} className="capitalize">
                  {unit}
                </option>
              ))}
            </select>
            <input
              id="fromInput"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter area value"
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground text-2xl font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* CONVERSION CONTROLS */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <button
              onClick={convert}
              className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-purple-600/90 transition-all transform hover:scale-105 text-lg font-semibold shadow-lg"
            >
              Convert Now
            </button>
            
            <button
              onClick={swapUnits}
              className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
            >
              Swap Units
            </button>

            <div className="flex gap-4 w-full">
              <button
                onClick={copyResult}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={shareResult}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>

          {/* TO UNIT */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-card-foreground" htmlFor="toUnit">
              To Unit
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as AreaUnit)}
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground text-lg capitalize focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            >
              {units.map((unit) => (
                <option key={unit} value={unit} className="capitalize">
                  {unit}
                </option>
              ))}
            </select>
            <div className="w-full p-4 rounded-xl border-2 border-border bg-muted min-h-[80px] flex items-center justify-center">
              {result ? (
                <p className="text-3xl font-bold text-card-foreground break-all text-center">
                  {result}
                </p>
              ) : (
                <p className="text-xl text-muted-foreground text-center">Conversion Result</p>
              )}
            </div>
          </div>
        </div>

        {/* QUICK CONVERSION BUTTONS */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground">Quick Conversions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { from: 'acre', to: 'hectare' },
              { from: 'square foot', to: 'square meter' },
              { from: 'hectare', to: 'acre' },
              { from: 'square meter', to: 'square foot' },
              { from: 'square mile', to: 'square kilometer' },
              { from: 'square yard', to: 'square meter' },
            ].map((quick, index) => (
              <button
                key={index}
                onClick={() => {
                  setFromUnit(quick.from as AreaUnit);
                  setToUnit(quick.to as AreaUnit);
                }}
                className="p-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
              >
                {quick.from} → {quick.to}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Intro Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 p-8 rounded-2xl border">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
          Professional Area Converter Tool
        </h2>
        <p className="text-2xl text-muted-foreground mb-8 text-center">
          Accurate Land Measurement Calculator for Real Estate, Construction & Agriculture
        </p>
        <div className="prose prose-xl max-w-none text-foreground">
          <p className="text-xl leading-relaxed mb-6">
            Welcome to the world's most comprehensive <strong className="text-primary">area converter tool</strong> and 
            professional <strong className="text-green-600 dark:text-green-400">land area calculator</strong>. Our advanced 
            <strong className="text-purple-600 dark:text-purple-400"> area measurement converter</strong> provides instant, 
            accurate conversions between all major area measurement units including <strong>acres to hectares</strong>, 
            <strong> square feet to square meters</strong>, <strong>sq ft to m²</strong>, and many more specialized units. 
            Whether you're working in <strong>real estate area measurement</strong>, <strong>construction site planning</strong>, 
            <strong> agricultural land assessment</strong>, or <strong>property development</strong>, our tool delivers 
            precise results for all your <strong>area conversion needs</strong>.
          </p>
          <p className="text-xl leading-relaxed">
            This free <strong>online area calculator</strong> supports both <strong>metric and imperial units</strong>, 
            making it the perfect <strong>land measurement converter</strong> for professionals worldwide. Our 
            <strong> area unit converter</strong> is specifically designed for accuracy and ease of use in 
            <strong> real estate area calculation</strong>, <strong>construction planning</strong>, and 
            <strong> agricultural land management</strong>.
          </p>
        </div>
      </div>

      {/* --- Rich Content Sections --- */}
      <div className="space-y-8">
        
        {/* --- How to Use Tutorial --- */}
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            How to Use This Area Converter Tool
          </h2>
          <div className="space-y-6">
            {tutorials.sections.map((section: { title: string, content: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-2xl font-semibold text-card-foreground border-b pb-3 border-border">
                  {section.title}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line: string, lineIndex: number) => (
                    <div key={lineIndex} className="mb-4">
                      {line.startsWith('**') ? (
                        <strong className="text-card-foreground text-xl">{line.replace(/\*\*/g, '')}</strong>
                      ) : line.trim().startsWith('-') ? (
                        <p className="text-foreground leading-relaxed ml-6">{line}</p>
                      ) : line === '' ? (
                        <div className="my-6 border-t border-border"></div>
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

        {/* --- Understanding Area Measurement --- */}
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-6 flex items-center gap-3">
            <Square className="h-8 w-8 text-primary" />
            Understanding Area Measurement
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-xl mb-6">
              <strong className="text-card-foreground">Area</strong> is the fundamental measure of two-dimensional space enclosed within a boundary. 
              It quantifies how much surface a flat shape covers, making it essential for countless professional applications 
              from <strong className="text-green-600 dark:text-green-400">real estate area calculation</strong> to 
              <strong className="text-green-600 dark:text-green-400"> agricultural land assessment</strong>.
            </p>
            <p className="text-xl mb-8">
              Like length measurement, area uses both <strong className="text-blue-600 dark:text-blue-400">Metric system units</strong> and 
              <strong className="text-blue-600 dark:text-blue-400"> Imperial system units</strong>, creating complexity for international projects. 
              Our <strong className="text-purple-600 dark:text-purple-400">area converter tool</strong> eliminates this confusion by providing 
              instant, accurate conversions between all major area measurement systems.
            </p>
            
            <h3 className="text-2xl font-semibold text-card-foreground mt-8 mb-6">Professional Applications of Area Conversion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-xl">
                <Home className="h-10 w-10 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg text-card-foreground mb-2">Real Estate & Property Development</h4>
                  <p className="text-foreground">
                    Calculating property sizes in <strong>square feet</strong> for listings, converting 
                    <strong> acres to hectares</strong> for land deals, and determining <strong>square meter</strong> 
                    measurements for international clients.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-xl">
                <Building className="h-10 w-10 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg text-card-foreground mb-2">Construction & Architecture</h4>
                  <p className="text-foreground">
                    Planning building footprints, calculating material requirements, and converting between 
                    <strong> square meters and square feet</strong> for international construction projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-yellow-500/10 rounded-xl">
                <Trees className="h-10 w-10 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg text-card-foreground mb-2">Agriculture & Forestry</h4>
                  <p className="text-foreground">
                    Measuring farmland in <strong>acres or hectares</strong>, calculating crop yields per unit area, 
                    and managing forest land using precise <strong>area measurement conversions</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-purple-500/10 rounded-xl">
                <Globe className="h-10 w-10 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg text-card-foreground mb-2">Geography & Urban Planning</h4>
                  <p className="text-foreground">
                    Mapping city areas in <strong>square miles or square kilometers</strong>, planning infrastructure 
                    projects, and conducting environmental impact assessments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* --- Common Area Conversions Table --- */}
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-6">
            Essential Area Conversion Reference Table
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-4 border-b border-border font-semibold text-card-foreground">Unit</th>
                  <th className="p-4 border-b border-border font-semibold text-card-foreground">Equivalent to...</th>
                  <th className="p-4 border-b border-border font-semibold text-card-foreground">Common Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 border-b border-border font-semibold text-card-foreground">1 Acre</td>
                  <td className="p-4 border-b border-border text-foreground">43,560 Square Feet</td>
                  <td className="p-4 border-b border-border text-foreground">Agricultural land, real estate</td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 border-b border-border font-semibold text-card-foreground">1 Hectare</td>
                  <td className="p-4 border-b border-border text-foreground">10,000 Square Meters</td>
                  <td className="p-4 border-b border-border text-foreground">International land measurement</td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 border-b border-border font-semibold text-card-foreground">1 Hectare</td>
                  <td className="p-4 border-b border-border text-foreground">2.471 Acres</td>
                  <td className="p-4 border-b border-border text-foreground">Farm management, forestry</td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 border-b border-border font-semibold text-card-foreground">1 Square Mile</td>
                  <td className="p-4 border-b border-border text-foreground">640 Acres</td>
                  <td className="p-4 border-b border-border text-foreground">City planning, geography</td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 border-b border-border font-semibold text-card-foreground">1 Square Kilometer</td>
                  <td className="p-4 border-b border-border text-foreground">100 Hectares</td>
                  <td className="p-4 border-b border-border text-foreground">Regional planning, mapping</td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 border-b border-border font-semibold text-card-foreground">1 Square Meter</td>
                  <td className="p-4 border-b border-border text-foreground">10.764 Square Feet</td>
                  <td className="p-4 border-b border-border text-foreground">Construction, interior design</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Blog Section --- */}
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8">Area Conversion Insights & Professional Blog</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-card-foreground">Why Accurate Area Conversion Matters</h3>
              <p className="text-lg text-foreground">
                Precise <strong className="text-primary">area measurement conversion</strong> is crucial in professional fields. 
                A small error in converting <strong className="text-green-600 dark:text-green-400">acres to hectares</strong> can lead to significant 
                financial losses in real estate transactions. Our <strong className="text-purple-600 dark:text-purple-400">area converter tool</strong> 
                ensures you get exact conversions every time.
              </p>
              <p className="text-lg text-foreground">
                Whether you're calculating <strong className="text-primary">square footage</strong> for a building permit or 
                converting <strong className="text-green-600 dark:text-green-400">hectares to acres</strong> for agricultural planning, accuracy 
                is paramount. This is why professionals trust our <strong className="text-purple-600 dark:text-purple-400">land area calculator</strong> 
                for critical measurements in <strong>real estate development</strong>, <strong>construction projects</strong>, and 
                <strong> agricultural management</strong>.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-card-foreground">International Area Standards</h3>
              <p className="text-lg text-foreground">
                Different countries use different <strong className="text-primary">area measurement units</strong>. 
                The United States primarily uses <strong className="text-green-600 dark:text-green-400">square feet</strong> and 
                <strong className="text-green-600 dark:text-green-400"> acres</strong>, while most other countries use 
                <strong className="text-purple-600 dark:text-purple-400"> square meters</strong> and 
                <strong className="text-purple-600 dark:text-purple-400"> hectares</strong>. Our 
                <strong className="text-primary"> area unit converter</strong> bridges these international differences.
              </p>
              <p className="text-lg text-foreground">
                For global businesses, understanding both <strong className="text-green-600 dark:text-green-400">metric and imperial area units</strong> 
                is essential. Our tool makes international <strong className="text-purple-600 dark:text-purple-400">land area conversion</strong> 
                simple and accurate, supporting professionals in real estate, construction, and agriculture worldwide with reliable 
                <strong> area calculation</strong> and <strong>measurement conversion</strong> capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">How do I convert acres to hectares?</h3>
              <p className="text-lg text-foreground">
                To convert <strong className="text-green-600 dark:text-green-400">acres to hectares</strong>, multiply the acre value by 0.404686. 
                Our <strong className="text-primary">area converter tool</strong> automates this calculation instantly with 
                professional-grade accuracy for <strong>real estate transactions</strong> and <strong>land measurement</strong> purposes.
              </p>
            </div>
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">What's the difference between square feet and square meters?</h3>
              <p className="text-lg text-foreground">
                <strong className="text-green-600 dark:text-green-400">Square feet</strong> is an Imperial unit while 
                <strong className="text-primary"> square meters</strong> is a Metric unit. One square meter equals approximately 
                10.764 square feet. This conversion is essential for <strong>international property listings</strong> and 
                <strong> construction planning</strong>.
              </p>
            </div>
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Why use an online area converter?</h3>
              <p className="text-lg text-foreground">
                Online <strong className="text-purple-600 dark:text-purple-400">area converters</strong> provide instant, accurate results without 
                manual calculations. Our tool supports multiple units and is perfect for 
                <strong className="text-green-600 dark:text-green-400"> real estate professionals</strong>, 
                <strong className="text-primary"> surveyors</strong>, and 
                <strong className="text-yellow-600 dark:text-yellow-400"> agricultural planners</strong> who need reliable 
                <strong> land measurement conversions</strong>.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Can I convert square miles to square kilometers?</h3>
              <p className="text-lg text-foreground">
                Yes! Our <strong className="text-purple-600 dark:text-purple-400">area conversion tool</strong> supports 
                <strong className="text-green-600 dark:text-green-400"> square mile to square kilometer</strong> conversions. 
                One square mile equals approximately 2.58999 square kilometers. This is particularly useful for 
                <strong> geographical mapping</strong> and <strong>urban planning projects</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
        <h3 className="text-2xl font-semibold text-card-foreground mb-6 text-center">Explore More Professional Conversion Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/length-converter" className="p-4 rounded-xl bg-card hover:bg-muted transition-all transform hover:scale-105 border border-border shadow-sm">
            <Ruler className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="font-semibold text-card-foreground">Length Converter</div>
          </a>
          <a href="/weight-converter" className="p-4 rounded-xl bg-card hover:bg-muted transition-all transform hover:scale-105 border border-border shadow-sm">
            <Square className="h-6 w-6 mx-auto mb-2 text-green-600 dark:text-green-400" />
            <div className="font-semibold text-card-foreground">Weight Converter</div>
          </a>
          <a href="/temperature-converter" className="p-4 rounded-xl bg-card hover:bg-muted transition-all transform hover:scale-105 border border-border shadow-sm">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
            <div className="font-semibold text-card-foreground">Temperature Converter</div>
          </a>
          <a href="/volume-converter" className="p-4 rounded-xl bg-card hover:bg-muted transition-all transform hover:scale-105 border border-border shadow-sm">
            <Crop className="h-6 w-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
            <div className="font-semibold text-card-foreground">Volume Converter</div>
          </a>
        </div>
      </div>
    </div>
  );
}