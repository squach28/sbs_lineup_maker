import express from "express";
import { authRouter } from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ healthy: true });
  return;
});

app.listen(3000, () => {
  console.log(`listening on port ${PORT}`);
});
