'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaTrash, FaEdit, FaPodcast } from 'react-icons/fa';
import JobDetailSkeleton from '@/components/dashboard/(employer)/JobDetailSkeleton';

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
}

export default function JobDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_JOB_URL;
    useEffect(() => {
        async function fetchJob() {
            try {
                const res = await fetch(`${baseUrl}/${id}`);
                const data = await res.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchJob();
    }, [id]);

    const handleUpdate = () => {
        router.push(`/dashboard/update-job/${id}`);
    };

    const handleDelete = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this job post?');
        if (!confirmDelete) return;
        try {
            const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                alert('Job deleted successfully!');
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };
    
    const handleSeeApplicants = () => {
        if (job) {
            router.push(`/dashboard/applicants?jobId=${job._id}`);
        }
    };


    if (loading) return <JobDetailSkeleton />;
    if (!job) return <div className="text-center py-20 text-red-500 text-2xl font-extrabold">Job not found!</div>;

    return (
        <div className="max-w-7xl mx-auto px-5 py-2 transition-all bg-white dark:bg-[#1f2937]">
            {/* HEADER SECTION */}
            <div className="border-b border-gray-300  p-6  bg-white dark:bg-[#1f2937]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center  ">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-dark dark:text-gray-100">{job.jobTitle}</h1>
                        <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold">{job.companyName}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm">
                            <span className="flex items-center gap-1 text-gray-800 dark:text-gray-100 "><FaMapMarkerAlt /> {job.location}</span>
                            <span className="flex items-center gap-1 text-gray-800 dark:text-gray-100 "><FaBriefcase /> {job.jobType}</span>
                            <span className="flex items-center gap-1 text-gray-800 dark:text-gray-100 "><FaClock /> Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1 text-gray-800 dark:text-gray-100 "><FaPodcast /> Posted on: {new Date(job.postedAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4 md:mt-0">
                        <button
                            onClick={handleUpdate}
                            className="flex items-center gap-2 bg-primary-medium hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
                        >
                            <FaEdit /> Update
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN DETAILS SECTION */}
            <div className="mt-2 grid md:grid-cols-3 gap-2">
                {/* LEFT SIDE */}
                <div className="md:col-span-2 space-y-6 border-r border-gray-300">
                    <section className="rounded-xl p-6 bg-white dark:bg-[#1f2937]">
                        <h2 className="text-xl font-semibold text-primary-dark dark:text-gray-100 mb-3">Company Overview</h2>
                        <p className="text-sm mb-2 text-gray-800 dark:text-gray-100">{job.companyDescription}</p>
                        <p className="text-sm italic text-gray-800 dark:text-gray-100">Goal: {job.companyGoals}</p>
                    </section>
                    <section className="rounded-xl p-6 bg-white dark:bg-[#1f2937]">
                        <h2 className="text-xl font-semibold text-primary-dark dark:text-gray-100 mb-3">Job Description</h2>
                        <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-100">{job.jobDescription}</p>
                    </section>

                    <section className="rounded-xl p-6 bg-white dark:bg-[#1f2937]">
                        <h2 className="text-xl font-semibold text-primary-dark dark:text-gray-100 mb-3">Key Responsibilities</h2>
                        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-800 dark:text-gray-100">
                            {job.keyResponsibilities.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </section>

                    <section className="rounded-xl p-6 bg-white dark:bg-[#1f2937]">
                        <h2 className="text-xl font-semibold text-primary-dark dark:text-gray-100 mb-3">Requirements</h2>
                        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-800 dark:text-gray-100">
                            {job.requirements.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p className="mt-3 text-sm italic text-gray-800 dark:text-gray-100">Other: {job.otherRequirements}</p>
                    </section>

                    <section className="rounded-xl p-6 bg-white dark:bg-[#1f2937]">
                        <h2 className="text-xl font-semibold text-primary-dark dark:text-gray-100 mb-3">Skills & Tools</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full bg-primary-medium text-gray-900  text-xs font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    <section className="rounded-xl p-6 bg-white dark:bg-[#1f2937]">
                        <h2 className="text-lg font-semibold text-primary-dark dark:text-gray-100 mb-3">Job Info</h2>
                        <div className="space-y-2 text-sm text-gray-800 dark:text-gray-100">
                            <p><strong>Industry:</strong> {job.industry}</p>
                            <p><strong>Education:</strong> {job.educationRequirements}</p>
                            <p><strong>Seniority:</strong> {job.seniorityLevel}</p>
                            <p><strong>Experience:</strong> {job.experienceLevel.level} ({job.experienceLevel.years} year)</p>
                            <p><strong>Start Date:</strong> {new Date(job.jobStartDate).toLocaleDateString()}</p>
                        </div>
                    </section>

                    <section className="rounded-xl p-6 bg-white dark:bg-[#1f2937]">
                        <h2 className="text-lg font-semibold text-primary-dark dark:text-gray-100 mb-3">Compensation</h2>
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{job.salary.fixed} {job.salary.currency}</p>
                        <ul className="mt-3 list-disc pl-5 text-sm text-gray-800 dark:text-gray-100">
                            {job.benefits.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                    </section>



                    <section className="rounded-xl p-6 bg-white dark:bg-[#1f2937]">
                        <h2 className="text-lg font-semibold text-primary-dark dark:text-gray-100 mb-3">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 text-xs rounded-lg text-gray-800 dark:text-gray-100">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <div>
                {/* ...job details UI */}
                <button
                    onClick={handleSeeApplicants}
                    className="bg-primary-medium hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
                >
                    See Applicants
                </button>
            </div>
        </div>
    );
}