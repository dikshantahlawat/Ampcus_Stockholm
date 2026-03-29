import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ScoreRing from "../components/ScoreRing";
import TrendChart from "../components/TrendChart";

import { Footprints, Moon, Flame, Droplets } from "lucide-react";

import {
  weeklyData,
  todayStats,
  computeHealthScore,
} from "../data/dummyData";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(saved); 
  }, []);

  const todayStatsFromLogs = logs.length > 0 ? logs[0] : todayStats;
  const score = computeHealthScore(todayStatsFromLogs);

  const chartData = logs.length >= 7 ? logs.slice(0, 7).reverse() : weeklyData;

  const latestThree = chartData.slice(-3);

  const predictedStepsAvg = Math.round(
    latestThree.reduce((sum, item) => sum + item.steps, 0) /
      latestThree.length
  );

  const predictedScore = computeHealthScore({
    sleep:
      latestThree.reduce((s, i) => s + i.sleep, 0) /
      latestThree.length,
    steps: predictedStepsAvg,
    calories:
      latestThree.reduce((s, i) => s + i.calories, 0) /
      latestThree.length,
    water:
      latestThree.reduce((s, i) => s + i.water, 0) /
      latestThree.length,
  });

  return (
    <div className="flex flex-col md:flex-row bg-[#0B0F19] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">

        <h1 className="text-2xl font-semibold mb-6">
          Welcome back
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <StatCard
            icon={<Footprints size={18} />}
            label="Steps"
            value={todayStatsFromLogs.steps}
            color="#00E5FF"
          />

          <StatCard
            icon={<Moon size={18} />}
            label="Sleep"
            value={todayStatsFromLogs.sleep}
            unit="h"
            color="#7C3AED"
          />

          <StatCard
            icon={<Flame size={18} />}
            label="Calories"
            value={todayStatsFromLogs.calories}
            color="#22c55e"
          />

          <StatCard
            icon={<Droplets size={18} />}
            label="Water"
            value={todayStatsFromLogs.water}
            unit="L"
            color="#3b82f6"
          />

        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

         
          <div className="lg:col-span-2">
            <TrendChart data={chartData} />
          </div>

       
          <div className="space-y-4">

           
            <div className="bg-[#111827] p-4 rounded-xl border border-white/10 flex items-center justify-center">
              <ScoreRing score={score} />
            </div>

           
            <div className="bg-[#111827] p-4 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-2">
                Trend summary
              </h3>

              <p className="text-sm text-gray-300">
                Estimated steps for tomorrow:{" "}
                <span className="text-white font-medium">
                  {predictedStepsAvg}
                </span>
              </p>

              <p className="text-sm text-gray-300 mt-1">
                Expected health score:{" "}
                <span className="text-white font-medium">
                  {predictedScore}
                </span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;