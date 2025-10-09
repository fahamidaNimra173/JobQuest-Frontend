'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {/* Home icon */}
        <li>
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-primary-dark dark:text-gray-500 dark:hover:text-primary-medium transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>
        
        {items.map((item) => (
          <li key={item.name} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 mx-2" />
            {item.current ? (
              <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-primary-dark dark:text-gray-400 dark:hover:text-primary-medium transition-colors duration-200 hover:underline"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}