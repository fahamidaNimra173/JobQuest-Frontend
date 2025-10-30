import ManageCommunityPostsContent from '@/components/dashboard/(admin)/ManageCommunityPostsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Community Posts - JobQuest',
  description: 'Manage Community Posts. Approve, reject or delete posts.',
};

export default function ManageCommunityPostsPage() {
  return <ManageCommunityPostsContent />;
}
