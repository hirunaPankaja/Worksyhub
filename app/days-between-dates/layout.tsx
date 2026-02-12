import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Days Between Dates Calculator - Free Date Duration Counter | How Many Days Until',
  description:
    'Free days between dates calculator — find the exact number of days, weeks, months between any two dates. How many days until Christmas, birthday, vacation? Business days counter included.',
  keywords: [
    'days between dates', 'days between dates calculator', 'date calculator',
    'date difference calculator', 'date duration calculator',
    'how many days between', 'how many days until',
    'how many days until Christmas', 'how many days until summer',
    'how many days until my birthday', 'how many days until New Year',
    'days calculator', 'date counter', 'day counter', 'day counter between dates',
    'business days calculator', 'working days calculator', 'weekday counter',
    'weeks between dates', 'months between dates', 'years between dates',
    'countdown to date', 'days remaining calculator',
    'age in days calculator', 'how old am I in days',
    'pregnancy due date calculator', 'days to due date',
    'days since date calculator', 'how many days ago',
    'date to date calculator', 'time between two dates',
    'deadline calculator', 'project duration calculator',
    'vacation countdown', 'holiday countdown', 'event countdown',
    'days until retirement', 'days until wedding',
    'days until graduation', 'days until summer break',
    'workday calculator', 'business day counter online',
    'elapsed days calculator', 'total days calculator',
    'calendar days vs business days', 'exclude weekends calculator',
  ],
  alternates: { canonical: 'https://worksyhub.online/days-between-dates' },
  openGraph: {
    title: 'Days Between Dates Calculator — How Many Days Until',
    description: 'Find exact days, weeks, months between any two dates. Business days counter. Countdown to events.',
    url: 'https://worksyhub.online/days-between-dates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Days Between Dates Calculator',
    description: 'How many days between any two dates? Business days, weeks, months. Countdown to events!',
  },
};

export default function DaysBetweenDatesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'Days Between Dates Calculator',
    description: 'Calculate the exact number of days, weeks, months, and years between any two dates. Includes business days counter and event countdowns.',
    applicationCategory: 'UtilityApplication', operatingSystem: 'Any',
    url: 'https://worksyhub.online/days-between-dates',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Days Between Dates', item: 'https://worksyhub.online/days-between-dates' },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How many days are in a year?', acceptedAnswer: { '@type': 'Answer', text: 'A regular year has 365 days. A leap year (every 4 years, with exceptions for century years not divisible by 400) has 366 days. The extra day is February 29.' } },
      { '@type': 'Question', name: 'What is a business day?', acceptedAnswer: { '@type': 'Answer', text: 'A business day (or working day) is any day that is not a Saturday, Sunday, or public holiday. In a typical week, there are 5 business days (Monday through Friday). A standard year has approximately 260 business days, excluding public holidays.' } },
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
          <SEOHeading level={2} id="about-days-calculator">Calculate the Exact Days Between Any Two Dates</SEOHeading>
          <SEOParagraph>
            Our <strong>days between dates calculator</strong> instantly tells you the exact number of days, weeks, months, and years between any two dates. Whether you want to know <strong>how many days until Christmas</strong>, count down to your birthday or vacation, calculate project deadlines in business days, determine your age in days, or track how long since a past event — this tool gives you precise results instantly.
          </SEOParagraph>
          <SEOParagraph>
            Simply select your start date and end date to see a complete breakdown including total calendar days, business days (excluding weekends), full weeks, months, and years. The calculator works for any dates — past, present, or future — making it perfect for personal planning, project management, legal calculations, pregnancy tracking, and academic scheduling.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="days-in-months">Days in Each Month: Quick Reference</SEOHeading>
          <SEOTable
            caption="Number of Days in Each Calendar Month"
            headers={['Month', 'Days', 'Cumulative Days (Standard Year)', 'Fun Fact']}
            rows={[
              ['January', '31', '31', 'Named after Janus, Roman god of beginnings'],
              ['February', '28 (29 in leap year)', '59 (60)', 'Only month with fewer than 30 days'],
              ['March', '31', '90 (91)', 'Start of spring in Northern Hemisphere'],
              ['April', '30', '120 (121)', 'April showers bring May flowers'],
              ['May', '31', '151 (152)', 'Named after Maia, Greek goddess of growth'],
              ['June', '30', '181 (182)', 'Summer solstice (longest day) around June 21'],
              ['July', '31', '212 (213)', 'Named after Julius Caesar'],
              ['August', '31', '243 (244)', 'Named after Augustus Caesar'],
              ['September', '30', '273 (274)', 'Last month before Q4 begins'],
              ['October', '31', '304 (305)', 'Halloween on the 31st'],
              ['November', '30', '334 (335)', 'Thanksgiving (US) fourth Thursday'],
              ['December', '31', '365 (366)', 'Winter holidays, end of year'],
            ]}
          />
          <SEOCallout type="info">
            <strong>How to remember days in each month:</strong> Use the knuckle trick — make two fists, and count across your knuckles. Each knuckle is a 31-day month, each valley is a 30-day month (or 28/29 for February). Jan (knuckle, 31), Feb (valley, 28/29), Mar (knuckle, 31), Apr (valley, 30), and so on.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="important-countdowns">Popular Date Countdowns and Historical Milestones</SEOHeading>
          <SEOTable
            caption="Common Events People Count Down To"
            headers={['Event', 'Date (2025)', 'Category']}
            rows={[
              ['New Year\'s Day', 'January 1', 'Holiday'],
              ['Valentine\'s Day', 'February 14', 'Holiday'],
              ['Easter Sunday', 'April 20', 'Holiday (varies yearly)'],
              ['Mother\'s Day (US)', 'May 11', 'Holiday'],
              ['Father\'s Day (US)', 'June 15', 'Holiday'],
              ['Independence Day (US)', 'July 4', 'National Holiday'],
              ['Halloween', 'October 31', 'Holiday'],
              ['Thanksgiving (US)', 'November 27', 'Holiday (varies yearly)'],
              ['Christmas Day', 'December 25', 'Holiday'],
              ['New Year\'s Eve', 'December 31', 'Holiday'],
              ['Summer Solstice', 'June 21', 'Astronomical'],
              ['Winter Solstice', 'December 21', 'Astronomical'],
              ['First Day of Summer', 'June 21', 'Season'],
              ['First Day of Fall', 'September 22', 'Season'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="business-days">Understanding Business Days vs Calendar Days</SEOHeading>
          <SEOParagraph>
            The distinction between <strong>business days</strong> and <strong>calendar days</strong> matters for shipping estimates, legal deadlines, contract terms, financial processing, and project management. Here is what you need to know:
          </SEOParagraph>
          <SEOTable
            caption="Business Days vs Calendar Days Comparison"
            headers={['Time Period', 'Calendar Days', 'Business Days', 'Difference']}
            rows={[
              ['1 week', '7 days', '5 days', '2 weekend days'],
              ['2 weeks', '14 days', '10 days', '4 weekend days'],
              ['1 month (avg)', '30 days', '~22 days', '~8 weekend days'],
              ['1 quarter', '91 days', '~65 days', '~26 weekend days'],
              ['6 months', '182 days', '~130 days', '~52 weekend days'],
              ['1 year', '365 days', '~260 days', '~105 weekend days'],
            ]}
          />
          <SEOBulletList items={[
            'Shipping "3-5 business days" means Monday to Friday only — a package shipped Friday might not arrive until the following Wednesday to Friday.',
            'Legal deadlines in "30 calendar days" includes weekends and holidays, while "20 business days" excludes them.',
            'Bank processing typically refers to business days — a wire transfer taking "1-2 business days" sent on Friday may not clear until Tuesday.',
            'Tax filing deadlines use calendar dates, but if a deadline falls on a weekend or holiday, it extends to the next business day.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="leap-year">Leap Year Rules: When Does February Have 29 Days?</SEOHeading>
          <SEOParagraph>
            A <strong>leap year</strong> occurs every 4 years, adding an extra day (February 29) to keep the calendar aligned with Earth&apos;s orbit around the Sun. However, the rules have exceptions:
          </SEOParagraph>
          <SEONumberedList items={[
            'A year is a leap year if it is divisible by 4 (2024, 2028, 2032 are leap years).',
            'EXCEPTION: Century years (ending in 00) are NOT leap years, even if divisible by 4 (1700, 1800, 1900 were NOT leap years).',
            'EXCEPTION TO THE EXCEPTION: Century years divisible by 400 ARE leap years (1600, 2000, 2400 ARE leap years).',
          ]} />
          <SEOTable
            caption="Upcoming Leap Years"
            headers={['Leap Year', 'Day of Week (Feb 29)', 'Days in Year']}
            rows={[
              ['2024', 'Thursday', '366'],
              ['2028', 'Tuesday', '366'],
              ['2032', 'Sunday', '366'],
              ['2036', 'Friday', '366'],
              ['2040', 'Wednesday', '366'],
              ['2100', 'N/A (NOT a leap year)', '365'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="days-calculator-faq">Frequently Asked Questions</SEOHeading>
          <SEOFAQ items={[
            { question: 'How do I calculate business days between two dates?', answer: 'Our calculator counts total calendar days and can also show business days (Monday-Friday, excluding weekends). For precise business day calculations that also exclude public holidays, note that holiday schedules vary by country and region. Our tool counts weekdays, which is the standard business day calculation.' },
            { question: 'Does the calculator include the start and end dates?', answer: 'By default, the calculator counts the number of days between the two dates, not including the start date but including the end date. This is the standard calculation method used in most applications. The difference between including or excluding the end date is always exactly 1 day.' },
            { question: 'How many days am I old?', answer: 'Enter your birthdate as the start date and today as the end date to see your exact age in days. The average person reaches 10,000 days old around age 27, 20,000 days around age 54, and 30,000 days around age 82. It is a fun milestone to celebrate!' },
            { question: 'How do I count down to a future event?', answer: 'Enter today\'s date as the start date and, your event date as the end date. The calculator will show you the exact number of days, weeks, and months remaining. Popular countdowns include days until Christmas, summer vacation, graduation, wedding, or a scheduled trip.' },
            { question: 'What year was I born if I am N days old?', answer: 'Our calculator works in reverse too! Enter today\'s date and subtract the number of days. For reference: 10,000 days = about 27.4 years, 15,000 days = about 41.1 years, 20,000 days = about 54.8 years, 25,000 days = about 68.5 years.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/age-calculator', title: 'Age Calculator', description: 'Calculate your exact age' },
          { href: '/countdown-timer', title: 'Countdown Timer', description: 'Set countdown alarms' },
          { href: '/world-clock', title: 'World Clock', description: 'Time zones worldwide' },
          { href: '/stopwatch', title: 'Stopwatch', description: 'Time with precision' },
          { href: '/percentage-calculator', title: 'Percentage Calculator', description: 'Calculate percentages' },
        ]} />
      </SEOContentSection>
    </>
  );
}