// src/app/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Calculator,
  Shield,
  Star,
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
} from 'lucide-react';

// === UPDATED: toolCategories ARRAY ===
const toolCategories = [
  {
    name: 'Calculators',
    description: 'Basic, scientific, and financial calculators for all your needs.',
    href: '/calculator', // <-- CORRECTED
    icon: Calculator,
    color: 'bg-blue-500',
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-8d044b4032ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '8 tools',
  },
  {
    name: 'Time & Date Tools',
    description:
      'Convert time zones, calculate age, count days, and use date tools.',
    href: '/time-tools', // <-- CORRECTED
    icon: Timer,
    color: 'bg-green-500',
    imageUrl:
      'https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '5 tools',
  },
  {
    name: 'Measurement Converters',
    description: 'Convert length, weight, temperature, and various units.',
    href: '/measurement-converter', // <-- CORRECTED
    icon: Ruler,
    color: 'bg-yellow-500',
    imageUrl:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '6 tools',
  },
  {
    name: 'Clock & Timer Tools',
    description:
      'World clock, stopwatch, countdown timer, and alarm tools.',
    href: '/clock-tools', // <-- CORRECTED
    icon: Clock,
    color: 'bg-sky-500',
    imageUrl:
      'https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '2 tools',
  },
  {
    name: 'Productivity & Utility',
    description:
      'Password generator, text tools, QR codes, and productivity boosters.',
    href: '/productivity-tools', // <-- CORRECTED
    icon: KeyRound,
    color: 'bg-purple-500',
    imageUrl:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '5 tools',
  },
  {
    name: 'Design & Color Tools',
    description:
      'Color pickers, gradient generators, and design utilities for creators.',
    href: '/design-tools', // <-- CORRECTED
    icon: Palette,
    color: 'bg-pink-500',
    imageUrl:
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '3 tools',
  },
  {
    name: 'Text & Coding Utilities',
    description:
      'JSON formatter, Base64 encoder, text encryption, and developer tools.',
    href: '/text-tools', // <-- CORRECTED
    icon: FileCode,
    color: 'bg-gray-500',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '4 tools',
  },
  {
    name: 'Lifestyle & Health',
    description:
      'Sleep calculator, health trackers, and personal wellness utilities.',
    href: '/lifestyle-tools', // <-- CORRECTED
    icon: HeartPulse,
    color: 'bg-red-500',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '2 tools',
  },
  {
    name: 'File & Media Tools',
    description:
      'Image resizer, PDF tools, converters, and media processing utilities.',
    href: '/file-tools', // <-- CORRECTED
    icon: File,
    color: 'bg-indigo-500',
    imageUrl:
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '4 tools',
  },
  {
    name: 'Miscellaneous & Fun',
    description: 'Random generators, decision tools, and entertaining utilities.',
    href: '/misc-tools', // <-- CORRECTED
    icon: Sparkles,
    color: 'bg-orange-500',
    imageUrl:
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    count: '6 tools',
  },
];

// === UPDATED: featuredTools ARRAY ===
const featuredTools = [
  {
    name: 'Random Password Generator',
    description: 'Create secure, customizable passwords instantly',
    href: '/password-generator', // <-- UPDATED
    icon: KeyRound,
    usage: 'Used 500+ times daily',
  },
  {
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, and contact info',
    href: '/qr-code-generator', // <-- UPDATED
    icon: QrCode,
    usage: 'Used 300+ times daily',
  },
  {
    name: 'JSON Formatter',
    description: 'Beautify, validate, and format JSON data easily',
    href: '/json-formatter', // <-- UPDATED
    icon: FileJson,
    usage: 'Used 400+ times daily',
  },
  {
    name: 'Image Resizer',
    description: 'Resize and compress images without quality loss',
    href: '/image-resizer', // <-- UPDATED
    icon: Crop,
    usage: 'Used 250+ times daily',
  },
  {
    name: 'Color Picker',
    description: 'Pick colors and convert between HEX, RGB, HSL formats',
    href: '/color-picker', // <-- UPDATED
    icon: Palette,
    usage: 'Used 350+ times daily',
  },
  {
    name: 'Sleep Calculator',
    description: 'Calculate optimal sleep cycles and wake-up times',
    href: '/sleep-calculator', // <-- UPDATED
    icon: Moon,
    usage: 'Used 200+ times daily',
  },
];

// ... (rest of the file is identical) ...
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
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <motion.section
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          Free, Fast & Private Online Tools
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Access 50+ essential utilities that work entirely in your browser. No
          data sent to servers, no files uploaded, just instant results with
          complete privacy.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            <span>No registration required</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            <span>Zero data collection</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            <span>Works offline</span>
          </div>
        </div>
      </motion.section>

      {/* Featured Tools */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">
          Most Popular Tools
        </h2>
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
        >
          {featuredTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={tool.name}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={tool.href}
                  className="group block rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <IconComponent className="h-6 w-6 text-primary mb-3" />
                      <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                      <div className="mt-3 flex items-center text-xs text-muted-foreground">
                        <Zap className="mr-1 h-3 w-3 text-yellow-500" />
                        {tool.usage}
                      </div>
                    </div>
                    <ArrowRight className="ml-4 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Tool Categories with Background Images */}
      <motion.section
        id="categories"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
      >
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">
          Explore All Tool Categories
        </h2>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
        >
          {toolCategories.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={tool.name}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={tool.href}
                  className="group block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={tool.imageUrl}
                      alt={tool.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // On error, hide the image and show the fallback
                        e.currentTarget.style.display = 'none';
                        const fallback =
                          e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback with Icon and Color */}
                    <div
                      className={`absolute inset-0 items-center justify-center text-white ${tool.color}`}
                      style={{ display: 'none' }} // Hidden by default
                    >
                      <IconComponent className="h-12 w-12" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
                    <div className="absolute bottom-3 left-4">
                      <span className="rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-primary-foreground">
                        {tool.count}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                    <div className="mt-3 flex items-center text-xs font-medium text-primary">
                      Explore category
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
      >
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
          How It Works: Privacy-First Approach
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
                alt="Choose your tool from dashboard"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  (
                    e.currentTarget.parentElement as HTMLElement
                  ).style.backgroundColor = '#f3f4f6';
                }}
              />
              <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Choose Your Tool
            </h3>
            <p className="mt-3 text-muted-foreground">
              Select from 50+ utilities. All tools work directly in your browser
              - no server processing.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
                alt="Input your data securely"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  (
                    e.currentTarget.parentElement as HTMLElement
                  ).style.backgroundColor = '#f3f4f6';
                }}
              />
              <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white shadow-lg">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Input Your Data
            </h3>
            <p className="mt-3 text-muted-foreground">
              Enter values or upload files. Everything stays on your device -
              completely private.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
                alt="Get instant results"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  (
                    e.currentTarget.parentElement as HTMLElement
                  ).style.backgroundColor = '#f3f4f6';
                }}
              />
              <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white shadow-lg">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Get Instant Results
            </h3>
            <p className="mt-3 text-muted-foreground">
              Receive immediate results processed locally. No delays, no data
              transmission.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Why Choose WorksyHub - Real Advantages */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
          Why WorksyHub Stands Out
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <motion.div
                key={advantage.title}
                variants={fadeIn}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {advantage.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Details */}
        <div className="mt-12 rounded-lg border bg-muted/50 p-6">
          <h3 className="text-center text-xl font-semibold text-foreground mb-4">
            Built with Modern Web Standards
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="text-center">
              <div className="font-medium text-foreground">100% Client-Side</div>
              <div className="text-muted-foreground">No server processing</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">Zero Data Storage</div>
              <div className="text-muted-foreground">Nothing saved online</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">Works Offline</div>
              <div className="text-muted-foreground">
                Most tools available offline
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">Open Source Tech</div>
              <div className="text-muted-foreground">Next.js & modern APIs</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Ready to Get Started?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Join thousands of users who trust WorksyHub for their daily utility
          needs. All tools are free, private, and ready to use.
        </p>
        <div className="mt-8">
          <Link
            href="#categories"
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Explore All Tools
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}