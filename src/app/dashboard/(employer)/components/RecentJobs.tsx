"use client";
import { useState } from "react";
import { Briefcase } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  postedDate: string;
  deadline: string;
  applicants: number;
  status: "Job Ongoing" | "Candidate Listing" | "Interviewing" | "Successfully Hired";
}

const dummyJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Ltd.",
    postedDate: "2025-10-01",
    deadline: "2025-10-15",
    applicants: 12,
    status: "Job Ongoing",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeBase Inc.",
    postedDate: "2025-09-28",
    deadline: "2025-10-10",
    applicants: 20,
    status: "Candidate Listing",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    postedDate: "2025-09-25",
    deadline: "2025-10-12",
    applicants: 15,
    status: "Interviewing",
  },
];

export default function RecentJobs() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Recent Posted Jobs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyJobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col p-4 bg-white dark:bg-[#1f2937] rounded-xl shadow hover:shadow-lg transition-all"
          >
            {/* Icon + Title */}
            <div className="flex items-center mb-3">
              <div className="bg-primary-lightest dark:bg-primary-dark rounded-full p-2 mr-3">
                <Briefcase className="text-primary-dark dark:text-primary-light" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{job.title}</h3>
            </div>

            {/* Company */}
            <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company}</p>

            {/* Dates */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Posted: <span className="font-medium">{job.postedDate}</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Deadline: <span className="font-medium">{job.deadline}</span>
            </p>

            {/* Applicants */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Applicants: <span className="font-medium">{job.applicants}</span>
            </p>

            {/* Status */}
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full font-semibold
                ${
                  job.status === "Job Ongoing"
                    ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                    : job.status === "Candidate Listing"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                    : job.status === "Interviewing"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                    : "bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100"
                }`}
            >
              {job.status}
            </span>

            {/* Details Button */}
            <button className="mt-3 px-4 py-2 bg-primary-medium text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-all text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
