import React from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Subscription } from "@/types/subscription";
import { AlertTriangle, X } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface DeletePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Subscription | null;
  refetch: () => void;
}

const DeletePlanModal: React.FC<DeletePlanModalProps> = ({
  isOpen,
  onClose,
  plan,
  refetch,
}) => {
  const { showToast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/subscriptions/${plan?._id}`);
      return res.data;
    },
    onSuccess: () => {
      showToast("success", "Plan deleted successfully!");
      refetch();
      onClose();
    },
    onError: (error: any) => {
      showToast(
        "success",
        error.response?.data?.message || "Failed to delete plan"
      );
    },
  });

  const handleDelete = () => {
    if (plan) {
      deleteMutation.mutate();
    }
  };

  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Delete Plan</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete the{" "}
            <span className="font-semibold">{plan.planName}</span> plan? This
            action cannot be undone.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> Deleting this plan may affect existing
              subscribers. Please ensure you have taken appropriate measures
              before proceeding.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlanModal;