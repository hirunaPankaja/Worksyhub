// src/app/days-between-dates/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Clock, BookOpen } from 'lucide-react';

export default function DaysBetweenDatesPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysDiff, setDaysDiff] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculateDaysBetween();
      }
      if (event.key === 'Escape') {
        setStartDate('');
        setEndDate('');
        setDaysDiff('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [startDate, endDate]); // Dependencies updated

  const calculateDaysBetween = () => {
    if (!startDate || !endDate) {
      setDaysDiff('Please select both a start and end date.');
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setDaysDiff('Start date must be before the end date.');
      return;
    }

    // Calculate the difference in time
    const diff = Math.abs(end.getTime() - start.getTime());
    // Convert time difference to days
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    setDaysDiff(`${days} days`);
  };

  const tutorials = {
    title: "Days Between Dates Guide",
    sections: [
      {
        title: "Understanding Date Differences",
        content: [
          "Calculating days between dates helps determine the exact duration between two points in time.",
          "",
          "Calculation Method:",
          "Convert both dates to Unix timestamps (milliseconds since 1970)",
          "Calculate absolute difference between timestamps",
          "Convert milliseconds to days (divide by 86,400,000)",
          "Round up to include both start and end dates",
          "",
          "How to Use:",
          "1. Enter start date",
          "2. Enter end date", 
          "3. Press Enter or click Calculate Days",
          "4. Get exact number of days between dates"
        ]
      },
      {
        title: "Practical Applications",
        content: [
          "Project Management:",
          "Calculate project durations",
          "Track milestone deadlines",
          "Monitor progress against timelines",
          "",
          "Legal and Business:",
          "Contract period calculations",
          "Lease and rental agreements",
          "Warranty period tracking",
          "",
          "Personal Planning:",
          "Vacation planning",
          "Event countdowns",
          "Fitness challenge tracking",
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Days Between Dates Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Instantly calculate the number of days between two dates
        </p>
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Calculate Duration
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to calculate, Escape to clear
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>
        </div>

        <button
          onClick={calculateDaysBetween}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Calculate Days
        </button>

        {daysDiff && (
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Difference:</p>
            <p className="text-3xl font-bold text-foreground">{daysDiff}</p>
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
          <a href="/unix-timestamp" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Unix Timestamp
          </a>
          <a href="/countdown-timer" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Countdown Timer
          </a>
        </div>
      </div>
    </div>
  );
}