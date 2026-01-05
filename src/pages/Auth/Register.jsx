import React, { useEffect, useState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import { Link } from "react-router-dom";
import { User, Building2, Sparkles, ArrowRight, ChevronLeft } from "lucide-react";
import AOS from "aos";

export default function Register() {
  const [role, setRole] = useState("");
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
    roleBtn: isDarkMode ? "bg-white/5 border-white/10 hover:border-fuchsia-500/50" : "bg-slate-50 border-slate-200 hover:border-fuchsia-400",
    accentText: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400",
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-700 font-sans flex items-center justify-center px-4 py-12 relative overflow-hidden`}>
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-fuchsia-900/20' : 'bg-fuchsia-500/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-500/10'}`} />
      </div>

      <div className="max-w-md w-full relative z-10" data-aos="fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${isDarkMode ? 'bg-fuchsia-500/10 text-fuchsia-400' : 'bg-fuchsia-100 text-fuchsia-600'}`}>
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif mb-2">
            Join the <span className={theme.accentText + " italic"}>Mission</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-50">Select your path to activation</p>
        </div>

        <div className={`p-8 rounded-[2.5rem] backdrop-blur-xl border transition-all duration-500 ${theme.card}`}>
          {!role ? (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => setRole("seeker")}
                className={`w-full group text-left p-6 rounded-3xl border transition-all duration-300 ${theme.roleBtn}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <User size={24} />
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-lg">Explorer</h3>
                <p className="text-xs opacity-60">Complete missions and build your global reputation.</p>
              </button>

              <button
                onClick={() => setRole("provider")}
                className={`w-full group text-left p-6 rounded-3xl border transition-all duration-300 ${theme.roleBtn}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <Building2 size={24} />
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-lg">Organization</h3>
                <p className="text-xs opacity-60">Deploy missions and find world-class talent.</p>
              </button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-500">
              <button 
                onClick={() => setRole("")}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 mb-6 transition-all"
              >
                <ChevronLeft size={14} /> Back to selection
              </button>
              <RegisterForm role={role} setRole={setRole} />
            </div>
          )}

          {/* Footer Link */}
          {!role && (
            <div className="text-center mt-8 pt-6 border-t border-white/5">
              <p className="text-sm opacity-60">
                Already registered? 
                <Link to="/login" className="ml-2 font-bold text-fuchsia-500 hover:underline">Sign In</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
