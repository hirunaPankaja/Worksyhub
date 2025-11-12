// src/app/unix-timestamp/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Hash, BookOpen } from 'lucide-react';

export default function UnixTimestampPage() {
  const [timestamp, setTimestamp] = useState('');
  const [dateFromTimestamp, setDateFromTimestamp] = useState('');

  const [dateTime, setDateTime] = useState('');
  const [timestampFromDate, setTimestampFromDate] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (timestamp) {
          convertTimestampToDate();
        } else if (dateTime) {
          convertDateToTimestamp();
        }
      }
      if (event.key === 'Escape') {
        setTimestamp('');
        setDateFromTimestamp('');
        setDateTime('');
        setTimestampFromDate('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [timestamp, dateTime]);

  const convertTimestampToDate = () => {
    try {
      if (timestamp.length === 0) {
        setDateFromTimestamp('');
        return;
      }
      // Check if timestamp is in milliseconds (13 digits) or seconds (10 digits)
      const value = parseInt(timestamp);
      const date = new Date(value * (timestamp.length === 10 ? 1000 : 1));
      
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      
      setDateFromTimestamp(date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      }));
    } catch (error) {
      setDateFromTimestamp('Invalid timestamp');
    }
  };

  const convertDateToTimestamp = () => {
    try {
      if (!dateTime) {
        setTimestampFromDate('');
        return;
      }
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      const ts = Math.floor(date.getTime() / 1000);
      setTimestampFromDate(String(ts));
    } catch (error) {
      setTimestampFromDate('Invalid date/time');
    }
  };

  // Get current timestamp for display
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tutorials = {
    title: "Unix Timestamp Guide",
    sections: [
      {
        title: "Understanding Unix Timestamps",
        content: [
          "Unix timestamp (also known as Epoch time) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).",
          "",
          "Key Characteristics:",
          "Timezone-independent representation",
          "Universal across all systems",
          "Easy for calculations and comparisons",
          "Standard in programming and databases",
          "",
          "How to Use:",
          "**Timestamp to Date:** Enter a 10-digit (seconds) or 13-digit (milliseconds) timestamp and click 'Convert to Date'.",
          "**Date to Timestamp:** Select a date and time using the date picker and click 'Convert to Timestamp'."
        ]
      },
      {
        title: "Practical Applications",
        content: [
          "Software Development:",
          "Database timestamp storage",
          "Log file timestamps",
          "API response timestamps",
          "",
          "Data Analysis:",
          "Time series data processing",
          "Event sequencing and ordering",
          "Performance monitoring",
          "",
          "Example: Timestamp 1609459200",
          "Converts to: January 1, 2021, 12:00:00 AM UTC"
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Unix Timestamp Converter
        </h1>
        <p className="text-lg text-muted-foreground">
          Convert Unix/Epoch time to a readable date, or a date to a timestamp.
        </p>
      </div>

      {/* Current Timestamp Display */}
      <div className="p-4 rounded-lg bg-muted text-center">
        <p className="text-sm text-muted-foreground mb-1">Current Unix Timestamp (seconds):</p>
        <p className="text-3xl font-bold font-mono text-primary">{currentTimestamp}</p>
      </div>

      {/* Timestamp to Date Converter */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Convert Timestamp to Date
        </h2>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Unix Timestamp (seconds or milliseconds)
          </label>
          <input
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="e.g., 1609459200"
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <button
          onClick={convertTimestampToDate}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Convert to Date
        </button>

        {dateFromTimestamp && (
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Human-Readable Date:</p>
            <p className="text-2xl font-bold text-foreground">
              {dateFromTimestamp}
            </p>
          </div>
        )}
      </div>

      {/* Date to Timestamp Converter */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Convert Date to Timestamp
        </h2>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Date & Time
          </label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <button
          onClick={convertDateToTimestamp}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Convert to Timestamp
        </button>

        {timestampFromDate && (
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Unix Timestamp (seconds):</p>
            <p className="text-2xl font-bold font-mono text-foreground">
              {timestampFromDate}
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
          <a href="/countdown-timer" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Countdown Timer
          </a>
        </div>
      </div>
    </div>
  );
}