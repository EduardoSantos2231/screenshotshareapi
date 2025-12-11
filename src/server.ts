import express from "express";
import "dotenv/config";
const app = express();
import cors from "cors";
import { uploadsRouter } from "./routes/uploads.routes.js";

const port = process.env.PORT || 5000;
const apiUrl = process.env.APP_API_URL;

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.json(process.env.NODE_ENV);
});

app.use("/upload", uploadsRouter);

app.listen(3000, () => {
  console.log(`O servidor está rodando na porta: ${port}`);
  console.log(`Link do servidor: ${apiUrl}`);
});
