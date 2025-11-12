// src/app/barcode-generator/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Download, Barcode, Package, Store } from 'lucide-react';
import BarcodeComponent, { type BarcodeProps } from 'react-barcode';

// Define the BarcodeFormat type from the library's props
type BarcodeFormat = BarcodeProps['format'];

// Define the supported barcode formats with the correct type
const barcodeFormats: BarcodeFormat[] = [
  'CODE128', // Most common for logistics, inventory
  'CODE39',
  'EAN13', // Retail products (Europe)
  'EAN8',
  'UPC', // Retail products (North America)
  'ITF',
  'MSI',
  'pharmacode',
];

export default function BarcodeGeneratorPage() {
  const [barcodeValue, setBarcodeValue] = useState('1234567890');
  const [barcodeFormat, setBarcodeFormat] = useState<BarcodeFormat>('CODE128');
  const [barColor, setBarColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(100);
  
  // State for validation messages
  const [validationMsg, setValidationMsg] = useState({ type: '', text: '' });
  
  const barcodeRef = useRef<HTMLDivElement>(null);

  // Smarter validation logic
  useEffect(() => {
    setValidationMsg({ type: '', text: '' }); // Reset on every change
    const numericOnly = /^\d+$/.test(barcodeValue);

    if (barcodeFormat === 'EAN13' || barcodeFormat === 'EAN8' || barcodeFormat === 'UPC') {
      if (!numericOnly && barcodeValue.length > 0) {
        setValidationMsg({ type: 'error', text: `${barcodeFormat} only accepts numbers.` });
        return;
      }
    }

    if (barcodeFormat === 'EAN13') {
      if (barcodeValue.length > 12) {
        setValidationMsg({ type: 'warning', text: 'Input is > 12 digits. Using first 12 (13th is auto-calculated).' });
      } else if (barcodeValue.length < 12) {
        setValidationMsg({ type: 'error', text: 'EAN-13 requires 12 digits.' });
      }
    } else if (barcodeFormat === 'UPC') {
      if (barcodeValue.length > 11) {
        setValidationMsg({ type: 'warning', text: 'Input is > 11 digits. Using first 11 (12th is auto-calculated).' });
      } else if (barcodeValue.length < 11) {
        setValidationMsg({ type: 'error', text: 'UPC requires 11 digits.' });
      }
    } else if (barcodeFormat === 'EAN8') {
      if (barcodeValue.length > 7) {
        setValidationMsg({ type: 'warning', text: 'Input is > 7 digits. Using first 7 (8th is auto-calculated).' });
      } else if (barcodeValue.length < 7) {
        setValidationMsg({ type: 'error', text: 'EAN-8 requires 7 digits.' });
      }
    }
  }, [barcodeValue, barcodeFormat]);

  // Function to trim value if user enters check-digit
  const getValidatedValue = () => {
    if (barcodeFormat === 'EAN13' && barcodeValue.length > 12) {
      return barcodeValue.substring(0, 12);
    }
    if (barcodeFormat === 'UPC' && barcodeValue.length > 11) {
      return barcodeValue.substring(0, 11);
    }
    if (barcodeFormat === 'EAN8' && barcodeValue.length > 7) {
      return barcodeValue.substring(0, 7);
    }
    return barcodeValue;
  };

  const downloadBarcode = () => {
    const svg = barcodeRef.current?.querySelector('svg');
    if (svg) {
      try {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          const pngUrl = canvas.toDataURL('image/png');
          let downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `worksyhub-barcode-${barcodeValue}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        };
        img.onerror = () => { throw new Error('Image could not be loaded for download.'); }
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
      } catch (error) {
        console.error('Failed to download barcode:', error);
        alert(`Error: Could not download barcode.\n${(error as Error).message}`);
      }
    }
  };

  const tutorials = {
    title: 'How to Use the Barcode Generator',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          "**1. Enter Data:** Type the numbers or text you want to encode. **Note:** Some formats (like UPC and EAN) only accept digits and have strict length requirements.",
          "**2. Select Format:** Choose the barcode type from the dropdown. `CODE128` is the most flexible for general use. `UPC` and `EAN` are for retail products.",
          "**3. Customize (Optional):**",
          "  - **Colors:** Change the bar and background colors. **High contrast is required** for scanners.",
          "  - **Size:** Use the sliders to adjust the width and height of the barcode bars.",
          "**4. Download:** Click 'Download Barcode' to save a high-quality PNG image.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Online Barcode Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Create, customize, and download barcodes for free.
        </p>
      </div>

      {/* --- Barcode Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- Controls --- */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="barcodeValue">
                Data to Encode
              </label>
              <input
                id="barcodeValue"
                type="text"
                value={barcodeValue}
                onChange={(e) => setBarcodeValue(e.target.value)}
                placeholder="Enter data for barcode"
                className="w-full p-3 rounded-lg border bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="barcodeFormat">
                Barcode Format
              </label>
              <select
                id="barcodeFormat"
                value={barcodeFormat}
                onChange={(e) => setBarcodeFormat(e.target.value as BarcodeFormat)}
                className="w-full p-3 rounded-lg border bg-background capitalize"
              >
                {barcodeFormats.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
              {/* --- Validation Message Display --- */}
              {validationMsg.text && (
                <p className={`text-sm mt-2 ${
                  validationMsg.type === 'error' ? 'text-red-500' : 'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {validationMsg.text}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bar Color</label>
                <input
                  type="color"
                  value={barColor}
                  onChange={(e) => setBarColor(e.target.value)}
                  className="w-full h-12 p-1 rounded-lg border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Background Color</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-12 p-1 rounded-lg border bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Bar Width: {barWidth}px
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="0.5"
                value={barWidth}
                onChange={(e) => setBarWidth(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Bar Height: {barHeight}px
              </label>
              <input
                type="range"
                min="30"
                max="150"
                step="10"
                value={barHeight}
                onChange={(e) => setBarHeight(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <button
              onClick={downloadBarcode}
              disabled={validationMsg.type === 'error' || !barcodeValue}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Download Barcode (PNG)
            </button>
          </div>

          {/* --- Preview --- */}
          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white" ref={barcodeRef}>
            {barcodeValue && validationMsg.type !== 'error' ? (
              <BarcodeComponent
                value={getValidatedValue()} // Use the function to trim value
                format={barcodeFormat}
                lineColor={barColor}
                background={bgColor}
                width={barWidth}
                height={barHeight}
                displayValue={true} // Show the text value below
              />
            ) : (
              <div className="text-center text-red-600 p-4">
                <p className="font-semibold">Invalid Input</p>
                <p className="text-sm">{validationMsg.text || 'Please enter valid data.'}</p>
              </div>
            )}
            {!barcodeValue && (
              <p className="text-muted-foreground p-4">Enter data to generate barcode</p>
            )}
          </div>
        </div>
      </div>

      {/* --- Rich Content Section --- */}
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

        {/* --- What is a Barcode? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Barcode className="h-6 w-6 text-primary" />
            What is a Barcode vs. a QR Code?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>A barcode (like the ones this tool generates) is **1D (one-dimensional)**. It stores data in a series of parallel lines and is read horizontally. It's best for small amounts of data, like a product number.</p>
            <p>A **QR Code** is **2D (two-dimensional)**. It's a matrix of black and white squares that stores data both horizontally and vertically. This allows it to hold much more information, such as a full website URL, contact information, or Wi-Fi network details.</p>
          </div>
        </div>
        
        {/* --- Common Barcode Types Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Common Barcode Types
          </h2>
          <p className="text-muted-foreground mb-4">Different barcodes are used for different purposes. Here are the most common ones.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Format</th>
                  <th className="p-3 border border-border">Common Use</th>
                  <th className="p-3 border border-border">Data Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold flex items-center gap-2"><Package className="h-4 w-4" />CODE 128</td>
                  <td className="p-3 border border-border">Logistics, shipping, inventory. Very high-density and flexible.</td>
                  <td className="p-3 border border-border">Alphanumeric (Letters & Numbers)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold flex items-center gap-2"><Store className="h-4 w-4" />UPC-A</td>
                  <td className="p-3 border border-border">Retail products (USA & Canada). The standard barcode on most products.</td>
                  <td className="p-3 border border-border">Numeric (Requires 11 digits)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold flex items-center gap-2"><Store className="h-4 w-4" />EAN-13</td>
                  <td className="p-3 border border-border">Retail products (Europe & International). Similar to UPC.</td>
                  <td className="p-3 border border-border">Numeric (Requires 12 digits)</td>
                </tr>
                 <tr>
                  <td className="p-3 border border-border font-semibold flex items-center gap-2"><Store className="h-4 w-4" />EAN-8</td>
                  <td className="p-3 border border-border">Small retail products.</td>
                  <td className="p-3 border border-border">Numeric (Requires 7 digits)</td>
                </tr>
                 <tr>
                  <td className="p-3 border border-border font-semibold">CODE 39</td>
                  <td className="p-3 border border-border">Automotive and defense industries. Older, less dense than Code 128.</td>
                  <td className="p-3 border border-border">Alphanumeric (limited character set)</td>
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
          <a href="/password-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Password Generator
          </a>
          <a href="/qr-code-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            QR Code Generator
          </a>
          <a href="/case-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Case Converter
          </a>
          <a href="/word-counter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Word Counter
          </a>
        </div>
      </div>
    </div>
  );
}