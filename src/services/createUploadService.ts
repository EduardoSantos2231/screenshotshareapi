import { client } from "../configs/redisConfigs.js";
import { supabaseClient } from "../configs/supabase.js";
import crypto from "node:crypto";
import sharp from "sharp";

type FileData = Express.Multer.File;

export const createUploadService = async (file: FileData) => {
  const publicId = crypto.randomBytes(4).toString("hex");

  const fileNameInBucket = `${publicId}-${Date.now()}.webp`;

  const optimizedBuffer = await sharp(file.buffer)
    .resize(1920)
    .webp({ quality: 80 })
    .toBuffer();

  const { data, error } = await supabaseClient.storage
    .from(process.env.SUPABASE_BUCKET || "images")
    .upload(fileNameInBucket, optimizedBuffer, {
      contentType: "image/webp",
    });

  console.info(file);
  if (error) {
    throw new Error(`Error: upload Supabase: ${error.message}`);
  }

  const { data: publicUrlData } = supabaseClient.storage
    .from(process.env.SUPABASE_BUCKET || "images")
    .getPublicUrl(fileNameInBucket);

  const finalPublicUrl = publicUrlData.publicUrl;

  const fileMetadata = {
    originalName: file.originalname,
    remoteUrl: finalPublicUrl,
    storagePath: fileNameInBucket,
    mimeType: file.mimetype,
  };

  await client.set(
    publicId,
    JSON.stringify(fileMetadata),
    "EX",
    86400, // 24h
  );

  return {
    publicId,
    shareUrl: `${process.env.APP_API_URL}/uploads/${publicId}`,
    expiresIn: "24 hours",
  };
};
