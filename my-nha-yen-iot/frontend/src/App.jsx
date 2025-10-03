import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Alerts from "./pages/Alerts";
import News from "./pages/News";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast"; 

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Khi load lại trang, nếu có token thì fetch user từ backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      fetch("http://localhost:4000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setUser(data);
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header
        user={user}
        onLogout={() => {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Dashboard, Devices, Alerts, News chỉ truy cập được khi login */}
          <Route
            path="/dashboard"
            element={
              user ? <Dashboard /> : <Navigate to="/login" state={{ from: location }} replace />
            }
          />
          <Route
            path="/devices"
            element={
              user ? <Devices /> : <Navigate to="/login" state={{ from: location }} replace />
            }
          />
          <Route
            path="/alerts"
            element={
              user ? <Alerts /> : <Navigate to="/login" state={{ from: location }} replace />
            }
          />
          <Route
            path="/news"
            element={
              user ? <News /> : <Navigate to="/login" state={{ from: location }} replace />
            }
          />

          <Route path="/about" element={<About />} />

          {/* Login */}
          <Route
            path="/login"
            element={
              <Login
                onLogin={(u) => {
                  setUser(u);
                  navigate("/dashboard");
                }}
              />
            }
          />

          {/* Register */}
          <Route
            path="/register"
            element={
              <Register
                onRegister={(u) => {
                  setUser(u);
                  navigate("/dashboard");
                }}
              />
            }
          />
        </Routes>
      </main>
      <Footer />

      {/* 👇 Toaster hiển thị toast notification */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
