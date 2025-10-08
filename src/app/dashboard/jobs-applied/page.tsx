import { Metadata } from 'next';
import JobsAppliedContent from '@/components/dashboard/JobsAppliedContent';

export const metadata: Metadata = {
  title: 'Jobs Applied - JobQuest',
  description: 'View and manage your job applications',
};

export default async function JobsAppliedPage() {
  // This would typically fetch applied jobs data from the backend
  const appliedJobs = [
    {
      id: 1,
      company: 'TechCorp Inc.',
      position: 'Senior Frontend Developer',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      appliedDate: '2024-01-15',
      status: 'Under Review',
      type: 'Full-time',
      logo: null,
      description: 'Looking for an experienced frontend developer to join our team...'
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      salary: '$100,000 - $130,000',
      appliedDate: '2024-01-14',
      status: 'Interview Scheduled',
      type: 'Full-time',
      logo: null,
      description: 'Exciting opportunity to work with cutting-edge technologies...'
    },
    {
      id: 3,
      company: 'WebSolutions Ltd.',
      position: 'React Developer',
      location: 'Remote',
      salary: '$80,000 - $100,000',
      appliedDate: '2024-01-12',
      status: 'Rejected',
      type: 'Contract',
      logo: null,
      description: 'Remote position for experienced React developer...'
    },
    {
      id: 4,
      company: 'InnovateTech',
      position: 'Frontend Engineer',
      location: 'Austin, TX',
      salary: '$85,000 - $110,000',
      appliedDate: '2024-01-10',
      status: 'Applied',
      type: 'Full-time',
      logo: null,
      description: 'Join our innovative team building next-generation applications...'
    }
  ];

  return <JobsAppliedContent appliedJobs={appliedJobs} />;
}