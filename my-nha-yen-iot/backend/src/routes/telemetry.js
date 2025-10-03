import express from "express";
import Telemetry from "../models/Telemetry.js";

const router = express.Router();

// Lấy dữ liệu mới nhất
router.get("/latest", async (req, res) => {
  try {
    const latest = await Telemetry.findOne().sort({ ts: -1 });
    res.json(latest || {});
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi lấy dữ liệu" });
  }
});

// Thêm dữ liệu telemetry
router.post("/ingest", async (req, res) => {
  try {
    const { deviceId, temp, hum, lux, ts } = req.body;
    const telemetry = await Telemetry.create({
      deviceId,
      temp,
      hum,
      lux,
      ts: ts || Date.now()
    });
    res.json({ ok: true, data: telemetry });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi lưu telemetry" });
  }
});

// Stream dữ liệu realtime bằng SSE
router.get("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const send = async () => {
    const latest = await Telemetry.findOne().sort({ ts: -1 });
    const payload = JSON.stringify(latest || {});
    res.write(`data: ${payload}\n\n`);
  };

  // gửi ngay khi kết nối
  await send();

  // gửi lại mỗi 2 giây
  const timer = setInterval(send, 2000);
  req.on("close", () => clearInterval(timer));
});

export default router;
