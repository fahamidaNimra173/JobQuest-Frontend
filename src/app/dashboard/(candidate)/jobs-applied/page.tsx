'use client';

import React, { useState, useEffect } from 'react';
import JobsAppliedContent from '@/components/dashboard/(candidate)/JobsAppliedContent';
import apiClient from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

interface AppliedJob {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: string;
  type: string;
  logo: string | null;
  description: string;
}

export default function JobsAppliedPage() {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getCandidateApplications();
        
        if (response.success) {
          // Transform API data to match component expectations
          const transformedJobs = (response.data as any[]).map((app: any, index: number) => ({
            id: index + 1,
            company: app.job?.company || 'Unknown Company',
            position: app.job?.title || 'Unknown Position',
            location: app.job?.location || 'Location not specified',
            salary: app.job?.salary || 'Salary not specified',
            appliedDate: app.appliedDate,
            status: app.status,
            type: app.job?.jobType || 'Full-time',
            logo: app.job?.companyLogo || null,
            description: app.job?.description || 'No description available'
          }));
          
          setAppliedJobs(transformedJobs);
        }
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        showToast('error', 'Error', 'Failed to load applied jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  return <JobsAppliedContent appliedJobs={appliedJobs} />;
}