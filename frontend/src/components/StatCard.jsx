const StatCard = ({ icon, label, value, unit, color }) => {
  return (
    <div className="bg-[#111827] p-5 rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition duration-300 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/5" style={{ color: color }}>
          {icon}
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-wide" style={{ color }}>
        {value || 0}
        {unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
      </h2>

      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
  );
};

export default StatCard;
