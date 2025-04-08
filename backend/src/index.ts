import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ healthy: true });
  return;
});

app.listen(3000, () => {
  console.log(`listening on port ${PORT}`);
});
