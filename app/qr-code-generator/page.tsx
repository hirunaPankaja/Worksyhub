// src/app/qr-code-generator/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Download,
  Image as ImageIcon,
  Palette,
  Trash2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeGeneratorPage() {
  const [qrText, setQrText] = useState('https://worksyhub.online');
  const [qrSize, setQrSize] = useState(256);
  const [qrFgColor, setQrFgColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrImage, setQrImage] = useState<string | null>(null);
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
        // Set canvas to the desired size. SVG will scale.
        canvas.width = qrSize;
        canvas.height = qrSize;
        
        // **FIX:** Draw white background *first*
        ctx.fillStyle = qrBgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Then draw the SVG on top
        ctx.drawImage(img, 0, 0, qrSize, qrSize);
        
        const pngUrl = canvas.toDataURL('image/png');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'worksyhub-qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  const tutorials = {
    title: 'How to Create a Custom QR Code',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Data:** Type or paste the text or URL you want to encode.',
          '**2. Add Styles (Optional):**',
          '  - **Colors:** Use the color pickers to change the "Dot Color" (foreground) and "Background Color". **High contrast is recommended!**',
          '  - **Logo:** Click "Upload Logo" to add a small image to the center of your QR code.',
          '**3. Adjust Size:** Use the slider to change the pixel dimensions of the QR code image. Larger is better for printing.',
          '**4. Download:** Click "Download QR Code" to save a high-quality PNG image.',
        ],
      },
      {
        title: 'Tips for Better QR Codes',
        content: [
          '**Test Your Code:** Always test your QR code with multiple devices before printing it.',
          '**Maintain Contrast:** A dark foreground on a light background works best. Avoid low-contrast pairs like light gray on white.',
          '**Logo Size:** A logo should be small. If it covers too much of the code, it may become unreadable.',
          '**Quiet Zone:** This tool automatically includes a "quiet zone" (the white border) which is necessary for scanners to work.',
        ]
      }
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Custom QR Code Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Create unique QR codes with custom colors and your own logo.
        </p>
      </div>

      {/* --- QR Code Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- Controls --- */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="qrText">
                Text or URL
              </label>
              <input
                id="qrText"
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="Enter text or URL"
                className="w-full p-3 rounded-lg border bg-background"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Size: {qrSize}px
              </label>
              <input
                type="range"
                min="64"
                max="512"
                step="64"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Dot Color</label>
                <input
                  type="color"
                  value={qrFgColor}
                  onChange={(e) => setQrFgColor(e.target.value)}
                  className="w-full h-12 p-1 rounded-lg border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Background Color</label>
                <input
                  type="color"
                  value={qrBgColor}
                  onChange={(e) => setQrBgColor(e.target.value)}
                  className="w-full h-12 p-1 rounded-lg border bg-background"
                />
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
                className="w-full py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Remove Logo
              </button>
            )}

            <button
              onClick={downloadQR}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download QR Code (PNG)
            </button>
          </div>

          {/* --- Preview --- */}
          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100">
            <div
              className="p-4 rounded-lg"
              ref={qrCodeRef}
              style={{ backgroundColor: qrBgColor }} // Show background color in preview
            >
              <QRCodeSVG
                value={qrText}
                size={qrSize}
                fgColor={qrFgColor}
                bgColor={qrBgColor}
                level="H" // High error correction, best for logos
                includeMargin={true}
                imageSettings={
                  qrImage
                    ? {
                        src: qrImage,
                        x: undefined,
                        y: undefined,
                        height: qrSize * 0.2, // Logo is 20% of QR size
                        width: qrSize * 0.2,
                        excavate: true, // Cuts a hole for the logo
                      }
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* How to Use (Tutorial) */}
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
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/password-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Password Generator
          </a>
          <a href="/case-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Case Converter
          </a>
          <a href="/word-counter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Word Counter
          </a>
          <a href="/barcode-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Barcode Generator
          </a>
        </div>
      </div>
    </div>
  );
}