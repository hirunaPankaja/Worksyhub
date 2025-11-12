// src/components/AdBanner.tsx
'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';

export function AdBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      className="container mx-auto my-8 max-w-5xl"
      aria-label="Advertisement"
    >
      <div className="relative flex min-h-[100px] w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-6 text-muted-foreground">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-background transition-colors"
          aria-label="Close advertisement"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <Info className="h-5 w-5" />
          <div className="text-center">
            <span className="text-sm font-medium">Advertisement Space</span>
            <p className="text-xs text-muted-foreground mt-1">
              (728x90 or responsive ad placement)
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}