'use client';

import { useState } from 'react';
import { ToolWrapper } from '@/components/ToolWrapper';
import { Schema } from '@/components/Schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed';

interface UnitOption {
    name: string;
    symbol: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
}

const unitCategories: Record<UnitCategory, { name: string; units: UnitOption[] }> = {
    length: {
        name: '📏 Length',
        units: [
            { name: 'Meters', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
            { name: 'Kilometers', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
            { name: 'Centimeters', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
            { name: 'Millimeters', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            { name: 'Miles', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
            { name: 'Yards', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
            { name: 'Feet', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
            { name: 'Inches', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
        ],
    },
    weight: {
        name: '⚖️ Weight',
        units: [
            { name: 'Kilograms', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
            { name: 'Grams', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            { name: 'Milligrams', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
            { name: 'Pounds', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
            { name: 'Ounces', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
            { name: 'Stones', symbol: 'st', toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
            { name: 'Metric Tons', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        ],
    },
    temperature: {
        name: '🌡️ Temperature',
        units: [
            { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
            { name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
            { name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
        ],
    },
    area: {
        name: '📐 Area',
        units: [
            { name: 'Square Meters', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
            { name: 'Square Kilometers', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
            { name: 'Square Feet', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
            { name: 'Square Yards', symbol: 'yd²', toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
            { name: 'Acres', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
            { name: 'Hectares', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
        ],
    },
    volume: {
        name: '🧊 Volume',
        units: [
            { name: 'Liters', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
            { name: 'Milliliters', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            { name: 'Cubic Meters', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
            { name: 'Gallons (US)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
            { name: 'Quarts (US)', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
            { name: 'Pints (US)', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
            { name: 'Cups', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
            { name: 'Fluid Ounces', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
        ],
    },
    speed: {
        name: '🚀 Speed',
        units: [
            { name: 'Meters/Second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
            { name: 'Kilometers/Hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
            { name: 'Miles/Hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
            { name: 'Feet/Second', symbol: 'ft/s', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
            { name: 'Knots', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
        ],
    },
};

export default function UnitConverterPage() {
    const [category, setCategory] = useState<UnitCategory>('length');
    const [fromUnit, setFromUnit] = useState(0);
    const [toUnit, setToUnit] = useState(1);
    const [inputValue, setInputValue] = useState('1');
    const [copied, setCopied] = useState(false);

    const currentUnits = unitCategories[category].units;
    const fromUnitData = currentUnits[fromUnit];
    const toUnitData = currentUnits[toUnit];

    const convert = () => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';
        const baseValue = fromUnitData.toBase(value);
        const result = toUnitData.fromBase(baseValue);
        return result.toLocaleString(undefined, { maximumFractionDigits: 8 });
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const copyResult = () => {
        navigator.clipboard.writeText(convert());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const result = convert();

    return (
        <ToolWrapper
            title="Free Unit Converter"
            description="Convert between length, weight, temperature, area, volume & speed units instantly. 100% free, works offline!"
            category="Converters"
        >
            <Schema
                name="Unit Converter"
                description="Free online unit converter. Convert length (meters, feet, inches), weight (kg, lbs), temperature (Celsius, Fahrenheit), area, volume & speed instantly."
                url="/unit-converter"
                category="WebApplication"
                instructions={[
                    "Select a unit category (length, weight, temperature, etc.)",
                    "Choose your 'from' and 'to' units",
                    "Enter the value you want to convert",
                    "See the instant result and copy it"
                ]}
            />

            <div className="space-y-8">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {(Object.keys(unitCategories) as UnitCategory[]).map((cat) => (
                        <Button
                            key={cat}
                            variant={category === cat ? 'default' : 'outline'}
                            onClick={() => {
                                setCategory(cat);
                                setFromUnit(0);
                                setToUnit(1);
                            }}
                            className="text-sm"
                        >
                            {unitCategories[cat].name}
                        </Button>
                    ))}
                </div>

                {/* Converter Card */}
                <Card className="p-8 max-w-2xl mx-auto">
                    <div className="grid gap-6">
                        {/* From */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">From</label>
                            <div className="flex gap-3">
                                <Input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="text-2xl h-14 font-mono"
                                    placeholder="Enter value"
                                />
                                <select
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(Number(e.target.value))}
                                    className="px-4 py-2 rounded-lg border bg-background min-w-[140px] text-sm font-medium"
                                >
                                    {currentUnits.map((unit, i) => (
                                        <option key={i} value={i}>{unit.name} ({unit.symbol})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Swap Button */}
                        <div className="flex justify-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={swapUnits}
                                className="rounded-full h-12 w-12 bg-primary/10 hover:bg-primary/20"
                            >
                                <ArrowRightLeft className="w-5 h-5 text-primary" />
                            </Button>
                        </div>

                        {/* To */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">To</label>
                            <div className="flex gap-3">
                                <div className="flex-1 h-14 px-4 rounded-lg border bg-muted/50 flex items-center text-2xl font-mono font-bold text-primary">
                                    {result || '—'}
                                </div>
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(Number(e.target.value))}
                                    className="px-4 py-2 rounded-lg border bg-background min-w-[140px] text-sm font-medium"
                                >
                                    {currentUnits.map((unit, i) => (
                                        <option key={i} value={i}>{unit.name} ({unit.symbol})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Copy Button */}
                        {result && (
                            <Button onClick={copyResult} variant="outline" className="w-full">
                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                {copied ? 'Copied!' : 'Copy Result'}
                            </Button>
                        )}
                    </div>
                </Card>

                {/* Quick Conversion Display */}
                {result && (
                    <div className="text-center text-lg text-muted-foreground">
                        <span className="font-bold text-foreground">{inputValue} {fromUnitData.symbol}</span>
                        {' = '}
                        <span className="font-bold text-primary">{result} {toUnitData.symbol}</span>
                    </div>
                )}
            </div>

            {/* SEO Content */}
            <div className="mt-16 space-y-8 border-t pt-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Free Online Unit Converter - Convert Any Unit Instantly</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Welcome to the most comprehensive free unit converter online! Whether you need to convert meters to feet, kilograms to pounds, Celsius to Fahrenheit, or any other unit conversion, our tool does it instantly with 100% accuracy. No signup required, works completely in your browser, and is mobile-friendly.
                    </p>
                </section>

                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold text-lg">📏 Length Converter</h3>
                        <p className="text-sm text-muted-foreground">Convert meters, feet, inches, miles, kilometers, yards, and more. Perfect for construction, DIY projects, and international measurements.</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold text-lg">⚖️ Weight Converter</h3>
                        <p className="text-sm text-muted-foreground">Convert kg to lbs, ounces to grams, stones to kilograms. Essential for cooking, fitness, shipping, and health tracking.</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold text-lg">🌡️ Temperature Converter</h3>
                        <p className="text-sm text-muted-foreground">Convert Celsius to Fahrenheit, Kelvin to Celsius instantly. Great for weather, cooking, and science applications.</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold text-lg">📐 Area Converter</h3>
                        <p className="text-sm text-muted-foreground">Convert square meters, acres, hectares, square feet. Perfect for real estate, land measurement, and architecture.</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold text-lg">🧊 Volume Converter</h3>
                        <p className="text-sm text-muted-foreground">Convert liters, gallons, cups, milliliters. Essential for cooking recipes, liquid measurements, and chemistry.</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold text-lg">🚀 Speed Converter</h3>
                        <p className="text-sm text-muted-foreground">Convert km/h to mph, meters per second to knots. Great for travel, aviation, and sports performance tracking.</p>
                    </Card>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                How many feet are in a meter?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                1 meter equals approximately 3.28084 feet. To convert meters to feet, multiply the meter value by 3.28084. For example, 5 meters = 16.4042 feet.
                            </p>
                        </details>
                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                How to convert Celsius to Fahrenheit?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                To convert Celsius to Fahrenheit, multiply the Celsius temperature by 9/5 (or 1.8) and then add 32. Formula: °F = (°C × 9/5) + 32. For example, 25°C = 77°F.
                            </p>
                        </details>
                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                How many kg in a pound?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                1 pound (lb) equals approximately 0.453592 kilograms. To convert pounds to kg, multiply by 0.453592. To convert kg to pounds, multiply by 2.20462. For example, 10 lbs = 4.536 kg.
                            </p>
                        </details>
                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                Is this unit converter free to use?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                Yes! Our unit converter is 100% free to use with no limits, no signup required, and no ads. All conversions happen instantly in your browser for complete privacy.
                            </p>
                        </details>
                    </div>
                </section>
            </div>
        </ToolWrapper>
    );
}
