import React from "react";
import { Edit3, X } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

interface ProfileHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
}

export default function ProfileHeader({
  isEditing,
  onToggleEdit,
}: ProfileHeaderProps) {
  const breadcrumbItems = [
    { name: "My Profile", href: "/dashboard/profile", current: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
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
          onClick={onToggleEdit}
          type="button"
          className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4 mr-2" /> Cancel
            </>
          ) : (
            <>
              <Edit3 className="w-5 h-5 mr-2" /> Edit Profile
            </>
          )}
        </button>
      </div>
    </>
  );
}