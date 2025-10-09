import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
      {/* Header */}
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
          <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}