'use client';

import React, { useState, useEffect } from 'react';
import SavedJobsContent from '@/components/dashboard/(candidate)/SavedJobsContent';
import apiClient from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

interface SavedJob {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: string;
  jobType: string;
  savedDate: string;
  postedDate: string;
  logo: string | null;
  description: string;
  requirements: string[];
  benefits: string[];
}

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getCandidateSavedJobs();
        
        if (response.success) {
          // Transform API data to match component expectations
          const transformedJobs = (response.data as any[]).map((savedJob: any, index: number) => {
            const job = savedJob.job || {};
            return {
              id: index + 1,
              company: job.company || 'Unknown Company',
              position: job.title || 'Unknown Position',
              location: job.location || 'Location not specified',
              salary: job.salary || 'Salary not specified',
              jobType: job.jobType || 'Full-time',
              savedDate: savedJob.savedDate || new Date().toISOString(),
              postedDate: job.postedDate || new Date().toISOString(),
              logo: job.companyLogo || null,
              description: job.description || 'No description available',
              requirements: job.requirements || ['No requirements specified'],
              benefits: job.benefits || ['No benefits specified']
            };
          });
          
          setSavedJobs(transformedJobs);
        }
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
        showToast('error', 'Error', 'Failed to load saved jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  return <SavedJobsContent savedJobs={savedJobs} />;
}