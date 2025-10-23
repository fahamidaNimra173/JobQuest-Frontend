import ManageUsersContent from '@/components/dashboard/(admin)/ManageUsersContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Users - JobQuest',
  description: 'Manage Users. See all users and manage them.',
};

export default function ManageUsersPage() {
  return <ManageUsersContent />;
}