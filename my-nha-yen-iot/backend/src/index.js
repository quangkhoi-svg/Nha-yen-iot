import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db.js";   // 👉 import hàm connectDB

import authRoute from "./routes/auth.js";
import devicesRoute from "./routes/devices.js";
import telemetryRoute from "./routes/telemetry.js";
import alertsRoute from "./routes/alerts.js";
import newsRoute from "./routes/news.js";
import { auth } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 👉 Kết nối MongoDB
connectDB();

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, name: "Nhà Yến IoT API" }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/devices", auth, devicesRoute);
app.use("/api/telemetry", auth, telemetryRoute);
app.use("/api/alerts", auth, alertsRoute);
app.use("/api/news", auth, newsRoute);

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
