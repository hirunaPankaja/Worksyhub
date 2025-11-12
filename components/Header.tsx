// src/components/Header.tsx
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu'; // <-- Import Mobile Menu

export function Header() {
  return (
    <header className="w-full border-b border-foreground/10 sticky top-0 bg-background/95 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link
          href="/"
          className="text-2xl font-bold text-foreground
                     hover:text-primary transition-colors
                     flex items-center gap-2"
          aria-label="WorksyHub Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span>WorksyHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#tools"
            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation (ThemeToggle + MobileMenu) */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}