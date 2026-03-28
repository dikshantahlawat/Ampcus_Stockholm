import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { computeHealthScore } from "../data/dummyData";

const Log = () => {

  // 🔹 Form state
  const [form, setForm] = useState({
    sleep: "",
    steps: "",
    calories: "",
    water: "",
    meal: "",
  });

  // 🔹 Image preview
  const [mealImage, setMealImage] = useState(null);

  // 🔹 Logs list
  const [logs, setLogs] = useState([]);

  // 🔹 Message
  const [message, setMessage] = useState("");

  // ✅ LOAD DATA FROM LOCAL STORAGE
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(saved);
  }, []);

  // 🔹 Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Image select
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMealImage(URL.createObjectURL(file));
    }
  };

  // 🔹 Drag & drop
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setMealImage(URL.createObjectURL(file));
    }
  };

  // 🔹 Save log
  const handleSaveLog = () => {
    if (!form.sleep || !form.steps || !form.calories || !form.water) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    const newEntry = {
      ...form,
      sleep: Number(form.sleep),
      steps: Number(form.steps),
      calories: Number(form.calories),
      water: Number(form.water),
      date: new Date().toLocaleDateString(),
      score: computeHealthScore({
        sleep: Number(form.sleep),
        steps: Number(form.steps),
        calories: Number(form.calories),
        water: Number(form.water),
      }),
    };

    // ✅ SAVE TO LOCAL STORAGE
    const updatedLogs = [newEntry, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem("logs", JSON.stringify(updatedLogs));

    setMessage(`✅ Saved! Health Score: ${newEntry.score}`);

    // auto hide message
    setTimeout(() => setMessage(""), 2000);

    // reset form
    setForm({
      sleep: "",
      steps: "",
      calories: "",
      water: "",
      meal: "",
    });

    setMealImage(null);
  };

  return (
    <div className="flex bg-[#0B0F19] text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">
          Log Daily Activity
        </h1>

        <div className="max-w-2xl space-y-4">

          <input
            name="sleep"
            placeholder="Sleep (hours)"
            value={form.sleep}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg"
          />

          <input
            name="steps"
            placeholder="Steps"
            value={form.steps}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg"
          />

          <input
            name="calories"
            placeholder="Calories"
            value={form.calories}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg"
          />

          <input
            name="water"
            placeholder="Water (L)"
            value={form.water}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg"
          />

          <textarea
            name="meal"
            placeholder="Meal description"
            value={form.meal}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg"
          />

          {/* 🔥 Upload Box */}
          <div className="space-y-2">
            <label className="text-gray-300">
              Upload meal image (optional)
            </label>

            <label
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-300">
                  Drop files to upload
                </p>
                <p className="text-xs text-gray-500 mb-2">or</p>

                <span className="px-4 py-1 bg-blue-500 text-white text-sm rounded">
                  Select Files
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
            </label>

            {mealImage && (
              <img
                src={mealImage}
                alt="preview"
                className="h-28 w-full object-cover rounded-lg border border-white/10"
              />
            )}
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-green-400">{message}</p>
          )}

          {/* Button */}
          <button
            disabled={!form.sleep || !form.steps || !form.calories || !form.water}
            onClick={handleSaveLog}
            className={`w-full p-3 rounded-lg ${
              !form.sleep || !form.steps || !form.calories || !form.water
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#00E5FF] to-[#7C3AED]"
            }`}
          >
            Save Log
          </button>

        </div>

        {/* Logs */}
        {logs.length > 0 && (
          <div className="mt-8 bg-[#111827] p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold mb-3">
              Recent Logs
            </h3>

            <div className="space-y-3 max-h-64 overflow-auto">
              {logs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.date}</span>
                    <span className="text-cyan-300">
                      Score {item.score}
                    </span>
                  </div>

                  <p className="text-sm">
                    Steps: {item.steps} | Sleep: {item.sleep}h | Calories: {item.calories} | Water: {item.water}L
                  </p>

                  <p className="text-sm text-gray-300 mt-1">
                    Meal: {item.meal || "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Log;