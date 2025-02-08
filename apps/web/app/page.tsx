"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../store/store";
import { deleteUser, getUser, updateUser } from "../apis/userApi";
import { User } from "@repo/shared-types";
import DeleteUserDialog from "../components/Dialog/DeleteUserDialog";
import EditeUserDialog from "../components/Dialog/EditUserDialog";

export default function DataTable() {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  // Fetch data using react-query
  const { data, isSuccess, isError, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setUsers(data);
      setSnackBarOpen(true);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const handleRowClick = (params: GridRowParams) => {
    const user = params.row as User;
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleUpsert = async () => {
    if (selectedUser && selectedUser.id) {
      await updateUser(selectedUser.id, selectedUser);
      setOpen(false);
      setSelectedUser(null);
      setMessage("User created/updated successfully!");
      setSnackBarOpen(true);
      refetch(); // Refresh the data

      setTimeout(() => {
        setSnackBarOpen(false);
      }, 5000);
    }
  };

  const handleDelete = async () => {
    if (selectedUser && selectedUser.id) {
      await deleteUser(selectedUser.id);
      setDeleteOpen(false);
      setSelectedUser(null);
      setMessage("User deleted successfully!");
      setSnackBarOpen(true);
      refetch(); // Refresh the data

      setTimeout(() => {
        setSnackBarOpen(false);
      }, 5000);
    }
  };

  const handleChange = (field: keyof User, value: string | number) => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        [field]: value,
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    {
      field: "totalAverageWeightRatings",
      headerName: "Total Average Weight Ratings",
      type: "number",
      width: 200,
    },
    {
      field: "numberOfRents",
      headerName: "Number of Rents",
      type: "number",
      width: 150,
    },
    {
      field: "recentlyActive",
      headerName: "Recently Active",
      type: "number",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: (params: GridRowParams) => {
        return [
          <Button
            key="edit"
            onClick={() => {
              setSelectedUser(params.row as User);
              setOpen(true);
            }}
          >
            Edit
          </Button>,
          <Button
            key="delete"
            color="error"
            onClick={() => {
              setSelectedUser(params.row as User);
              setDeleteOpen(true);
            }}
          >
            Delete
          </Button>,
        ];
      },
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" align="center" gutterBottom>
          User Data Table
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" mb={4}>
          Click on a row to edit and upsert user data.
        </Typography>
        {/* Make button in right side of the page */}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mb={4}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedUser({
                email: "",
                name: "",
                totalAverageWeightRatings: 0,
                numberOfRents: 0,
                recentlyActive: 0,
                id: crypto.randomUUID(),
              });
              setOpen(true);
            }}
          >
            Add User
          </Button>
        </Box>

        <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
            >
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
            >
              <Typography variant="h6" color="error" gutterBottom>
                Failed to load user data.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  refetch();
                }}
              >
                Retry
              </Button>
            </Box>
          ) : (
            <DataGrid
              rows={users}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              onRowClick={handleRowClick}
              sx={{
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#f5f5f5",
                },
                border: "none",
              }}
            />
          )}
        </Paper>

        {/* Dialog for Edit user */}
        <EditeUserDialog
          handleChange={handleChange}
          open={open}
          handleClose={handleClose}
          handleUpsert={handleUpsert}
          selectedUser={selectedUser}
        />

        {/* Dialog for Delete user */}
        <DeleteUserDialog
          open={deleteOpen}
          handleClose={handleDeleteClose}
          handleDelete={handleDelete}
        />
      </Box>

      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={snackBarOpen}
        onClose={handleClose}
        key={"bottom" + "center"}
      >
        <Alert severity="info">{message}</Alert>
      </Snackbar>
    </Container>
  );
}
