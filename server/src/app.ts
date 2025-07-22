import express, { Request, Response } from "express";
import router from "./routes";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

export default app;
