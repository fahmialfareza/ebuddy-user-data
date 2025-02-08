import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { StatusCodes } from "http-status-codes";

// Enhanced middleware with dynamic type inference
export function validateData<
  ParamsSchema extends ZodTypeAny,
  BodySchema extends ZodTypeAny,
>(schemaParams?: ParamsSchema, schemaBody?: BodySchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schemaParams) {
        const validatedParams = schemaParams.parse(req.params);
        req.params = validatedParams;
      }
      if (schemaBody) {
        const validatedBody = schemaBody.parse(req.body);
        req.body = validatedBody;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
