'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaRegWindowClose, FaSave } from 'react-icons/fa';

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
  applicationDeadline: string;
}

export default function UpdateJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`https://job-portal-backend-xshy.onrender.com/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchJob();
  }, [id]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://job-portal-backend-xshy.onrender.com/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (res.ok) {
        alert('Job updated successfully!');
        router.push(`/employer/my-jobs/${id}`);
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };
  const handleCancel = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJob((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (loading) return <div className="text-center py-20">Loading job details...</div>;
  if (!job) return <div className="text-center py-20 text-red-500">Job not found!</div>;

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 transition-all">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 text-center">Update Job Post</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border border-primary-light rounded-2xl p-6 shadow-sm bg-primary-lightest dark:bg-primary-lightest/30"
      >
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={job.jobTitle}
            onChange={handleChange}
            className="w-full p-2 border border-primary-light rounded-md bg-transparent focus:outline-none focus:border-primary-medium"
          />
        </div>

        {/* Company Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={job.companyName}
              onChange={handleChange}
              className="w-full p-2 border border-primary-light rounded-md bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={job.location}
              onChange={handleChange}
              className="w-full p-2 border border-primary-light rounded-md bg-transparent"
            />
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Description</label>
          <textarea
            name="jobDescription"
            value={job.jobDescription}
            onChange={handleChange}
            className="w-full p-2 border border-primary-light rounded-md bg-transparent h-28 resize-none"
          />
        </div>

        {/* Salary & Job Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Salary (Fixed)</label>
            <input
              type="number"
              name="salary.fixed"
              value={job.salary.fixed}
              onChange={(e) =>
                setJob((prev) =>
                  prev ? { ...prev, salary: { ...prev.salary, fixed: Number(e.target.value) } } : null
                )
              }
              className="w-full p-2 border border-primary-light rounded-md bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Type</label>
            <input
              type="text"
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
              className="w-full p-2 border border-primary-light rounded-md bg-transparent"
            />
          </div>
        </div>

        {/* Work Arrangement & Start Date */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Work Arrangement</label>
            <input
              type="text"
              name="workArrangement"
              value={job.workArrangement}
              onChange={handleChange}
              className="w-full p-2 border border-primary-light rounded-md bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="jobStartDate"
              value={job.jobStartDate.split('T')[0]}
              onChange={handleChange}
              className="w-full p-2 border border-primary-light rounded-md bg-transparent"
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Requirements (one per line)
          </label>
          <textarea
            name="requirements"
            value={job.requirements.join('\n\n')}
            onChange={(e) =>
              setJob((prev) =>
                prev
                  ? {
                    ...prev,
                    requirements: e.target.value
                      .split(/\n+/) // split by one or more newlines
                      .map((r) => r.trim())
                      .filter((r) => r.length > 0), // remove empty lines
                  }
                  : null
              )
            }
            className="w-full p-3 border border-primary-light dark:border-gray-600 rounded-md bg-transparent min-h-[180px] resize-y"
          />
        </div>


        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            value={job.skills.join(', ')}
            onChange={(e) =>
              setJob((prev) => (prev ? { ...prev, skills: e.target.value.split(',').map((r) => r.trim()) } : null))
            }
            className="w-full p-2 border border-primary-light rounded-md bg-transparent"
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block text-sm font-medium mb-1">Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            value={job.applicationDeadline.split('T')[0]}
            onChange={handleChange}
            className="w-full p-2 border border-primary-light rounded-md bg-transparent"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-end">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary-medium hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-semibold transition w-full md:w-auto"
          >
            <FaSave /> Update Job
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition w-full md:w-auto"
            onClick={handleCancel}
          >
            <FaRegWindowClose /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
