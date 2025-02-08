import { z } from "zod";

export const getUserParamsSchema = z.object({
  userId: z.string().optional(),
});

export const userUpdateParamsSchema = z.object({
  userId: z.string(),
});

export const userUpdateBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  totalAverageWeightRatings: z.number(),
  numberOfRents: z.number(),
  recentlyActive: z.number(),
});

export const userDeleteParamsSchema = z.object({
  userId: z.string(),
});
