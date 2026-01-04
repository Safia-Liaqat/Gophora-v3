import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CallToAction() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative bg-[#0a0514] py-16 md:py-24 px-4 md:px-8 overflow-hidden border-t border-white/5">
      {/* Background Neon Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-fuchsia-900/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-8">
          
          {/* Left Card: Explorers */}
          <div
            data-aos="fade-up"
            className="flex-1 relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md p-6 md:p-10 lg:p-12 group hover:border-fuchsia-500/30 transition-all duration-500"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-4 md:mb-6">
                  <Sparkles className="h-3 w-3 text-fuchsia-400" />
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-fuchsia-400">For Explorers</span>
                </div>

                {/* UPDATED: SOLID WHITE HEADING */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 md:mb-6 leading-tight text-white">
                  Activate Your <br />
                  <span className="italic font-serif">Hidden Potential</span>
                </h2>

                <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-8 leading-relaxed max-w-md font-light">
                  Stop waiting for opportunities. Create them through meaningful missions that match your signals.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4 mb-8 md:mb-10">
                  {["24-hour activation", "No CV or interviews", "Build PHORA reputation", "Global mission access"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="shrink-0 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)]"></div>
                      <span className="text-[10px] md:text-xs text-gray-300 font-light uppercase tracking-widest">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate("/register")}
                className="group w-full sm:w-max bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_0_20px_rgba(217,70,239,0.2)]"
              >
                Start Exploring Free
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Card: Organizations */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="flex-1 relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md p-6 md:p-10 lg:p-12 group hover:border-indigo-500/30 transition-all duration-500"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 md:mb-6">
                  <ShieldCheck className="h-3 w-3 text-indigo-400" />
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-400">For Organizations</span>
                </div>

                {/* UPDATED: SOLID WHITE HEADING */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 md:mb-6 leading-tight text-white">
                  Access <br />
                  <span className="italic font-serif">Activated Talent</span>
                </h2>

                <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-8 leading-relaxed max-w-md font-light">
                  Find mission-ready talent in 24 hours. Skip the lengthy hiring process and get results faster.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4 mb-8 md:mb-10">
                  {["Matches in <24h", "Pre-verified talent", "Outcome-based assignments", "Reputation-backed results"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="shrink-0 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                      <span className="text-[10px] md:text-xs text-gray-300 font-light uppercase tracking-widest">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate("/organization/register")}
                className="group w-full sm:w-max border border-white/20 hover:border-fuchsia-500/50 hover:bg-white/5 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                Post Your First Mission
                <Zap className="h-3.5 w-3.5 md:h-4 md:w-4 text-fuchsia-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}