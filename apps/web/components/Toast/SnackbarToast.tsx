"use client";

import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearSnackBar } from "../../store/reducers";

const SnackbarToast = () => {
  const dispatch = useDispatch();
  const { snackBarOpen, message } = useSelector(
    (state: RootState) => state.snackBar
  );

  const handleClose = () => {
    dispatch(clearSnackBar());
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={snackBarOpen}
      onClose={handleClose}
      key={"bottom" + "right"}
    >
      <Alert severity="info">{message}</Alert>
    </Snackbar>
  );
};

export default SnackbarToast;
