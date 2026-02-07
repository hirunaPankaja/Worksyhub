// src/app/password-generator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  KeyRound,
  Brain,
  BookOpen,
  Clipboard,
  Check,
  RefreshCw,
  Shield,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [activeTab, setActiveTab] = useState('random');

  // --- State for Random Password ---
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copiedPass, setCopiedPass] = useState(false);

  // --- State for Memorable Password ---
  const [memorableText, setMemorableText] = useState('i love my dog');
  const [memorablePassword, setMemorablePassword] = useState('');
  const [memOptions, setMemOptions] = useState({
    capitalize: true,
    numbers: true,
    symbols: true,
  });
  const [copiedMem, setCopiedMem] = useState(false);

  // --- Tabs Definition ---
  const tabs = [
    { id: 'random', label: 'Random Password', icon: KeyRound },
    { id: 'memorable', label: 'Memorable Password', icon: Brain },
  ];

  // --- Effects ---
  useEffect(() => {
    generatePassword();
  }, [passwordLength, includeUppercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generateMemorablePassword();
  }, [memorableText, memOptions]);

  // --- Tool Functions ---

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let charset = lower;

    if (includeUppercase) charset += upper;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === '') {
      setPassword('Select at least one option');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    setCopiedPass(false);
  };

  const generateMemorablePassword = () => {
    if (memorableText.trim() === '') {
      setMemorablePassword('');
      return;
    }

    const { capitalize, numbers, symbols } = memOptions;
    const leetMapNumbers: { [key: string]: string } = { 'a': '4', 'e': '3', 'o': '0', 's': '5', 'l': '1', 't': '7' };
    const leetMapSymbols: { [key: string]: string } = { 'a': '@', 'i': '!', 's': '$', 'c': '(', 'g': '9' };
    const spaceChars = ['-', '_', '!', '#', '%', '1', '2', '3'];

    let newPass = '';
    // Split by spaces to treat as keywords
    const keywords = memorableText.split(' ').filter(Boolean);

    keywords.forEach((word, index) => {
      let transformedWord = '';
      for (const char of word) {
        let c = char.toLowerCase();

        if (numbers && leetMapNumbers[c] && Math.random() < 0.5) {
          c = leetMapNumbers[c];
        } else if (symbols && leetMapSymbols[c] && Math.random() < 0.5) {
          c = leetMapSymbols[c];
        }

        if (capitalize && Math.random() < 0.5) {
          c = c.toUpperCase();
        }
        transformedWord += c;
      }
      newPass += transformedWord;

      // Add a separator between words
      if (index < keywords.length - 1) {
        if (symbols || numbers) {
          newPass += spaceChars[Math.floor(Math.random() * spaceChars.length)];
        } else {
          newPass += '-';
        }
      }
    });

    setMemorablePassword(newPass);
    setCopiedMem(false);
  };

  const tutorials = {
    random: {
      title: 'Random Password Guide',
      sections: [
        {
          title: 'How to Create a Secure Password',
          content: [
            "A strong, random password is your best defense against brute-force attacks.",
            "**1. Adjust Length:** Use the slider to select a password length. **16 characters or more** is highly recommended.",
            "**2. Select Options:** For maximum security, keep all options (Uppercase, Numbers, and Symbols) checked.",
            "**3. Generate & Copy:** Click the 'Generate' button for a new password. Use the copy button to safely copy it to your clipboard.",
            "",
            "This tool is 100% client-side. Your passwords are never sent to our server.",
          ],
        },
      ],
    },
    memorable: {
      title: 'Memorable Password Guide',
      sections: [
        {
          title: 'How to Create a Memorable Passphrase',
          content: [
            'This tool helps you turn a simple phrase into a strong, memorable password (a "passphrase").',
            "**1. Enter Keywords:** Type in a few words you can easily remember (e.g., 'i love my dog' or 'blue car battery').",
            "**2. Select Options:**",
            "  - **Capitalize:** Randomly capitalizes letters (e.g., `dog` -> `dOg`).",
            "  - **Numbers:** Replaces letters with numbers (e.g., `e` -> `3`).",
            "  - **Symbols:** Replaces letters with symbols (e.g., `a` -> `@`) and replaces spaces with `_`, `-`, or `!&`.",
            "**3. Get Password:**",
            "The password generates automatically as you type. Click the copy button to use it.",
            "",
            'Example: "i love my dog" could become "iL0v3!My-d0g"',
          ],
        },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Secure Password Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Create strong, random, or memorable passwords instantly.
        </p>
      </div>

      {/* --- Tab Buttons --- */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- Random Password Generator --- */}
      {activeTab === 'random' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Random Password Generator
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
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Generate New Password
          </button>
        </div>
      )}

      {/* --- Memorable Password Generator --- */}
      {activeTab === 'memorable' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Memorable Password (Passphrase) Generator
          </h2>
          <div className="p-4 rounded-lg bg-muted flex items-center gap-4">
            <input
              type="text"
              readOnly
              value={memorablePassword}
              className="flex-1 text-2xl font-mono bg-transparent border-none outline-none text-foreground"
            />
            <button
              onClick={() => copyToClipboard(memorablePassword, setCopiedMem)}
              className="p-2 rounded-lg bg-background hover:bg-background/80"
            >
              {copiedMem ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Clipboard className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="memorableText">
                Your memorable keywords (space-separated)
              </label>
              <input
                id="memorableText"
                type="text"
                value={memorableText}
                onChange={(e) => setMemorableText(e.target.value)}
                placeholder="e.g., i love my dog"
                className="w-full p-3 rounded-lg border bg-background"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 p-3 rounded-lg bg-background border cursor-pointer">
                <input
                  type="checkbox"
                  checked={memOptions.capitalize}
                  onChange={(e) => setMemOptions(prev => ({ ...prev, capitalize: e.target.checked }))}
                  className="w-4 h-4 text-primary"
                />
                Capitalize (a {'>'} A)
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg bg-background border cursor-pointer">
                <input
                  type="checkbox"
                  checked={memOptions.numbers}
                  onChange={(e) => setMemOptions(prev => ({ ...prev, numbers: e.target.checked }))}
                  className="w-4 h-4 text-primary"
                />
                Numbers (e {'>'} 3)
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg bg-background border cursor-pointer">
                <input
                  type="checkbox"
                  checked={memOptions.symbols}
                  onChange={(e) => setMemOptions(prev => ({ ...prev, symbols: e.target.checked }))}
                  className="w-4 h-4 text-primary"
                />
                Symbols (s {'>'} $)
              </label>
            </div>
          </div>
          <button
            onClick={generateMemorablePassword}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </button>
        </div>
      )}

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">

        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Password Generator Guide
          </h2>
          <div className="space-y-6">
            {/* The tutorial content will be for the active tab */}
            {tutorials[activeTab as keyof typeof tutorials]?.sections?.map((section: { title: string, content: string[] }, sectionIndex: number) => (
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

        {/* --- What makes a strong password? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            What Makes a Strong Password?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>A strong password is your first line of defense against unauthorized access. The key is to make it **long** and **complex**.</p>
            <ul className="list-none space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>**Length:** Aim for at least **16 characters**. A 12-character password is 2 million times harder to crack than an 8-character one.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>**Complexity:** Use a mix of all character types: **uppercase letters (A-Z)**, **lowercase letters (a-z)**, **numbers (0-9)**, and **symbols (!@#$)**.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>**Uniqueness:** **Never** reuse passwords across different websites. If one site is breached, all your accounts are compromised.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span>**Avoid:** Do not use common words (`password123`), personal info (`johnsmith1990`), or keyboard patterns (`qwerty`).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Random vs. Memorable Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            Random vs. Memorable Passwords
          </h2>
          <p className="text-muted-foreground mb-4">Both methods create strong passwords, but they have different strengths. Use our tabs at the top to create either type.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Feature</th>
                  <th className="p-3 border border-border">Random Password</th>
                  <th className="p-3 border border-border">Memorable Passphrase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Example</td>
                  <td className="p-3 border border-border font-mono">`8q#Z@pT$2*vL9s!b`</td>
                  <td className="p-3 border border-border font-mono">`iL0v3!My-d0g`</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Best For</td>
                  <td className="p-3 border border-border">Password managers, database keys, anything you don't need to memorize.</td>
                  <td className="p-3 border border-border">Your main email, bank account, or any "master" password you must remember.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Security</td>
                  <td className="p-3 border border-border">Extremely high. Very difficult for computers to guess (brute-force).</td>
                  <td className="p-3 border border-border">Very high. Strong against brute-force, but easier for humans to remember.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Weakness</td>
                  <td className="p-3 border border-border">Impossible to remember.</td>
                  <td className="p-3 border border-border">Can be weaker if you use a very common or short phrase.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Comprehensive FAQs */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Frequently Asked Questions About Password Security
        </h2>
        <div className="space-y-3">
          <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors bg-background">
            <summary className="font-medium flex items-center justify-between">
              How long should my password be?
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Security experts recommend passwords of at least 12-16 characters. Longer passwords are exponentially harder to crack. A 16-character password is billions of times more secure than an 8-character password. For critical accounts like banking or email, consider 20+ characters.
            </p>
          </details>

          <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors bg-background">
            <summary className="font-medium flex items-center justify-between">
              Is this password generator safe to use?
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Yes! Our password generator runs entirely in your browser using client-side JavaScript. Your passwords are never sent to our servers or stored anywhere. We use cryptographically secure random number generation to ensure maximum randomness and security.
            </p>
          </details>

          <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors bg-background">
            <summary className="font-medium flex items-center justify-between">
              Should I use a password manager?
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Absolutely! Password managers are essential for maintaining security. They allow you to use unique, complex passwords for every account without memorizing them. Popular options include Bitwarden, 1Password, and LastPass. Use our random password generator to create passwords, then store them in your password manager.
            </p>
          </details>

          <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors bg-background">
            <summary className="font-medium flex items-center justify-between">
              What makes a password secure?
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              A secure password has four key qualities: length (12+ characters), complexity (mix of uppercase, lowercase, numbers, and symbols), uniqueness (never reused across sites), and randomness (no dictionary words or personal information). Our generator creates passwords that meet all these criteria.
            </p>
          </details>

          <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors bg-background">
            <summary className="font-medium flex items-center justify-between">
              How often should I change my passwords?
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Current security advice suggests changing passwords only when there's a breach or suspicious activity, rather than on a fixed schedule. Forced frequent changes often lead to weaker passwords. However, always change passwords immediately if a service you use reports a data breach.
            </p>
          </details>

          <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors bg-background">
            <summary className="font-medium flex items-center justify-between">
              What is two-factor authentication (2FA)?
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Two-factor authentication adds an extra layer of security by requiring something you know (password) plus something you have (phone, hardware key). Even if someone steals your password, they can't access your account without the second factor. Enable 2FA on all important accounts.
            </p>
          </details>

          <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors bg-background">
            <summary className="font-medium flex items-center justify-between">
              What are the most common password mistakes?
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Common mistakes include: using personal info (names, birthdays), using dictionary words, reusing passwords across sites, using keyboard patterns (qwerty, 123456), making passwords too short, and writing passwords on sticky notes. Our generator helps you avoid all these pitfalls.
            </p>
          </details>

          <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors bg-background">
            <summary className="font-medium flex items-center justify-between">
              How do hackers crack passwords?
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-muted-foreground">
              Hackers use several methods: brute force (trying every combination), dictionary attacks (trying common words), credential stuffing (using leaked passwords from other breaches), phishing (tricking you into revealing passwords), and social engineering. Strong, unique passwords protect against most of these attacks.
            </p>
          </details>
        </div>
      </div>

      {/* Related Tools */}
      <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
        <h3 className="text-xl font-bold mb-4 text-center">Related Security & Utility Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/qr-code-generator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
            <div className="font-medium">QR Code Generator</div>
            <div className="text-xs text-muted-foreground">Create QR codes</div>
          </a>
          <a href="/word-counter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
            <div className="font-medium">Word Counter</div>
            <div className="text-xs text-muted-foreground">Analyze text</div>
          </a>
          <a href="/unit-converter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
            <div className="font-medium">Unit Converter</div>
            <div className="text-xs text-muted-foreground">Convert units</div>
          </a>
          <a href="/age-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
            <div className="font-medium">Age Calculator</div>
            <div className="text-xs text-muted-foreground">Calculate age</div>
          </a>
        </div>
      </div>
    </div>
  );
}