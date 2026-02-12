import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'World Clock - Current Time in All Time Zones | Time Zone Converter Free',
  description:
    'Free world clock — see current time in any city worldwide. Time zone converter for meetings, travel & business. UTC, EST, PST, GMT, IST, JST & 200+ time zones.',
  keywords: [
    'world clock', 'world time', 'current time', 'time now',
    'world clock online', 'time zone converter', 'time zone calculator',
    'time difference calculator', 'time zones around the world',
    'current time UTC', 'current time EST', 'current time PST',
    'current time GMT', 'current time IST', 'current time JST',
    'current time CST', 'current time MST', 'current time CET',
    'PST to EST', 'EST to GMT', 'GMT to IST', 'PST to GMT',
    'EST to PST', 'UTC to EST', 'IST to EST', 'CST to EST',
    'PST to CET', 'GMT to PST', 'EST to IST', 'UTC to local time',
    'time in New York', 'time in London', 'time in Tokyo',
    'time in Sydney', 'time in Dubai', 'time in Singapore',
    'time in Los Angeles', 'time in Chicago', 'time in Mumbai',
    'time in Berlin', 'time in Paris', 'time in Hong Kong',
    'meeting scheduler across time zones', 'global meeting planner',
    'international time converter', 'daylight saving time',
    'DST clock change', 'UTC offset', 'GMT offset',
    'world time zones map', 'time zone abbreviations',
    'military time converter', '24 hour clock converter',
    'what time is it in', 'time zone comparison',
  ],
  alternates: { canonical: 'https://worksyhub.online/world-clock' },
  openGraph: {
    title: 'World Clock — Current Time in Every Time Zone',
    description: 'See current time worldwide. Convert time zones for meetings. UTC, EST, PST, GMT, IST & 200+ zones.',
    url: 'https://worksyhub.online/world-clock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Clock & Time Zone Converter',
    description: 'Current time in any city. Convert EST to PST, GMT to IST, UTC to local & more!',
  },
};

export default function WorldClockLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'World Clock & Time Zone Converter',
    description: 'View current time in any city worldwide and convert between time zones. Essential for international business, travel, and remote teams.',
    applicationCategory: 'UtilityApplication', operatingSystem: 'Any',
    url: 'https://worksyhub.online/world-clock',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'World Clock', item: 'https://worksyhub.online/world-clock' },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is UTC?', acceptedAnswer: { '@type': 'Answer', text: 'UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks. It does not change with daylight saving time. All other time zones are defined as offsets from UTC, such as EST = UTC-5, IST = UTC+5:30, and JST = UTC+9.' } },
      { '@type': 'Question', name: 'What is the difference between GMT and UTC?', acceptedAnswer: { '@type': 'Answer', text: 'GMT (Greenwich Mean Time) and UTC (Coordinated Universal Time) are essentially the same in terms of time. GMT is a time zone used in the UK during winter, while UTC is the universal time standard used for international timekeeping. UTC is the more technically precise term.' } },
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
          <SEOHeading level={2} id="about-world-clock">World Clock: See the Current Time Anywhere in the World</SEOHeading>
          <SEOParagraph>
            Our <strong>free world clock</strong> shows the current time in cities and time zones around the globe, updated in real-time. Whether you need to schedule a meeting across continents, call a colleague in another country, check if a store in another time zone is open, or plan international travel, our world clock gives you instant, accurate time information for any location.
          </SEOParagraph>
          <SEOParagraph>
            The built-in <strong>time zone converter</strong> makes it easy to find the perfect meeting time that works across multiple time zones — essential for remote teams, international businesses, freelancers working with global clients, and anyone coordinating across borders. Simply compare the times in different cities at a glance.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="time-zone-reference">Major Time Zones Quick Reference</SEOHeading>
          <SEOTable
            caption="World Time Zones — UTC Offsets and Major Cities"
            headers={['Abbreviation', 'Full Name', 'UTC Offset', 'Major Cities']}
            rows={[
              ['UTC', 'Coordinated Universal Time', 'UTC ±0', 'Reykjavik'],
              ['GMT', 'Greenwich Mean Time', 'UTC ±0', 'London (winter), Lisbon, Dublin'],
              ['BST', 'British Summer Time', 'UTC +1', 'London (summer)'],
              ['CET', 'Central European Time', 'UTC +1', 'Paris, Berlin, Rome, Madrid'],
              ['CEST', 'Central European Summer', 'UTC +2', 'Paris (summer), Berlin (summer)'],
              ['EET', 'Eastern European Time', 'UTC +2', 'Athens, Helsinki, Bucharest'],
              ['MSK', 'Moscow Standard Time', 'UTC +3', 'Moscow, St. Petersburg'],
              ['GST', 'Gulf Standard Time', 'UTC +4', 'Dubai, Abu Dhabi, Muscat'],
              ['IST', 'India Standard Time', 'UTC +5:30', 'Mumbai, Delhi, Bangalore, Chennai'],
              ['NPT', 'Nepal Time', 'UTC +5:45', 'Kathmandu'],
              ['ICT', 'Indochina Time', 'UTC +7', 'Bangkok, Ho Chi Minh City, Jakarta'],
              ['CST (China)', 'China Standard Time', 'UTC +8', 'Beijing, Shanghai, Hong Kong, Singapore'],
              ['JST', 'Japan Standard Time', 'UTC +9', 'Tokyo, Osaka, Seoul'],
              ['ACST', 'Australian Central Standard', 'UTC +9:30', 'Adelaide, Darwin'],
              ['AEST', 'Australian Eastern Standard', 'UTC +10', 'Sydney, Melbourne, Brisbane'],
              ['NZST', 'New Zealand Standard', 'UTC +12', 'Auckland, Wellington'],
              ['HST', 'Hawaii Standard Time', 'UTC -10', 'Honolulu'],
              ['AKST', 'Alaska Standard Time', 'UTC -9', 'Anchorage'],
              ['PST', 'Pacific Standard Time', 'UTC -8', 'Los Angeles, San Francisco, Seattle'],
              ['MST', 'Mountain Standard Time', 'UTC -7', 'Denver, Phoenix, Salt Lake City'],
              ['CST (US)', 'Central Standard Time', 'UTC -6', 'Chicago, Houston, Dallas, Mexico City'],
              ['EST', 'Eastern Standard Time', 'UTC -5', 'New York, Toronto, Miami, Atlanta'],
              ['AST', 'Atlantic Standard Time', 'UTC -4', 'Halifax, La Paz, Caracas'],
              ['BRT', 'Brasília Time', 'UTC -3', 'São Paulo, Rio de Janeiro, Buenos Aires'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="time-conversion">Common Time Zone Conversions</SEOHeading>
          <SEOParagraph>
            Planning a meeting or call across time zones? Here are the most commonly searched time conversions:
          </SEOParagraph>
          <SEOTable
            caption="Quick Time Zone Conversion Reference (Standard Time)"
            headers={['When it is...', 'PST (LA)', 'MST (Denver)', 'CST (Chicago)', 'EST (NYC)', 'GMT (London)', 'CET (Paris)', 'IST (Mumbai)', 'JST (Tokyo)', 'AEST (Sydney)']}
            rows={[
              ['9:00 AM EST', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '2:00 PM', '3:00 PM', '7:30 PM', '11:00 PM', '1:00 AM +1'],
              ['12:00 PM EST', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '5:00 PM', '6:00 PM', '10:30 PM', '2:00 AM +1', '4:00 AM +1'],
              ['3:00 PM EST', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '8:00 PM', '9:00 PM', '1:30 AM +1', '5:00 AM +1', '7:00 AM +1'],
              ['9:00 AM GMT', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '9:00 AM', '10:00 AM', '2:30 PM', '6:00 PM', '8:00 PM'],
              ['12:00 PM GMT', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '12:00 PM', '1:00 PM', '5:30 PM', '9:00 PM', '11:00 PM'],
              ['9:00 AM PST', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '5:00 PM', '6:00 PM', '10:30 PM', '2:00 AM +1', '4:00 AM +1'],
            ]}
          />
          <SEOCallout type="tip">
            <strong>Meeting scheduling tip:</strong> The best window for meetings between US East Coast (EST) and Europe (CET) is 9-11 AM EST / 3-5 PM CET. For US West Coast (PST) and India (IST), try 7-9 AM PST / 8:30-10:30 PM IST. These windows overlap during normal waking hours for both parties.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="daylight-saving">Daylight Saving Time (DST) Guide</SEOHeading>
          <SEOParagraph>
            <strong>Daylight Saving Time (DST)</strong> complicates time zone conversions because not all countries observe it, and those that do change at different dates. During DST, clocks move forward one hour in spring ("spring forward") and back one hour in fall ("fall back"), affecting most of North America, Europe, and parts of South America and Oceania.
          </SEOParagraph>
          <SEOTable
            caption="Daylight Saving Time Dates by Region (2025)"
            headers={['Region', 'Clocks Spring Forward', 'Clocks Fall Back', 'Time Shift']}
            rows={[
              ['USA & Canada', 'March 9, 2025', 'November 2, 2025', '+1 hour (2:00 AM)'],
              ['European Union', 'March 30, 2025', 'October 26, 2025', '+1 hour (1:00 AM UTC)'],
              ['United Kingdom', 'March 30, 2025', 'October 26, 2025', '+1 hour (1:00 AM GMT)'],
              ['Australia (most states)', 'October 5, 2025', 'April 6, 2025', '+1 hour (2:00 AM)'],
              ['New Zealand', 'September 28, 2025', 'April 6, 2025', '+1 hour (2:00 AM)'],
              ['Japan, China, India, Singapore', 'Not observed', 'Not observed', 'No change'],
              ['Arizona (USA), Hawaii', 'Not observed', 'Not observed', 'No change'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="world-clock-faq">Frequently Asked Questions</SEOHeading>
          <SEOFAQ items={[
            { question: 'What is the difference between UTC, GMT, and Zulu time?', answer: 'UTC (Coordinated Universal Time), GMT (Greenwich Mean Time), and Zulu time (Z) all refer to the same time at the Prime Meridian (0° longitude). UTC is the modern technical standard, GMT is the traditional timezone name, and Zulu is the military/aviation designation. For all practical purposes, they are identical.' },
            { question: 'Why do some time zones have 30 or 45-minute offsets?', answer: 'Most time zones are whole-hour offsets from UTC, but some countries chose half-hour or quarter-hour offsets to better align with solar noon. India (UTC+5:30), Iran (UTC+3:30), Nepal (UTC+5:45), and parts of Australia (UTC+9:30) use these non-standard offsets for geographical reasons.' },
            { question: 'How do I schedule a meeting across multiple time zones?', answer: 'First, identify the working hours for each participant\'s time zone. Then find the overlap window where all participants are awake and available. For US + Europe meetings, 9-11 AM EST / 3-5 PM CET works well. For US + Asia meetings, early morning US / evening Asia is typical. Our world clock makes it easy to compare times at a glance.' },
            { question: 'What time zone does my computer or phone use?', answer: 'Your device uses the time zone set in your operating system settings, which is usually auto-detected based on your location. You can change it manually in Settings > Date & Time (iOS/Android) or Settings > Time & Language (Windows). Our world clock automatically detects and displays your local time zone.' },
            { question: 'What is the International Date Line?', answer: 'The International Date Line (IDL) runs roughly along the 180° longitude line in the Pacific Ocean. When you cross it traveling westward, you advance one calendar day (Monday becomes Tuesday). When crossing eastward, you go back one day. Locations just west of the line (like Fiji, Tonga) are among the first to see each new day.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/countdown-timer', title: 'Countdown Timer', description: 'Set alarms & countdowns' },
          { href: '/stopwatch', title: 'Stopwatch', description: 'Time with lap recording' },
          { href: '/days-between-dates', title: 'Days Between Dates', description: 'Count days between dates' },
          { href: '/age-calculator', title: 'Age Calculator', description: 'Calculate exact age' },
        ]} />
      </SEOContentSection>
    </>
  );
}