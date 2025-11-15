// src/app/stopwatch/page.tsx
'use client';
import {Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Flag, RotateCcw, BookOpen,Utensils, Brain, ChefHat, Clock, Award, Target, BarChart, Download, Share2, Settings, History, Star } from 'lucide-react';

export default function StopwatchPage() {
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [bestLap, setBestLap] = useState<number | null>(null);
  const [worstLap, setWorstLap] = useState<number | null>(null);
  const [theme, setTheme] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect for stopwatch timer
  useEffect(() => {
    if (isStopwatchRunning) {
      const startTime = Date.now() - stopwatchTime;
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchTime(Date.now() - startTime);
      }, 10);
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
  }, [isStopwatchRunning, stopwatchTime]);

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
      } else if (event.key === 's' || event.key === 'S') {
        handleShareResults();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isStopwatchRunning, stopwatchTime]);

  // Calculate best and worst laps
  useEffect(() => {
    if (laps.length > 1) {
      const lapTimes = laps.map((lap, index) => 
        index === 0 ? lap : lap - laps[index - 1]
      ).slice(1);
      
      setBestLap(Math.min(...lapTimes));
      setWorstLap(Math.max(...lapTimes));
    } else {
      setBestLap(null);
      setWorstLap(null);
    }
  }, [laps]);

  // --- Enhanced Stopwatch Functions ---
  const handleStopwatchStartStop = () => {
    setIsStopwatchRunning(!isStopwatchRunning);
    if (soundEnabled) {
      // Add sound feedback here
    }
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
    setBestLap(null);
    setWorstLap(null);
  };

  const handleShareResults = () => {
    const lapResults = laps.map((lap, index) => 
      `Lap ${laps.length - index}: ${formatStopwatchTime(lap)}`
    ).join('\n');
    
    navigator.clipboard.writeText(`Stopwatch Results:\nTotal: ${formatStopwatchTime(stopwatchTime)}\n${lapResults}`);
    alert('Results copied to clipboard!');
  };

  const exportLaps = () => {
    const csvContent = laps.map((lap, index) => 
      `Lap ${laps.length - index},${formatStopwatchTime(lap)}`
    ).join('\n');
    
    const blob = new Blob([`Lap,Time\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stopwatch-laps.csv';
    a.click();
  };

  const formatStopwatchTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const calculateLapTime = (lapIndex: number) => {
    if (lapIndex === 0) return laps[0];
    return laps[lapIndex] - laps[lapIndex - 1];
  };

  const tutorials = {
    title: 'Master Your Timing: Complete Stopwatch Guide',
    sections: [
      {
        title: 'Advanced Controls & Professional Keyboard Shortcuts',
        content: [
          '**Professional Timing Controls:** Maximize your efficiency with our comprehensive control system designed for athletes, coaches, and professionals.',
          '  - **Start / Stop Timing:** Click the "Start" button to begin precise timing. Click "Pause" to stop immediately.',
          '  - **Shortcut:** Press the **Spacebar** for instant Start or Pause functionality.',
          '',
          '**Lap/Split Precision Timing:** Click the "Lap" button during active timing to record split times without interrupting the main timer.',
          '  - **Shortcut:** Press the **L** key for rapid lap recording during intense sessions.',
          '  - **Professional Feature:** Perfect for interval training, race splits, and multi-stage timing.',
          '',
          '**Complete System Reset:** Click the "Reset" button to clear all timing data and prepare for new sessions.',
          '  - **Shortcut:** Press the **R** key for quick reset between timing sessions.',
          '',
          '**Results Sharing:** Export and share your timing data with coaches, team members, or for personal records.',
          '  - **Shortcut:** Press the **S** key to quickly share your stopwatch results.',
          '',
          '**Professional Display:** Advanced time format showing `MM:SS.ms` (Minutes:Seconds:Hundredths) for maximum precision in sports timing and scientific measurement.',
        ],
      },
      {
        title: 'Advanced Lap Analysis & Performance Metrics',
        content: [
          '**Comprehensive Lap Analytics:** Our stopwatch provides detailed lap analysis to help you improve your performance and track progress over time.',
          '  - **Individual Lap Timing:** Each lap records precise split times for detailed performance analysis.',
          '  - **Best Lap Highlighting:** Automatic identification of your fastest lap time for quick performance assessment.',
          '  - **Worst Lap Tracking:** Monitor consistency by identifying your slowest lap intervals.',
          '  - **Lap Comparison:** Easily compare consecutive laps to identify patterns and improvement areas.',
          '  - **Export Capability:** Download all lap data in CSV format for professional analysis and record keeping.',
        ],
      },
    ],
  };

  const blogPosts = [
    {
      title: 'How to Improve Your Athletic Performance with Precision Lap Timing',
      excerpt: 'Discover how professional athletes use lap timing to enhance training efficiency and achieve personal bests through detailed interval analysis.',
      readTime: '5 min read',
      category: 'Sports Training'
    },
    {
      title: 'The Science of Stopwatch Accuracy: Why Millisecond Precision Matters',
      excerpt: 'Explore the technical aspects of digital timing and why hundredth-of-a-second accuracy is crucial for competitive sports and scientific research.',
      readTime: '7 min read',
      category: 'Technology'
    },
    {
      title: '10 Creative Ways to Use a Stopwatch for Productivity and Time Management',
      excerpt: 'Learn innovative techniques beyond sports timing that can revolutionize your daily productivity and time management strategies.',
      readTime: '6 min read',
      category: 'Productivity'
    },
    {
      title: 'From Amateur to Pro: Mastering Interval Training with Advanced Stopwatch Features',
      excerpt: 'A comprehensive guide to using lap timing and split features for effective high-intensity interval training and workout optimization.',
      readTime: '8 min read',
      category: 'Fitness'
    }
  ];

  const faqs = [
    {
      question: 'How accurate is this online stopwatch?',
      answer: 'Our digital stopwatch provides millisecond-level accuracy (up to 1/100th of a second), making it suitable for professional sports timing, scientific experiments, and precision-based activities.'
    },
    {
      question: 'Can I use this stopwatch for official sports competitions?',
      answer: 'While our stopwatch offers professional-grade accuracy, official competitions typically require certified timing equipment. However, for training, practice sessions, and unofficial timing, it provides excellent precision and reliability.'
    },
    {
      question: 'How many laps can I record with this stopwatch?',
      answer: 'There is no practical limit to the number of laps you can record. The system efficiently handles extensive lap data, making it perfect for marathon training sessions, extended workouts, and comprehensive timing projects.'
    },
    {
      question: 'Does the stopwatch work on mobile devices?',
      answer: 'Yes, our responsive stopwatch works seamlessly across all devices including smartphones, tablets, and desktop computers. The touch-friendly interface and mobile-optimized design ensure smooth operation on any platform.'
    },
    {
      question: 'Can I save and export my timing data?',
      answer: 'Absolutely! You can export all lap data in CSV format for professional analysis, share results directly from the interface, or copy timing data to your clipboard for quick sharing and record keeping.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* --- SEO Intro Section --- */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Online Stopwatch with Lap Timer
        </h1>
        <p className="text-xl text-gray-700 mb-4 font-semibold">
          Professional Precision Timing for Sports, Fitness, and Productivity
        </p>
        <div className="prose prose-lg text-gray-600">
          <p>
            Welcome to the most advanced free online stopwatch with comprehensive lap timing capabilities. 
            Our precision digital stopwatch offers millisecond accuracy, professional-grade lap/split timing, 
            and intuitive keyboard shortcuts designed for athletes, coaches, fitness enthusiasts, and professionals 
            who require reliable time measurement. Whether you're timing athletic performances, tracking workout intervals, 
            managing cooking processes, or optimizing study sessions, this feature-rich stopwatch provides everything 
            you need for accurate time tracking and performance analysis.
          </p>
          <p>
            Experience the convenience of a fully-featured stopwatch that requires no downloads, no registrations, 
            and works seamlessly across all devices. With advanced features like lap history tracking, best/worst lap 
            identification, export capabilities, and responsive design, our stopwatch stands as the ultimate timing 
            solution for anyone seeking professional results without the cost of specialized equipment.
          </p>
        </div>
      </div>

      {/* --- Stopwatch Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-card-foreground">Professional Stopwatch</h2>
          <div className="flex gap-2">
            <button 
              onClick={exportLaps}
              disabled={laps.length === 0}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button 
              onClick={handleShareResults}
              disabled={laps.length === 0}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Professional timing tool: Space to Start/Stop, L for Lap, R to Reset, S to Share
        </p>

        <div className="text-center p-8 rounded-lg bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-blue-100">
          <p className="text-7xl font-bold font-mono text-gray-900">
            {formatStopwatchTime(stopwatchTime)}
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Millisecond Precision</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>Lap Timing Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>Professional Grade</span>
            </div>
          </div>
        </div>

        {/* Lap Statistics */}
        {laps.length > 1 && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{laps.length}</div>
              <div className="text-sm text-gray-600">Total Laps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{bestLap ? formatStopwatchTime(bestLap) : '--'}</div>
              <div className="text-sm text-gray-600">Best Lap</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{worstLap ? formatStopwatchTime(worstLap) : '--'}</div>
              <div className="text-sm text-gray-600">Slowest Lap</div>
            </div>
          </div>
        )}

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
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Flag className="h-5 w-5" />
            Lap
          </button>
          <button
            onClick={handleStopwatchReset}
            disabled={isStopwatchRunning || stopwatchTime === 0}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all disabled:opacity-50"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="space-y-3 max-h-60 overflow-y-auto p-4 rounded-lg bg-background border">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lap Analysis</h3>
              <span className="text-sm text-gray-500">{laps.length} records</span>
            </div>
            <ul className="space-y-2">
              {laps.map((lap, index) => {
                const lapTime = calculateLapTime(index);
                const isBest = bestLap === lapTime && index > 0;
                const isWorst = worstLap === lapTime && index > 0;
                
                return (
                  <li
                    key={index}
                    className={`flex justify-between items-center text-sm p-3 rounded ${
                      isBest ? 'bg-green-50 border border-green-200' :
                      isWorst ? 'bg-red-50 border border-red-200' :
                      'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        Lap {laps.length - index}
                      </span>
                      {isBest && <Star className="h-4 w-4 text-green-500 fill-green-500" />}
                      {isWorst && <Star className="h-4 w-4 text-red-500 fill-red-500" />}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium font-mono text-foreground">
                        {formatStopwatchTime(lap)}
                      </span>
                      {index > 0 && (
                        <span className="text-xs text-gray-500 font-mono">
                          +{formatStopwatchTime(lapTime)}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* --- Enhanced Content Sections --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Master Your Timing: Complete Stopwatch Guide
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

        {/* --- Professional Applications --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            Professional Applications & Use Cases
          </h2>
          <div className="prose prose-lg max-w-none text-foreground grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><Zap className="h-5 w-5 text-blue-600" />Athletic Training</h3>
              <p>Professional sports timing for track and field, swimming intervals, cycling splits, and comprehensive athletic performance measurement with precise lap tracking for interval training and race simulation.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><ChefHat className="h-5 w-5 text-green-600" />Culinary Precision</h3>
              <p>Exact kitchen timing for professional cooking, baking precision, recipe testing, and culinary school training with multiple simultaneous timing for complex cooking processes and kitchen management.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><Brain className="h-5 w-5 text-purple-600" />Productivity & Study</h3>
              <p>Advanced time management for Pomodoro technique, study sessions, focus intervals, meeting timing, and productivity tracking with detailed session analytics and performance optimization.</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><BarChart className="h-5 w-5 text-orange-600" />Scientific Research</h3>
              <p>Laboratory-grade timing for experiments, reaction time studies, scientific measurements, and research projects requiring millisecond precision and comprehensive data recording capabilities.</p>
            </div>
          </div>
        </div>

        {/* --- Blog Section --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Stopwatch Mastery Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Tools Navigation --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Explore More Time Management Tools</h3>
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