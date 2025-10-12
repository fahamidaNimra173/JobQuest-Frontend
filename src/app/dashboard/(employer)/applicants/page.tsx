'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ApplicantProfileModal from '@/app/dashboard/(employer)/components/applicants/ApplicantProfileModal';
import SkeletonCard from '@/app/dashboard/(employer)/components/SkeletonCard';
import CandidateCard from '@/app/dashboard/(employer)/components/applicants/CandidateCard';

interface Applicant {
    _id: string;
    name: string;
    photo?: string;
    position: string;
    appliedAt: string;
    status: 'applied' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
    resumeUrl?: string;
    skills?: string[];
    experienceYears?: number;
    education?: string;
    coverLetter?: string;
    notes?: string;
}

interface JobResponse {
    applicants: Applicant[];
}

interface AppliedCandidate {
    _id: string;
    status: 'applied' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
}
interface CandidateResponse {
    applicants: AppliedCandidate[];
}

export default function JobApplicantsPage() {
    const API = process.env.NEXT_PUBLIC_JOB_URL;
    const CANDIDATE_API = process.env.NEXT_PUBLIC_APPLICANT_URL;
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId');
    //const [newStatus, setNewStatus] = useState<String>('applied')
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [appliedCandidates, setAppliedCandidates] = useState<AppliedCandidate[]>([]);
    const [activeApplicant, setActiveApplicant] = useState<Applicant | null>(null);


    useEffect(() => {
        if (!jobId) return;

        const fetchApplicants = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API}/${jobId}`, { cache: 'no-store' });
                const data: CandidateResponse = await res.json();
                setAppliedCandidates(data.applicants);
                const candidateIds = data.applicants.map(c => c._id).join(',');
                if (candidateIds.length === 0) {
                    setAppliedCandidates([]);
                    return;
                }

                const candidatesRes = await fetch(`${CANDIDATE_API}/applied?ids=${candidateIds}`);
                const candidatesData = await candidatesRes.json();
                setApplicants(candidatesData.candidates || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId, API]);

    const handleSaveNotes = async (id, notes) => {
        // try {
        //   // Call your API to save notes for this candidate
        //   await fetch(`/api/candidates/${id}/notes`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ notes }),
        //   });
        //   alert('Notes saved!');
        // } catch (err) {
        //   console.error(err);
        //   alert('Failed to save notes.');
        // }
        console.log(id, notes)
    };
    const changeStatus = async (applicantId: string, newStatus: string) => {
        console.log(applicantId, newStatus);
        try {
            // 1️⃣ Update UI instantly (optimistic update)
            setAppliedCandidates((prev) =>
                prev.map((app) =>
                    app._id === applicantId ? { ...app, status: newStatus } : app
                )
            );

            // 2️⃣ Send update to backend
            const res = await fetch(`${API}/${jobId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ applicantId, status: newStatus }),
            });

            if (!res.ok) {
                throw new Error('Failed to update in DB');
            }

            const updatedJob = await res.json();
            console.log('Updated job:', updatedJob);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };



    console.log('applied candidates: ', appliedCandidates, 'applicants: ', applicants);
    return (
        <section className="p-6">
            <h1 className="text-2xl font-bold text-primary-dark mb-4">
                Applicants for Job
            </h1>

            {loading ? (
                <SkeletonCard count={6} />
            ) : appliedCandidates.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">No applicants found.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {applicants.map((candidate) => {
                        // find the corresponding appliedCandidate object to get status
                        const applied = appliedCandidates.find(ac => ac._id === candidate._id);
                        const status = applied?.status || 'New';

                        return (
                            <CandidateCard
                                key={candidate._id}
                                candidate={candidate}
                                status={status}
                                onView={() => setActiveApplicant(candidate)}
                                onChangeStatus={(newStatus: String) => changeStatus(candidate._id, newStatus)}
                            />
                        );
                    })}

                </div>
            )}

            {/* Applicant Modal */}
            {activeApplicant && (
                <ApplicantProfileModal
                    candidate={activeApplicant}
                    onClose={() => setActiveApplicant(null)} // close modal
                    onSaveNotes={handleSaveNotes}
                />
            )}

        </section>
    );
}
