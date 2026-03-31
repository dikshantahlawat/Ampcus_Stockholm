import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  React.useEffect(() => {
    const close = () => setIsSidebarOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
