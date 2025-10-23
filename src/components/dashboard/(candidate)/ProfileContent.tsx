"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Trash2,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useToast } from "@/components/ui/Toast";
import { Candidate, SocialLinks, Education, Experience } from "@/types";
import axiosInstance from "@/lib/axios";

interface ProfileFormData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  socialLinks?: SocialLinks;
}

interface ExperienceFormData {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrentlyWorking: boolean;
  responsibilities?: string;
}

interface EducationFormData {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  isCurrentlyStudying: boolean;
}

export default function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    socialLinks: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
  });

  // Modal states
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<
    number | null
  >(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState<
    number | null
  >(null);

  // Form states
  const [experienceForm, setExperienceForm] = useState<ExperienceFormData>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrentlyWorking: false,
    responsibilities: "",
  });

  const [educationForm, setEducationForm] = useState<EducationFormData>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    isCurrentlyStudying: false,
  });

  const [skillsInput, setSkillsInput] = useState("");

  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Fetch candidate profile using TanStack Query
  const { data: candidateData, isLoading } = useQuery({
    queryKey: ["candidateProfile"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "https://job-quest-i2wm.onrender.com/users/candidate/me"
      );

      let candidate;
      if (response.data.success && response.data.data) {
        candidate = response.data.data;
      } else if (response.data && response.data._id) {
        candidate = response.data;
      } else {
        candidate = response.data;
      }

      return candidate as Candidate;
    },
  });

  // Update form data when candidate data is loaded
  useEffect(() => {
    if (candidateData) {
      setFormData({
        name: candidateData.name || "",
        email: candidateData.email || "",
        phone: candidateData.phone || "",
        address: candidateData.address || "",
        bio: candidateData.bio || "",
        socialLinks: candidateData.socialLinks || {
          linkedin: "",
          github: "",
          portfolio: "",
        },
      });
    }
  }, [candidateData]);

  // Mutation for updating candidate profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: Partial<Candidate>) => {
      const response = await axiosInstance.patch(
        "https://job-quest-i2wm.onrender.com/users/candidate",
        updatedData
      );

      if (response.data.success) {
        return response.data;
      }
      throw new Error("Unexpected save response structure");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidateProfile"] });
    },
  });

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "My Profile", href: "/dashboard/profile", current: true },
  ];

  // Experience Functions
  const handleAddExperience = () => {
    setEditingExperienceIndex(null);
    setExperienceForm({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false,
      responsibilities: "",
    });
    setShowExperienceModal(true);
  };

  const handleEditExperience = (experience: Experience, index: number) => {
    setEditingExperienceIndex(index);
    setExperienceForm({
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate.split("T")[0],
      endDate:
        experience.endDate && experience.endDate !== "ongoing"
          ? experience.endDate.split("T")[0]
          : "",
      isCurrentlyWorking: experience.isCurrentlyWorking || false,
      responsibilities: experience.responsibilities || "",
    });
    setShowExperienceModal(true);
  };

  const handleSaveExperience = async () => {
    if (!candidateData) return;

    try {
      const newExperience: Experience = {
        company: experienceForm.company,
        position: experienceForm.position,
        startDate: experienceForm.startDate,
        endDate: experienceForm.isCurrentlyWorking
          ? "ongoing"
          : experienceForm.endDate,
        isCurrentlyWorking: experienceForm.isCurrentlyWorking,
        responsibilities: experienceForm.responsibilities,
      };

      // Ensure experience is always an array
      const currentExperiences = Array.isArray(candidateData.experience)
        ? candidateData.experience
        : [];

      let updatedExperiences: Experience[];
      if (editingExperienceIndex !== null) {
        // Update existing experience
        updatedExperiences = currentExperiences.map((exp, idx) =>
          idx === editingExperienceIndex ? newExperience : exp
        );
      } else {
        // Add new experience
        updatedExperiences = [...currentExperiences, newExperience];
      }

      await updateProfileMutation.mutateAsync({
        experience: updatedExperiences,
      });

      setShowExperienceModal(false);
      showToast(
        "success",
        "Success",
        `Experience ${
          editingExperienceIndex !== null ? "updated" : "added"
        } successfully!`
      );
    } catch (error) {
      console.error("Error saving experience:", error);
      showToast("error", "Error", "Failed to save experience");
    }
  };

  const handleDeleteExperience = async (index: number) => {
    if (!candidateData) return;

    try {
      // Ensure experience is always an array
      const currentExperiences = Array.isArray(candidateData.experience)
        ? candidateData.experience
        : [];

      const updatedExperiences = currentExperiences.filter(
        (_, idx) => idx !== index
      );

      await updateProfileMutation.mutateAsync({
        experience: updatedExperiences,
      });
      showToast("success", "Success", "Experience deleted successfully!");
    } catch (error) {
      console.error("Error deleting experience:", error);
      showToast("error", "Error", "Failed to delete experience");
    }
  };

  // Education Functions
  const handleAddEducation = () => {
    setEditingEducationIndex(null);
    setEducationForm({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      isCurrentlyStudying: false,
    });
    setShowEducationModal(true);
  };

  const handleEditEducation = (education: Education, index: number) => {
    setEditingEducationIndex(index);
    setEducationForm({
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy || "",
      startDate: education.startDate.split("T")[0],
      endDate: education.endDate ? education.endDate.split("T")[0] : "",
      isCurrentlyStudying: !education.endDate,
    });
    setShowEducationModal(true);
  };

  const handleSaveEducation = async () => {
    if (!candidateData) return;

    try {
      const newEducation: Education = {
        institution: educationForm.institution,
        degree: educationForm.degree,
        fieldOfStudy: educationForm.fieldOfStudy,
        startDate: educationForm.startDate,
        endDate: educationForm.isCurrentlyStudying
          ? undefined
          : educationForm.endDate,
      };

      // Ensure education is always an array
      const currentEducation = Array.isArray(candidateData.education)
        ? candidateData.education
        : [];

      let updatedEducation: Education[];
      if (editingEducationIndex !== null) {
        // Update existing education
        updatedEducation = currentEducation.map((edu, idx) =>
          idx === editingEducationIndex ? newEducation : edu
        );
      } else {
        // Add new education
        updatedEducation = [...currentEducation, newEducation];
      }

      await updateProfileMutation.mutateAsync({ education: updatedEducation });

      setShowEducationModal(false);
      showToast(
        "success",
        "Success",
        `Education ${
          editingEducationIndex !== null ? "updated" : "added"
        } successfully!`
      );
    } catch (error) {
      console.error("Error saving education:", error);
      showToast("error", "Error", "Failed to save education");
    }
  };

  const handleDeleteEducation = async (index: number) => {
    if (!candidateData) return;

    try {
      // Ensure education is always an array
      const currentEducation = Array.isArray(candidateData.education)
        ? candidateData.education
        : [];

      const updatedEducation = currentEducation.filter(
        (_, idx) => idx !== index
      );

      await updateProfileMutation.mutateAsync({ education: updatedEducation });
      showToast("success", "Success", "Education deleted successfully!");
    } catch (error) {
      console.error("Error deleting education:", error);
      showToast("error", "Error", "Failed to delete education");
    }
  };

  // Skills Functions
  const handleAddSkills = () => {
    setSkillsInput(candidateData?.skills?.join(", ") || "");
    setShowSkillsModal(true);
  };

  const handleSaveSkills = async () => {
    if (!candidateData) return;

    try {
      const skillsArray = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      await updateProfileMutation.mutateAsync({ skills: skillsArray });

      setShowSkillsModal(false);
      showToast("success", "Success", "Skills updated successfully!");
    } catch (error) {
      console.error("Error saving skills:", error);
      showToast("error", "Error", "Failed to save skills");
    }
  };

  // Personal Information Functions
  const handleSave = async () => {
    try {
      const profileData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
        socialLinks: formData.socialLinks,
      };

      await updateProfileMutation.mutateAsync(profileData);

      showToast(
        "success",
        "Profile Saved",
        "Your profile has been updated successfully!"
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast("error", "Error", "Failed to save profile data");
    }
  };

  const handleCancel = () => {
    if (candidateData) {
      setFormData({
        name: candidateData.name || "",
        email: candidateData.email || "",
        phone: candidateData.phone || "",
        address: candidateData.address || "",
        bio: candidateData.bio || "",
        socialLinks: candidateData.socialLinks || {
          linkedin: "",
          github: "",
          portfolio: "",
        },
      });
    }
    setIsEditing(false);
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
          onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
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
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
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
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks?.linkedin || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          linkedin: e.target.value,
                        },
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
                    type="url"
                    value={formData.socialLinks?.github || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          github: e.target.value,
                        },
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
                    type="url"
                    value={formData.socialLinks?.portfolio || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          portfolio: e.target.value,
                        },
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
                  disabled={updateProfileMutation.isPending}
                  className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateProfileMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
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
                      <p className="font-medium">
                        {formData.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">
                        {formData.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Role</p>
                      <p className="font-medium capitalize">
                        {candidateData?.role}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-2">Bio</p>
                  <p className="text-gray-900">
                    {formData.bio || "No bio provided"}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              {(formData.socialLinks?.linkedin ||
                formData.socialLinks?.github ||
                formData.socialLinks?.portfolio) && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Social Links
                  </h3>
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
          <button
            onClick={handleAddExperience}
            className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </button>
        </div>
        <div className="p-6 space-y-6">
          {candidateData.experience && candidateData.experience.length > 0 ? (
            candidateData.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-primary-dark font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(exp.startDate).toLocaleDateString()} -{" "}
                      {exp.isCurrentlyWorking ||
                      !exp.endDate ||
                      exp.endDate === "ongoing"
                        ? "Present"
                        : new Date(exp.endDate).toLocaleDateString()}
                    </p>
                    {exp.responsibilities && (
                      <p className="text-gray-700 mt-2">
                        {exp.responsibilities}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditExperience(exp, index)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No work experience added yet</p>
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
          <button
            onClick={handleAddEducation}
            className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </button>
        </div>
        <div className="p-6 space-y-6">
          {candidateData.education && candidateData.education.length > 0 ? (
            candidateData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-primary-medium font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(edu.startDate).toLocaleDateString()} -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString()
                        : "Present"}
                    </p>
                    {edu.fieldOfStudy && (
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Award className="w-4 h-4 mr-1" />
                        {edu.fieldOfStudy}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditEducation(edu, index)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No education details added yet
            </p>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
          <button
            onClick={handleAddSkills}
            className="flex items-center px-3 py-2 text-primary-dark hover:bg-primary-lightest rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            {candidateData.skills && candidateData.skills.length > 0
              ? "Edit Skills"
              : "Add Skills"}
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
            <p className="text-gray-500 italic">No skills added yet</p>
          )}
        </div>
      </div>

      {/* Experience Modal */}
      {showExperienceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingExperienceIndex !== null
                ? "Edit Experience"
                : "Add Experience"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={experienceForm.company}
                  onChange={(e) =>
                    setExperienceForm({
                      ...experienceForm,
                      company: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={experienceForm.position}
                  onChange={(e) =>
                    setExperienceForm({
                      ...experienceForm,
                      position: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={experienceForm.startDate}
                    onChange={(e) =>
                      setExperienceForm({
                        ...experienceForm,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={experienceForm.endDate}
                    onChange={(e) =>
                      setExperienceForm({
                        ...experienceForm,
                        endDate: e.target.value,
                      })
                    }
                    disabled={experienceForm.isCurrentlyWorking}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="currentlyWorking"
                  checked={experienceForm.isCurrentlyWorking}
                  onChange={(e) =>
                    setExperienceForm({
                      ...experienceForm,
                      isCurrentlyWorking: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="currentlyWorking"
                  className="text-sm text-gray-700"
                >
                  I currently work here
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsibilities
                </label>
                <textarea
                  value={experienceForm.responsibilities}
                  onChange={(e) =>
                    setExperienceForm({
                      ...experienceForm,
                      responsibilities: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowExperienceModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                disabled={updateProfileMutation.isPending}
                className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {showEducationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingEducationIndex !== null
                ? "Edit Education"
                : "Add Education"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  value={educationForm.institution}
                  onChange={(e) =>
                    setEducationForm({
                      ...educationForm,
                      institution: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={educationForm.degree}
                  onChange={(e) =>
                    setEducationForm({
                      ...educationForm,
                      degree: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={educationForm.fieldOfStudy}
                  onChange={(e) =>
                    setEducationForm({
                      ...educationForm,
                      fieldOfStudy: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={educationForm.startDate}
                    onChange={(e) =>
                      setEducationForm({
                        ...educationForm,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={educationForm.endDate}
                    onChange={(e) =>
                      setEducationForm({
                        ...educationForm,
                        endDate: e.target.value,
                      })
                    }
                    disabled={educationForm.isCurrentlyStudying}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="currentlyStudying"
                  checked={educationForm.isCurrentlyStudying}
                  onChange={(e) =>
                    setEducationForm({
                      ...educationForm,
                      isCurrentlyStudying: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="currentlyStudying"
                  className="text-sm text-gray-700"
                >
                  I currently study here
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEducationModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEducation}
                disabled={updateProfileMutation.isPending}
                className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Modal */}
      {showSkillsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Skills</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma separated)
                </label>
                <textarea
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., JavaScript, React, Node.js, Python"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple skills with commas
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSkillsModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSkills}
                disabled={updateProfileMutation.isPending}
                className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save Skills"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}