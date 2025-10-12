import { Metadata } from 'next';
import ProfileContent from '@/components/dashboard/(candidate)/ProfileContent';

export const metadata: Metadata = {
  title: 'My Profile - JobQuest',
  description: 'Manage your profile information',
};

export default function ProfilePage() {
  return <ProfileContent />;
}
