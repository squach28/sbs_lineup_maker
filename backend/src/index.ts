import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authRouter } from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ healthy: true });
  return;
});

app.listen(3000, () => {
  console.log(`listening on port ${PORT}`);
});
