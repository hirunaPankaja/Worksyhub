// src/components/ThemeProvider.tsx
'use client';

import * as React from 'react';
// We can import both the component and its types from the main package
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}