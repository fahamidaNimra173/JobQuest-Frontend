import { Metadata } from 'next';
import SavedJobsContent from '@/components/dashboard/(candidate)/SavedJobsContent';

export const metadata: Metadata = {
  title: 'Saved Jobs - JobQuest',
  description: 'View and manage your saved job opportunities',
};

export default async function SavedJobsPage() {
  // This would typically fetch saved jobs data from the backend
  const savedJobs = [
    {
      id: 1,
      company: 'TechCorp Inc.',
      position: 'Senior Frontend Developer',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      jobType: 'Full-time',
      savedDate: '2024-01-15',
      postedDate: '2024-01-10',
      logo: null,
      description: 'We are looking for an experienced frontend developer to join our growing team...',
      requirements: ['5+ years of React experience', 'TypeScript proficiency', 'Strong CSS skills'],
      benefits: ['Health insurance', '401k matching', 'Flexible working hours']
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      salary: '$100,000 - $130,000',
      jobType: 'Full-time',
      savedDate: '2024-01-14',
      postedDate: '2024-01-12',
      logo: null,
      description: 'Join our innovative startup building the next generation of web applications...',
      requirements: ['React and Node.js experience', 'Database design skills', 'Agile methodology'],
      benefits: ['Equity package', 'Unlimited PTO', 'Learning budget']
    },
    {
      id: 3,
      company: 'RemoteFirst Co.',
      position: 'React Developer',
      location: 'Remote',
      salary: '$80,000 - $100,000',
      jobType: 'Contract',
      savedDate: '2024-01-12',
      postedDate: '2024-01-08',
      logo: null,
      description: 'Remote opportunity for a skilled React developer to work on exciting projects...',
      requirements: ['3+ years React experience', 'Remote work experience', 'Self-motivated'],
      benefits: ['100% remote', 'Flexible schedule', 'Project bonuses']
    }
  ];

  return <SavedJobsContent savedJobs={savedJobs} />;
}