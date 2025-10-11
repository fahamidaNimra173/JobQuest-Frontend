"use client";
import { useState } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import ReviewsTable from "@/components/dashboard/(admin)/ReviewsTable";
import { useToast } from "@/components/ui/Toast";
import Breadcrumb from "@/components/ui/Breadcrumb";

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

// ✅ Interface
interface Reviews {
  _id: string;
  review: string;
  name: string;
  designation: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const ManageReviews = () => {
  const { showToast } = useToast();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const tableStyles = getTableStyles(isDark);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // ✅ Mock Data
  const reviews: Reviews[] = Array.from({ length: 30 }).map((_, i) => ({
    _id: (i + 1).toString(),
    review: [
      "How to Write a Winning Resume",
      "Best Interview Tips for Fresh Graduates",
      "Is Remote Work Still the Future?",
      "Top Skills Employers Look for in 2025",
      "Building a Strong LinkedIn Profile",
    ][i % 5],
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    designation: [
      "Frontend developer",
      "Backend developer",
      "mern stack developer",
      "full stack developer",
    ][i % 4],
    status: (["pending", "approved", "rejected"] as const)[i % 3],
    createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  }));

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
        await axios.delete(`${window.location.origin}/api/reviews/${id}`);
        showToast("success", "Review rejected");
      } catch (err: any) {
        showToast(
          "error",
          err.response?.data?.message || err.message || "Reject failed"
        );
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
        await axios.delete(`${window.location.origin}/api/reviews/${id}`);
        showToast("success", "Review deleted");
      } catch (err: any) {
        showToast(
          "error",
          err.response?.data?.message || err.message || "Delete failed"
        );
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
        await axios.patch(`${window.location.origin}/api/reviews/${id}`, {
          status: "approved",
        });
        showToast("success", "Review approved");
      } catch (err: any) {
        showToast(
          "error",
          err.response?.data?.message || err.message || "Approve failed"
        );
      }
    }
  };

  // ✅ Paginated Data
  const paginatedReviews = reviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const breadcrumbItems = [
    {
      name: "Manage Reviews",
      href: "/dashboard/manage-reviews",
      current: true,
    },
  ];

  return (
    <div className="px-4">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <h2 className="text-3xl font-bold mb-4 text-center text-[#7670D6]">
        Manage Reviews
      </h2>

      {/* Table */}
      {reviews.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 text-lg font-medium">
          No reviews found.
        </p>
      ) : (
        <ReviewsTable
          reviews={reviews}
          tableStyles={tableStyles}
          paginatedReviews={paginatedReviews}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handleDelete={handleDelete}
        ></ReviewsTable>
      )}
    </div>
  );
};

export default ManageReviews;
