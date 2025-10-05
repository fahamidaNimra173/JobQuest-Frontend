'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light',
  enableSystem = false,
  disableTransitionOnChange = false,
  storageKey = 'jobquest-theme',
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
      themes={['light', 'dark']}
      value={{
        light: 'light',
        dark: 'dark'
      }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}