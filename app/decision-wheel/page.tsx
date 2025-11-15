// src/app/decision-wheel/page.tsx
'use client';

import { useState } from 'react';
import { Disc, BookOpen, Plus, Trash2, HelpCircle, RotateCcw, Settings, Download, Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const Wheel = dynamic(
  () => import('react-custom-roulette').then((mod) => mod.Wheel),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-80 flex items-center justify-center bg-muted rounded-full">
        <p>Loading decision wheel...</p>
      </div>
    ),
  }
);

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
  const [spinSpeed, setSpinSpeed] = useState(1);
  const [wheelSize, setWheelSize] = useState(300);
  const [showSettings, setShowSettings] = useState(false);

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

  const resetWheel = () => {
    setWheelData(defaultWheelData);
    setWheelResult('');
  };

  const clearAllOptions = () => {
    setWheelData([]);
    setWheelResult('');
  };

  const tutorials = {
    title: 'How to Use the Decision Spinner Wheel - Complete Guide',
    sections: [
      {
        title: 'Step-by-Step Guide to Using Our Random Decision Wheel',
        content: [
          '**1. Add Custom Options:** Type any option name (e.g., "Pizza", "Watch TV", "Study", "Go Running") and click the "+" button to add it to your decision wheel. Our random choice generator supports unlimited options.',
          '**2. Manage Your Options:** Remove default or unwanted options by clicking the trash icon. You can completely customize your spinner wheel for any decision-making scenario.',
          '**3. Adjust Settings:** Click the settings gear to customize your wheel experience - adjust spin speed, wheel size, and visual preferences for your perfect random picker tool.',
          '**4. Spin the Wheel:** Click the prominent "SPIN" button in the center of the wheel. Our digital decision maker will randomly select from your options.',
          '**5. Get Instant Results:** The wheel will spin and land on a completely random option. The selected result will be prominently displayed at the top of your screen.',
          '**6. Share Results:** Use the share button to send your decision wheel results to friends or colleagues for transparent random selection processes.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* --- SEO Introduction Section --- */}
      <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Decision Wheel - Online Random Picker Tool
        </h1>
        <p className="text-xl text-gray-700 mb-4 font-semibold">
          Make instant random decisions with our interactive spinner wheel - the ultimate digital choice maker
        </p>
        <div className="prose prose-lg text-gray-600">
          <p>
            Welcome to the most comprehensive <strong>free online decision wheel</strong> and <strong>random picker tool</strong> available. 
            Our interactive <strong>digital spinner wheel</strong> eliminates decision fatigue by providing completely random, unbiased selections 
            from your custom options. Whether you're choosing what to eat, picking giveaway winners, deciding activities, or solving daily dilemmas, 
            our <strong>random choice generator</strong> delivers instant, fair results every time.
          </p>
          <p>
            This advanced <strong>decision wheel spinner</strong> combines sophisticated randomization algorithms with an intuitive interface, 
            making it perfect for personal use, business giveaways, classroom activities, or group decision-making. Unlike basic randomizers, 
            our <strong>customizable wheel</strong> allows complete control over options, colors, and spinning behavior, ensuring your 
            <strong>random selection process</strong> is both fun and reliable.
          </p>
          <p>
            As a completely <strong>free online decision maker</strong>, our tool requires no downloads, registrations, or payments. 
            The <strong>interactive wheel spinner</strong> works instantly in your browser, providing professional-grade <strong>random outcome generation</strong> 
            for any scenario where unbiased selection matters.
          </p>
        </div>
      </div>

      {/* --- Decision Wheel Tool - MOVED TO TOP --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold text-card-foreground">
          Interactive Decision Spinner Wheel
        </h2>
        {wheelResult && (
          <h3 className="text-3xl font-bold text-center text-primary animate-pulse">
            🎉 The Winner Is: {wheelResult}! 🎉
          </h3>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col items-center">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={wheelData}
              outerBorderWidth={3}
              radiusLineWidth={2}
              fontSize={16}
              textColors={['#000000']}
              spinDuration={1 / spinSpeed}
              onStopSpinning={() => {
                setMustSpin(false);
                setWheelResult(wheelData[prizeNumber].option);
              }}
            />
            <button
              onClick={handleSpinClick}
              disabled={mustSpin || wheelData.length < 2}
              className="w-1/2 -mt-16 z-10 py-4 bg-gray-800 text-white rounded-full font-bold text-xl border-4 border-white hover:bg-gray-700 disabled:opacity-70 transition-all duration-300 transform hover:scale-105"
            >
              SPIN WHEEL
            </button>
            
            {/* Enhanced Control Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={resetWheel}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Wheel
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Share2 className="h-4 w-4" />
                Share Result
              </button>
            </div>

            {/* Advanced Settings Panel */}
            {showSettings && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border w-full max-w-md">
                <h4 className="font-semibold mb-3">Wheel Customization</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Spin Speed: {spinSpeed}x</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={spinSpeed}
                      onChange={(e) => setSpinSpeed(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Wheel Size: {wheelSize}px</label>
                    <input
                      type="range"
                      min="200"
                      max="500"
                      step="10"
                      value={wheelSize}
                      onChange={(e) => setWheelSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Manage Wheel Options</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addWheelOption()}
                  placeholder="Add new option to wheel..."
                  className="flex-1 p-3 rounded-lg border bg-background"
                />
                <button
                  onClick={addWheelOption}
                  className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={clearAllOptions}
                  disabled={wheelData.length === 0}
                  className="flex-1 p-2 bg-red-500 text-white rounded-lg disabled:opacity-50 hover:bg-red-600 transition-colors"
                >
                  Clear All Options
                </button>
                <button
                  onClick={resetWheel}
                  className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Restore Defaults
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              <h4 className="font-semibold">Current Options ({wheelData.length})</h4>
              {wheelData.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: data.style.backgroundColor }}
                    ></div>
                    <span className="text-foreground font-medium">{data.option}</span>
                  </div>
                  <button
                    onClick={() => removeWheelOption(index)}
                    className="text-muted-foreground hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Blog & Educational Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- Comprehensive How to Use Guide --- */}
        <div className="bg-background border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Complete Guide to Using Our Decision Wheel
          </h2>
          <div className="space-y-6">
            {tutorials.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line, lineIndex) => (
                    <div key={lineIndex} className="mb-4 p-3 bg-blue-50 rounded-lg">
                      {line.startsWith('**') ? (
                        <strong className="text-foreground text-lg">{line.replace(/\*\*/g, '')}</strong>
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

        {/* --- What is a Decision Wheel? - Enhanced --- */}
        <div className="bg-background border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            What is a Decision Wheel? Complete Overview
          </h2>
          <div className="prose prose-lg max-w-none text-foreground space-y-4">
            <p>
              A <strong>decision wheel</strong>, also known as a <strong>spinner wheel</strong> or <strong>random picker</strong>, 
              is an innovative digital tool designed to make completely random selections from a set of custom options. 
              This <strong>interactive decision maker</strong> serves as the modern digital equivalent of spinning a prize wheel, 
              drawing names from a hat, or flipping a coin - but with far greater flexibility and customization.
            </p>
            
            <p>
              Our advanced <strong>online decision wheel</strong> utilizes sophisticated randomization algorithms to ensure 
              truly unbiased outcomes, eliminating human bias from your selection processes. Whether you're making simple daily choices 
              or conducting important random selections, this <strong>digital spinner tool</strong> provides reliable, transparent results every time.
            </p>

            <h3 className="text-xl font-semibold mt-6 text-foreground">Comprehensive Uses Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100 to-purple-100">
                    <th className="p-4 border border-gray-300 font-bold text-gray-800">Use Case Category</th>
                    <th className="p-4 border border-gray-300 font-bold text-gray-800">Example Options</th>
                    <th className="p-4 border border-gray-300 font-bold text-gray-800">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold text-blue-700">Food & Dining Decisions</td>
                    <td className="p-4 border border-gray-300">Pizza, Tacos, Sushi, Salad, Burgers, Chinese, Italian</td>
                    <td className="p-4 border border-gray-300">Group meals, family dinners, date night choices</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold text-green-700">Giveaway & Contest Winners</td>
                    <td className="p-4 border border-gray-300">John Smith, Jane Doe, Mike Johnson, Sarah Wilson</td>
                    <td className="p-4 border border-gray-300">Social media contests, raffles, prize drawings</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold text-purple-700">Fitness & Workout Routines</td>
                    <td className="p-4 border border-gray-300">Cardio, Leg Day, Chest, Back, Arms, Yoga, HIIT</td>
                    <td className="p-4 border border-gray-300">Weekly workout planning, exercise variety</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold text-red-700">Study & Learning Subjects</td>
                    <td className="p-4 border border-gray-300">Math, History, Science, English, Programming, Languages</td>
                    <td className="p-4 border border-gray-300">Study sessions, learning focus, academic planning</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold text-orange-700">Entertainment & Leisure</td>
                    <td className="p-4 border border-gray-300">Movie Night, Board Games, Reading, Gaming, Walking</td>
                    <td className="p-4 border border-gray-300">Weekend planning, free time activities, family fun</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Advanced Features Section --- */}
        <div className="bg-background border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Advanced Wheel Features & Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Unlimited Custom Options</h3>
              <p className="text-blue-700">Add as many options as needed to your decision wheel with instant color assignment</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-lg mb-2 text-green-800">Customizable Spin Speed</h3>
              <p className="text-green-700">Adjust wheel spinning velocity from slow dramatic spins to instant results</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-lg mb-2 text-purple-800">Visual Customization</h3>
              <p className="text-purple-700">Modify wheel size, colors, and appearance to match your preferences</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-lg mb-2 text-red-800">Instant Result Sharing</h3>
              <p className="text-red-700">Share your random selection results with others via direct links</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-lg mb-2 text-orange-800">Mobile Responsive</h3>
              <p className="text-orange-700">Perfectly optimized decision wheel experience on all devices and screen sizes</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">No Registration Required</h3>
              <p className="text-indigo-700">Completely free random picker tool with immediate access - no signup needed</p>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="bg-background border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Is this decision wheel really free to use?</h3>
              <p className="text-gray-700">Yes, our online decision wheel is completely free with no hidden costs, registration requirements, or usage limits. Enjoy unlimited spins and customizations.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">How many options can I add to the wheel?</h3>
              <p className="text-gray-700">You can add unlimited options to your custom decision wheel. The wheel automatically adjusts to accommodate all your choices while maintaining perfect visibility.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Is the random selection truly unbiased?</h3>
              <p className="text-gray-700">Absolutely. Our wheel uses advanced randomization algorithms to ensure completely fair and unbiased results every time you spin.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Can I use this for business giveaways?</h3>
              <p className="text-gray-700">Yes, many businesses use our decision wheel for social media contests, customer giveaways, and random prize selections with transparent results.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Does the wheel work on mobile devices?</h3>
              <p className="text-gray-700">Our decision wheel is fully responsive and works perfectly on smartphones, tablets, and desktop computers with touch and click support.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Enhanced Tools Navigation --- */}
      <div className="p-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <h3 className="text-xl font-semibold mb-4 text-center">Explore More Interactive Decision Tools</h3>
        <p className="text-center mb-6 text-purple-100">Discover our complete suite of free random selection and decision-making tools</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/coin-flip-dice-roll" className="p-4 rounded-lg bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
            <div className="font-semibold">Coin Flip & Dice Roll</div>
            <div className="text-sm opacity-90">Virtual coin toss and dice</div>
          </a>
          <a href="/random-number-generator" className="p-4 rounded-lg bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
            <div className="font-semibold">Random Number Generator</div>
            <div className="text-sm opacity-90">Custom range numbers</div>
          </a>
          <a href="/magic-8-ball" className="p-4 rounded-lg bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
            <div className="font-semibold">Magic 8-Ball</div>
            <div className="text-sm opacity-90">Fortune telling game</div>
          </a>
          <a href="/rock-paper-scissors" className="p-4 rounded-lg bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
            <div className="font-semibold">Rock Paper Scissors</div>
            <div className="text-sm opacity-90">Classic game digital</div>
          </a>
        </div>
      </div>
    </div>
  );
}