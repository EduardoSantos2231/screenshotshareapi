import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { ZodError } from "zod";
import { MulterError } from "multer";

export const errorHandler = (
  error: Error,
  _1: Request,
  res: Response,
  _: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof ZodError) {
    return res.status(400).json({ message: "validation error" });
  }
  if (error instanceof MulterError) {
    return res.status(400).json({
      message: error.message,
    });
  }
  console.error(error);

  return res.status(500).json({ message: "Internal server error" });
};
