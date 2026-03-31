import { useState } from "react";
import AuthLeft from "../components/AuthLeft";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      const res = await api.post(
        "user/login",
        formData,
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successfully");

      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] p-4 text-white">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
        <AuthLeft type="login" />

        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>

          <p className="text-gray-400 mb-6">
            Login to continue your health journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#00E5FF] outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#00E5FF] outline-none"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm cursor-pointer text-[#00E5FF]"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#00E5FF]" />
                Remember me
              </label>

              <span className="cursor-pointer hover:text-[#00E5FF]">
                Forgot Password?
              </span>
            </div>

            <button className="w-full p-3 rounded-lg font-semibold bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] hover:opacity-90 transition">
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
  );
};

export default Login;
