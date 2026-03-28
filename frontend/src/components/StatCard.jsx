import React from "react";

const StatCard = ({ icon, label, value, unit, color }) => {
  return (
    <div className="bg-[#111827] p-4 rounded-xl border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl">{icon}</span>
      </div>

      <h2 className="text-2xl font-bold" style={{ color }}>
        {value} <span className="text-sm text-gray-400">{unit}</span>
      </h2>

      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
};

export default StatCard;