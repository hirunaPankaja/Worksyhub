// src/app/stopwatch/page.tsx
'use client';
import {Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Flag, RotateCcw, BookOpen,Utensils, Brain, ChefHat } from 'lucide-react';

export default function StopwatchPage() {
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect for stopwatch timer
  useEffect(() => {
    if (isStopwatchRunning) {
      const startTime = Date.now() - stopwatchTime;
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchTime(Date.now() - startTime);
      }, 10); // Update every 10ms for precision
    } else {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
    }
    return () => {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
    };
  }, [isStopwatchRunning, stopwatchTime]); // Added stopwatchTime to dependencies

  // Effect for keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleStopwatchStartStop();
      } else if (event.key === 'l' || event.key === 'L') {
        handleStopwatchLap();
      } else if (event.key === 'r' || event.key === 'R') {
        handleStopwatchReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isStopwatchRunning, stopwatchTime]); // Dependencies updated

  // --- Stopwatch Functions ---
  const handleStopwatchStartStop = () => {
    setIsStopwatchRunning(!isStopwatchRunning);
  };

  const handleStopwatchLap = () => {
    if (isStopwatchRunning) {
      setLaps([stopwatchTime, ...laps]);
    }
  };

  const handleStopwatchReset = () => {
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
    setLaps([]);
  };

  const formatStopwatchTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const tutorials = {
    title: 'How to Use the Stopwatch',
    sections: [
      {
        title: 'Controls & Keyboard Shortcuts',
        content: [
          '**Start / Stop:** Click the "Start" button to begin. Click "Pause" to stop.',
          '  - **Shortcut:** Press the **Spacebar** to Start or Pause.',
          '',
          '**Lap:** Click the "Lap" button while the timer is running to record the current time without stopping.',
          '  - **Shortcut:** Press the **L** key.',
          '',
          '**Reset:** Click the "Reset" button to set the timer and all laps back to zero.',
          '  - **Shortcut:** Press the **R** key.',
          '',
          '**Display:** The time is shown in `MM:SS.ms` format (Minutes:Seconds:Hundredths of a second).',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Online Stopwatch
        </h1>
        <p className="text-lg text-muted-foreground">
          A precision stopwatch with lap timer and keyboard shortcuts.
        </p>
      </div>

      {/* --- Stopwatch Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">Stopwatch</h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Space to Start/Stop, L to Lap, R to Reset
        </p>

        <div className="text-center p-8 rounded-lg bg-muted">
          <p className="text-7xl font-bold font-mono text-foreground">
            {formatStopwatchTime(stopwatchTime)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleStopwatchStartStop}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium transition-all ${
              isStopwatchRunning
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isStopwatchRunning ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            {isStopwatchRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleStopwatchLap}
            disabled={!isStopwatchRunning && stopwatchTime === 0}
            className="flex items-center justify-center gap-2 w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-all disabled:opacity-50"
          >
            <Flag className="h-5 w-5" />
            Lap
          </button>
          <button
            onClick={handleStopwatchReset}
            disabled={isStopwatchRunning || stopwatchTime === 0}
            className="flex items-center justify-center gap-2 w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-all disabled:opacity-50"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="space-y-3 max-h-60 overflow-y-auto p-4 rounded-lg bg-background border">
            <h3 className="text-lg font-semibold">Laps</h3>
            <ul className="space-y-2">
              {laps.map((lap, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm p-3 rounded bg-muted"
                >
                  <span className="text-muted-foreground">
                    Lap {laps.length - index}
                  </span>
                  <span className="font-medium font-mono text-foreground">
                    {formatStopwatchTime(lap)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use the Stopwatch
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

        {/* --- Practical Applications --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Practical Applications
          </h2>
          <div className="prose prose-lg max-w-none text-foreground grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" />Fitness & Training</h3>
              <p>Time your runs, workouts, or rest periods. Use the **Lap** feature to track your time for each mile, set, or interval.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2"><ChefHat className="h-5 w-5 text-primary" />Cooking & Kitchen</h3>
              <p>Precisely time cooking steps, like steeping tea for exactly 3 minutes, searing a steak, or letting dough rise.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2"><Brain className="h-5 w-5 text-primary" />Study & Productivity</h3>
              <p>Use the stopwatch to time your study sessions (e.g., the Pomodoro Technique) or to see how long it takes to complete a task.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/world-clock" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            World Clock
          </a>
          <a href="/time-zone-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Time Zone Converter
          </a>
          <a href="/age-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Age Calculator
          </a>
          <a href="/countdown-timer" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Countdown Timer
          </a>
        </div>
      </div>
    </div>
  );
}