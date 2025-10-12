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
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
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