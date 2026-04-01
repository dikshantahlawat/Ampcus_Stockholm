import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,#00E5FF20,transparent_40%),radial-gradient(circle_at_bottom_right,#7C3AED20,transparent_40%)] pointer-events-none"></div>

      <div className="absolute inset-0 bg-[linear-gradient(#ffffff05_1px,transparent_1px),linear-gradient(90deg,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative flex-1 flex items-center justify-center px-6">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-1 text-xs tracking-widest border border-cyan-400/30 rounded-full text-cyan-300 bg-cyan-400/10">
              ● AI-POWERED HEALTH INTELLIGENCE
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Track Your <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Health
              </span>{" "}
              Smartly.
            </h1>

            <p className="text-gray-400 mt-6 max-w-lg leading-relaxed">
              Monitor steps, sleep, calories & hydration in one unified
              dashboard. BioSync uses real-time AI to analyze your lifestyle and
              predict risks before they happen.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition">
                Get Started Free →
              </button>

              <button className="px-6 py-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 transition">
                View Demo
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-8 text-sm">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-cyan-300">
                • Daily Logging
              </span>

              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-green-300">
                • Risk Scoring
              </span>

              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-purple-300">
                • Trend Prediction
              </span>

              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-yellow-300">
                • Meal Scan
              </span>
            </div>
          </div>
          <div className="flex justify-center relative">
            <div className="absolute w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              alt="health"
              className="w-80 md:w-[400px] drop-shadow-[0_0_40px_#00E5FF55] animate-pulse"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
