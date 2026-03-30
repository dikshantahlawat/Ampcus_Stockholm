import React, { useState } from "react";
import AuthLeft from "../components/AuthLeft";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 text-white">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col md:flex-row bg-white/5 border border-white/10 shadow-xl">
        <AuthLeft type="register" />

        <div className="md:w-1/2 p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-wide">
            Create your account
          </h2>

          <p className="text-gray-400 mt-1 mb-6 text-sm">
            Start tracking your health smarter
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
            />

            <div className="flex gap-3">
              <div className="w-1/2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#00E5FF] hover:opacity-80"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              <input
                type="password"
                placeholder="Confirm"
                className="w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
              />
            </div>

            <div className="flex gap-3">
              <select
                defaultValue=""
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
              >
                <option value="" disabled hidden>
                  Gender
                </option>
                <option className="bg-[#0B0F19] text-white">Male</option>
                <option className="bg-[#0B0F19] text-white">Female</option>
                <option className="bg-[#0B0F19] text-white">Other</option>
              </select>

              <input
                type="number"
                placeholder="Age"
                className="w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
              />
            </div>

            <input
              type="tel"
              placeholder="Mobile (optional)"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
            />

            <button className="w-full p-3 rounded-xl font-medium bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] hover:scale-[1.02] active:scale-[0.98] transition duration-200 shadow-lg shadow-cyan-500/10">
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Already registered?{" "}
            <span
              className="text-[#00E5FF] cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
