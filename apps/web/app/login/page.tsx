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
  FormGroup,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { signIn } from "../../apis/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/reducers";
import { useRouter } from "next/navigation";
import { RootState } from "../../store/store";

const LoginPage = () => {
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

  const handleLogin = async () => {
    try {
      // Your login logic here
      const response = await signIn(email, password);
      const token = (await response.user.getIdTokenResult()).token;
      dispatch(setToken(token));
      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed!");
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
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
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

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

export default LoginPage;
