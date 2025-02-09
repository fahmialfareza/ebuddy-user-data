import express from "express";
import { deleteUser, getUser, updateUser } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateData } from "@/middleware/validationMiddleware";
import {
  getUserParamsSchema,
  userUpdateParamsSchema,
  userUpdateBodySchema,
  userDeleteParamsSchema,
} from "@/schema/userSchema";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router
  .route("/:userId")
  .get(validateData(getUserParamsSchema, undefined), authMiddleware, getUser)
  .post(
    validateData(userUpdateParamsSchema, userUpdateBodySchema),
    authMiddleware,
    updateUser
  )
  .delete(
    validateData(userDeleteParamsSchema, undefined),
    authMiddleware,
    deleteUser
  );

export default router;
