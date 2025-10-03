import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  level: { type: String, enum: ["low", "medium", "high"], default: "low" },
  msg: { type: String, required: true },
  ts: { type: Date, default: Date.now }
}, { timestamps: true });

const Alert = mongoose.model("Alert", alertSchema);
export default Alert;
