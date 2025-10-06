"use client";

import { useState } from "react";
import JobCard from "@/app/(dashboard)/employer/components/JobCard";

export default function MyJobsPage() {
  const fakeJobs = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Frontend Developer ${i + 1}`,
    company: "TechNova Ltd.",
    postingDate: "2025-10-01",
    deadline: "2025-10-20",
    applicants: Math.floor(Math.random() * 80) + 10,
    status: ["Job Ongoing", "Candidate Listing", "Interviewing", "Successfully Hired"][
      i % 4
    ],
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  const totalPages = Math.ceil(fakeJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = fakeJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        My Posted Jobs
      </h1>

      {/* Job cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination */}
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
    </section>
  );
}