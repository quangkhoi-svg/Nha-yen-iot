import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ChartRealtime({ label = "Telemetry" }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Kết nối tới API stream
    const evtSource = new EventSource("http://localhost:4000/api/telemetry/stream");

    evtSource.onmessage = (e) => {
      try {
        const json = JSON.parse(e.data);
        if (json && json.temp) {
          setData((prev) => [
            ...prev.slice(-19), // giữ lại 20 điểm gần nhất
            {
              t: new Date(json.ts).toLocaleTimeString(),
              temp: json.temp,
              hum: json.hum,
              lux: json.lux,
            },
          ]);
        }
      } catch (err) {
        console.error("Lỗi parse dữ liệu SSE:", err);
      }
    };

    return () => evtSource.close();
  }, []);

  return (
    <div className="card p-4">
      <div className="font-semibold mb-2">Biểu đồ thời gian thực</div>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" dot={false} stroke="#f87171" name="Nhiệt độ (°C)" />
            <Line type="monotone" dataKey="hum" dot={false} stroke="#60a5fa" name="Độ ẩm (%)" />
            <Line type="monotone" dataKey="lux" dot={false} stroke="#34d399" name="Ánh sáng (lx)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-slate-500 mt-2">{label}</div>
    </div>
  );
}
