import React, { useState } from "react";
import AuthLeft from "../components/AuthLeft";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] p-4 text-white">
        <div className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
          {/* LEFT SIDE */}

          <AuthLeft type="login" />

          {/* RIGHT SIDE */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold mb-2">Welcome back 👋</h2>

            <p className="text-gray-400 mb-6">
              Login to continue your health journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-lg focus:outline-none focus:border-[#00E5FF]"
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-lg focus:outline-none focus:border-[#00E5FF]"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm cursor-pointer text-[#00E5FF]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="flex justify-between text-sm text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#00E5FF]" />
                  Remember me
                </label>

                <span className="cursor-pointer hover:text-[#00E5FF]">
                  Forgot Password?
                </span>
              </div>

              {/* BUTTON */}
              <button className="w-full p-3 rounded-lg font-semibold bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] hover:opacity-90 transition-all duration-300">
                Login
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-4 text-center">
              Don’t have an account?{" "}
              <span
                className="text-[#00E5FF] cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Sign up here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
