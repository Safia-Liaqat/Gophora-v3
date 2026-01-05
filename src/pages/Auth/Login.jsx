import React, { useEffect, useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Rocket, Globe, Zap } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const theme = {
    bg: isDarkMode ? "bg-[#0a0514] text-gray-100" : "bg-slate-50 text-[#2d124d]",
    card: isDarkMode ? "bg-white/[0.02] border-white/5 shadow-2xl" : "bg-white border-fuchsia-100 shadow-xl",
    statBox: isDarkMode ? "bg-white/5 border-white/5" : "bg-fuchsia-50 border-fuchsia-100",
    accentText: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400",
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-700 font-sans flex items-center justify-center px-4 py-12 relative overflow-hidden`}>
      
      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-fuchsia-900/20' : 'bg-fuchsia-500/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-500/10'}`} />
      </div>

      <div className="max-w-md w-full relative z-10" data-aos="zoom-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${isDarkMode ? 'bg-fuchsia-500/10 text-fuchsia-400' : 'bg-fuchsia-100 text-fuchsia-600'}`}>
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif mb-2">
            Welcome Back <span className={theme.accentText + " italic"}>Explorer</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] opacity-50">Sign in to continue your mission</p>
        </div>

        {/* The Card */}
        <div className={`p-8 rounded-[2.5rem] backdrop-blur-xl border transition-all duration-500 ${theme.card}`}>
          <LoginForm />

          {/* Divider */}
          <div className="relative my-8">
            <div className={`absolute inset-0 flex items-center ${isDarkMode ? 'opacity-10' : 'opacity-20'}`}>
              <div className="w-full border-t border-current"></div>
            </div>
            <div className="relative flex justify-center">
              <span className={`px-4 text-[10px] uppercase tracking-widest ${theme.bg} opacity-40 italic`}>Mission Access</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm opacity-60 mb-1">New to GOPHORA?</p>
            <Link to="/register" className="text-fuchsia-500 hover:text-fuchsia-400 font-bold inline-flex items-center gap-2 group transition-all">
              Start your mission
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">
          Human Activation Infrastructure
        </p>
      </div>
    </div>
  );
}