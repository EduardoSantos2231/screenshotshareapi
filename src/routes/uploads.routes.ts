import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../configs/upload.js";
import type { Request, Response } from "express";

export const uploadsRouter = Router();

const upload = multer(multerConfig);

uploadsRouter.post(
  "/",
  upload.single("image"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: "Nenhum arquivo enviado." });
      return;
    }
    const { filename, path, size } = req.file;
    res.status(201).json({
      message: "Upload realizado com sucesso!",
      file: {
        filename,
        path,
        size,
      },
    });
  },
);
