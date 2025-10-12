import React from 'react';

type Candidate = {
  _id: string;
  name: string;
  profileImage?: string;
  skills: string[];
  experience?: { company: string; position: string; startDate: string; endDate?: string }[];
};

type Props = {
  candidate: Candidate;
  status: string;
  onView: () => void;
  onChangeStatus: () => void;
};

export default function CandidateCard({ candidate, status, onView, onChangeStatus }: Props) {
  // Calculate experience years if available

  const totalExperienceYears = candidate.experience?.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return acc + years;
  }, 0);

  return (
    <div className="border rounded-xl p-4 bg-white dark:bg-[#1f2937] shadow-sm flex flex-col items-center text-center gap-3">
      <img
        src={candidate.profileImage || '/default-avatar.png'}
        alt={candidate.name}
        className="h-20 w-20 rounded-full object-cover"
      />

      <h3 className="text-lg font-semibold text-primary-dark dark:text-white">{candidate.name}</h3>

      {totalExperienceYears ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {totalExperienceYears.toFixed(1)} yrs experience
        </p>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">No experience</p>
      )}

      <div className="flex gap-2 flex-wrap justify-center mt-2">
        {candidate.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded-full text-xs bg-primary-lightest text-primary-dark"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onView}
          className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          View Details
        </button>
        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => onChangeStatus(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded bg-white dark:bg-gray-800 text-primary-light text-sm"
        >
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interviewed">Interviewed</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </select>
      </div>

      <div className="mt-2 text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        Status: {status}
      </div>
    </div>
  );
}
