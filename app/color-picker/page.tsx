// src/app/color-picker/page.tsx
'use client';

import { useState } from 'react';
import { BookOpen, Clipboard, Check, Palette } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

export default function ColorPickerPage() {
  const [pickerColor, setPickerColor] = useState('#aabbcc');
  const [copiedPicker, setCopiedPicker] = useState(false);

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Convert HEX to HSL
  const hexToHsl = (hex: string) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };


  const tutorials = {
    title: 'Color Picker Guide',
    sections: [
      {
        title: 'How to Use the Color Picker',
        content: [
          '**1. Pick a Color:** Click and drag your mouse on the large color square to select saturation and brightness. Use the slider on the right to select the hue (the core color).',
          '**2. View Values:** The HEX, RGB, and HSL codes are displayed below the picker.',
          '**3. Copy Value:** Click the "Copy" button next to any value to instantly copy it to your clipboard.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Online Color Picker
        </h1>
        <p className="text-lg text-muted-foreground">
          Pick a color and get its HEX, RGB, and HSL values instantly.
        </p>
      </div>

      {/* --- Color Picker Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Find Your Perfect Color
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center">
            {/* --- Large Picker --- */}
            <div className="w-full h-96 min-w-[300px]">
              <HexColorPicker
                color={pickerColor}
                onChange={setPickerColor}
                className="w-full h-full"
                 style={{ 
                    minHeight: '360px',
                    minWidth: '330px',
                    borderRadius: '8px'
                  }}
              />
            </div>
          </div>
          <div className="space-y-4">
            {/* --- Preview Box --- */}
            <div
              className="w-full h-48 rounded-lg border shadow-inner"
              style={{ backgroundColor: pickerColor }}
            ></div>
            
            {/* --- Value Boxes --- */}
            <div className="space-y-3">
              {/* HEX */}
              <div className="p-3 rounded-lg bg-muted flex items-center gap-4">
                <label className="w-12 font-semibold text-muted-foreground">HEX</label>
                <input
                  type="text"
                  value={pickerColor}
                  onChange={(e) => setPickerColor(e.target.value)}
                  className="flex-1 text-lg font-mono bg-transparent border-none outline-none text-foreground"
                />
                <button
                  onClick={() => copyToClipboard(pickerColor, setCopiedPicker)}
                  className="p-2 rounded-lg bg-background hover:bg-background/80"
                >
                  {copiedPicker ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clipboard className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
              {/* RGB */}
              <div className="p-3 rounded-lg bg-muted flex items-center gap-4">
                <label className="w-12 font-semibold text-muted-foreground">RGB</label>
                <input
                  type="text"
                  readOnly
                  value={hexToRgb(pickerColor)}
                  className="flex-1 text-lg font-mono bg-transparent border-none outline-none text-foreground"
                />
              </div>
              {/* HSL */}
              <div className="p-3 rounded-lg bg-muted flex items-center gap-4">
                <label className="w-12 font-semibold text-muted-foreground">HSL</label>
                <input
                  type="text"
                  readOnly
                  value={hexToHsl(pickerColor)}
                  className="flex-1 text-lg font-mono bg-transparent border-none outline-none text-foreground"
                />
              </div>
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
            How to Use the Color Picker
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
                  <th className="p-3 border border-border">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">HEX (Hexadecimal)</td>
                  <td className="p-3 border border-border font-mono">#FF5733</td>
                  <td className="p-3 border border-border">Web Design (CSS, HTML). This is the most common format for web development.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">RGB (Red, Green, Blue)</td>
                  <td className="p-3 border border-border font-mono">rgb(255, 87, 51)</td>
                  <td className="p-3 border border-border">Digital design (like Photoshop) and web design, especially when opacity (RGBA) is needed.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">HSL (Hue, Saturation, Lightness)</td>
                  <td className="p-3 border border-border font-mono">hsl(12, 100%, 60%)</td>
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
          <a href="/gradient-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Gradient Generator
          </a>
          <a href="/color-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Color Converter
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