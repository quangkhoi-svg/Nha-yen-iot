import React, { useState } from "react";
import DeviceCard from "../components/DeviceCard";
import { api } from "../api/api";
import toast from "react-hot-toast";

const init = [
  { id: "dev-1", name: "DHT22 Tầng 1", type: "DHT22", online: true },
  { id: "dev-2", name: "LDR Lối vào", type: "LDR", online: true },
  { id: "dev-3", name: "Relay Quạt", type: "Relay", online: false },
  { id: "dev-4", name: "ESP32-CAM", type: "Camera", online: true },
];

export default function Devices() {
  const [devices] = useState(init);
  const [selected, setSelected] = useState(init[0]);

  const sendCommand = async (cmd) => {
    try {
      await api(`/devices/${selected.id}/command`, {
        method: "POST",
        body: JSON.stringify({ cmd }),
      });
      toast.success(`✅ ${cmd} tới ${selected.name}`);
    } catch {
      toast.error("❌ Không gửi được lệnh!");
    }
  };

  return (
    <div className="grid md:grid-cols-12 gap-6">
      {/* Sidebar danh sách thiết bị */}
      <aside className="md:col-span-4 space-y-4">
        {devices.map((d) => (
          <DeviceCard
            key={d.id}
            device={d}
            selected={selected.id === d.id}
            onClick={() => setSelected(d)}
          />
        ))}
      </aside>

      {/* Chi tiết thiết bị */}
      <section className="md:col-span-8 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{selected.name}</h2>
            <p className="text-sm text-slate-500">
              ID: {selected.id} • {selected.type}
            </p>
            <p className="text-sm mt-1">
              Trạng thái:{" "}
              {selected.online ? (
                <span className="text-emerald-600 font-medium">🟢 Online</span>
              ) : (
                <span className="text-red-600 font-medium">🔴 Offline</span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => sendCommand("reboot")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow hover:brightness-110"
            >
              Reboot
            </button>
            <button
              onClick={() => sendCommand("toggle")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow hover:brightness-110"
            >
              Toggle
            </button>
          </div>
        </div>

        {/* Cards dữ liệu */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md">
            <div className="text-sm opacity-80">🌡 Nhiệt độ</div>
            <div className="text-2xl font-bold">28.5 °C</div>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md">
            <div className="text-sm opacity-80">💧 Độ ẩm</div>
            <div className="text-2xl font-bold">76 %</div>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-md">
            <div className="text-sm opacity-80">💡 Ánh sáng</div>
            <div className="text-2xl font-bold">120 lx</div>
          </div>
        </div>
      </section>
    </div>
  );
}
