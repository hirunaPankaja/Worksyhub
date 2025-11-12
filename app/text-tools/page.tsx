// src/app/text-tools/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import {
  FileJson,
  Code,
  Link,
  Pilcrow,
  BookOpen,
  Clipboard,
  Check,
  AlertCircle,
} from 'lucide-react';

// Lorem Ipsum text block
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// --- NEW: A wrapper component to use Suspense ---
export default function TextToolsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TextToolsPage />
    </Suspense>
  );
}

function TextToolsPage() { // Renamed from default export
  const [activeTab, setActiveTab] = useState('json');
  const [activeTutorial, setActiveTutorial] = useState('json');

  // --- State for Tools ---
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [copiedJson, setCopiedJson] = useState(false);

  const [base64Input, setBase64Input] = useState('Hello WorksyHub!');
  const [base64Output, setBase64Output] = useState('SGVsbG8gV29ya3N5SHViIQ==');
  const [base64Error, setBase64Error] = useState('');
  const [copiedBase64, setCopiedBase64] = useState(false);

  const [urlInput, setUrlInput] = useState('https://worksyhub.online/path?q=test space');
  const [urlOutput, setUrlOutput] = useState('https%3A%2F%2Fworksyhub.online%2Fpath%3Fq%3Dtest%20space');
  const [urlError, setUrlError] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const [loremCount, setLoremCount] = useState(3);
  const [loremType, setLoremType] = useState('paragraphs');
  const [loremOutput, setLoremOutput] = useState('');
  const [copiedLorem, setCopiedLorem] = useState(false);

  // --- Tabs Definition ---
  const tabs = [
    { id: 'json', label: 'JSON Formatter', icon: FileJson },
    { id: 'base64', label: 'Base64 Encoder', icon: Code },
    { id: 'url', label: 'URL Encoder', icon: Link },
    { id: 'lorem', label: 'Lorem Ipsum', icon: Pilcrow },
  ];

  // --- NEW: This block reads the URL query ---
  const searchParams = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, tabs]); // Added tabs to dependency array
  // --- END NEW BLOCK ---

  // --- Effects ---
  useEffect(() => {
    setActiveTutorial(activeTab);
  }, [activeTab]);

  useEffect(() => {
    generateLorem();
  }, [loremCount, loremType]);

  // --- Tool Functions (Unchanged) ---

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatJson = () => {
    try {
      if (jsonInput.trim() === '') {
        setJsonError('');
        setJsonOutput('');
        return;
      }
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2); // 2-space indentation
      setJsonOutput(formatted);
      setJsonError('');
    } catch (error: any) {
      setJsonError(`Invalid JSON: ${error.message}`);
      setJsonOutput('');
    }
  };

  const minifyJson = () => {
    try {
      if (jsonInput.trim() === '') {
        setJsonError('');
        setJsonOutput('');
        return;
      }
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonOutput(minified);
      setJsonError('');
    } catch (error: any) {
      setJsonError(`Invalid JSON: ${error.message}`);
      setJsonOutput('');
    }
  };

  const encodeBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(base64Input))); // Handle UTF-8
      setBase64Output(encoded);
      setBase64Error('');
    } catch (error: any) {
      setBase64Error(`Error: ${error.message}`);
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64Input))); // Handle UTF-8
      setBase64Output(decoded);
      setBase64Error('');
    } catch (error: any) {
      setBase64Error(`Invalid Base64: ${error.message}`);
    }
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
  
  const generateLorem = () => {
    let output = '';
    const count = Number(loremCount);
    
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
      // Capitalize first letter
      output = output.charAt(0).toUpperCase() + output.slice(1) + '.';
    }
    setLoremOutput(output);
  };

  // --- Tutorials Content (Unchanged) ---
  const tutorials = {
    json: {
      title: 'JSON Formatter Guide',
      sections: [
        {
          title: 'How to Format JSON',
          content: [
            'JSON (JavaScript Object Notation) is a lightweight data-interchange format. This tool helps you validate and beautify it.',
            '**1. Input JSON:** Paste your JSON data into the left text box. It can be minified or poorly formatted.',
            '**2. Format / Minify:**',
            '  - **Format/Beautify:** Click this to parse the JSON and re-format it with standardized 2-space indentation, making it human-readable.',
            '  - **Minify:** Click this to remove all whitespace, making the JSON compact for transmission.',
            '**3. View Output:** The formatted or minified JSON will appear in the right box. You can copy it using the copy button.',
            '',
            'If your JSON is invalid, an error message will appear below the buttons, helping you debug the problem.',
          ],
        },
      ],
    },
    base64: {
      title: 'Base64 Encoder / Decoder Guide',
      sections: [
        {
          title: 'What is Base64?',
          content: [
            'Base64 is a method of encoding binary data (like images or files) into a plain text string. It is often used to embed data in URLs, HTML, or CSS.',
            '**How to Use:**',
            '**1. Input Text:** Type or paste your text into the text area.',
            '**2. Choose Action:**',
            '  - **Encode:** Converts your plain text into a Base64 string.',
            '  - **Decode:** Converts a Base64 string back into plain text.',
            '**3. Get Result:** The output will appear in the box below the buttons. Any errors (like invalid Base64) will be shown.',
            '',
            'This tool correctly handles UTF-8 characters, so you can encode any language.',
          ],
        },
      ],
    },
    url: {
      title: 'URL Encoder / Decoder Guide',
      sections: [
        {
          title: 'Why Encode URLs?',
          content: [
            'URLs can only contain a specific set of characters. Special characters (like spaces, `?`, `&`, `/`) must be converted into a "percent-encoded" format (e.g., a space becomes `%20`).',
            '**How to Use:**',
            '**1. Input Text:** Paste a full URL or just a part of a URL (like a search query) into the text area.',
            '**2. Choose Action:**',
            '  - **Encode:** Converts special characters into their percent-encoded equivalents.',
            '  - **Decode:** Converts percent-encoded characters back into their original form.',
            '**3. Get Result:** The output appears in the box below. This is useful for building links or debugging URL parameters.',
          ],
        },
      ],
    },
    lorem: {
      title: 'Lorem Ipsum Generator Guide',
      sections: [
        {
          title: 'What is Lorem Ipsum?',
          content: [
            'Lorem Ipsum is placeholder text used in design and publishing to preview layouts and visual mockups before the real content is available.',
            '**How to Use:**',
            '**1. Select Type:** Choose whether you want to generate full "Paragraphs", "Sentences", or just "Words".',
            '**2. Set Amount:** Enter the number of paragraphs, sentences, or words you need.',
            '**3. Get Text:** The placeholder text will appear in the text box below.',
            'Click the "Copy" button to grab the text for use in your design.',
          ],
        },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Text & Coding Utilities
        </h1>
        <p className="text-lg text-muted-foreground">
          Format JSON, encode/decode Base64 & URLs, and generate Lorem Ipsum
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- JSON Formatter --- */}
      {activeTab === 'json' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            JSON Formatter & Beautifier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={15}
              className="w-full p-3 rounded-lg border bg-background font-mono text-sm"
              placeholder='Paste your JSON here... e.g., {"key": "value"}'
            ></textarea>
            <div className="relative">
              <textarea
                readOnly
                value={jsonOutput}
                rows={15}
                className="w-full p-3 rounded-lg border bg-background/50 font-mono text-sm"
                placeholder="Formatted JSON output..."
              ></textarea>
              <button
                onClick={() => copyToClipboard(jsonOutput, setCopiedJson)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-background hover:bg-muted"
              >
                {copiedJson ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Clipboard className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={formatJson}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
            >
              Format / Beautify
            </button>
            <button
              onClick={minifyJson}
              className="flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80"
            >
              Minify
            </button>
            <button
              onClick={() => {
                setJsonInput('');
                setJsonOutput('');
                setJsonError('');
              }}
              className="flex-1 py-3 bg-red-600/20 text-red-600 rounded-lg font-medium hover:bg-red-600/30"
            >
              Clear
            </button>
          </div>
          {jsonError && (
            <div className="p-3 rounded-lg bg-red-600/10 text-red-600 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{jsonError}</p>
            </div>
          )}
        </div>
      )}

      {/* --- Base64 Encoder / Decoder --- */}
      {activeTab === 'base64' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Base64 Encoder / Decoder
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
      )}

      {/* --- URL Encoder / Decoder --- */}
      {activeTab === 'url' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            URL Encoder / Decoder
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
      )}

      {/* --- Lorem Ipsum Generator --- */}
      {activeTab === 'lorem' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Lorem Ipsum Generator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
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
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
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
      )}

      {/* --- NEW: Tutorials Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Tutorials & Guides</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-semibold mb-3 text-lg">Select Tutorial:</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTutorial(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all border ${
                  activeTutorial === tab.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {tutorials[activeTab as keyof typeof tutorials]?.title}
              </h3>
              
              <div className="space-y-6">
                {tutorials[activeTab as keyof typeof tutorials]?.sections?.map((section: any, sectionIndex: number) => (
                  <div key={sectionIndex} className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                      {section.title}
                    </h4>
                    
                    <div className="prose prose-lg max-w-none text-foreground">
                      {section.content.map((line: string, lineIndex: number) => (
                        <div key={lineIndex} className="mb-3">
                          {line.startsWith('**') && line.endsWith('**') ? (
                            <strong className="text-foreground text-lg">{line.slice(2, -2)}</strong>
                          ) : line.startsWith('  -') ? (
                              <span className="ml-4">{line}</span>
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 text-blue-800">Pro Tip</h4>
              <p className="text-blue-700">
                {activeTutorial === 'json' &&
                  'Use the error message! It often tells you the exact line and character where your JSON is broken.'}
                {activeTutorial === 'base64' &&
                  'Base64 text always uses a specific set of 64 characters (A-Z, a-z, 0-9, +, /) and may end with one or two `=` as padding.'}
                {activeTutorial === 'url' &&
                  'Use "Encode" for query parameters (e.g., a search term with spaces) but not for the whole URL (which would break the `http://`).'}
                {activeTutorial === 'lorem' &&
                  'Generating 2-3 paragraphs of Lorem Ipsum is perfect for quickly filling a webpage mockup to check typography and layout.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* --- END NEW TUTORIALS SECTION --- */}


      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Need More Tools?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a
            href="/productivity-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Productivity Tools
          </a>
          <a
            href="/design-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Design Tools
          </a>
          <a
            href="/lifestyle-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Lifestyle Tools
          </a>
          <a
            href="/"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}