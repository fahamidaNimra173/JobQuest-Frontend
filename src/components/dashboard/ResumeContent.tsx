'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Edit3, 
  Plus, 
  Eye,
  X,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Code,
  Wrench,
  Upload,
  File,
  Trash2
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useToast } from '@/components/ui/Toast';
import apiClient from '@/lib/api';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    portfolio: string;
    linkedin: string;
  };
  summary: string;
  experience: Array<{
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    location: string;
    achievements: string[];
  }>;
  education: Array<{
    id: number;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    achievements?: string[];
  }>;
  skills: {
    technical: string[];
    frameworks: string[];
    tools: string[];
  };
  projects: Array<{
    id: number;
    name: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
}

interface UploadedResume {
  id: string;
  filename: string;
  originalName: string;
  uploadDate: string;
  fileSize: string;
  fileUrl: string;
}

interface ResumeContentProps {
  resumeData: ResumeData;
}

export default function ResumeContent({ resumeData }: ResumeContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadedResumes, setUploadedResumes] = useState<UploadedResume[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // Breadcrumb items for resume
  const breadcrumbItems = [
    { name: 'My Resume', href: '/dashboard/resume', current: true }
  ];

  // Load uploaded resumes on component mount
  useEffect(() => {
    const fetchUploadedResumes = async () => {
      try {
        const response = await apiClient.getUploadedResumes();
        if (response.success && Array.isArray(response.data)) {
          const resumes = (response.data as unknown[]).map((resume: unknown) => {
            const r = resume as Record<string, unknown>;
            return {
              id: r.id as string || '',
              filename: r.filename as string || '',
              originalName: r.originalName as string || '',
              uploadDate: r.uploadDate as string || '',
              fileSize: r.fileSize as string || '',
              fileUrl: r.fileUrl as string || ''
            };
          });
          setUploadedResumes(resumes);
        }
      } catch (error) {
        console.error('Failed to fetch uploaded resumes:', error);
        // Don't show error toast on component mount to avoid annoying users
      }
    };

    fetchUploadedResumes();
  }, []);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      showToast('error', 'Invalid file type', 'Please upload a PDF or Word document.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'File too large', 'Please upload a file smaller than 5MB.');
      return;
    }

    setIsUploading(true);

    try {
      // Upload file to backend
      const response = await apiClient.uploadResumeFile(file);
      
      if (response.success) {
        const uploadData = response.data as { id?: string; filename?: string; url?: string };
        const newResume: UploadedResume = {
          id: uploadData.id || Date.now().toString(),
          filename: uploadData.filename || file.name,
          originalName: file.name,
          uploadDate: new Date().toISOString(),
          fileSize: formatFileSize(file.size),
          fileUrl: uploadData.url || ''
        };
        
        setUploadedResumes(prev => [newResume, ...prev]);
        showToast('success', 'Resume uploaded successfully!', 'Your resume has been saved.');
        
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast('error', 'Upload failed', 'Please try again or contact support.');
    } finally {
      setIsUploading(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Delete uploaded resume
  const handleDeleteResume = async (resume: UploadedResume) => {
    try {
      await apiClient.deleteResumeFile(resume.id);
      
      setUploadedResumes(prev => prev.filter(r => r.id !== resume.id));
      showToast('success', 'Resume deleted', 'Resume has been removed successfully.');
    } catch (error) {
      console.error('Delete error:', error);
      showToast('error', 'Delete failed', 'Please try again.');
    }
  };

  // Download resume
  const handleDownloadResume = (resume: UploadedResume) => {
    // In real app, this would download from the stored URL
    showToast('info', 'Download started', `Downloading ${resume.originalName}`);
    // window.open(resume.fileUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Resume</h1>
          <p className="text-gray-600">Create and manage your professional resume</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Resume'}
          </button>
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Upload Resume</h2>
          <p className="text-sm text-gray-600 mt-1">Upload your resume file (PDF or Word document, max 5MB)</p>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-dark transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-gray-600">Drag and drop your resume here, or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Choose File'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
          </div>
        </div>
      </div>

      {/* Uploaded Resumes */}
      {uploadedResumes.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Uploaded Resumes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {uploadedResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                      <File className="w-5 h-5 text-primary-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{resume.originalName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Size: {resume.fileSize}</span>
                        <span>Uploaded: {new Date(resume.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownloadResume(resume)}
                      className="p-2 text-gray-400 hover:text-primary-dark transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResume(resume)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900">{resumeData.personalInfo.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{resumeData.personalInfo.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{resumeData.personalInfo.phone}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-gray-900">{resumeData.personalInfo.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                <a href={resumeData.personalInfo.portfolio} className="text-blue-600 hover:underline">
                  {resumeData.personalInfo.portfolio}
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <a href={resumeData.personalInfo.linkedin} className="text-blue-600 hover:underline">
                  {resumeData.personalInfo.linkedin}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
          <button className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </button>
        </div>
        <div className="p-6 space-y-6">
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-primary-dark font-medium">{exp.company}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="text-gray-400 hover:text-gray-600 ml-4">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          <button className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </button>
        </div>
        <div className="p-6 space-y-6">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="border-l-4 border-green-500 pl-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-primary-medium font-medium">{edu.institution}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                  {edu.achievements && (
                    <ul className="mt-2 space-y-1">
                      {edu.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
          <button className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Add Skill
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center mb-3">
              <Code className="w-5 h-5 text-primary-dark mr-2" />
              <h3 className="font-medium text-gray-900">Technical Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.technical.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-primary-light text-primary-dark text-sm font-medium rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 text-primary-dark mr-2" />
              <h3 className="font-medium text-gray-900">Frameworks & Libraries</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.frameworks.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-primary-light text-primary-dark text-sm font-medium rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <Wrench className="w-5 h-5 text-primary-dark mr-2" />
              <h3 className="font-medium text-gray-900">Tools & Technologies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.tools.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-primary-light text-primary-dark text-sm font-medium rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
          <button className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Add Project
          </button>
        </div>
        <div className="p-6 space-y-6">
          {resumeData.projects.map((project) => (
            <div key={project.id} className="border-l-4 border-yellow-500 pl-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <a href={project.link} className="text-primary-dark hover:text-primary-medium">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-lightest text-primary-dark text-xs font-medium rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 ml-4">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowPreview(false)} />
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Resume Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg max-h-96 overflow-y-auto">
                <div className="bg-white p-8 shadow-sm">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{resumeData.personalInfo.name}</h1>
                    <p className="text-gray-600">{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
                    <p className="text-gray-600">{resumeData.personalInfo.location}</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">Professional Summary</h2>
                      <p className="text-sm text-gray-700">{resumeData.summary}</p>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">Experience</h2>
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="mb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">{exp.position}</h3>
                              <p className="text-gray-700">{exp.company} | {exp.location}</p>
                            </div>
                            <p className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                          </div>
                          <ul className="mt-2 space-y-1">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index} className="text-xs text-gray-700">• {achievement}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}