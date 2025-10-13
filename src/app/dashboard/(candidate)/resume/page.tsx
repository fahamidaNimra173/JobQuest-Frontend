import { Metadata } from 'next';
import ResumeContent from '@/components/dashboard/(candidate)/ResumeContent';

export const metadata: Metadata = {
  title: 'My Resume - JobQuest',
  description: 'Upload and manage your resume',
};

export default async function ResumePage() {
  return <ResumeContent />;
}