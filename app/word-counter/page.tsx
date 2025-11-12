// src/app/word-counter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  ListOrdered,
  BookOpen,
  Clipboard,
  Check,
  RefreshCw,
  Trash2,
  FileText,
  Twitter,
} from 'lucide-react';

export default function WordCounterPage() {
  const [counterText, setCounterText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Word Count: Splits by one or more whitespace characters
    const words = counterText.split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length === 1 && words[0] === '' ? 0 : words.length);
    
    // Character Count: All characters
    setCharCount(counterText.length);
  }, [counterText]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(counterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const clearText = () => {
    setCounterText('');
  };

  const tutorials = {
    title: 'How to Use the Word & Character Counter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Input Text:** Simply paste or start typing in the text area.',
          '**2. View Real-time Counts:** The "Word Count" and "Character Count" numbers above the text box will update instantly as you type.',
          '**3. Copy or Clear:** Use the "Copy" button to grab your text. Use "Clear Text" to empty the text area and start over.',
          '',
          '**How it works:**',
          '  - **Character Count:** Includes all characters, including spaces and punctuation.',
          '  - **Word Count:** Counts groups of characters separated by a space (or a new line).',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Word & Character Counter
        </h1>
        <p className="text-lg text-muted-foreground">
          Instantly count your words and characters in real-time.
        </p>
      </div>

      {/* --- Word Counter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Text Analyzer
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted text-center">
            <p className="text-sm text-muted-foreground mb-1">Word Count</p>
            <p className="text-3xl font-bold text-foreground">{wordCount}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Character Count
            </p>
            <p className="text-3xl font-bold text-foreground">{charCount}</p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={counterText}
            onChange={(e) => setCounterText(e.target.value)}
            rows={12}
            className="w-full p-3 rounded-lg border bg-background"
            placeholder="Type or paste your text here to count..."
          ></textarea>
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 p-2 rounded-lg bg-background hover:bg-muted"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Clipboard className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        
        <button
          onClick={clearText}
          className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear Text
        </button>
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

        {/* --- Why Use a Word Counter? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Why is a Word Counter Useful?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Word and character counts are crucial for any type of writing where length and brevity are important. This tool is perfect for:</p>
            <ul>
              <li><strong>Students:</strong> Meeting the word count requirements for essays and assignments.</li>
              <li><strong>Writers & Bloggers:</strong> Crafting articles that meet specific lengths for readability or SEO.</li>
              <li><strong>Social Media Managers:</strong> Ensuring posts fit within the character limits of platforms like X (Twitter).</li>
              <li>**SEO Specialists:** Writing meta descriptions and title tags that are within Google's recommended length.</li>
            </ul>
          </div>
        </div>
        
        {/* --- Common Character Limits Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Common Character & Word Limits
          </h2>
          <p className="text-muted-foreground mb-4">Here is a quick reference for common length restrictions on the web.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Platform / Use Case</th>
                  <th className="p-3 border border-border">Recommended Limit</th>
                  <th className="p-3 border border-border">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">X (Twitter) Post</td>
                  <td className="p-3 border border-border">280 Characters</td>
                  <td className="p-3 border border-border">Character</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Google Title Tag</td>
                  <td className="p-3 border border-border">~ 60 Characters</td>
                  <td className="p-3 border border-border">Character</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Google Meta Description</td>
                  <td className="p-3 border border-border">~ 160 Characters</td>
                  <td className="p-3 border border-border">Character</td>
                </tr>
                 <tr>
                  <td className="p-3 border border-border font-semibold">Blog Post (Readability)</td>
                  <td className="p-3 border border-border">300-500 Words</td>
                  <td className="p-3 border border-border">Word</td>
                </tr>
                 <tr>
                  <td className="p-3 border border-border font-semibold">Email Subject Line</td>
                  <td className="p-3 border border-border">~ 40 Characters</td>
                  <td className="p-3 border border-border">Character</td>
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
          <a href="/barcode-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Barcode Generator
          </a>
        </div>
      </div>
    </div>
  );
}