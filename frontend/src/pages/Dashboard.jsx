import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import ScoreRing from "../components/ScoreRing";
import TrendChart from "../components/TrendChart";
import Footer from "../components/Footer";
import api from "../utils/api";

import { Footprints, Moon, Flame, Droplets } from "lucide-react";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/activity");
      setLogs(res.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  const todayStats = logs.length > 0 ? logs[0] : {};

  const computeHealthScore = (data) => {
    if (!data) return 0;

    let sleepScore = Math.min(100, (data.sleep / 8) * 100);
    let stepScore = Math.min(100, (data.steps / 10000) * 100);
    let calorieScore = Math.min(100, (data.calories / 2000) * 100);
    let waterScore = Math.min(100, (data.water / 3) * 100);

    const finalScore =
      sleepScore * 0.25 +
      stepScore * 0.35 +
      calorieScore * 0.2 +
      waterScore * 0.2;

    return Math.round(finalScore);
  };

  const score = computeHealthScore(todayStats);

  const chartData = logs
    .filter(
      (item) =>
        item.sleep >= 4 &&
        item.steps >= 500 &&
        item.calories >= 500 &&
        item.water >= 1,
    )
    .slice(0, 7)
    .reverse();

  const safeAvg = (arr, key) =>
    arr.length > 0
      ? arr.reduce((sum, item) => sum + item[key], 0) / arr.length
      : 0;

  const latestThree = logs.slice(0, 3);

  const predictedStepsAvg = Math.round(safeAvg(latestThree, "steps"));

  const predictedScore = computeHealthScore({
    sleep: safeAvg(latestThree, "sleep"),
    steps: predictedStepsAvg,
    calories: safeAvg(latestThree, "calories"),
    water: safeAvg(latestThree, "water"),
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Footprints size={18} />}
            label="Steps"
            value={todayStats.steps || 0}
            color="#00E5FF"
          />

          <StatCard
            icon={<Moon size={18} />}
            label="Sleep"
            value={todayStats.sleep || 0}
            unit="h"
            color="#7C3AED"
          />

          <StatCard
            icon={<Flame size={18} />}
            label="Calories"
            value={todayStats.calories || 0}
            color="#22c55e"
          />

          <StatCard
            icon={<Droplets size={18} />}
            label="Water"
            value={todayStats.water || 0}
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
              <h3 className="text-lg font-semibold mb-2">Trend summary</h3>

              <p className="text-sm text-gray-300">
                Estimated steps for tomorrow:{" "}
                <span className="text-white font-medium">
                  {predictedStepsAvg}
                </span>
              </p>

              <p className="text-sm text-gray-300 mt-1">
                Expected health score:{" "}
                <span className="text-white font-medium">{predictedScore}</span>
              </p>
            </div>
          </div>
        </div>

        {logs.length === 0 && (
          <p className="text-gray-400 mt-6 text-center">
            No activity data yet. Start logging your activity 🚀
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
