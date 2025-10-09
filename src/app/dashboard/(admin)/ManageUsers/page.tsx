"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
// import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "@/context/AuthContext";
import axios from "axios";
// import { useRouter } from "next/navigation";
// import Loader from "@/components/Loader";

// ✅ MUI imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TablePaginationActions from "@/lib/pagination";

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

// ---------------------- Main Component ----------------------
const ManageUsers = () => {
  // const { user, loading } = useAuth();
  //   const router = useRouter();

  const [searchType, setSearchType] = useState<OptionType>(searchOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<OptionType>(roleOptions[0]);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Temporary placeholders to avoid breaking JSX
  const isLoading = false;
  const users: User[] = [
    {
      _id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "candidate",
      provider: "google",
    },
    {
      _id: "2",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "employer",
      provider: "email",
    },
    {
      _id: "3",
      name: "Sophia Williams",
      email: "sophia.williams@example.com",
      role: "admin",
      provider: "github",
    },
    {
      _id: "4",
      name: "Daniel Kim",
      email: "daniel.kim@example.com",
      role: "candidate",
      provider: "facebook",
    },
    {
      _id: "5",
      name: "Olivia Davis",
      email: "olivia.davis@example.com",
      role: "employer",
      provider: "google",
    },
    {
      _id: "6",
      name: "James Anderson",
      email: "james.anderson@example.com",
      role: "candidate",
      provider: "email",
    },
    {
      _id: "7",
      name: "Emma Martinez",
      email: "emma.martinez@example.com",
      role: "employer",
      provider: "linkedin",
    },
    {
      _id: "8",
      name: "William Lee",
      email: "william.lee@example.com",
      role: "admin",
      provider: "github",
    },
    {
      _id: "9",
      name: "Ava Garcia",
      email: "ava.garcia@example.com",
      role: "candidate",
      provider: "google",
    },
    {
      _id: "10",
      name: "Ethan Wilson",
      email: "ethan.wilson@example.com",
      role: "employer",
      provider: "email",
    },
  ];

  const total = 10;

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
        await axios.delete(`${window.location.origin}/api/users/${id}`);
        toast.success("User deleted");
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || err.message || "Delete failed"
        );
      }
    }
  };

  return (
    <div className="px-4 py-20">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#F7602C]">
        Manage Users
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <Select
          options={searchOptions}
          value={searchType}
          onChange={(selected) => {
            if (selected) {
              setSearchType(selected);
              setPage(0);
            }
          }}
          className="w-full md:w-1/3"
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 40,
              height: 40,
            }),
          }}
        />

        <TextField
          label={`Search by ${searchType.value}`}
          variant="outlined"
          size="small"
          sx={{ height: 40 }}
          className="w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
        />

        <Select
          options={roleOptions}
          value={roleFilter}
          onChange={(selected) => {
            if (selected) {
              setRoleFilter(selected);
              setPage(0);
            }
          }}
          className="w-full md:w-1/3"
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 40,
              height: 40,
            }),
          }}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        // <Loader />
        <p className="text-center mt-10 text-gray-600 text-lg font-medium">
          Loading...
        </p>
      ) : users.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 text-lg font-medium">
          No users found.
        </p>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="users table" size="small">
            {/* ✅ Header row */}
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 0.5 }} align="center">
                  #
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="center">
                  Name
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="center">
                  Email
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="center">
                  Provider
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="center">
                  Role
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((u, i) => (
                <TableRow key={u._id}>
                  <TableCell sx={{ py: 0.5 }}>
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }} align="center">
                    {u.name}
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }} align="center">
                    {u.email}
                  </TableCell>
                  <TableCell
                    sx={{ py: 0.5 }}
                    align="center"
                    className="capitalize"
                  >
                    {u.role}
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }} align="center">
                    {u.provider}
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }} align="center">
                    {u.email === "sophia.williams@example.com" ? (
                      ""
                    ) : (
                      <Button
                        onClick={() => handleDelete(u._id)}
                        variant="contained"
                        sx={{ fontSize: "12px", padding: "6px" }}
                        size="small"
                        className="text-white"
                        color="error"
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, 30]}
                  colSpan={6}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: false,
                  }}
                  onPageChange={(_event, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManageUsers;