"use client";

import { useState, SyntheticEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  SnackbarCloseReason,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { signUp } from "../../apis/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/reducers";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleRegister = async () => {
    try {
      // Your register logic here
      const response = await signUp(email, password);
      const token = (await response.user.getIdTokenResult()).token;
      dispatch(setToken(token));
      setMessage("Register successful!");
    } catch (error) {
      setMessage("Register failed!");
    }

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        width="400px"
        p={3}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        />
      </Box>
    </Box>
  );
};

export default RegisterPage;
