import Link from 'next/link';
import { ArrowRight, Briefcase, Users, Search, Star } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-primary-dark mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">JobQuest</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/dashboard"
                className="bg-primary-dark text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-primary-light dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Find Your Dream Job
              <span className="text-primary-dark"> Today</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover thousands of job opportunities with all the information you need.
              Its your future. Come find it. Manage all your job search activities from one dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-primary-dark text-white px-8 py-4 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center text-lg font-medium"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/dashboard"
                className="bg-white dark:bg-gray-700 text-primary-dark dark:text-primary-light border-2 border-primary-dark dark:border-primary-light px-8 py-4 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center text-lg font-medium"
              >
                <Search className="w-5 h-5 mr-2" />
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
              <div className="bg-primary-light dark:bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-dark dark:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Smart Job Search</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use our advanced filters to find jobs that match your skills, experience, and preferences.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
              <div className="bg-primary-light dark:bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-dark dark:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Professional Network</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with recruiters and employers. Build your professional network and get noticed.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
              <div className="bg-primary-light dark:bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-dark dark:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Career Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your applications, save interesting jobs, and get personalized career recommendations.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
