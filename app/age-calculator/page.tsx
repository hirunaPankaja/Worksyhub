// src/app/age-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Calendar, BookOpen } from 'lucide-react';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [ageResult, setAgeResult] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculateAge();
      }
      if (event.key === 'Escape') {
        setBirthDate('');
        setAgeResult('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [birthDate]); // Dependency only on birthDate now

  const calculateAge = () => {
    if (!birthDate) {
      setAgeResult('Please enter a valid birth date.');
      return;
    }
    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setAgeResult('Birth date must be in the past.');
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Get days in the previous month
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeResult(`${years} years, ${months} months, ${days} days`);
  };

  const tutorials = {
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
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Age Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Find your exact age in years, months, and days
        </p>
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">Calculate Your Age</h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to calculate, Escape to clear
        </p>

        <div>
          <label className="block text-sm font-medium mb-2">Your Birth Date</label>
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
            <p className="text-3xl font-bold text-foreground">{ageResult}</p>
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