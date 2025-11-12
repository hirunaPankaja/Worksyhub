// src/app/magic-8-ball/page.tsx
'use client';

import { useState } from 'react';
import { HelpCircle, BookOpen } from 'lucide-react';

const magic8BallAnswers = [
  'It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes – definitely.',
  'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.',
  'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.',
  'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.',
  "Don't count on it.", 'My reply is no.', 'My sources say no.', 'Outlook not so good.',
  'Very doubtful.',
];

export default function Magic8BallPage() {
  const [magicBallAnswer, setMagicBallAnswer] = useState('Ask a question...');
  const [isShaking, setIsShaking] = useState(false);

  const shakeMagicBall = () => {
    if (isShaking) return;
    setIsShaking(true);
    setMagicBallAnswer('...');
    setTimeout(() => {
      const answer =
        magic8BallAnswers[
          Math.floor(Math.random() * magic8BallAnswers.length)
        ];
      setMagicBallAnswer(answer);
      setIsShaking(false);
    }, 1000);
  };

  const tutorials = {
    title: 'How to Use the Magic 8-Ball',
    sections: [
      {
        title: 'How to Ask',
        content: [
          '**1. Think of a Question:** Focus on a yes-or-no question (e.g., "Will I have a good day today?").',
          '**2. Shake:** Click the Magic 8-Ball to "shake" it.',
          '**3. Get Your Answer:** An animation will play, and your mystical answer will appear in the blue window.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Magic 8-Ball
        </h1>
        <p className="text-lg text-muted-foreground">
          Ask a yes-or-no question and receive your fortune.
        </p>
      </div>

      {/* --- Magic 8-Ball Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          The Oracle Awaits
        </h2>
        <div className="flex flex-col items-center gap-6">
          <p className="text-lg text-muted-foreground">
            Focus on your question and click the ball...
          </p>
          <div
            className={`magic-8-ball ${isShaking ? 'shaking' : ''}`}
            onClick={shakeMagicBall}
          >
            <div className="magic-8-ball-window">
              <p>{magicBallAnswer}</p>
            </div>
          </div>
          <button
            onClick={shakeMagicBall}
            disabled={isShaking}
            className="w-full md:w-1/2 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {isShaking ? 'Thinking...' : 'Shake the Ball'}
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

        {/* --- Answer Types Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            The Answers Explained
          </h2>
          <p className="text-muted-foreground mb-4">The 20 classic Magic 8-Ball answers are grouped into three categories.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Category</th>
                  <th className="p-3 border border-border">Answers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold text-green-600">Affirmative (Yes)</td>
                  <td className="p-3 border border-border">It is certain. / As I see it, yes. / Yes – definitely. / etc.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold text-yellow-600">Non-Committal</td>
                  <td className="p-3 border border-border">Reply hazy, try again. / Cannot predict now. / etc.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold text-red-600">Negative (No)</td>
                  <td className="p-3 border border-border">Don't count on it. / My reply is no. / Outlook not so good. / etc.</td>
                </tr>
              </tbody>
            </table>
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
          <a href="/rock-paper-scissors" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Rock Paper Scissors
          </a>
        </div>
      </div>
    </div>
  );
}