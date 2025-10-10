import { Metadata } from 'next';
import ResumeContent from '@/components/dashboard/ResumeContent';

export const metadata: Metadata = {
  title: 'My Resume - JobQuest',
  description: 'Upload and manage your resume',
};

export default async function ResumePage() {
  return <ResumeContent />;
}