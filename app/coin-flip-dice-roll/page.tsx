// src/app/coin-flip-dice-roll/page.tsx
'use client';

import { useState } from 'react';
import { Coins, Dice6, BookOpen, X, HelpCircle } from 'lucide-react';

export default function CoinDicePage() {
  const [coinResult, setCoinResult] = useState('Heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);

  const [diceResult, setDiceResult] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isDiceModalOpen, setIsDiceModalOpen] = useState(false);

  const flipCoin = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setCoinResult('...');
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setCoinResult(result);
      setIsFlipping(false);
    }, 1000); // 1s animation
  };

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setDiceResult(0); // Show '?'
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setDiceResult(result);
      setIsRolling(false);
    }, 500);
  };

  const tutorials = {
    title: 'How to Use the Coin Flip & Dice Roll',
    sections: [
      {
        title: 'Making a Quick Decision',
        content: [
          'These tools simulate a 50/50 coin flip or a 6-sided die roll.',
          '**1. Open Tool:** Click "Open Coin Flipper" or "Open Dice Roller" to launch the tool in a full-window modal.',
          '**2. Click Button:** Press the "Flip Coin" or "Roll Die" button inside the modal.',
          '**3. View Result:** Watch the animation and see your random result.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Coin Flip & Dice Roll
        </h1>
        <p className="text-lg text-muted-foreground">
          Need to make a quick decision? Flip a coin or roll a die.
        </p>
      </div>

      {/* --- Tool Launchers --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-muted flex flex-col items-center gap-4">
            <h3 className="text-xl font-semibold">Coin Flip</h3>
            <Coins className="h-16 w-16 text-primary" />
            <p className="text-sm text-muted-foreground text-center">Can't decide? Let fate choose for you. Heads or Tails?</p>
            <button
              onClick={() => setIsCoinModalOpen(true)}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
            >
              Open Coin Flipper
            </button>
          </div>
          <div className="p-6 rounded-lg bg-muted flex flex-col items-center gap-4">
            <h3 className="text-xl font-semibold">Dice Roll</h3>
            <Dice6 className="h-16 w-16 text-primary" />
            <p className="text-sm text-muted-foreground text-center">Need a random number from 1 to 6? Roll a virtual die.</p>
            <button
              onClick={() => setIsDiceModalOpen(true)}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
            >
              Open Dice Roller
            </button>
          </div>
        </div>
      </div>
      
      {/* --- Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use
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

        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            When to Use a Random Generator?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Random generators are perfect for any situation requiring an unbiased choice:</p>
            <ul className="list-disc pl-5">
              <li>**Decision Making:** Deciding who pays for lunch or what movie to watch.</li>
              <li>**Games:** Replacing lost dice or coins for board games.</li>
              <li>**Probability:** A simple tool for teaching or learning about probability (50/50 vs. 1-in-6 chance).</li>
              <li>**Breaking Ties:** Fairly settling a dispute or choosing a winner.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Fun Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/random-number-generator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Random Number Generator
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

      {/* --- Tool Modals (Requires CSS in globals.css) --- */}
      {isCoinModalOpen && (
        <div
          className="tool-modal-overlay"
          onClick={() => setIsCoinModalOpen(false)}
        >
          <div className="tool-modal" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsCoinModalOpen(false)}
              className="tool-modal-close"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold">Coin Flipper</h2>
            <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
              {isFlipping ? '?' : coinResult.charAt(0)}
            </div>
            <p className="text-5xl font-bold h-12">
              {!isFlipping && coinResult}
            </p>
            <button
              onClick={flipCoin}
              disabled={isFlipping}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </button>
          </div>
        </div>
      )}

      {isDiceModalOpen && (
        <div
          className="tool-modal-overlay"
          onClick={() => setIsDiceModalOpen(false)}
        >
          <div className="tool-modal" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsDiceModalOpen(false)}
              className="tool-modal-close"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold">Dice Roller</h2>
            <div className={`dice ${isRolling ? 'rolling' : ''}`}>
              {isRolling ? '...' : diceResult === 0 ? '?' : diceResult}
            </div>
            <p className="text-5xl font-bold h-12">
              {!isRolling && diceResult > 0 && diceResult}
            </p>
            <button
              onClick={rollDice}
              disabled={isRolling}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {isRolling ? 'Rolling...' : 'Roll Die'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}