import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen w-full bg-[#030008] text-gray-100 overflow-hidden flex items-center justify-center">
      {/* Background Neon Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 blur-[150px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full animate-pulse-slow" />

      {/* Background “ORDINARY” */}
      <h1 className="absolute text-[200px] md:text-[300px] font-serif text-white/5 uppercase select-none pointer-events-none whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        ORDINARY
      </h1>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 md:py-40 max-w-5xl mx-auto space-y-8">
        {/* Subheading */}
        <span className="inline-block px-4 py-1 border border-fuchsia-500/30 rounded-full text-fuchsia-400 text-[10px] uppercase tracking-[0.4em] animate-pulse">
          HUMAN ACTIVATION INFRASTRUCTURE
        </span>

        {/* Main Title */}
        <h1 className="text-5xl md:text-8xl font-serif leading-tight">
          Nobody is <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 italic">
            Ordinary.
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          We don’t hire. <span className="text-white font-medium">We activate.</span>
        </p>

        {/* New Paragraph from Image */}
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-2xl">
          The greatest wasted resource is human talent. Millions are waiting for an opportunity while systems remain obsolete.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white font-semibold hover:from-purple-500 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Launch Your Mission
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all transform hover:scale-105 shadow-lg"
          >
            Already an Explorer?
          </button>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
          .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        `}
      </style>
    </section>
  );
}
