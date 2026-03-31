import { useEffect, useState } from "react";

const Footer = () => {
  const [summary, setSummary] = useState({
    steps: 7200,
    sleep: 7,
    water: 2,
  });

  const [insight, setInsight] = useState("");

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("logs")) || [];

    if (logs.length > 0) {
      const latest = logs[0];

      setSummary({
        steps: latest.steps,
        sleep: latest.sleep,
        water: latest.water,
      });

      if (latest.sleep < 6) {
        setInsight("Improve your sleep for better recovery.");
      } else if (latest.steps < 5000) {
        setInsight("Increase your daily steps to stay active.");
      } else if (latest.water < 2) {
        setInsight("Drink more water to stay hydrated.");
      } else {
        setInsight("Great job! You are maintaining a healthy routine.");
      }
    } else {
      setInsight("Start logging your activity to get insights.");
    }
  }, []);

  return (
    <footer className="w-full bg-white/5 border-t border-white/10 mt-6">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span className="text-white font-semibold text-lg">BioSync</span>
            </div>

            <p className="text-gray-400 text-sm max-w-sm">
              A personal health intelligence system that tracks your daily
              activities and provides AI-based insights for better lifestyle decisions.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-3">
              Core Features
            </p>

            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Daily Activity Logging</li>
              <li>• Health Score Calculation</li>
              <li>• Trend Analysis Dashboard</li>
              <li>• AI Risk Prediction</li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2">Today’s Summary</p>

            <div className="text-sm text-gray-300 space-y-1 mb-3">
              <p>
                Steps: <span className="text-white">{summary.steps}</span>
              </p>
              <p>
                Sleep: <span className="text-white">{summary.sleep}h</span>
              </p>
              <p>
                Water: <span className="text-white">{summary.water}L</span>
              </p>
            </div>

            <p className="text-xs text-gray-500 mb-1">AI Insight</p>
            <p className="text-sm text-gray-300">
              {insight}
            </p>
          </div>

        </div>

        <div className="border-t border-white/10 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} BioSync · Personal Health Intelligence System
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;