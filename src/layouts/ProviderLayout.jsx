import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  LayoutDashboard,
  PlusCircle,
  User,
  LogOut,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { APIURL } from "../services/api.js";

export default function ProviderLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Sidebar links
  const navLinks = [
    { path: "/provider/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/provider/opportunities", label: "My Invitations", icon: <Briefcase size={18} /> },
    { path: "/provider/create-opportunity", label: "Post Opportunity", icon: <PlusCircle size={18} /> },
    { path: "/provider/profile", label: "My Explorer ID", icon: <User size={18} /> },
  ];

  // Theme
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-slate-50",
    text: isDarkMode ? "text-white" : "text-black",
    card: isDarkMode ? "bg-white/[0.02] border-white/5" : "bg-white border-fuchsia-100 shadow-sm",
    sidebarBg: isDarkMode ? "bg-[#0a0514]" : "bg-white",
    sidebarBorder: isDarkMode ? "border-white/10" : "border-fuchsia-100",
    activeBg: isDarkMode
      ? "bg-gradient-to-r from-fuchsia-500/20 to-fuchsia-600/10"
      : "bg-gradient-to-r from-fuchsia-100 to-indigo-100",
    activeBorder: isDarkMode ? "border-fuchsia-500/40" : "border-fuchsia-300",
    hoverBg: isDarkMode
      ? "hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30"
      : "hover:bg-fuchsia-50 hover:border-fuchsia-200",
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("trust_score");
    localStorage.removeItem("provider_level");
    navigate("/login");
  };

  // Trust score
  const [trustScore, setTrustScore] = useState(null);
  const [providerLevel, setProviderLevel] = useState(null);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${APIURL}/verification/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.trust_score !== null) {
            setTrustScore(data.trust_score);
            setProviderLevel(data.verification_status);
            localStorage.setItem("trust_score", data.trust_score);
            localStorage.setItem("provider_level", data.verification_status);
          }
        }
      } catch (error) {
        console.error("Verification fetch failed:", error);
      }
    };

    fetchVerificationStatus();
  }, []);

  return (
    <div className={`flex min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 font-sans`}>
      
      {/* Background gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${
            isDarkMode ? "bg-fuchsia-900/20" : "bg-fuchsia-500/10"
          }`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${
            isDarkMode ? "bg-indigo-900/20" : "bg-indigo-500/10"
          }`}
        />
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed md:relative top-16 left-0 w-64 h-[calc(100vh-64px)]
        ${theme.sidebarBg} border-r ${theme.sidebarBorder} z-40
        transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        overflow-y-auto flex flex-col`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${theme.sidebarBorder}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-fuchsia-600 to-purple-700">
              <Rocket size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                GOPHORA
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                Explorer Portal
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-3 py-4 space-y-1">
          {navLinks.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-3 text-sm rounded-xl border transition-all duration-300 ${
                  active
                    ? `${theme.activeBg} ${theme.activeBorder} font-semibold`
                    : `border-transparent ${theme.hoverBg}`
                }`}
              >
                <div className="p-2 rounded-lg bg-white/5">{item.icon}</div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className={`p-4 border-t ${theme.sidebarBorder} mt-auto`}>
          <div className="border border-white/10 rounded-md p-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} />
              <span className="text-[13px] font-medium">Verification Status</span>
            </div>
            {trustScore ? (
              <>
                <p className="text-[12px] text-gray-300 mb-2">
                  AI Verified – {providerLevel || "Professional"}
                </p>
                <div className="h-[4px] bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-purple-400" style={{ width: `${trustScore}%` }} />
                </div>
                <p className="text-[11px] text-gray-400">Trust Score: {trustScore}/100</p>
              </>
            ) : (
              <p className="text-[12px] text-gray-400">Not Verified</p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-300 hover:bg-red-500/10 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-20 right-6 z-50 p-3 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-700 text-white"
      >
        <Rocket size={22} />
      </button>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />

        <div className="text-center mt-6 text-xs text-gray-500">
          GOPHORA Provider Portal • Time is Sacred • Mission-Driven Activation
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
