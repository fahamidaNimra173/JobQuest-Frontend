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

// ---------------------- User Interface ----------------------
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
}

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
  const { showToast } = useToast();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchType, setSearchType] = useState<OptionType>(searchOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<OptionType>(roleOptions[0]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // ✅ Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const currentSelectStyles = isDark
    ? darkSelectStylesOverride
    : selectStylesOverride;
  const currentSelectTheme = isDark ? darkSelectTheme : selectTheme;
  const tableStyles = getTableStyles(isDark);

  const users: User[] = Array.from({ length: 30 }).map((_, i) => ({
    _id: (i + 1).toString(),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ["candidate", "employer", "admin"][i % 3],
    provider: ["google", "email"][i % 2],
  }));

  // ---------------------- Filtered & Paginated Users ----------------------
  const filteredUsers = users.filter((u) => {
    const roleMatch = roleFilter.value === "" || u.role === roleFilter.value;
    const searchMatch = u[searchType.value as keyof User]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return roleMatch && searchMatch;
  });

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
        await axios.delete(`https://job-portal-backend-xshy.onrender.com/api/users/${id}`);
        showToast("success", "User deleted");
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

  const handleBan = async (id: string) => {
    const result = await Swal.fire({
      title: "Ban user?",
      text: "Are you sure you want to ban this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Ban",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`https://job-portal-backend-xshy.onrender.com/api/users/${id}`, {
          status: "banned",
        });
        showToast("success", "User banned");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showToast(
            "error",
            err.response?.data?.message || err.message || "Ban failed"
          );
        } else if (err instanceof Error) {
          showToast("error", err.message || "Ban failed");
        } else {
          showToast("error", "Ban failed");
        }
      }
    }
  };

  // ✅ Don't render until mounted on client
  if (!mounted) {
    return null;
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
      {paginatedUsers.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 text-lg font-medium">
          No users found.
        </p>
      ) : (
        <UsersTable
          tableStyles={tableStyles}
          paginatedUsers={paginatedUsers}
          filteredUsers={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          handleBan={handleBan}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ManageUsers;