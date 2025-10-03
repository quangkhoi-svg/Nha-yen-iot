import React from "react";
import { Link, NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Trang chủ" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/devices", label: "Thiết bị" },
  { to: "/alerts", label: "Cảnh báo" },
  { to: "/news", label: "Tin tức" },
  { to: "/about", label: "Giới thiệu" },
];

export default function Header({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold shadow">
            NY
          </div>
          <span className="font-semibold">Nhà Yến IoT</span>
        </Link>
        <nav className="flex gap-2 items-center">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm ${
                  isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}

          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <span className="text-sm text-gray-700">👤 {user.name}</span>
              <button
                onClick={onLogout}
                className="px-3 py-1 rounded bg-red-500 text-white text-sm"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-3 py-2 rounded-md bg-slate-900 text-white text-sm"
            >
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
