import { Metadata } from 'next';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

export const metadata: Metadata = {
  title: 'Dashboard - JobQuest',
  description: 'Your job search dashboard',
};

export default async function DashboardPage() {
  // This would typically fetch data from the backend API
  // For now, we'll use static data
  const dashboardData = {
    stats: {
      appliedJobs: 24,
      savedJobs: 12,
      jobAlerts: 8
    },
    recentApplications: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        appliedDate: '2024-01-15',
        status: 'Under Review'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        appliedDate: '2024-01-14',
        status: 'Interview Scheduled'
      }
    ]
  };

  return <DashboardOverview data={dashboardData} />;
}