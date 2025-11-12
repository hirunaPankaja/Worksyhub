// src/app/world-clock/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Clock, BookOpen, Globe, MapPin } from 'lucide-react';

const worldTimeZones = [
  { label: 'New York (EST)', value: 'America/New_York' },
  { label: 'Los Angeles (PST)', value: 'America/Los_Angeles' },
  { label: 'London (GMT)', value: 'Europe/London' },
  { label: 'Paris (CET)', value: 'Europe/Paris' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
  { label: 'Sydney (AEST)', value: 'Australia/Sydney' },
  { label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
  { label: 'Dubai (GST)', value: 'Asia/Dubai' },
  { label: 'Singapore (SGT)', value: 'Asia/Singapore' },
];

export default function WorldClockPage() {
  const [localTime, setLocalTime] = useState(new Date());
  const [clockType, setClockType] = useState('digital');
  const [hourHand, setHourHand] = useState(0);
  const [minuteHand, setMinuteHand] = useState(0);
  const [secondHand, setSecondHand] = useState(0);

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

  const tutorials = {
    title: 'How to Use the World Clock',
    sections: [
      {
        title: 'Understanding Your Clock',
        content: [
          'This tool provides a central hub for viewing time across the world, relative to your own local time.',
          '**Local Clock:**',
          'The main clock shows your current local time, based on your device settings. You can toggle between a classic "Analog" view and a "Digital" view.',
          '',
          '**World Clock List:**',
          'Below your local clock, you can see the current time in major international cities. This list accounts for different time zones and Daylight Saving Time (DST) automatically.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          World Clock
        </h1>
        <p className="text-lg text-muted-foreground">
          Your local time and current times from around the globe
        </p>
      </div>

      {/* --- World Clock Tool --- */}
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

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use the World Clock
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

        {/* --- Understanding Time Zones --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Understanding Time Zones
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>A time zone is a region of the globe that observes a uniform standard time for legal, commercial, and social purposes. Time zones tend to follow the boundaries of countries and their subdivisions.</p>
            
            <h3 className="text-xl font-semibold mt-6">What are UTC, GMT, EST, and PST?</h3>
            <ul className="list-disc pl-5">
              <li><strong>GMT (Greenwich Mean Time):</strong> The mean solar time at the Royal Observatory in Greenwich, London. It was formerly used as the international civil time standard.</li>
              <li><strong>UTC (Coordinated Universal Time):</strong> The primary time standard by which the world regulates clocks and time. It is a modern successor to GMT and is more precise. For most practical purposes, UTC and GMT are the same.</li>
              <li><strong>EST (Eastern Standard Time):</strong> This is UTC-5, used in parts of North America. During summer, it becomes EDT (Eastern Daylight Time), which is UTC-4.</li>
              <li><strong>PST (Pacific Standard Time):</strong> This is UTC-8, used on the West Coast of North America. During summer, it becomes PDT (Pacific Daylight Time), which is UTC-7.</li>
            </ul>
            <p>This world clock automatically accounts for Daylight Saving Time (DST) changes, showing you the correct local time in that city *right now*.</p>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/stopwatch" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Stopwatch
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