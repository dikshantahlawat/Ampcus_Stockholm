import React from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ScoreRing from "../components/ScoreRing";
import TrendChart from "../components/TrendChart";

import {
  weeklyData,
  todayStats,
  computeHealthScore,
} from "../data/dummyData";

const Dashboard = () => {
  const score = computeHealthScore(todayStats);

  const latestThree = weeklyData.slice(-3);
  const predictedStepsAvg = Math.round(
    latestThree.reduce((sum, item) => sum + item.steps, 0) / latestThree.length
  );

  const predictedScore = computeHealthScore({
    sleep: latestThree.reduce((s, i) => s + i.sleep, 0) / latestThree.length,
    steps: predictedStepsAvg,
    calories: latestThree.reduce((s, i) => s + i.calories, 0) / latestThree.length,
    water: latestThree.reduce((s, i) => s + i.water, 0) / latestThree.length,
  });

  return (
    <div className="flex flex-col md:flex-row bg-[#0B0F19] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">
          Good Morning 👋
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <StatCard icon="👟" label="Steps" value={todayStats.steps} color="#00E5FF" />
          <StatCard icon="😴" label="Sleep" value={todayStats.sleep} unit="h" color="#7C3AED" />
          <StatCard icon="🔥" label="Calories" value={todayStats.calories} color="#22c55e" />
          <StatCard icon="💧" label="Water" value={todayStats.water} unit="L" color="#3b82f6" />
        </div>

        {/* CHART + SCORE / PREDICTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TrendChart data={weeklyData} />
          </div>

          <div className="space-y-4">
            <div className="bg-[#111827] p-4 rounded-xl border border-white/10 flex items-center justify-center">
              <ScoreRing score={score} />
            </div>

            <div className="bg-[#111827] p-4 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-2">AI Trend Forecast</h3>
              <p className="text-sm text-gray-300">Predicted steps (next day): {predictedStepsAvg} </p>
              <p className="text-sm text-gray-300">Predicted health score: {predictedScore}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;