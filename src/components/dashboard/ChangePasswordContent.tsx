"use client";

import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import Breadcrumb from "@/components/ui/Breadcrumb";
import apiClient from "@/lib/api";
import axiosInstance from "@/lib/axios";

export default function ChangePasswordContent() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Breadcrumb items for change password
  const breadcrumbItems = [
    {
      name: "Change Password",
      href: "/dashboard/change-password",
      current: true,
    },
  ];

  const passwordRequirements = [
    {
      id: "length",
      text: "At least 8 characters",
      test: (pwd: string) => pwd.length >= 8,
    },
    {
      id: "uppercase",
      text: "One uppercase letter",
      test: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      id: "lowercase",
      text: "One lowercase letter",
      test: (pwd: string) => /[a-z]/.test(pwd),
    },
    { id: "number", text: "One number", test: (pwd: string) => /\d/.test(pwd) },
    {
      id: "special",
      text: "One special character",
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    console.log("Toggling password visibility for:", field);
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const failedRequirements = passwordRequirements.filter(
        (req) => !req.test(formData.newPassword)
      );
      if (failedRequirements.length > 0) {
        newErrors.newPassword = "Password does not meet requirements";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.patch("/auth/update-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      // Handle wrong password (no success flag)
      if (response.data?.message === "Wrong Password") {
        setErrors({ currentPassword: "Incorrect current password" });
        showToast(
          "error",
          "Wrong Password",
          "Your current password is incorrect."
        );
        return;
      }

      // Handle success
      if (response.data?.success) {
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
        showToast(
          "success",
          "Password Updated!",
          "Your password has been changed successfully."
        );
        return;
      }

      // Handle unexpected responses
      throw new Error("Unexpected server response. Please try again.");
    } catch (error: any) {
      console.error("Password change error:", error);

      const serverMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to change password. Please try again.";

      showToast("error", "Failed to change password", serverMsg);
      setErrors({ submit: serverMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    const passedRequirements = passwordRequirements.filter((req) =>
      req.test(password)
    ).length;
    if (passedRequirements <= 2)
      return { strength: "weak", color: "bg-red-500", width: "33%" };
    if (passedRequirements <= 4)
      return { strength: "medium", color: "bg-yellow-500", width: "66%" };
    return { strength: "strong", color: "bg-green-500", width: "100%" };
  };

  const passwordStrength = formData.newPassword
    ? getPasswordStrength(formData.newPassword)
    : null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
        <p className="text-gray-600">
          Update your account password to keep your account secure
        </p>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-primary-dark mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-primary-dark mb-1">
              Security Tips
            </h3>
            <ul className="text-xs text-primary-medium space-y-1">
              <li>• Use a unique password that you don&apos;t use elsewhere</li>
              <li>
                • Consider using a password manager to generate and store strong
                passwords
              </li>
              <li>• Never share your password with anyone</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.newPassword && passwordStrength && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">
                    Password strength
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      passwordStrength.strength === "weak"
                        ? "text-red-600"
                        : passwordStrength.strength === "medium"
                        ? "text-yellow-600"
                        : "text-primary-dark"
                    }`}
                  >
                    {passwordStrength.strength.charAt(0).toUpperCase() +
                      passwordStrength.strength.slice(1)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.strength === "strong"
                        ? "bg-primary-dark"
                        : passwordStrength.color
                    }`}
                    style={{ width: passwordStrength.width }}
                  ></div>
                </div>
              </div>
            )}

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          {formData.newPassword && (
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Password Requirements
              </h4>
              <div className="space-y-2">
                {passwordRequirements.map((requirement) => {
                  const isValid = requirement.test(formData.newPassword);
                  return (
                    <div key={requirement.id} className="flex items-center">
                      {isValid ? (
                        <Check className="w-4 h-4 text-primary-dark mr-2" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400 mr-2" />
                      )}
                      <span
                        className={`text-xs ${
                          isValid ? "text-primary-dark" : "text-gray-600"
                        }`}
                      >
                        {requirement.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock className="w-4 h-4 mr-2" />
              {isSubmitting ? "Changing Password..." : "Change Password"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                setErrors({});
              }}
              className="px-6 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
