import { nanoid } from "nanoid";

export const users = [
  { id: "u1", name: "Operator", username: "admin", password: "admin" }
];

export const devices = [
  { id: "dev-1", name: "DHT22 Tầng 1", type: "DHT22", online: true },
  { id: "dev-2", name: "LDR Lối vào", type: "LDR", online: true },
  { id: "dev-3", name: "Relay Quạt", type: "Relay", online: false },
  { id: "dev-4", name: "ESP32-CAM", type: "Camera", online: true }
];

export const telemetry = {
  latest: { temp: 28.5, hum: 76, lux: 120, ts: Date.now() }
};

export const alerts = [
  { id: nanoid(), ts: Date.now() - 60000, level: "high", msg: "Temp > 40°C tại dev-3" },
  { id: nanoid(), ts: Date.now() - 360000, level: "medium", msg: "Độ ẩm < 60% tại dev-1" }
];

export const news = [
  { id: nanoid(), ts: Date.now(), title: "Cập nhật #1", body: "Nội dung mẫu… sau này sẽ fetch tin từ API." },
  { id: nanoid(), ts: Date.now(), title: "Cập nhật #2", body: "Thêm thiết bị ESP32-CAM ở lối vào." },
  { id: nanoid(), ts: Date.now(), title: "Cập nhật #3", body: "Cải thiện rule cảnh báo độ ẩm." }
];
