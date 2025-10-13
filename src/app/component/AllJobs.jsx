'use client'
import { useState } from 'react';
import axiosInstance from '../../lib/axios'

import JobCard from "./shared/Cards";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Create axios instance
const axiosInstanceTwo = axios.create({
  baseURL: "https://job-portal-backend-xshy.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchJobs = async ({ queryKey }) => {
    const [_key, page, limit] = queryKey
    const response = await axiosInstanceTwo.get(`/jobs?page=${page}&limit=${limit}`);
    return response.data;
}


export default function AllJobs() {
    const [page, setPage] = useState(1);
    const limit = 5
    const { data, error, isLoading } = useQuery({
        queryKey: ["jobs", page, limit],
        queryFn: fetchJobs
    });

    if (isLoading) return <p>Loading Jobs...</p>;
    if (error) return <p>Error loading Jobs: {error.message}</p>;
    return (
        <div>
            {data.jobs.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1  gap-6">
                        {data.jobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-[#7670d6] text-white rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={data.jobs.length < limit}
                            className="px-4 py-2 bg-[#7670d6] text-white rounded hover:bg-[#5a55c3] disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                </div>

            ) : (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                </div>
            )}
        </div>
    )
}