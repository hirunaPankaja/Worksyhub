// src/app/decision-wheel/page.tsx
'use client';

import { useState } from 'react';
import { Disc, BookOpen, Plus, Trash2, HelpCircle } from 'lucide-react';
import dynamic from 'next/dynamic'; // <-- 1. IMPORT DYNAMIC

// --- 2. REMOVE the old import: import { Wheel } from 'react-custom-roulette'; ---

// --- 3. CREATE a dynamic component that ONLY runs on the client ---
const Wheel = dynamic(
  () => import('react-custom-roulette').then((mod) => mod.Wheel),
  {
    ssr: false, // This is the magic line that fixes the build error
    loading: () => (
      <div className="w-full h-80 flex items-center justify-center bg-muted rounded-full">
        <p>Loading wheel...</p>
      </div>
    ),
  }
);
// --- END OF CHANGES ---

const defaultWheelData = [
  { option: 'Pizza', style: { backgroundColor: '#FF5733' } },
  { option: 'Burger', style: { backgroundColor: '#33FF57' } },
  { option: 'Salad', style: { backgroundColor: '#3357FF' } },
  { option: 'Sushi', style: { backgroundColor: '#FF33A1' } },
  { option: 'Pasta', style: { backgroundColor: '#FFBD33' } },
  { option: 'Tacos', style: { backgroundColor: '#33FFF6' } },
];

const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

export default function DecisionWheelPage() {
  const [wheelData, setWheelData] = useState(defaultWheelData);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [newOption, setNewOption] = useState('');
  const [wheelResult, setWheelResult] = useState('');

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

  const tutorials = {
    title: 'How to Use the Decision Spinner Wheel',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Add Options:** Type an option name (e.g., "Pizza", "Watch TV", "Study") and click the "+" button to add it to the wheel.',
          '**2. Manage Options:** Remove default or unwanted options by clicking the trash icon next to them.',
          '**3. Spin:** Click the "SPIN" button in the center of the wheel.',
          '**4. See Result:** The wheel will spin and land on a random option. The winner will be displayed at the top.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Decision Spinner Wheel
        </h1>
        <p className="text-lg text-muted-foreground">
          Can't decide? Let the wheel choose for you!
        </p>
      </div>

      {/* --- Decision Wheel Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Spinner Wheel
        </h2>
        {wheelResult && (
          <h3 className="text-3xl font-bold text-center text-primary">
            The winner is: {wheelResult}!
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            {/* This <Wheel> component is now the dynamic one */}
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

        {/* --- What is a Decision Wheel? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            What is a Decision Wheel?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>A decision wheel is a tool for making a random choice from a set of options. It's the digital version of spinning a prize wheel or drawing a name out of a hat. By putting your options on the wheel and giving it a spin, you remove human bias and let chance decide the outcome.</p>
            
            <h3 className="text-xl font-semibold mt-6">Common Uses Table</h3>
             <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 border border-border">Use Case</th>
                    <th className="p-3 border border-border">Example Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border font-semibold">What to Eat?</td>
                    <td className="p-3 border border-border">Pizza, Tacos, Sushi, Salad, Burgers</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-semibold">Giveaway Winner</td>
                    <td className="p-3 border border-border">John S., Jane D., Mike L., Sarah K.</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-semibold">Workout Routine</td>
                    <td className="p-3 border border-border">Cardio, Legs, Chest, Back, Arms</td>
                  </tr>
                   <tr>
                    <td className="p-3 border border-border font-semibold">Study Subject</td>
                    <td className="p-3 border border-border">Math, History, Science, English</td>
                  </tr>
                </tbody>
              </table>
            </div>
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