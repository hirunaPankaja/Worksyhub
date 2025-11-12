// src/app/color-converter/page.tsx
'use client';

import { useState } from 'react';
import { BookOpen, Palette, Paintbrush } from 'lucide-react';

// --- Utility Functions for Color Conversion ---
function hexToRgb(hex: string) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}
// --- End of Utility Functions ---

export default function ColorConverterPage() {
  const [hexVal, setHexVal] = useState('#ffffff');
  const [rgbVal, setRgbVal] = useState({ r: 255, g: 255, b: 255 });
  const [hslVal, setHslVal] = useState({ h: 0, s: 0, l: 100 });

  // --- Tool Functions ---

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hex = e.target.value;
    if (hex[0] !== '#') {
      hex = '#' + hex;
    }
    setHexVal(hex); // Allow user to type

    const valid = /^#([0-9a-f]{3}){1,2}$/i.test(hex);
    if (valid) {
      try {
        const rgb = hexToRgb(hex);
        setRgbVal(rgb);
        setHslVal(rgbToHsl(rgb.r, rgb.g, rgb.b));
      } catch (e) {
        console.error('Invalid hex conversion');
      }
    }
  };

  const handleRgbChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    color: 'r' | 'g' | 'b'
  ) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    if (val > 255) val = 255;

    const newRgb = { ...rgbVal, [color]: val };
    setRgbVal(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexVal(newHex);
    setHslVal(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    color: 'h' | 's' | 'l'
  ) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    const max = color === 'h' ? 360 : 100;
    if (val < 0) val = 0;
    if (val > max) val = max;

    const newHsl = { ...hslVal, [color]: val };
    setHslVal(newHsl);
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgbVal(newRgb);
    setHexVal(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const tutorials = {
    title: 'How to Use the Color Converter',
    sections: [
      {
        title: 'Real-time Conversion',
        content: [
          'This tool converts between color formats instantly. There is no "convert" button!',
          '',
          '**1. Change Any Value:** Simply type a new value into any of the input boxes (HEX, RGB, or HSL).',
          '**2. See Instant Updates:** As you type, all other color formats will update in real-time to match.',
          '**3. View Preview:** The large color box at the top will also update to show a live preview of your color.',
          '',
          'This is perfect for quickly grabbing the right color code for your CSS, design software, or developer project.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Color Converter (HEX, RGB, HSL)
        </h1>
        <p className="text-lg text-muted-foreground">
          Instantly convert between HEX, RGB, and HSL color formats.
        </p>
      </div>

      {/* --- Color Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Real-Time Color Converter
        </h2>
        
        {/* --- Preview Box --- */}
        <div
          className="w-full h-32 rounded-lg border shadow-inner"
          style={{
            backgroundColor: `rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`,
          }}
        ></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HEX */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HEX</label>
            <input
              type="text"
              value={hexVal}
              onChange={handleHexChange}
              className="w-full p-3 rounded-lg border bg-background font-mono"
            />
          </div>
          
          {/* RGB */}
          <div className="space-y-2">
            <label className="text-sm font-medium">RGB</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="255"
                value={rgbVal.r}
                onChange={(e) => handleRgbChange(e, 'r')}
                className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                aria-label="Red"
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rgbVal.g}
                onChange={(e) => handleRgbChange(e, 'g')}
                className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                aria-label="Green"
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rgbVal.b}
                onChange={(e) => handleRgbChange(e, 'b')}
                className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                aria-label="Blue"
              />
            </div>
          </div>

          {/* HSL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HSL</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="360"
                value={hslVal.h}
                onChange={(e) => handleHslChange(e, 'h')}
                className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                aria-label="Hue"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={hslVal.s}
                onChange={(e) => handleHslChange(e, 's')}
                className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                aria-label="Saturation"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={hslVal.l}
                onChange={(e) => handleHslChange(e, 'l')}
                className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                aria-label="Lightness"
              />
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

        {/* --- Understanding Color Models Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            Understanding Color Models
          </h2>
          <p className="text-muted-foreground mb-4">This tool provides three common ways to represent the same color. Here is what they mean and where to use them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Format</th>
                  <th className="p-3 border border-border">Example</th>
                  <th className="p-3 border border-border">What it Means</th>
                  <th className="p-3 border border-border">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">HEX</td>
                  <td className="p-3 border border-border font-mono">#FF5733</td>
                  <td className="p-3 border border-border">A 6-digit code representing Red, Green, and Blue values.</td>
                  <td className="p-3 border border-border">Web Design (CSS, HTML). The most common format for web development.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">RGB</td>
                  <td className="p-3 border border-border font-mono">rgb(255, 87, 51)</td>
                  <td className="p-3 border border-border">Values of **R**ed, **G**reen, and **B**lue light, each from 0 to 255.</td>
                  <td className="p-3 border border-border">Digital design (Photoshop) and web design (CSS), especially when opacity (RGBA) is needed.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">HSL</td>
                  <td className="p-3 border border-border font-mono">hsl(12, 100%, 60%)</td>
                  <td className="p-3 border border-border">**H**ue (the color on the wheel, 0-360), **S**aturation (0-100%), and **L**ightness (0-100%).</td>
                  <td className="p-3 border border-border">Human-readable adjustments. It's easy to make a color "lighter" (increase L) or "more vibrant" (increase S).</td>
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
          <a href="/color-picker" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Color Picker
          </a>
          <a href="/gradient-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Gradient Generator
          </a>
          <a href="/text-tools" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Text & Coding
          </a>
          <a href="/" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}