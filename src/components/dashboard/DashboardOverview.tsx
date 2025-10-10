import React from 'react';
import { Briefcase, Heart, Bell, Calendar, MapPin, DollarSign, Search, FileText } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface DashboardData {
  stats: {
    appliedJobs: number;
    savedJobs: number;
    jobAlerts: number;
  };
  recentApplications: Array<{
    id: number;
    company: string;
    position: string;
    appliedDate: string;
    status: string;
  }>;
}

interface DashboardOverviewProps {
  data: DashboardData;
}

export default function DashboardOverview({ data }: DashboardOverviewProps) {
  const { stats, recentApplications } = data;

  // Breadcrumb items for dashboard
  const breadcrumbItems = [
    { name: 'Overview', href: '/dashboard', current: true }
  ];

  const statCards = [
    {
      title: 'Applied Jobs',
      value: stats.appliedJobs,
      icon: Briefcase,
      color: '#7670d6',
      bgColor: 'bg-primary-dark'
    },
    {
      title: 'Saved Jobs',
      value: stats.savedJobs,
      icon: Heart,
      color: '#7670d6',
      bgColor: 'bg-primary-dark'
    },
    {
      title: 'Job Alerts',
      value: stats.jobAlerts,
      icon: Bell,
      color: '#7670d6',
      bgColor: 'bg-primary-dark'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Welcome Section */}
      <div className="rounded-lg p-6 text-white" style={{background: 'linear-gradient(to right, #7670d6, #9da0dc)'}}>
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-white opacity-90">Here&apos;s what&apos;s happening with your job search today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`rounded-lg p-6 ${stat.bgColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 dark:text-white text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="p-3 rounded-full bg-white">
                <stat.icon className="w-6 h-6 text-primary-dark" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{application.position}</h3>
                    <p className="text-sm text-gray-600">{application.company}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Applied on {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    application.status === 'Under Review' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : application.status === 'Interview Scheduled'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/dashboard/search" className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center space-x-3 transition-colors">
              <Search className="w-5 h-5" style={{color: '#7670d6'}} />
              <span className="text-sm font-medium">Search New Jobs</span>
            </Link>
            <Link href="/dashboard/resume" className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center space-x-3 transition-colors">
              <FileText className="w-5 h-5" style={{color: '#7670d6'}} />
              <span className="text-sm font-medium">Update Resume</span>
            </Link>
            <Link href="/dashboard/job-alerts" className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center space-x-3 transition-colors">
              <Bell className="w-5 h-5" style={{color: '#7670d6'}} />
              <span className="text-sm font-medium">Set Job Alert</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Profile Completion</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Profile Strength</span>
              <span className="font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full" style={{width: '85%', backgroundColor: '#7670d6'}}></div>
            </div>
            <p className="text-xs text-gray-600">Add skills and experience to improve your profile</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Latest Job Matches</h3>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="font-medium text-gray-900">Frontend Developer</p>
              <p className="text-gray-600">TechStart Inc.</p>
              <p className="text-xs text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                Remote • <DollarSign className="w-3 h-3 ml-2 mr-1" />$80k-100k
              </p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">React Developer</p>
              <p className="text-gray-600">WebCorp Ltd.</p>
              <p className="text-xs text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                New York • <DollarSign className="w-3 h-3 ml-2 mr-1" />$90k-120k
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}