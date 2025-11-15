'use client';

import Link from 'next/link';
import { motion, Transition } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Calculator,
  Shield,
  Users,
  Timer,
  Ruler,
  Clock,
  KeyRound,
  Palette,
  FileCode,
  HeartPulse,
  File,
  Sparkles,
  QrCode,
  FileJson,
  Crop,
  Moon,
  X,
  Sigma,
  Percent,
  Heart,
  DollarSign,
  Tag,
  GraduationCap,
  Globe,
  Calendar,
  Hash,
  Weight,
  Thermometer,
  Square,
  Gauge,
  Droplet,
  Barcode,
  CaseSensitive,
  ListOrdered,
  Layers,
  Pipette,
  Code,
  Pilcrow,
  Smile,
  Coins,
  Dice6,
  Disc,
  HelpCircle,
  Hand,
  Quote,
  FileImage,
  FileText,
  ExternalLink,
  MessageCircle,
  Search,
  Settings,
  Cpu,
} from 'lucide-react';
import { useState, useEffect } from 'react';

type ToolLink = {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
  subFeatures?: string[];
};

type ToolCategory = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  count: string;
  tools: ToolLink[];
};

const toolCategories: ToolCategory[] = [
  {
    id: 'calculators',
    name: 'Calculators',
    description: 'Basic, scientific, and financial calculators with advanced sub-features for precise computations.',
    icon: Calculator,
    color: 'bg-blue-500',
    gradient: 'from-blue-400 to-blue-600',
    count: '8 tools',
    tools: [
      { 
        name: 'Basic Calculator', 
        href: '/basic-calculator', 
        icon: Calculator, 
        description: 'For everyday arithmetic with history and memory functions.',
        subFeatures: ['Addition, subtraction, multiplication, division', 'Memory recall', 'Calculation history']
      },
      { 
        name: 'Scientific Calculator', 
        href: '/scientific-calculator', 
        icon: Sigma, 
        description: 'Advanced functions, trig, logs with graphing capabilities.',
        subFeatures: ['Trigonometric functions', 'Logarithms & exponents', 'Factorial & constants']
      },
      { name: 'Percentage Calculator', href: '/percentage-calculator', icon: Percent, description: 'Calculate percentages, tips, and discounts with markup formulas.', subFeatures: ['Tip splitter', 'Discount chains', 'Percentage change'] },
      { name: 'BMI Calculator', href: '/bmi-calculator', icon: Heart, description: 'Check your Body Mass Index with categorization.', subFeatures: ['Adult & child modes', 'Ideal weight range', 'Health risk indicators'] },
      { name: 'EMI / Loan Calculator', href: '/emi-calculator', icon: DollarSign, description: 'Calculate monthly loan payments with amortization schedules.', subFeatures: ['Interest rate variations', 'Loan tenure options', 'Total interest paid'] },
      { name: 'Discount Calculator', href: '/discount-calculator', icon: Tag, description: 'Find the final sale price with multi-discount support.', subFeatures: ['Bulk discount calc', 'Tax inclusion', 'Savings breakdown'] },
      { name: 'Grade Average Calculator', href: '/grade-average-calculator', icon: GraduationCap, description: 'Calculate your average score with weighted inputs.', subFeatures: ['Letter grade conversion', 'GPA mapping', 'Progress tracking'] },
      { name: 'GPA Calculator', href: '/gpa-calculator', icon: GraduationCap, description: 'Calculate your weighted GPA with credit hours.', subFeatures: ['Semester GPA', 'Cumulative calc', 'Transcript import'] },
    ]
  },
  {
    id: 'time-tools',
    name: 'Time & Date Tools',
    description: 'Convert time zones, calculate age, count days, and more with precise scheduling features.',
    icon: Timer,
    color: 'bg-green-500',
    gradient: 'from-green-400 to-emerald-600',
    count: '5 tools',
    tools: [
      { name: 'Time Zone Converter', href: '/time-zone-converter', icon: Globe, description: 'Convert time between major cities with DST support.', subFeatures: ['Auto-detect location', 'Meeting scheduler', 'Multiple zones'] },
      { name: 'Age Calculator', href: '/age-calculator', icon: Calendar, description: 'Find your age in years, months, and days with zodiac info.', subFeatures: ['Exact seconds lived', 'Age milestones', 'Chinese zodiac'] },
      { name: 'Days Between Dates', href: '/days-between-dates', icon: Clock, description: 'Count the number of days between two dates with exclusions.', subFeatures: ['Weekends only', 'Business days', 'Age in weeks'] },
      { name: 'Unix Timestamp Converter', href: '/unix-timestamp', icon: Hash, description: 'Convert Unix time to a readable date with timezone adjust.', subFeatures: ['Batch convert', 'Future timestamps', 'Human readable'] },
      { name: 'Countdown Timer', href: '/countdown-timer', icon: Timer, description: 'Count down to any date and time with alarms.', subFeatures: ['Embeddable widget', 'Share link', 'Recurring events'] },
    ]
  },
  {
    id: 'measurement-converters',
    name: 'Measurement Converters',
    description: 'Convert length, weight, temperature, and various units with formula references.',
    icon: Ruler,
    color: 'bg-yellow-500',
    gradient: 'from-yellow-400 to-orange-500',
    count: '6 tools',
    tools: [
      { name: 'Length Converter', href: '/length-converter', icon: Ruler, description: 'Convert meters, feet, miles, etc. with precision.', subFeatures: ['Imperial to metric', 'Nautical units', 'Formula display'] },
      { name: 'Weight Converter', href: '/weight-converter', icon: Weight, description: 'Convert kg, lbs, ounces, etc. for cooking and fitness.', subFeatures: ['Troy ounces', 'Stone units', 'Batch input'] },
      { name: 'Temperature Converter', href: '/temperature-converter', icon: Thermometer, description: 'Convert Celsius, Fahrenheit, Kelvin with wind chill.', subFeatures: ['Heat index calc', 'Boiling points', 'Cooking temps'] },
      { name: 'Area Converter', href: '/area-converter', icon: Square, description: 'Convert acres, hectares, m², etc. for land measurement.', subFeatures: ['Square feet calc', 'Perimeter tool', 'Map integration'] },
      { name: 'Speed Converter', href: '/speed-converter', icon: Gauge, description: 'Convert km/h, mph, knots, etc. for travel.', subFeatures: ['Pace calculator', 'Fuel efficiency', 'Acceleration'] },
      { name: 'Volume Converter', href: '/volume-converter', icon: Droplet, description: 'Convert liters, gallons, cups, etc. for recipes.', subFeatures: ['Dry vs liquid', 'Concentration', 'Tank volume'] },
    ]
  },
  {
    id: 'clock-tools',
    name: 'Clock & Timer Tools',
    description: 'World clock, stopwatch, countdown timer, and alarm tools with synchronization.',
    icon: Clock,
    color: 'bg-sky-500',
    gradient: 'from-sky-400 to-blue-500',
    count: '2 tools',
    tools: [
      { name: 'World Clock', href: '/world-clock', icon: Clock, description: 'Check current time in cities worldwide with maps.', subFeatures: ['Analog/digital views', 'Sunrise/sunset', 'Multiple clocks'] },
      { name: 'Online Stopwatch', href: '/stopwatch', icon: Timer, description: 'A precision stopwatch with lap timer and splits.', subFeatures: ['Export results', 'Voice alerts', 'Fullscreen mode'] },
    ]
  },
  {
    id: 'productivity-tools',
    name: 'Productivity & Utility',
    description: 'Password generator, text tools, QR codes, and productivity boosters with integrations.',
    icon: KeyRound,
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-indigo-600',
    count: '5 tools',
    tools: [
      { name: 'Password Generator', href: '/password-generator', icon: KeyRound, description: 'Create secure random passwords with strength meter.', subFeatures: ['Custom length', 'Character sets', 'Password manager export'] },
      { name: 'QR Code Generator', href: '/qr-code-generator', icon: QrCode, description: 'Generate QR codes with logos and error correction.', subFeatures: ['Dynamic URLs', 'vCard support', 'Download SVG/PNG'] },
      { name: 'Barcode Generator', href: '/barcode-generator', icon: Barcode, description: 'Create UPC, EAN, and Code 128 with scanners.', subFeatures: ['Batch generation', 'Label printing', 'ISBN support'] },
      { name: 'Case Converter', href: '/case-converter', icon: CaseSensitive, description: 'Convert text to any case with sentence support.', subFeatures: ['Title case smart', 'Camel/snake', 'Batch text'] },
      { name: 'Word & Character Counter', href: '/word-counter', icon: ListOrdered, description: 'Count words and characters in real-time with readability.', subFeatures: ['SEO score', 'Reading time', 'Keyword density'] },
    ]
  },
  {
    id: 'design-tools',
    name: 'Design & Color Tools',
    description: 'Color pickers, gradient generators, and design utilities for creators with exports.',
    icon: Palette,
    color: 'bg-pink-500',
    gradient: 'from-pink-400 to-rose-600',
    count: '3 tools',
    tools: [
      { name: 'Color Picker', href: '/color-picker', icon: Pipette, description: 'Pick a color and get HEX, RGB, HSL codes with harmony.', subFeatures: ['Eyedropper tool', 'Color wheel', 'Accessibility check'] },
      { name: 'Gradient Generator', href: '/gradient-generator', icon: Layers, description: 'Create CSS, Flutter & React Native gradients with previews.', subFeatures: ['Multi-stop', 'Direction controls', 'Export code'] },
      { name: 'Color Converter', href: '/color-converter', icon: Palette, description: 'Convert between HEX, RGB, and HSL with palettes.', subFeatures: ['Batch convert', 'Named colors', 'Contrast ratio'] },
    ]
  },
  {
    id: 'text-tools',
    name: 'Text & Coding Utilities',
    description: 'JSON formatter, Base64 encoder, text encryption, and developer tools with validation.',
    icon: FileCode,
    color: 'bg-gray-500',
    gradient: 'from-gray-400 to-slate-600',
    count: '4 tools',
    tools: [
      { name: 'JSON Formatter', href: '/json-formatter', icon: FileJson, description: 'Validate, format, and minify JSON data with tree view.', subFeatures: ['Error highlighting', 'Sort keys', 'JSON to CSV'] },
      { name: 'Base64 Encoder/Decoder', href: '/base64-encoder-decoder', icon: Code, description: 'Encode or decode Base64 strings with file support.', subFeatures: ['Image to Base64', 'URL safe', 'Batch process'] },
      { name: 'URL Encoder/Decoder', href: '/url-encoder-decoder', icon: ExternalLink, description: 'Encode/decode text for URL safety with percent encoding.', subFeatures: ['Query string builder', 'HTML entities', 'Escape sequences'] },
      { name: 'Lorem Ipsum Generator', href: '/lorem-ipsum-generator', icon: Pilcrow, description: 'Generate placeholder text with custom lengths.', subFeatures: ['Paragraphs/words', 'Lists/tables', 'Random seeds'] },
    ]
  },
  {
    id: 'lifestyle-tools',
    name: 'Lifestyle & Health',
    description: 'Sleep calculator, health trackers, and personal wellness utilities with insights.',
    icon: HeartPulse,
    color: 'bg-red-500',
    gradient: 'from-red-400 to-pink-600',
    count: '2 tools',
    tools: [
      { name: 'Sleep Calculator', href: '/sleep-calculator', icon: Moon, description: 'Find the best time to wake up or sleep with cycles.', subFeatures: ['REM tracking', 'Nap planner', 'Sleep debt calc'] },
      { name: 'Mood Tracker', href: '/mood-tracker', icon: Smile, description: 'A 100% private, local mood journal with trends.', subFeatures: ['Journal entries', 'Mood patterns', 'Export reports'] },
    ]
  },
  {
    id: 'file-tools',
    name: 'File & Media Tools',
    description: 'Image resizer, PDF tools, converters, and media processing utilities with batch.',
    icon: File,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-400 to-purple-600',
    count: '4 tools',
    tools: [
      { name: 'Image Resizer', href: '/image-resizer', icon: FileImage, description: 'Resize JPG, PNG, and WEBP images with compression.', subFeatures: ['Batch resize', 'Aspect ratio lock', 'Quality slider'] },
      { name: 'Image Cropper', href: '/image-cropper', icon: Crop, description: 'Crop and rotate images with aspect ratio presets.', subFeatures: ['Freehand crop', 'Object removal', 'Filter apply'] },
      { name: 'Image to Base64', href: '/image-to-base64', icon: Code, description: 'Convert images to Base64 strings for web use.', subFeatures: ['Compress first', 'URL data', 'Copy to clipboard'] },
      { name: 'PDF Merger', href: '/pdf-merger', icon: FileText, description: 'Combine multiple PDF files into one with reordering.', subFeatures: ['Page range', 'Watermark add', 'Compress output'] },
    ]
  },
  {
    id: 'misc-tools',
    name: 'Miscellaneous & Fun',
    description: 'Random generators, decision tools, and entertaining utilities with customizations.',
    icon: Sparkles,
    color: 'bg-orange-500',
    gradient: 'from-orange-400 to-amber-600',
    count: '6 tools',
    tools: [
      { name: 'Coin Flip & Dice Roll', href: '/coin-flip-dice-roll', icon: Coins, description: 'Get a random 50/50 or 1-in-6 result with animations.', subFeatures: ['Custom dice', 'History log', 'Share result'] },
      { name: 'Random Number Generator', href: '/random-number-generator', icon: Hash, description: 'Get a random number in a range with sequences.', subFeatures: ['Lottery sim', 'UUID gen', 'Seed control'] },
      { name: 'Decision Wheel', href: '/decision-wheel', icon: Disc, description: 'Let the wheel decide for you with custom segments.', subFeatures: ['Weighted probs', 'Sound effects', 'Mobile spin'] },
      { name: 'Magic 8-Ball', href: '/magic-8-ball', icon: HelpCircle, description: 'Ask a yes-or-no question for an answer with history.', subFeatures: ['Custom answers', 'Shake detect', 'Fortune teller'] },
      { name: 'Rock Paper Scissors', href: '/rock-paper-scissors', icon: Hand, description: 'Play the classic game vs. the CPU with stats.', subFeatures: ['Best of series', 'AI difficulty', 'Emoji mode'] },
      { name: 'Quote Generator', href: '/quote-generator', icon: Quote, description: 'Get a random inspirational quote with authors.', subFeatures: ['Category filter', 'Share social', 'Daily quote'] },
    ]
  },
];

const featuredTools = [
  {
    name: 'Random Password Generator',
    description: 'Create secure, customizable passwords instantly',
    href: '/password-generator',
    icon: KeyRound,
    usage: 'Used 500+ times daily',
  },
  {
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, and contact info',
    href: '/qr-code-generator',
    icon: QrCode,
    usage: 'Used 300+ times daily',
  },
  {
    name: 'JSON Formatter',
    description: 'Beautify, validate, and format JSON data easily',
    href: '/json-formatter',
    icon: FileJson,
    usage: 'Used 400+ times daily',
  },
  {
    name: 'Image Resizer',
    description: 'Resize and compress images without quality loss',
    href: '/image-resizer',
    icon: Crop,
    usage: 'Used 250+ times daily',
  },
  {
    name: 'Color Picker',
    description: 'Pick colors and convert between HEX, RGB, HSL formats',
    href: '/color-picker',
    icon: Palette,
    usage: 'Used 350+ times daily',
  },
  {
    name: 'Sleep Calculator',
    description: 'Calculate optimal sleep cycles and wake-up times',
    href: '/sleep-calculator',
    icon: Moon,
    usage: 'Used 200+ times daily',
  },
];

const advantages = [
  {
    icon: Shield,
    title: '100% Client-Side Processing',
    description:
      'All tools run directly in your browser. Your data never leaves your device, ensuring complete privacy and security.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description:
      'No server delays. Get immediate results with real-time processing powered by modern web technologies.',
  },
  {
    icon: Calculator,
    title: 'No Installation Required',
    description:
      'Access all tools directly from your browser. No downloads, no installations, no registration needed.',
  },
  {
    icon: Users,
    title: 'Built for Everyone',
    description:
      'From students and developers to designers and professionals - tools designed for all skill levels.',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6 
    } as Transition 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3 } as Transition,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 } as Transition,
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const introCards = [
  {
    title: 'Unlock Productivity with Free Online Tools',
    description: 'From image resizers to BMI calculators, discover 50+ utilities that boost your daily workflow without compromising privacy.',
    icon: Zap,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Secure & Instant Converters',
    description: 'Resize images, merge PDFs, or convert time zones—all processed client-side for lightning-fast, secure results.',
    icon: Shield,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Tailored for Creators & Pros',
    description: 'Designers love color pickers; developers swear by JSON formatters. Find your perfect tool today with specialized utilities.',
    icon: Palette,
    color: 'from-purple-500 to-pink-600',
  },
];

const EnhancedAnimatedBackground = () => {
  const bubbleColors = [
    'bubble-blue', 'bubble-purple', 'bubble-sky', 'bubble-pink', 
    'bubble-green', 'bubble-orange', 'bubble-yellow', 'bubble-indigo'
  ];

  const squareColors = [
    'square-blue', 'square-purple', 'square-green', 'square-orange'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-50 dark:opacity-40">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              bubbleColors[i % bubbleColors.length]
            } animate-float-${i % 3 === 0 ? 'slow' : i % 3 === 1 ? 'medium' : 'fast'}`}
            style={{
              width: `${25 + (i * 6) % 50}px`,
              height: `${25 + (i * 6) % 50}px`,
              top: `${5 + (i * 8) % 85}%`,
              left: `${3 + (i * 10) % 92}%`,
              animationDelay: `${i * 0.4}s`,
              filter: 'blur(4px)',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-60 dark:opacity-50">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className={`absolute ${squareColors[i % squareColors.length]} animate-square-roll`}
            style={{
              width: `${15 + (i * 5) % 35}px`,
              height: `${15 + (i * 5) % 35}px`,
              top: `${10 + (i * 7) % 80}%`,
              left: `${5 + (i * 8) % 90}%`,
              animationDelay: `${i * 1.5}s`,
              borderRadius: '8px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const stepImages = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format", 
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&auto=format"
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (activeCategory) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [activeCategory]);

  return (
    <>
      <EnhancedAnimatedBackground />
      <div className="relative space-y-20 md:space-y-28 overflow-hidden">
        <motion.section
          className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 rounded-3xl p-8 md:p-12 text-center border border-border"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20"></div>
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent mb-4">
              WorksyHub
            </h1>
            <p className="mx-auto max-w-3xl text-xl md:text-2xl font-bold text-foreground mb-6">
              50+ Free Online Tools: Image Resizer, PDF Merger, Time Zone Converter, BMI Calculator & More
            </p>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Effortless, private utilities that run in your browser. No sign-ups, no uploads—just pure productivity with client-side online converters, calculators, and tools for developers, students, and professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <motion.div className="flex items-center" initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.4 }}>
                <CheckCircle className="mr-2 h-5 w-5 text-green-600 dark:text-green-500" />
                <span className="font-semibold">100% Private</span>
              </motion.div>
              <motion.div className="flex items-center" initial={{ x: 20 }} animate={{ x: 0 }} transition={{ delay: 0.5 }}>
                <CheckCircle className="mr-2 h-5 w-5 text-green-600 dark:text-green-500" />
                <span className="font-semibold">Offline Ready</span>
              </motion.div>
              <motion.div className="flex items-center" initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.6 }}>
                <CheckCircle className="mr-2 h-5 w-5 text-green-600 dark:text-green-500" />
                <span className="font-semibold">Instant Access</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          <div className="absolute inset-0 bg-dots-pattern opacity-25 dark:opacity-10"></div>
          {introCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={itemVariants}
                custom={i}
                className="group relative overflow-hidden rounded-2xl bg-card text-card-foreground p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border"
                whileHover={{ y: -10 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <motion.div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl mb-4 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform bg-gradient-to-br ${card.color}`}
                    initial={{ rotate: -10 }}
                    whileHover={{ rotate: 0 }}
                  >
                    <Icon className="h-8 w-8" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-card-foreground mb-3">{card.title}</h2>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        <motion.section
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-waves-pattern opacity-20 dark:opacity-10"></div>
          <motion.h2
            className="mb-12 text-center text-4xl md:text-5xl font-black tracking-tight text-foreground"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Most Popular Free Online Tools
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
          >
            {featuredTools.map((tool, i) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  custom={i}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative"
                >
                  <Link
                    href={tool.href}
                    className="block rounded-2xl bg-card text-card-foreground p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="flex-1">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                          <IconComponent className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        </motion.div>
                        <h3 className="font-bold text-card-foreground group-hover:text-primary transition-colors mb-2">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                          {tool.usage}
                        </div>
                      </div>
                      <motion.div
                        className="ml-4 opacity-0 group-hover:opacity-100 transition-all"
                        initial={{ x: 10 }}
                        animate={{ x: 0 }}
                      >
                        <ArrowRight className="h-6 w-6 text-primary" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          id="categories"
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-25 dark:opacity-10"></div>
          <motion.h2
            className="mb-12 text-center text-4xl md:text-5xl font-black tracking-tight text-foreground"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Explore Tool Categories
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={staggerContainer}
          >
            {toolCategories.map((tool, i) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  custom={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="group relative"
                >
                  <button
                    onClick={() => setActiveCategory(tool)}
                    className="group block w-full overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-card text-card-foreground border border-border relative text-left"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <motion.div
                        className={`absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${tool.gradient}`}
                      >
                        <IconComponent className="h-16 w-16 text-white drop-shadow-2xl" />
                      </motion.div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="bg-white/90 dark:bg-card/90 text-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                          {tool.count}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                      <div className="flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Dive In <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          className="relative py-16 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-card dark:to-muted rounded-3xl border border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-waves-pattern opacity-20 dark:opacity-10"></div>
          <motion.h2
            className="mb-16 text-center text-4xl font-black text-foreground"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
          >
            How WorksyHub Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Search,
                title: 'Pick Your Tool',
                desc: 'Browse 50+ free online tools from calculators to converters. Select from essential utilities optimized for quick access.',
              },
              {
                icon: Settings,
                title: 'Input Securely',
                desc: 'Enter data or upload files—all stays local in your browser. Enjoy complete privacy with client-side processing.',
              },
              {
                icon: Cpu,
                title: 'Get Magic Results',
                desc: 'Instant, accurate outputs with zero server involvement. Experience lightning-fast performance in all tools.',
              },
            ].map((item, i) => {
              const StepIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={itemVariants}
                  className="text-center group relative"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl mx-auto max-w-sm bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center border border-border">
                    <img 
                      src={stepImages[i]} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-2xl z-10">
                      <StepIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
        >
          <div className="absolute inset-0 bg-dots-pattern opacity-25 dark:opacity-10"></div>
          <motion.h2
            className="mb-12 text-center text-4xl font-black text-foreground"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
          >
            Why Choose WorksyHub?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <motion.div
                  key={advantage.title}
                  variants={itemVariants}
                  custom={index}
                  className="text-center p-6 rounded-2xl bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border group relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg group-hover:rotate-12 transition-transform">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{advantage.title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {advantage.description.split('. ').map((sub, j) => (
                      <li key={j} className="flex items-center justify-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600 dark:text-green-500 shrink-0" />
                        <span>{sub.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          className="relative py-16 bg-gradient-to-r from-rose-50/50 to-pink-50/50 dark:from-card dark:to-muted rounded-3xl border border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-waves-pattern opacity-20 dark:opacity-10"></div>
          <motion.h2
            className="mb-12 text-center text-4xl font-black text-foreground"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
          >
            Got Questions? We've Got Answers
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { q: 'What makes WorksyHub the best free online tools website?', a: 'WorksyHub offers 50+ client-side converters and calculators ensuring privacy with no data upload.' },
              { q: 'Are these online converters secure?', a: 'Yes, all free online converters run locally in your browser, perfect for secure use.' },
              { q: 'How does the time zone converter free work?', a: 'Our time zone converter supports 100+ cities for instant global time differences.' },
              { q: 'Can I use the BMI calculator offline?', a: 'Absolutely, all tools including BMI calculator work offline after loading.' },
              { q: 'What sub-features does the JSON formatter have?', a: 'Validate, beautify, minify JSON with error highlighting and tree view for developers.' },
              { q: 'Is the QR code generator with logo customizable?', a: 'Yes, add logos, colors, and sizes for free QR code generation.' },
              { q: 'How accurate is the age calculator by date of birth?', a: 'It calculates exact age in years, months, days, hours, and even seconds.' },
              { q: 'Does the EMI calculator support different loan types?', a: 'Yes, home, car, personal loans with variable interest and tenure options.' },
              { q: 'Can I batch resize images with the image resizer?', a: 'Yes, upload multiple files for simultaneous resizing with custom dimensions.' },
              { q: 'What formats does the PDF merger support?', a: 'Merge any PDF files, reorder pages, and compress without quality loss.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={itemVariants}
                className="group border border-border rounded-2xl p-6 hover:bg-primary/5 dark:hover:bg-muted/50 transition-colors duration-300 overflow-hidden bg-card"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-foreground mb-3 flex items-center justify-between group-hover:text-primary transition-colors">
                  {faq.q}
                  <MessageCircle className="h-6 w-6 opacity-70 group-hover:opacity-100 shrink-0 ml-2" />
                </h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="text-center py-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-25 dark:opacity-10"></div>
          <motion.h2
            className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            Ready to Supercharge Your Workflow?
          </motion.h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-8">
            Dive into a world of free, private tools trusted by thousands. Start exploring now with our comprehensive suite of online converters, calculators, and utilities.
          </p>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="#categories"
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-bold text-primary-foreground shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              Launch Your First Tool
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.section>

        {activeCategory && mounted && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setActiveCategory(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <motion.div
              className="bg-card border border-border rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const Icon = activeCategory.icon;
                      return <Icon className="h-8 w-8" />;
                    })()}
                    <h2 className="text-2xl font-bold">{activeCategory.name}</h2>
                  </div>
                  <motion.button 
                    onClick={() => setActiveCategory(null)} 
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>
                <p className="mt-2 text-white/90 text-sm">{activeCategory.description}</p>
              </div>
              
              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeCategory.tools.map((tool, i) => {
                    const ToolIcon = tool.icon;
                    return (
                      <motion.div
                        key={tool.name}
                        custom={i}
                        variants={itemVariants}
                        className="group"
                      >
                        <Link 
                          href={tool.href} 
                          className="block p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                          onClick={() => setActiveCategory(null)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${activeCategory.gradient} text-white`}>
                              <ToolIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {tool.description}
                              </p>
                              {tool.subFeatures && (
                                <div className="mt-2">
                                  <div className="flex flex-wrap gap-1">
                                    {tool.subFeatures.slice(0, 2).map((feature, index) => (
                                      <span 
                                        key={index}
                                        className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                    {tool.subFeatures.length > 2 && (
                                      <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                                        +{tool.subFeatures.length - 2} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 shrink-0 mt-1" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What makes WorksyHub the best free online tools website?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'WorksyHub offers 50+ client-side converters and calculators ensuring privacy with no data upload.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are these online converters secure?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, all free online converters run locally in your browser, perfect for secure use.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How does the time zone converter free work?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our time zone converter supports 100+ cities for instant global time differences.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I use the BMI calculator offline?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolutely, all tools including BMI calculator work offline after loading.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What sub-features does the JSON formatter have?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Validate, beautify, minify JSON with error highlighting and tree view for developers.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is the QR code generator with logo customizable?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, add logos, colors, and sizes for free QR code generation.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How accurate is the age calculator by date of birth?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'It calculates exact age in years, months, days, hours, and even seconds.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does the EMI calculator support different loan types?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, home, car, personal loans with variable interest and tenure options.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I batch resize images with the image resizer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, upload multiple files for simultaneous resizing with custom dimensions.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What formats does the PDF merger support?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Merge any PDF files, reorder pages, and compress without quality loss.',
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </>
  );
}