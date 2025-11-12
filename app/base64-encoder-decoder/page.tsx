// src/app/base64-encoder-decoder/page.tsx
'use client';

import { useState } from 'react';
import {
  Code,
  BookOpen,
  Clipboard,
  Check,
  AlertCircle,
  Table,
  Image,
} from 'lucide-react';

export default function Base64Page() {
  const [base64Input, setBase64Input] = useState('Hello WorksyHub!');
  const [base64Output, setBase64Output] = useState('SGVsbG8gV29ya3N5SHViIQ==');
  const [base64Error, setBase64Error] = useState('');
  const [copiedBase64, setCopiedBase64] = useState(false);

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodeBase64 = () => {
    try {
      // Robust UTF-8 handling
      const text = new TextEncoder().encode(base64Input);
      const binaryString = Array.from(text, (byte) => String.fromCharCode(byte)).join('');
      const encoded = btoa(binaryString);
      setBase64Output(encoded);
      setBase64Error('');
    } catch (error: any) {
      setBase64Error(`Error: ${error.message}`);
    }
  };

  const decodeBase64 = () => {
    try {
      // Robust UTF-8 handling
      const binaryString = atob(base64Input);
      const bytes = Uint8Array.from(binaryString, (m) => m.charCodeAt(0));
      const decoded = new TextDecoder().decode(bytes);
      setBase64Output(decoded);
      setBase64Error('');
    } catch (error: any) {
      setBase64Error(`Invalid Base64: ${error.message}`);
    }
  };

  const tutorial = {
    title: 'Base64 Encoder / Decoder Guide',
    sections: [
      {
        title: 'How to Use',
        content: [
          '**1. Input Text:** Type or paste your text (or Base64 code) into the top text area.',
          '**2. Choose Action:**',
          '  - **Encode:** Converts your plain text into a Base64 string.',
          '  - **Decode:** Converts a Base64 string back into plain text.',
          '**3. Get Result:** The output will appear in the bottom box. Any errors (like invalid Base64) will be shown.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Base64 Encoder / Decoder
        </h1>
        <p className="text-lg text-muted-foreground">
          Encode text to Base64 or decode Base64 to text with UTF-8 support.
        </p>
      </div>

      {/* --- Base64 Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Base64 Converter
        </h2>
        <textarea
          value={base64Input}
          onChange={(e) => setBase64Input(e.target.value)}
          rows={8}
          className="w-full p-3 rounded-lg border bg-background font-mono text-sm"
          placeholder="Type text or Base64 to encode/decode..."
        ></textarea>
        <div className="flex gap-3">
          <button
            onClick={encodeBase64}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Encode (to Base64)
          </button>
          <button
            onClick={decodeBase64}
            className="flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80"
          >
            Decode (from Base64)
          </button>
        </div>
        <div className="relative">
          <textarea
            readOnly
            value={base64Output}
            rows={8}
            className="w-full p-3 rounded-lg border bg-background/50 font-mono text-sm"
            placeholder="Output..."
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
        {base64Error && (
          <div className="p-3 rounded-lg bg-red-600/10 text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{base64Error}</p>
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

        {/* --- What is Base64? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            What is Base64?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Base64 is a text-based encoding scheme that converts binary data (like images, files, or non-English characters) into a string of plain ASCII characters. This string is safe to transmit over systems that are designed to handle only text.</p>
            <p>It's called "Base64" because it uses a set of 64 standard characters (A-Z, a-z, 0-9, +, and /) to represent the data.</p>
            
            <h3 className="text-xl font-semibold mt-6">Common Uses for Base64</h3>
            <ul className="list-disc pl-5">
              <li><strong>Embedding Images:</strong> You can embed an image directly into HTML or CSS using a Base64 "Data URL", which saves a network request.</li>
              <li><strong>Email Attachments:</strong> Base64 is used to encode binary files (like PDFs or images) so they can be sent as part of the plain text body of an email.</li>
              <li><strong>Data Transmission:</strong> It's used in APIs and JSON files to safely include complex data within a simple text field.</li>
            </ul>
          </div>
        </div>
        
        {/* --- Character Set Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Table className="h-6 w-6 text-primary" />
            Base64 Character Set
          </h2>
          <p className="text-muted-foreground mb-4">The 64 characters (plus padding) used in standard Base64 encoding are:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Type</th>
                  <th className="p-3 border border-border">Characters</th>
                  <th className="p-3 border border-border">Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Uppercase Letters</td>
                  <td className="p-3 border border-border font-mono">A-Z</td>
                  <td className="p-3 border border-border">0-25</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Lowercase Letters</td>
                  <td className="p-3 border border-border font-mono">a-z</td>
                  <td className="p-3 border border-border">26-51</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Numbers</td>
                  <td className="p-3 border border-border font-mono">0-9</td>
                  <td className="p-3 border border-border">52-61</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Symbols</td>
                  <td className="p-3 border border-border font-mono">+ /</td>
                  <td className="p-3 border border-border">62 and 63</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Padding</td>
                  <td className="p-3 border border-border font-mono">=</td>
                  <td className="p-3 border border-border">Used at the end to ensure the string is a multiple of 4.</td>
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
          <a href="/json-formatter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            JSON Formatter
          </a>
          <a href="/url-encoder-decoder" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            URL Encoder/Decoder
          </a>
          <a href="/lorem-ipsum-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Lorem Ipsum Generator
          </a>
          <a href="/password-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Password Generator
          </a>
        </div>
      </div>
    </div>
  );
}