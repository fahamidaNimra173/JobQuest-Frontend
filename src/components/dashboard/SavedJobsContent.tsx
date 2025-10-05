'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Briefcase,
  Eye,
  ExternalLink,
  Search,
  Filter,
  Trash2,
  Send
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface SavedJob {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: string;
  jobType: string;
  savedDate: string;
  postedDate: string;
  logo: string | null;
  description: string;
  requirements: string[];
  benefits: string[];
}

interface SavedJobsContentProps {
  savedJobs: SavedJob[];
}

export default function SavedJobsContent({ savedJobs }: SavedJobsContentProps) {
  const [jobs, setJobs] = useState(savedJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState<SavedJob | null>(null);

  // Breadcrumb items for saved jobs
  const breadcrumbItems = [
    { name: 'Saved Jobs', href: '/dashboard/saved-jobs', current: true }
  ];

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Freelance'];

  const removeFromSaved = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || job.jobType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="text-gray-600">Keep track of interesting job opportunities</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Saved</p>
              <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
            </div>
            <Heart className="w-8 h-8 text-primary-dark" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Full-time Jobs</p>
              <p className="text-3xl font-bold text-gray-900">
                {jobs.filter(job => job.jobType === 'Full-time').length}
              </p>
            </div>
            <Briefcase className="w-8 h-8 text-primary-medium" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remote Jobs</p>
              <p className="text-3xl font-bold text-gray-900">
                {jobs.filter(job => job.location.toLowerCase().includes('remote')).length}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-primary-medium" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search saved jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No saved jobs found. Start saving jobs to see them here!</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{job.position}</h3>
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
                                <Calendar className="w-4 h-4 mr-1" />
                                Saved {new Date(job.savedDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                              {job.jobType}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="flex items-center px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </button>
                          <button className="flex items-center px-3 py-1 text-green-600 hover:bg-green-50 rounded text-sm transition-colors">
                            <Send className="w-4 h-4 mr-1" />
                            Apply Now
                          </button>
                          <button
                            onClick={() => removeFromSaved(job.id)}
                            className="flex items-center px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setSelectedJob(null)} />
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedJob.position}</h3>
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
                <div className="grid grid-cols-2 gap-4 text-sm">
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
                  <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedJob.description}</p>
                </div>
                
                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                  <ul className="space-y-1">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button className="flex-1 px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors">
                    Apply Now
                  </button>
                  <button
                    onClick={() => removeFromSaved(selectedJob.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove from Saved
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