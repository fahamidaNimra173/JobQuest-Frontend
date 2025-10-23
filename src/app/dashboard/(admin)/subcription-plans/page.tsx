import SubscriptionPlansContent from '@/components/dashboard/(admin)/SubscriptionPlansContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subcription Plans- JobQuest',
  description: 'Subcription Plans. See all subscription plans, add new plan, update or delete subscription plan.',
};

export default function SubscriptionPlansPage() {
  return <SubscriptionPlansContent />;
}