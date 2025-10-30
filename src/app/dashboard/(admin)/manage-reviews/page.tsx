import ManageReviewsContent from '@/components/dashboard/(admin)/ManageReviewsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Reviews - JobQuest',
  description: 'Manage Reviews. Approve, reject or delete posts.',
};

export default function ManageReviewsPage() {
  return <ManageReviewsContent />;
}