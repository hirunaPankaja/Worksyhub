// src/app/productivity-tools/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import {
  KeyRound,
  QrCode,
  CaseSensitive,
  ListOrdered,
  BookOpen,
  Clipboard,
  Check,
  Download,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; // Changed from default import to named import

// --- NEW: A wrapper component to use Suspense ---
export default function ProductivityToolsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductivityToolsPage />
    </Suspense>
  );
}

function ProductivityToolsPage() { // Renamed from default export
  const [activeTab, setActiveTab] = useState('password');
  const [activeTutorial, setActiveTutorial] = useState('password');

  // --- State for Tools ---
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copiedPass, setCopiedPass] = useState(false);

  const [qrText, setQrText] = useState('https://worksyhub.online');
  const [qrSize, setQrSize] = useState(256);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const [caseText, setCaseText] = useState('');
  const [copiedCase, setCopiedCase] = useState(false);

  const [counterText, setCounterText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // --- Tabs Definition ---
  const tabs = [
    { id: 'password', label: 'Password Generator', icon: KeyRound },
    { id: 'qr', label: 'QR Code Generator', icon: QrCode },
    { id: 'case', label: 'Case Converter', icon: CaseSensitive },
    { id: 'counter', label: 'Word Counter', icon: ListOrdered },
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
    generatePassword();
  }, [passwordLength, includeUppercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    // Word Count
    const words = counterText.split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
    // Character Count
    setCharCount(counterText.length);
  }, [counterText]);

  // --- Tool Functions ---

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let charset = lower;

    if (includeUppercase) charset += upper;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    setCopiedPass(false);
  };

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = qrCodeRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return; // Guard against null context
      
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'worksyhub-qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
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

  // --- Tutorials Content ---
  const tutorials = {
    password: {
      title: 'Password Generator Guide',
      sections: [
        {
          title: 'How to Create a Secure Password',
          content: [
            'A strong password is your first line of defense against unauthorized access.',
            '**1. Adjust Length:** Use the slider to select a password length. Longer passwords (16+ characters) are exponentially more secure.',
            '**2. Select Options:**',
            '  - **Uppercase (A-Z):** Include capital letters to increase complexity.',
            '  - **Numbers (0-9):** Add numerical digits.',
            '  - **Symbols (!@#$...):** Add special characters. This adds the most security.',
            '**3. Generate & Copy:**',
            'The password updates automatically. Click the "Generate" button for a new one, and use the copy button to safely copy it to your clipboard.',
            '',
            'This tool is 100% client-side. Your passwords are never sent to our server.',
          ],
        },
      ],
    },
    qr: {
      title: 'QR Code Generator Guide',
      sections: [
        {
          title: 'How to Create a QR Code',
          content: [
            'QR (Quick Response) codes store information like website URLs, text, or Wi-Fi passwords in a scannable 2D barcode.',
            '**1. Enter Data:** Type or paste the text you want to encode into the text box (e.g., a URL, email address, or simple text).',
            '**2. Adjust Size:** Use the slider to change the pixel dimensions of the QR code image. Larger is better for printing.',
            '**3. Download:**',
            'Click the "Download QR Code" button to save a high-quality PNG image of your code to your device.',
            '',
            'All generation happens in your browser, making it fast and private. The QR code works offline.',
          ],
        },
      ],
    },
    case: {
      title: 'Text Case Converter Guide',
      sections: [
        {
          title: 'How to Convert Text Case',
          content: [
            'Easily clean up and format your text for different needs.',
            '**1. Input Text:** Paste or type your text into the large text area.',
            '**2. Choose Conversion:**',
            '  - **UPPERCASE:** Converts all text to capital letters.',
            '  - **lowercase:** Converts all text to small letters.',
            '  - **Title Case:** Capitalizes the first letter of every word.',
            '  - **Sentence case:** Capitalizes the first letter of each sentence.',
            '**3. Copy or Clear:**',
            'Use the "Copy" button to grab the converted text. Use "Clear" to empty the text area.',
          ],
        },
      ],
    },
    counter: {
      title: 'Word & Character Counter Guide',
      sections: [
        {
          title: 'How to Count Words and Characters',
          content: [
            'This tool provides a real-time count of words and characters as you type.',
            '**1. Input Text:** Simply paste or start typing in the text area.',
            '**2. View Real-time Counts:**',
            'The "Word Count" and "Character Count" numbers above the text box will update instantly.',
            '',
            '**How it works:**',
            '  - **Character Count:** Includes all characters, including spaces and punctuation.',
            '  - **Word Count:** Counts groups of characters separated by a space.',
            'This is perfect for essays, social media posts (like Twitter/X), or any writing where length is important.',
          ],
        },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Productivity Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Generate passwords, create QR codes, convert text, and count words
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

      {/* --- Password Generator --- */}
      {activeTab === 'password' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Secure Password Generator
          </h2>
          <div className="p-4 rounded-lg bg-muted flex items-center gap-4">
            <input
              type="text"
              readOnly
              value={password}
              className="flex-1 text-2xl font-mono bg-transparent border-none outline-none text-foreground"
            />
            <button
              onClick={() => copyToClipboard(password, setCopiedPass)}
              className="p-2 rounded-lg bg-background hover:bg-background/80"
            >
              {copiedPass ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Clipboard className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Password Length: {passwordLength}
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 p-3 rounded-lg bg-background border cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 text-primary"
                />
                Uppercase (A-Z)
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg bg-background border cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 text-primary"
                />
                Numbers (0-9)
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg bg-background border cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 text-primary"
                />
                Symbols (!@#$)
              </label>
            </div>
          </div>
          <button
            onClick={generatePassword}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
          >
            Generate New Password
          </button>
        </div>
      )}

      {/* --- QR Code Generator --- */}
      {activeTab === 'qr' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            QR Code Generator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Text or URL
                </label>
                <input
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
              <button
                onClick={downloadQR}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download QR Code
              </button>
            </div>
            <div
              className="p-4 rounded-lg bg-white flex items-center justify-center"
              ref={qrCodeRef}
            >
              <QRCodeSVG
                value={qrText}
                size={qrSize}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* --- Case Converter --- */}
      {activeTab === 'case' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Text Case Converter
          </h2>
          <textarea
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            rows={10}
            className="w-full p-3 rounded-lg border bg-background"
            placeholder="Type or paste your text here..."
          ></textarea>
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
              className="py-3 bg-red-600/20 text-red-600 rounded-lg font-medium hover:bg-red-600/30"
            >
              Clear
            </button>
          </div>
          <button
            onClick={() => copyToClipboard(caseText, setCopiedCase)}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            {copiedCase ? (
              <Check className="h-5 w-5" />
            ) : (
              <Clipboard className="h-5 w-5" />
            )}
            Copy to Clipboard
          </button>
        </div>
      )}

      {/* --- Word Counter --- */}
      {activeTab === 'counter' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Word & Character Counter
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
          <textarea
            value={counterText}
            onChange={(e) => setCounterText(e.target.value)}
            rows={10}
            className="w-full p-3 rounded-lg border bg-background"
            placeholder="Type or paste your text here to count..."
          ></textarea>
          <button
            onClick={() => setCounterText('')}
            className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-all"
          >
            Clear Text
          </button>
        </div>
      )}

      {/* --- Tutorials Section --- */}
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
                {tutorials[activeTutorial as keyof typeof tutorials]?.title}
              </h3>
              <div className="space-y-6">
                {/* ===> FIXED: Added types and keys <=== */}
                {tutorials[activeTutorial as keyof typeof tutorials]?.sections?.map(
                  (section: { title: string; content: string[] }, sectionIndex: number) => (
                    <div key={sectionIndex} className="space-y-4">
                      <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                        {section.title}
                      </h4>
                      <div className="prose prose-lg max-w-none text-foreground">
                        {section.content.map((line: string, lineIndex: number) => (
                          <p
                            key={lineIndex}
                            className="text-foreground leading-relaxed"
                          >
                            {line.startsWith('**') ? (
                              <strong>{line.replace(/\*\*/g, '')}</strong>
                            ) : line.startsWith('  -') ? (
                              <span className="ml-4">{line}</span>
                            ) : line === '' ? (
                              <br />
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 dark:bg-blue-950/50 dark:border-blue-800">
              <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-300">Pro Tip</h4>
              <p className="text-blue-700 dark:text-blue-300">
                {activeTutorial === 'password' &&
                  'For maximum security, use a password length of 20 or more and include all character types.'}
                {activeTutorial === 'qr' &&
                  'The "H" (High) error correction level is selected by default, ensuring your QR code is scannable even if part of it is damaged.'}
                {activeTutorial === 'case' &&
                  'Use "Sentence case" to quickly fix text pasted in all caps, automatically capitalizing the start of sentences.'}
                {activeTutorial === 'counter' &&
                  'This tool is perfect for checking tweet lengths (280 chars) or meta descriptions for SEO (160 chars).'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Need More Tools?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a
            href="/time-converter" // Corrected path
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Time/Date Tools
          </a>
          <a
            href="/clock-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Clock & Timer
          </a>
          <a
            href="/design-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Design Tools
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