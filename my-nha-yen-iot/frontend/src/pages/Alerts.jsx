import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchAlerts() {
      const res = await api("/alerts");
      setAlerts(res);
    }
    fetchAlerts();

    // auto refresh mỗi 10s
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-4">
      <div className="font-semibold mb-3">Cảnh báo</div>
      <div className="space-y-2">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`p-3 rounded-md border-l-4 ${
              a.level === "high"
                ? "border-red-500 bg-red-50"
                : "border-amber-400 bg-amber-50"
            }`}
          >
            <div className="text-sm">{a.msg}</div>
            <div className="text-xs text-slate-500">
              {new Date(a.ts).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
