import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
