import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRightIcon,
  SparklesIcon,
  BoltIcon,
  ShieldCheckIcon
} from "@heroicons/react/20/solid";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CallToAction() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,      // Animation duration
      easing: "ease-in-out",
      once: true,         // Animate only once
      mirror: false,      // Animate out on scroll up
    });
  }, []);

  return (
    <section className="relative bg-[#05020d] pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-700/15 rounded-full blur-[160px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      {/* Wrapper */}
      <div className="relative w-full max-w-7xl mx-auto pb-16 md:pb-20 lg:pb-24 xl:pb-28 z-10">

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">

          {/* Left Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex-1 relative overflow-hidden rounded-2xl xl:rounded-3xl bg-purple-800/25 backdrop-blur-md border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform transition-all duration-700"
          >
            {/* Glow */}
            <div className="absolute top-2 right-2 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-gradient-to-br from-purple-600/15 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>

            <div className="relative p-6 xs:p-7 sm:p-8 md:p-10 lg:p-9 xl:p-12 flex flex-col justify-between h-full">
              <div className="flex flex-col space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/15 backdrop-blur-sm">
                  <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  <span className="text-xs sm:text-sm font-medium text-purple-400 whitespace-nowrap">
                    For Explorers
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-4 leading-tight text-white/90">
                  <span className="block">Activate Your</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-500">
                    Hidden Potential
                  </span>
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-white/60 mb-5">
                  Stop waiting for opportunities. Create them through meaningful missions that match your skills and passion.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "24-hour mission activation",
                    "No CV or interviews required",
                    "Build reputation with PHORA",
                    "Work on projects that matter"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-400 mt-1 transform transition-all duration-300 hover:scale-125"></div>
                      <span className="text-xs sm:text-sm text-white/70 flex-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-400 text-white px-5 py-3 sm:px-7 sm:py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Start Exploring Free</span>
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex-1 relative overflow-hidden rounded-2xl xl:rounded-3xl bg-purple-800/25 backdrop-blur-md border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform transition-all duration-700"
          >
            <div className="absolute bottom-2 left-2 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-gradient-to-tr from-purple-600/15 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>

            <div className="relative p-6 xs:p-7 sm:p-8 md:p-10 lg:p-9 xl:p-12 flex flex-col justify-between h-full">
              <div className="flex flex-col space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/15 backdrop-blur-sm">
                  <ShieldCheckIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white/80" />
                  <span className="text-xs sm:text-sm font-medium text-white/80 whitespace-nowrap">
                    For Organizations
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                  <span className="block">Access</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-500">
                    Activated Talent
                  </span>
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-white/60 mb-5">
                  Find mission-ready talent in 24 hours. Skip the lengthy hiring process and get results faster.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "Post missions, get matches in 24h",
                    "Access pre-verified talent pool",
                    "Mission-focused assignments",
                    "Pay for results, not time"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-400 mt-1 transform transition-all duration-300 hover:scale-125"></div>
                      <span className="text-xs sm:text-sm text-white/70 flex-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => navigate("/organization/register")}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-400 text-white px-5 py-3 sm:px-7 sm:py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Post Your First Mission</span>
                  <BoltIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes pulse-slow { 0%,100%{opacity:0.3;}50%{opacity:0.6;} }
          .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        `}
      </style>
    </section>
  );
}
