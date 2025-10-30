import ProfileContent from '@/components/dashboard/(admin)/ProfileContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile - JobQuest',
  description: 'Manage your profile information',
};

export default function ProfilePage() {
  return <ProfileContent />;
}
