"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast";
import { Candidate, SocialLinks, Education, Experience } from "@/types";
import axiosInstance from "@/lib/axios";

// Import all the new components
import ProfileHeader from "./ProfileHeader";
import PersonalInfoSection from "./PersonalInfoSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ExperienceModal from "./ExperienceModal";
import EducationModal from "./EducationModal";
import SkillsModal from "./SkillsModal";

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

  // Fetch candidate profile
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

  // Personal Information Handlers
  const handleSavePersonalInfo = async () => {
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

  const handleCancelEdit = () => {
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

  const handleToggleEdit = () => {
    if (isEditing) {
      handleCancelEdit();
    } else {
      setIsEditing(true);
    }
  };

  // Experience Handlers
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

      const currentExperiences = Array.isArray(candidateData.experience)
        ? candidateData.experience
        : [];

      let updatedExperiences: Experience[];
      if (editingExperienceIndex !== null) {
        updatedExperiences = currentExperiences.map((exp, idx) =>
          idx === editingExperienceIndex ? newExperience : exp
        );
      } else {
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

  // Education Handlers
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

      const currentEducation = Array.isArray(candidateData.education)
        ? candidateData.education
        : [];

      let updatedEducation: Education[];
      if (editingEducationIndex !== null) {
        updatedEducation = currentEducation.map((edu, idx) =>
          idx === editingEducationIndex ? newEducation : edu
        );
      } else {
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

  // Skills Handlers
  const handleEditSkills = () => {
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
      <ProfileHeader isEditing={isEditing} onToggleEdit={handleToggleEdit} />

      <PersonalInfoSection
        candidateData={candidateData}
        isEditing={isEditing}
        formData={formData}
        onFormChange={setFormData}
        onSave={handleSavePersonalInfo}
        onCancel={handleCancelEdit}
        isSaving={updateProfileMutation.isPending}
      />

      <ExperienceSection
        experiences={candidateData.experience || []}
        onAdd={handleAddExperience}
        onEdit={handleEditExperience}
        onDelete={handleDeleteExperience}
      />

      <EducationSection
        education={candidateData.education || []}
        onAdd={handleAddEducation}
        onEdit={handleEditEducation}
        onDelete={handleDeleteEducation}
      />

      <SkillsSection
        skills={candidateData.skills || []}
        onEdit={handleEditSkills}
      />

      <ExperienceModal
        isOpen={showExperienceModal}
        isEditing={editingExperienceIndex !== null}
        formData={experienceForm}
        onFormChange={setExperienceForm}
        onSave={handleSaveExperience}
        onClose={() => setShowExperienceModal(false)}
        isSaving={updateProfileMutation.isPending}
      />

      <EducationModal
        isOpen={showEducationModal}
        isEditing={editingEducationIndex !== null}
        formData={educationForm}
        onFormChange={setEducationForm}
        onSave={handleSaveEducation}
        onClose={() => setShowEducationModal(false)}
        isSaving={updateProfileMutation.isPending}
      />

      <SkillsModal
        isOpen={showSkillsModal}
        skillsInput={skillsInput}
        onSkillsChange={setSkillsInput}
        onSave={handleSaveSkills}
        onClose={() => setShowSkillsModal(false)}
        isSaving={updateProfileMutation.isPending}
      />
    </div>
  );
}
