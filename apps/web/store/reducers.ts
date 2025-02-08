import { createSlice } from "@reduxjs/toolkit";

const getInitialToken = () => {
  if (typeof window !== "undefined" && localStorage) {
    return localStorage.getItem("token");
  }
  return null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: getInitialToken(), // Get the token only on the client side
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

export const { setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
