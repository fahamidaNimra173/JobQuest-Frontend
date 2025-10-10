'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  FileText,
  Bell,
  Heart,
  Lock,
  LogOut,
  Menu,
  X,
  Briefcase
} from 'lucide-react';
import clsx from 'clsx';
import { useToast } from '@/components/ui/Toast';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Briefcase },
  { name: 'My Profile', href: '/dashboard/profile', icon: User },
  { name: 'Jobs Applied', href: '/dashboard/jobs-applied', icon: Briefcase },
  { name: 'Job Alerts', href: '/dashboard/job-alerts', icon: Bell },
  { name: 'Saved Jobs', href: '/dashboard/saved-jobs', icon: Heart },
  { name: 'My Resume', href: '/dashboard/resume', icon: FileText },
  { name: 'Change Password', href: '/dashboard/change-password', icon: Lock },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { showToast } = useToast();

  const handleLogout = () => {
    console.log('Logout clicked');
    
    // Clear any stored authentication data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('jobquest-theme'); // Optional: preserve theme
      sessionStorage.clear();
    }
    
    // Show success toast
    showToast('success', 'Logged out successfully', 'You have been logged out of your account.');
    
    // Redirect to home page after a brief delay
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transform transition-all duration-200 ease-in-out lg:translate-x-0',
          {
            'translate-x-0': isMobileMenuOpen,
            '-translate-x-full': !isMobileMenuOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="text-2xl font-bold text-primary-dark dark:text-primary-medium transition-colors duration-200">
              JobQuest
            </Link>
            {/* Theme toggle in sidebar for mobile */}
            <div className="lg:hidden">
              <ThemeToggle className="" showTooltip={false} />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                    {
                      'bg-primary-dark dark:bg-primary-medium text-white border-r-4 border-white': isActive,
                    },
                    !isActive && 'text-gray-600 hover:bg-primary-dark hover:text-white',
                    !isActive && 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info Section */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {/* User Photo */}
              <div className="w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              
              {/* User Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  John Doe
                </p>
                <p className="text-xs text-primary-dark dark:text-primary-medium font-medium">
                  Software Developer
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  john.doe@example.com
                </p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={handleLogout}
              type="button"
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}