import { useEffect, useState } from "react";
import { LogOut, Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUsername(user.name);
  }, []);

  return (
    <div className="w-full h-16 bg-[#0B0F19] border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => toggleSidebar()}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <Menu className="text-white" size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm hidden sm:block">
          {username || "Guest"}
        </span>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {username ? username.charAt(0).toUpperCase() : "G"}
          </span>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm"
        >
          <LogOut size={16} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
