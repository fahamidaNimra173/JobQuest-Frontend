"use client";

import React, { useState, useRef, useEffect } from "react";
import { Download, Eye, Upload, FileText, Trash2 } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useToast } from "@/components/ui/Toast";
import axios from "axios";
import Cookies from "js-cookie";

interface UploadedResume {
  _id: string;
  filename: string;
  originalName: string;
  uploadDate: string;
  length: number;
  contentType: string;
}

const API_BASE_URL = "https://job-quest-i2wm.onrender.com";

interface ResumeContentProps {
  resumeData?: unknown;
}

export default function ResumeContent({ resumeData }: ResumeContentProps) {
  const [uploadedResumes, setUploadedResumes] = useState<UploadedResume[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const breadcrumbItems = [
    { name: "My Resume", href: "/dashboard/resume", current: true },
  ];

  // Create axios instance with auth token
  const createAxiosInstance = () => {
    return axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
    });
  };

  // ===== Fetch Uploaded Files =====
  const fetchUploadedResumes = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const res = await axiosInstance.get("/resume");
      const files = res.data.success ? res.data.data : res.data;
      setUploadedResumes(files);
    } catch (error) {
      console.error("Fetch error:", error);
      showToast("error", "Failed to load resumes", "Please try again later.");
    }
  };

  useEffect(() => {
    fetchUploadedResumes();
  }, []);

  // ===== File Upload =====
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      showToast(
        "error",
        "Invalid file type",
        "Please upload PDF or Word documents only."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast(
        "error",
        "File too large",
        "Please upload a file smaller than 5MB."
      );
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.data);
      showToast(
        "success",
        "Upload successful",
        "Your resume has been uploaded."
      );
      fetchUploadedResumes();
    } catch (error: any) {
      console.error("Upload error:", error);
      const errorMessage = error.response?.data?.message || "Upload failed";
      showToast("error", "Upload failed", errorMessage);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ===== File Delete =====
  const handleDeleteResume = async (id: string) => {
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.delete(`/resume/${id}`);
      setUploadedResumes((prev) => prev.filter((r) => r._id !== id));
      showToast("success", "Deleted", "Resume removed successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      showToast("error", "Delete failed", "Please try again.");
    }
  };

  // ===== File View =====
  const handleViewPDF = (id: string) => {
    const token = Cookies.get("authToken");
    window.open(`${API_BASE_URL}/resume/view/${id}?token=${token}`, "_blank");
  };

  // ===== File Download =====
  const handleDownloadResume = (id: string, filename: string) => {
    const token = Cookies.get("authToken");
    const link = document.createElement("a");
    link.href = `${API_BASE_URL}/resume/download/${id}?token=${token}`;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("success", "Download started", `Downloading ${filename}`);
  };

  // ===== File Size Formatter =====
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Upload Resume</h2>
          <p className="text-sm text-gray-600 mt-1">
            Upload your resume file (PDF or Word document, max 5MB)
          </p>
        </div>
        <div className="p-6">
          <div className="text-center border-dashed border-2 border-gray-300 rounded-lg p-8">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your resume or click below
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center px-4 py-2 bg-[#7670d6] text-white rounded-lg hover:bg-[#6659c4] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Choose File"}
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
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Uploaded Resumes
          </h2>
        </div>
        <div className="p-6">
          {uploadedResumes.length > 0 ? (
            <div className="space-y-4">
              {uploadedResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {resume.filename}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{formatFileSize(resume.length)}</span>
                        <span>
                          Uploaded:{" "}
                          {new Date(resume.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewPDF(resume._id)}
                      className="flex items-center px-3 py-2 text-[#7670d6] border border-[#7670d6] rounded-lg hover:bg-[#7670d6] hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" /> View
                    </button>
                    <button
                      onClick={() =>
                        handleDownloadResume(resume._id, resume.filename)
                      }
                      className="flex items-center px-3 py-2 bg-[#7670d6] text-white rounded-lg hover:bg-[#6659c4] transition-colors"
                    >
                      <Download className="w-4 h-4 mr-1" /> Download
                    </button>
                    <button
                      onClick={() => handleDeleteResume(resume._id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No resumes uploaded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
