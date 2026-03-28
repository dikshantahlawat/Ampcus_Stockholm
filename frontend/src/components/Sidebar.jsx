import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navClass = ({ isActive }) =>
    `block p-2 rounded-lg hover:bg-white/10 transition ${
      isActive ? "bg-[#00E5FF22] text-[#00E5FF]" : "text-gray-300"
    }`;

  return (
    <div className="w-64 min-h-screen bg-black text-white p-5 border-r border-white/10 hidden md:block">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">BioSync</h1>

      <ul className="space-y-2">
        <li>
          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/insights" className={navClass}>
            Insights
          </NavLink>
        </li>
        <li>
          <NavLink to="/log" className={navClass}>
            Log Activity
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={navClass}>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;