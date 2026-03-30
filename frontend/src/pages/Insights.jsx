import { weeklyData, computeHealthScore } from "../data/dummyData";

const Insights = () => {
  const avgStats = {
    sleep: weeklyData.reduce((a, v) => a + v.sleep, 0) / weeklyData.length,
    steps: weeklyData.reduce((a, v) => a + v.steps, 0) / weeklyData.length,
    calories:
      weeklyData.reduce((a, v) => a + v.calories, 0) / weeklyData.length,
    water: weeklyData.reduce((a, v) => a + v.water, 0) / weeklyData.length,
  };

  const riskScore = computeHealthScore(avgStats);

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Health Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg font-semibold">Sleep Trend</h3>
            <p className="text-gray-300 mt-2">
              Average sleep: {avgStats.sleep.toFixed(1)}h/night. Keep it above
              7h for better recovery.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg font-semibold">Steps Trend</h3>
            <p className="text-gray-300 mt-2">
              Average steps: {Math.round(avgStats.steps)} per day. Aim 10,000
              daily for strong cardio.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg font-semibold">Calories</h3>
            <p className="text-gray-300 mt-2">
              Average calories: {Math.round(avgStats.calories)} kcal. Balanced
              energy supports consistency.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg font-semibold">AI Risk Score</h3>
            <p className="text-gray-300 mt-2">
              Computed risk index: {riskScore} / 100.
            </p>
          </div>
        </div>

        <div className="mt-6 p-5 bg-[#111827] rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-2">AI Prediction</h3>
          <p className="text-gray-300">
            Based on your time-series trend, a 5% daily increase in step count
            can raise your health score by around 10 in the next 5 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
