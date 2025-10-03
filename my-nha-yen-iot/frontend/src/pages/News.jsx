import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const res = await api("/news");
      setNews(res);
    }
    fetchNews();
  }, []);

  return (
    <div className="space-y-3">
      <div className="text-xl font-semibold">Tin tức mô hình Nhà Yến</div>
      <div className="grid md:grid-cols-3 gap-4">
        {news.map((n) => (
          <article key={n.id} className="card p-4">
            <div className="text-sm text-slate-500">
              {new Date(n.ts).toLocaleDateString("vi-VN")}
            </div>
            <div className="font-semibold mt-1">{n.title}</div>
            <p className="text-sm text-slate-600 mt-2">{n.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
