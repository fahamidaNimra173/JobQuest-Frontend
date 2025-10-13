"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import CommunityPostsTable from "@/components/dashboard/(admin)/CommunityPostsTable";
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

const ManageCommunityPosts = () => {
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
    queryKey: ["communityPosts", page, rowsPerPage],
    queryFn: async () => {
      const res = await axiosInstance.get(`/community/all`, {
        params: {
          page,
          limit: rowsPerPage,
        },
      });
      return res.data;
    },

    placeholderData: (previousData) => previousData,
  });

  const communityPosts = data?.allCommunityPosts || [];
  const total = data?.total || 0;

  useEffect(() => {
    refetch();
  }, [rowsPerPage, page, refetch]);

  const handleReject = async (id: string) => {
    const Swal = (await import("sweetalert2")).default;
    const result = await Swal.fire({
      title: "Reject Community post?",
      text: "Are you sure you want to reject this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/community/${id}`);
        showToast("success", "Post rejected");
        refetch();
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showToast(
            "error",
            err.response?.data?.message || err.message || "Reject failed"
          );
        } else if (err instanceof Error) {
          showToast("error", err.message || "Reject failed");
        } else {
          showToast("error", "Reject failed");
        }
      }
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Community post?",
      text: "Are you sure you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/community/${id}`);
        showToast("success", "Post deleted");
        refetch();
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showToast(
            "error",
            err.response?.data?.message || err.message || "Delete failed"
          );
        } else if (err instanceof Error) {
          showToast("error", err.message || "Delete failed");
        } else {
          showToast("error", "Delete failed");
        }
      }
    }
  };

  const handleApprove = async (id: string) => {
    const result = await Swal.fire({
      title: "Approve Post?",
      text: "Are you sure you want to approve this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/community/${id}/status`);
        showToast("success", "Post approved");
        refetch();
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showToast(
            "error",
            err.response?.data?.message || err.message || "Approve failed"
          );
        } else if (err instanceof Error) {
          showToast("error", err.message || "Approve failed");
        } else {
          showToast("error", "Approve failed");
        }
      }
    }
  };

  const breadcrumbItems = [
    {
      name: "Manage Community Posts",
      href: "/dashboard/manage-community-posts",
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
          Manage Community Posts
        </h2>

        {/* Table */}
        {isPending ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
          </div>
        ) : communityPosts.length === 0 ? (
          <p className="text-center mt-10 text-gray-600 text-lg font-medium">
            No Community Posts found.
          </p>
        ) : (
          <CommunityPostsTable
            tableStyles={tableStyles}
            page={page}
            rowsPerPage={rowsPerPage}
            total={total}
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleDelete={handleDelete}
            communityPosts={communityPosts}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
          />
        )}
      </div>
    </AdminRoutes>
  );
};

export default ManageCommunityPosts;
