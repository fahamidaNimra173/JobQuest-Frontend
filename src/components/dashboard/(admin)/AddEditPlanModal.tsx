import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import axiosInstance from "@/lib/axios";

// Types
type PlanCycle = "monthly" | "yearly" | "lifetime";

interface Subscription {
  _id: string;
  planName: string;
  planCycle: PlanCycle;
  price: number;
  jobPostLimit: number;
  featuredJobsLimit?: number;
  applicantViewLimit?: number;
  features: string[];
  popular: boolean;
}

interface SubscriptionFormData {
  planName: string;
  planCycle: PlanCycle;
  price: number | string;
  jobPostLimit: number | string;
  featuredJobsLimit: number | string;
  applicantViewLimit: number | string;
  features: string[];
  popular: boolean;
}

interface AddEditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: Subscription | null;
  refetch: () => void;
}

const AddEditPlanModal: React.FC<AddEditPlanModalProps> = ({
  isOpen,
  onClose,
  plan,
  refetch,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<SubscriptionFormData>({
    planName: "",
    planCycle: "monthly",
    price: "",
    jobPostLimit: "",
    featuredJobsLimit: "",
    applicantViewLimit: "",
    features: [""],
    popular: false,
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        planName: plan.planName,
        planCycle: plan.planCycle,
        price: plan.price,
        jobPostLimit: plan.jobPostLimit,
        featuredJobsLimit: plan.featuredJobsLimit || "",
        applicantViewLimit: plan.applicantViewLimit || "",
        features: plan.features.length > 0 ? plan.features : [""],
        popular: plan.popular,
      });
    } else {
      setFormData({
        planName: "",
        planCycle: "monthly",
        price: "",
        jobPostLimit: "",
        featuredJobsLimit: "",
        applicantViewLimit: "",
        features: [""],
        popular: false,
      });
    }
  }, [plan, isOpen]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post("/subscriptions", data);
      return res.data;
    },
    onSuccess: () => {
      showToast("success", "Plan created successfully!");
      refetch();
      onClose();
    },
    onError: (error: any) => {
      showToast(
        "error",
        error.response?.data?.message || "Failed to create plan"
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.patch(`/subscriptions/${plan?._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      showToast("success", "Plan updated successfully!");
      refetch();
      onClose();
    },
    onError: (error: any) => {
      showToast(
        "error",
        error.response?.data?.message || "Failed to update plan"
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim all features and filter out empty ones
    const trimmedFeatures = formData.features
      .map((f) => f.trim())
      .filter((f) => f !== "");

    // Convert string values to numbers for submission
    const dataToSubmit = {
      planName: formData.planName,
      planCycle: formData.planCycle,
      price: parseFloat(formData.price.toString()) || 0,
      jobPostLimit: parseInt(formData.jobPostLimit.toString()) || 0,
      featuredJobsLimit: formData.featuredJobsLimit
        ? parseInt(formData.featuredJobsLimit.toString())
        : 0,
      applicantViewLimit: formData.applicantViewLimit
        ? parseInt(formData.applicantViewLimit.toString())
        : 0,
      features: trimmedFeatures,
      popular: formData.popular,
    };

    if (plan) {
      updateMutation.mutate(dataToSubmit);
    } else {
      createMutation.mutate(dataToSubmit);
    }
  };

  const addFeatureField = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures.length > 0 ? newFeatures : [""],
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  if (!isOpen) return null;

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {plan ? "Edit Plan" : "Add New Plan"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.planName}
              onChange={(e) =>
                setFormData({ ...formData, planName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Basic, Pro, Enterprise"
            />
          </div>

          {/* Plan Cycle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Cycle <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.planCycle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  planCycle: e.target.value as PlanCycle,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="lifetime">Lifetime</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          {/* Job Post Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Post Limit <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.jobPostLimit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  jobPostLimit: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 10, 50, unlimited (use 999)"
            />
            <p className="text-xs text-gray-500 mt-2">
              Total number of job posts allowed for this plan. Use 999 for
              unlimited.
            </p>
          </div>

          {/* Featured Jobs Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Jobs Limit
            </label>
            <input
              type="number"
              min="0"
              value={formData.featuredJobsLimit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featuredJobsLimit: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 3, 5, 10"
            />
            <p className="text-xs text-gray-500 mt-2">
              Number of featured job posts that get priority placement.
            </p>
          </div>

          {/* Applicant View Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applicant View Limit
            </label>
            <input
              type="number"
              min="0"
              value={formData.applicantViewLimit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  applicantViewLimit: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 100, 500, unlimited (use 9999)"
            />
            <p className="text-xs text-gray-500 mt-2">
              Maximum number of applicant profiles the employer can view.
            </p>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Features <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addFeatureField}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
              >
                <Plus size={16} />
                Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Feature ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Add one feature per field. Empty fields will be removed.
            </p>
          </div>

          {/* Popular */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Popular Plan
            </label>
            <select
              value={formData.popular.toString()}
              onChange={(e) =>
                setFormData({ ...formData, popular: e.target.value === "true" })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Popular plans are highlighted with a special badge.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 px-4 py-2 border cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : plan ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPlanModal;