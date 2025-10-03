// backend/src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }  // ⚠️ nên hash khi làm thật
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
