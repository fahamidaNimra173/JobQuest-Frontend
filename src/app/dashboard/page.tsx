'use client';

import React, { useState, useEffect } from 'react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import apiClient from '@/lib/api';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface DashboardData {
  stats: {
    appliedJobs: number;
    savedJobs: number;
  };
  recentApplications: Array<{
    id: number;
    company: string;
    position: string;
    appliedDate: string;
    status: string;
  }>;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    // Redirect based on user role
    if (!authLoading && user) {
      if (user.role === 'employer') {
        router.push('/dashboard/employer-profile');
        return;
      }
      
      if (user.role === 'admin') {
        router.push('/dashboard/statistics');
        return;
      }
      
      // For candidates, fetch dashboard data
      const fetchDashboardData = async () => {
        try {
          setLoading(true);
          // Fetch applications and saved jobs in parallel using candidate-specific endpoints
          const [applicationsResponse, savedJobsResponse] = await Promise.all([
            apiClient.getCandidateApplications(),
            apiClient.getCandidateSavedJobs()
          ]);

          if (applicationsResponse.success && savedJobsResponse.success) {
            // Process applications data
            const recentApplications = (applicationsResponse.data as any[]).slice(0, 5).map((app: any, index: number) => ({
              id: index + 1,
              company: app.job?.company || 'Unknown Company',
              position: app.job?.title || 'Unknown Position',
              appliedDate: app.appliedDate,
              status: app.status
            }));

            // Set dashboard data
            setDashboardData({
              stats: {
                appliedJobs: (applicationsResponse.data as any[]).length,
                savedJobs: (savedJobsResponse.data as any[]).length
              },
              recentApplications
            });
          }
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          showToast('error', 'Error', 'Failed to load dashboard data');
        } finally {
          setLoading(false);
        }
      };

      fetchDashboardData();
    } else if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router, showToast]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  // For employers and admins, we redirect above, so this only shows for candidates
  if (!dashboardData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-center text-gray-500">No dashboard data available</p>
      </div>
    );
  }

  return <DashboardOverview data={dashboardData} />;
}