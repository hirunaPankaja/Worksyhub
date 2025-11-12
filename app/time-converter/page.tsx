// src/app/time-zone-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Globe, ArrowRight, BookOpen } from 'lucide-react';

const timeZones = [
  { label: 'UTC', value: 'UTC' },
  { label: 'New York (EST)', value: 'America/New_York' },
  { label: 'Los Angeles (PST)', value: 'America/Los_Angeles' },
  { label: 'London (GMT)', value: 'Europe/London' },
  { label: 'Paris (CET)', value: 'Europe/Paris' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
  { label: 'Dubai (GST)', value: 'Asia/Dubai' },
  { label: 'Sydney (AEST)', value: 'Australia/Sydney' },
  { label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
  { label: 'Singapore (SGT)', value: 'Asia/Singapore' },
];

export default function TimeZoneConverterPage() {
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('America/New_York');
  const [inputTime, setInputTime] = useState('12:00');
  const [convertedTime, setConvertedTime] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        convertTimeZone();
      }
      if (event.key === 'Escape') {
        setInputTime('12:00');
        setConvertedTime('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputTime, fromZone, toZone]);

  const convertTimeZone = () => {
    try {
      // Create a date object. We can use any date, just need the time.
      const date = new Date();
      const [hours, minutes] = inputTime.split(':');
      
      // We'll use Intl.DateTimeFormat to parse the time *as if* it's in the fromZone
      // This is a common trick to handle time-only strings
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: fromZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const parts = formatter.formatToParts(date);
      const year = parts.find(p => p.type === 'year')?.value;
      const month = parts.find(p => p.type === 'month')?.value;
      const day = parts.find(p => p.type === 'day')?.value;

      // Construct a new date object representing the input time in the "from" zone
      const fromDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

      // Now, convert this valid date to the "to" zone
      const toFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: toZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 12-hour clock for display
      });
      
      setConvertedTime(toFormatter.format(fromDate));
    } catch (error) {
      setConvertedTime('Invalid time');
    }
  };

  const tutorials = {
    title: "Time Zone Conversion Guide",
    sections: [
      {
        title: "Understanding Time Zones",
        content: [
          "Time zones are regions of Earth that have the same standard time. The world is divided into 24 time zones, each roughly 15 degrees of longitude apart.",
          "",
          "Key Time Zone Concepts:",
          "UTC (Coordinated Universal Time): The primary time standard by which the world regulates clocks and time",
          "GMT (Greenwich Mean Time): The mean solar time at the Royal Observatory in Greenwich, London",
          "DST (Daylight Saving Time): The practice of advancing clocks during warmer months",
          "",
          "How to Use:",
          "1. Select 'From' time zone",
          "2. Select 'To' time zone", 
          "3. Enter time to convert",
          "4. Press Enter or click Convert"
        ]
      },
      {
        title: "Practical Applications",
        content: [
          "International Business:",
          "Schedule meetings across different time zones",
          "Coordinate with international teams",
          "",
          "Travel Planning:",
          "Plan flight arrivals and departures",
          "Adjust to local time for jet lag management",
          "",
          "Example: Convert 3:00 PM EST to PST",
          "3:00 PM EST = 12:00 PM PST (3 hours difference)"
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Time Zone Converter</h1>
        <p className="text-lg text-muted-foreground">
          Convert time zones instantly between UTC, EST, PST, GMT, and more
        </p>
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Convert Time
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to convert, Escape to clear
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">From Time Zone</label>
            <select
              value={fromZone}
              onChange={(e) => setFromZone(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
            >
              {timeZones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">To Time Zone</label>
            <select
              value={toZone}
              onChange={(e) => setToZone(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
            >
              {timeZones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Time to Convert</label>
          <input
            type="time"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        <button
          onClick={convertTimeZone}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
        >
          Convert Time
          <ArrowRight className="h-4 w-4" />
        </button>

        {convertedTime && (
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Converted Time:</p>
            <p className="text-3xl font-bold text-foreground">{convertedTime}</p>
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
          <a href="/age-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Age Calculator
          </a>
          <a href="/days-between-dates" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Days Between Dates
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