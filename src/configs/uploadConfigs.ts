import multer from "multer";
import type { Options } from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TMP_FOLDER = path.resolve(__dirname, "../..", "tmp", "uploads");

export const UPLOADS_FOLDER = TMP_FOLDER;

export const multerConfig: Options = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb,
  },
  fileFilter: (_, file, callback) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) return callback(null, true);
    return callback(new Error("Formato de imagem não permitido"));
  },
};
