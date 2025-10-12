// ✅ MUI imports
'use client';
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
import TablePaginationActions from "@/lib/pagination";

// ✅ Interfaces
interface Review {
  _id: string;
  review: string;
  name: string;
  designation: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface TableStyles {
  paper: {
    backgroundColor: string;
    color: string;
  };
  tableHead: {
    backgroundColor: string;
  };
  tableHeadCell: {
    color: string;
    fontWeight: number;
    backgroundColor: string;
    borderColor: string;
  };
  tableBodyCell: {
    color: string;
    borderColor: string;
  };
  tableRow: {
    backgroundColor: string;
    "&:hover": {
      backgroundColor: string;
    };
  };
}

interface ReviewsTableProps {
  reviews: Review[];
  tableStyles: TableStyles;
  paginatedReviews: Review[];
  page: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handleApprove: (id: string) => Promise<void>;
  handleReject: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

// ✅ Component
const ReviewsTable: React.FC<ReviewsTableProps> = ({
  reviews,
  tableStyles,
  paginatedReviews,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  handleApprove,
  handleReject,
  handleDelete,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: tableStyles.paper.backgroundColor,
        color: tableStyles.paper.color,
      }}
    >
      <Table aria-label="reviews table" size="small">
        <TableHead
          sx={{ backgroundColor: tableStyles.tableHead.backgroundColor }}
        >
          <TableRow>
            {[
              "#",
              "Name",
              "Email",
              "Designation",
              "Review",
              "Status",
              "Actions",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{ py: 0.5, ...tableStyles.tableHeadCell }}
                align="left"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedReviews.map((r, i) => (
            <TableRow
              key={r._id}
              sx={{
                backgroundColor: tableStyles.tableRow.backgroundColor,
                "&:hover": tableStyles.tableRow["&:hover"],
              }}
            >
              <TableCell sx={{ py: 0.5, ...tableStyles.tableBodyCell }}>
                {page * rowsPerPage + i + 1}
              </TableCell>
              <TableCell sx={{ py: 0.5, ...tableStyles.tableBodyCell }}>
                {r.name}
              </TableCell>
              <TableCell sx={{ py: 0.5, ...tableStyles.tableBodyCell }}>
                {r.email}
              </TableCell>
              <TableCell className="capitalize" sx={{ py: 0.5, ...tableStyles.tableBodyCell }}>
                {r.designation}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                className="truncate max-w-24"
                title={r.review}
              >
                {r.review}
              </TableCell>
              <TableCell sx={{ py: 0.5, ...tableStyles.tableBodyCell }}>
                <Chip
                  className={`capitalize font-semibold ${
                    r.status === "approved"
                      ? "text-green-600"
                      : r.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                  color={
                    r.status === "approved"
                      ? "success"
                      : r.status === "pending"
                      ? "info"
                      : "error"
                  }
                  label={r.status}
                />
              </TableCell>
              <TableCell sx={{ py: 0.5, ...tableStyles.tableBodyCell }}>
                {r.status === "pending" && (
                  <div className="flex gap-2 items-center ">
                    <Button
                      onClick={() => handleApprove(r._id)}
                      variant="contained"
                      sx={{ fontSize: "12px", padding: "6px" }}
                      size="small"
                      color="success"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(r._id)}
                      variant="contained"
                      sx={{ fontSize: "12px", padding: "6px" }}
                      size="small"
                      color="error"
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {r.status === "approved" && (
                  <Button
                    onClick={() => handleDelete(r._id)}
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
          <TableRow
            sx={{ backgroundColor: tableStyles.tableHead.backgroundColor }}
          >
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30]}
              colSpan={7}
              count={reviews.length}
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
                  "&.Mui-disabled": { color: "#d1d5db" },
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

export default ReviewsTable;