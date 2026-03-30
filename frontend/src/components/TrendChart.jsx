import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const TrendChart = ({ data }) => {
  return (
    <div className="bg-[#111827] p-4 rounded-xl border border-white/10">
      <h2 className="mb-3 font-semibold">Activity Trends</h2>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis dataKey="day" stroke="#64748b" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="steps"
            stroke="#00E5FF"
            fill="#00E5FF22"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
