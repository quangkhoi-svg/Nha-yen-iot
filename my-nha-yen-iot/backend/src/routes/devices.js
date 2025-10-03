import express from "express";
import Device from "../models/Device.js";  // 👉 model mongoose

const router = express.Router();

// Lấy danh sách tất cả thiết bị
router.get("/", async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi lấy danh sách thiết bị" });
  }
});

// Lấy thông tin chi tiết 1 thiết bị
router.get("/:id", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ error: "Không tìm thấy thiết bị" });
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi lấy thiết bị" });
  }
});

// Tạo thiết bị mới
router.post("/", async (req, res) => {
  try {
    const { name, type, online } = req.body;
    const device = await Device.create({ name, type, online });
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi tạo thiết bị" });
  }
});

// Gửi lệnh tới thiết bị
router.post("/:id/command", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ error: "Không tìm thấy thiết bị" });
    const { cmd } = req.body || {};
    // ⚠️ demo: chỉ giả lập trả kết quả
    res.json({ ok: true, device, executed: cmd || "noop" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi gửi lệnh" });
  }
});

export default router;
