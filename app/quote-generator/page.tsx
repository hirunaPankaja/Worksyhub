// src/app/quote-generator/page.tsx
'use client';

import { useState } from 'react';
import { Quote, BookOpen, Clipboard, Check, RefreshCw } from 'lucide-react';

const quotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { quote: "Get busy living or get busy dying.", author: "Stephen King" },
  { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { quote: "The unexamined life is not worth living.", author: "Socrates" },
  { quote: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt"},
  { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle"},
  { quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson"},
  { quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs"},
];

export default function QuoteGeneratorPage() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateQuote = () => {
    let newQuote = currentQuote;
    // Ensure we don't get the same quote twice in a row
    while (newQuote.quote === currentQuote.quote) {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }
    setCurrentQuote(newQuote);
    setCopiedQuote(false);
  };

  const tutorials = {
    title: 'How to Use the Quote Generator',
    sections: [
      {
        title: 'Get Inspired',
        content: [
          '**1. Get Quote:** The tool loads a random quote for you on page load.',
          "**2. New Quote:** Click the 'New Quote' button to generate a new random quote.",
          '**3. Copy:** Click the "Copy Quote" button to copy the text and author to your clipboard for sharing.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Random Quote Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Get inspired with a random quote from famous thinkers.
        </p>
      </div>

      {/* --- Quote Generator Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Quote of the Moment
        </h2>
        <div className="quote-box">
          <p className="quote-text">&ldquo;{currentQuote.quote}&rdquo;</p>
          <p className="quote-author">&mdash; {currentQuote.author}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={generateQuote}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            New Quote
          </button>
          <button
            onClick={() => copyToClipboard(`"${currentQuote.quote}" - ${currentQuote.author}`, setCopiedQuote)}
            className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 flex items-center justify-center gap-2"
          >
            {copiedQuote ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Clipboard className="h-5 w-5" />
            )}
            {copiedQuote ? 'Copied!' : 'Copy Quote'}
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
            {tutorials.sections.map((section, sectionIndex) => (
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

        {/* --- Why Seek Quotes? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Quote className="h-6 w-6 text-primary" />
            Why We Love Quotes
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Quotes are powerful because they distill complex ideas into simple, memorable phrases. They can provide:</p>
            <ul className="list-disc pl-5">
              <li>**Inspiration:** A single sentence can motivate you to start a new project or overcome a challenge.</li>
              <li>**Perspective:** A quote from a historical figure can offer a new way to think about a current problem.</li>
              <li>**Clarity:** They can perfectly express a feeling or thought that you've been struggling to put into words.</li>
              <li>**Connection:** Sharing a quote helps you connect with others who share the same values.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Fun Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/coin-flip-dice-roll" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Coin Flip & Dice Roll
          </a>
          <a href="/random-number-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Random Number Generator
          </a>
          <a href="/decision-wheel" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Decision Wheel
          </a>
          <a href="/magic-8-ball" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Magic 8-Ball
          </a>
        </div>
      </div>
    </div>
  );
}