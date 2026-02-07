'use client';

import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
    ],
    Calculators: [
      { name: 'BMI Calculator', href: '/bmi-calculator' },
      { name: 'Scientific', href: '/scientific-calculator' },
      { name: 'Percentage', href: '/percentage-calculator' },
      { name: 'EMI Calculator', href: '/emi-calculator' },
    ],
    Tools: [
      { name: 'YouTube Thumbnail', href: '/youtube-thumbnail-downloader' },
      { name: 'QR Code Generator', href: '/qr-code-generator' },
      { name: 'Password Gen', href: '/password-generator' },
      { name: 'Word Counter', href: '/word-counter' },
    ]
  };

  return (
    <footer className="border-t border-border bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">W</div>
              <span className="font-bold text-xl">WorksyHub</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              WorksyHub is a collection of free, privacy-focused online tools for developers, designers, and everyday users.
              No ads, no tracking, just utility.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@worksyhub.online" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-semibold text-foreground">{category}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} WorksyHub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-foreground">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-foreground">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}