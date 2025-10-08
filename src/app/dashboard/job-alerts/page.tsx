import { Metadata } from 'next';
import JobAlertsContent from '@/components/dashboard/JobAlertsContent';

export const metadata: Metadata = {
  title: 'Job Alerts - JobQuest',
  description: 'Manage your job alerts and notifications',
};

export default async function JobAlertsPage() {
  // This would typically fetch job alerts data from the backend
  const jobAlerts = [
    {
      id: 1,
      title: 'Frontend Developer Jobs',
      keywords: ['React', 'JavaScript', 'TypeScript'],
      location: 'New York, NY',
      salaryMin: 80000,
      salaryMax: 120000,
      jobType: 'Full-time',
      frequency: 'Daily',
      isActive: true,
      createdDate: '2024-01-10',
      lastNotified: '2024-01-15',
      matchCount: 12
    },
    {
      id: 2,
      title: 'Remote Developer Positions',
      keywords: ['React', 'Node.js', 'Remote'],
      location: 'Remote',
      salaryMin: 90000,
      salaryMax: 140000,
      jobType: 'Full-time',
      frequency: 'Weekly',
      isActive: true,
      createdDate: '2024-01-08',
      lastNotified: '2024-01-14',
      matchCount: 8
    },
    {
      id: 3,
      title: 'Senior Full Stack Roles',
      keywords: ['Full Stack', 'Senior', 'JavaScript'],
      location: 'San Francisco, CA',
      salaryMin: 120000,
      salaryMax: 160000,
      jobType: 'Full-time',
      frequency: 'Daily',
      isActive: false,
      createdDate: '2024-01-05',
      lastNotified: '2024-01-12',
      matchCount: 5
    }
  ];

  return <JobAlertsContent jobAlerts={jobAlerts} />;
}