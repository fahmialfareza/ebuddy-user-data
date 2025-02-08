import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function DeleteUserDialog({
  open,
  handleClose,
  handleDelete,
}: {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => Promise<void>;
}) {
  const handleDeleteUser = async () => {
    await handleDelete();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          p: 3, // Padding around the dialog
          textAlign: "center", // Center-align the content
        },
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDeleteUser();
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Delete User
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Are you sure you want to delete this user?
          </Typography>
          <Typography variant="body2" color="error" fontWeight="bold">
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
