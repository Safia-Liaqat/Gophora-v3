import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRightIcon,
  SparklesIcon,
  BoltIcon,
  ShieldCheckIcon
} from "@heroicons/react/20/solid";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 md:py-20 lg:py-32 xl:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-10">
      {/* Fixed Split Background - Responsive */}
      <div className="absolute inset-0 lg:flex">
        {/* Mobile: White top, Black bottom */}
        {/* Desktop: White left, Black right */}
        <div className="h-1/2 lg:h-full lg:w-1/2 bg-white"></div>
        <div className="h-1/2 lg:h-full lg:w-1/2 bg-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Split Content Container - Mobile stacked, Desktop side-by-side */}
        <div className="flex flex-col lg:flex-row rounded-xl md:rounded-2xl xl:rounded-3xl overflow-hidden shadow-lg md:shadow-xl xl:shadow-2xl min-h-[800px] lg:min-h-[500px] xl:min-h-[600px]">
          
          {/* Left Side - For Explorers (Always White) */}
          <div className="flex-1 bg-white p-6 xs:p-7 sm:p-8 md:p-10 lg:p-9 xl:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 xl:top-10 xl:right-10 w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent rounded-full blur-lg md:blur-xl xl:blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 py-1.5 xs:px-3.5 xs:py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#8B5CF6]/10 mb-4 xs:mb-5 sm:mb-6">
                <SparklesIcon className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-[#8B5CF6]" />
                <span className="text-xs xs:text-xs sm:text-sm font-medium text-[#8B5CF6] whitespace-nowrap">For Explorers</span>
              </div>
              
              {/* Heading */}
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-bold text-black mb-4 xs:mb-5 sm:mb-6 leading-tight">
                <span className="block">Activate Your</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
                  Hidden Potential
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-sm xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray-600 mb-5 xs:mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                Stop waiting for opportunities. Create them through meaningful missions that match your skills and passion.
              </p>
              
              {/* Features List */}
              <div className="space-y-3 xs:space-y-3.5 sm:space-y-4 mb-6 xs:mb-7 sm:mb-8 md:mb-9 xl:mb-10">
                {[
                  "24-hour mission activation",
                  "No CV or interviews required",
                  "Build reputation with PHORA",
                  "Work on projects that matter"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 xs:gap-3">
                    <div className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B5CF6] flex-shrink-0 mt-1 xs:mt-1.5"></div>
                    <span className="text-xs xs:text-xs sm:text-sm md:text-base text-gray-700 flex-1">{item}</span>
                  </div>
                ))}
              </div>
              
              {/* Button */}
              <button
                onClick={() => navigate("/register")}
                className="w-full xs:w-full sm:w-auto bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-5 py-3 xs:px-6 xs:py-3.5 sm:px-7 sm:py-4 md:px-8 md:py-4 rounded-full font-semibold text-sm xs:text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 active:scale-[0.98]"
              >
                <span className="whitespace-nowrap">Start Exploring Free</span>
                <ArrowRightIcon className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Side - For Organizations (Always Black) */}
          <div className="flex-1 bg-black p-6 xs:p-7 sm:p-8 md:p-10 lg:p-9 xl:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute bottom-2 left-2 xs:bottom-3 xs:left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 xl:bottom-10 xl:left-10 w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent rounded-full blur-lg md:blur-xl xl:blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 py-1.5 xs:px-3.5 xs:py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#8B5CF6]/20 mb-4 xs:mb-5 sm:mb-6">
                <ShieldCheckIcon className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-white" />
                <span className="text-xs xs:text-xs sm:text-sm font-medium text-white whitespace-nowrap">For Organizations</span>
              </div>
              
              {/* Heading */}
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-bold text-white mb-4 xs:mb-5 sm:mb-6 leading-tight">
                <span className="block">Access</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6]">
                  Activated Talent
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-sm xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray-400 mb-5 xs:mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                Find mission-ready talent in 24 hours. Skip the lengthy hiring process and get results faster.
              </p>
              
              {/* Features List */}
              <div className="space-y-3 xs:space-y-3.5 sm:space-y-4 mb-6 xs:mb-7 sm:mb-8 md:mb-9 xl:mb-10">
                {[
                  "Post missions, get matches in 24h",
                  "Access pre-verified talent pool",
                  "Mission-focused assignments",
                  "Pay for results, not time"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 xs:gap-3">
                    <div className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A78BFA] flex-shrink-0 mt-1 xs:mt-1.5"></div>
                    <span className="text-xs xs:text-xs sm:text-sm md:text-base text-gray-300 flex-1">{item}</span>
                  </div>
                ))}
              </div>
              
              {/* Button */}
              <button
                onClick={() => navigate("/organization/register")}
                className="w-full xs:w-full sm:w-auto bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-5 py-3 xs:px-6 xs:py-3.5 sm:px-7 sm:py-4 md:px-8 md:py-4 rounded-full font-semibold text-sm xs:text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 active:scale-[0.98]"
              >
                <span className="whitespace-nowrap">Post Your First Mission</span>
                <BoltIcon className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Divider with Logo - Responsive */}
        <div className="relative mt-0 lg:-mt-6 xl:-mt-8">
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white p-2 xs:p-2.5 sm:p-3 md:p-3.5 xl:p-4 rounded-full border border-gray-200 shadow-lg md:shadow-xl">
              <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center">
                <span className="text-white font-bold text-base xs:text-lg sm:text-xl md:text-xl xl:text-xl">G</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}