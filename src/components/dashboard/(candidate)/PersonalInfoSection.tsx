import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Edit3,
  Save,
  X,
  Linkedin,
  Github,
  Link as LinkIcon,
} from "lucide-react";
import { Candidate } from "@/types";

interface ProfileFormData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

interface PersonalInfoSectionProps {
  candidateData: Candidate;
  isEditing: boolean;
  formData: ProfileFormData;
  onFormChange: (data: ProfileFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  onEditToggle: () => void;
  isSaving: boolean;
}

export default function PersonalInfoSection({
  candidateData,
  isEditing,
  formData,
  onFormChange,
  onSave,
  onCancel,
  onEditToggle,
  isSaving,
}: PersonalInfoSectionProps) {
  return (
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
                    onFormChange({ ...formData, name: e.target.value })
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
                    onFormChange({ ...formData, phone: e.target.value })
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
                    onFormChange({ ...formData, address: e.target.value })
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
                  onFormChange({ ...formData, bio: e.target.value })
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
                    onFormChange({
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
                    onFormChange({
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
                    onFormChange({
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
                onClick={onSave}
                type="button"
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={onCancel}
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
  );
}