import React from "react";

export default function DeviceCard({ device, selected, onClick }) {
  const online = device.online;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 rounded-xl shadow-md transition 
        ${selected ? "ring-2 ring-sky-400" : ""}
        ${
          online
            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
            : "bg-slate-200 text-slate-500"
        }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{device.name}</div>
          <div className="text-xs opacity-80">
            {device.type} • {online ? "Online" : "Offline"}
          </div>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-md ${
            online ? "bg-white/30" : "bg-slate-400 text-white"
          }`}
        >
          {device.id}
        </span>
      </div>
    </button>
  );
}
