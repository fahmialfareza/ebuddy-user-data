import { combineReducers, createSlice } from "@reduxjs/toolkit";

const getUserInitialToken = () => {
  if (typeof window !== "undefined" && localStorage) {
    return localStorage.getItem("token");
  }
  return null;
};

const getSnackBarInitialState = () => {
  return {
    snackBarOpen: false,
    message: "",
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: getUserInitialToken(), // Get the token only on the client side
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("token", action.payload);
      }
    },
    clearToken: (state) => {
      state.token = null;
      if (typeof window !== "undefined" && localStorage) {
        localStorage.removeItem("token");
      }
    },
  },
});

const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: getSnackBarInitialState(),
  reducers: {
    setSnackBar: (state, action) => {
      state.snackBarOpen = action.payload.snackBarOpen;
      state.message = action.payload.message;
    },
    clearSnackBar: (state) => {
      state.snackBarOpen = false;
      state.message = "";
    },
  },
});

const reducers = combineReducers({
  user: userSlice.reducer,
  snackBar: snackBarSlice.reducer,
});

export const { setToken, clearToken } = userSlice.actions;
export const { setSnackBar, clearSnackBar } = snackBarSlice.actions;

export default reducers;
