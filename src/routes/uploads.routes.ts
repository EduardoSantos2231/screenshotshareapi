import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../configs/uploadConfigs.js";
import type { Request, Response } from "express";
import z from "zod";
import { createUploadService } from "../services/createUploadService.js";
import { getUploadService } from "../services/getUploadService.js";

export const uploadsRouter = Router();

const upload = multer(multerConfig);

uploadsRouter.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    if (!req.file) return;
    const result = await createUploadService(req.file);
    return res.status(201).json(result);
  },
);

uploadsRouter.get("/:hash", async (req: Request, res: Response) => {
  const zodSchema = z.object({
    hash: z.string().length(8, "codigo inválido"),
  });

  const { hash } = zodSchema.parse(req.params);
  const fileData = await getUploadService(hash);
  return res.redirect(fileData.remoteUrl);
});
