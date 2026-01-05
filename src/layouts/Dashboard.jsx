import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Menu,
  X,
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
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: "Explorer ID", icon: <User size={18} />, path: "/seeker/dashboard/profile" },
    { label: "Missions", icon: <Shield size={18} />, path: "/seeker/dashboard/missions" },
    { label: "Opportunities", icon: <Zap size={18} />, path: "/seeker/opportunities" },
    { label: "Opportunities Map", icon: <MapPin size={18} />, path: "/seeker/dashboard/opportunities-map" },
    { label: "Visinity AI", icon: <MessageSquare size={18} />, path: "/seeker/dashboard/assistant" },
    { label: "Explorer Log", icon: <FiAward size={18} />, path: "/seeker/dashboard/book-history" },
    { 
      label: "Logout", 
      icon: <LogOut size={18} />, 
      isLogout: true 
    },
  ];

  // Theme specific styles matching landing page - KEEPING YOUR PURPLE THEME
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-slate-50",
    text: isDarkMode ? "text-white" : "text-black",
    card: isDarkMode ? "bg-white/[0.02] border-white/5" : "bg-white border-fuchsia-100 shadow-sm",
    accentText: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400",
    sidebarBg: isDarkMode ? "bg-[#0a0514]" : "bg-white",
    sidebarBorder: isDarkMode ? "border-white/10" : "border-fuchsia-100",
    activeBg: isDarkMode ? "bg-gradient-to-r from-fuchsia-500/20 to-fuchsia-600/10" : "bg-gradient-to-r from-fuchsia-100 to-indigo-100",
    activeBorder: isDarkMode ? "border-fuchsia-500/40" : "border-fuchsia-300",
    hoverBg: isDarkMode ? "hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30" : "hover:bg-fuchsia-50 hover:border-fuchsia-200",
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`flex flex-1 ${theme.bg} ${theme.text} transition-colors duration-700 font-sans`}>
      
      {/* Background elements matching landing page - KEEP YOUR THEME */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-fuchsia-900/20' : 'bg-fuchsia-500/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-500/10'}`} />
        {!isDarkMode && <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(217,70,239,0.03)_50%,transparent_100%)] h-[20%] w-full animate-scan" />}
      </div>

      {/* SIDEBAR - Fixed positioning */}
      <aside
        className={`
          fixed md:relative
          top-0 left-0 h-screen w-64
          ${theme.sidebarBg}
          border-r ${theme.sidebarBorder}
          z-40
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-y-auto
          flex-shrink-0
        `}
        style={{ top: '64px' }}
      >
        {/* Sidebar Header with branding */}
        <div className={`p-6 border-b ${theme.sidebarBorder}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-fuchsia-600 to-purple-700' : 'bg-gradient-to-br from-fuchsia-500 to-indigo-600'}`}>
              <Rocket size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                GOPHORA
              </h1>
              <p className={`text-[10px] uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Explorer Portal
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Links - Reduced padding for more compact look */}
        <nav className="flex flex-col px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            if (item.isLogout) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 px-3 py-3 text-sm 
                    transition-all duration-300 rounded-xl
                    ${isDarkMode 
                      ? 'hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-gray-300' 
                      : 'hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-700'
                    }
                    border border-transparent
                  `}
                >
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-500/20' : 'bg-red-100'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`
                  flex items-center gap-3 px-3 py-3 text-sm 
                  transition-all duration-300 rounded-xl
                  border
                  ${active 
                    ? `${theme.activeBg} ${theme.activeBorder} shadow-lg font-semibold` 
                    : `border-transparent ${theme.hoverBg}`
                  }
                `}
              >
                <div className={`p-2 rounded-lg ${
                  active 
                    ? isDarkMode ? 'bg-fuchsia-500/30' : 'bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20'
                    : isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                }`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer - Reduced padding */}
        <div className={`p-4 border-t ${theme.sidebarBorder} mt-auto`}>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="mb-1">Mission Status: <span className="text-fuchsia-400 font-bold">ACTIVE</span></p>
            <p className="opacity-60">We don't hire. We activate.</p>
          </div>
        </div>
      </aside>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className={`
          md:hidden 
          fixed top-20 right-6 
          z-50
          p-3 rounded-2xl shadow-2xl 
          transition-all duration-300 hover:scale-110 active:scale-95
          ${isDarkMode 
            ? 'bg-gradient-to-br from-fuchsia-600 to-purple-700 text-white' 
            : 'bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-white'
          }
        `}
      >
        <Menu size={22} />
      </button>

      {/* MAIN CONTENT AREA - Tightened layout */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden mb-6">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Explorer Dashboard
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Activate your potential</p>
          </div>
        </div>

        {/* Content Container - Removed excessive margins and padding */}
        <div className={`
          rounded-2xl p-4 md:p-6 
          ${theme.card} 
          ${theme.text}
          shadow-lg
          transition-all duration-500
          min-h-[calc(100vh-8rem)]
        `}>
          <Outlet />
        </div>
        
        {/* Footer Note */}
        <div className={`text-center mt-6 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <p>GOPHORA Explorer Portal • Time is Sacred • Mission-Driven Activation</p>
        </div>
      </main>

      {/* Overlay for mobile menu */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}