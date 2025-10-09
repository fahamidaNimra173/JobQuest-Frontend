'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  className?: string;
  showTooltip?: boolean;
}

export default function ThemeToggle({ className = '', showTooltip = true }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    console.log('ThemeToggle mounted:', { theme, resolvedTheme, systemTheme });
  }, [theme, resolvedTheme, systemTheme]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        disabled
        className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 ${className}`}
        aria-label="Loading theme toggle"
      >
        <Moon className="w-5 h-5" />
      </button>
    );
  }

  const handleToggle = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    console.log('Theme toggle clicked!', {
      current: resolvedTheme,
      new: newTheme,
      theme,
      systemTheme
    });
    
    // Update theme via next-themes
    setTheme(newTheme);
    
    // Force immediate DOM update for better responsiveness
    setTimeout(() => {
      const html = document.documentElement;
      const body = document.body;
      
      if (newTheme === 'dark') {
        html.classList.add('dark');
        body.classList.add('dark');
        html.style.colorScheme = 'dark';
      } else {
        html.classList.remove('dark');
        body.classList.remove('dark');
        html.style.colorScheme = 'light';
      }
      
      // Force re-render of all elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.transition = 'all 0.3s ease';
        }
      });
      
      console.log('Theme force-applied:', {
        htmlDark: html.classList.contains('dark'),
        bodyDark: body.classList.contains('dark'),
        colorScheme: html.style.colorScheme
      });
    }, 10);
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`p-2 rounded-lg text-gray-500 hover:bg-primary-dark hover:text-white dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 ${className}`}
      title={showTooltip ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : undefined}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}