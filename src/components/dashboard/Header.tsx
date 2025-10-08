'use client';

import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useToast } from '@/components/ui/Toast';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Header search:', searchTerm);
    showToast('info', 'Search Started', `Searching for: ${searchTerm || 'all jobs'}`);
  };

  const handleMobileSearch = () => {
    console.log('Mobile search clicked');
    showToast('info', 'Mobile Search', 'Mobile search functionality opened');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 lg:pl-64 transition-colors duration-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side - empty for mobile, search for desktop */}
        <div className="flex-1 max-w-lg hidden lg:block">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Mobile Search Toggle - visible on mobile */}
        <div className="lg:hidden flex-1">
          <button 
            onClick={handleMobileSearch}
            type="button"
            className="p-2 text-gray-400 hover:bg-primary-dark hover:text-white dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle className="" showTooltip={true} />
          </div>

          {/* Notifications */}
          <button 
            type="button"
            onClick={() => showToast('info', 'Notifications', 'Notification panel opened')}
            className="relative p-2 text-gray-400 dark:text-gray-500 hover:bg-primary-dark hover:text-white dark:hover:text-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Software Developer</p>
            </div>
            <button 
              type="button"
              onClick={() => showToast('info', 'Profile Menu', 'Profile menu opened')}
              className="w-10 h-10 bg-primary-dark rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}