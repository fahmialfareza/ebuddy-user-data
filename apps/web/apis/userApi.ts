import { apiWrapper } from "./axios";
import { User } from "@repo/shared-types";

export const getUser = async () => {
  const response = (await apiWrapper().get("/user")).data as User[];
  return response;
};

export const updateUser = async (userId: string, data: Partial<User>) => {
  const response = (await apiWrapper().post(`/user/${userId}`, data)).data;
  return response;
};

export const deleteUser = async (userId: string) => {
  const response = (await apiWrapper().delete(`/user/${userId}`)).data;
  return response;
};
