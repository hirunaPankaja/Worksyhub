// src/app/json-formatter/page.tsx
'use client';

import { useState } from 'react';
import {
  FileJson,
  BookOpen,
  Clipboard,
  Check,
  AlertCircle,
  Table,
} from 'lucide-react';

export default function JsonFormatterPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [copiedJson, setCopiedJson] = useState(false);

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
  
  const tutorial = {
    title: 'JSON Formatter Guide',
    sections: [
      {
        title: 'How to Format JSON',
        content: [
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
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          JSON Formatter & Validator
        </h1>
        <p className="text-lg text-muted-foreground">
          Validate, beautify, and minify your JSON data instantly.
        </p>
      </div>

      {/* --- JSON Formatter Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          JSON Editor
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

        {/* --- What is JSON? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileJson className="h-6 w-6 text-primary" />
            What is JSON?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>JSON stands for **JavaScript Object Notation**. It is a lightweight, text-based data format that is easy for humans to read and write, and easy for machines to parse and generate.</p>
            <p>It is the most common format used for transmitting data between a server and a web application (like in an API), replacing older formats like XML.</p>
            <h3 className="text-xl font-semibold mt-4">Key Concepts:</h3>
            <ul className="list-disc pl-5">
              <li>Data is in **key/value pairs** (e.g., `"name": "John"`).</li>
              <li>Data is separated by commas.</li>
              <li>Curly braces `{}` hold **objects** (collections of key/value pairs).</li>
              <li>Square brackets `[]` hold **arrays** (lists of values).</li>
              <li>**Keys** must be strings in double quotes.</li>
            </ul>
          </div>
        </div>
        
        {/* --- Common Errors Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Table className="h-6 w-6 text-primary" />
            Common JSON Errors
          </h2>
          <p className="text-muted-foreground mb-4">This tool also acts as a validator. It will catch common errors like these:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Error Type</th>
                  <th className="p-3 border border-border">Example</th>
                  <th className="p-3 border border-border">How to Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Trailing Comma</td>
                  <td className="p-3 border border-border font-mono">{`{"name": "John", "age": 30,}`}</td>
                  <td className="p-3 border border-border">Remove the final comma after the last value.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Single Quotes</td>
                  <td className="p-3 border border-border font-mono">{`{'name': 'John'}`}</td>
                  <td className="p-3 border border-border">JSON keys and string values **must** use double quotes (`"`).</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Unquoted Keys</td>
                  <td className="p-3 border border-border font-mono">{`{name: "John"}`}</td>
                  <td className="p-3 border border-border">All keys must be wrapped in double quotes (e.g., `"name"`).</td>
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
          <a href="/base64-encoder-decoder" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Base64 Encoder/Decoder
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