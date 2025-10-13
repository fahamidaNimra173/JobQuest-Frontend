"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/dashboard/(employer)/JobCard";
import SkeletonCard from "@/components/dashboard/(employer)/SkeletonCard";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  companyDescription: string;
  companyGoals: string;
  location: string;
  jobDescription: string;
  jobType: string;
  workArrangement: string;
  jobStartDate: string;
  salary: { fixed: number; currency: string };
  benefits: string[];
  keyResponsibilities: string[];
  requirements: string[];
  otherRequirements: string;
  skills: string[];
  educationRequirements: string;
  industry: string;
  tags: string[];
  seniorityLevel: string;
  experienceLevel: { level: string; years: number };
  totalApplicants: number;
  applicationDeadline: string;
  postedAt: string;
  status: string;
}

interface ApiResponse {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  totalJobs: number;
}

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://job-portal-backend-xshy.onrender.com/api?page=${currentPage}&limit=12`,
          {
            cache: "no-store",
          }
        );
        const data: ApiResponse = await res.json();

        setJobs(data.jobs || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [currentPage]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        My Posted Jobs
      </h1>

      {loading ? (
        <SkeletonCard count={6} />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No job postings found.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 space-x-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}