import Link from 'next/link';
import { MapPin, Briefcase, Clock, DollarSign, Calendar } from 'lucide-react';
import {job} from '../../types/job'
interface JobCardProps {
  job: job
}

export default function JobCard({ job }: JobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTimeAgo = (dateString: string) => {
    // console.log(job)
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold font-mono text-gray-900 mb-1 hover:text-[#7670d6] transition-colors">
            <Link href={`/jobs/${job._id}`}>
              {job.jobTitle}
            </Link>
          </h3>
          <p className="text-lg font-semibold text-gray-700">{job.companyName}</p>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
          {getTimeAgo(job.postedAt)}
        </span>
      </div>

      {/* Company Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {job.companyDescription}
      </p>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2 text-gray-400" />
          <span>{job.location}</span>
          <span className="mx-2">•</span>
          <span className="text-[#7670d6] font-medium">{job.workArrangement}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Briefcase size={16} className="mr-2 text-gray-400" />
          <span>{job.jobType}</span>
          <span className="mx-2">•</span>
          <span>{job.experienceLevel.level} Level</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <DollarSign size={16} className="mr-2 text-gray-400" />
          <span className="font-semibold text-gray-900">
            {job.salary.currency} {job.salary.fixed}
          </span>
          <span className="ml-1">/ year</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-gray-400" />
          <span>Deadline: {formatDate(job.applicationDeadline)}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#f8f3ed] text-[#7670d6] text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          <span>{job.totalApplicants} applicants</span>
        </div>
        
        <Link
          href={`/jobs/${job._id}`}
          className="px-4 py-2 bg-[#7670d6] text-white rounded-lg font-medium hover:bg-[#6660c6] transition-colors text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}