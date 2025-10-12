"use client";

import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function JobCard({ job }: { job: Job }) {
    const routeTo = `/employer/my-jobs/${job._id}`;
    const router = useRouter();
    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center mb-3">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mr-3">
                    <Briefcase className="text-primary w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {job.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.companyName}
                    </p>
                </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <p>
                    <span className="font-medium">Posted:</span> {job.postedAt}
                </p>
                <p>
                    <span className="font-medium">Deadline:</span> {job.applicationDeadline}
                </p>
                <p>
                    <span className="font-medium">Applicants:</span> {job.totalApplicants}
                </p>
                <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${job.status === "Job Ongoing"
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                            : job.status === "Candidate Listing"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                                : job.status === "Interviewing"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
                                    : "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-100"
                            }`}
                    >
                        {job.status || "Unknown"}
                    </span>
                </p>
            </div>

            <button onClick={() => router.push(routeTo)} className="mt-4 px-4 py-2 bg-primary border-1 border-violet-300 hover:border-0 text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                View Details
            </button>
        </div>
    );
}
