// src/app/misc-tools/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import {
  Coins,
  Dice6,
  Hash,
  Disc,
  BookOpen,
  Plus,
  Trash2,
  X,
  HelpCircle,
  Hand,
  FileText,
  Scissors,
  Quote,
  Clipboard,
  Check,
} from 'lucide-react';
import { Wheel } from 'react-custom-roulette';

// --- Data for New Tools ---

const defaultWheelData = [
  { option: 'Pizza', style: { backgroundColor: '#FF5733' } },
  { option: 'Burger', style: { backgroundColor: '#33FF57' } },
  { option: 'Salad', style: { backgroundColor: '#3357FF' } },
  { option: 'Sushi', style: { backgroundColor: '#FF33A1' } },
  { option: 'Pasta', style: { backgroundColor: '#FFBD33' } },
  { option: 'Tacos', style: { backgroundColor: '#33FFF6' } },
];

const magic8BallAnswers = [
  'It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes – definitely.',
  'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.',
  'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.',
  'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.',
  "Don't count on it.", 'My reply is no.', 'My sources say no.', 'Outlook not so good.',
  'Very doubtful.',
];

const quotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { quote: "Get busy living or get busy dying.", author: "Stephen King" },
  { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { quote: "The unexamined life is not worth living.", author: "Socrates" },
  { quote: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
];

// --- Types ---
type RPSChoice = 'rock' | 'paper' | 'scissors';
type RPSStatus = 'playing' | 'result';

// --- Helper Functions ---
const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

const getRPSIcon = (choice: RPSChoice) => {
  if (choice === 'rock') return <Hand />;
  if (choice === 'paper') return <FileText />;
  if (choice === 'scissors') return <Scissors />;
  return <HelpCircle />;
};

// --- NEW: A wrapper component to use Suspense ---
export default function MiscToolsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MiscToolsPage />
    </Suspense>
  );
}

function MiscToolsPage() { // Renamed from default export
  const [activeTab, setActiveTab] = useState('random');
  const [activeTutorial, setActiveTutorial] = useState('random');

  // --- State for Tools ---
  const [coinResult, setCoinResult] = useState('Heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);

  const [diceResult, setDiceResult] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isDiceModalOpen, setIsDiceModalOpen] = useState(false);

  const [minNum, setMinNum] = useState(1);
  const [maxNum, setMaxNum] = useState(100);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const [wheelData, setWheelData] = useState(defaultWheelData);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [newOption, setNewOption] = useState('');
  const [wheelResult, setWheelResult] = useState('');

  const [magicBallAnswer, setMagicBallAnswer] = useState('Ask a question...');
  const [isShaking, setIsShaking] = useState(false);

  // --- NEW RPS State ---
  const [playerChoice, setPlayerChoice] = useState<RPSChoice | null>(null);
  const [computerChoice, setComputerChoice] = useState<RPSChoice | null>(null);
  const [rpsResult, setRpsResult] = useState<string | null>(null);
  const [rpsStatus, setRpsStatus] = useState<RPSStatus>('playing');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isRpsAnimating, setIsRpsAnimating] = useState(false);

  // --- NEW Quote State ---
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // --- Tabs Definition ---
  const tabs = [
    { id: 'random', label: 'Coin Flip & Dice', icon: Coins },
    { id: 'rng', label: 'Number Generator', icon: Hash },
    { id: 'wheel', label: 'Decision Wheel', icon: Disc },
    { id: '8ball', label: 'Magic 8-Ball', icon: HelpCircle },
    { id: 'rps', label: 'Rock Paper Scissors', icon: Hand },
    { id: 'quote', label: 'Quote Generator', icon: Quote },
  ];

  // --- NEW: This block reads the URL query ---
  const searchParams = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, tabs]);
  // --- END NEW BLOCK ---


  // --- Effects ---
  useEffect(() => {
    setActiveTutorial(activeTab);
  }, [activeTab]);

  // --- Tool Functions ---

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    setDiceResult(0);
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setDiceResult(result);
      setIsRolling(false);
    }, 500);
  };

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

  const handleSpinClick = () => {
    if (wheelData.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setWheelResult('');
    }
  };

  const addWheelOption = () => {
    if (newOption.trim() !== '') {
      setWheelData([
        ...wheelData,
        { option: newOption, style: { backgroundColor: getRandomColor() } },
      ]);
      setNewOption('');
    }
  };

  const removeWheelOption = (index: number) => {
    const newData = [...wheelData];
    newData.splice(index, 1);
    setWheelData(newData);
  };

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

  // --- NEW RPS Logic ---
  const playRPS = (choice: RPSChoice) => {
    setRpsStatus('result');
    setIsRpsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null); // Clear computer choice for shake
    setRpsResult('Shaking...');

    // Animation timeout
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

  // --- NEW Quote Logic ---
  const generateQuote = () => {
    let newQuote = currentQuote;
    while (newQuote.quote === currentQuote.quote) {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }
    setCurrentQuote(newQuote);
  };

  // --- Tutorials Content ---
  const tutorials = {
    random: {
      title: 'Coin Flip & Dice Roll Guide',
      sections: [
        {
          title: 'How to Use',
          content: [
            'These tools simulate a 50/50 coin flip or a 6-sided die roll.',
            '**1. Open Tool:** Click "Open Coin Flipper" or "Open Dice Roller" to launch the tool in a full-window modal.',
            '**2. Click Button:** Press the "Flip Coin" or "Roll Die" button inside the modal.',
            '**3. View Result:** Watch the animation and see your random result.',
          ],
        },
      ],
    },
    rng: {
      title: 'Random Number Generator Guide',
      sections: [
        {
          title: 'How to Use',
          content: [
            'Generate a random number between a minimum and maximum value.',
            '**1. Set Range:** Enter your Min and Max values in the input fields.',
            '**2. Generate:** Click the "Generate Number" button.',
            '**3. View Result:** Your random number will appear in the display box below.',
          ],
        },
      ],
    },
    wheel: {
      title: 'Decision Spinner Wheel Guide',
      sections: [
        {
          title: 'How to Use',
          content: [
            'Spin a customizable wheel to make random decisions.',
            '**1. Add Options:** Type an option name and click the "+" button to add it to the wheel.',
            '**2. Manage Options:** Remove options using the trash icon if needed.',
            '**3. Spin:** Click the "SPIN" button to spin the wheel.',
            '**4. See Result:** The winning option will be displayed at the top.',
          ],
        },
      ],
    },
    '8ball': {
      title: 'Magic 8-Ball Guide',
      sections: [
        {
          title: 'How to Use',
          content: [
            'Ask a yes/no question to the mystical Magic 8-Ball for an answer.',
            '**1. Ask:** Think of your question (don\'t type it!).',
            '**2. Shake:** Click the Magic 8-Ball to "shake" it.',
            '**3. Get Answer:** An animation will play, and your answer will appear in the blue window.',
          ],
        },
      ],
    },
    rps: {
      title: 'Rock Paper Scissors Guide',
      sections: [
        {
          title: 'How to Play',
          content: [
            'Play a classic game of Rock Paper Scissors against the computer.',
            '**1. Make Choice:** Click the "Rock", "Paper", or "Scissors" button.',
            '**2. See Result:** The hands will "shake" and then reveal both choices.',
            '**3. View Outcome:** The result ("YOU WIN!", "YOU LOSE!", or "It\'s a Tie!") will be displayed, and the score will update.',
            '**4. Play Again:** Click "Play Again" to start a new round.',
          ],
        },
      ],
    },
    quote: {
      title: 'Random Quote Generator Guide',
      sections: [
        {
          title: 'How to Use',
          content: [
            'Get inspired with a random quote from famous thinkers.',
            '**1. Get Quote:** The tool loads a random quote for you.',
            '**2. New Quote:** Click the "New Quote" button to generate a new random quote.',
            '**3. Copy:** Click the "Copy Quote" button to copy the text and author to your clipboard.',
          ],
        },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Miscellaneous & Fun Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Coin flip, dice roll, random numbers, and a decision wheel
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

      {/* --- Coin Flip & Dice Roll (Modal Launchers) --- */}
      {activeTab === 'random' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Coin Flip & Dice Roll
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-muted flex flex-col items-center gap-4">
              <h3 className="text-xl font-semibold">Coin Flip</h3>
              <Coins className="h-16 w-16 text-primary" />
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
              <button
                onClick={() => setIsDiceModalOpen(true)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
              >
                Open Dice Roller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Random Number Generator (unchanged) --- */}
      {activeTab === 'rng' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Random Number Generator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Min Value</label>
              <input
                type="number"
                value={minNum}
                onChange={(e) => setMinNum(Number(e.target.value))}
                className="w-full p-3 rounded-lg border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Value</label>
              <input
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
              <p className="text-6xl font-bold text-foreground">
                {randomNumber}
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- Decision Wheel (unchanged) --- */}
      {activeTab === 'wheel' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Decision Spinner Wheel
          </h2>
          {wheelResult && (
            <h3 className="text-2xl font-bold text-center text-primary">
              The winner is: {wheelResult}!
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={wheelData}
                outerBorderWidth={3}
                radiusLineWidth={2}
                fontSize={16}
                textColors={['#000000']}
                onStopSpinning={() => {
                  setMustSpin(false);
                  setWheelResult(wheelData[prizeNumber].option);
                }}
              />
              <button
                onClick={handleSpinClick}
                disabled={mustSpin || wheelData.length < 2}
                className="w-1/2 -mt-16 z-10 py-4 bg-gray-800 text-white rounded-full font-bold text-xl border-4 border-white hover:bg-gray-700 disabled:opacity-70"
              >
                SPIN
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Manage Options</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addWheelOption()}
                  placeholder="Add new option"
                  className="flex-1 p-3 rounded-lg border bg-background"
                />
                <button
                  onClick={addWheelOption}
                  className="p-3 bg-primary text-primary-foreground rounded-lg"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {wheelData.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: data.style.backgroundColor }}
                      ></div>
                      <span className="text-foreground">{data.option}</span>
                    </div>
                    <button
                      onClick={() => removeWheelOption(index)}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Magic 8-Ball (unchanged from previous) --- */}
      {activeTab === '8ball' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Magic 8-Ball
          </h2>
          <div className="flex flex-col items-center gap-6">
            <p className="text-lg text-muted-foreground">
              Ask a yes/no question and click the ball...
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
              {isShaking ? 'Shaking...' : 'Shake the Ball'}
            </button>
          </div>
        </div>
      )}

      {/* --- NEW: Rock Paper Scissors --- */}
      {activeTab === 'rps' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-card-foreground">
              Rock Paper Scissors
            </h2>
            <div className="text-lg font-semibold text-center">
              Score: <span className="text-primary">{playerScore}</span> - <span className="text-red-500">{computerScore}</span>
            </div>
          </div>

          {/* Game Arena */}
          <div className="rps-arena p-4 bg-muted rounded-lg">
            {/* Player Side */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <h3 className="text-lg font-semibold">You</h3>
              <div className="rps-hand" style={{'--hand-color': 'var(--primary)'} as React.CSSProperties}>
                {rpsStatus === 'playing' && <Hand className="shaking" />}
                {rpsStatus === 'result' && isRpsAnimating && <Hand className="shaking" />}
                {rpsStatus === 'result' && !isRpsAnimating && playerChoice && getRPSIcon(playerChoice)}
              </div>
            </div>

            <div className="text-2xl font-bold text-muted-foreground">VS</div>

            {/* Computer Side */}
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
            <button
              onClick={resetRPS}
              disabled={isRpsAnimating}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 disabled:opacity-50"
            >
              {isRpsAnimating ? '...' : 'Play Again'}
            </button>
          )}
        </div>
      )}

      {/* --- NEW: Quote Generator --- */}
      {activeTab === 'quote' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Random Quote Generator
          </h2>
          <div className="quote-box">
            <p className="quote-text">&ldquo;{currentQuote.quote}&rdquo;</p>
            <p className="quote-author">&mdash; {currentQuote.author}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={generateQuote}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
            >
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
                {activeTutorial === 'random' &&
                  'The modal pop-up gives you a focused view, perfect for making an important 50/50 decision!'}
                {activeTutorial === 'rng' &&
                  'This generator is "inclusive," meaning both the Min and Max numbers are possible results.'}
                {activeTutorial === 'wheel' &&
                  'Add at least two options before spinning. You can use this to pick movies, study topics, or chores!'}
                {activeTutorial === '8ball' &&
                  'For the best results, only ask the Magic 8-Ball questions that can be answered with a "yes" or "no".'}
                {activeTutorial === 'rps' &&
                  'The computer\'s choice is 100% random, so you can\'t predict what it will do next!'}
                {activeTutorial === 'quote' &&
                  'Use the copy button to quickly paste an inspirational quote into a social media post or a presentation.'}
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
            href="/lifestyle-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Lifestyle Tools
          </a>
          <a
            href="/file-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            File Tools
          </a>
          <a
            href="/text-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Text & Coding
          </a>
          <a
            href="/"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            All Tools
          </a>
        </div>
      </div>

      {/* --- NEW: Tool Modals --- */}
      {/* Coin Flip Modal */}
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
            {/* ===> FIXED: Larger, clearer result text <=== */}
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

      {/* Dice Roll Modal */}
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
            {/* ===> FIXED: Larger, clearer result text <=== */}
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