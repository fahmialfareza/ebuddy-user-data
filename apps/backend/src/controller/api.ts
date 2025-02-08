import { Request, Response } from "express";
import {
  deleteUserData,
  fetchUserData,
  updateUserData,
} from "../repository/userCollection";
import { z } from "zod";
import {
  getUserParamsSchema,
  userDeleteParamsSchema,
  userUpdateBodySchema,
  userUpdateParamsSchema,
} from "@/schema/userSchema";

export const getUser = async (
  req: Request<z.infer<typeof getUserParamsSchema>, any, any>,
  res: Response
) => {
  const { userId } = req.params;
  const user = await fetchUserData(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUser = async (
  req: Request<
    z.infer<typeof userUpdateParamsSchema>,
    any,
    z.infer<typeof userUpdateBodySchema>
  >,
  res: Response
) => {
  const { userId } = req.params;
  await updateUserData(userId, req.body);
  res.json({ message: "User updated successfully" });
};

export const deleteUser = async (
  req: Request<z.infer<typeof userDeleteParamsSchema>, any, any>,
  res: Response
) => {
  const { userId } = req.params;
  await deleteUserData(userId);
  res.json({ message: "User deleted successfully" });
};
