'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileMenu } from '@/components/MobileMenu';
import { Search, Heart, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/components/features/FavoritesProvider';

export function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container px-4 h-16 flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo Area */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-lg group-hover:scale-110 transition-transform">
              W
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
              WorksyHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">
              All Tools
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              About
            </Link>
          </nav>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center w-full max-w-sm relative">
            <Button variant="outline" className="w-64 justify-start text-muted-foreground bg-muted/50 border-muted-foreground/20 h-9 px-3">
              <Search className="w-4 h-4 mr-2" />
              <span>Search tools...</span>
              <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-red-500">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
              )}
            </Button>
          </Link>

          <ThemeToggle />

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}