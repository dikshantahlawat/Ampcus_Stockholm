import React, { useState } from "react";
import AuthLeft from "../components/AuthLeft";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] p-4 text-white">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
        {/* LEFT SIDE */}
        <AuthLeft type="register" />

        {/* RIGHT */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-2">Create your account</h2>

          <p className="text-gray-400 mb-6">
            Start tracking your health smarter 🚀
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-lg focus:outline-none focus:border-[#00E5FF]"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-lg focus:outline-none focus:border-[#00E5FF]"
            />

            <div className="flex gap-3">
              <div className="w-1/2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-lg"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm cursor-pointer text-[#00E5FF]"
                >
                  SHOW
                </span>
              </div>

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-1/2 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-lg"
              />
            </div>

            <div className="flex gap-3">
              <select
                className="w-full p-3 rounded-lg 
  bg-white/5 border border-white/10 
  backdrop-blur-lg text-gray-300
  focus:outline-none focus:border-[#00E5FF] 
  transition-all duration-300"
              >
                <option value="" disabled selected hidden>
                  Gender
                </option>
                <option className="bg-[#0B0F19] text-white">Male</option>
                <option className="bg-[#0B0F19] text-white">Female</option>
                <option className="bg-[#0B0F19] text-white">Other</option>
              </select>

              <input
                type="number"
                placeholder="Age"
                className="w-1/2 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-lg"
              />
            </div>

            <input
              type="tel"
              placeholder="Mobile (optional)"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-lg"
            />

            <button className="w-full p-3 rounded-lg font-semibold bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] hover:opacity-90 transition">
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Already registered?{" "}
            <span
              className="text-[#00E5FF] cursor-pointer"
              onClick={() => navigate("/")}
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
