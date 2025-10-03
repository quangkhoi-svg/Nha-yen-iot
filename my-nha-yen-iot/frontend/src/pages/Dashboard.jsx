import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ChartRealtime from "../components/ChartRealtime";
import { api } from "../api/api";

export default function Dashboard() {
  const [tele, setTele] = useState({ temp: 0, hum: 0, lux: 0 });

  useEffect(() => {
    async function fetchData() {
      const res = await api("/telemetry/latest");
      if (res && !res.error) setTele(res);
    }
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: "🌡️ Nhiệt độ", value: `${tele.temp} °C`, color: "from-rose-500 to-pink-500" },
    { label: "💧 Độ ẩm", value: `${tele.hum} %`, color: "from-sky-500 to-indigo-500" },
    { label: "💡 Ánh sáng", value: `${tele.lux} lx`, color: "from-emerald-500 to-lime-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`p-6 rounded-2xl shadow-xl text-white bg-gradient-to-br ${c.color}`}
          >
            <div className="text-sm opacity-80">{c.label}</div>
            <div className="text-3xl font-bold mt-2">{c.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Biểu đồ realtime */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ChartRealtime label="📊 Dữ liệu cảm biến realtime" />
      </motion.div>

      {/* Điều khiển nhanh */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="card p-6 shadow-md rounded-xl bg-white"
      >
        <div className="font-semibold mb-3">⚡ Điều khiển nhanh</div>
        <div className="grid sm:grid-cols-3 gap-3">
          {["Bật quạt", "Tắt quạt", "Phun sương 30s"].map((c, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 rounded-lg border bg-slate-50 hover:bg-slate-100 text-sm shadow"
              onClick={() => {
                api("/devices/<id-thiet-bi>/command", {
                  method: "POST",
                  body: JSON.stringify({ cmd: c }),
                }).then((res) => console.log("Executed:", res));
              }}
            >
              {c}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
