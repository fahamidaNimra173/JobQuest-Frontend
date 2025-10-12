// components/ui/SkeletonCard.tsx
import React from "react";

interface SkeletonCardProps {
  count?: number; // number of skeleton cards to render
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm"
        >
          {/* Image placeholder */}
          <div className="h-40 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />

          {/* Title */}
          <div className="mt-4 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

          {/* Subtitle */}
          <div className="mt-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />

          {/* Tags or buttons */}
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;