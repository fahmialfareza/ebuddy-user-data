import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: (localStorage && localStorage.getItem("token")) || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
