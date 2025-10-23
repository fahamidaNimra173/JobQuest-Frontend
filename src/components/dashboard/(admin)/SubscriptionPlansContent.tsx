"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import AdminRoutes from "@/routes/AdminRoutes";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Plus } from "lucide-react";
import { Subscription } from "@/types/subscription";
import PlanCard from "@/components/dashboard/(admin)/PlanCard";
import AddEditPlanModal from "@/components/dashboard/(admin)/AddEditPlanModal";
import DeletePlanModal from "@/components/dashboard/(admin)/DeletePlanModal";

const SubscriptionPlansContent = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Subscription | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<Subscription | null>(null);

  const breadcrumbItems = [
    {
      name: "Subscription Plans",
      href: "/dashboard/subscription-plans",
      current: true,
    },
  ];

  const { data, isPending, refetch } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/subscriptions`);
      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const subscriptions: Subscription[] = data?.data || [];

  const handleEdit = (plan: Subscription) => {
    setEditingPlan(plan);
  };

  const handleDelete = (plan: Subscription) => {
    setDeletingPlan(plan);
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setEditingPlan(null);
    setDeletingPlan(null);
  };

  return (
    <AdminRoutes>
      <div className="lg:px-4">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Plus size={20} />
            Add Plan
          </button>
        </div>

        {/* Plans Grid */}
        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 bg-gradient-to-tr from-orange-50 to-orange-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No subscription plans found</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              Create your first plan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {subscriptions.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        <AddEditPlanModal
          isOpen={isAddModalOpen || editingPlan !== null}
          onClose={handleCloseModals}
          plan={editingPlan}
          refetch={refetch}
        />

        <DeletePlanModal
          isOpen={deletingPlan !== null}
          onClose={handleCloseModals}
          plan={deletingPlan}
          refetch={refetch}
        />
      </div>
    </AdminRoutes>
  );
};

export default SubscriptionPlansContent;