import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { User } from "@repo/shared-types";

export default function EditeUserDialog({
  open,
  handleClose,
  handleUpsert,
  selectedUser,
  handleChange,
}: {
  open: boolean;
  handleClose: () => void;
  handleUpsert: () => Promise<void>;
  selectedUser: Partial<User> | null;
  handleChange: (field: keyof User, value: string | number) => void;
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpsert();
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={selectedUser?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={selectedUser?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
            />
            <TextField
              label="Total Average Weight Ratings"
              type="number"
              value={selectedUser?.totalAverageWeightRatings || ""}
              onChange={(e) =>
                handleChange(
                  "totalAverageWeightRatings",
                  Number(e.target.value)
                )
              }
              fullWidth
            />
            <TextField
              label="Number of Rents"
              type="number"
              value={selectedUser?.numberOfRents || ""}
              onChange={(e) =>
                handleChange("numberOfRents", Number(e.target.value))
              }
              fullWidth
            />
            <TextField
              label="Recently Active"
              type="number"
              value={selectedUser?.recentlyActive || ""}
              onChange={(e) =>
                handleChange("recentlyActive", Number(e.target.value))
              }
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
