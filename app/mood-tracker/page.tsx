// src/app/mood-tracker/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Smile,
  BookOpen,
  SmilePlus,
  Frown,
  Angry,
  Meh,
  Brain,
  Trash2,
  Lock,
  BarChart2,
} from 'lucide-react';

// --- Types ---
type MoodEntry = {
  id: number;
  mood: string;
  icon: string;
  note: string;
  date: string;
};

// Map to get Icon component from string
const moodIcons: { [key: string]: React.FC<React.ComponentProps<'svg'>> } = {
  Happy: SmilePlus,
  Calm: Smile,
  Productive: Brain,
  Sad: Frown,
  Anxious: Meh,
  Angry: Angry,
};

const moods = [
  { label: 'Happy', icon: SmilePlus },
  { label: 'Calm', icon: Smile },
  { label: 'Productive', icon: Brain },
  { label: 'Sad', icon: Frown },
  { label: 'Anxious', icon: Meh },
  { label: 'Angry', icon: Angry },
];

export default function MoodTrackerPage() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState('Happy');
  const [moodNote, setMoodNote] = useState('');

  // Load mood history from localStorage on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('worksyhub-mood-history');
      if (storedHistory) {
        setMoodHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load mood history from localStorage', error);
      // If JSON is corrupt, clear it
      localStorage.removeItem('worksyhub-mood-history');
    }
  }, []);

  // --- Tool Functions ---
  const addMoodEntry = () => {
    if (!currentMood) return;
    const selectedMood = moods.find(m => m.label === currentMood);
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      id: Date.now(),
      mood: currentMood,
      icon: selectedMood.label, // Storing label as icon key
      note: moodNote,
      date: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    const newHistory = [newEntry, ...moodHistory];
    setMoodHistory(newHistory);
    localStorage.setItem(
      'worksyhub-mood-history',
      JSON.stringify(newHistory)
    );
    setMoodNote('');
  };

  const clearMoodHistory = () => {
    if (
      window.confirm(
        'Are you sure you want to delete all mood entries? This cannot be undone.'
      )
    ) {
      setMoodHistory([]);
      localStorage.removeItem('worksyhub-mood-history');
    }
  };

  const getMoodIcon = (label: string) => {
    return moodIcons[label] || Meh;
  };

  // --- Tutorials Content ---
  const tutorials = {
    title: 'How to Use the Mood Tracker',
    sections: [
      {
        title: 'How to Log Your Mood',
        content: [
          '**1. Select Mood:** Click one of the mood icons that best represents how you feel right now.',
          '**2. Add Note (Optional):** In the text box, write down any details about why you feel this way (e.g., "Finished a big project," or "Feeling tired, not sure why.").',
          '**3. Save Entry:** Click the "Save Entry" button. Your entry will appear in the "Your Mood History" list below.',
          '',
          '**Deleting History:**',
          'Click the "Clear All History" button to permanently delete all entries from your device.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Private Mood Tracker
        </h1>
        <p className="text-lg text-muted-foreground">
          Log your daily mood and notes. All data stays on your device.
        </p>
      </div>

      {/* --- Mood Tracker Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-card-foreground">
            How are you feeling?
          </h2>
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium dark:bg-blue-950/50 dark:text-blue-300 flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>Data saves locally</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.label}
                  onClick={() => setCurrentMood(mood.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                    currentMood === mood.label
                      ? 'border-primary bg-primary/10'
                      : 'border-transparent bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{mood.label}</span>
                </button>
              );
            })}
          </div>
          <textarea
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-lg border bg-background"
            placeholder="Add a quick note... (optional)"
          ></textarea>
          <button
            onClick={addMoodEntry}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Save Entry
          </button>
        </div>
        <div className="space-y-4 pt-6 border-t">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Your Mood History</h3>
            {moodHistory.length > 0 && (
              <button
                onClick={clearMoodHistory}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </button>
            )}
          </div>
          {moodHistory.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Your saved entries will appear here.
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {moodHistory.map((entry) => {
                const Icon = getMoodIcon(entry.icon);
                return (
                  <div
                    key={entry.id}
                    className="p-4 rounded-lg bg-muted border"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <span className="text-lg font-semibold text-foreground">
                          {entry.mood}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {entry.date}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-foreground pl-7">{entry.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use the Mood Tracker
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

        {/* --- Why Track Your Mood? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-primary" />
            Why Track Your Mood?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Tracking your mood, also known as mood journaling, is a simple but powerful practice for improving self-awareness and mental well-being. By taking a moment to log how you feel, you can begin to:</p>
            <ul className="list-disc pl-5">
              <li>**Identify Patterns:** Do you always feel anxious on Sunday nights? Are you most productive on Tuesday mornings? Seeing your data over time reveals patterns.</li>
              <li>**Understand Triggers:** By adding notes, you can connect your mood to specific events. ("Felt angry after the team meeting.") This helps you understand your emotional triggers.</li>
              <li>**Manage Stress:** Recognizing the early signs of stress or sadness gives you the chance to address them proactively, rather than letting them build up.</li>
              <li>**Appreciate Positivity:** Actively logging when you feel "Happy" or "Calm" helps you recognize and appreciate the positive moments in your life.</li>
            </ul>
          </div>
        </div>
        
        {/* --- 100% Private Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            Your Data is 100% Private
          </h2>
          <p className="text-muted-foreground mb-4">Your privacy is our top priority. This tool is built to be completely private and secure.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Feature</th>
                  <th className="p-3 border border-border">How It Works</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Data Storage</td>
                  <td className="p-3 border border-border">Your data is saved in your browser's **Local Storage** only.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Server Access</td>
                  <td className="p-3 border border-border">**Nothing is ever sent to our server.** We cannot see, read, or access your entries.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Privacy</td>
                  <td className="p-3 border border-border">Your mood history stays on your computer or phone. If you clear your browser cache, the data will be erased.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Control</td>
                  <td className="p-3 border border-border">You have full control. You can delete your entire history at any time with the "Clear All" button.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/sleep-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Sleep Calculator
          </a>
          <a href="/bmi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            BMI Calculator
          </a>
          <a href="/time-zone-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Time Zone Converter
          </a>
          <a href="/" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}