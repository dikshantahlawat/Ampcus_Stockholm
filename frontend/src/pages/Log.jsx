import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const Log = () => {
  const [form, setForm] = useState({
    sleep: "",
    steps: "",
    calories: "",
    water: "",
    meal: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/activity");
      setLogs(res.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const hasRequiredFields =
    form.sleep && form.steps && form.calories && form.water;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (selected) => {
    if (!selected) return;

    setFile(selected);

    if (selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!isLoading) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSaveLog = async () => {
    if (!hasRequiredFields) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("sleep", form.sleep);
      formData.append("steps", form.steps);
      formData.append("calories", form.calories);
      formData.append("water", form.water);
      formData.append("meal", form.meal);

      if (file) {
        formData.append("file", file);
      }

      await api.post("/activity", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Activity saved successfully");

      setForm({
        sleep: "",
        steps: "",
        calories: "",
        water: "",
        meal: "",
      });

      setFile(null);
      setPreview("");

      fetchLogs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <div className="p-6">
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

          <div className="space-y-2">
            <label className="text-gray-300">
              Upload meal image or PDF (optional)
            </label>

            <div
              className={`w-full h-52 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-center transition
              ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer bg-white/5 hover:bg-white/10"
              }`}
              onDragOver={(e) => !isLoading && e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => {
                if (!isLoading) {
                  document.getElementById("fileInput").click();
                }
              }}
            >
              <div className="text-blue-400 text-4xl mb-2">☁️</div>

              <p className="text-gray-300 text-sm">
                select your file or drag and drop
              </p>

              <button
                type="button"
                disabled={isLoading}
                className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm"
              >
                browse
              </button>

              <input
                id="fileInput"
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="h-28 w-full object-cover rounded-lg border border-white/10"
              />
            )}
          </div>

          <button
            disabled={!hasRequiredFields || isLoading}
            onClick={handleSaveLog}
            className={`w-full p-3 rounded-lg ${
              !hasRequiredFields || isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#00E5FF] to-[#7C3AED]"
            }`}
          >
            {isLoading ? "Saving..." : "Save Log"}
          </button>
        </div>

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
                    <span className="text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm">
                    Steps: {item.steps} | Sleep: {item.sleep}h | Calories:{" "}
                    {item.calories} | Water: {item.water}L
                  </p>

                  <p className="text-sm text-gray-300 mt-1">
                    Meal: {item.meal || "-"}
                  </p>

                  {item.file && (
                    <img
                      src={item.file}
                      alt="meal"
                      className="mt-2 h-24 rounded-lg"
                    />
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
