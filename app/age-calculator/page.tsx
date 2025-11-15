// src/app/age-calculator/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Calendar, BookOpen, Clock, Gift, Star, Gem, HelpCircle, ChevronsRight, Zap, Target, Users, Shield, Globe, TrendingUp, Award, CheckCircle, BarChart3, PieChart, Calculator, Heart, Smile, Moon, Sun, CalendarDays, Clock4, RotateCcw, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Enhanced Helper Functions ---
const getDaySuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const getZodiacSign = (day: number, month: number) => {
  const signs = [
    { sign: 'Capricorn', start: [1, 1], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
    { sign: 'Capricorn', start: [12, 22], end: [12, 31] },
  ];
  const m = month + 1;
  for (const s of signs) {
    if ((m === s.start[0] && day >= s.start[1]) || (m === s.end[0] && day <= s.end[1])) {
      return s.sign;
    }
  }
  return 'Unknown';
};

const getBirthstone = (month: number) => {
  const stones = [
    'Garnet', 'Amethyst', 'Aquamarine', 'Diamond', 'Emerald', 'Pearl',
    'Ruby', 'Peridot', 'Sapphire', 'Opal', 'Topaz', 'Turquoise'
  ];
  return stones[month];
};

const getChineseZodiac = (year: number) => {
  const animals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
  return animals[year % 12];
};

const getGeneration = (year: number) => {
  if (year >= 2013) return 'Generation Alpha';
  if (year >= 1997) return 'Generation Z';
  if (year >= 1981) return 'Millennials';
  if (year >= 1965) return 'Generation X';
  if (year >= 1946) return 'Baby Boomers';
  return 'Silent Generation';
};

// Enhanced Custom Date Picker Component
interface CustomDatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onDateSelect, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const selectDate = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect(selected.toISOString().split('T')[0]);
    onClose();
  };

  const selectYear = (year: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setShowYearSelector(false);
  };

  const selectMonth = (month: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(month);
      return newDate;
    });
    setShowMonthSelector(false);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Generate years for selector (from 1900 to current year)
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  const daysArray = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }

  // Check if a date is today
  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (day: number | null) => {
    if (!day || !selectedDate) return false;
    const selected = new Date(selectedDate);
    return day === selected.getDate() && 
           currentMonth === selected.getMonth() && 
           currentYear === selected.getFullYear();
  };

  // Check if a date is in the future
  const isFuture = (day: number | null) => {
    if (!day) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date > new Date();
  };

  return (
    <div 
      ref={pickerRef}
      className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4 min-w-[320px]"
    >
      {/* Header with Year and Month Selectors */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="flex items-center gap-2">
          {/* Month Selector */}
          <div className="relative">
            <button
              onClick={() => setShowMonthSelector(!showMonthSelector)}
              className="px-3 py-1 text-lg font-semibold hover:bg-gray-100 rounded-lg transition-colors min-w-[120px] text-center"
            >
              {months[currentMonth]}
              <ChevronRight className="h-3 w-3 inline-block ml-1 rotate-90" />
            </button>
            
            {showMonthSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto w-32">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => selectMonth(index)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors ${
                      currentMonth === index ? 'bg-blue-50 text-blue-600 font-medium' : ''
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Selector */}
          <div className="relative">
            <button
              onClick={() => setShowYearSelector(!showYearSelector)}
              className="px-3 py-1 text-lg font-semibold hover:bg-gray-100 rounded-lg transition-colors min-w-[80px] text-center"
            >
              {currentYear}
              <ChevronRight className="h-3 w-3 inline-block ml-1 rotate-90" />
            </button>
            
            {showYearSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto w-24">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => selectYear(year)}
                    className={`w-full px-3 py-2 text-center hover:bg-gray-100 transition-colors ${
                      currentYear === year ? 'bg-blue-50 text-blue-600 font-medium' : ''
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysArray.map((day, index) => (
          <button
            key={index}
            onClick={() => day && !isFuture(day) && selectDate(day)}
            disabled={!day || isFuture(day)}
            className={`
              h-10 rounded-lg text-sm font-medium transition-all
              ${!day ? 'invisible' : ''}
              ${day && isSelected(day) 
                ? 'bg-blue-500 text-white shadow-md' 
                : day && isToday(day)
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : day && isFuture(day)
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:border hover:border-gray-300'
              }
            `}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => {
              const today = new Date();
              onDateSelect(today.toISOString().split('T')[0]);
              onClose();
            }}
            className="flex-1 py-2 px-3 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              onDateSelect(yesterday.toISOString().split('T')[0]);
              onClose();
            }}
            className="flex-1 py-2 px-3 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Yesterday
          </button>
        </div>
        
        {/* Decade Quick Select */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              const date = new Date();
              date.setFullYear(date.getFullYear() - 20);
              setCurrentDate(date);
            }}
            className="py-1 px-2 text-xs bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors"
          >
            -20 Years
          </button>
          <button
            onClick={() => {
              const date = new Date();
              date.setFullYear(date.getFullYear() - 10);
              setCurrentDate(date);
            }}
            className="py-1 px-2 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
          >
            -10 Years
          </button>
          <button
            onClick={() => {
              const date = new Date();
              date.setFullYear(date.getFullYear() - 5);
              setCurrentDate(date);
            }}
            className="py-1 px-2 text-xs bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition-colors"
          >
            -5 Years
          </button>
          <button
            onClick={() => {
              const date = new Date();
              date.setFullYear(date.getFullYear() - 1);
              setCurrentDate(date);
            }}
            className="py-1 px-2 text-xs bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors"
          >
            -1 Year
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Enhanced Interface with New Features ---
interface AgeResult {
  summary: string;
  years: number;
  months: number;
  days: number;
  totalWeeks: string;
  totalDays: string;
  totalHours: string;
  totalMinutes: string;
  totalSeconds: string;
  nextBirthday: {
    date: string;
    daysLeft: number;
    weekday: string;
  };
  zodiacSign: string;
  birthstone: string;
  chineseZodiac: string;
  generation: string;
  lifePercentage: number;
  nextMilestone: {
    age: number;
    yearsLeft: number;
    description: string;
  };
  seasonOfBirth: string;
  dayOfYear: number;
  leapYearsLived: number;
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [ageResult, setAgeResult] = useState<AgeResult | string | null>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  // Enhanced FAQ Schema with more questions
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How accurate is this age calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our age calculator is highly accurate and calculates the exact time difference between your date of birth and today's date, accounting for leap years and varying month lengths to provide precise chronological age calculation."
          }
        },
        {
          "@type": "Question",
          "name": "What is chronological age?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chronological age is the exact amount of time a person has been alive, measured from their date of birth. This differs from biological age, which refers to how old your body seems based on health markers."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate age for a future date?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, this age calculator tool is designed to answer 'how old am I?' by calculating your current age as of today. It provides real-time age calculation based on your date of birth."
          }
        }
      ]
    };

    const scriptId = 'faq-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(faqSchema);

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculateAge();
      }
      if (event.key === 'Escape') {
        setBirthDate('');
        setAgeResult(null);
        setShowCustomDatePicker(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [birthDate]);

  // Enhanced calculateAge Function with New Features
  const calculateAge = () => {
    if (!birthDate) {
      setAgeResult('Please enter a valid birth date.');
      setActiveTab('summary');
      return;
    }
    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setAgeResult('Birth date must be in the past.');
      setActiveTab('summary');
      return;
    }

    // Core Age Calculation
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

    // Enhanced Calculations
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const totalDaysNum = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeksNum = (totalDaysNum / 7).toFixed(2);
    const totalHoursNum = totalDaysNum * 24;
    const totalMinutesNum = totalHoursNum * 60;
    const totalSecondsNum = totalMinutesNum * 60;

    // Next Birthday
    const birthDay = birth.getDate();
    const birthMonth = birth.getMonth();
    let nextBirthdayDate = new Date(today.getFullYear(), birthMonth, birthDay);
    if (nextBirthdayDate < today) {
      nextBirthdayDate.setFullYear(today.getFullYear() + 1);
    }
    const daysLeft = Math.ceil((nextBirthdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const weekday = nextBirthdayDate.toLocaleDateString('en-US', { weekday: 'long' });
    const nextBirthdayString = `${nextBirthdayDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}${getDaySuffix(nextBirthdayDate.getDate())}, ${nextBirthdayDate.getFullYear()}`;

    // New Enhanced Features
    const birthYear = birth.getFullYear();
    const chineseZodiac = getChineseZodiac(birthYear);
    const generation = getGeneration(birthYear);
    
    // Life Percentage (assuming 90 years lifespan)
    const lifePercentage = Math.min(100, (years / 90) * 100);
    
    // Next Milestone
    const nextMilestoneAge = Math.ceil(years / 5) * 5;
    const nextMilestone = {
      age: nextMilestoneAge,
      yearsLeft: nextMilestoneAge - years,
      description: `Your next milestone birthday is ${nextMilestoneAge}`
    };

    // Season of Birth
    const seasonMonth = birth.getMonth();
    let season = '';
    if (seasonMonth >= 2 && seasonMonth <= 4) season = 'Spring';
    else if (seasonMonth >= 5 && seasonMonth <= 7) season = 'Summer';
    else if (seasonMonth >= 8 && seasonMonth <= 10) season = 'Autumn';
    else season = 'Winter';

    // Day of Year
    const startOfYear = new Date(birth.getFullYear(), 0, 0);
    const diff = birth.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Leap Years Lived
    let leapYears = 0;
    for (let y = birthYear; y <= today.getFullYear(); y++) {
      if ((y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)) {
        leapYears++;
      }
    }

    // Set the enhanced result object
    setAgeResult({
      summary: `${years} years, ${months} months, ${days} days`,
      years,
      months,
      days,
      totalWeeks: `${totalWeeksNum} weeks`,
      totalDays: `${totalDaysNum.toLocaleString()} days`,
      totalHours: `${totalHoursNum.toLocaleString()} hours`,
      totalMinutes: `${totalMinutesNum.toLocaleString()} minutes`,
      totalSeconds: `${totalSecondsNum.toLocaleString()} seconds`,
      nextBirthday: {
        date: nextBirthdayString,
        daysLeft: daysLeft,
        weekday: weekday,
      },
      zodiacSign: getZodiacSign(birth.getDate(), birth.getMonth()),
      birthstone: getBirthstone(birth.getMonth()),
      chineseZodiac,
      generation,
      lifePercentage: parseFloat(lifePercentage.toFixed(2)),
      nextMilestone,
      seasonOfBirth: season,
      dayOfYear,
      leapYearsLived: leapYears,
    });
    setActiveTab('summary');
  };

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Massive Content Sections
  const contentSections = [
    {
      id: 'guide',
      title: 'Complete Guide: How to Use Our Advanced Age Calculator',
      icon: ChevronsRight,
      content: [
        {
          title: 'Step 1: Enter Your Exact Birth Date',
          details: [
            "Using our comprehensive age calculator is simple and straightforward. Begin by selecting your complete date of birth using our beautiful custom date picker. Click the date field to reveal an intuitive calendar interface with easy year and month dropdown selectors.",
            "Our enhanced date picker allows you to quickly jump to any year from 1900 to present, select any month instantly, and choose your birth date with precision. No more endless scrolling through months!"
          ]
        },
        {
          title: 'Step 2: Calculate Your Detailed Age Analysis',
          details: [
            "Once you've selected your birth date, initiate the age calculation process by pressing the prominent 'Calculate Age' button. For enhanced user experience, you can also simply press the 'Enter' key on your keyboard for instant calculation.",
            "To quickly reset the age calculator and start fresh, use the 'Escape' key, which clears all inputs and results immediately."
          ]
        },
        {
          title: 'Step 3: Explore Comprehensive Age Results',
          details: [
            "Your detailed age analysis appears instantly after calculation. The summary tab displays your primary chronological age in years, months, and days - the most commonly requested age calculation format.",
            "Navigate through multiple detailed tabs to discover extensive age-related information including total age in weeks, complete days calculation, hours breakdown, minutes count, and even seconds precision. Additional features include next birthday countdown with weekday information, Western zodiac sign identification, traditional birthstone information, Chinese zodiac animal, generational classification, life percentage visualization, upcoming milestone birthdays, birth season analysis, day of year calculation, and leap years experienced."
          ]
        }
      ]
    },
    {
      id: 'features',
      title: 'Advanced Features: Comprehensive Age Analysis Explained',
      icon: Star,
      content: [
        {
          title: 'Precision Chronological Age Calculation (Years, Months, Days)',
          details: [
            "Our age calculator provides the most accurate chronological age calculation available online. The algorithm meticulously computes the exact time elapsed since your date of birth, accounting for leap years, varying month lengths, and all calendar anomalies to deliver precise years, months, and days calculation.",
            "This fundamental age calculation serves as the foundation for all additional features, ensuring complete accuracy in your age analysis."
          ]
        },
        {
          title: 'Complete Total Age Conversion System',
          details: [
            "Experience your entire lifespan converted into comprehensive units with our total age conversion feature. Ever wondered 'Exactly how old am I in total days?' or 'What is my age calculated in seconds?' This advanced functionality provides answers by converting your complete life duration into singular measurements: total weeks calculation, comprehensive days count, complete hours measurement, detailed minutes analysis, and precise seconds calculation.",
            "This fascinating perspective allows you to comprehend the full scope of time you've lived in easily understandable units."
          ]
        },
        {
          title: 'Intelligent Next Birthday Countdown & Analysis',
          details: [
            "Plan your celebrations effectively with our next birthday analysis feature. Receive exact information about your upcoming birthday including the specific date with proper ordinal indicators, the day of the week it occurs on, and a precise countdown in days remaining until your celebration.",
            "This invaluable planning tool helps you organize birthday events, schedule parties, and anticipate your special day with accurate timing information."
          ]
        },
        {
          title: 'Comprehensive Astrological & Generational Analysis',
          details: [
            "Discover fascinating personal insights through our extended analysis features. Based on your exact date of birth, our tool instantly identifies your Western zodiac sign, traditional birthstone according to month, Chinese zodiac animal based on birth year, and generational classification (Baby Boomer, Gen X, Millennial, Gen Z, etc.).",
            "These additional insights provide cultural, astrological, and sociological context to your age calculation experience."
          ]
        },
        {
          title: 'Advanced Life Metrics & Milestone Tracking',
          details: [
            "Gain deeper perspective on your life journey with our advanced metrics. Visualize your life progress through percentage completion (based on average lifespan), identify upcoming milestone birthdays with countdown information, determine your birth season, calculate your specific day of birth within the year, and learn how many leap years you've experienced.",
            "These sophisticated calculations transform simple age calculation into a comprehensive life analysis tool."
          ]
        }
      ]
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions: Age Calculator Comprehensive Guide',
      icon: HelpCircle,
      content: [
        {
          title: 'How accurate is this advanced age calculator tool?',
          details: [
            "Our age calculator represents the pinnacle of accuracy in online age calculation tools. It performs complex chronological calculations between your exact date of birth and the current date, meticulously accounting for leap years, varying month durations, and all calendar peculiarities to deliver precise age results.",
            "The algorithm undergoes regular verification to maintain mathematical precision, ensuring you receive completely accurate chronological age calculation every time you use our age calculator tool."
          ]
        },
        {
          title: 'What exactly is chronological age calculation?',
          details: [
            "Chronological age calculation refers to the precise measurement of time elapsed since a person's date of birth. This objective measurement differs significantly from biological age estimation, which assesses physical condition, or psychological age, which reflects mental and emotional maturity.",
            "Our age calculator focuses exclusively on chronological age calculation, providing the most reliable and standardized measurement of time lived since birth."
          ]
        },
        {
          title: 'Can this age calculator determine age for future dates?',
          details: [
            "This specific age calculator tool is optimized for calculating current chronological age based on present date comparison. It answers the fundamental question 'How old am I right now?' by computing the exact time difference between your birth date and today's date.",
            "For future age projection or historical age calculation for specific past dates, we recommend using our specialized date calculation tools available in our tools collection."
          ]
        },
        {
          title: 'Why might calculated age differ across cultures?',
          details: [
            "Age calculation methods vary significantly across different cultural contexts. Many East Asian cultures, including Korea, China, and Vietnam, traditionally use alternative age reckoning systems where infants are considered one year old at birth and everyone ages simultaneously on New Year's Day rather than individual birthdays.",
            "Our age calculator employs the international standard Western age calculation system, providing consistent chronological age measurement recognized globally for official, medical, and legal purposes."
          ]
        },
        {
          title: 'How does the age calculator handle complex leap year calculations?',
          details: [
            "Our sophisticated age calculation algorithm incorporates comprehensive leap year handling. It automatically identifies all leap years within your lifespan, correctly accounts for the extra day in February during leap years, and ensures accurate day-counting across all calendar variations.",
            "This advanced leap year integration guarantees that your age calculation in days, monthly adjustments, and annual computations remain perfectly accurate regardless of leap year complications."
          ]
        },
        {
          title: "What about privacy and data security with the age calculator?",
          details: [
            "We prioritize user privacy and data security above all else. Our age calculator operates entirely within your web browser - no personal information, including your date of birth, is transmitted to external servers or stored in any database.",
            "All age calculations occur locally on your device, ensuring complete privacy protection. Your birth date and calculated age information never leave your computer or mobile device, providing absolute confidentiality for your personal data."
          ]
        },
        {
          title: "What makes this age calculator superior to others?",
          details: [
            "Our age calculator stands out through its comprehensive feature set, unparalleled accuracy, and user-friendly design. Unlike basic age calculators that only provide years and months, our tool offers extensive analysis including total time conversions, astrological information, generational classification, milestone tracking, and multiple visualization options.",
            "The combination of precision calculation, extensive features, and intuitive interface creates the ultimate age calculation experience available online today."
          ]
        },
        {
          title: "Can I use this age calculator on mobile devices?",
          details: [
            "Absolutely! Our age calculator features fully responsive design optimized for all devices including smartphones, tablets, laptops, and desktop computers. The interface adapts seamlessly to different screen sizes, ensuring optimal user experience regardless of your device.",
            "Mobile users enjoy the same comprehensive features and accurate calculations as desktop users, with touch-friendly controls and mobile-optimized layout for convenient age calculation on the go."
          ]
        }
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Enhanced Header Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-foreground bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Advanced Age Calculator
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Calculate your exact chronological age in years, months, days, hours, minutes, and seconds. 
          Discover comprehensive age analysis including next birthday, zodiac signs, birthstones, generational classification, and advanced life metrics.
        </p>
      </div>

      {/* Calculator Tool - MOVED TO TOP */}
      <div className="p-8 rounded-2xl border-2 bg-card shadow-lg">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-card-foreground">Calculate Your Exact Age Instantly</h2>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Zap className="h-4 w-4" />
            Pro Tips: Press Enter to calculate, Escape to clear • Mobile-friendly • 100% Private
          </p>
        </div>

        {/* Left-Right Layout for Input and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input Section */}
          <div className="space-y-6">
            {/* Enhanced Date Input Section with Custom Picker */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-foreground">
                Your Complete Birth Date
              </label>
              
              <div className="relative">
                {/* Display selected date */}
                {birthDate && (
                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Selected:</strong> {formatDisplayDate(birthDate)}
                    </p>
                  </div>
                )}

                {/* Custom Date Picker Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
                    className="w-full p-4 text-lg rounded-xl border-2 bg-background focus:border-primary transition-colors hover:border-primary/50 cursor-pointer flex items-center justify-between group"
                    style={{ minHeight: '56px' }}
                  >
                    <span className={birthDate ? "text-foreground" : "text-muted-foreground"}>
                      {birthDate ? formatDisplayDate(birthDate) : "Click to select your birth date..."}
                    </span>
                    <Calendar className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>

                  {/* Custom Date Picker */}
                  {showCustomDatePicker && (
                    <CustomDatePicker
                      selectedDate={birthDate}
                      onDateSelect={(date) => {
                        setBirthDate(date);
                        setShowCustomDatePicker(false);
                      }}
                      onClose={() => setShowCustomDatePicker(false)}
                    />
                  )}
                </div>

                {/* Quick actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      const today = new Date();
                      setBirthDate(today.toISOString().split('T')[0]);
                    }}
                    className="flex-1 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => {
                      const yesterday = new Date();
                      yesterday.setDate(yesterday.getDate() - 1);
                      setBirthDate(yesterday.toISOString().split('T')[0]);
                    }}
                    className="flex-1 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    Yesterday
                  </button>
                  <button
                    onClick={() => setBirthDate('')}
                    className="flex-1 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Click the date field to open our enhanced calendar with year/month dropdowns • Select any past date quickly
              </p>
            </div>

            <button
              onClick={calculateAge}
              className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-bold text-lg hover:from-primary/90 hover:to-purple-600/90 transition-all shadow-lg flex items-center justify-center gap-3 hover:scale-105 transform duration-200"
            >
              <Calculator className="h-6 w-6" />
              Calculate My Exact Age
            </button>

            {/* Quick Tips */}
            <div className="p-4 bg-muted/50 rounded-xl space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Quick Tips
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Click the date field to open our enhanced calendar picker</li>
                <li>• Use year/month dropdowns for quick navigation</li>
                <li>• Press <kbd className="px-2 py-1 bg-background rounded border">Enter</kbd> to calculate instantly</li>
                <li>• Press <kbd className="px-2 py-1 bg-background rounded border">Escape</kbd> to clear everything</li>
                <li>• Use Today/Yesterday buttons for quick selection</li>
                <li>• 100% private - no data stored</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Results Section */}
          <div className="lg:pl-6 lg:border-l">
            {ageResult ? (
              typeof ageResult === 'string' ? (
                <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/20 text-center">
                  <p className="text-2xl font-bold text-destructive">{ageResult}</p>
                  <p className="text-sm text-muted-foreground mt-2">Please enter a valid birth date to calculate your age</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Enhanced Tab System */}
                  <div className="flex flex-wrap gap-2 border-b pb-2">
                    {[
                      { id: 'summary', label: 'Age Summary', icon: BarChart3 },
                      { id: 'details', label: 'Time Units', icon: PieChart },
                      { id: 'astrology', label: 'Astrology', icon: Star },
                      { id: 'advanced', label: 'Advanced', icon: TrendingUp }
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-4 font-semibold flex items-center gap-2 transition-all rounded-t-lg ${
                          activeTab === tab.id 
                            ? 'bg-primary text-primary-foreground shadow-lg' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Tab Content */}
                  <div className="min-h-[300px]">
                    {/* Summary Tab */}
                    {activeTab === 'summary' && (
                      <div className="space-y-6">
                        <div className="text-center space-y-4">
                          <p className="text-sm text-muted-foreground uppercase tracking-wide">Your Exact Chronological Age</p>
                          <p className="text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                            {ageResult.summary}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 pt-4">
                          <div className="p-4 bg-background rounded-xl border space-y-3">
                            <p className="text-sm text-muted-foreground">Next Birthday Celebration</p>
                            <p className="text-2xl font-semibold text-foreground">
                              {ageResult.nextBirthday.daysLeft === 0 ? "🎉 Happy Birthday! 🎉" :
                               `${ageResult.nextBirthday.daysLeft} days until ${ageResult.nextBirthday.date}`}
                            </p>
                            <p className="text-lg text-muted-foreground">Falls on a {ageResult.nextBirthday.weekday}</p>
                          </div>
                          
                          <div className="p-4 bg-background rounded-xl border space-y-3">
                            <p className="text-sm text-muted-foreground">Life Progress</p>
                            <div className="w-full bg-muted rounded-full h-4">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-1000"
                                style={{ width: `${ageResult.lifePercentage}%` }}
                              ></div>
                            </div>
                            <p className="text-lg font-semibold text-foreground">{ageResult.lifePercentage}% of average lifespan</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-background rounded-xl border">
                              <p className="text-sm text-muted-foreground">Next Milestone</p>
                              <p className="text-xl font-semibold text-foreground">{ageResult.nextMilestone.age} years</p>
                              <p className="text-sm text-muted-foreground">{ageResult.nextMilestone.yearsLeft} years from now</p>
                            </div>
                            
                            <div className="p-4 bg-background rounded-xl border">
                              <p className="text-sm text-muted-foreground">Generation</p>
                              <p className="text-xl font-semibold text-foreground">{ageResult.generation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Details Tab */}
                    {activeTab === 'details' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-background rounded-xl border text-center">
                          <Clock4 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Total Weeks</p>
                          <p className="text-xl font-semibold text-foreground">{ageResult.totalWeeks}</p>
                        </div>
                        <div className="p-4 bg-background rounded-xl border text-center">
                          <CalendarDays className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Total Days</p>
                          <p className="text-xl font-semibold text-foreground">{ageResult.totalDays}</p>
                        </div>
                        <div className="p-4 bg-background rounded-xl border text-center">
                          <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Total Hours</p>
                          <p className="text-xl font-semibold text-foreground">{ageResult.totalHours}</p>
                        </div>
                        <div className="p-4 bg-background rounded-xl border text-center">
                          <RotateCcw className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Total Minutes</p>
                          <p className="text-xl font-semibold text-foreground">{ageResult.totalMinutes}</p>
                        </div>
                        <div className="p-4 bg-background rounded-xl border text-center col-span-2">
                          <Zap className="h-8 w-8 text-red-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Total Seconds</p>
                          <p className="text-xl font-semibold text-foreground">{ageResult.totalSeconds}</p>
                        </div>
                      </div>
                    )}

                    {/* Astrology Tab */}
                    {activeTab === 'astrology' && (
                      <div className="grid grid-cols-1 gap-6">
                        <div className="p-6 bg-background rounded-xl border text-center space-y-4">
                          <Star className="h-12 w-12 text-yellow-500 mx-auto" />
                          <p className="text-sm text-muted-foreground">Western Zodiac Sign</p>
                          <p className="text-3xl font-bold text-foreground">{ageResult.zodiacSign}</p>
                          <p className="text-sm text-muted-foreground">Based on your birth date</p>
                        </div>
                        <div className="p-6 bg-background rounded-xl border text-center space-y-4">
                          <Gem className="h-12 w-12 text-cyan-500 mx-auto" />
                          <p className="text-sm text-muted-foreground">Traditional Birthstone</p>
                          <p className="text-3xl font-bold text-foreground">{ageResult.birthstone}</p>
                          <p className="text-sm text-muted-foreground">For your birth month</p>
                        </div>
                        <div className="p-6 bg-background rounded-xl border text-center space-y-4">
                          <Users className="h-12 w-12 text-green-500 mx-auto" />
                          <p className="text-sm text-muted-foreground">Chinese Zodiac Animal</p>
                          <p className="text-3xl font-bold text-foreground">{ageResult.chineseZodiac}</p>
                          <p className="text-sm text-muted-foreground">Based on your birth year</p>
                        </div>
                      </div>
                    )}

                    {/* Advanced Tab */}
                    {activeTab === 'advanced' && (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-background rounded-xl border space-y-3">
                          <div className="flex items-center gap-3">
                            <Sun className="h-8 w-8 text-orange-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Season of Birth</p>
                              <p className="text-xl font-semibold text-foreground">{ageResult.seasonOfBirth}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-background rounded-xl border space-y-3">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-8 w-8 text-blue-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Day of Year</p>
                              <p className="text-xl font-semibold text-foreground">#{ageResult.dayOfYear}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-background rounded-xl border space-y-3">
                          <div className="flex items-center gap-3">
                            <TrendingUp className="h-8 w-8 text-green-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Leap Years Experienced</p>
                              <p className="text-xl font-semibold text-foreground">{ageResult.leapYearsLived}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-background rounded-xl border space-y-3">
                          <div className="flex items-center gap-3">
                            <Heart className="h-8 w-8 text-red-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Generational Cohort</p>
                              <p className="text-xl font-semibold text-foreground">{ageResult.generation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-center">
                <div className="space-y-4">
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto" />
                  <h3 className="text-xl font-semibold text-foreground">Ready to Calculate Your Age</h3>
                  <p className="text-muted-foreground">
                    Select your birth date using our enhanced calendar picker to see your detailed age analysis, zodiac sign, birthstone, and much more!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Introduction Content - MOVED BELOW CALCULATOR */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border prose prose-lg max-w-none text-foreground space-y-6">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
          The Ultimate Online Age Calculator: Precision Age Calculation & Comprehensive Life Analysis
        </h2>
        
        <p className="text-lg leading-relaxed">
          Welcome to the most advanced <strong>age calculator</strong> available online. Have you ever found yourself wondering, 
          "<strong>How old am I exactly?</strong>" Not just in simple years, but with precise breakdowns in months, days, 
          and even smaller time units? Our sophisticated <strong>free online age calculator</strong> provides the definitive 
          answer to that question with unparalleled accuracy. Eliminate manual calculations and estimation guesswork; 
          our advanced tool instantly computes your <strong>exact chronological age</strong> from your specific date of birth.
        </p>

        <p className="text-lg leading-relaxed">
          But our <strong>comprehensive age calculator</strong> delivers far more than basic age calculation. This powerful 
          <strong>date of birth calculator</strong> generates extensive analysis beyond simple years. It provides complete 
          chronological breakdowns in years, months, and days simultaneously. Curious about alternative age perspectives? 
          Discover your <strong>total age calculated in weeks</strong>, comprehensive days count, detailed hours measurement, 
          precise minutes analysis, and exact seconds calculation! This multi-faceted approach offers fascinating insights 
          into your personal timeline quantification.
        </p>

        <p className="text-lg leading-relaxed">
          Furthermore, our <strong>advanced age calculator</strong> incorporates forward-looking features including intelligent 
          <strong>next birthday calculation</strong> with countdown functionality, specific weekday identification, and 
          celebration planning assistance. As valuable bonus features, we provide astrological insights including 
          <strong>Western zodiac sign identification</strong>, traditional birthstone information, Chinese zodiac animal 
          classification, generational categorization, life percentage visualization, milestone birthday tracking, 
          seasonal birth analysis, and leap year experience calculation. Simply input your complete date of birth and 
          experience the most detailed <strong>age calculation analysis</strong> available online.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-background rounded-lg">
            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="font-semibold">Instant Calculation</p>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="font-semibold">Precision Accuracy</p>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="font-semibold">Complete Privacy</p>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="font-semibold">Advanced Features</p>
          </div>
        </div>
      </div>

      {/* Massive Content & FAQ Section */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border space-y-10">
        <div className="flex items-center gap-3 justify-center">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-center">Complete Age Calculator Guide & Educational Resources</h2>
        </div>

        <div className="space-y-10">
          {contentSections.map((section) => (
            <div key={section.id} className="bg-background border-2 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3">
                <section.icon className="h-7 w-7 text-primary" />
                {section.title}
              </h3>
              
              <div className="space-y-8">
                {section.content.map((item, index) => (
                  <div key={index} className="space-y-4 pb-8 border-b last:border-b-0 last:pb-0">
                    <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {item.title}
                    </h4>
                    <div className="prose max-w-none text-foreground space-y-3">
                      {item.details.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-foreground/90 leading-relaxed text-lg">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Tools Section */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/20">
        <div className="text-center space-y-4 mb-8">
          <h3 className="text-2xl font-semibold">Explore More Premium Calculation Tools</h3>
          <p className="text-muted-foreground text-lg">
            If you found our advanced age calculator valuable, discover these other professional-grade tools in our suite.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { name: 'Time Zone Converter', href: '/time-zone-converter', icon: Globe },
            { name: 'Days Between Dates', href: '/days-between-dates', icon: Calendar },
            { name: 'Unix Timestamp', href: '/unix-timestamp', icon: Clock },
            { name: 'Countdown Timer', href: '/countdown-timer', icon: Zap }
          ].map((tool) => (
            <a 
              key={tool.name}
              href={tool.href} 
              className="p-6 rounded-xl bg-background hover:bg-muted transition-all duration-300 font-semibold border hover:border-primary group"
            >
              <tool.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              {tool.name}
            </a>
          ))}
        </div>
      </div>

      {/* Blog/Article Section */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border">
        <h3 className="text-2xl font-bold mb-6 text-center">Age Calculation Insights & Educational Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-background rounded-xl border space-y-3">
            <h4 className="text-xl font-semibold">Understanding Chronological vs Biological Age</h4>
            <p className="text-muted-foreground">Learn the differences between chronological age calculation and biological age estimation, and why chronological age remains the standard for official documentation and age verification purposes.</p>
          </div>
          <div className="p-6 bg-background rounded-xl border space-y-3">
            <h4 className="text-xl font-semibold">The Science of Age Calculation Accuracy</h4>
            <p className="text-muted-foreground">Discover how modern age calculators achieve precision through sophisticated algorithms that account for leap years, time zones, and calendar variations across different systems and cultures.</p>
          </div>
        </div>
      </div>
    </div>
  );
}