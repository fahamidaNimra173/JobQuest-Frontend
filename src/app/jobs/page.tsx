import { Search, MapPin, Briefcase, Calendar, Tag, Filter } from 'lucide-react';
import AllJobs from '../component/AllJobs';


export default async function BrowseJobsPage() {
  // const jobs = await getAllJobs();

  return (
    <div className="min-h-screen ">
      {/* Banner Section */}
      <div
        className="relative h-72 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/0ydgHJZP/job-search.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#7670d6]/80"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 pt-20">Browse All Jobs</h1>
            <p className="text-lg md:text-xl">Find your perfect opportunity from  available positions</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Fixed on large screens */}
          <aside className="lg:w-80 lg:sticky lg:top-20 lg:self-start">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                <button className="text-sm text-[#7670d6] hover:underline font-medium">
                  Clear All
                </button>
              </div>

              {/* Search by Title */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Search size={16} />
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7670d6] text-gray-900"
                />
              </div>

              {/* Filter by Location */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  Location
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7670d6] text-gray-900">
                  <option value="">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="new-york">New York</option>
                  <option value="london">London</option>
                  <option value="san-francisco">San Francisco</option>
                  <option value="berlin">Berlin</option>
                </select>
              </div>

              {/* Filter by Work Arrangement */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Briefcase size={16} />
                  Work Arrangement
                </label>
                <div className="space-y-2">
                  {['Remote', 'Hybrid', 'Onsite'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-white text-[#7670d6] border-gray-300 rounded focus:ring-[#7670d6]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Job Type */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Briefcase size={16} />
                  Job Type
                </label>
                <div className="space-y-2">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-white dark:bg-white text-[#7670d6] border-gray-100 rounded focus:ring-[#7670d6]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Date Posted */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar size={16} />
                  Date Posted
                </label>
                <div className="space-y-2">
                  {['Last 24 hours', 'Last 3 days', 'Last week', 'Last month'].map((period) => (
                    <label key={period} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="date"
                        className="w-4 h-4 text-[#7670d6] border-gray-300 focus:ring-[#7670d6]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{period}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Category */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Tag size={16} />
                  Category
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7670d6] text-gray-900">
                  <option value="">All Categories</option>
                  <option value="technology">Technology</option>
                  <option value="marketing">Marketing</option>
                  <option value="design">Design</option>
                  <option value="sales">Sales</option>
                  <option value="finance">Finance</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              {/* Apply Filters Button */}
              <button className="w-full bg-[#7670d6] text-white py-3 rounded-lg font-semibold hover:bg-[#6660c6] transition-colors">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Job Cards Section - Scrollable */}
          <main className="flex-1">
            <AllJobs></AllJobs>


            {/* {jobs.length > 0 ? (
              <div className="grid grid-cols-1  gap-6">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
              </div>
            )} */}
          </main>
        </div>
      </div>
    </div>
  );
}