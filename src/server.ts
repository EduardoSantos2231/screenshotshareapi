import express from "express";
import "dotenv/config";
const app = express();
import cors from "cors";
import { uploadsRouter } from "./routes/uploads.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./configs/redisConfigs.js";
import { cleanupJob } from "./jobs/cronDeleteExpItem.js";

const port = process.env.PORT || 5000;
const apiUrl = process.env.APP_API_URL;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

app.get("/", (_, res) => {
  return res.json(process.env.NODE_ENV);
});

app.use("/uploads", uploadsRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("---------------");

  console.info(`O servidor está rodando na porta: ${port}`);
  console.info(`Link do servidor: ${apiUrl}`);
  cleanupJob();
});
