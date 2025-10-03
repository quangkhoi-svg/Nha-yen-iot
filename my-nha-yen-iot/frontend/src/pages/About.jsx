import React from "react";

export default function About() {
  return (
    <div className="card p-5">
      <div className="text-xl font-semibold">Giới thiệu</div>
      <p className="text-slate-600 mt-2">
        Dự án Nhà Yến IoT cho phép giám sát & điều khiển thiết bị trong mô hình
        nhà yến theo thời gian thực. Frontend xây dựng bằng React, hiệu ứng 3D
        với Three.js, biểu đồ realtime bằng Recharts. Bạn có thể kết nối tới
        backend (MQTT/REST/WebSocket) để lấy dữ liệu thực.
      </p>
    </div>
  );
}
