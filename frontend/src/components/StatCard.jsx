import React from "react";

const StatCard = ({ icon, label, value, unit, color }) => {
  return (
    <div className="bg-[#111827] p-4 rounded-xl border border-white/10 hover:bg-white/10 transition duration-200">

      <div className="flex items-center justify-between mb-3">
        <div className="text-[#00E5FF] opacity-90">
          {icon}
        </div>
      </div>

      <h2 className="text-2xl font-semibold tracking-wide" style={{ color }}>
        {value}
        {unit && (
          <span className="text-sm text-gray-400 ml-1">
            {unit}
          </span>
        )}
      </h2>

      <p className="text-gray-400 text-sm mt-1">
        {label}
      </p>

    </div>
  );
};

export default StatCard;