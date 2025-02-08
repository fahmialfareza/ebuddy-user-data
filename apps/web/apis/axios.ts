import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const apiWrapper = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return api;
};
