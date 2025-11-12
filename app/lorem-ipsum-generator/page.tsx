// src/app/lorem-ipsum-generator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Pilcrow,
  BookOpen,
  Clipboard,
  Check,
  History,
  FileText,
} from 'lucide-react';

// Lorem Ipsum text block
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default function LoremIpsumPage() {
  const [loremCount, setLoremCount] = useState(3);
  const [loremType, setLoremType] = useState('paragraphs');
  const [loremOutput, setLoremOutput] = useState('');
  const [copiedLorem, setCopiedLorem] = useState(false);

  useEffect(() => {
    generateLorem();
  }, [loremCount, loremType]);

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const generateLorem = () => {
    let output = '';
    const count = Number(loremCount);
    
    if (count <= 0) {
      setLoremOutput('');
      return;
    }
    
    if (loremType === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        output += LOREM_IPSUM_TEXT + (i < count - 1 ? '\n\n' : '');
      }
    } else if (loremType === 'sentences') {
      const sentences = LOREM_IPSUM_TEXT.split('. ').map(s => s.endsWith('.') ? s : s + '.');
      for (let i = 0; i < count; i++) {
        output += sentences[i % sentences.length] + (i < count - 1 ? ' ' : '');
      }
    } else if (loremType === 'words') {
      const words = LOREM_IPSUM_TEXT.replace(/[.,]/g, '').toLowerCase().split(' ');
      for (let i = 0; i < count; i++) {
        output += words[i % words.length] + (i < count - 1 ? ' ' : '');
      }
      // Capitalize first letter and add a period.
      output = output.charAt(0).toUpperCase() + output.slice(1) + '.';
    }
    setLoremOutput(output);
  };

  const tutorial = {
    title: 'How to Use the Lorem Ipsum Generator',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Select Type:** Choose whether you want to generate full "Paragraphs", "Sentences", or just "Words".',
          '**2. Set Amount:** Enter the number of paragraphs, sentences, or words you need.',
          '**3. Get Text:** The placeholder text will appear in the text box below.',
          '**4. Copy:** Click the "Copy" button in the top-right of the text box to grab the text for your project.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Lorem Ipsum Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Generate placeholder text in paragraphs, sentences, or words.
        </p>
      </div>

      {/* --- Lorem Ipsum Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Generate Placeholder Text
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="loremType">Type</label>
            <select
              id="loremType"
              value={loremType}
              onChange={(e) => setLoremType(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="loremCount">Amount</label>
            <input
              id="loremCount"
              type="number"
              min="1"
              max="100"
              value={loremCount}
              onChange={(e) => setLoremCount(Number(e.target.value))}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>
        </div>
        <div className="relative">
          <textarea
            readOnly
            value={loremOutput}
            rows={10}
            className="w-full p-3 rounded-lg border bg-background/50"
            placeholder="Generated text will appear here..."
          ></textarea>
          <button
            onClick={() => copyToClipboard(loremOutput, setCopiedLorem)}
            className="absolute top-3 right-3 p-2 rounded-lg bg-background hover:bg-muted"
          >
            {copiedLorem ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Clipboard className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
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

        {/* --- What is Lorem Ipsum? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            What is Lorem Ipsum?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>**Lorem Ipsum** is the standard placeholder text (also known as "dummy text" or "filler text") used in the graphic design, print, and web industries. It's used to fill a space where real content will eventually go.</p>
            <p>The text itself is a scrambled version of a Latin passage from "de Finibus Bonorum et Malorum" (On the Extremes of Good and Evil), a work of philosophy by Cicero from 45 BC. It is intentionally nonsensical so that viewers focus on the **design and layout** rather than being distracted by readable content.</p>
            
            <h3 className="text-xl font-semibold mt-6">Why Use It?</h3>
            <ul className="list-disc pl-5">
              <li>It has a normal-looking distribution of letters, as opposed to just copy-pasting "text here text here".</li>
              <li>It allows designers to test typography (fonts, font sizes, line height) without the bias of meaningful content.</li>
              <li>It helps clients visualize how their final website or document will look.</li>
            </ul>
          </div>
        </div>
        
        {/* --- Common Use Cases Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Common Use Cases
          </h2>
          <p className="text-muted-foreground mb-4">You can generate text in three different formats depending on your needs.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Format</th>
                  <th className="p-3 border border-border">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Paragraphs</td>
                  <td className="p-3 border border-border">The most common use. Perfect for filling out the main body of a webpage, document, or newsletter.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Sentences</td>
                  <td className="p-3 border border-border">Useful for short descriptions, captions, or testing how text flows around an image.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Words</td>
                  <td className="p-3 border border-border">Ideal for creating headlines, titles, or navigation menu items to check spacing.</td>
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
          <a href="/url-encoder-decoder" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            URL Encoder/Decoder
          </a>
          <a href="/password-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Password Generator
          </a>
        </div>
      </div>
    </div>
  );
}