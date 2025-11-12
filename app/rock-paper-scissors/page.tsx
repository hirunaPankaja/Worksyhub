// src/app/rock-paper-scissors/page.tsx
'use client';

import { useState } from 'react';
import { Hand, FileText, Scissors, HelpCircle, BookOpen } from 'lucide-react';

type RPSChoice = 'rock' | 'paper' | 'scissors';
type RPSStatus = 'playing' | 'result';

const getRPSIcon = (choice: RPSChoice) => {
  if (choice === 'rock') return <Hand />;
  if (choice === 'paper') return <FileText />;
  if (choice === 'scissors') return <Scissors />;
  return <HelpCircle />;
};

export default function RockPaperScissorsPage() {
  const [playerChoice, setPlayerChoice] = useState<RPSChoice | null>(null);
  const [computerChoice, setComputerChoice] = useState<RPSChoice | null>(null);
  const [rpsResult, setRpsResult] = useState<string | null>(null);
  const [rpsStatus, setRpsStatus] = useState<RPSStatus>('playing');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isRpsAnimating, setIsRpsAnimating] = useState(false);

  const playRPS = (choice: RPSChoice) => {
    setRpsStatus('result');
    setIsRpsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null); // Clear computer choice for shake
    setRpsResult('Shaking...');

    setTimeout(() => {
      const choices: RPSChoice[] = ['rock', 'paper', 'scissors'];
      const compChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(compChoice);
      setIsRpsAnimating(false);

      if (choice === compChoice) {
        setRpsResult("It's a Tie!");
      } else if (
        (choice === 'rock' && compChoice === 'scissors') ||
        (choice === 'scissors' && compChoice === 'paper') ||
        (choice === 'paper' && compChoice === 'rock')
      ) {
        setRpsResult('YOU WIN!');
        setPlayerScore((score) => score + 1);
      } else {
        setRpsResult('YOU LOSE!');
        setComputerScore((score) => score + 1);
      }
    }, 1000); // 1s shake animation
  };

  const resetRPS = () => {
    setRpsStatus('playing');
    setPlayerChoice(null);
    setComputerChoice(null);
    setRpsResult(null);
  };
  
  const resetScore = () => {
    resetRPS();
    setPlayerScore(0);
    setComputerScore(0);
  }

  const tutorials = {
    title: 'How to Play Rock Paper Scissors',
    sections: [
      {
        title: 'Game Rules',
        content: [
          '**1. Make Choice:** Click the "Rock", "Paper", or "Scissors" button to make your selection.',
          '**2. See Result:** The hands will "shake" and then reveal both your choice and the computer\'s random choice.',
          '**3. View Outcome:** The result ("YOU WIN!", "YOU LOSE!", or "It\'s a Tie!") will be displayed, and the score will update.',
          '**4. Play Again:** Click "Play Again" to start a new round.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Rock Paper Scissors
        </h1>
        <p className="text-lg text-muted-foreground">
          Play the classic game against the computer.
        </p>
      </div>

      {/* --- Rock Paper Scissors Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-card-foreground">
            Choose your weapon!
          </h2>
          <div className="text-lg font-semibold text-center">
            Score: <span className="text-primary">{playerScore}</span> - <span className="text-red-500">{computerScore}</span>
          </div>
        </div>

        {/* Game Arena */}
        <div className="rps-arena p-4 bg-muted rounded-lg">
          <div className="flex-1 flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold">You</h3>
            <div className="rps-hand" style={{'--hand-color': 'var(--primary)'} as React.CSSProperties}>
              {rpsStatus === 'playing' && <Hand className="shaking" />}
              {rpsStatus === 'result' && isRpsAnimating && <Hand className="shaking" />}
              {rpsStatus === 'result' && !isRpsAnimating && playerChoice && getRPSIcon(playerChoice)}
            </div>
          </div>

          <div className="text-2xl font-bold text-muted-foreground">VS</div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold">Computer</h3>
            <div className="rps-hand computer" style={{'--hand-color': 'var(--foreground)'} as React.CSSProperties}>
              {rpsStatus === 'playing' && <Hand className="shaking" />}
              {rpsStatus === 'result' && isRpsAnimating && <Hand className="shaking" />}
              {rpsStatus === 'result' && !isRpsAnimating && computerChoice && getRPSIcon(computerChoice)}
            </div>
          </div>
        </div>

        {/* Result Text */}
        {rpsStatus === 'result' && !isRpsAnimating && (
          <h3 className="text-3xl font-bold text-center text-primary">
            {rpsResult}
          </h3>
        )}

        {/* Controls */}
        {rpsStatus === 'playing' ? (
          <div className="grid grid-cols-3 gap-4">
            <button
              className="rps-choice-btn"
              onClick={() => playRPS('rock')}
            >
              <Hand className="h-8 w-8" />
              Rock
            </button>
            <button
              className="rps-choice-btn"
              onClick={() => playRPS('paper')}
            >
              <FileText className="h-8 w-8" />
              Paper
            </button>
            <button
              className="rps-choice-btn"
              onClick={() => playRPS('scissors')}
            >
              <Scissors className="h-8 w-8" />
              Scissors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={resetRPS}
              disabled={isRpsAnimating}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {isRpsAnimating ? '...' : 'Play Again'}
            </button>
             <button
              onClick={resetScore}
              disabled={isRpsAnimating}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 disabled:opacity-50"
            >
              Reset Score
            </button>
          </div>
        )}
      </div>

      {/* --- Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Play
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

        {/* --- Rules Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Rules of the Game
          </h2>
          <p className="text-muted-foreground mb-4">The rules are simple. Each choice wins against one other choice and loses to one other.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Choice</th>
                  <th className="p-3 border border-border">Beats</th>
                  <th className="p-3 border border-border">Loses to</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Rock</td>
                  <td className="p-3 border border-border">Scissors (Rock smashes scissors)</td>
                  <td className="p-3 border border-border">Paper (Paper covers rock)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Paper</td>
                  <td className="p-3 border border-border">Rock (Paper covers rock)</td>
                  <td className="p-3 border border-border">Scissors (Scissors cuts paper)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Scissors</td>
                  <td className="p-3 border border-border">Paper (Scissors cuts paper)</td>
                  <td className="p-3 border border-border">Rock (Rock smashes scissors)</td>
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
          <a href="/magic-8-ball" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Magic 8-Ball
          </a>
        </div>
      </div>
    </div>
  );
}