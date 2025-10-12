import React from 'react';

const JobDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-2 transition-all bg-white dark:bg-[#1f2937] animate-pulse">
      {/* HEADER */}
      <div className="border-b border-gray-300 p-6 bg-white dark:bg-[#1f2937]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-2 w-full md:w-2/3">
            <div className="h-8 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-5 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-2 grid md:grid-cols-3 gap-4">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6 border-r border-gray-300 pr-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <section
              key={idx}
              className="rounded-xl p-6 bg-white dark:bg-[#1f2937] space-y-3"
            >
              <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"
                  ></div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <section
              key={idx}
              className="rounded-xl p-6 bg-white dark:bg-[#1f2937] space-y-3"
            >
              <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"
                  ></div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailSkeleton;
