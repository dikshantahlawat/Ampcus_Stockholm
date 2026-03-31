import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from "express-fileupload";   // 🔥 ADD THIS
import { connection } from "./database/db.js";
import UserRouter from './routes/UserRouter.js';
import activityRouter from "./routes/activityRouter.js";

const app = express();
config({ path: "./.env" });

// ✅ CORS
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

// 🔥 FILE UPLOAD MIDDLEWARE (VERY IMPORTANT)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROUTES
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/activity", activityRouter);

// ✅ DB CONNECT
connection();

export default app;