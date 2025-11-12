// src/app/sleep-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Moon, BookOpen, Sunrise, Bed, Clock } from 'lucide-react';

export default function SleepCalculatorPage() {
  const [calcMode, setCalcMode] = useState<'wake' | 'bed'>('wake');
  const [targetTime, setTargetTime] = useState(
    new Date().toTimeString().substring(0, 5)
  );
  const [sleepResults, setSleepResults] = useState<string[]>([]);

  // Calculate on load
  useEffect(() => {
    calculateSleepTimes();
  }, [calcMode, targetTime]);

  const calculateSleepTimes = () => {
    const [hours, minutes] = targetTime.split(':').map(Number);
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);

    const FALL_ASLEEP_TIME = 15 * 60 * 1000; // 15 minutes in ms
    const SLEEP_CYCLE = 90 * 60 * 1000; // 90 minutes in ms
    const results: string[] = [];

    if (calcMode === 'wake') {
      // User wants to WAKE UP at targetTime. Calculate bed times.
      const fallAsleepTarget = new Date(targetDate.getTime() - FALL_ASLEEP_TIME);
      for (let i = 6; i >= 3; i--) { // 6 down to 3 cycles
        const bedtime = new Date(fallAsleepTarget.getTime() - i * SLEEP_CYCLE);
        results.push(bedtime.toLocaleTimeString('en-US', { timeStyle: 'short' }));
      }
    } else {
      // User wants to GO TO BED at targetTime. Calculate wake times.
      const fallAsleepStart = new Date(targetDate.getTime() + FALL_ASLEEP_TIME);
      for (let i = 4; i <= 6; i++) { // 4 up to 6 cycles
        const waketime = new Date(fallAsleepStart.getTime() + i * SLEEP_CYCLE);
        results.push(waketime.toLocaleTimeString('en-US', { timeStyle: 'short' }));
      }
    }
    setSleepResults(results);
  };

  const tutorials = {
    title: 'Sleep Cycle Calculator Guide',
    sections: [
      {
        title: 'How to Use the Sleep Calculator',
        content: [
          '**1. Choose Your Goal:** Select either "I want to wake up at..." or "I want to go to bed at...".',
          '**2. Set the Time:** Use the time picker to set your desired wake-up or bedtime.',
          '**3. View Results:** The calculator instantly shows you the best times. These times are based on 90-minute sleep cycles.',
          '',
          'The calculations automatically include the **15 minutes** it takes the average person to fall asleep.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Sleep Cycle Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Find the perfect time to wake up or go to bed.
        </p>
      </div>

      {/* --- Sleep Calculator Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Calculate Your Sleep
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCalcMode('wake')}
            className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              calcMode === 'wake'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <Sunrise className="h-5 w-5" />
            I want to wake up at...
          </button>
          <button
            onClick={() => setCalcMode('bed')}
            className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              calcMode === 'bed'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <Bed className="h-5 w-5" />I want to go to bed at...
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {calcMode === 'wake' ? 'Target Wake Up Time' : 'Target Bedtime'}
          </label>
          <input
            type="time"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>
        
        {sleepResults.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">
              {calcMode === 'wake'
                ? 'You should go to bed at one of the following times:'
                : 'You should wake up at one of the following times:'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sleepResults.map((time, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted text-center"
                >
                  <p className="text-2xl font-bold text-primary">{time}</p>
                  <p className="text-sm text-muted-foreground">
                    {calcMode === 'wake'
                      ? `${6 - index} sleep cycles`
                      : `${4 + index} sleep cycles`}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              A good night's sleep typically consists of 5-6 full cycles. Times include a 15-minute average to fall asleep.
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
            How This Calculator Works
          </h2>
          <div className="space-y-6">
            {tutorials.sections.map((section: { title: string, content: string[] }, sectionIndex: number) => (
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

        {/* --- What is a Sleep Cycle? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            What is a Sleep Cycle?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Your sleep isn't one long, unchanging state. Instead, you cycle through different stages of sleep: Light Sleep, Deep Sleep, and REM (Rapid Eye Movement) sleep.</p>
            <p>One full cycle through these stages takes an average of **90 minutes**. </p>
            <p>The key to waking up refreshed is to wake up at the **end** of a cycle, not in the middle of it. Waking up during a deep sleep phase is what causes "sleep inertia"—that groggy, confused, and heavy feeling that can last for an hour or more.</p>
            
            <h3 className="text-xl font-semibold mt-6">Recommended Sleep</h3>
            <p>While one or two cycles might work for a quick nap, a healthy night of sleep consists of multiple full cycles.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 border border-border">Sleep Cycles</th>
                    <th className="p-3 border border-border">Total Sleep Time</th>
                    <th className="p-3 border border-border">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border font-semibold">6 Cycles</td>
                    <td className="p-3 border border-border font-mono">9 hours</td>
                    <td className="p-3 border border-border">Ideal</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-semibold">5 Cycles</td>
                    <td className="p-3 border border-border font-mono">7.5 hours</td>
                    <td className="p-3 border border-border">Recommended</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-semibold">4 Cycles</td>
                    <td className="p-3 border border-border font-mono">6 hours</td>
                    <td className="p-3 border border-border">Minimum</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-semibold">3 Cycles</td>
                    <td className="p-3 border border-border font-mono">4.5 hours</td>
                    <td className="p-3 border border-border">Not Recommended</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/mood-tracker" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Mood Tracker
          </a>
          <a href="/bmi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            BMI Calculator
          </a>
          <a href="/time-zone-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Time Zone Converter
          </a>
          <a href="/" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}