// src/app/url-encoder-decoder/page.tsx
'use client';

import { useState } from 'react';
import {
  Link,
  BookOpen,
  Clipboard,
  Check,
  AlertCircle,
  Table,
} from 'lucide-react';

export default function UrlEncoderDecoderPage() {
  const [urlInput, setUrlInput] = useState('https://worksyhub.online/path?q=test space');
  const [urlOutput, setUrlOutput] = useState('https%3A%2F%2Fworksyhub.online%2Fpath%3Fq%3Dtest%20space');
  const [urlError, setUrlError] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodeUrl = () => {
    try {
      const encoded = encodeURIComponent(urlInput);
      setUrlOutput(encoded);
      setUrlError('');
    } catch (error: any) {
      setUrlError(`Error: ${error.message}`);
    }
  };

  const decodeUrl = () => {
    try {
      const decoded = decodeURIComponent(urlInput);
      setUrlOutput(decoded);
      setUrlError('');
    } catch (error: any) {
      setUrlError(`Invalid URL encoding: ${error.message}`);
    }
  };

  const tutorial = {
    title: 'URL Encoder / Decoder Guide',
    sections: [
      {
        title: 'How to Use',
        content: [
          '**1. Input Text:** Paste a full URL or just a part of a URL (like a search query) into the top text area.',
          '**2. Choose Action:**',
          '  - **Encode:** Converts special characters into their percent-encoded equivalents.',
          '  - **Decode:** Converts percent-encoded characters back into their original form.',
          '**3. Get Result:** The output appears in the box below. This is useful for building links or debugging URL parameters.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          URL Encoder / Decoder
        </h1>
        <p className="text-lg text-muted-foreground">
          Encode and decode text for safe use in URLs.
        </p>
      </div>

      {/* --- URL Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          URL Converter
        </h2>
        <textarea
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          rows={8}
          className="w-full p-3 rounded-lg border bg-background font-mono text-sm"
          placeholder="Type text or URL to encode/decode..."
        ></textarea>
        <div className="flex gap-3">
          <button
            onClick={encodeUrl}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Encode
          </button>
          <button
            onClick={decodeUrl}
            className="flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80"
          >
            Decode
          </button>
        </div>
        <div className="relative">
          <textarea
            readOnly
            value={urlOutput}
            rows={8}
            className="w-full p-3 rounded-lg border bg-background/50 font-mono text-sm"
            placeholder="Output..."
          ></textarea>
          <button
            onClick={() => copyToClipboard(urlOutput, setCopiedUrl)}
            className="absolute top-3 right-3 p-2 rounded-lg bg-background hover:bg-muted"
          >
            {copiedUrl ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Clipboard className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        {urlError && (
          <div className="p-3 rounded-lg bg-red-600/10 text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{urlError}</p>
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

        {/* --- What is URL Encoding? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Link className="h-6 w-6 text-primary" />
            What is URL Encoding (Percent-Encoding)?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>A URL (Uniform Resource Locator) can only be sent over the internet using the ASCII character set. Because URLs often contain characters outside this set (like spaces, `+`, or `/`), they must be "translated" into a valid format.</p>
            <p>**Percent-encoding** is the mechanism for this. It works by replacing unsafe characters with a `%` symbol followed by two hexadecimal digits that represent the character's ASCII value.</p>
            
            <h3 className="text-xl font-semibold mt-6">Example:</h3>
            <p>If you want to send the search query `blue shirt` in a URL, you cannot have a space. The browser will encode it.</p>
            <ul className="list-none">
              <li>**Original:** `https://example.com/search?q=blue shirt`</li>
              <li>**Encoded:** `https://example.com/search?q=blue%20shirt`</li>
            </ul>
            <p>This tool allows you to manually encode or decode these values, which is extremely useful for developers testing APIs or building links.</p>
          </div>
        </div>
        
        {/* --- Common Characters Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Table className="h-6 w-6 text-primary" />
            Common Characters & Their Encodings
          </h2>
          <p className="text-muted-foreground mb-4">While `encodeURIComponent` handles many characters, here are the most common ones you'll see.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Character</th>
                  <th className="p-3 border border-border">Encoded Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold font-mono"> (space)</td>
                  <td className="p-3 border border-border font-mono">%20</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold font-mono">/</td>
                  <td className="p-3 border border-border font-mono">%2F</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold font-mono">?</td>
                  <td className="p-3 border border-border font-mono">%3F</td>
                </tr>
                 <tr>
                  <td className="p-3 border border-border font-semibold font-mono">&</td>
                  <td className="p-3 border border-border font-mono">%26</td>
                </tr>
                 <tr>
                  <td className="p-3 border border-border font-semibold font-mono">=</td>
                  <td className="p-3 border border-border font-mono">%3D</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold font-mono">:</td>
                  <td className="p-3 border border-border font-mono">%3A</td>
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
          <a href="/base64-encoder-decoder" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Base64 Encoder/Decoder
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