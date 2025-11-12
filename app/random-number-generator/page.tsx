// src/app/random-number-generator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Hash, BookOpen, HelpCircle } from 'lucide-react';

export default function RandomNumberGeneratorPage() {
  const [minNum, setMinNum] = useState(1);
  const [maxNum, setMaxNum] = useState(100);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        generateRandomNumber();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [minNum, maxNum]); // Re-bind if min/max change

  const generateRandomNumber = () => {
    const min = Math.ceil(minNum);
    const max = Math.floor(maxNum);
    if (min > max) {
      setRandomNumber(null);
      alert('Min value must be less than or equal to Max value.');
      return;
    }
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(result);
  };

  const tutorials = {
    title: 'How to Use the Random Number Generator',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Set Range:** Enter your "Min Value" (the lowest possible number) and "Max Value" (the highest possible number).',
          "**2. Generate:** Click the 'Generate Number' button.",
          '**3. View Result:** Your random number will appear in the display box below.',
          '',
          'This generator is inclusive, meaning both the Min and Max values are possible results.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Random Number Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Generate a random number between a custom range.
        </p>
      </div>

      {/* --- RNG Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Set Your Range
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="minNum">Min Value</label>
            <input
              id="minNum"
              type="number"
              value={minNum}
              onChange={(e) => setMinNum(Number(e.target.value))}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="maxNum">Max Value</label>
            <input
              id="maxNum"
              type="number"
              value={maxNum}
              onChange={(e) => setMaxNum(Number(e.target.value))}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>
        </div>
        <button
          onClick={generateRandomNumber}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
        >
          Generate Number
        </button>
        {randomNumber !== null && (
          <div className="p-6 rounded-lg bg-muted text-center">
            <p className="text-sm text-muted-foreground mb-1">Your Number:</p>
            <p className="text-6xl font-bold text-primary">
              {randomNumber}
            </p>
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

        {/* --- What is RNG? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            What is a Random Number Generator?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>A Random Number Generator (RNG) is a tool that produces a number from a given set of numbers, where each number has an equal chance of being chosen. This process is known as **uniform distribution**.</p>
            <p>This tool uses a **Pseudo-Random Number Generator (PRNG)**, which is an algorithm that runs on your computer to create a sequence of numbers that *appears* random. While not truly random (like atmospheric noise), it is more than random enough for games, contests, and simulations.</p>
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
          <a href="/decision-wheel" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Decision Wheel
          </a>
          <a href="/magic-8-ball" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Magic 8-Ball
          </a>
          <a href="/rock-paper-scissors" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Rock Paper Scissors
          </a>
        </div>
      </div>
    </div>
  );
}