import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero3D from "../components/Hero3D"; // vẫn giữ mô hình 3D của bạn

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl">
        <div className="grid md:grid-cols-2 items-stretch">
          {/* Text intro */}
          <div className="p-10 flex flex-col justify-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Nhà Yến IoT — Giám sát & điều khiển từ xa
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, delay: 0.1 }}
              className="opacity-90 text-lg"
            >
              Theo dõi nhiệt độ, độ ẩm, ánh sáng và điều khiển quạt, phun sương,
              loa bẫy… mọi lúc, mọi nơi.
            </motion.p>
            <div className="flex gap-4 pt-2">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-lg hover:scale-105 transition"
              >
                Xem Dashboard
              </Link>
              <Link
                to="/devices"
                className="px-6 py-3 rounded-xl border border-white text-white shadow hover:scale-105 transition"
              >
                Danh sách thiết bị
              </Link>
            </div>
          </div>

          {/* Hero 3D */}
          <div className="h-[380px] bg-white/10">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          { t: "Giám sát realtime", d: "Cập nhật dữ liệu thiết bị tức thời." },
          { t: "Điều khiển an toàn", d: "Bật/tắt, hẹn giờ theo kịch bản." },
          { t: "Cảnh báo thông minh", d: "Nhiệt độ/độ ẩm vượt ngưỡng sẽ báo ngay." },
        ].map((i, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="card p-6 rounded-2xl shadow-lg bg-white"
          >
            <div className="text-lg font-semibold">{i.t}</div>
            <div className="text-slate-600 mt-2 text-sm">{i.d}</div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
