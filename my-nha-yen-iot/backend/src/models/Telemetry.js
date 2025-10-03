import mongoose from "mongoose";

const telemetrySchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
  temp: Number,
  hum: Number,
  lux: Number,
  ts: { type: Date, default: Date.now },
}, { timestamps: true });

const Telemetry = mongoose.model("Telemetry", telemetrySchema);
export default Telemetry;
