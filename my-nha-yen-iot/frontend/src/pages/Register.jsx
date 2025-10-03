import React from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";   // 👉 thêm Link

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    const name = data.get("name");

    try {
      const res = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password, name }),
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        onRegister?.(res.user);
        alert("Đăng ký thành công ✅");
        navigate("/dashboard", { replace: true });
      } else {
        alert(res.error || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Không thể kết nối tới server");
    }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <div className="text-xl font-semibold mb-2">Đăng ký tài khoản</div>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-sm">Tên hiển thị</label>
          <input
            name="name"
            className="mt-1 w-full border rounded-md px-3 py-2"
            placeholder="Tên của bạn"
            required
          />
        </div>
        <div>
          <label className="text-sm">Tài khoản</label>
          <input
            name="username"
            className="mt-1 w-full border rounded-md px-3 py-2"
            placeholder="username"
            required
          />
        </div>
        <div>
          <label className="text-sm">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="mt-1 w-full border rounded-md px-3 py-2"
            placeholder="••••••"
            required
          />
        </div>
        <button className="px-4 py-2 rounded-md bg-emerald-600 text-white w-full">
          Đăng ký
        </button>
      </form>

      {/* 👉 Link quay lại Login */}
      <p className="text-sm text-center mt-4">
        Đã có tài khoản?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
