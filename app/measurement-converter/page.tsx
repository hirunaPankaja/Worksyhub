// src/app/measurement-converter/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import {
  Ruler,
  Weight,
  Thermometer,
  Square,
  Gauge,
  Droplet,
  BookOpen,
} from 'lucide-react';

const conversionData = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001,
  },
  temperature: {
    celsius: (v: number) => v,
    fahrenheit: (v: number) => (v * 9) / 5 + 32,
    kelvin: (v: number) => v + 273.15,
  },
  area: {
    'square meter': 1,
    'square kilometer': 0.000001,
    'square mile': 3.861e-7,
    'square yard': 1.19599,
    'square foot': 10.7639,
    acre: 0.000247105,
    hectare: 0.0001,
  },
  speed: {
    'km/h': 1,
    mph: 0.621371,
    'm/s': 0.277778,
    knots: 0.539957,
  },
  volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
    'fluid ounce': 33.814,
  },
};

// --- NEW: A wrapper component to use Suspense ---
export default function MeasurementConverterPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeasurementConverterPage />
    </Suspense>
  );
}

function MeasurementConverterPage() {
  const [activeTab, setActiveTab] = useState('length');
  const [activeTutorial, setActiveTutorial] = useState('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [result, setResult] = useState('');

  const tabs = [
    { id: 'length', label: 'Length', icon: Ruler },
    { id: 'weight', label: 'Weight', icon: Weight },
    { id: 'temperature', label: 'Temperature', icon: Thermometer },
    { id: 'area', label: 'Area', icon: Square },
    { id: 'speed', label: 'Speed', icon: Gauge },
    { id: 'volume', label: 'Volume', icon: Droplet },
  ];

  // --- NEW: This block reads the URL query ---
  const searchParams = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
      // Also reset units when tab changes from URL
      const units = Object.keys(
        conversionData[tab as keyof typeof conversionData]
      );
      setFromUnit(units[0]);
      setToUnit(units[1] || units[0]);
      setResult('');
      setInputValue('1');
    }
  }, [searchParams, tabs]);
  // --- END NEW BLOCK ---

  useEffect(() => {
    setActiveTutorial(activeTab);
  }, [activeTab]);

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
  }, [inputValue, fromUnit, toUnit, activeTab]);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Invalid input');
      return;
    }

    if (activeTab === 'temperature') {
      const tempConversions: any = conversionData.temperature;
      let celsius = value;

      if (fromUnit === 'fahrenheit') {
        celsius = ((value - 32) * 5) / 9;
      } else if (fromUnit === 'kelvin') {
        celsius = value - 273.15;
      }

      let output = celsius;
      if (toUnit === 'fahrenheit') {
        output = tempConversions.fahrenheit(celsius);
      } else if (toUnit === 'kelvin') {
        output = tempConversions.kelvin(celsius);
      } else {
        output = tempConversions.celsius(celsius);
      }

      setResult(output.toFixed(2));
    } else {
      const conversions: any =
        conversionData[activeTab as keyof typeof conversionData];
      const baseValue = value / conversions[fromUnit];
      const convertedValue = baseValue * conversions[toUnit];
      setResult(convertedValue.toFixed(6));
    }
  };

  const getUnits = () => {
    const data: any = conversionData[activeTab as keyof typeof conversionData];
    return Object.keys(data);
  };

  const tutorials = {
    length: {
      title: "Length Conversion Guide",
      sections: [
        {
          title: "Understanding Length Units",
          content: [
            "Length conversion is the process of converting measurements of distance from one unit to another.",
            "",
            "Common Length Conversions:",
            "1 meter = 3.28084 feet",
            "1 kilometer = 0.621371 miles", 
            "1 inch = 2.54 centimeters",
            "1 yard = 0.9144 meters",
            "1 mile = 1.60934 kilometers",
            "",
            "Metric System: Based on meters (m)",
            "Imperial System: Based on feet (ft) and inches (in)",
            "",
            "How to Use:",
            "1. Select 'From' unit",
            "2. Select 'To' unit", 
            "3. Enter value to convert",
            "4. Press Enter or click Convert"
          ]
        },
        {
          title: "Practical Applications",
          content: [
            "Construction and Engineering:",
            "Converting between metric and imperial for international projects",
            "Architectural plans and blueprints",
            "",
            "Everyday Use:",
            "Height measurements",
            "Room dimensions",
            "Travel distance calculations",
            "",
            "Scientific Research:",
            "Precise laboratory measurements",
            "Geographical distance calculations",
            "",
            "Example: Convert 5 meters to feet",
            "5 meters × 3.28084 = 16.4042 feet"
          ]
        }
      ]
    },
    weight: {
      title: "Weight Conversion Guide",
      sections: [
        {
          title: "Understanding Weight Units",
          content: [
            "Weight conversion helps translate mass measurements between metric and imperial systems.",
            "",
            "Common Weight Conversions:",
            "1 kilogram = 2.20462 pounds",
            "1 pound = 16 ounces",
            "1 gram = 0.035274 ounces",
            "1 ton (metric) = 1000 kilograms",
            "1 ounce = 28.3495 grams",
            "",
            "Metric System: Based on kilograms (kg)",
            "Imperial System: Based on pounds (lb) and ounces (oz)",
            "",
            "How to Use:",
            "1. Select 'From' unit",
            "2. Select 'To' unit", 
            "3. Enter value to convert",
            "4. Press Enter or click Convert"
          ]
        },
        {
          title: "Practical Applications",
          content: [
            "Cooking and Baking:",
            "Recipe conversions between metric and imperial",
            "Precise ingredient measurements",
            "",
            "Shipping and Logistics:",
            "Package weight calculations",
            "International shipping requirements",
            "",
            "Health and Fitness:",
            "Body weight tracking",
            "Nutritional calculations",
            "",
            "Scientific Applications:",
            "Chemical measurements",
            "Laboratory experiments",
            "",
            "Example: Convert 2 kilograms to pounds",
            "2 kg × 2.20462 = 4.40924 pounds"
          ]
        }
      ]
    },
    temperature: {
      title: "Temperature Conversion Guide",
      sections: [
        {
          title: "Understanding Temperature Scales",
          content: [
            "Temperature conversion involves translating between Celsius, Fahrenheit, and Kelvin scales.",
            "",
            "Temperature Formulas:",
            "Celsius to Fahrenheit: °F = (°C × 9/5) + 32",
            "Fahrenheit to Celsius: °C = (°F - 32) × 5/9",
            "Celsius to Kelvin: K = °C + 273.15",
            "Kelvin to Celsius: °C = K - 273.15",
            "",
            "Scale Origins:",
            "Celsius: Water freezes at 0°C, boils at 100°C",
            "Fahrenheit: Water freezes at 32°F, boils at 212°F",
            "Kelvin: Absolute zero at 0K, used in scientific contexts",
            "",
            "How to Use:",
            "1. Select 'From' temperature scale",
            "2. Select 'To' temperature scale", 
            "3. Enter temperature value",
            "4. Press Enter or click Convert"
          ]
        },
        {
          title: "Practical Applications",
          content: [
            "Weather and Climate:",
            "International weather reports",
            "Climate data analysis",
            "",
            "Cooking:",
            "Oven temperature settings",
            "Recipe temperature conversions",
            "",
            "Scientific Research:",
            "Laboratory experiments",
            "Chemical reactions",
            "Physics calculations",
            "",
            "Medical Applications:",
            "Body temperature monitoring",
            "Medical equipment calibration",
            "",
            "Example: Convert 25°C to Fahrenheit",
            "(25 × 9/5) + 32 = 77°F"
          ]
        }
      ]
    },
    area: {
      title: "Area Conversion Guide",
      sections: [
        {
          title: "Understanding Area Units",
          content: [
            "Area measurements describe two-dimensional space and are used in various fields from construction to agriculture.",
            "",
            "Common Area Conversions:",
            "1 square meter = 10.7639 square feet",
            "1 acre = 4,046.86 square meters",
            "1 hectare = 10,000 square meters",
            "1 square mile = 2.59 square kilometers",
            "1 square yard = 0.836127 square meters",
            "",
            "Metric Units: Square meters, hectares",
            "Imperial Units: Square feet, acres, square miles",
            "",
            "How to Use:",
            "1. Select 'From' area unit",
            "2. Select 'To' area unit", 
            "3. Enter area value",
            "4. Press Enter or click Convert"
          ]
        },
        {
          title: "Practical Applications",
          content: [
            "Real Estate:",
            "Property size comparisons",
            "Land area calculations",
            "",
            "Construction:",
            "Floor area planning",
            "Material quantity estimation",
            "",
            "Agriculture:",
            "Farm land measurement",
            "Crop yield calculations",
            "",
            "Geography:",
            "Country and city area comparisons",
            "Map scaling and measurements",
            "",
            "Example: Convert 1 acre to square meters",
            "1 acre × 4046.86 = 4046.86 square meters"
          ]
        }
      ]
    },
    speed: {
      title: "Speed Conversion Guide",
      sections: [
        {
          title: "Understanding Speed Units",
          content: [
            "Speed measures distance traveled per unit of time and is crucial in transportation, sports, and science.",
            "",
            "Common Speed Conversions:",
            "1 km/h = 0.621371 mph",
            "1 m/s = 3.6 km/h",
            "1 knot = 1.852 km/h",
            "1 mph = 1.60934 km/h",
            "1 km/h = 0.277778 m/s",
            "",
            "Common Units:",
            "km/h - Kilometers per hour",
            "mph - Miles per hour", 
            "m/s - Meters per second",
            "knots - Nautical miles per hour",
            "",
            "How to Use:",
            "1. Select 'From' speed unit",
            "2. Select 'To' speed unit", 
            "3. Enter speed value",
            "4. Press Enter or click Convert"
          ]
        },
        {
          title: "Practical Applications",
          content: [
            "Transportation:",
            "Vehicle speed limits",
            "Aviation speed calculations",
            "Maritime navigation",
            "",
            "Sports:",
            "Athletic performance tracking",
            "Race pace calculations",
            "",
            "Weather:",
            "Wind speed measurements",
            "Storm tracking",
            "",
            "Science and Engineering:",
            "Physics experiments",
            "Fluid dynamics",
            "Mechanical systems",
            "",
            "Example: Convert 60 mph to km/h",
            "60 mph × 1.60934 = 96.5604 km/h"
          ]
        }
      ]
    },
    volume: {
      title: "Volume Conversion Guide",
      sections: [
        {
          title: "Understanding Volume Units",
          content: [
            "Volume measures three-dimensional space capacity and is essential in cooking, science, and industry.",
            "",
            "Common Volume Conversions:",
            "1 liter = 0.264172 gallons (US)",
            "1 gallon (US) = 3.78541 liters",
            "1 cup = 236.588 milliliters",
            "1 fluid ounce = 29.5735 milliliters",
            "1 quart = 0.946353 liters",
            "1 pint = 0.473176 liters",
            "",
            "Metric Units: Liters, milliliters",
            "Imperial Units: Gallons, quarts, pints, cups",
            "",
            "How to Use:",
            "1. Select 'From' volume unit",
            "2. Select 'To' volume unit", 
            "3. Enter volume value",
            "4. Press Enter or click Convert"
          ]
        },
        {
          title: "Practical Applications",
          content: [
            "Cooking and Baking:",
            "Recipe conversions",
            "Ingredient measurements",
            "",
            "Science and Chemistry:",
            "Laboratory measurements",
            "Chemical solutions",
            "",
            "Industry:",
            "Liquid product packaging",
            "Container capacity planning",
            "",
            "Everyday Use:",
            "Fuel consumption",
            "Beverage servings",
            "Storage capacity",
            "",
            "Example: Convert 2 liters to gallons",
            "2 liters × 0.264172 = 0.528344 gallons"
          ]
        }
      ]
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Measurement Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert between different units of measurement instantly with keyboard support
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              const units = Object.keys(
                conversionData[tab.id as keyof typeof conversionData]
              );
              setFromUnit(units[0]);
              setToUnit(units[1] || units[0]);
              setResult('');
              setInputValue('1');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground capitalize">
          {activeTab} Converter
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to convert, Escape to clear
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background mb-3"
            >
              {getUnits().map((unit) => (
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

          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background mb-3"
            >
              {getUnits().map((unit) => (
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

        <button
          onClick={convert}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Convert
        </button>
      </div>

      <div className="p-6 rounded-lg bg-muted/50 space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Tutorials & Guides</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-semibold mb-3 text-lg">Select Tutorial:</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTutorial(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all border ${
                  activeTutorial === tab.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {tutorials[activeTutorial as keyof typeof tutorials]?.title}
              </h3>
              
              <div className="space-y-6">
                {tutorials[activeTutorial as keyof typeof tutorials]?.sections?.map((section: { title: string, content: string[] }, sectionIndex: number) => (
                  <div key={sectionIndex} className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                      {section.title}
                    </h4>
                    
                    <div className="prose prose-lg max-w-none text-foreground">
                      {section.content.map((line: string, lineIndex: number) => (
                        <div key={lineIndex} className="mb-3">
                          {line.startsWith('**') && line.endsWith('**') ? (
                            <strong className="text-foreground text-lg">{line.slice(2, -2)}</strong>
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 dark:bg-blue-950/50 dark:border-blue-800">
              <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-300">Pro Tip</h4>
              <p className="text-blue-700 dark:text-blue-300">
                {activeTutorial === 'length' && "Use Enter key for quick conversions and Escape to reset values."}
                {activeTutorial === 'weight' && "Remember that weight and mass are often used interchangeably in everyday conversions."}
                {activeTutorial === 'temperature' && "Water freezes at 0°C (32°F) and boils at 100°C (212°F)."}
                {activeTutorial === 'area' && "1 hectare equals approximately 2.47 acres, useful for land measurements."}
                {activeTutorial === 'speed' && "1 knot equals 1 nautical mile per hour, used in aviation and maritime."}
                {activeTutorial === 'volume' && "US and UK gallons are different: 1 US gallon = 0.832674 UK gallons."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Calculator
          </a>
          <a href="/time-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Time Converter
          </a>
          <a href="/#tools" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            All Tools
          </a>
          <a href="/about" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            About Us
          </a>
        </div>
      </div>
    </div>
  );
}