import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Age Calculator - How Old Am I? Calculate Exact Age in Years, Months, Days, Hours | Free',
  description:
    'Free age calculator - Find your exact age in years, months, days, hours, minutes & seconds! Discover your zodiac sign, next birthday countdown, birthstone & more. Instant results.',
  keywords: [
    'age calculator',
    'how old am i',
    'date of birth calculator',
    'calculate age',
    'age in years months days',
    'exact age calculator',
    'chronological age calculator',
    'how old am I in days',
    'how old am I in weeks',
    'how old am I in seconds',
    'next birthday calculator',
    'zodiac sign by birth date',
    'age calculator online free',
    'find my age',
    'birth date calculator',
    'calculate my age',
    'what is my age',
    'age in days calculator',
    'free age calculator',
    'birthday calculator',
    'age counter',
    'time alive calculator',
    'how many days old am i',
    'how many weeks old am i',
    'how many hours old am i',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/age-calculator',
  },
  openGraph: {
    title: 'Free Age Calculator - Calculate Exact Age in Years, Months, Days',
    description: 'Find out exactly how old you are! Calculate your age in years, months, days, hours, minutes & seconds. Includes zodiac sign, birthstone & birthday countdown.',
    url: 'https://worksyhub.online/age-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Old Am I? Free Age Calculator',
    description: 'Calculate your exact age instantly. Years, months, days, hours, minutes & seconds!',
  }
};

export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Age Calculator - Calculate Exact Age',
    description: 'Calculate your exact age in years, months, days, hours, minutes, and seconds. Includes zodiac sign, birthstone, and next birthday countdown.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: 'https://worksyhub.online/age-calculator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: 'WorksyHub' }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Age Calculator', item: 'https://worksyhub.online/age-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I calculate my exact age?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your date of birth in our age calculator to get your exact age in years, months, days, hours, minutes, and seconds. The calculator automatically computes the difference between your birth date and today.' } },
      { '@type': 'Question', name: 'How many days old am I?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your date of birth and our calculator will tell you exactly how many days you have been alive, along with weeks, hours, minutes, and seconds.' } },
      { '@type': 'Question', name: 'What is chronological age?', acceptedAnswer: { '@type': 'Answer', text: 'Chronological age is your exact age measured from your date of birth to the current date. It is the standard way age is measured for legal, medical, and social purposes.' } },
      { '@type': 'Question', name: 'How do I find my zodiac sign from my birthday?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your date of birth in our calculator and it will automatically display your zodiac sign based on the sun sign dates. Each zodiac sign covers approximately one month of the year.' } },
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
          <SEOHeading level={2} id="how-old-am-i">How Old Am I? Understanding Age Calculation</SEOHeading>
          <SEOParagraph>
            Have you ever wondered exactly how old you are — not just in years, but down to the very second? Our <strong>free age calculator</strong> provides a complete breakdown of your age in every possible unit: years, months, weeks, days, hours, minutes, and seconds. Simply enter your date of birth and get instant, precise results.
          </SEOParagraph>
          <SEOParagraph>
            Age calculation may seem straightforward, but it involves several nuances. Different months have different numbers of days (28, 29, 30, or 31), and leap years add an extra day every four years. Our calculator handles all these complexities automatically, giving you the most accurate result possible based on the Gregorian calendar used worldwide.
          </SEOParagraph>
          <SEOParagraph>
            Beyond just calculating your age, this tool reveals fascinating facts about your life including your zodiac sign, Chinese zodiac animal, birthstone, and a countdown to your next birthday. Whether you need your exact age for an official form, want to celebrate a milestone, or are simply curious — this calculator has everything you need.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="how-age-is-calculated">How Age is Calculated: The Mathematics Behind It</SEOHeading>
          <SEOParagraph>
            Age calculation follows a specific methodology to ensure accuracy across different calendar lengths. Here is the step-by-step process our calculator uses:
          </SEOParagraph>
          <SEONumberedList items={[
            'Start with the birth date (day, month, year) and the current date (or a specified target date).',
            'Calculate the difference in years by subtracting the birth year from the current year.',
            'Adjust for months: If the current month is before the birth month, subtract one year from the total and add 12 to the month difference.',
            'Adjust for days: If the current day is before the birth day in the current month, subtract one month and add the appropriate number of days from the previous month.',
            'Account for leap years: February 29 birthdays are handled correctly, with age incrementing on February 28 or March 1 in non-leap years.',
            'Convert total days to additional units: weeks, hours (×24), minutes (×1440), and seconds (×86400).',
          ]} />
          <SEOCallout type="info">
            <strong>Leap Year Rule:</strong> A year is a leap year if it is divisible by 4, EXCEPT for century years (divisible by 100), which must also be divisible by 400 to be leap years. So 2000 was a leap year, but 1900 was not, and 2100 will not be.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="age-milestones">Age Milestones: How Old Am I in Different Units?</SEOHeading>
          <SEOParagraph>
            It is fascinating to see your age expressed in different units of time. Here is a reference table showing approximate conversions for common ages:
          </SEOParagraph>
          <SEOTable
            caption="Age Breakdown by Different Time Units"
            headers={['Age (Years)', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes']}
            rows={[
              ['1', '12', '52', '365', '8,760', '525,600'],
              ['5', '60', '261', '1,826', '43,830', '2,629,800'],
              ['10', '120', '522', '3,652', '87,660', '5,259,600'],
              ['15', '180', '783', '5,479', '131,490', '7,889,400'],
              ['18', '216', '939', '6,574', '157,776', '9,466,560'],
              ['21', '252', '1,096', '7,670', '184,080', '11,044,800'],
              ['25', '300', '1,304', '9,131', '219,150', '13,149,000'],
              ['30', '360', '1,565', '10,957', '262,980', '15,778,800'],
              ['40', '480', '2,087', '14,610', '350,640', '21,038,400'],
              ['50', '600', '2,609', '18,262', '438,300', '26,298,000'],
              ['60', '720', '3,131', '21,915', '525,960', '31,557,600'],
              ['70', '840', '3,652', '25,567', '613,620', '36,817,200'],
              ['80', '960', '4,174', '29,220', '701,280', '42,076,800'],
              ['90', '1,080', '4,696', '32,872', '788,940', '47,336,400'],
              ['100', '1,200', '5,218', '36,525', '876,600', '52,596,000'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="zodiac-signs">Zodiac Signs by Birth Date: Complete Guide</SEOHeading>
          <SEOParagraph>
            Your <strong>zodiac sign</strong> (also called sun sign or star sign) is determined by the position of the Sun at the time of your birth. The Western zodiac system divides the year into 12 signs, each associated with specific personality traits, elements, and ruling planets. Our age calculator automatically identifies your zodiac sign based on your date of birth.
          </SEOParagraph>
          <SEOTable
            caption="Complete Zodiac Sign Chart with Dates and Elements"
            headers={['Zodiac Sign', 'Date Range', 'Element', 'Symbol', 'Key Traits']}
            rows={[
              ['Aries', 'Mar 21 – Apr 19', 'Fire', '♈ Ram', 'Bold, ambitious, confident, energetic'],
              ['Taurus', 'Apr 20 – May 20', 'Earth', '♉ Bull', 'Reliable, patient, practical, devoted'],
              ['Gemini', 'May 21 – Jun 20', 'Air', '♊ Twins', 'Adaptable, curious, communicative, witty'],
              ['Cancer', 'Jun 21 – Jul 22', 'Water', '♋ Crab', 'Intuitive, emotional, protective, loyal'],
              ['Leo', 'Jul 23 – Aug 22', 'Fire', '♌ Lion', 'Creative, passionate, generous, cheerful'],
              ['Virgo', 'Aug 23 – Sep 22', 'Earth', '♍ Maiden', 'Analytical, kind, hardworking, practical'],
              ['Libra', 'Sep 23 – Oct 22', 'Air', '♎ Scales', 'Diplomatic, fair, social, gracious'],
              ['Scorpio', 'Oct 23 – Nov 21', 'Water', '♏ Scorpion', 'Resourceful, brave, passionate, focused'],
              ['Sagittarius', 'Nov 22 – Dec 21', 'Fire', '♐ Archer', 'Optimistic, freedom-loving, humorous, generous'],
              ['Capricorn', 'Dec 22 – Jan 19', 'Earth', '♑ Sea-Goat', 'Responsible, disciplined, self-controlled, ambitious'],
              ['Aquarius', 'Jan 20 – Feb 18', 'Air', '♒ Water Bearer', 'Progressive, original, independent, humanitarian'],
              ['Pisces', 'Feb 19 – Mar 20', 'Water', '♓ Fish', 'Compassionate, artistic, intuitive, gentle'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="birthstones">Birthstones by Month: Complete Guide</SEOHeading>
          <SEOParagraph>
            <strong>Birthstones</strong> are gemstones traditionally associated with each month of birth. The modern birthstone list was established by the American National Association of Jewelers in 1912 and updated in 2002 by the American Gem Trade Association. Our age calculator displays your birthstone based on your birth month.
          </SEOParagraph>
          <SEOTable
            caption="Modern Birthstone Chart by Month"
            headers={['Month', 'Birthstone', 'Color', 'Symbolism']}
            rows={[
              ['January', 'Garnet', 'Deep Red', 'Protection, friendship, trust'],
              ['February', 'Amethyst', 'Purple', 'Wisdom, courage, peace'],
              ['March', 'Aquamarine', 'Light Blue', 'Serenity, clarity, harmony'],
              ['April', 'Diamond', 'Clear/White', 'Strength, eternal love, invincibility'],
              ['May', 'Emerald', 'Green', 'Rebirth, love, wisdom, fertility'],
              ['June', 'Pearl / Alexandrite', 'White / Color-changing', 'Purity, innocence, loyalty'],
              ['July', 'Ruby', 'Red', 'Passion, courage, nobility'],
              ['August', 'Peridot', 'Yellow-Green', 'Strength, protection, harmony'],
              ['September', 'Sapphire', 'Blue', 'Wisdom, royalty, divine favor'],
              ['October', 'Opal / Tourmaline', 'Multi-color / Pink', 'Hope, creativity, innocence'],
              ['November', 'Topaz / Citrine', 'Yellow / Orange', 'Friendship, strength, healing'],
              ['December', 'Tanzanite / Turquoise', 'Blue / Blue-Green', 'Good fortune, success, prosperity'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="chinese-zodiac">Chinese Zodiac by Birth Year</SEOHeading>
          <SEOParagraph>
            The <strong>Chinese zodiac</strong> is a 12-year cycle where each year is associated with an animal sign. Unlike the Western zodiac which changes monthly, the Chinese zodiac changes annually (based on the Chinese lunar calendar). Each animal carries distinct personality traits and cultural significance throughout East Asian culture.
          </SEOParagraph>
          <SEOTable
            caption="Chinese Zodiac Animals and Recent Years"
            headers={['Animal', 'Recent Years', 'Traits', 'Compatible With']}
            rows={[
              ['Rat', '1984, 1996, 2008, 2020', 'Quick-witted, resourceful, versatile', 'Dragon, Monkey, Ox'],
              ['Ox', '1985, 1997, 2009, 2021', 'Diligent, dependable, determined', 'Rat, Snake, Rooster'],
              ['Tiger', '1986, 1998, 2010, 2022', 'Brave, confident, competitive', 'Dragon, Horse, Pig'],
              ['Rabbit', '1987, 1999, 2011, 2023', 'Quiet, elegant, kind, patient', 'Sheep, Monkey, Dog, Pig'],
              ['Dragon', '1988, 2000, 2012, 2024', 'Confident, ambitious, powerful', 'Rooster, Rat, Monkey'],
              ['Snake', '1989, 2001, 2013, 2025', 'Enigmatic, intelligent, wise', 'Dragon, Rooster'],
              ['Horse', '1990, 2002, 2014, 2026', 'Animated, active, energetic', 'Tiger, Sheep, Rabbit'],
              ['Sheep', '1991, 2003, 2015, 2027', 'Calm, gentle, sympathetic', 'Rabbit, Horse, Pig'],
              ['Monkey', '1992, 2004, 2016, 2028', 'Sharp, smart, curiosity', 'Ox, Rabbit'],
              ['Rooster', '1993, 2005, 2017, 2029', 'Observant, hardworking, courageous', 'Ox, Snake'],
              ['Dog', '1994, 2006, 2018, 2030', 'Loyal, honest, amiable', 'Rabbit'],
              ['Pig', '1995, 2007, 2019, 2031', 'Compassionate, generous, diligent', 'Tiger, Rabbit, Sheep'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="age-uses">Why You Need to Know Your Exact Age</SEOHeading>
          <SEOBulletList items={[
            'Legal age requirements: Voting (18 in most countries), driving (16-18), drinking alcohol (18-21), marriage, and retirement eligibility all depend on precise age calculations.',
            'Insurance applications: Life, health, and auto insurance premiums are heavily influenced by your exact age at the time of application. Even a few days can affect your premium category.',
            'Medical and healthcare: Doctors use exact age to determine vaccination schedules, medication dosages for children, screening recommendations, and age-specific health guidelines.',
            'Government benefits and pensions: Social Security, Medicare, and pension eligibility depend on reaching specific ages. In the US, Social Security benefits vary based on whether you claim at age 62, 66, or 70.',
            'Academic enrollment: School and university enrollment deadlines often require students to reach a specific age by a certain date. This is critical for kindergarten and first-grade enrollment.',
            'Visa and immigration: Many visa programs have age requirements or preferences. Working holiday visas, for example, typically require applicants to be between 18 and 30 (or 35).',
            'Sports and athletics: Age groups in amateur and professional sports are strictly defined. Knowing your exact age ensures you compete in the correct category.',
            'Milestone celebrations: Tracking your exact age helps you plan and celebrate significant birthdays and milestones like turning 1,000 weeks old or 10,000 days old.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="age-around-world">How Different Cultures Calculate Age</SEOHeading>
          <SEOParagraph>
            Age calculation is not universal — different cultures have fascinating variations in how they count years of life. Understanding these differences is important for international communication and cultural awareness.
          </SEOParagraph>

          <SEOHeading level={3}>Western System (International Standard)</SEOHeading>
          <SEOParagraph>
            In most Western countries and the international standard, a newborn is considered zero years old (age 0) at birth. They turn 1 after completing their first full year. This is the system our calculator uses and is the most widely adopted worldwide.
          </SEOParagraph>

          <SEOHeading level={3}>East Asian Age Reckoning (Korean Age)</SEOHeading>
          <SEOParagraph>
            In the traditional East Asian system (historically used in Korea, China, Japan, Mongolia, and Vietnam), a baby is considered 1 year old at birth. Everyone then gains one year on January 1st, regardless of their actual birthday. This means a baby born on December 31 would be considered 2 years old the next day (January 1). South Korea officially switched to the international age system in June 2023, though the traditional system is still informally used.
          </SEOParagraph>

          <SEOHeading level={3}>Islamic Calendar Age</SEOHeading>
          <SEOParagraph>
            Some Muslim-majority countries calculate age using the Islamic (Hijri) calendar, which is a lunar calendar approximately 10-11 days shorter than the Gregorian solar calendar. This means a person may be numerically older in Hijri years than in Gregorian years. For example, someone who is 30 Gregorian years old would be approximately 30.9 Hijri years old.
          </SEOParagraph>

          <SEOTable
            caption="Age Comparison Across Different Systems"
            headers={['Scenario', 'Western Age', 'East Asian (Traditional)', 'Hijri Age (Approx)']}
            rows={[
              ['Newborn (Jan 15)', '0', '1', '0'],
              ['Same child on Jan 16', '0', '1', '0'],
              ['Same child next Jan 1', '0 (11.5 months)', '2', '0'],
              ['10 years later (same birthday)', '10', '11 or 12', '~10.3'],
              ['20 years later', '20', '21 or 22', '~20.6'],
              ['30 years later', '30', '31 or 32', '~30.9'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="generation-chart">Generation Chart: Which Generation Am I?</SEOHeading>
          <SEOParagraph>
            Your birth year determines which generation you belong to. Each generation is shaped by shared cultural, economic, and technological experiences. Use this chart to find your generation:
          </SEOParagraph>
          <SEOTable
            caption="Generational Cohorts by Birth Year"
            headers={['Generation', 'Birth Years', 'Age in 2025', 'Key Characteristics']}
            rows={[
              ['Silent Generation', '1928–1945', '80–97', 'Post-war builders, traditional values, financial caution'],
              ['Baby Boomers', '1946–1964', '61–79', 'Economic prosperity, social change, work-centric'],
              ['Generation X', '1965–1980', '45–60', 'Independent, adaptable, work-life balance pioneers'],
              ['Millennials (Gen Y)', '1981–1996', '29–44', 'Tech-savvy, value experiences, socially conscious'],
              ['Generation Z', '1997–2012', '13–28', 'Digital natives, diverse, entrepreneurial, pragmatic'],
              ['Generation Alpha', '2013–2025', '0–12', 'AI-native, screen-fluent, globally connected'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="fun-age-facts">Fun Facts About Age and Time</SEOHeading>
          <SEOBulletList items={[
            'You blink about 15-20 times per minute, which means by age 30 you have blinked approximately 236 million to 315 million times.',
            'Your heart beats about 100,000 times per day. By age 70, your heart will have beaten approximately 2.5 billion times.',
            'The average person spends about 26 years sleeping in their lifetime — that is roughly one-third of their life.',
            'By age 50, you will have walked approximately 75,000 miles (120,000 km), enough to circumnavigate the Earth three times.',
            'People born on February 29 (leap day) only get to celebrate their actual birthday once every four years. A 40-year-old leap day baby has only had 10 actual birthdays.',
            'The oldest verified person in history was Jeanne Calment of France, who lived to 122 years and 164 days (1875-1997).',
            'If you are 30 years old, you have lived through approximately 10,957 sunrises and sunsets.',
            'By age 60, you will have spent about 5 years eating and drinking — approximately 79,000 meals.',
            'The average human speaks about 16,000 words per day. By age 50, you will have spoken approximately 292 million words.',
            'At age 25, the human brain is considered fully mature. Before this age, the prefrontal cortex (responsible for decision-making and impulse control) is still developing.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="age-faq">Frequently Asked Questions About Age Calculation</SEOHeading>
          <SEOFAQ items={[
            { question: 'How do I calculate my exact age in years, months, and days?', answer: 'Enter your date of birth in our age calculator and it will instantly compute your exact age broken down into years, months, and days. The calculator accounts for different month lengths and leap years for maximum accuracy. For example, if you were born on March 15, 1990, and today is February 10, 2025, you are exactly 34 years, 10 months, and 26 days old.' },
            { question: 'How many days old am I if I was born in 1990?', answer: 'If you were born on January 1, 1990, you would be approximately 12,824 days old as of February 2025. The exact number depends on your specific birth date. Enter your exact date of birth in our calculator for a precise count that accounts for leap years.' },
            { question: 'What is the difference between chronological age and biological age?', answer: 'Chronological age is the time elapsed since your birth, measured in standard calendar units. Biological age (also called physiological age) reflects the actual condition of your body and organs compared to population averages. Two people of the same chronological age can have different biological ages based on genetics, lifestyle, diet, exercise habits, and environmental factors. Scientists measure biological age through biomarkers like telomere length, epigenetic markers, and organ function tests.' },
            { question: 'How do leap years affect age calculation?', answer: 'Leap years add one extra day (February 29) every four years, which affects precise day-count calculations. Our calculator correctly accounts for all leap years. For people born on February 29, their age increments annually, but their actual birthday only occurs in leap years. In non-leap years, they typically celebrate on either February 28 or March 1.' },
            { question: 'What is Korean age and how is it different?', answer: 'In the traditional Korean age system, a baby is considered 1 year old at birth, and everyone gains one year of age on January 1st (Korean New Year). This means a person could be 1-2 years "older" in Korean age than in international age. South Korea officially adopted the international age system in June 2023, but traditional Korean age is still used informally and culturally.' },
            { question: 'How accurate is this online age calculator?', answer: 'Our age calculator is highly accurate. It uses the Gregorian calendar system, accounts for all leap years (including the century year exception), and correctly handles varying month lengths. The calculator computes your age to the second, updating in real-time. The only limitation is that it relies on the accuracy of the date of birth you enter.' },
            { question: 'Can I calculate age between two specific dates?', answer: 'Yes! While the default mode calculates your age from birth to today, you can use this calculator to find the time difference between any two dates. This is useful for calculating how long you have worked at a job, lived at an address, been in a relationship, or any other time span measurement.' },
            { question: 'Is this age calculator free to use?', answer: 'Yes, this age calculator is completely free with no limits on usage. There is no signup required, no account creation, and no data collection. All calculations are performed locally in your browser, ensuring complete privacy.' },
            { question: 'What is the legal age for different activities around the world?', answer: 'Legal ages vary by country: Voting age is 18 in most countries (16 in some). Drinking age ranges from 16 to 21 (18 in most of Europe, 21 in the US). Driving age is typically 16-18. Marriage age ranges from 16-21 depending on the country and whether parental consent is required. Retirement age is typically 60-67.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/bmi-calculator', title: 'BMI Calculator', description: 'Check your health' },
          { href: '/percentage-calculator', title: 'Percentage Calculator', description: 'Calculate percentages' },
          { href: '/unit-converter', title: 'Unit Converter', description: 'Convert dates & units' },
          { href: '/scientific-calculator', title: 'Scientific Calculator', description: 'Advanced math' },
        ]} />

      </SEOContentSection>
    </>
  );
}