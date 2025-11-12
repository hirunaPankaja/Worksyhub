// src/components/Footer.tsx
import Link from 'next/link';
import { Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WorksyHub
              </span>
            </Link>
            {/* --- CONTENT UPDATE: Brand Description --- */}
            <p className="text-muted-foreground leading-relaxed max-w-md mb-6">
              Your all-in-one productivity hub. Free online tools for
              conversions, calculations, and more. Fast, secure, and always free.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="mailto:contact@worksyhub.com"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30
                           flex items-center justify-center text-muted-foreground hover:text-blue-600
                           transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* --- CONTENT UPDATE: Tools Section --- */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-foreground mb-4 text-lg">Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/time-converter"
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Time Converter
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/measurement-converter"
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Measurement Converter
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Calculator
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* --- CONTENT UPDATE: Resources Section --- */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-foreground mb-4 text-lg">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/time-converter" // Link to the tool page itself
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    How to Convert Time
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/measurement-converter" // Link to the tool page
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Metric vs. Imperial
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* --- CONTENT UPDATE: Company Section (Removed 404s) --- */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="font-bold text-foreground mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Terms of Service
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- CONTENT UPDATE: Bottom Bar (Removed Sitemap) --- */}
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} WorksyHub. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/privacy-policy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-blue-600 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}