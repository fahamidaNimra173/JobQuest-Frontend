import Link from "next/link";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Building,
  Users,
  ArrowLeft,
  Share2,
  Bookmark,
} from "lucide-react";

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
  salary?: {
    fixed?: number;
    currency?: string;
  };
  benefits?: string[];
  keyResponsibilities?: string[];
  requirements?: string[];
  otherRequirements?: string;
  skills?: string[];
  experienceLevel: {
    level: string;
    years: number;
  };
  educationRequirements?: string;
  industry: string;
  seniorityLevel?: string;
  totalApplicants: number;
  applicationDeadline: string;
  postedAt: string;
}

async function getJobDetails(id: string): Promise<Job | null> {
  try {
    const res = await fetch(
      `https://job-portal-backend-xshy.onrender.com/api/jobs/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null;
  }
}

// ✅ Fixed typing for Next.js 15+ - params is now a Promise
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const job = await getJobDetails(id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Job Not Found
          </h1>
          <Link href="/jobs" className="text-[#7670d6] hover:underline">
            Back to Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen py-40">
      <div className="px-6 lg:px-[120px]">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7670d6] mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Jobs</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {job.jobTitle}
                  </h1>
                  <p className="text-xl text-gray-700 font-semibold">
                    {job.companyName}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Bookmark size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>{job.jobType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building size={16} />
                  <span>{job.workArrangement}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Posted {getTimeAgo(job.postedAt)}</span>
                </div>
              </div>

              {job.salary && job.salary.fixed && (
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                  <DollarSign size={20} className="text-gray-600" />
                  <span>
                    {job.salary.currency} {job.salary.fixed.toLocaleString()} /
                    year
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>{job.totalApplicants} applicants</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {job.jobDescription}
              </p>
            </div>

            {/* Key Responsibilities */}
            {job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Key Responsibilities
                </h2>
                <ul className="space-y-2">
                  {job.keyResponsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#7670d6] mt-1">•</span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#7670d6] mt-1">•</span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
                {job.otherRequirements && (
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Additional Requirements
                    </h3>
                    <p className="text-gray-700">{job.otherRequirements}</p>
                  </div>
                )}
              </div>
            )}

            {/* Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Skills Required
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#f8f3ed] text-[#7670d6] font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#7670d6] rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Apply Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <button className="w-full bg-[#7670d6] text-white py-3 rounded-lg font-semibold hover:bg-[#6660c6] transition-colors mb-4">
                  Apply Now
                </button>
                <button className="w-full border-2 border-[#7670d6] text-[#7670d6] py-3 rounded-lg font-semibold hover:bg-[#f8f3ed] transition-colors">
                  Save Job
                </button>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  About the Company
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {job.companyDescription}
                </p>
                {job.companyGoals && (
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">
                      Company Goals
                    </h4>
                    <p className="text-gray-600 text-sm">{job.companyGoals}</p>
                  </div>
                )}
              </div>

              {/* Job Overview */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Job Overview
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-semibold text-gray-900">
                      {job.industry}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience Level</span>
                    <span className="font-semibold text-gray-900">
                      {job.experienceLevel.level}
                    </span>
                  </div>
                  {job.educationRequirements && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Education</span>
                      <span className="font-semibold text-gray-900">
                        {job.educationRequirements}
                      </span>
                    </div>
                  )}
                  {job.seniorityLevel && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seniority</span>
                      <span className="font-semibold text-gray-900">
                        {job.seniorityLevel}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(job.jobStartDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}