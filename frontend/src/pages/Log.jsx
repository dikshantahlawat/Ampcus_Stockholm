import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { computeHealthScore } from "../data/dummyData";

const Log = () => {
  const [form, setForm] = useState({
    sleep: "",
    steps: "",
    calories: "",
    water: "",
    meal: "",
  });

  const [mealImage, setMealImage] = useState(null);
  const [mealPDF, setMealPDF] = useState(null);

  const [foodClassification, setFoodClassification] = useState("");

  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE SELECT (AI READY)
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setMealImage(URL.createObjectURL(file));
        setMealPDF(null);

        // TODO: Replace with real AI API response
        setFoodClassification("Processing...");
      } else if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        setMealImage(null);
        setMealPDF({ name: file.name, url: URL.createObjectURL(file) });
        setFoodClassification("");
      } else {
        setMessage("Please select an image or PDF file.");
      }
    }
  };

  // ✅ DRAG DROP (AI READY)
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setMealImage(URL.createObjectURL(file));
        setMealPDF(null);

        // TODO: Replace with real AI API response
        setFoodClassification("Processing...");
      } else if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        setMealImage(null);
        setMealPDF({ name: file.name, url: URL.createObjectURL(file) });
        setFoodClassification("");
      } else {
        setMessage("Please select an image or PDF file.");
      }
    }
  };

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
      mealPDF,
      foodClassification,
      date: new Date().toLocaleDateString(),
      score: computeHealthScore({
        sleep: Number(form.sleep),
        steps: Number(form.steps),
        calories: Number(form.calories),
        water: Number(form.water),
      }),
    };

    const updatedLogs = [newEntry, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem("logs", JSON.stringify(updatedLogs));

    setMessage(`✅ Saved! Health Score: ${newEntry.score}`);

    setTimeout(() => setMessage(""), 2000);

    setForm({
      sleep: "",
      steps: "",
      calories: "",
      water: "",
      meal: "",
    });

    setMealImage(null);
    setMealPDF(null);
    setFoodClassification("");
  };

  return (
    <div className="flex bg-[#0B0F19] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Log Daily Activity</h1>

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

          {/* UPLOAD */}
          <div className="space-y-2">
            <label className="text-gray-300">
              Upload meal image or PDF (optional)
            </label>

            <label
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              <p className="text-sm text-gray-300">Drop file or click</p>
              <span className="px-4 py-1 bg-blue-500 text-white rounded">
                Select Files
              </span>

              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={onImageChange}
                className="hidden"
              />
            </label>

            {mealImage && (
              <div>
                <img
                  src={mealImage}
                  alt="preview"
                  className="h-28 w-full object-cover rounded-lg border border-white/10"
                />

                {foodClassification && (
                  <p className="text-sm text-yellow-400 mt-1">
                    {foodClassification === "Processing..."
                      ? "Analyzing meal..."
                      : `AI Result: ${foodClassification}`}
                  </p>
                )}
              </div>
            )}

            {mealPDF && (
              <p className="text-sm text-gray-300">PDF: {mealPDF.name}</p>
            )}
          </div>

          {message && <p className="text-sm text-green-400">{message}</p>}

          <button
            disabled={
              !form.sleep || !form.steps || !form.calories || !form.water
            }
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

        {/* LOGS */}
        {logs.length > 0 && (
          <div className="mt-8 bg-[#111827] p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold mb-3">Recent Logs</h3>

            <div className="space-y-3 max-h-64 overflow-auto">
              {logs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.date}</span>
                    <span className="text-cyan-300">Score {item.score}</span>
                  </div>

                  <p className="text-sm">
                    Steps: {item.steps} | Sleep: {item.sleep}h | Calories:{" "}
                    {item.calories} | Water: {item.water}L
                  </p>

                  <p className="text-sm text-gray-300 mt-1">
                    Meal: {item.meal || "-"}
                  </p>

                  {item.foodClassification && (
                    <p className="text-sm text-yellow-400">
                      AI Result: {item.foodClassification}
                    </p>
                  )}

                  {item.mealPDF && (
                    <p className="text-sm text-cyan-300">
                      PDF:{" "}
                      <a
                        href={item.mealPDF.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {item.mealPDF.name}
                      </a>
                    </p>
                  )}
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
