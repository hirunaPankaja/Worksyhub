// src/app/time-converter/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import { Clock, Calendar, Timer, Globe, Hash, ArrowRight, BookOpen } from 'lucide-react';

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

// --- NEW: A wrapper component to use Suspense ---
// This is required to use useSearchParams
export default function TimeConverterPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TimeConverterPage />
    </Suspense>
  );
}

// --- Renamed from 'default' ---
function TimeConverterPage() {
  const [activeTab, setActiveTab] = useState('timezone');
  const [activeTutorial, setActiveTutorial] = useState('timezone');

  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('America/New_York');
  const [inputTime, setInputTime] = useState('12:00');
  const [convertedTime, setConvertedTime] = useState('');

  const [birthDate, setBirthDate] = useState('');
  const [ageResult, setAgeResult] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysDiff, setDaysDiff] = useState('');

  const [timestamp, setTimestamp] = useState('');
  const [dateFromTimestamp, setDateFromTimestamp] = useState('');

  const [countdownDate, setCountdownDate] = useState('');
  const [countdown, setCountdown] = useState('');

  const tabs = [
    { id: 'timezone', label: 'Time Zone', icon: Globe },
    { id: 'age', label: 'Age Calculator', icon: Calendar },
    { id: 'days', label: 'Days Between', icon: Clock },
    { id: 'unix', label: 'Unix Timestamp', icon: Hash },
    { id: 'countdown', label: 'Countdown', icon: Timer },
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


  useEffect(() => {
    setActiveTutorial(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        switch (activeTab) {
          case 'timezone':
            convertTimeZone();
            break;
          case 'age':
            calculateAge();
            break;
          case 'days':
            calculateDaysBetween();
            break;
          case 'unix':
            convertTimestamp();
            break;
          case 'countdown':
            calculateCountdown();
            break;
        }
      }
      if (event.key === 'Escape') {
        switch (activeTab) {
          case 'timezone':
            setInputTime('12:00');
            setConvertedTime('');
            break;
          case 'age':
            setBirthDate('');
            setAgeResult('');
            break;
          case 'days':
            setStartDate('');
            setEndDate('');
            setDaysDiff('');
            break;
          case 'unix':
            setTimestamp('');
            setDateFromTimestamp('');
            break;
          case 'countdown':
            setCountdownDate('');
            setCountdown('');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeTab, inputTime, fromZone, toZone, birthDate, startDate, endDate, timestamp, countdownDate]);

  const convertTimeZone = () => {
    try {
      const date = new Date(`2000-01-01T${inputTime}:00Z`);
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: toZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setConvertedTime(formatter.format(date));
    } catch (error) {
      setConvertedTime('Invalid time');
    }
  };

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeResult(`${years} years, ${months} months, ${days} days`);
  };

  const calculateDaysBetween = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setDaysDiff(`${days} days`);
  };

  const convertTimestamp = () => {
    try {
      const date = new Date(parseInt(timestamp) * 1000);
      setDateFromTimestamp(date.toLocaleString());
    } catch (error) {
      setDateFromTimestamp('Invalid timestamp');
    }
  };

  const calculateCountdown = () => {
    if (!countdownDate) return;
    const target = new Date(countdownDate);
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff < 0) {
      setCountdown('Date has passed');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setCountdown(`${days} days, ${hours} hours, ${minutes} minutes`);
  };

  const tutorials = {
    timezone: {
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
            "Major Time Zones:",
            "EST (Eastern Standard Time): UTC-5",
            "PST (Pacific Standard Time): UTC-8", 
            "GMT (Greenwich Mean Time): UTC+0",
            "CET (Central European Time): UTC+1",
            "JST (Japan Standard Time): UTC+9",
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
            "Communication:",
            "Call friends and family in different countries",
            "Schedule international video conferences",
            "",
            "Remote Work:",
            "Coordinate with distributed teams",
            "Plan work hours across time zones",
            "",
            "Example: Convert 3:00 PM EST to PST",
            "3:00 PM EST = 12:00 PM PST (3 hours difference)"
          ]
        }
      ]
    },
    age: {
      title: "Age Calculator Guide",
      sections: [
        {
          title: "Understanding Age Calculation",
          content: [
            "Age calculation determines the exact time elapsed since a person's birth date, accounting for years, months, and days.",
            "",
            "Age Calculation Formula:",
            "Years = Current Year - Birth Year",
            "Months = Current Month - Birth Month", 
            "Days = Current Day - Birth Day",
            "",
            "Adjustment Rules:",
            "If days are negative, borrow days from previous month",
            "If months are negative, borrow 12 months from years",
            "Account for leap years in February calculations",
            "",
            "Leap Year Consideration:",
            "Years divisible by 4 are leap years",
            "Except years divisible by 100 (unless also divisible by 400)",
            "Affects February day count in age calculations",
            "",
            "How to Use:",
            "1. Enter your birth date",
            "2. Press Enter or click Calculate Age",
            "3. Get precise age in years, months, and days"
          ]
        },
        {
          title: "Practical Applications",
          content: [
            "Personal Use:",
            "Track birthdays and anniversaries",
            "Calculate retirement age",
            "Plan milestone celebrations",
            "",
            "Medical:",
            "Calculate patient ages for treatment",
            "Track developmental milestones",
            "Medical record keeping",
            "",
            "Legal:",
            "Verify age for legal requirements",
            "Calculate service periods",
            "Contract duration calculations",
            "",
            "Financial:",
            "Retirement planning",
            "Insurance premium calculations",
            "Investment maturity dates",
            "",
            "Example: Born January 15, 1990 on March 10, 2024",
            "Age: 34 years, 1 month, 25 days"
          ]
        }
      ]
    },
    days: {
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
            "Key Considerations:",
            "Includes both start and end dates in count",
            "Handles leap years automatically",
            "Accounts for different month lengths",
            "Works across century boundaries",
            "",
            "Common Use Cases:",
            "Project timelines and deadlines",
            "Rental periods and leases",
            "Event planning and countdowns",
            "Historical date calculations",
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
            "",
            "Academic:",
            "Semester duration calculations",
            "Research project timelines",
            "Assignment due dates",
            "",
            "Example: January 1, 2024 to January 31, 2024",
            "Difference: 30 days"
          ]
        }
      ]
    },
    unix: {
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
            "Timestamp Values:",
            "1 second = 1 unit in Unix timestamp",
            "1 minute = 60 units",
            "1 hour = 3,600 units", 
            "1 day = 86,400 units",
            "1 year ≈ 31,536,000 units",
            "",
            "Common Formats:",
            "10-digit: Seconds since 1970 (standard)",
            "13-digit: Milliseconds since 1970 (JavaScript)",
            "16-digit: Microseconds since 1970 (some systems)",
            "",
            "How to Use:",
            "1. Enter Unix timestamp (seconds)",
            "2. Press Enter or click Convert to Date",
            "3. Get human-readable date and time"
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
            "System Administration:",
            "Log analysis and debugging",
            "Backup scheduling",
            "System event tracking",
            "",
            "Web Development:",
            "Cookie expiration dates",
            "Cache control headers",
            "Session management",
            "",
            "Example: Timestamp 1609459200",
            "Converts to: January 1, 2021, 12:00:00 AM UTC"
          ]
        }
      ]
    },
    countdown: {
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
            "Break down into days, hours, minutes",
            "Update in real-time for active countdowns",
            "",
            "Time Components:",
            "Days: Complete 24-hour periods remaining",
            "Hours: Remaining hours within current day",
            "Minutes: Remaining minutes within current hour",
            "Seconds: Optional precision for exact timing",
            "",
            "Automatic Updates:",
            "For active countdowns, display updates every minute",
            "Show expired status for past dates",
            "Handle timezone differences automatically",
            "",
            "How to Use:",
            "1. Enter target date and time",
            "2. Press Enter or click Calculate Countdown",
            "3. Get time remaining in days, hours, minutes"
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
            "",
            "Business:",
            "Product launch countdowns",
            "Sales and promotion deadlines",
            "Contract expiration alerts",
            "",
            "Example: Countdown to New Year 2025",
            "Shows days, hours, minutes until January 1, 2025"
          ]
        }
      ]
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Time & Date Tools</h1>
        <p className="text-lg text-muted-foreground">
          Convert time zones, calculate age, count days, and more with keyboard support
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

      {activeTab === 'timezone' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Time Zone Converter
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
            <label className="block text-sm font-medium mb-2">Time</label>
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
              <p className="text-2xl font-bold text-foreground">{convertedTime}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'age' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">Age Calculator</h2>
          <p className="text-sm text-muted-foreground">
            Use keyboard: Enter to calculate, Escape to clear
          </p>

          <div>
            <label className="block text-sm font-medium mb-2">Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <button
            onClick={calculateAge}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
          >
            Calculate Age
          </button>

          {ageResult && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Your Age:</p>
              <p className="text-2xl font-bold text-foreground">{ageResult}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'days' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Days Between Dates Calculator
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
              <p className="text-2xl font-bold text-foreground">{daysDiff}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'unix' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Unix Timestamp Converter
          </h2>
          <p className="text-sm text-muted-foreground">
            Use keyboard: Enter to convert, Escape to clear
          </p>

          <div>
            <label className="block text-sm font-medium mb-2">
              Unix Timestamp (seconds)
            </label>
            <input
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1609459200"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <button
            onClick={convertTimestamp}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
          >
            Convert to Date
          </button>

          {dateFromTimestamp && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Date & Time:</p>
              <p className="text-2xl font-bold text-foreground">
                {dateFromTimestamp}
              </p>
            </div>
          )}

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30">
            <p className="text-sm text-muted-foreground">
              <strong>Current Unix Timestamp:</strong>{' '}
              {Math.floor(Date.now() / 1000)}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'countdown' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">Countdown Timer</h2>
          <p className="text-sm text-muted-foreground">
            Use keyboard: Enter to calculate, Escape to clear
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
            Calculate Countdown
          </button>

          {countdown && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Time Remaining:</p>
              <p className="text-2xl font-bold text-foreground">{countdown}</p>
            </div>
          )}
        </div>
      )}

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
                {tutorials[activeTutorial as keyof typeof tutorials]?.sections?.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                      {section.title}
                    </h4>
                    
                    <div className="prose prose-lg max-w-none text-foreground">
                      {section.content.map((line, lineIndex) => (
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 text-blue-800">Pro Tip</h4>
              <p className="text-blue-700">
                {activeTutorial === 'timezone' && "Use Enter key for quick conversions and Escape to reset values."}
                {activeTutorial === 'age' && "Remember that age calculations account for leap years and varying month lengths."}
                {activeTutorial === 'days' && "The calculator includes both start and end dates in the day count."}
                {activeTutorial === 'unix' && "Current Unix timestamp updates automatically - useful for development."}
                {activeTutorial === 'countdown' && "Countdown automatically shows when the target date has passed."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Calculator
          </a>
          <a href="/measurement-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Measurement Converter
          </a>
          <a href="/#tools" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            All Tools
          </a>
          <a href="/about" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            About Us
          </a>
        </div>
      </div>
    </div>
  );
}