import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { connection } from "./database/db.js";
import activityRouter from "./routes/activityRouter.js";

const app = express();
config({ path: "./.env" });

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/activity", activityRouter);
app.get("/api/v1/health", (_, res) => {
  res.status(200).json({ ok: true, service: "biosync-backend" });
});


connection();

export default app;