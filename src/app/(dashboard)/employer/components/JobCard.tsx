"use client";

import { Briefcase } from "lucide-react";

interface Job {
    id: number;
    title: string;
    company: string;
    postingDate: string;
    deadline: string;
    applicants: number;
    status: string;
}

export default function JobCard({ job }: { job: Job }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center mb-3">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mr-3">
                    <Briefcase className="text-primary w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.company}
                    </p>
                </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <p>
                    <span className="font-medium">Posted:</span> {job.postingDate}
                </p>
                <p>
                    <span className="font-medium">Deadline:</span> {job.deadline}
                </p>
                <p>
                    <span className="font-medium">Applicants:</span> {job.applicants}
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
                        {job.status}
                    </span>
                </p>
            </div>

            <button className="mt-4 px-4 py-2 bg-primary border-1 border-violet-300 hover:border-0 text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                View Details
            </button>
        </div>
    );
}
