import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Free Online Stopwatch with Lap Timer | Precision Sports & Fitness Timing Tool',
  description:
    'Free online stopwatch with lap timer, split times & millisecond accuracy. Keyboard shortcuts (spacebar). Perfect for sports, workouts, HIIT, Pomodoro, cooking & productivity. No download.',
  keywords: [
    'stopwatch', 'online stopwatch', 'free stopwatch', 'stopwatch online',
    'lap timer', 'lap timer online', 'split timer', 'interval timer',
    'digital stopwatch', 'web stopwatch', 'browser stopwatch',
    'sports timer', 'sports stopwatch', 'fitness stopwatch', 'workout timer',
    'running timer', 'swimming timer', 'cycling timer', 'sprint timer',
    'HIIT timer', 'interval training timer', 'circuit training timer',
    'Pomodoro timer', 'productivity timer', 'study timer', 'focus timer',
    'cooking timer', 'kitchen timer', 'baking timer',
    'exercise timer', 'gym stopwatch', 'crossfit timer',
    'classroom timer', 'presentation timer', 'speech timer',
    'game timer', 'competition timer', 'race timer',
    'reaction timer', 'reaction time test',
    'millisecond timer', 'precision timer', 'accurate stopwatch',
    'stopwatch with laps', 'stopwatch with split times',
    'full screen stopwatch', 'large stopwatch', 'big timer',
    'stopwatch no download', 'stopwatch web app', 'instant stopwatch',
    'spacebar timer', 'keyboard stopwatch',
    'marathon timer', 'track timer', 'athletic timing',
    'meditation timer', 'yoga timer', 'breathing timer',
    'tabata timer', 'boxing round timer', 'MMA round timer',
  ],
  alternates: { canonical: 'https://worksyhub.online/stopwatch' },
  openGraph: {
    title: 'Free Online Stopwatch — Lap Timer & Split Times',
    description: 'Precision stopwatch with lap recording, keyboard shortcuts, millisecond accuracy. Sports, fitness & productivity.',
    url: 'https://worksyhub.online/stopwatch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Stopwatch with Lap Timer',
    description: 'Millisecond accuracy, lap times, keyboard shortcuts. For sports, workouts & productivity!',
  },
};

export default function StopwatchLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'Online Stopwatch with Lap Timer',
    description: 'Free precise digital stopwatch with lap timing, split times, keyboard shortcuts, and millisecond accuracy for sports, fitness, and productivity.',
    applicationCategory: 'UtilityApplication', operatingSystem: 'Any',
    url: 'https://worksyhub.online/stopwatch',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: ['Lap/Split Timing', 'Keyboard Shortcuts', 'Millisecond Accuracy', 'Spacebar Control']
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Stopwatch', item: 'https://worksyhub.online/stopwatch' },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How accurate is this online stopwatch?', acceptedAnswer: { '@type': 'Answer', text: 'Our stopwatch uses the browser\'s high-resolution performance timer, providing millisecond accuracy. While not as precise as a dedicated hardware chronometer, it is more than accurate enough for sports timing, fitness tracking, cooking, presentations, and productivity timing.' } },
      { '@type': 'Question', name: 'What keyboard shortcuts are available?', acceptedAnswer: { '@type': 'Answer', text: 'Press Space to start/stop the stopwatch, press L to record a lap time, and press R to reset. These keyboard shortcuts allow for quick, hands-free operation during activities.' } },
      { '@type': 'Question', name: 'What is the difference between lap time and split time?', acceptedAnswer: { '@type': 'Answer', text: 'Lap time is the duration of each individual segment (e.g., each lap around a track). Split time is the cumulative time from the start to each recording point. For example, if you run 3 laps of 60, 65, and 62 seconds, the lap times are 60s, 65s, 62s while the split times are 60s, 125s, 187s.' } },
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
          <SEOHeading level={2} id="about-stopwatch">Free Online Stopwatch: Precision Timing for Every Activity</SEOHeading>
          <SEOParagraph>
            Our <strong>free online stopwatch</strong> delivers millisecond-accurate timing with lap recording, split times, and full keyboard shortcut support — all in your browser with no download required. Whether you are timing a workout, tracking running laps, cooking a recipe, giving a presentation, studying with the Pomodoro technique, or coaching an athletic event, this stopwatch provides the precision and features you need.
          </SEOParagraph>
          <SEOParagraph>
            The stopwatch features a clean, easy-to-read display, one-click or spacebar start/stop control, lap time recording with individual and cumulative splits, and works on any device — desktop, tablet, or smartphone. It runs entirely in your browser and continues timing even if you switch to other tabs.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="use-cases">How to Use a Stopwatch for Different Activities</SEOHeading>
          <SEOTable
            caption="Stopwatch Use Cases and Timing Tips"
            headers={['Activity', 'How to Time', 'What to Track', 'Ideal Timing']}
            rows={[
              ['Running / Jogging', 'Start at go, lap each mile/km', 'Pace per mile, total time, splits', '5K: 25-35 min, 10K: 50-70 min'],
              ['Swimming', 'Start at push-off, lap each length', 'Lap times, consistency, rest periods', '50m: 25-40s per length'],
              ['HIIT Workout', 'Time work intervals and rest', '30s work / 15s rest ratio', '20-30 min total session'],
              ['Tabata Training', '20s exercise, 10s rest, 8 rounds', 'Completion of all 8 rounds', '4 minutes per exercise'],
              ['Pomodoro Study', '25 min work, 5 min break', 'Number of completed pomodoros', '4 sessions before long break'],
              ['Cooking', 'Start when food goes in', 'Cooking time for each stage', 'Varies by recipe'],
              ['Presentations', 'Start at beginning of talk', 'Total duration, section timing', 'TED: 18 min, Standard: 20 min'],
              ['Reaction Time', 'Start with visual/audio cue', 'Time from stimulus to response', 'Average: 200-250 ms'],
              ['Board Games', 'Time each player\'s turn', 'Time per move, total game time', 'Chess: varies by format'],
              ['Science Experiments', 'Precise interval measurement', 'Reaction times, duration data', 'Varies by experiment'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="running-pace">Running Pace Chart: Time Goals for Common Distances</SEOHeading>
          <SEOTable
            caption="Running Pace-to-Finish-Time Conversion"
            headers={['Pace (min/mile)', 'Pace (min/km)', '5K (3.1 mi)', '10K (6.2 mi)', 'Half Marathon', 'Marathon']}
            rows={[
              ['6:00', '3:43', '18:38', '37:16', '1:18:36', '2:37:12'],
              ['7:00', '4:21', '21:44', '43:28', '1:31:42', '3:03:24'],
              ['8:00', '4:58', '24:50', '49:40', '1:44:48', '3:29:36'],
              ['9:00', '5:35', '27:56', '55:52', '1:57:54', '3:55:48'],
              ['10:00', '6:13', '31:02', '1:02:04', '2:11:00', '4:22:00'],
              ['11:00', '6:50', '34:08', '1:08:16', '2:24:06', '4:48:12'],
              ['12:00', '7:27', '37:14', '1:14:28', '2:37:12', '5:14:24'],
              ['13:00', '8:04', '40:20', '1:20:40', '2:50:18', '5:40:36'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="interval-training">Popular Interval Training Protocols</SEOHeading>
          <SEOTable
            caption="Timer-Based Workout Protocols"
            headers={['Protocol', 'Work', 'Rest', 'Rounds', 'Total Time', 'Best For']}
            rows={[
              ['Tabata', '20 seconds', '10 seconds', '8 rounds', '4 minutes', 'Maximum intensity cardio'],
              ['Classic HIIT', '30 seconds', '30 seconds', '10-15 rounds', '10-15 minutes', 'Balanced fat burning'],
              ['EMOM', '40-50 seconds', '10-20 seconds', '10-20 rounds', '10-20 minutes', 'Strength endurance'],
              ['Pomodoro', '25 minutes', '5 minutes', '4 sessions', '2 hours', 'Focused study/work'],
              ['Boxing Rounds', '3 minutes', '1 minute', '10-12 rounds', '40-48 minutes', 'Boxing training'],
              ['Sprint Intervals', '15 seconds', '45 seconds', '8-12 rounds', '8-12 minutes', 'Speed development'],
              ['Recovery HIIT', '20 seconds', '40 seconds', '10 rounds', '10 minutes', 'Active recovery days'],
              ['Death by Reps', 'Add 1 rep/min', 'Remaining time', 'Until failure', 'Varies', 'Challenge workouts'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="stopwatch-faq">Frequently Asked Questions</SEOHeading>
          <SEOFAQ items={[
            { question: 'How do I use the stopwatch with keyboard shortcuts?', answer: 'Press the Spacebar to start or pause the stopwatch. Press L to record a lap. Press R to reset the timer. These shortcuts work as long as the stopwatch page is in focus, allowing quick hands-free timing during any activity.' },
            { question: 'Will the stopwatch keep running if I switch browser tabs?', answer: 'Yes, our stopwatch continues to run accurately even when you switch to other tabs or applications. The timer uses JavaScript\'s high-precision timing APIs, which operate in the background. Your timing will be accurate when you return to the tab.' },
            { question: 'What is the difference between a stopwatch and a countdown timer?', answer: 'A stopwatch counts UP from zero, measuring elapsed time until you press stop. A countdown timer counts DOWN from a set time to zero, alerting you when time runs out. Use a stopwatch when you need to measure how long something takes. Use a countdown timer when you need to track a specific time limit. We offer both tools!' },
            { question: 'How do I use the Pomodoro Technique?', answer: 'The Pomodoro Technique involves 25 minutes of focused work followed by a 5-minute break. After 4 pomodoro sessions, take a longer 15-30 minute break. Use our stopwatch to time each session or our countdown timer to set the 25-minute timer with an alarm.' },
            { question: 'Is this stopwatch accurate enough for sports timing?', answer: 'Our stopwatch provides millisecond accuracy, which is more than sufficient for most sports timing needs including running, swimming, cycling, HIIT workouts, and kitchen timing. For official athletic competitions, certified hardware chronometers are required, but for personal training and informal timing, our tool is excellent.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/countdown-timer', title: 'Countdown Timer', description: 'Set a count-down alarm' },
          { href: '/world-clock', title: 'World Clock', description: 'Global time zones' },
          { href: '/age-calculator', title: 'Age Calculator', description: 'Calculate exact age' },
          { href: '/days-between-dates', title: 'Days Between Dates', description: 'Count days between' },
          { href: '/bmi-calculator', title: 'BMI Calculator', description: 'Body mass index' },
        ]} />
      </SEOContentSection>
    </>
  );
}