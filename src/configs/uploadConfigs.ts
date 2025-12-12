import multer from "multer";
import type { Options } from "multer";

export const multerConfig: Options = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb,
  },
  fileFilter: (_, file, callback) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "image/webp",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) return callback(null, true);
    return callback(new Error("Formato de imagem não permitido"));
  },
};
