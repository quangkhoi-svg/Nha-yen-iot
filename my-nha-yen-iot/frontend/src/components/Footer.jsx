import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-3">
        <div>© {new Date().getFullYear()} Nhà Yến IoT. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#">Điều khoản</a>
          <a href="#">Chính sách</a>
          <a href="#">Liên hệ</a>
        </div>
      </div>
    </footer>
  );
}
