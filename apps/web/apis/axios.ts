import axios from "axios";
import { store } from "../store/store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const apiWrapper = () => {
  const state = store.getState();
  const token = state.user.token;

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return api;
};
