"use client";

import { useState } from "react";
import Select from "react-select";
import axios from "axios";

// MUI imports
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
  const [searchType, setSearchType] = useState<OptionType>(searchOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<OptionType>(roleOptions[0]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Fake users data for demonstration (replace with backend API later)
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
        await axios.delete(`${window.location.origin}/api/users/${id}`);
        toast.success("User deleted");
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || err.message || "Delete failed"
        );
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
        await axios.patch(`${window.location.origin}/api/users/${id}`, {status: 'banned'});
        toast.success("User banned");
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message || "Ban failed");
      }
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#7670D6]">
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
            control: (base) => ({ ...base, minHeight: 40, height: 40 }),
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
            control: (base) => ({ ...base, minHeight: 40, height: 40 }),
          }}
        />
      </div>

      {/* Table */}
      {paginatedUsers.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 text-lg font-medium">
          No users found.
        </p>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="users table" size="small">
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
                  Role
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="center">
                  Provider
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedUsers.map((u, i) => (
                <TableRow key={u._id}>
                  <TableCell sx={{ py: 0.5 }} align="center">
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
                  <TableCell
                    sx={{ py: 0.5 }}
                    align="center"
                    className="capitalize"
                  >
                    {u.provider}
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }} align="center">
                    <div className="flex gap-2 items-center justify-center">
                      <Button
                        onClick={() => handleBan(u._id)}
                        variant="contained"
                        sx={{ fontSize: "12px", padding: "6px" }}
                        size="small"
                        color="error"
                      >
                        Ban
                      </Button>
                      <Button
                        onClick={() => handleDelete(u._id)}
                        variant="contained"
                        sx={{ fontSize: "12px", padding: "6px" }}
                        size="small"
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, 30]}
                  colSpan={6}
                  count={filteredUsers.length} // filtered count!
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: false,
                  }}
                  onPageChange={(event, newPage) => setPage(newPage)}
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