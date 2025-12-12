import { Redis } from "ioredis";

if (!process.env.REDIS_URL) {
  throw new Error(
    "Erro ao conectar ao redis, verifique as variáveis de ambiente",
  );
}

export const client = new Redis(process.env.REDIS_URL);

client.on("connect", () => {
  console.log("---------------");
  console.log("Conectado ao Redis");
});

client.on("error", (err) => {
  console.log("---------------");
  console.log("ERRO na conexão com o Redis", err);
});
