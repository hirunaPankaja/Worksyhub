// src/app/clock-tools/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import {
  Clock,
  Timer,
  Play,
  Pause,
  Flag,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

const worldTimeZones = [
  { label: 'New York (EST)', value: 'America/New_York' },
  { label: 'Los Angeles (PST)', value: 'America/Los_Angeles' },
  { label: 'London (GMT)', value: 'Europe/London' },
  { label: 'Paris (CET)', value: 'Europe/Paris' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
  { label: 'Sydney (AEST)', value: 'Australia/Sydney' },
  { label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
];

// --- NEW: A wrapper component to use Suspense ---
export default function ClockToolsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClockToolsPage />
    </Suspense>
  );
}

function ClockToolsPage() { // Renamed from default export
  const [activeTab, setActiveTab] = useState('clock');
  const [activeTutorial, setActiveTutorial] = useState('clock');

  // Clock state
  const [localTime, setLocalTime] = useState(new Date());
  const [clockType, setClockType] = useState('digital');
  const [hourHand, setHourHand] = useState(0);
  const [minuteHand, setMinuteHand] = useState(0);
  const [secondHand, setSecondHand] = useState(0);

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const tabs = [
    { id: 'clock', label: 'World Clock', icon: Clock },
    { id: 'stopwatch', label: 'Stopwatch', icon: Timer },
  ];

  // --- NEW: This block reads the URL query ---
  const searchParams = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, tabs]); // Added tabs to dependency array
  // --- END NEW BLOCK ---

  // Effect for updating active tutorial
  useEffect(() => {
    setActiveTutorial(activeTab);
  }, [activeTab]);

  // Effect for local clock and analog hands
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLocalTime(now);

      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      setSecondHand(seconds * 6); // 360 / 60 = 6
      setMinuteHand(minutes * 6 + seconds * 0.1); // 6 deg/min + 0.1 deg/sec
      setHourHand((hours % 12) * 30 + minutes * 0.5); // 30 deg/hr + 0.5 deg/min
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Effect for stopwatch
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
  }, [isStopwatchRunning]);

  // Effect for keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (activeTab === 'stopwatch') {
        if (event.code === 'Space') {
          event.preventDefault();
          handleStopwatchStartStop();
        } else if (event.key === 'l' || event.key === 'L') {
          handleStopwatchLap();
        } else if (event.key === 'r' || event.key === 'R') {
          handleStopwatchReset();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeTab, isStopwatchRunning, stopwatchTime]);

  // --- Clock Functions ---
  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date, timeZone: string) => {
    return date.toLocaleDateString('en-US', {
      timeZone: timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

  // --- Tutorials Content ---
  const tutorials = {
    clock: {
      title: 'World Clock Guide',
      sections: [
        {
          title: 'Understanding Your Clock',
          content: [
            'This tool provides a central hub for viewing time across the world, relative to your own local time.',
            '**Local Clock:**',
            'The main clock shows your current local time, based on your device settings.',
            'You can toggle between a classic "Analog" view and a "Digital" view.',
            '',
            '**Analog Clock:**',
            'Shows time with rotating hands:',
            '  - Short, thick hand: Hours',
            '  - Long, thinner hand: Minutes',
            '  - Red, thin hand: Seconds',
            '',
            '**World Clock List:**',
            'Below your local clock, you can see the current time in major international cities.',
            'This list accounts for different time zones and Daylight Saving Time (DST) automatically.',
          ],
        },
        {
          title: 'Practical Applications',
          content: [
            '**Scheduling Meetings:**',
            'Easily find a suitable time for international calls or meetings.',
            '',
            '**Travel Planning:**',
            'Check the time at your destination before you travel.',
            '',
            '**Staying Connected:**',
            'Know when is a good time to call friends or family abroad.',
          ],
        },
      ],
    },
    stopwatch: {
      title: 'Stopwatch Guide',
      sections: [
        {
          title: 'How to Use the Stopwatch',
          content: [
            '**Controls:**',
            '  - **Start / Stop (Spacebar):** Press to begin timing. Press again to pause.',
            '  - **Lap (L key):** Press while the stopwatch is running to record the current time without stopping the timer.',
            '  - **Reset (R key):** Press to stop the timer and reset it (and all laps) to zero.',
            '',
            '**Display:**',
            'The time is displayed in `MM:SS.ms` format (Minutes:Seconds.Hundredths of a second).',
            '',
            '**Laps List:**',
            'Each time you press "Lap", the current time is added to the top of the list below the timer, allowing you to track split times.',
          ],
        },
        {
          title: 'Practical Applications',
          content: [
            '**Fitness & Training:**',
            'Time your runs, workouts, or rest periods. Use the lap feature to track time for each set or mile.',
            '',
            '**Cooking:**',
            'Precisely time cooking steps, like steeping tea or searing a steak.',
            '',
            '**Productivity:**',
            'Time tasks to see how long they take (e.g., for the Pomodoro Technique).',
            '',
            '**Studying:**',
            'Time yourself on practice exams or quizzes to improve speed.',
          ],
        },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Clock & Timer Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Your local & world clock, plus a precision stopwatch with lap timer
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

      {activeTab === 'clock' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Local & World Clock
          </h2>

          {/* Local Clock Section */}
          <div className="p-6 rounded-lg bg-muted flex flex-col items-center space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setClockType('digital')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  clockType === 'digital'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground'
                }`}
              >
                Digital
              </button>
              <button
                onClick={() => setClockType('analog')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  clockType === 'analog'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground'
                }`}
              >
                Analog
              </button>
            </div>

            {clockType === 'digital' ? (
              <div className="text-center">
                <p className="text-6xl font-bold font-mono text-foreground">
                  {localTime.toLocaleTimeString('en-US', { hour12: false })}
                </p>
                <p className="text-lg text-muted-foreground">
                  {localTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ) : (
              <div className="w-64 h-64 bg-background rounded-full border-4 border-foreground relative flex items-center justify-center">
                {/* Clock face numbers */}
                <span className="absolute top-3 text-lg font-bold">12</span>
                <span className="absolute bottom-3 text-lg font-bold">6</span>
                <span className="absolute left-4 text-lg font-bold">9</span>
                <span className="absolute right-4 text-lg font-bold">3</span>
                {/* Center dot */}
                <div className="w-3 h-3 bg-foreground rounded-full z-20"></div>
                {/* Hour Hand */}
                <div
                  className="w-1.5 h-16 bg-foreground absolute bottom-1/2 left-1/2 -ml-0.5 rounded-t-full origin-bottom z-10"
                  style={{ transform: `rotate(${hourHand}deg)` }}
                ></div>
                {/* Minute Hand */}
                <div
                  className="w-1 h-24 bg-foreground absolute bottom-1/2 left-1/2 -ml-0.5 rounded-t-full origin-bottom z-10"
                  style={{ transform: `rotate(${minuteHand}deg)` }}
                ></div>
                {/* Second Hand */}
                <div
                  className="w-0.5 h-28 bg-red-500 absolute bottom-1/2 left-1/2 -ml-0.5 rounded-t-full origin-bottom z-10"
                  style={{ transform: `rotate(${secondHand}deg)` }}
                ></div>
              </div>
            )}
          </div>

          {/* World Clock List */}
          <div className="space-y-3">
            {worldTimeZones.map((tz) => (
              <div
                key={tz.value}
                className="flex justify-between items-center p-4 rounded-lg bg-background border"
              >
                <div>
                  <p className="text-lg font-medium text-foreground">
                    {tz.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(localTime, tz.value)}
                  </p>
                </div>
                <p className="text-2xl font-semibold font-mono text-foreground">
                  {formatTime(localTime, tz.value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'stopwatch' && (
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
                {/* ===> FIXED: Added types and keys <=== */}
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
                {activeTutorial === 'clock' &&
                  'The analog clock hands update every second in real-time, just like a real wall clock!'}
                {activeTutorial === 'stopwatch' &&
                  'Use the keyboard shortcuts (Space, L, R) for faster and more precise stopwatch control during activities.'}
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
            href="/time-converter"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Time/Date Tools
          </a>
          <a
            href="/measurement-converter"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Measurement Converter
          </a>
          <a
            href="/calculator"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Calculator
          </a>
          <a
            href="/"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}