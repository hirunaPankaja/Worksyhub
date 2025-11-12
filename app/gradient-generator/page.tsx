// src/app/gradient-generator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Layers, BookOpen, Clipboard, Check, Type, Droplet, Sun } from 'lucide-react';

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
// --- End of Utility Functions ---

export default function GradientGeneratorPage() {
  // Gradient State
  const [gradStart, setGradStart] = useState('#ff0000');
  const [gradEnd, setGradEnd] = useState('#0000ff');
  const [gradAngle, setGradAngle] = useState(90);
  const [gradType, setGradType] = useState('linear');
  const [gradCode, setGradCode] = useState('');
  const [gradCodeFormat, setGradCodeFormat] = useState('css'); // 'css', 'flutter', 'react-native'
  const [copiedGrad, setCopiedGrad] = useState(false);
  const [gradientPreview, setGradientPreview] = useState(''); // For the preview div

  // --- Gradient Code Generators ---
  const generateCssGradient = () =>
    gradType === 'linear'
      ? `background: linear-gradient(${gradAngle}deg, ${gradStart}, ${gradEnd});`
      : `background: radial-gradient(circle, ${gradStart}, ${gradEnd});`;

  const generateFlutterGradient = () => {
    const { r: r1, g: g1, b: b1 } = hexToRgb(gradStart);
    const { r: r2, g: g2, b: b2 } = hexToRgb(gradEnd);

    // Simplistic angle to alignment conversion
    let begin, end;
    if (gradAngle === 0) {
      begin = 'Alignment.bottomCenter';
      end = 'Alignment.topCenter';
    } else if (gradAngle === 90) {
      begin = 'Alignment.centerLeft';
      end = 'Alignment.centerRight';
    } else if (gradAngle === 180) {
      begin = 'Alignment.topCenter';
      end = 'Alignment.bottomCenter';
    } else if (gradAngle === 270) {
      begin = 'Alignment.centerRight';
      end = 'Alignment.centerLeft';
    } else {
      begin = 'Alignment.bottomLeft'; // Default
      end = 'Alignment.topRight';
    }

    const type =
      gradType === 'linear'
        ? `LinearGradient(\n    begin: ${begin},\n    end: ${end},\n`
        : `RadialGradient(\n    radius: 0.5,\n`;

    return `Container(
  decoration: BoxDecoration(
    gradient: ${type}
      colors: <Color>[
        Color(0xFF${r1.toString(16).padStart(2, '0')}${g1.toString(16).padStart(2, '0')}${b1.toString(16).padStart(2, '0')}),
        Color(0xFF${r2.toString(16).padStart(2, '0')}${g2.toString(16).padStart(2, '0')}${b2.toString(16).padStart(2, '0')}),
      ],
    ),
  ),
),`;
  };

  const generateReactNativeGradient = () => {
    let start = '{ x: 0.5, y: 0 }';
    let end = '{ x: 0.5, y: 1 }';
    if (gradAngle === 0) {
      start = '{ x: 0.5, y: 1 }';
      end = '{ x: 0.5, y: 0 }';
    } else if (gradAngle === 90) {
      start = '{ x: 0, y: 0.5 }';
      end = '{ x: 1, y: 0.5 }';
    } // etc.

    if (gradType === 'radial') {
      return `// Requires 'react-native-radial-gradient'
<RadialGradient
  colors={['${gradStart}', '${gradEnd}']}
  radius={100}
>
  {/* Your content here */}
</RadialGradient>`;
    }

    return `// Requires 'react-native-linear-gradient'
<LinearGradient
  colors={['${gradStart}', '${gradEnd}']}
  start={${start}}
  end={${end}}
  style={styles.gradient}
>
  {/* Your content here */}
</LinearGradient>`;
  };

  // --- Effects ---
  useEffect(() => {
    // Update preview
    const cssPreview =
      gradType === 'linear'
        ? `linear-gradient(${gradAngle}deg, ${gradStart}, ${gradEnd})`
        : `radial-gradient(circle, ${gradStart}, ${gradEnd})`;
    setGradientPreview(cssPreview);

    // Update code output based on format
    if (gradCodeFormat === 'css') {
      setGradCode(generateCssGradient());
    } else if (gradCodeFormat === 'flutter') {
      setGradCode(generateFlutterGradient());
    } else if (gradCodeFormat === 'react-native') {
      setGradCode(generateReactNativeGradient());
    }
  }, [
    gradStart,
    gradEnd,
    gradAngle,
    gradType,
    gradCodeFormat,
  ]);

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tutorials = {
    title: 'How to Use the Gradient Generator',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Select Colors:** Use the "Start Color" and "End Color" pickers to choose your two colors.',
          '**2. Choose Type:** Select "Linear" for a straight-line gradient or "Radial" for a circular one.',
          '**3. Adjust Angle (Linear Only):** If using a linear gradient, drag the "Angle" slider to change its direction (e.g., 90deg is left-to-right).',
          '**4. Get Code:** Select your desired code format (CSS, Flutter, React Native) from the tabs and click the copy button.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          CSS Gradient Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Create linear and radial gradients and get the code for CSS, Flutter, and React Native.
        </p>
      </div>

      {/* --- Gradient Generator Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- Controls --- */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Start Color
                </label>
                <input
                  type="color"
                  value={gradStart}
                  onChange={(e) => setGradStart(e.target.value)}
                  className="w-full h-12 p-1 rounded-lg border bg-background"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  End Color
                </label>
                <input
                  type="color"
                  value={gradEnd}
                  onChange={(e) => setGradEnd(e.target.value)}
                  className="w-full h-12 p-1 rounded-lg border bg-background"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={gradType}
                onChange={(e) => setGradType(e.target.value)}
                className="w-full p-3 rounded-lg border bg-background"
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>
            {gradType === 'linear' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Angle: {gradAngle}deg
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={gradAngle}
                  onChange={(e) => setGradAngle(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
          
          {/* --- Preview --- */}
          <div
            className="w-full h-48 md:h-full rounded-lg border"
            style={{ background: gradientPreview }}
          ></div>
        </div>
        
        {/* --- Code Output --- */}
        <div>
          <label className="block text-sm font-medium mb-2">Code</label>
          <div className="flex gap-1 mb-2">
            <button
              onClick={() => setGradCodeFormat('css')}
              className={`px-3 py-1 rounded-t-lg text-sm ${
                gradCodeFormat === 'css'
                  ? 'bg-muted text-foreground'
                  : 'bg-background text-muted-foreground'
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setGradCodeFormat('flutter')}
              className={`px-3 py-1 rounded-t-lg text-sm ${
                gradCodeFormat === 'flutter'
                  ? 'bg-muted text-foreground'
                  : 'bg-background text-muted-foreground'
              }`}
            >
              Flutter
            </button>
            <button
              onClick={() => setGradCodeFormat('react-native')}
              className={`px-3 py-1 rounded-t-lg text-sm ${
                gradCodeFormat === 'react-native'
                  ? 'bg-muted text-foreground'
                  : 'bg-background text-muted-foreground'
              }`}
            >
              React Native
            </button>
          </div>
          <div className="p-4 rounded-b-lg rounded-r-lg bg-muted flex items-start gap-4">
            <pre className="flex-1 text-sm font-mono overflow-x-auto text-foreground h-32">
              {gradCode}
            </pre>
            <button
              onClick={() => copyToClipboard(gradCode, setCopiedGrad)}
              className="p-2 rounded-lg bg-background hover:bg-background/80"
            >
              {copiedGrad ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Clipboard className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Generator
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

        {/* --- What is a Gradient? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Droplet className="h-6 w-6 text-primary" />
            What is a CSS Gradient?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>A gradient is a smooth transition between two or more colors. In web design, gradients are treated as a type of image and are typically used as a background for elements like buttons, headers, or the entire page.</p>
            <p>They are more flexible than static images because they are generated by code, meaning they don't lose quality when resized and can be easily updated.</p>
          </div>
        </div>
        
        {/* --- Linear vs. Radial Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Linear vs. Radial Gradients
          </h2>
          <p className="text-muted-foreground mb-4">This tool can generate the two most common types of gradients. Here's the difference:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Type</th>
                  <th className="p-3 border border-border">Description</th>
                  <th className="p-3 border border-border">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold flex items-center gap-2"><Type className="h-4 w-4" />Linear</td>
                  <td className="p-3 border border-border">Colors transition in a straight line. You can control the direction with an angle.</td>
                  <td className="p-3 border border-border">Page backgrounds, buttons, and "hero" sections.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold flex items-center gap-2"><Sun className="h-4 w-4" />Radial</td>
                  <td className="p-3 border border-border">Colors radiate from a central point outwards in a circular or elliptical shape.</td>
                  <td className="p-3 border border-border">Creating a "spotlight" effect or a subtle background glow.</td>
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