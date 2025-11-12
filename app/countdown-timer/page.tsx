// src/app/countdown-timer/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Timer, BookOpen } from 'lucide-react';

export default function CountdownTimerPage() {
  const [countdownDate, setCountdownDate] = useState('');
  const [countdown, setCountdown] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to calculate the countdown
  const calculateCountdown = () => {
    if (!countdownDate) {
      setCountdown('Please select a target date and time.');
      return;
    }
    
    // Clear any existing timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const updateTimer = () => {
      const target = new Date(countdownDate);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff < 0) {
        setCountdown('Time has passed!');
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
      );
    };

    updateTimer(); // Run once immediately
    intervalRef.current = setInterval(updateTimer, 1000); // Update every second
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculateCountdown();
      }
      if (event.key === 'Escape') {
        setCountdownDate('');
        setCountdown('');
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      // Clear interval on component unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [countdownDate]); // Dependency on countdownDate

  // Clear interval when countdownDate is changed
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [countdownDate]);

  const tutorials = {
    title: "Countdown Timer Guide",
    sections: [
      {
        title: "Understanding Countdown Calculations",
        content: [
          "Countdown timers calculate the time remaining until a specific future date and time, breaking it down into days, hours, and minutes.",
          "",
          "Calculation Method:",
          "Get current date and time",
          "Calculate difference to target date",
          "Break down into days, hours, minutes, and seconds",
          "Update in real-time",
          "",
          "How to Use:",
          "1. Enter target date and time using the picker.",
          "2. Press Enter or click 'Start Countdown'.",
          "3. The timer will start and update live every second.",
        ]
      },
      {
        title: "Practical Applications",
        content: [
          "Event Planning:",
          "Wedding countdowns",
          "Conference and meeting preparation",
          "Holiday anticipation",
          "",
          "Project Management:",
          "Project deadline tracking",
          "Launch countdowns",
          "Milestone reminders",
          "",
          "Personal Goals:",
          "Fitness challenge countdowns",
          "Vacation countdowns",
          "Birthday and anniversary reminders",
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Countdown Timer</h1>
        <p className="text-lg text-muted-foreground">
          Count down to any date and time, live to the second
        </p>
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">Set Your Date</h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to start, Escape to clear
        </p>

        <div>
          <label className="block text-sm font-medium mb-2">Target Date & Time</label>
          <input
            type="datetime-local"
            value={countdownDate}
            onChange={(e) => setCountdownDate(e.target.value)}
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <button
          onClick={calculateCountdown}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Start Countdown
        </button>

        {countdown && (
          <div className="p-6 rounded-lg bg-muted text-center">
            <p className="text-sm text-muted-foreground mb-2">Time Remaining:</p>
            <p className="text-5xl font-bold font-mono text-primary">
              {countdown}
            </p>
          </div>
        )}
      </div>

      {/* --- Tutorials Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Tutorials & Guides</h2>
        </div>

        <div className="bg-background border rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            {tutorials.title}
          </h3>
          
          <div className="space-y-6">
            {tutorials.sections.map((section: { title: string, content: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h4>
                
                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line: string, lineIndex: number) => (
                    <div key={lineIndex} className="mb-3">
                      {line.startsWith('**') && line.endsWith('**') ? (
                        <strong className="text-foreground text-lg">{line.slice(2, -2)}</strong>
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
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/time-zone-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Time Zone Converter
          </a>
          <a href="/age-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Age Calculator
          </a>
          <a href="/days-between-dates" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Days Between Dates
          </a>
          <a href="/unix-timestamp" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Unix Timestamp
          </a>
        </div>
      </div>
    </div>
  );
}