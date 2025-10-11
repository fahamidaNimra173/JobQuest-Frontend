import { Metadata } from 'next';
import ChangePasswordContent from '@/components/dashboard/ChangePasswordContent';

export const metadata: Metadata = {
  title: 'Change Password - JobQuest',
  description: 'Update your account password',
};

export default async function ChangePasswordPage() {
  return <ChangePasswordContent />;
}