"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import TablePaginationActions from "@/lib/pagination";

interface CommunityPost {
  _id: string;
  post: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface TableStyles {
  paper: { backgroundColor: string; color: string };
  tableHead: { backgroundColor: string };
  tableHeadCell: {
    color: string;
    fontWeight: number;
    backgroundColor: string;
    borderColor: string;
  };
  tableBodyCell: { color: string; borderColor: string };
  tableRow: {
    backgroundColor: string;
    "&:hover": { backgroundColor: string };
  };
}

interface CommunityPostsTableProps {
  tableStyles: TableStyles;
  paginatedPosts: CommunityPost[];
  page: number;
  rowsPerPage: number;
  handleApprove: (id: string) => Promise<void>;
  handleReject: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  communityPosts: CommunityPost[];
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CommunityPostsTable = ({
  tableStyles,
  paginatedPosts,
  page,
  rowsPerPage,
  handleApprove,
  handleReject,
  handleDelete,
  communityPosts,
  setRowsPerPage,
  setPage,
}: CommunityPostsTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: tableStyles.paper.backgroundColor,
        color: tableStyles.paper.color,
      }}
    >
      <Table aria-label="community posts table" size="small">
        {/* ✅ Table Head */}
        <TableHead
          sx={{ backgroundColor: tableStyles.tableHead.backgroundColor }}
        >
          <TableRow>
            {["#", "Name", "Email", "Post", "Status", "Actions"].map(
              (header) => (
                <TableCell
                  key={header}
                  sx={{ py: 0.5, ...tableStyles.tableHeadCell }}
                  align="left"
                >
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        {/* ✅ Table Body */}
        <TableBody>
          {paginatedPosts.map((p, i) => (
            <TableRow
              key={p._id}
              sx={{
                backgroundColor: tableStyles.tableRow.backgroundColor,
                "&:hover": tableStyles.tableRow["&:hover"],
              }}
            >
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="left"
              >
                {page * rowsPerPage + i + 1}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="left"
              >
                {p.name}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="left"
              >
                {p.email}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="left"
                className="truncate max-w-24"
                title={p.post}
              >
                {p.post}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="left"
              >
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

              {/* ✅ Actions */}
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="left"
              >
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

        {/* ✅ Pagination */}
        <TableFooter>
          <TableRow
            sx={{ backgroundColor: tableStyles.tableHead.backgroundColor }}
          >
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30]}
              colSpan={6}
              count={communityPosts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: false,
                MenuProps: {
                  container: document.body,
                  disablePortal: true,
                },
              }}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              ActionsComponent={TablePaginationActions}
              sx={{
                color: tableStyles.tableBodyCell.color,
                "& .MuiIconButton-root": {
                  color: tableStyles.tableBodyCell.color,
                  "&.Mui-disabled": { color: "#d1d5db" }, // gray-300
                },
                "& .MuiSelect-root": {
                  color: tableStyles.tableBodyCell.color,
                },
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CommunityPostsTable;