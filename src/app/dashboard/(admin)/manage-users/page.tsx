"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import {
  selectStylesOverride,
  darkSelectStylesOverride,
  selectTheme,
  darkSelectTheme,
} from "@/lib/selectStyles";
import Swal from "sweetalert2";
import { useToast } from "@/components/ui/Toast";
import UsersTable from "@/components/dashboard/(admin)/UsersTable";
import UsersFilter from "@/components/dashboard/(admin)/UsersFilter";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

// ---------------------- Filters ----------------------
interface OptionType {
  value: string;
  label: string;
}

const searchOptions: OptionType[] = [
  { value: "name", label: "Search by Name" },
  { value: "email", label: "Search by Email" },
];

const roleOptions: OptionType[] = [
  { value: "", label: "All Roles" },
  { value: "candidate", label: "Candidate" },
  { value: "employer", label: "Employer" },
  { value: "admin", label: "Admin" },
];

// ---------------------- Table Styles ----------------------
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

// ---------------------- Main Component ----------------------
const ManageUsers = () => {
  const { loading, user } = useAuth();
  const { showToast } = useToast();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchType, setSearchType] = useState<OptionType>(searchOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<OptionType>(roleOptions[0]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const router = useRouter();

  // ✅ Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (user.role !== "admin") router.push("/forbidden");
    }
  }, [user, loading, router]);

  const isDark = mounted && resolvedTheme === "dark";
  const currentSelectStyles = isDark
    ? darkSelectStylesOverride
    : selectStylesOverride;
  const currentSelectTheme = isDark ? darkSelectTheme : selectTheme;
  const tableStyles = getTableStyles(isDark);

  const { data, isPending, refetch } = useQuery({
    queryKey: [
      "users",
      searchTerm && searchType.value,
      searchTerm,
      roleFilter?.value || "",
      page,
      rowsPerPage,
    ],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users`, {
        params: {
          page,
          limit: rowsPerPage,
          searchType: searchType.value,
          search: searchTerm,
          role: roleFilter?.value || "",
        },
      });
      return res.data;
    },

    keepPreviousData: true,
  });

  const users = data?.allUsers || [];
  const total = data?.total || 0;

  useEffect(() => {
    refetch();
  }, [searchTerm, searchType, roleFilter, rowsPerPage, page, refetch]);

  const breadcrumbItems = [
    { name: "Manage Users", href: "/dashboard/manage-users", current: true },
  ];

  // ---------------------- Actions ----------------------
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete user?",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/users/${id}`);

        if (res.status === 200) {
          showToast("success", "User deleted");
          refetch();
        }
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

  // ✅ Don't render until mounted on client
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader size={40} className="animate-spin"></Loader>
      </div>
    );
  }

  return (
    <div className="px-4">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <h2 className="text-3xl font-bold mb-4 text-center text-[#7670D6]">
        Manage Users
      </h2>

      {/* Filters */}
      <UsersFilter
        searchOptions={searchOptions}
        searchType={searchType}
        setSearchTerm={setSearchTerm}
        setPage={setPage}
        setSearchType={setSearchType}
        currentSelectStyles={currentSelectStyles}
        currentSelectTheme={currentSelectTheme}
        searchTerm={searchTerm}
        roleOptions={roleOptions}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      {/* Table */}
      {isPending ? (
        <div className="h-[50vh] w-full flex items-center justify-center">
          <Loader size={40} className="animate-spin"></Loader>
        </div>
      ) : users.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 text-lg font-medium">
          No users found.
        </p>
      ) : (
        <UsersTable
          tableStyles={tableStyles}
          users={users}
          page={page}
          rowsPerPage={rowsPerPage}
          total={total}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ManageUsers;