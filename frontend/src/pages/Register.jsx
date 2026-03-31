import { useState } from "react";
import AuthLeft from "../components/AuthLeft";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../utils/api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await api.post(
        "user/register",
        formData,
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Account created successfully");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    }
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
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
            />

            <div className="flex gap-3">
              <div className="w-1/2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#00E5FF]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm"
                onChange={handleChange}
                className="w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
              />
            </div>

            <div className="flex gap-3">
              <select
                name="gender"
                onChange={handleChange}
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
                name="age"
                placeholder="Age"
                onChange={handleChange}
                className="w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition"
              />
            </div>

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile (optional)"
              onChange={handleChange}
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
