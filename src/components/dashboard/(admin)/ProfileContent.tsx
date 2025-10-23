"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast";
import { Admin, SocialLinks } from "@/types";
import axiosInstance from "@/lib/axios";

// Import all the new components
// import PersonalInfoSection from "./PersonalInfoSection";
import ProfileHeader from "../(candidate)/ProfileHeader";
import PersonalInfoSection from "./PersonalInfoSection";

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

  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Fetch admin profile
  const { data: adminData, isLoading } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "https://job-quest-i2wm.onrender.com/users/admin/me"
      );

      let admin;
      if (response.data.success && response.data.data) {
        admin = response.data.data;
      } else if (response.data && response.data._id) {
        admin = response.data;
      } else {
        admin = response.data;
      }

      return admin as Admin;
    },
  });

  // Update form data when admin data is loaded
  useEffect(() => {
    if (adminData) {
      setFormData({
        name: adminData.name || "",
        email: adminData.email || "",
        phone: adminData.phone || "",
        address: adminData.address || "",
        bio: adminData.bio || "",
        socialLinks: adminData.socialLinks || {
          linkedin: "",
          github: "",
          portfolio: "",
        },
      });
    }
  }, [adminData]);

  // Mutation for updating admin profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: Partial<Admin>) => {
      const response = await axiosInstance.patch(
        "https://job-quest-i2wm.onrender.com/users/admin",
        updatedData
      );

      if (response.data.success) {
        return response.data;
      }
      throw new Error("Unexpected save response structure");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProfile"] });
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
    if (adminData) {
      setFormData({
        name: adminData.name || "",
        email: adminData.email || "",
        phone: adminData.phone || "",
        address: adminData.address || "",
        bio: adminData.bio || "",
        socialLinks: adminData.socialLinks || {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  if (!adminData) {
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
        adminData={adminData}
        isEditing={isEditing}
        formData={formData}
        onFormChange={setFormData}
        onSave={handleSavePersonalInfo}
        onCancel={handleCancelEdit}
        isSaving={updateProfileMutation.isPending}
      />
    </div>
  );
}
