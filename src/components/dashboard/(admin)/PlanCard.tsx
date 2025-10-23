import React from "react";
import { Subscription } from "@/types/subscription";
import { Edit2, Trash2, Check, Star } from "lucide-react";

interface PlanCardProps {
  plan: Subscription;
  onEdit: (plan: Subscription) => void;
  onDelete: (plan: Subscription) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit, onDelete }) => {
  const getCycleLabel = (cycle: string) => {
    switch (cycle) {
      case "monthly":
        return "per month";
      case "yearly":
        return "per year";
      case "lifetime":
        return "one-time";
      default:
        return "";
    }
  };

  return (
    <div
      className={`relative bg-gradient-to-tr from-orange-50 to-orange-200 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 ${
        plan.popular ? "border-blue-500" : "border-gray-200"
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-md">
          <Star size={14} fill="white" />
          Popular
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => onEdit(plan)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
          title="Edit plan"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(plan)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete plan"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Plan Header */}
      <div className="mt-4 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {plan.planName}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-gray-900">
            ${plan.price}
          </span>
          <span className="text-gray-500 text-sm">
            {getCycleLabel(plan.planCycle)}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 capitalize">
            {plan.planCycle}
          </div>
          <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-xs font-medium text-blue-700">
            {plan.jobPostLimit === 999 ? "Unlimited" : plan.jobPostLimit} Job
            Posts
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700 mb-3">Features:</p>

        {/* Limits Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2">
          <span className="text-gray-600 text-xs">
            Number of featured job posts that get priority placement.
          </span>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Featured Jobs:</span>
            <span className="font-semibold text-gray-900">
              {plan.featuredJobsLimit}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Applicant Views:</span>
            <span className="font-semibold text-gray-900">
              {plan.applicantViewLimit === 9999
                ? "Unlimited"
                : plan.applicantViewLimit}
            </span>
          </div>
        </div>

        {plan.features.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No features listed</p>
        ) : (
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
