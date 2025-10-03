import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

// Lấy danh sách cảnh báo, mới nhất trước
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ ts: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi lấy cảnh báo" });
  }
});

// Thêm cảnh báo mới
router.post("/", async (req, res) => {
  try {
    const { level, msg } = req.body || {};
    if (!msg) return res.status(400).json({ error: "Thiếu nội dung cảnh báo" });

    const alert = await Alert.create({ level, msg });
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi tạo cảnh báo" });
  }
});

export default router;
