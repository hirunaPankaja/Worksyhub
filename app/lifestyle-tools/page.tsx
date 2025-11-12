// src/app/lifestyle-tools/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import {
  Moon,
  Smile,
  BookOpen,
  Sunrise,
  Bed,
  SmilePlus,
  Frown,
  Angry,
  Meh,
  Brain,
  Trash2,
} from 'lucide-react';

// --- Types ---
type MoodEntry = {
  id: number;
  mood: string;
  icon: string;
  note: string;
  date: string;
};

const moods = [
  { label: 'Happy', icon: SmilePlus },
  { label: 'Calm', icon: Smile },
  { label: 'Productive', icon: Brain },
  { label: 'Sad', icon: Frown },
  { label: 'Anxious', icon: Meh },
  { label: 'Angry', icon: Angry },
];

// --- NEW: A wrapper component to use Suspense ---
export default function LifestyleToolsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LifestyleToolsPage />
    </Suspense>
  );
}

function LifestyleToolsPage() { // Renamed from default export
  const [activeTab, setActiveTab] = useState('sleep');
  const [activeTutorial, setActiveTutorial] = useState('sleep');

  // --- State for Sleep Calculator ---
  const [calcMode, setCalcMode] = useState<'wake' | 'bed'>('wake');
  const [targetTime, setTargetTime] = useState(
    new Date().toTimeString().substring(0, 5)
  );
  const [sleepResults, setSleepResults] = useState<string[]>([]);

  // --- State for Mood Tracker ---
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState('Happy');
  const [moodNote, setMoodNote] = useState('');

  // --- Tabs Definition ---
  const tabs = [
    { id: 'sleep', label: 'Sleep Calculator', icon: Moon },
    { id: 'mood', label: 'Mood Tracker', icon: Smile },
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

  // --- Effects ---
  useEffect(() => {
    setActiveTutorial(activeTab);
  }, [activeTab]);

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

  // --- Tool Functions (Unchanged) ---

  const calculateSleepTimes = () => {
    const [hours, minutes] = targetTime.split(':').map(Number);
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);

    const FALL_ASLEEP_TIME = 15 * 60 * 1000; // 15 minutes in ms
    const SLEEP_CYCLE = 90 * 60 * 1000; // 90 minutes in ms
    const results: string[] = [];

    if (calcMode === 'wake') {
      // User wants to WAKE UP at targetTime. Calculate bed times.
      // We subtract 15min fall-asleep time, then subtract cycles
      const fallAsleepTarget = new Date(targetDate.getTime() - FALL_ASLEEP_TIME);
      for (let i = 6; i >= 3; i--) {
        // 6 cycles (9hrs) down to 3 cycles (4.5hrs)
        const bedtime = new Date(fallAsleepTarget.getTime() - i * SLEEP_CYCLE);
        results.push(bedtime.toLocaleTimeString('en-US', { timeStyle: 'short' }));
      }
    } else {
      // User wants to GO TO BED at targetTime. Calculate wake times.
      // We add 15min fall-asleep time, then add cycles
      const fallAsleepStart = new Date(targetDate.getTime() + FALL_ASLEEP_TIME);
      for (let i = 4; i <= 6; i++) {
        // 4 cycles (6hrs) up to 6 cycles (9hrs)
        const waketime = new Date(fallAsleepStart.getTime() + i * SLEEP_CYCLE);
        results.push(waketime.toLocaleTimeString('en-US', { timeStyle: 'short' }));
      }
    }
    setSleepResults(results);
  };

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
    const mood = moods.find(m => m.label === label);
    return mood ? mood.icon : Meh;
  };

  // --- Tutorials Content (Unchanged) ---
  const tutorials = {
    sleep: {
      title: 'Sleep Cycle Calculator Guide',
      sections: [
        {
          title: 'Understanding Sleep Cycles',
          content: [
            'Our sleep is made of 90-minute cycles of light, deep, and REM sleep. Waking up in the middle of a cycle leaves you feeling groggy (this is called sleep inertia).',
            'This tool helps you wake up **at the end** of a sleep cycle, so you feel refreshed and alert.',
            '',
            '**Fall Asleep Time:**',
            'We automatically account for the 15 minutes it typically takes a person to fall asleep.',
            '',
            '**How to Use:**',
            '**1. I want to wake up at...:** Choose this, set your target wake-up time, and click "Calculate". We will show you the best times to **go to bed**.',
            '**2. I want to go to bed at...:** Choose this, set your target bedtime, and click "Calculate". We will show you the best times to **wake up**.',
          ],
        },
      ],
    },
    mood: {
      title: 'Private Mood Tracker Guide',
      sections: [
        {
          title: 'How to Use the Mood Tracker',
          content: [
            'Tracking your mood can help you identify patterns, understand triggers, and improve your mental well-being.',
            '**100% Private:** All your entries are saved **only** on your device in your browser\'s local storage. This data never leaves your computer and is never sent to our server.',
            '',
            '**How to Log:**',
            '**1. Select Mood:** Click one of the mood icons that best represents how you feel.',
            '**2. Add Note (Optional):** In the text box, write down any details. (e.g., "Finished a big project," or "Feeling tired, not sure why.").',
            '**3. Save Entry:** Click the "Save Entry" button. Your entry will appear in the "Your Mood History" list below.',
            '',
            '**Deleting History:**',
            'Click the "Clear All History" button to permanently delete all entries from your device.',
          ],
        },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Lifestyle & Health Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Optimize your sleep and track your mood with these private tools
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

      {/* --- Sleep Calculator --- */}
      {activeTab === 'sleep' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Sleep Cycle Calculator
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCalcMode('wake')}
              className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                calcMode === 'wake'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <Sunrise className="h-5 w-5" />
              I want to wake up at...
            </button>
            <button
              onClick={() => setCalcMode('bed')}
              className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                calcMode === 'bed'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <Bed className="h-5 w-5" />I want to go to bed at...
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {calcMode === 'wake' ? 'Target Wake Up Time' : 'Target Bedtime'}
            </label>
            <input
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>
          <button
            onClick={calculateSleepTimes}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate
          </button>
          {sleepResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {calcMode === 'wake'
                  ? 'You should go to bed at one of the following times:'
                  : 'You should wake up at one of the following times:'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sleepResults.map((time, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted text-center"
                  >
                    <p className="text-2xl font-bold text-foreground">{time}</p>
                    <p className="text-sm text-muted-foreground">
                      {calcMode === 'wake'
                        ? `${9 - index * 1.5} hours of sleep`
                        : `${6 + index * 1.5} hours of sleep`}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Based on 90-minute sleep cycles and a 15-minute average time to
                fall asleep.
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- Mood Tracker --- */}
      {activeTab === 'mood' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-card-foreground">
              Private Mood Tracker
            </h2>
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium dark:bg-blue-950/50 dark:text-blue-300">
              Data saves locally
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium">How are you feeling?</label>
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
          <div className="space-y-4">
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
                {activeTutorial === 'sleep' &&
                  'Most adults feel best with 5-6 sleep cycles (7.5 to 9 hours). Aim for one of the middle recommendations for best results.'}
                {activeTutorial === 'mood' &&
                  'Try to log your mood at the same time every day (e.g., right before bed) to build a consistent habit and see more useful patterns.'}
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
            href="/productivity-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Productivity Tools
          </a>
          <a
            href="/misc-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Fun Tools
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