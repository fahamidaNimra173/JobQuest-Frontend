import { Metadata } from 'next';
import SettingsContent from '@/components/dashboard/SettingsContent';

export const metadata: Metadata = {
  title: 'Settings - JobQuest',
  description: 'Manage your account settings and preferences',
};

export default async function SettingsPage() {
  return <SettingsContent />;
}