import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  RestoreFromTrash as RestoreIcon,
} from "@mui/icons-material";

export default function DataTable({ data, pageType }) {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(data);

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) {
      return;
    }

    await fetch(`http://localhost:8060/users/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setTableData(tableData.filter((u) => u._id !== id));
  };

  const hiddenFields = [
    "_id",
    "password",
    "isDeleted",
    "isBanned",
    "isBusiness",
  ];
  const tableHeaders = data.length
    ? Object.keys(data[0]).filter((header) => !hiddenFields.includes(header))
    : [];

  return (
    <Box width="100%" p={2}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate(`/${pageType}/form/add`)}
        >
          New
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<RestoreIcon />}
          onClick={() => navigate("/recycle-bin")}
        >
          Recycling bin
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#282c34" }}>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  style={{ color: "#fff", whiteSpace: "nowrap" }}
                >
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableCell>
              ))}
              <TableCell style={{ color: "#fff", whiteSpace: "nowrap" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((u, i) => (
              <TableRow
                key={u._id}
                sx={{ backgroundColor: i % 2 === 0 ? "#d9d9d9" : "white" }}
              >
                {tableHeaders.map((key) => (
                  <TableCell
                    key={key}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {u[key] !== undefined && u[key] !== null
                      ? typeof u[key] === "object"
                        ? JSON.stringify(u[key])
                        : String(u[key])
                      : "No Data"}
                  </TableCell>
                ))}

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Link to={`/${pageType}/form/${u._id}`}>
                    <IconButton
                      sx={{
                        margin: "0 5px",
                        padding: "5px 8px",
                        borderRadius: "50%",
                        width: "initial",
                        cursor: "pointer",
                        transition: "0.3s",
                        color: "#3dbf23",
                        "&:hover": {
                          backgroundColor: "#3dbf23",
                          color: "white",
                          boxShadow: "0 0 4px #d6d6d6",
                        },
                        "&:active": {
                          transform: "scale(1.3)",
                        },
                      }}
                    >
                      <AiFillEdit />
                    </IconButton>
                  </Link>

                  <IconButton
                    sx={{
                      padding: "5px 8px",
                      borderRadius: "50%",
                      width: "initial",
                      cursor: "pointer",
                      transition: "0.3s",
                      color: "#bf2323",
                      "&:hover": {
                        backgroundColor: "#bf2323",
                        color: "white",
                        boxShadow: "0 0 4px #d6d6d6",
                      },
                      "&:active": {
                        transform: "scale(1.3)",
                      },
                    }}
                    onClick={() => remove(u._id)}
                  >
                    <AiFillDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
