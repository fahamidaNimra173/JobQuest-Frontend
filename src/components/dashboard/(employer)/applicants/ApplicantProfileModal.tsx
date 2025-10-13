import React, { useState } from 'react';
import ResumeViewer from './ResumeViewer';
import { FaTimes } from 'react-icons/fa';
import { Candidate } from '@/types';

export default function ApplicantProfileModal({
  candidate,
  onClose,
  onSaveNotes,
}: {
  candidate: Candidate;
  onClose: () => void;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
}) {
  const [notes, setNotes] = useState('');
  console.log('profile modal',candidate)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-4xl bg-white dark:bg-[#111827] rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full dark:bg-primary-dark hover:bg-gray-100 dark:hover:bg-gray-100"
        >
          <FaTimes />
        </button>

        <div className="flex gap-4">
          <img
            src={candidate.profileImage || '/default-avatar.png'}
            alt={candidate.name}
            className="h-28 w-28 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-primary-dark">{candidate.name}</h2>
            <p className="text-sm text-primary-medium">{candidate.bio || candidate.role}</p>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Email: {candidate.email}
              <br />
              Phone: {candidate.phone || 'N/A'}
            </div>
            <div className="mt-2">
              {candidate.skills.map((s) => (
                <span
                  key={s}
                  className="inline-block mr-2 mb-2 px-2 py-1 rounded-full bg-primary-lightest text-primary-dark text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-primary-dark">Experience</h3>
            {candidate.experience.length > 0 ? (
              <ul className="text-sm list-disc ml-4 dark:text-gray-100 ">
                {candidate.experience.map((exp, i) => (
                  <li key={i}>
                    {exp.position} @ {exp.company} ({exp.startDate ? new Date(exp.startDate).getFullYear() : '?'} -{' '}
                    {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-100 ">No experience provided.</p>
            )}

            <h3 className="font-semibold mt-4 text-primary-dark ">Education</h3>
            {candidate.education.length > 0 ? (
              <ul className="text-sm list-disc ml-4 dark:text-gray-100 ">
                {candidate.education.map((edu, i) => (
                  <li key={i}>
                    {edu.degree} @ {edu.institution} ({edu.startDate ? new Date(edu.startDate).getFullYear() : '?'} -{' '}
                    {edu.endDate ? new Date(edu.endDate).getFullYear() : '?'})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-100 ">No education info.</p>
            )}

            <h3 className="font-semibold mt-4 text-primary-dark">Bio</h3>
            <div className="mt-2 p-3 border border-primary-light rounded-md bg-transparent text-sm whitespace-pre-wrap dark:text-gray-100 ">
              {candidate.bio || 'No bio provided.'}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-primary-dark">Resume</h3>
            <div className="mt-2">
              {candidate.resume ? (
                <ResumeViewer url={candidate.resume} />
              ) : (
                <div className="text-sm text-gray-500">Resume not uploaded.</div>
              )}
            </div>

            <h3 className="font-semibold mt-4 text-primary-dark">Employer Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-primary-light rounded-md bg-transparent min-h-[120px] resize-y dark:text-gray-100"
            />

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => onSaveNotes(candidate._id, notes)}
                className="px-3 py-2 bg-primary-medium text-white rounded"
              >
                Save Notes
              </button>
              <button onClick={onClose} className="px-3 py-2 border rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}