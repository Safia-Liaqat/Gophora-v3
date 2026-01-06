import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, UserCheck } from "lucide-react";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));

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

  const theme = {
    bg: isDarkMode ? "bg-[#000000] text-[#FFFFFF]" : "bg-[#FFFFFF] text-[#000000]",
    accentText: "text-[#FF4F00]",
    buttonPrimary: "bg-[#FF4F00] text-white",
    buttonSecondary: isDarkMode ? "border-white/20 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/10",
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center px-4 py-20 ${theme.bg} font-body overflow-hidden`}>
      {/* Background Neon Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full bg-[#FF4F00]/10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full bg-[#333333]/20" />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl" data-aos="fade-up">
        <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6">
          Activate Human Potential.
        </h2>

        <p className="font-heading text-xl md:text-2xl font-light mb-4">
          AI for Human Activation. Not for Human Replacement.
        </p>

        <span className="inline-block px-6 py-2 mb-6 rounded-full text-xs font-semibold bg-[#FF4F00] text-white">
          ACTIVATE YOUR HUMAN SIGNAL
        </span>

        <p className="text-lg md:text-xl font-light mb-12 opacity-80">
          Automation is everywhere. Direction is not.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl ${theme.buttonPrimary}`}
          >
            Activate Your Mission <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate("/login")}
            className={`px-8 py-4 rounded-2xl border flex items-center gap-3 ${theme.buttonSecondary}`}
          >
            Continue Your Journey <UserCheck size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
