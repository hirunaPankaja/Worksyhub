// src/app/qr-code-generator/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Download,
  Image as ImageIcon,
  Palette,
  Trash2,
  Settings,
  Zap,
  Shield,
  Infinity,
  Sparkles,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Smartphone,
  Scan,
  Eye,
  Copy,
  Share2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeGeneratorPage() {
  const [qrText, setQrText] = useState('https://worksyhub.online');
  const [qrSize, setQrSize] = useState(256);
  const [qrFgColor, setQrFgColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [qrStyle, setQrStyle] = useState('squares');
  const [errorLevel, setErrorLevel] = useState('H');
  const [marginSize, setMarginSize] = useState(4);
  const [includeMargin, setIncludeMargin] = useState(true);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = () => {
    const svg = qrCodeRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        canvas.width = qrSize;
        canvas.height = qrSize;

        ctx.fillStyle = qrBgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, qrSize, qrSize);

        const pngUrl = canvas.toDataURL('image/png');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'professional-qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrText);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Minimal Header */}
      <div className="text-center space-y-4 pt-4">
        <h1 className="text-3xl font-bold text-foreground">
          QR Code Generator
        </h1>
        <p className="text-muted-foreground">
          Create custom QR codes with logos and colors - 100% Free
        </p>
      </div>

      {/* --- QR Code Tool - MOVED TO TOP --- */}
      <div className="p-6 rounded-xl border bg-card shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* --- Controls --- */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="qrText">
                  Text or URL
                </label>
                <div className="flex gap-2">
                  <input
                    id="qrText"
                    type="text"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    placeholder="Enter text or URL"
                    className="flex-1 p-3 rounded-lg border bg-background"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-3 border rounded-lg hover:bg-muted transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Dot Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={qrFgColor}
                      onChange={(e) => setQrFgColor(e.target.value)}
                      className="w-12 h-12 p-1 rounded-lg border bg-background cursor-pointer"
                    />
                    <input
                      type="text"
                      value={qrFgColor}
                      onChange={(e) => setQrFgColor(e.target.value)}
                      className="flex-1 p-2 rounded border text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={qrBgColor}
                      onChange={(e) => setQrBgColor(e.target.value)}
                      className="w-12 h-12 p-1 rounded-lg border bg-background cursor-pointer"
                    />
                    <input
                      type="text"
                      value={qrBgColor}
                      onChange={(e) => setQrBgColor(e.target.value)}
                      className="flex-1 p-2 rounded border text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <select
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full p-3 rounded-lg border bg-background"
                  >
                    <option value={128}>128px</option>
                    <option value={256}>256px</option>
                    <option value={384}>384px</option>
                    <option value={512}>512px</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Error Correction</label>
                  <select
                    value={errorLevel}
                    onChange={(e) => setErrorLevel(e.target.value)}
                    className="w-full p-3 rounded-lg border bg-background"
                  >
                    <option value="L">L (7%)</option>
                    <option value="M">M (15%)</option>
                    <option value="Q">Q (25%)</option>
                    <option value="H">H (30%)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Logo (Optional)</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleImageUpload}
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>

              {qrImage && (
                <button
                  onClick={() => setQrImage(null)}
                  className="w-full py-2 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove Logo
                </button>
              )}
            </div>

            <button
              onClick={downloadQR}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download QR Code (PNG)
            </button>
          </div>

          {/* --- Preview --- */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gray-50 border">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg mb-1">Live Preview</h3>
              <p className="text-sm text-muted-foreground">Scan test recommended</p>
            </div>

            <div
              className="p-4 rounded-lg border-2 border-dashed border-gray-300"
              ref={qrCodeRef}
              style={{ backgroundColor: qrBgColor }}
            >
              <QRCodeSVG
                value={qrText}
                size={Math.min(qrSize, 200)}
                fgColor={qrFgColor}
                bgColor={qrBgColor}
                level={errorLevel as any}
                includeMargin={includeMargin}
                marginSize={marginSize}
                imageSettings={
                  qrImage
                    ? {
                      src: qrImage,
                      height: Math.min(qrSize, 200) * 0.2,
                      width: Math.min(qrSize, 200) * 0.2,
                      excavate: true,
                    }
                    : undefined
                }
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Optimized for scanning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Options Accordion */}
      <div className="p-6 rounded-xl border bg-card">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer list-none">
            <h3 className="text-lg font-semibold">Advanced Options</h3>
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">QR Style</label>
              <select
                value={qrStyle}
                onChange={(e) => setQrStyle(e.target.value)}
                className="w-full p-3 rounded-lg border bg-background"
              >
                <option value="squares">Squares</option>
                <option value="dots">Dots</option>
                <option value="rounded">Rounded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Margin: {marginSize}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={marginSize}
                onChange={(e) => setMarginSize(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Include Margin</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeMargin}
                  onChange={(e) => setIncludeMargin(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Yes (recommended)</span>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* SEO Introduction Section */}
      <div className="prose prose-lg max-w-none text-foreground space-y-6 p-6 rounded-xl bg-muted/30">
        <h2 className="text-2xl font-bold text-foreground">Free QR Code Generator - Create Custom QR Codes Online</h2>
        <p>
          Welcome to our advanced <strong>free QR code generator</strong> - the ultimate tool for creating professional,
          <strong>custom QR codes</strong> with complete creative control. Generate stunning <strong>QR codes with logos</strong>,
          custom colors, and unique designs in seconds. Perfect for <strong>business marketing</strong>,
          <strong>personal use</strong>, <strong>restaurant menus</strong>, <strong>event invitations</strong>, and much more.
        </p>
        <p>
          Our <strong>QR code maker</strong> supports all types of data including URLs, text, contact information,
          WiFi credentials, and more. Create <strong>high-quality QR codes</strong> that work perfectly on both digital
          and print materials. Download your designs as <strong>high-resolution PNG files</strong> with crisp, clean
          edges that maintain quality at any size.
        </p>
        <p>
          Experience <strong>enterprise-level QR code generation</strong> without the enterprise price tag. All features
          are available 100% free with no registration required. Create unlimited <strong>custom QR codes</strong> with
          no watermarks or limitations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: <Sparkles className="h-6 w-6" />,
            title: 'Logo Integration',
            description: 'Add your brand logo to create professional, branded QR codes'
          },
          {
            icon: <Palette className="h-6 w-6" />,
            title: 'Color Customization',
            description: 'Choose any colors for dots and background with advanced color picker'
          },
          {
            icon: <Shield className="h-6 w-6" />,
            title: 'High Error Correction',
            description: 'Advanced error correction ensures scannability even with logos'
          },
          {
            icon: <Infinity className="h-6 w-6" />,
            title: 'Unlimited Generation',
            description: 'Create as many QR codes as you need with no limits'
          },
          {
            icon: <Zap className="h-6 w-6" />,
            title: 'Instant Download',
            description: 'Download high-resolution PNG files instantly'
          },
          {
            icon: <Eye className="h-6 w-6" />,
            title: 'Live Preview',
            description: 'Real-time preview of your QR code before downloading'
          }
        ].map((feature, index) => (
          <div key={index} className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
            <div className="text-primary mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Tutorial Section */}
      <div className="p-6 rounded-xl border bg-card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          How to Create QR Codes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step-by-Step Guide</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                <span>Enter your URL or text in the input field above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                <span>Customize colors using the color pickers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                <span>Upload your logo (optional but recommended for branding)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">4</span>
                <span>Adjust size and error correction as needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">5</span>
                <span>Download your QR code as PNG</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Best Practices</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Use high contrast colors for better scannability</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Keep logos small and centered</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Test with multiple devices before printing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Use error correction level H when adding logos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="p-6 rounded-xl border bg-card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'What types of data can I encode in a QR code?',
              a: 'Our QR code generator supports URLs, plain text, contact information, email addresses, phone numbers, SMS messages, WiFi credentials, and much more.'
            },
            {
              q: 'Is there a limit to how many QR codes I can generate?',
              a: 'No, our QR code generator is completely free with no limits. Create unlimited QR codes for personal, business, or commercial use.'
            },
            {
              q: 'Can I use the QR codes for commercial purposes?',
              a: 'Yes, all QR codes generated with our tool can be used for commercial purposes without any restrictions.'
            },
            {
              q: 'Do I need to create an account?',
              a: 'No account or registration is required. Our QR code generator works 100% client-side in your browser.'
            }
          ].map((faq, index) => (
            <details key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
              <summary className="cursor-pointer font-semibold text-lg mb-2">
                {faq.q}
              </summary>
              <p className="text-muted-foreground mt-2">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* More Tools Section */}
      <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">More Free Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/password-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors text-sm">
            Password Generator
          </a>
          <a href="/unit-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors text-sm">
            Unit Converter
          </a>
          <a href="/word-counter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors text-sm">
            Word Counter
          </a>
          <a href="/bmi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors text-sm">
            BMI Calculator
          </a>
        </div>
      </div>
    </div>
  );
}