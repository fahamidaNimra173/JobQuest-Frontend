import { Metadata } from 'next';
import SearchContent from '@/components/dashboard/SearchContent';

export const metadata: Metadata = {
  title: 'Job Search - JobQuest',
  description: 'Search and discover new job opportunities',
};

export default async function SearchPage() {
  return <SearchContent />;
}