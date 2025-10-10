'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Eye,
  Upload,
  FileText,
  Trash2
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useToast } from '@/components/ui/Toast';
import apiClient from '@/lib/api';

interface UploadedResume {
  id: string;
  filename: string;
  originalName: string;
  uploadDate: string;
  fileSize: string;
  fileUrl: string;
}

interface ResumeContentProps {
  resumeData?: unknown;
}

export default function ResumeContent({ resumeData }: ResumeContentProps) {
  const [uploadedResumes, setUploadedResumes] = useState<UploadedResume[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const breadcrumbItems = [
    { name: 'My Resume', href: '/dashboard/resume', current: true }
  ];

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
      }
    };

    fetchUploadedResumes();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      showToast('error', 'Invalid file type', 'Please upload a PDF or Word document.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'File too large', 'Please upload a file smaller than 5MB.');
      return;
    }

    setIsUploading(true);

    try {
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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

  const handleViewPDF = (resume: UploadedResume) => {
    if (resume.fileUrl) {
      window.open(resume.fileUrl, '_blank');
    } else {
      showToast('error', 'Unable to view', 'Resume file URL not available.');
    }
  };

  const handleDownloadResume = (resume: UploadedResume) => {
    if (resume.fileUrl) {
      const link = document.createElement('a');
      link.href = resume.fileUrl;
      link.download = resume.originalName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('success', 'Download started', `Downloading ${resume.originalName}`);
    } else {
      showToast('error', 'Unable to download', 'Resume file URL not available.');
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Resume</h1>
          <p className="text-gray-600">Upload and manage your resume</p>
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Upload Resume</h2>
          <p className="text-sm text-gray-600 mt-1">Upload your resume file (PDF or Word document, max 5MB)</p>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-gray-600">Drag and drop your resume here, or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center px-4 py-2 bg-[#7670d6] text-white rounded-lg hover:bg-[#6659c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Uploaded Resumes Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">My Resume</h2>
        </div>
        <div className="p-6">
          {uploadedResumes.length > 0 ? (
            <div className="space-y-4">
              {uploadedResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
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
                      onClick={() => handleViewPDF(resume)}
                      className="flex items-center px-3 py-2 text-[#7670d6] border border-[#7670d6] rounded-lg hover:bg-[#7670d6] hover:text-white transition-colors"
                      title="View PDF"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownloadResume(resume)}
                      className="flex items-center px-3 py-2 bg-[#7670d6] text-white rounded-lg hover:bg-[#6659c4] transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
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
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Resume Found</h3>
              <p className="text-gray-600 mb-4">Upload your resume to see it here</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 bg-[#7670d6] text-white rounded-lg hover:bg-[#6659c4] transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
