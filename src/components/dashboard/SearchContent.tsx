'use client';

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Heart,
  Filter,
  Star,
  Building,
  Clock,
  ExternalLink
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useToast } from '@/components/ui/Toast';

interface Job {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: string;
  jobType: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  logo: string | null;
  featured: boolean;
}

export default function SearchContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { showToast } = useToast();

  // Breadcrumb items for search page
  const breadcrumbItems = [
    { name: 'Job Search', href: '/dashboard/search', current: true }
  ];

  // Mock job data - this should come from API
  const jobs: Job[] = [
    {
      id: 1,
      company: 'TechCorp Inc.',
      position: 'Senior Frontend Developer',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      jobType: 'Full-time',
      postedDate: '2024-01-15',
      description: 'We are looking for an experienced frontend developer to join our growing team and help build amazing user experiences.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Strong CSS skills'],
      benefits: ['Health insurance', '401k matching', 'Flexible working hours'],
      logo: null,
      featured: true
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      salary: '$100,000 - $130,000',
      jobType: 'Full-time',
      postedDate: '2024-01-14',
      description: 'Join our innovative startup building the next generation of web applications with cutting-edge technologies.',
      requirements: ['React and Node.js experience', 'Database design skills', 'Agile methodology'],
      benefits: ['Equity package', 'Unlimited PTO', 'Learning budget'],
      logo: null,
      featured: false
    },
    {
      id: 3,
      company: 'RemoteFirst Co.',
      position: 'React Developer',
      location: 'Remote',
      salary: '$80,000 - $100,000',
      jobType: 'Contract',
      postedDate: '2024-01-12',
      description: 'Remote opportunity for a skilled React developer to work on exciting projects with a distributed team.',
      requirements: ['3+ years React experience', 'Remote work experience', 'Self-motivated'],
      benefits: ['100% remote', 'Flexible schedule', 'Project bonuses'],
      logo: null,
      featured: false
    },
    {
      id: 4,
      company: 'Enterprise Solutions',
      position: 'Frontend Engineer',
      location: 'Austin, TX',
      salary: '$85,000 - $110,000',
      jobType: 'Full-time',
      postedDate: '2024-01-10',
      description: 'Build enterprise-grade applications with modern frontend technologies in a collaborative environment.',
      requirements: ['JavaScript/TypeScript', 'React or Vue.js', 'Enterprise application experience'],
      benefits: ['Comprehensive health coverage', 'Professional development', 'Stock options'],
      logo: null,
      featured: true
    }
  ];

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Freelance'];
  const salaryRanges = ['All', '$50k-$75k', '$75k-$100k', '$100k-$150k', '$150k+'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = jobTypeFilter === 'All' || job.jobType === jobTypeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleSaveJob = (jobId: number) => {
    // This should make API call to save job
    console.log('Saving job:', jobId);
    showToast('success', 'Job Saved', `Job ${jobId} saved successfully!`);
  };

  const handleApplyJob = (jobId: number) => {
    // This should navigate to application flow
    console.log('Applying to job:', jobId);
    showToast('success', 'Application Sent', `Applied to job ${jobId} successfully!`);
  };

  const handleSearch = () => {
    console.log('Searching with:', { searchTerm, locationFilter, jobTypeFilter, salaryFilter });
    // This should trigger API call with search parameters
    showToast('info', 'Search Started', `Searching for: ${searchTerm || 'all jobs'} in ${locationFilter || 'all locations'}`);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Job Search</h1>
        <p className="text-gray-600 dark:text-gray-300">Discover your next career opportunity</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border p-6">
        <div className="space-y-4">
          {/* Main Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Job title, company, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent text-lg placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent text-lg placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <select
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {salaryRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button 
              onClick={handleSearch}
              type="button"
              className="w-full md:w-auto px-8 py-3 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors font-medium"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs matching your criteria
        </p>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent" style={{'--tw-ring-color': '#7670d6'} as React.CSSProperties}>
          <option>Most Recent</option>
          <option>Salary: High to Low</option>
          <option>Salary: Low to High</option>
          <option>Most Relevant</option>
        </select>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg border p-8 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No jobs found matching your criteria. Try adjusting your search.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className={`bg-white rounded-lg border p-6 hover:shadow-md transition-shadow ${job.featured ? 'border-blue-200 bg-blue-50' : ''}`}>
              {job.featured && (
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">Featured</span>
                </div>
              )}
              
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{job.position}</h3>
                        <p className="text-primary-dark font-medium">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Posted {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                          {job.jobType}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        style={{color: '#7670d6', borderColor: '#7670d6'}}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleApplyJob(job.id)}
                        className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                        style={{backgroundColor: '#7670d6'}}
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={() => handleSaveJob(job.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setSelectedJob(null)} />
            <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedJob.position}</h3>
                  <p className="text-blue-600 font-medium text-lg">{selectedJob.company}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="w-6 h-6 transform rotate-45" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Job Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedJob.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salary:</span>
                      <span className="font-medium">{selectedJob.salary}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedJob.jobType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posted:</span>
                      <span className="font-medium">{new Date(selectedJob.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Job Description</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                </div>
                
                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3 pt-6 border-t">
                  <button
                    onClick={() => handleApplyJob(selectedJob.id)}
                    className="flex-1 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors font-medium"
                    style={{backgroundColor: '#7670d6'}}
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleSaveJob(selectedJob.id)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}