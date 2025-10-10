"use client";
import { useState } from "react";
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
import { Button, Chip } from "@mui/material";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TablePaginationActions from "@/lib/pagination";

interface Reviews {
  _id: string;
  review: string;
  authorName: string;
  authorEmail: string;
  category: string;
  contentPreview: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const ManageReviews = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const reviews: Reviews[] = Array.from({ length: 25 }).map(
    (_, i) => ({
      _id: (i + 1).toString(),
      review: [
        "How to Write a Winning Resume",
        "Best Interview Tips for Fresh Graduates",
        "Is Remote Work Still the Future?",
        "Top Skills Employers Look for in 2025",
        "Building a Strong LinkedIn Profile",
      ][i % 5],
      authorName: `User ${i + 1}`,
      authorEmail: `user${i + 1}@example.com`,
      category: ["Career Advice", "Interview", "Job Market", "Tech Trends"][
        i % 4
      ],
      contentPreview: [
        "Sharing key insights from my experience reviewing 200+ resumes this month...",
        "Here’s what helped me ace 3 technical interviews this week...",
        "Remote work has changed drastically — here’s what I’ve learned from it...",
        "These are the most in-demand skills according to recent HR surveys...",
        "Your LinkedIn headline matters more than you think — here’s why...",
      ][i % 5],
      status: (["pending", "approved", "rejected"] as const)[i % 3],
      createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    })
  );

  const handleReject = async (id: string) => {
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
        await axios.delete(
          `${window.location.origin}/api/reviews/${id}`
        );
        toast.success("Post rejected");
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || err.message || "Reject failed"
        );
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
        await axios.delete(`${window.location.origin}/api/users/${id}`);
        toast.success("Post deleted");
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || err.message || "Delete failed"
        );
      }
    }
  };

  const handleApprove = async (id: string) => {
    const result = await Swal.fire({
      title: "Approve Post?",
      text: "Are you sure you want to approve this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Ban",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(
          `${window.location.origin}/api/reviews/${id}`,
          { status: "approved" }
        );
        toast.success("Post approved");
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || err.message || "Approve failed"
        );
      }
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#7670D6]">
        Manage Reviews
      </h2>

      {/* Table */}
      {reviews.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 text-lg font-medium">
          No Reviews found.
        </p>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="reviews table" size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 0.5 }} align="left">
                  #
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="left">
                  Title
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="left">
                  Author
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="left">
                  Category
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="left">
                  Status
                </TableCell>
                <TableCell sx={{ py: 0.5 }} align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reviews
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((p, i) => (
                  <TableRow key={p._id}>
                    <TableCell align="left">
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell align="left">{p.title}</TableCell>
                    <TableCell align="left">
                      <div className="flex flex-col">
                        <span className="font-medium">{p.authorName}</span>
                        <span className="text-xs text-gray-500">
                          {p.authorEmail}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="left">{p.category}</TableCell>
                    <TableCell align="left">
                      <Chip
                        className={`capitalize font-semibold ${
                          p.status === "approved"
                            ? "text-green-600"
                            : p.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                        color={
                          p.status === "approved"
                            ? "success"
                            : p.status === "pending"
                            ? "info"
                            : "error"
                        }
                        label={p.status}
                      />
                    </TableCell>

                    <TableCell align="left">
                      {p.status === "pending" && (
                        <div className="flex gap-2 items-center">
                          <Button
                            onClick={() => handleApprove(p._id)}
                            variant="contained"
                            sx={{ fontSize: "12px", padding: "6px" }}
                            size="small"
                            color="success"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(p._id)}
                            variant="contained"
                            sx={{ fontSize: "12px", padding: "6px" }}
                            size="small"
                            color="error"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {p.status === "approved" && (
                        <Button
                          onClick={() => handleDelete(p._id)}
                          variant="contained"
                          sx={{ fontSize: "12px", padding: "6px" }}
                          size="small"
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
                  count={reviews.length} // filtered count!
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

export default ManageReviews;
