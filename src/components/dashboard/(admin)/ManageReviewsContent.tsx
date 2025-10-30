"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import ReviewsTable from "@/components/dashboard/(admin)/ReviewsTable";
import { useToast } from "@/components/ui/Toast";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AdminRoutes from "@/routes/AdminRoutes";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

// ✅ Shared table style generator
const getTableStyles = (isDark: boolean) => ({
  paper: {
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    color: isDark ? "#f9fafb" : "#000000",
  },
  tableHead: {
    backgroundColor: isDark ? "#111827" : "#f3f4f6",
  },
  tableHeadCell: {
    color: isDark ? "#f9fafb" : "#000000",
    fontWeight: 600,
    backgroundColor: isDark ? "#111827" : "#f3f4f6",
    borderColor: isDark ? "#374151" : "#e5e7eb",
  },
  tableBodyCell: {
    color: isDark ? "#f9fafb" : "#000000",
    borderColor: isDark ? "#374151" : "#e5e7eb",
  },
  tableRow: {
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    "&:hover": {
      backgroundColor: isDark ? "#374151" : "#f9fafb",
    },
  },
});

const ManageReviewsContent = () => {
  const { showToast } = useToast();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // ✅ Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const tableStyles = getTableStyles(isDark);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["reviews", page, rowsPerPage],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews/all`, {
        params: {
          page,
          limit: rowsPerPage,
        },
      });
      return res.data;
    },

    placeholderData: (previousData) => previousData,
  });

  const reviews = data?.allReviewsPosts || [];
  const total = data?.total || 0;

  useEffect(() => {
    refetch();
  }, [rowsPerPage, page, refetch]);

  // ✅ Actions
  const handleReject = async (id: string) => {
    const result = await Swal.fire({
      title: "Reject Review?",
      text: "Are you sure you want to reject this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/reviews/${id}`);
        showToast("success", "Review rejected");
        refetch();
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showToast(
            "error",
            err.response?.data?.message || err.message || "Reject failed"
          );
        }
      }
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "Are you sure you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/reviews/${id}`);
        showToast("success", "Review deleted");
        refetch();
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showToast(
            "error",
            err.response?.data?.message || err.message || "Delete failed"
          );
        }
      }
    }
  };

  const handleApprove = async (id: string) => {
    const result = await Swal.fire({
      title: "Approve Review?",
      text: "Are you sure you want to approve this review?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/reviews/${id}/status`);
        showToast("success", "Review approved");
        refetch();
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showToast(
            "error",
            err.response?.data?.message || err.message || "Approve failed"
          );
        }
      }
    }
  };

  const breadcrumbItems = [
    {
      name: "Manage Reviews",
      href: "/dashboard/manage-reviews",
      current: true,
    },
  ];

  // ✅ Don't render until mounted on client
  if (!mounted) {
    return null;
  }

  return (
    <AdminRoutes>
      <div className="px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h2 className="text-3xl font-bold mb-4 text-center text-[#7670D6]">
          Manage Reviews
        </h2>

        {/* Table */}
        {isPending ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center mt-10 text-gray-600 text-lg font-medium">
            No reviews found.
          </p>
        ) : (
          <ReviewsTable
            reviews={reviews}
            tableStyles={tableStyles}
            page={page}
            rowsPerPage={rowsPerPage}
            total={total}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </AdminRoutes>
  );
};

export default ManageReviewsContent;
