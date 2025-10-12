"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Edit3,
  Save,
  X,
  Plus,
  Calendar,
  Award,
  Linkedin,
  Github,
  Link as LinkIcon,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useToast } from "@/components/ui/Toast";
import apiClient from "@/lib/api";
import { Candidate, SocialLinks, Education, Experience } from "@/types";

interface ProfileFormData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  socialLinks?: SocialLinks;
}

export default function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [candidateData, setCandidateData] = useState<Candidate | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    socialLinks: {
      linkedin: "",
      github: "",
      portfolio: ""
    }
  });
  const { showToast } = useToast();

  // Fetch candidate profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getCandidateProfile();
        if (response.success) {
          const candidate = response.data as Candidate;
          setCandidateData(candidate);
          
          // Parse name into first and last name for form
          const nameParts = candidate.name.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";
          
          setFormData({
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone || "",
            address: candidate.address || "",
            bio: candidate.bio || "",
            socialLinks: candidate.socialLinks || {
              linkedin: "",
              github: "",
              portfolio: ""
            }
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        showToast("error", "Error", "Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Breadcrumb items for profile page
  const breadcrumbItems = [
    { name: "My Profile", href: "/dashboard/profile", current: true },
  ];

  const handleSave = async () => {
    try {
      // Convert formData to a plain object that can be sent to the API
      const profileData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
        socialLinks: formData.socialLinks
      };
      
      const response = await apiClient.updateCandidateProfile(profileData);
      if (response.success) {
        const updatedCandidate = response.data as Candidate;
        setCandidateData(updatedCandidate);
        showToast(
          "success",
          "Profile Saved",
          "Your profile has been updated successfully!"
        );
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast("error", "Error", "Failed to save profile data");
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (candidateData) {
      setFormData({
        name: candidateData.name,
        email: candidateData.email,
        phone: candidateData.phone || "",
        address: candidateData.address || "",
        bio: candidateData.bio || "",
        socialLinks: candidateData.socialLinks || {
          linkedin: "",
          github: "",
          portfolio: ""
        }
      });
    }
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel();
    } else {
      setIsEditing(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  if (!candidateData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-center text-gray-500">No profile data available</p>
      </div>
    );
  }

  // Parse name for display
  const nameParts = formData.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your personal information and professional details
          </p>
        </div>
        <button
          onClick={handleEditToggle}
          type="button"
          className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h2>
        </div>
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks?.linkedin || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          linkedin: e.target.value
                        }
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks?.github || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          github: e.target.value
                        }
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks?.portfolio || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          portfolio: e.target.value
                        }
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  type="button"
                  className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{formData.phone || "Not provided"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{formData.address || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 text-gray-400 flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Role</p>
                      <p className="font-medium capitalize">{candidateData.role}</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-2">Bio</p>
                  <p className="text-gray-900">{formData.bio || "No bio provided"}</p>
                </div>
              </div>
              
              {/* Social Links */}
              {(formData.socialLinks?.linkedin || formData.socialLinks?.github || formData.socialLinks?.portfolio) && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Social Links</h3>
                  <div className="flex flex-wrap gap-4">
                    {formData.socialLinks?.linkedin && (
                      <a 
                        href={formData.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-dark hover:underline"
                      >
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    )}
                    {formData.socialLinks?.github && (
                      <a 
                        href={formData.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-dark hover:underline"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        GitHub
                      </a>
                    )}
                    {formData.socialLinks?.portfolio && (
                      <a 
                        href={formData.socialLinks.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-dark hover:underline"
                      >
                        <LinkIcon className="w-4 h-4 mr-1" />
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Work Experience
          </h2>
          <button className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </button>
        </div>
        <div className="p-6 space-y-6">
          {candidateData.experience && candidateData.experience.length > 0 ? (
            candidateData.experience.map((exp) => (
              <div key={exp._id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-primary-dark font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(exp.startDate).toLocaleDateString()} - {exp.isCurrentlyWorking ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ""}
                    </p>
                    {exp.responsibilities && (
                      <p className="text-gray-700 mt-2">{exp.responsibilities}</p>
                    )}
                  </div>
                  {isEditing && (
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              {isEditing ? "Add your work experience" : "No work experience added yet"}
            </p>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Education
          </h2>
          <button className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </button>
        </div>
        <div className="p-6 space-y-6">
          {candidateData.education && candidateData.education.length > 0 ? (
            candidateData.education.map((edu) => (
              <div key={edu._id} className="border-l-4 border-green-500 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-primary-medium font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : ""}
                    </p>
                    {edu.fieldOfStudy && (
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Award className="w-4 h-4 mr-1" />
                        {edu.fieldOfStudy}
                      </p>
                    )}
                  </div>
                  {isEditing && (
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              {isEditing ? "Add your education details" : "No education details added yet"}
            </p>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
          <button className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Add Skill
          </button>
        </div>
        <div className="p-6">
          {candidateData.skills && candidateData.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {candidateData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-light text-primary-dark text-sm font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              {isEditing ? "Add your skills" : "No skills added yet"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}