import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";   // 👉 dùng model Mongoose

const router = express.Router();

// ---- REGISTER ----
router.post("/register", async (req, res) => {
  const { username, password, name } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Thiếu username hoặc password" });
  }

  try {
    // kiểm tra trùng
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ error: "Tài khoản đã tồn tại" });
    }

    // tạo user mới
    const newUser = await User.create({
      username,
      password, // ⚠️ demo: plain text, thực tế nên hash bằng bcrypt
      name: name || username,
    });

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: newUser._id, name: newUser.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server khi đăng ký" });
  }
});

// ---- LOGIN ----
router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server khi đăng nhập" });
  }
});

export default router;
