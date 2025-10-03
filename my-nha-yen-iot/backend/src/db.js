// src/db.js
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected:", process.env.MONGO_URI);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // dừng server nếu lỗi DB
  }
}
