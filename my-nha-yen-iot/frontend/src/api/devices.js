import React, { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import { api } from "../api/api";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [selected, setSelected] = useState(null);

  // Lấy danh sách thiết bị từ backend khi mở trang
  useEffect(() => {
    async function fetchDevices() {
      const res = await api("/devices");
      setDevices(res);
      if (res.length > 0) setSelected(res[0]);
    }
    fetchDevices();
  }, []);

  // Hàm gửi lệnh điều khiển nhanh tới thiết bị
  async function sendCommand(id, cmd) {
    const res = await api(`/devices/${id}/command`, {
      method: "POST",
      body: JSON.stringify({ cmd }),
    });
    console.log("Executed:", res);
    alert(`Đã gửi lệnh: ${cmd} → ${id}`);
  }

  return (
    <div className="grid md:grid-cols-12 gap-4">
      {/* Sidebar danh sách thiết bị */}
      <aside className="md:col-span-4 space-y-3">
        {devices.map((d) => (
          <DeviceCard key={d.id} device={d} onClick={() => setSelected(d)} />
        ))}
      </aside>

      {/* Panel chi tiết thiết bị */}
      {selected && (
        <section className="md:col-span-8 card p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xl font-semibold">{selected.name}</div>
              <div className="text-sm text-slate-500">
                ID: {selected.id} • {selected.type}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded-md border"
                onClick={() => sendCommand(selected.id, "Reboot")}
              >
                Reboot
              </button>
              <button
                className="px-3 py-1 rounded-md bg-emerald-600 text-white"
                onClick={() => sendCommand(selected.id, "Toggle")}
              >
                Toggle
              </button>
            </div>
          </div>

          {/* Hiện thông tin cảm biến (giả lập từ backend) */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[{ k: "Temp", v: "28.5 °C" }, { k: "Hum", v: "76 %" }, { k: "Lux", v: "120 lx" }].map(
              (i, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="text-xs text-slate-500">{i.k}</div>
                  <div className="text-2xl font-bold">{i.v}</div>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}
