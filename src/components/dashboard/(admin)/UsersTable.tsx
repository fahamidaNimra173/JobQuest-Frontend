import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import TablePaginationActions from "@/lib/pagination";

// -------------------------------------------------------------
// ✅ Type Definitions
// -------------------------------------------------------------
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
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
    "&:hover": Record<string, string>;
  };
}

interface UsersTableProps {
  tableStyles: TableStyles;
  paginatedUsers: User[];
  filteredUsers: User[];
  page: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handleBan: (id: string) => void;
  handleDelete: (id: string) => void;
}

// -------------------------------------------------------------
// ✅ Component
// -------------------------------------------------------------
const UsersTable: React.FC<UsersTableProps> = ({
  tableStyles,
  paginatedUsers,
  filteredUsers,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  handleBan,
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
      <Table aria-label="users table" size="small">
        <TableHead
          sx={{ backgroundColor: tableStyles.tableHead.backgroundColor }}
        >
          <TableRow>
            {["#", "Name", "Email", "Role", "Provider", "Actions"].map(
              (header) => (
                <TableCell
                  key={header}
                  sx={{ py: 0.5, ...tableStyles.tableHeadCell }}
                  align="center"
                >
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedUsers.map((u, i) => (
            <TableRow
              key={u._id}
              sx={{
                backgroundColor: tableStyles.tableRow.backgroundColor,
                "&:hover": tableStyles.tableRow["&:hover"],
              }}
            >
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="center"
              >
                {page * rowsPerPage + i + 1}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="center"
              >
                {u.name}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="center"
              >
                {u.email}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="center"
              >
                {u.role}
              </TableCell>
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="center"
              >
                {u.provider}
              </TableCell>

              {/* ✅ Actions */}
              <TableCell
                sx={{ py: 0.5, ...tableStyles.tableBodyCell }}
                align="center"
              >
                <div className="flex items-center justify-center gap-2">
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
          <TableRow sx={{ backgroundColor: tableStyles.tableHead.backgroundColor }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30]}
              colSpan={6}
              count={filteredUsers.length}
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

export default UsersTable;