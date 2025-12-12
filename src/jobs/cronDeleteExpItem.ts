import cron from "node-cron";
import { supabaseClient } from "../configs/supabase.js";

const BUCKET_NAME = process.env.SUPABASE_BUCKET || "images";

export const cleanupJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("[Cleanup Job] Iniciando varredura no Supabase...");

    try {
      const { data: files, error } = await supabaseClient.storage
        .from(BUCKET_NAME)
        .list();

      if (error) {
        console.error("Erro ao listar arquivos:", error.message);
        return;
      }

      if (!files || files.length === 0) {
        console.log("Nenhum arquivo para verificar.");
        return;
      }

      const now = new Date().getTime();
      const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

      const filesToDelete: string[] = [];

      for (const file of files) {
        if (!file.created_at) continue;

        const fileDate = new Date(file.created_at).getTime();
        const fileAge = now - fileDate;

        if (fileAge > EXPIRATION_TIME) {
          filesToDelete.push(file.name);
        }
      }

      if (filesToDelete.length > 0) {
        const { error: deleteError } = await supabaseClient.storage
          .from(BUCKET_NAME)
          .remove(filesToDelete);

        if (deleteError) {
          console.error("Erro ao deletar arquivos:", deleteError.message);
        } else {
          console.log(
            `Limpeza concluída! ${filesToDelete.length} arquivos removidos da nuvem.`,
          );
        }
      } else {
        console.log("Nenhum arquivo expirado encontrado.");
      }
    } catch (err) {
      console.error("Falha crítica no Job:", err);
    }
  });

  console.log("⏰ Gari da Nuvem ativado.");
};
