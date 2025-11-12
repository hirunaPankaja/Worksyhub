// src/app/case-converter/page.tsx
'use client';

import { useState } from 'react';
import {
  CaseSensitive,
  BookOpen,
  Clipboard,
  Check,
  RefreshCw,
  Trash2,
} from 'lucide-react';

export default function CaseConverterPage() {
  const [caseText, setCaseText] = useState('This is an Example Sentence.');
  const [copiedCase, setCopiedCase] = useState(false);

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertCase = (type: string) => {
    switch (type) {
      case 'upper':
        setCaseText(caseText.toUpperCase());
        break;
      case 'lower':
        setCaseText(caseText.toLowerCase());
        break;
      case 'title':
        setCaseText(
          caseText
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
        );
        break;
      case 'sentence':
        setCaseText(
          caseText
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        );
        break;
      case 'clear':
        setCaseText('');
        break;
    }
  };

  const tutorials = {
    title: 'How to Use the Text Case Converter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Input Text:** Paste or type your text into the large text area.',
          '**2. Choose Conversion:** Click one of the buttons to convert your text to the desired case.',
          '**3. Copy or Clear:** Use the "Copy" button to grab the converted text. Use "Clear" to empty the text area and start over.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Text Case Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert text to UPPERCASE, lowercase, Title Case, and more.
        </p>
      </div>

      {/* --- Case Converter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Convert Your Text
        </h2>
        
        <div className="relative">
          <textarea
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            rows={10}
            className="w-full p-3 rounded-lg border bg-background"
            placeholder="Type or paste your text here..."
          ></textarea>
          <button
            onClick={() => copyToClipboard(caseText, setCopiedCase)}
            className="absolute top-3 right-3 p-2 rounded-lg bg-background hover:bg-muted"
          >
            {copiedCase ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Clipboard className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => convertCase('upper')}
            className="py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => convertCase('lower')}
            className="py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80"
          >
            lowercase
          </button>
          <button
            onClick={() => convertCase('title')}
            className="py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80"
          >
            Title Case
          </button>
          <button
            onClick={() => convertCase('sentence')}
            className="py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80"
          >
            Sentence case
          </button>
          <button
            onClick={() => convertCase('clear')}
            className="py-3 bg-red-600/20 text-red-600 rounded-lg font-medium hover:bg-red-600/30 col-span-2 lg:col-span-1"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Tool
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

        {/* --- Case Examples Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CaseSensitive className="h-6 w-6 text-primary" />
            Case Conversion Examples
          </h2>
          <p className="text-muted-foreground mb-4">Here is a quick reference for what each case type does.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Case Type</th>
                  <th className="p-3 border border-border">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">UPPERCASE</td>
                  <td className="p-3 border border-border font-mono">THIS IS AN EXAMPLE.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">lowercase</td>
                  <td className="p-3 border border-border font-mono">this is an example.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Title Case</td>
                  <td className="p-3 border border-border font-mono">This Is An Example.</td>
                </tr>
                 <tr>
                  <td className="p-3 border border-border font-semibold">Sentence case</td>
                  <td className="p-3 border border-border font-mono">This is an example.</td>
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