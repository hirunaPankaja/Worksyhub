// src/app/design-tools/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import {
  Palette,
  Layers,
  Pipette,
  BookOpen,
  Clipboard,
  Check,
} from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

// --- Utility Functions for Color Conversion ---
// (Unchanged)
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

// --- NEW: A wrapper component to use Suspense ---
export default function DesignToolsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesignToolsPage />
    </Suspense>
  );
}

function DesignToolsPage() {
  const [activeTab, setActiveTab] = useState('picker');
  const [activeTutorial, setActiveTutorial] = useState('picker');

  // --- State for Tools ---
  const [pickerColor, setPickerColor] = useState('#aabbcc');
  const [copiedPicker, setCopiedPicker] = useState(false);

  // Gradient State
  const [gradStart, setGradStart] = useState('#ff0000');
  const [gradEnd, setGradEnd] = useState('#0000ff');
  const [gradAngle, setGradAngle] = useState(90);
  const [gradType, setGradType] = useState('linear');
  const [gradCode, setGradCode] = useState('');
  const [gradCodeFormat, setGradCodeFormat] = useState('css'); // 'css', 'flutter', 'react-native'
  const [copiedGrad, setCopiedGrad] = useState(false);
  const [gradientPreview, setGradientPreview] = useState(''); // For the preview div

  // Converter State
  const [hexVal, setHexVal] = useState('#ffffff');
  const [rgbVal, setRgbVal] = useState({ r: 255, g: 255, b: 255 });
  const [hslVal, setHslVal] = useState({ h: 0, s: 0, l: 100 });

  // --- Tabs Definition ---
  const tabs = [
    { id: 'picker', label: 'Color Picker', icon: Pipette },
    { id: 'gradient', label: 'Gradient Generator', icon: Layers },
    { id: 'converter', label: 'Color Converter', icon: Palette },
  ];

  // --- NEW: This block reads the URL query ---
  const searchParams = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, tabs]); // Added tabs to dependency array
  // --- END NEW BLOCK ---

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
    // Requires `react-native-linear-gradient`
    // Simplistic angle to coords conversion
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
      return `// 'react-native-radial-gradient' is needed for radial
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
    setActiveTutorial(activeTab);
  }, [activeTab]);

  // Gradient Generator Effect
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
    gradCodeFormat, // Re-run when format changes
  ]);

  // --- Tool Functions ---

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Color Converter Handlers
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hex = e.target.value;
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
    setHexVal(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
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

  // --- Tutorials Content (unchanged) ---
  const tutorials = {
    picker: {
      title: 'Color Picker Guide',
      sections: [
        {
          title: 'How to Use the Color Picker',
          content: [
            'This tool helps you explore, select, and save colors for your design projects.',
            '**1. Pick a Color:** Click and drag your mouse on the large color square to select saturation and brightness. Use the slider on the right to select the hue (the core color).',
            '**2. View Values:**',
            'The HEX code (e.g., `#FF0000`) is displayed below the picker. This is the value most commonly used in web design (CSS).',
            '**3. Copy Value:**',
            'Click the "Copy" button to instantly copy the HEX code to your clipboard.',
            '',
            'This tool is perfect for finding the exact shade you need for a website, presentation, or digital art.',
          ],
        },
      ],
    },
    gradient: {
      title: 'CSS Gradient Generator Guide',
      sections: [
        {
          title: 'How to Create a CSS Gradient',
          content: [
            'Gradients are smooth transitions between two or more colors. This tool generates the code for you.',
            '**1. Select Colors:** Use the color inputs to choose a "Start" and "End" color for your gradient.',
            '**2. Choose Type:**',
            '  - **Linear:** The gradient flows in a straight line. Use the "Angle" slider to change its direction (e.g., 0deg is bottom-to-top, 90deg is left-to-right).',
            '  - **Radial:** The gradient radiates from the center outwards in a circle.',
            '**3. Preview & Copy:**',
            'The large box shows a live preview. Below, select a code format (CSS, Flutter, React Native) and click the "Copy" button.',
          ],
        },
      ],
    },
    converter: {
      title: 'Color Converter Guide',
      sections: [
        {
          title: 'How to Convert Color Formats',
          content: [
            'Different systems use different formats to describe the same color. This tool converts between them instantly.',
            '**Color Formats:**',
            '  - **HEX:** Hexadecimal code (e.g., `#FFFFFF`). Common in CSS and HTML.',
            '  - **RGB:** Red, Green, Blue (e.g., `rgb(255, 255, 255)`). Values are 0-255.',
            '  - **HSL:** Hue, Saturation, Lightness (e.g., `hsl(0, 0%, 100%)`). More intuitive for humans to adjust.',
            '',
            '**How to Use:**',
            'Simply change any value in any of the three boxes. All other boxes will update in real-time to show the corresponding values for that color.',
            'The large color swatch at the top shows a live preview.',
          ],
        },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Design & Color Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Pick colors, generate gradients, and convert color formats instantly
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

        {/* --- Color Picker --- */}
      {activeTab === 'picker' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Color Picker
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col items-center">
              {/* ===> CHANGED: Larger container with custom styles <=== */}
              <div className="w-full max-w-2xl h-96 bg-muted rounded-lg p-4">
                <HexColorPicker
                  color={pickerColor}
                  onChange={setPickerColor}
                  className="w-full h-full max-w-none"
                  style={{ 
                    minHeight: '360px',
                    minWidth: '330px',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>
            <div className="space-y-4">
              {/* ===> CHANGED: Larger preview box <=== */}
              <div
                className="w-full h-48 rounded-lg border shadow-lg"
                style={{ backgroundColor: pickerColor }}
              ></div>
              <div className="p-4 rounded-lg bg-muted flex items-center gap-4">
                <input
                  type="text"
                  value={pickerColor}
                  onChange={(e) => setPickerColor(e.target.value)}
                  className="flex-1 text-2xl font-mono bg-transparent border-none outline-none text-foreground"
                />
                <button
                  onClick={() =>
                    copyToClipboard(pickerColor, setCopiedPicker)
                  }
                  className="p-2 rounded-lg bg-background hover:bg-background/80"
                >
                  {copiedPicker ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clipboard className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Gradient Generator --- */}
      {activeTab === 'gradient' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            CSS Gradient Generator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {/* --- REDUCED GRADIENT PREVIEW --- */}
            <div
              className="w-full h-40 md:h-full rounded-lg border"
              style={{ background: gradientPreview }}
            ></div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Code</label>
            {/* --- NEW CODE TABS --- */}
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
      )}

      {/* --- Color Converter --- */}
      {activeTab === 'converter' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Color Converter (HEX / RGB / HSL)
          </h2>
          {/* --- REDUCED CONVERTER PREVIEW --- */}
          <div
            className="w-full h-24 rounded-lg border"
            style={{
              backgroundColor: `rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`,
            }}
          ></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">HEX</label>
              <input
                type="text"
                value={hexVal}
                onChange={handleHexChange}
                className="w-full p-3 rounded-lg border bg-background font-mono"
              />
            </div>
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
                />
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbVal.g}
                  onChange={(e) => handleRgbChange(e, 'g')}
                  className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                />
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbVal.b}
                  onChange={(e) => handleRgbChange(e, 'b')}
                  className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                />
              </div>
            </div>
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
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hslVal.s}
                  onChange={(e) => handleHslChange(e, 's')}
                  className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hslVal.l}
                  onChange={(e) => handleHslChange(e, 'l')}
                  className="w-1/3 p-3 rounded-lg border bg-background font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Tutorials Section --- */}
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
                {tutorials[activeTutorial as keyof typeof tutorials]?.sections?.map(
                  (section: { title: string; content: string[] }, sectionIndex: number) => (
                    <div key={sectionIndex} className="space-y-4">
                      <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                        {section.title}
                      </h4>
                      <div className="prose prose-lg max-w-none text-foreground">
                        {section.content.map((line: string, lineIndex: number) => (
                          <p
                            key={lineIndex}
                            className="text-foreground leading-relaxed"
                          >
                            {line.startsWith('**') ? (
                              <strong>{line.replace(/\*\*/g, '')}</strong>
                            ) : line.startsWith('  -') ? (
                              <span className="ml-4">{line}</span>
                            ) : line === '' ? (
                              <br />
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 dark:bg-blue-950/50 dark:border-blue-800">
              <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-300">Pro Tip</h4>
              <p className="text-blue-700 dark:text-blue-300">
                {activeTutorial === 'picker' &&
                  'You can also type a HEX code directly into the input box (e.g., #336699) to see that exact color.'}
                {activeTutorial === 'gradient' &&
                  'The code generated for Flutter and React Native requires installing external packages like `linear_gradient` or `react-native-linear-gradient`.'}
                {activeTutorial === 'converter' &&
                  'Use the HSL (Hue, Saturation, Lightness) sliders to easily find lighter or darker shades (L) or more/less vibrant versions (S) of your color.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section (unchanged) --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Need More Tools?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a
            href="/productivity-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Productivity Tools
          </a>
          <a
            href="/text-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Text & Coding
          </a>
          <a
            href="/file-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            File Tools
          </a>
          <a
            href="/"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}