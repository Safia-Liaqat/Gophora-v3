import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Menu,
  Briefcase,
  MessageSquare,
  User,
  MapPin,
  LogOut,
  Shield,
  Zap,
  Rocket
} from "lucide-react";
import { FiAward } from "react-icons/fi";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Explorer ID", icon: <User size={18} />, path: "/seeker/dashboard/profile" },
    { label: "Missions", icon: <Shield size={18} />, path: "/seeker/dashboard/missions" },
    { label: "Opportunities", icon: <Zap size={18} />, path: "/seeker/opportunities" },
    { label: "Opportunities Map", icon: <MapPin size={18} />, path: "/seeker/dashboard/opportunities-map" },
    { label: "Visinity AI", icon: <MessageSquare size={18} />, path: "/seeker/dashboard/assistant" },
    { label: "Explorer Log", icon: <FiAward size={18} />, path: "/seeker/dashboard/book-history" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-white text-black font-sans">
      {/* SIDEBAR */}
      <aside
        className={`fixed md:relative top-0 left-0 w-64 h-screen
        bg-[#333333] text-white border-r border-[#000000] z-40
        transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        overflow-y-auto flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#000000] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FF4F00]">
            <Rocket size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">GOPHORA</h1>
            <p className="text-[10px] uppercase tracking-widest text-white/70">
              Explorer Portal
            </p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded transition ${
                  active
                    ? "bg-[#FF4F00] text-white"
                    : "text-white hover:bg-[#FF4F00]/80 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#000000] mt-auto">
          <div className="border border-[#000000] rounded-md p-3 mb-3">
            <div className="text-xs text-white/70">
              <p className="mb-1">Mission Status: <span className="text-[#FF4F00] font-bold">ACTIVE</span></p>
              <p className="opacity-60">We don't hire. We activate.</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded text-sm text-white/70 hover:bg-red-500/20 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 rounded bg-[#FF4F00] text-white"
      >
        <Rocket size={22} />
      </button>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-auto bg-white text-black">
        <Outlet />
        <div className="text-center mt-6 text-xs text-gray-500">
          GOPHORA Explorer Portal • Time is Sacred • Mission-Driven Activation
        </div>
      </main>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}