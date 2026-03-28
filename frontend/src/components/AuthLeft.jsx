import React from "react";

const AuthLeft = ({ type }) => {
  return (
    <div className="md:w-1/2 p-8 bg-gradient-to-br from-[#00E5FF20] to-[#7C3AED20] backdrop-blur-xl text-white">

      <h1 className="text-4xl font-bold text-[#00E5FF] mb-3">
        BioSync
      </h1>

      <p className="text-gray-300 mb-6">
        Personal Health Intelligence System
      </p>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
          💤 Track Sleep, Steps & Meals
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
          📊 View Health Trends
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
          ❤️ Smart Health Score
        </div>
      </div>

      <p className="text-sm mt-6 text-gray-400">
        {type === "login" ? (
          <>
            New here?{" "}
            <span className="text-[#00E5FF] cursor-pointer">
              Create account
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span className="text-[#00E5FF] cursor-pointer">
              Sign in
            </span>
          </>
        )}
      </p>

    </div>
  );
};

export default AuthLeft;