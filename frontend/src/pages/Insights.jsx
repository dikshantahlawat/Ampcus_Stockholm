import { useEffect, useState } from "react";
import api from "../utils/api";

const Insights = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/activity");
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const validLogs = logs
    .filter(
      (item) =>
        item.sleep >= 4 &&
        item.steps >= 500 &&
        item.calories >= 500 &&
        item.water >= 1
    )
    .slice(0, 7); 

  const avgStats =
    validLogs.length > 0
      ? {
          sleep:
            validLogs.reduce((a, v) => a + v.sleep, 0) /
            validLogs.length,
          steps:
            validLogs.reduce((a, v) => a + v.steps, 0) /
            validLogs.length,
          calories:
            validLogs.reduce((a, v) => a + v.calories, 0) /
            validLogs.length,
          water:
            validLogs.reduce((a, v) => a + v.water, 0) /
            validLogs.length,
        }
      : { sleep: 0, steps: 0, calories: 0, water: 0 };

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

  const riskScore = computeHealthScore(avgStats);

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Health Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-lg font-semibold">Sleep Trend</h3>
            <p className="text-gray-300 mt-2">
              Average sleep: {avgStats.sleep.toFixed(1)}h/night
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-lg font-semibold">Steps Trend</h3>
            <p className="text-gray-300 mt-2">
              Average steps: {Math.round(avgStats.steps)}
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-lg font-semibold">Calories</h3>
            <p className="text-gray-300 mt-2">
              Average calories: {Math.round(avgStats.calories)}
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-lg font-semibold">AI Risk Score</h3>
            <p className="text-gray-300 mt-2">
              {riskScore} / 100
            </p>
          </div>
        </div>

        <div className="mt-6 p-5 bg-[#111827] rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-2">AI Prediction</h3>

          {validLogs.length > 0 ? (
            <p className="text-gray-300">
              Increasing daily steps by 5–10% can improve your health score.
            </p>
          ) : (
            <p className="text-gray-400">
              Start logging activity to see insights.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;