'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function JoinUsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-dark text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Join Us
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50">
          <Link
            href="/login"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 hover:text-white dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup/candidate"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 hover:text-white dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Sign Up as Candidate
          </Link>
          <Link
            href="/signup/employer"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 hover:text-white dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Sign Up as Employer
          </Link>
        </div>
      )}
    </div>
  );
}