'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ApplicantProfileModal from '@/components/dashboard/(employer)/applicants/ApplicantProfileModal';
import SkeletonCard from '@/components/dashboard/(employer)/SkeletonCard';
import ApplicantsContent from './ApplicantsContent';

export default function JobApplicantsPage() {
    return (
        <Suspense fallback={<SkeletonCard count={6} />}>
            <ApplicantsContent />
        </Suspense>
    );
}