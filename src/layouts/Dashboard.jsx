import { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Wallet,
  Briefcase,
  MessageSquare,
  User,
  MapPin,
  LogOut
} from "lucide-react";
import { FiAward } from "react-icons/fi";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Explorer ID", icon: <User size={18} />, path: "/seeker/dashboard/profile" },
    // { label: "Wallet", icon: <Wallet size={18} />, path: "/seeker/dashboard/wallet" }, // Commented out for later use
    { label: "Missions", icon: <Briefcase size={18} />, path: "/seeker/dashboard/missions" },
    { label: "Opportunities", icon: <Briefcase size={18} />, path: "/seeker/opportunities" },
    { label: "Opportunities Map", icon: <MapPin size={18} />, path: "/seeker/dashboard/opportunities-map" },
    { label: "Visinity AI", icon: <MessageSquare size={18} />, path: "/seeker/dashboard/assistant" },
    { label: "Explorer Log", icon: <FiAward size={18} />, path: "/seeker/dashboard/book-history" },
   // { label: "Create Resume", icon: <FiAward size={18} />, path: "/seeker/dashboard/resume" },
    { 
      label: "Logout", 
      icon: <LogOut size={18} />, 
      isLogout: true 
    },
  ];

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // If you have any other cleanup
    // Clear cookies if you're using them
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Redirect to login page
    navigate('/login');
    // Alternatively, you can use:
    // window.location.href = '/login';
  };

  return (
    <div className="min-h-screen w-full bg-void text-stark flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static 
          top-0 left-0 
          h-screen 
          bg-[#0D0D0F]/80 backdrop-blur-xl 
          border-r border-white/10 
          z-40 shadow-lg
          transition-all duration-300 
          ${open ? "w-64" : "w-0 md:w-64"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
         

          {/* Close on mobile */}
          <button
            className="md:hidden block text-stark"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-4 flex flex-col h-[calc(100%-80px)] overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            if (item.isLogout) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    handleLogout();
                    setOpen(false); // Close sidebar on mobile after logout
                  }}
                  className={`
                    flex items-center gap-3 px-6 py-3 text-sm 
                    transition rounded-lg mx-3 text-left
                    hover:bg-red-500/20 hover:border-red-500/40 
                    hover:text-red-400 text-stark/80
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            }

            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  setOpen(false); // Close sidebar on mobile
                }}
                className={`
                  flex items-center gap-3 px-6 py-3 text-sm 
                  transition rounded-lg mx-3
                  ${
                    active
                      ? "bg-jewel/20 border border-jewel/40 text-jewel font-semibold"
                      : "hover:bg-white/10 text-stark/80"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE MENU BUTTON — now on TOP RIGHT */}
      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden 
          fixed top-4 right-4 
          z-[9999] 
          bg-jewel/90 p-2 rounded-lg shadow-2xl 
          text-white
        "
      >
        <Menu size={22} />
      </button>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}