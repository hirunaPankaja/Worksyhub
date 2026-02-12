import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Countdown Timer Online Free - Set Timer with Alarm | Minutes, Hours, Seconds',
  description:
    'Free online countdown timer with alarm sound. Set minutes, hours, or seconds. Full screen mode, keyboard shortcuts. Perfect for cooking, studying, Pomodoro, classrooms & events. No download.',
  keywords: [
    'countdown timer', 'online countdown timer', 'free countdown timer',
    'timer online', 'timer with alarm', 'set timer', 'set timer for',
    'set a timer for 5 minutes', 'set a timer for 10 minutes',
    'set a timer for 15 minutes', 'set a timer for 20 minutes',
    'set a timer for 30 minutes', 'set a timer for 1 hour',
    'countdown clock', 'countdown timer online free', 'countdown alarm',
    'kitchen timer online', 'cooking timer', 'baking timer online',
    'study timer', 'Pomodoro timer', 'focus timer', 'productivity timer',
    'classroom timer', 'classroom countdown', 'teacher timer',
    'presentation timer', 'meeting timer', 'speech timer',
    'event countdown', 'countdown to event', 'countdown to date',
    'exercise timer', 'workout timer', 'HIIT countdown',
    'exam timer', 'test timer', 'quiz timer',
    'meditation timer', 'yoga timer', 'breathing exercise timer',
    'sleep timer', 'nap timer', 'baby timer',
    'egg timer', 'tea timer', 'coffee timer',
    'game timer', 'board game timer', 'chess timer',
    'full screen timer', 'big timer', 'large countdown',
    'visual timer', 'digital countdown timer', 'programmable timer',
    'custom countdown timer', 'multiple timers',
    'countdown timer with sound', 'timer alarm sound',
    'minute timer', 'hour timer', 'second timer',
  ],
  alternates: { canonical: 'https://worksyhub.online/countdown-timer' },
  openGraph: {
    title: 'Free Online Countdown Timer with Alarm',
    description: 'Set any timer with alarm sound. Full screen, keyboard shortcuts. Perfect for cooking, studying & more.',
    url: 'https://worksyhub.online/countdown-timer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Countdown Timer with Alarm',
    description: 'Set timer for minutes, hours, or seconds. Alarm when done. Cooking, studying, workouts!',
  },
};

export default function CountdownTimerLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'Free Online Countdown Timer with Alarm',
    description: 'Set a countdown timer for any duration with alarm notification. Kitchen, study, exercise, classroom, meditation timers.',
    applicationCategory: 'UtilityApplication', operatingSystem: 'Any',
    url: 'https://worksyhub.online/countdown-timer',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Countdown Timer', item: 'https://worksyhub.online/countdown-timer' },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Does the timer make a sound when it reaches zero?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our countdown timer plays an alarm sound when the timer reaches zero, so you can step away from your device. Make sure your device volume is turned up and browser audio is enabled.' } },
      { '@type': 'Question', name: 'Will the timer keep running if I switch tabs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, the countdown timer continues running in the background even when you switch to other browser tabs or applications. The alarm will still sound when the timer finishes.' } },
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}

      <SEOContentSection>
        <section className="space-y-4">
          <SEOHeading level={2} id="about-countdown-timer">Free Online Countdown Timer with Alarm Sound</SEOHeading>
          <SEOParagraph>
            Our <strong>free online countdown timer</strong> lets you set a timer for any duration — minutes, hours, or seconds — and plays an alarm sound when time is up. Whether you need a <strong>kitchen timer</strong> for cooking pasta, a <strong>Pomodoro timer</strong> for focused study sessions, a <strong>classroom timer</strong> for student activities, or a <strong>workout timer</strong> for exercise intervals, this tool provides reliable, accurate timing with an audible alert so you never miss the end.
          </SEOParagraph>
          <SEOParagraph>
            The timer runs entirely in your browser — no download, no app installation, no signup. It continues counting down even when you switch to other tabs, and the alarm plays when done. Full screen mode makes it easy to see from across the room, perfect for classrooms, presentations, and group activities.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="popular-timers">Popular Timer Settings Quick Reference</SEOHeading>
          <SEOTable
            caption="Commonly Used Timer Durations by Activity"
            headers={['Duration', 'Common Uses', 'Popular Search']}
            rows={[
              ['30 seconds', 'Brushing teeth (per quadrant), microwave quick heat', 'Set timer 30 seconds'],
              ['1 minute', 'Quick stretch break, medicine timing, plank exercise', 'Set timer 1 minute'],
              ['2 minutes', 'Full teeth brushing, quick meditation, egg timing', 'Set timer 2 minutes'],
              ['3 minutes', 'Soft-boiled egg, tea steeping, speed challenge', 'Set timer 3 minutes'],
              ['5 minutes', 'Short break, quick task, boiling eggs', 'Set timer 5 minutes'],
              ['10 minutes', 'Power nap alert, cleaning sprint, rice cooking', 'Set timer 10 minutes'],
              ['15 minutes', 'Quick study session, pasta cooking, meeting segment', 'Set timer 15 minutes'],
              ['20 minutes', 'Nap timer, yoga session, focused writing sprint', 'Set timer 20 minutes'],
              ['25 minutes', 'Pomodoro work session (standard)', 'Pomodoro timer'],
              ['30 minutes', 'Workout session, baking check, laundry alert', 'Set timer 30 minutes'],
              ['45 minutes', 'School class period, extended study, meeting', 'Set timer 45 minutes'],
              ['1 hour', 'Full study session, parking meter, slow cooking check', 'Set timer 1 hour'],
              ['90 minutes', 'Movie length, deep work session, sleep cycle', 'Set timer 90 minutes'],
              ['2 hours', 'Extended baking, exam simulation, road trip check', 'Set timer 2 hours'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="cooking-timers">Cooking Timer Reference: How Long to Cook Everything</SEOHeading>
          <SEOTable
            caption="Common Cooking Times"
            headers={['Food Item', 'Cooking Method', 'Timer Setting', 'Doneness']}
            rows={[
              ['Soft-boiled egg', 'Boiling', '6-7 minutes', 'Runny yolk, set white'],
              ['Hard-boiled egg', 'Boiling', '10-12 minutes', 'Fully set yolk'],
              ['Pasta (al dente)', 'Boiling', '8-10 minutes', 'Firm to bite'],
              ['White rice', 'Stovetop', '18 minutes', 'Fluffy, water absorbed'],
              ['Brown rice', 'Stovetop', '40-45 minutes', 'Tender, chewy'],
              ['Frozen pizza', 'Oven (425°F)', '12-15 minutes', 'Cheese melted, crust golden'],
              ['Chicken breast', 'Oven (375°F)', '25-30 minutes', 'Internal temp 165°F'],
              ['Salmon fillet', 'Oven (400°F)', '12-15 minutes', 'Flakes easily'],
              ['Baked potato', 'Oven (400°F)', '45-60 minutes', 'Fork-tender'],
              ['French press coffee', 'Steeping', '4 minutes', 'Full extraction'],
              ['Green tea', 'Steeping', '2-3 minutes', 'Light, not bitter'],
              ['Black tea', 'Steeping', '3-5 minutes', 'Full-bodied'],
              ['Grilled steak (med)', 'Grill', '4-5 min per side', 'Internal temp 145°F'],
              ['Banana bread', 'Oven (350°F)', '55-65 minutes', 'Toothpick comes out clean'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="pomodoro-guide">Pomodoro Technique: The Complete Timer Guide</SEOHeading>
          <SEOParagraph>
            The <strong>Pomodoro Technique</strong> is one of the most effective time management methods, developed by Francesco Cirillo in the late 1980s. It uses timed intervals — traditionally 25 minutes of focused work followed by 5-minute breaks — to maintain concentration and prevent burnout.
          </SEOParagraph>
          <SEONumberedList items={[
            'Choose a task to work on. Write it down to commit to completing it.',
            'Set the countdown timer for 25 minutes (one "pomodoro").',
            'Work with complete focus until the timer rings. No checking email, social media, or phone.',
            'When the alarm sounds, take a 5-minute break. Stand up, stretch, hydrate.',
            'After completing 4 pomodoros, take a longer break of 15-30 minutes.',
            'Repeat throughout your work day. Most productive people complete 8-12 pomodoros daily.',
          ]} />
          <SEOTable
            caption="Pomodoro Variations for Different Work Styles"
            headers={['Variation', 'Work Duration', 'Short Break', 'Long Break', 'Best For']}
            rows={[
              ['Classic Pomodoro', '25 min', '5 min', '15-30 min', 'Most people, general work'],
              ['Extended Pomodoro', '50 min', '10 min', '30 min', 'Deep creative work, programming'],
              ['Short Pomodoro', '15 min', '3 min', '15 min', 'ADHD, high-distraction environments'],
              ['Academic Pomodoro', '45 min', '10 min', '20 min', 'University lectures, heavy studying'],
              ['Flowtime', 'Until focus wanes', '5-10 min', '20 min', 'People who resist rigid timing'],
              ['52-17 Method', '52 min', '17 min', 'N/A', 'Research-backed productivity ratio'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="countdown-timer-faq">Frequently Asked Questions</SEOHeading>
          <SEOFAQ items={[
            { question: 'What happens when the countdown reaches zero?', answer: 'An alarm sound plays to alert you that time is up. The alarm continues until you dismiss it. Make sure your device volume is turned up and your browser allows audio playback for the alarm to work correctly.' },
            { question: 'Can I set a timer for a specific date or event?', answer: 'This tool is designed for duration-based countdowns (minutes, hours, seconds). For countdown to a specific date — such as "days until Christmas" or "countdown to my wedding" — use our Days Between Dates calculator which shows the exact number of days, weeks, and months between any two dates.' },
            { question: 'What is the Pomodoro Technique and how do I use it?', answer: 'The Pomodoro Technique uses 25-minute focused work intervals followed by 5-minute breaks. After 4 sessions, take a 15-30 minute break. To use it: set our timer for 25 minutes, work without any distractions until the alarm sounds, take a 5-minute break, then repeat. It is proven to dramatically boost productivity and focus.' },
            { question: 'Does the timer work with my phone or tablet?', answer: 'Yes! Our countdown timer is fully responsive and works on any device — iPhone, Android phone, iPad, tablet, or desktop computer. The alarm sound plays on all devices, though you may need to interact with the page first on mobile devices for audio to work (a browser security requirement).' },
            { question: 'Can I use multiple timers at once?', answer: 'Our current tool supports one countdown timer at a time. For multiple simultaneous timers, you can open our countdown timer in multiple browser tabs, each set to a different duration. Each tab will maintain its own independent countdown and alarm.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/stopwatch', title: 'Stopwatch', description: 'Count up with laps' },
          { href: '/world-clock', title: 'World Clock', description: 'Global time zones' },
          { href: '/days-between-dates', title: 'Days Between Dates', description: 'Date countdown' },
          { href: '/age-calculator', title: 'Age Calculator', description: 'Calculate exact age' },
          { href: '/word-counter', title: 'Word Counter', description: 'Count words & characters' },
        ]} />
      </SEOContentSection>
    </>
  );
}