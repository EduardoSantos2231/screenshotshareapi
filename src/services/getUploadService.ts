import { client } from "../configs/redisConfigs.js";
import { AppError } from "../utils/AppError.js";

interface FileMetadata {
  originalName: string;
  remoteUrl: string;
  storagePath: string;
  mimeType: string;
}

export const getUploadService = async (
  publicId: string,
): Promise<FileMetadata> => {
  const data = await client.get(publicId);

  if (!data) {
    throw new AppError("Imagem não encontrada ou expirada.", 404);
  }

  return JSON.parse(data) as FileMetadata;
};
