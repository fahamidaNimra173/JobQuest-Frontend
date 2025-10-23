export type PlanCycle = "monthly" | "yearly" | "lifetime";

export interface Subscription {
  _id: string;
  planName: string;
  planCycle: PlanCycle;
  price: number;
  jobPostLimit: number;
  features: string[];
  popular: boolean;
  featuredJobsLimit?: number;
  applicantViewLimit?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SubscriptionFormData {
  planName: string;
  planCycle: PlanCycle;
  price: number | string;  // Changed from just number
  jobPostLimit: number | string;  // Changed from just number
  featuredJobsLimit: number | string;  // Changed from just number
  applicantViewLimit: number | string;  // Changed from just number
  features: string[];
  popular: boolean;
}