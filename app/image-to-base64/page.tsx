// src/app/image-to-base64/page.tsx
'use client';

import { useState } from 'react';
import { Code, BookOpen, Clipboard, Check, Image, Shield } from 'lucide-react';

export default function ImageToBase64Page() {
  const [base64File, setBase64File] = useState<File | null>(null);
  const [base64Output, setBase64Output] = useState('');
  const [copiedBase64, setCopiedBase64] = useState(false);

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBase64FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBase64File(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setBase64Output(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const tutorial = {
    title: 'How to Convert an Image to Base64',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Upload Image:** Click "Choose File" and select an image (PNG, JPG, SVG, etc.).',
          '**2. Get Code:** The Base64 Data URL will instantly appear in the text box.',
          '**3. Copy:** Click the copy button in the top-right corner to copy the full Base64 string to your clipboard.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Image to Base64 Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert your image to a Base64 data URL. 100% private and client-side.
        </p>
      </div>

      {/* --- Image to Base64 Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Image to Base64
        </h2>
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBase64FileChange}
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>
        {base64Output && (
          <div className="relative">
            <textarea
              readOnly
              value={base64Output}
              rows={10}
              className="w-full p-3 rounded-lg border bg-background/50 font-mono text-sm"
              placeholder="Base64 Data URL will appear here..."
            ></textarea>
            <button
              onClick={() => copyToClipboard(base64Output, setCopiedBase64)}
              className="absolute top-3 right-3 p-2 rounded-lg bg-background hover:bg-muted"
            >
              {copiedBase64 ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Clipboard className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* --- Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Tool
          </h2>
          <div className="space-y-6">
            {tutorial.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line, lineIndex) => (
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

        {/* --- What is Image Base64? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Image className="h-6 w-6 text-primary" />
            What is an Image to Base64 Converter?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Base64 is a method to convert binary data (like an image) into a string of plain text. This tool instantly reads your image file and converts it into a **Data URL**.</p>
            <p>A Data URL looks like this:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>data:image/png;base64,iVBORw0KGgo...</code>
            </pre>
            <p>This long string of text is **the entire image**, which you can now embed directly into HTML or CSS code.</p>
          </div>
        </div>
        
        {/* --- Pros and Cons Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Pros & Cons of Using Base64 Images
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Pros (When to use it)</th>
                  <th className="p-3 border border-border">Cons (When to avoid it)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border">Reduces HTTP requests (no separate file to load).</td>
                  <td className="p-3 border border-border">Base64 strings are ~33% larger than the original image file.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">Embeds images directly in HTML/CSS, which is great for small icons or logos.</td>
                  <td className="p-3 border border-border">The browser cannot cache the image separately.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">Prevents images from being blocked by some ad-blockers.</td>
                  <td className="p-3 border border-border">Not good for large images (e.g., photos), as it makes the HTML/CSS file huge.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Privacy --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Your Privacy is Guaranteed
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>This tool is 100% client-side. Your image is **never uploaded to our server**. All conversion happens in your browser, so your files remain completely private.</p>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/image-resizer" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Image Resizer
          </a>
          <a href="/image-cropper" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Image Cropper
          </a>
          <a href="/pdf-merger" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            PDF Merger
          </a>
          <a href="/" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}