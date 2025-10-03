import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";   // 👉 thêm Link

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const username = data.get("username") || "admin";
    const password = data.get("password") || "admin";

    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        onLogin?.(res.user);
        alert("Đăng nhập thành công ✅");
        navigate("/dashboard", { replace: true });
      } else {
        alert(res.error || "Đăng nhập thất bại!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Không thể kết nối tới server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <div className="text-xl font-semibold mb-2">Đăng nhập</div>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-sm">Tài khoản</label>
          <input
            name="username"
            className="mt-1 w-full border rounded-md px-3 py-2"
            placeholder="admin"
          />
        </div>
        <div>
          <label className="text-sm">Mật khẩu</label>
          <input
            name="password"
            type="password"
            className="mt-1 w-full border rounded-md px-3 py-2"
            placeholder="••••••"
          />
        </div>
        <button
          className="px-4 py-2 rounded-md bg-slate-900 text-white w-full"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      {/* 👉 Link sang trang Đăng ký */}
      <p className="text-sm text-center mt-4">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
