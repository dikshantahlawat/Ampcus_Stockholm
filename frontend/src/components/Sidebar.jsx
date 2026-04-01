import { NavLink } from "react-router-dom";
import { Home, LayoutDashboard, BarChart3, ClipboardList } from "lucide-react";
const Sidebar = ({ isOpen, onClose }) => {
  const navClass = ({ isActive }) =>
    `relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 
    ${
      isActive
        ? "bg-[#00E5FF15] text-[#00E5FF] shadow-[0_0_10px_#00E5FF55]"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-black text-white p-5 border-r border-white/10 z-50
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h1 className="text-2xl font-bold text-cyan-400 mb-8">BioSync</h1>

        <ul className="space-y-3">
          <li>
            <NavLink to="/home" className={navClass} onClick={onClose}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-r-md"></span>
                  )}
                  <Home size={16} />
                  Home
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={navClass} onClick={onClose}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-r-md"></span>
                  )}
                  <LayoutDashboard size={18} />
                  Dashboard
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/insights" className={navClass} onClick={onClose}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-r-md"></span>
                  )}
                  <BarChart3 size={18} />
                  Insights
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/log" className={navClass} onClick={onClose}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-r-md"></span>
                  )}
                  <ClipboardList size={18} />
                  Log Activity
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
