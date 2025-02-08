import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    await admin.auth().verifyIdToken(token);
    next();
  } catch (_) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
