// src/app/about/page.tsx
import { Metadata } from 'next';
import { CheckCircle, Shield, Zap, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - WorksyHub',
  description:
    'Learn about WorksyHub - your trusted source for free online converters, calculators, and productivity tools. Our mission is to provide fast, secure, and accessible tools for everyone.',
  alternates: {
    canonical: 'https://worksyhub.online/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">About WorksyHub</h1>
        <p className="text-xl text-muted-foreground">
          Your trusted partner for free online productivity tools
        </p>
      </div>

      <section className="prose prose-lg max-w-none">
        <div className="p-6 rounded-xl bg-muted/50">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            At WorksyHub, we believe that essential productivity tools should be free,
            fast, and accessible to everyone. We've built a comprehensive suite of over
            50 online tools to help you convert units, perform calculations, and boost
            your daily productivity - all without requiring registration or payment.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border bg-card">
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">
              All our tools work entirely in your browser. We don't collect, store, or
              transmit your data to any servers. Your information stays completely
              private and secure.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <div className="inline-flex p-3 rounded-lg bg-green-500/10 mb-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Always Free</h3>
            <p className="text-muted-foreground">
              Every tool on WorksyHub is 100% free to use, forever. No hidden fees, no
              subscriptions, no credit card required. We believe essential tools should
              be accessible to all.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <div className="inline-flex p-3 rounded-lg bg-yellow-500/10 mb-4">
              <Zap className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Built with modern web technologies like Next.js and React, our tools load
              instantly and process data in real-time. No waiting, no delays - just
              results.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <div className="inline-flex p-3 rounded-lg bg-red-500/10 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">User-Centric Design</h3>
            <p className="text-muted-foreground">
              We design our tools with simplicity and usability in mind. Clean
              interfaces, clear instructions, and intuitive workflows make complex
              calculations easy.
            </p>
          </div>
        </div>
      </section>

      <section className="p-8 rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10">
        <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground mb-3">
              🕒 Time & Date Tools
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Time Zone Converter</li>
              <li>Age Calculator</li>
              <li>Days Between Dates</li>
              <li>Countdown Timer</li>
              <li>Unix Timestamp Converter</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">
              📏 Measurement Converters
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Length/Distance Converter</li>
              <li>Weight/Mass Converter</li>
              <li>Temperature Converter</li>
              <li>Area Converter</li>
              <li>Speed Converter</li>
              <li>Volume Converter</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">🧮 Calculators</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Simple Calculator</li>
              <li>Percentage Calculator</li>
              <li>BMI Calculator</li>
              <li>EMI/Loan Calculator</li>
              <li>Discount Calculator</li>
              <li>Grade/GPA Calculator</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">
              🎨 More Tools Coming
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Color & Design Tools</li>
              <li>Text & Coding Utilities</li>
              <li>Productivity Tools</li>
              <li>And many more...</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="text-center p-8 rounded-xl border bg-card">
        <h2 className="text-2xl font-bold mb-4">Built with Modern Technology</h2>
        <p className="text-muted-foreground mb-6">
          WorksyHub is built using cutting-edge web technologies to ensure the best
          performance, security, and user experience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
            Next.js 14
          </span>
          <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
            React 18
          </span>
          <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
            TypeScript
          </span>
          <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
            Tailwind CSS
          </span>
          <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
            Client-Side Processing
          </span>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          Have questions, suggestions, or feedback? We'd love to hear from you!
        </p>
        <a
          href="mailto:contact@worksyhub.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}