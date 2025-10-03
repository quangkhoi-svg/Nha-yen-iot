import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  name: String,
  type: String,
  online: { type: Boolean, default: false },
}, { timestamps: true });

const Device = mongoose.model("Device", deviceSchema);
export default Device;