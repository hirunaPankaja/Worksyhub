// src/app/barcode-generator/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Download, Barcode, Package, Store, Settings, Zap, Palette, Ruler, Type, Scan, Shield, Users, Globe, Smartphone, Printer, CloudDownload } from 'lucide-react';
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
  const [fontSize, setFontSize] = useState(16);
  const [margin, setMargin] = useState(10);
  const [textAlign, setTextAlign] = useState('center' as 'left' | 'center' | 'right');
  const [showText, setShowText] = useState(true);
  const [quality, setQuality] = useState('high');
  
  // State for validation messages
  const [validationMsg, setValidationMsg] = useState({ type: '', text: '' });
  
  const barcodeRef = useRef<HTMLDivElement>(null);

  // Enhanced validation logic
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
          downloadLink.download = `worksyhub-barcode-${barcodeValue}-${barcodeFormat}.png`;
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
          "  - **Text Settings:** Control font size, alignment, and visibility of the barcode text.",
          "  - **Margins:** Adjust the spacing around your barcode for better printing.",
          "**4. Download:** Click 'Download Barcode' to save a high-quality PNG image.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- SEO Intro Section --- */}
      <div className="text-center space-y-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 rounded-2xl border">
        <h1 className="text-5xl font-bold text-foreground">
          Free Online Barcode Generator
        </h1>
        <p className="text-2xl font-semibold text-muted-foreground">
          Create Professional Barcodes Instantly - No Software Required
        </p>
        <div className="prose prose-lg max-w-4xl mx-auto text-left text-foreground">
          <p className="text-lg leading-relaxed">
            Welcome to the most advanced <strong>free online barcode generator</strong> available. Our powerful <strong>barcode creation tool</strong> enables businesses, retailers, and individuals to generate professional <strong>industry-standard barcodes</strong> in seconds. Whether you need <strong>UPC barcodes for retail products</strong>, <strong>Code 128 for inventory management</strong>, or <strong>EAN-13 for international sales</strong>, our <strong>comprehensive barcode generator</strong> supports all major formats. Create <strong>high-quality barcode images</strong> that are perfectly optimized for scanning, printing, and digital use. Our <strong>web-based barcode maker</strong> requires no downloads, no registration, and works entirely in your browser for maximum security and convenience.
          </p>
          <p className="text-lg leading-relaxed">
            Generate <strong>custom barcodes with advanced styling options</strong> including color customization, size adjustment, and text formatting. Download your <strong>professional barcode as PNG</strong> files ready for product labels, packaging, shipping manifests, and asset tracking systems. Our <strong>barcode generator tool</strong> is trusted by small businesses, e-commerce stores, warehouses, and enterprises worldwide for creating <strong>scanner-compatible barcodes</strong> that meet industry standards. Experience the easiest way to create <strong>retail-ready barcodes</strong> without expensive software or complicated processes.
          </p>
        </div>
      </div>

      {/* --- Barcode Tool --- */}
      <div className="p-8 rounded-2xl border bg-card space-y-8 shadow-lg">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* --- Basic Controls --- */}
          <div className="space-y-6 xl:col-span-1">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-blue-600" />
                Basic Settings
              </h3>
              
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
                {validationMsg.text && (
                  <p className={`text-sm mt-2 ${
                    validationMsg.type === 'error' ? 'text-red-500' : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {validationMsg.text}
                  </p>
                )}
              </div>
            </div>

            {/* --- Advanced Customization --- */}
            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <Palette className="h-5 w-5 text-green-600" />
                Color Customization
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bar Color</label>
                  <input
                    type="color"
                    value={barColor}
                    onChange={(e) => setBarColor(e.target.value)}
                    className="w-full h-12 p-1 rounded-lg border bg-background cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Background Color</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-12 p-1 rounded-lg border bg-background cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* --- Size Controls --- */}
            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <Ruler className="h-5 w-5 text-purple-600" />
                Size & Dimensions
              </h3>
              
              <div className="space-y-4">
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
                    max="200"
                    step="10"
                    value={barHeight}
                    onChange={(e) => setBarHeight(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    step="1"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Margin: {margin}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* --- Text Settings --- */}
            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <Type className="h-5 w-5 text-orange-600" />
                Text Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Show Text Below Barcode</label>
                  <input
                    type="checkbox"
                    checked={showText}
                    onChange={(e) => setShowText(e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Text Alignment</label>
                  <select
                    value={textAlign}
                    onChange={(e) => setTextAlign(e.target.value as 'left' | 'center' | 'right')}
                    className="w-full p-2 rounded-lg border bg-background"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>

            {/* --- Download Options --- */}
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <CloudDownload className="h-5 w-5 text-red-600" />
                Export Settings
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Image Quality</label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full p-2 rounded-lg border bg-background"
                  >
                    <option value="standard">Standard</option>
                    <option value="high">High</option>
                    <option value="ultra">Ultra (300 DPI)</option>
                  </select>
                </div>

                <button
                  onClick={downloadBarcode}
                  disabled={validationMsg.type === 'error' || !barcodeValue}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="h-5 w-5" />
                  Download Barcode (PNG)
                </button>
              </div>
            </div>
          </div>

          {/* --- Preview Area --- */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center min-h-[500px]">
              <div ref={barcodeRef} className="text-center">
                {barcodeValue && validationMsg.type !== 'error' ? (
                  <div className="inline-block">
                    <BarcodeComponent
                      value={getValidatedValue()}
                      format={barcodeFormat}
                      lineColor={barColor}
                      background={bgColor}
                      width={barWidth}
                      height={barHeight}
                      fontSize={fontSize}
                      margin={margin}
                      textAlign={textAlign}
                      displayValue={showText}
                    />
                  </div>
                ) : (
                  <div className="text-center text-red-600 p-8">
                    <p className="font-semibold text-xl">Invalid Input</p>
                    <p className="text-lg mt-2">{validationMsg.text || 'Please enter valid data to generate your barcode.'}</p>
                  </div>
                )}
                {!barcodeValue && (
                  <div className="text-muted-foreground p-8 text-center">
                    <Scan className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Enter data above to generate your professional barcode</p>
                  </div>
                )}
              </div>
              
              {/* --- Barcode Info --- */}
              {barcodeValue && validationMsg.type !== 'error' && (
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg w-full max-w-md">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Barcode Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Format:</div>
                    <div className="font-medium">{barcodeFormat}</div>
                    <div>Data Length:</div>
                    <div className="font-medium">{barcodeValue.length} characters</div>
                    <div>Colors:</div>
                    <div className="font-medium">{barColor} / {bgColor}</div>
                    <div>Dimensions:</div>
                    <div className="font-medium">{barWidth}px × {barHeight}px</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Massive Content Section --- */}
      <div className="p-8 rounded-2xl bg-muted/50 space-y-12">
        
        {/* --- Blog Section --- */}
        <div className="bg-background border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Barcode Generator Blog & Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Why Use Our Barcode Generator?</h3>
              <div className="prose prose-lg max-w-none text-foreground space-y-4">
                <p>Our <strong>free online barcode generator</strong> stands out as the premier solution for creating professional barcodes without expensive software. Unlike traditional <strong>barcode creation tools</strong> that require installation and licensing fees, our web-based platform delivers enterprise-grade <strong>barcode generation capabilities</strong> completely free.</p>
                
                <p>Businesses worldwide trust our <strong>barcode generator for inventory management</strong>, retail product labeling, asset tracking, and shipping logistics. The tool generates <strong>scanner-compatible barcodes</strong> that meet all industry standards, ensuring your barcodes work flawlessly with any barcode scanning system.</p>

                <p>With advanced features like <strong>color customization for barcodes</strong>, precise size controls, and multiple export options, our platform provides everything needed for professional <strong>barcode creation and implementation</strong>. Whether you're a small business owner, e-commerce seller, or enterprise operations manager, this tool streamlines your <strong>barcode generation workflow</strong>.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Advanced Barcode Applications</h3>
              <div className="prose prose-lg max-w-none text-foreground space-y-4">
                <p>Modern businesses rely on <strong>professional barcode solutions</strong> for numerous applications. Retailers use <strong>UPC and EAN barcodes</strong> for product identification and point-of-sale systems. Warehouses implement <strong>Code 128 barcodes</strong> for inventory tracking and logistics management.</p>

                <p>Healthcare facilities utilize specialized <strong>barcode formats for medical equipment</strong> and patient record tracking. Libraries employ barcodes for <strong>asset management and circulation systems</strong>. Manufacturing plants integrate barcodes into their <strong>production line tracking</strong> and quality control processes.</p>

                <p>Our <strong>comprehensive barcode generator</strong> supports all these use cases with multiple format options, customization features, and high-quality output. The tool's flexibility makes it suitable for both simple <strong>retail barcode needs</strong> and complex <strong>enterprise barcode implementations</strong>.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="bg-background border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">Is this barcode generator really free?</h3>
              <p className="text-foreground">Yes, our <strong>online barcode generator</strong> is completely free to use with no hidden costs, registration requirements, or usage limits. You can create unlimited barcodes for personal or commercial use without any charges.</p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">What barcode formats are supported?</h3>
              <p className="text-foreground">Our <strong>comprehensive barcode tool</strong> supports all major 1D barcode formats including CODE128, CODE39, EAN-13, EAN-8, UPC, ITF, MSI, and pharmacode. This covers most business and industrial barcode requirements worldwide.</p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">Are the generated barcodes scanner-compatible?</h3>
              <p className="text-foreground">Absolutely. All barcodes generated by our tool are <strong>industry-standard compliant</strong> and fully compatible with commercial barcode scanners, mobile scanning apps, and POS systems when proper contrast and sizing are maintained.</p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">Can I use these barcodes for commercial products?</h3>
              <p className="text-foreground">Yes, you can use barcodes generated with our tool for commercial products, retail sales, inventory management, and business applications. However, for official retail products, ensure you have proper GS1 company prefixes for UPC and EAN codes.</p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">What file format are the downloads?</h3>
              <p className="text-foreground">Barcodes are downloaded as high-resolution PNG images, which are perfect for printing, digital use, and integration into various design software and business applications.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Do you store any of my barcode data?</h3>
              <p className="text-foreground">No. Our <strong>privacy-focused barcode generator</strong> operates entirely client-side in your browser. Your barcode data never leaves your computer, ensuring complete privacy and security for sensitive information.</p>
            </div>
          </div>
        </div>

        {/* --- Industry Applications --- */}
        <div className="bg-background border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Industry Applications of Barcodes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
              <Store className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Retail & E-commerce</h3>
              <p className="text-sm text-foreground">Product identification, inventory management, and point-of-sale systems using UPC, EAN, and Code 128 barcodes.</p>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
              <Package className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Logistics & Shipping</h3>
              <p className="text-sm text-foreground">Package tracking, warehouse management, and supply chain optimization with scannable barcode labels.</p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
              <Shield className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Healthcare</h3>
              <p className="text-sm text-foreground">Patient records, medication tracking, and medical equipment management using specialized barcode formats.</p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-lg">
              <Globe className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Library Systems</h3>
              <p className="text-sm text-foreground">Book tracking, membership cards, and circulation management with durable, scannable barcode labels.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Tools Grid --- */}
      <div className="p-8 rounded-2xl bg-primary/10 border border-primary/20">
        <h3 className="text-2xl font-semibold mb-6 text-center">Explore More Free Online Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          <a href="/qr-code-generator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            QR Code Generator
          </a>
          <a href="/password-generator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Password Generator
          </a>
          <a href="/case-converter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Case Converter
          </a>
          <a href="/word-counter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Word Counter
          </a>
          <a href="/image-converter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Image Converter
          </a>
          <a href="/color-picker" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Color Picker
          </a>
        </div>
      </div>
    </div>
  );
}