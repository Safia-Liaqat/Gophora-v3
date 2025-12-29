import React from "react";
import { useNavigate } from "react-router-dom";
import herobg from "../../assets/hero-bg-1.jpg";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center min-h-[90vh] w-full"
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        margin: 0,
      }}
    >
      {/* Darker overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-white px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3">
          Welcome to <span className="text-[#A28EFF]">GOPHORA</span>.
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Nobody is Ordinary here.
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-200 mb-4 italic">
          "Exploration doesn't start in space. It starts in people."
        </p>
        
        <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Activate your talent. Accept real missions. Connect in less than 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]"
          >
            Accept Your First Mission
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-medium text-base sm:text-lg transition-all duration-300"
          >
            Already an Explorer?
          </button>
        </div>
      </div>

      {/* Floating tagline at bottom */}
      <p className="absolute bottom-6 text-gray-300 text-xs sm:text-sm z-10">
        The first platform that activates human talent in 24 hours
      </p>
    </section>
  );
}