'use client';

import React, { useState, useEffect } from 'react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import apiClient from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

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
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch applications and saved jobs in parallel
        const [applicationsResponse, savedJobsResponse] = await Promise.all([
          apiClient.getApplications(),
          apiClient.getSavedJobs()
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
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-center text-gray-500">No dashboard data available</p>
      </div>
    );
  }

  return <DashboardOverview data={dashboardData} />;
}