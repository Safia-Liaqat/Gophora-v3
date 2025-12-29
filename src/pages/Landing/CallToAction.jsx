import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, RocketLaunchIcon, BuildingOfficeIcon, UserIcon } from "@heroicons/react/20/solid";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-[#0A0F2C] to-[#050c24] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Mission Statement */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/10 to-[#A78BFA]/10 border border-[#A78BFA]/20 mb-6">
            <span className="text-sm font-medium text-[#A78BFA]">Your Mission Awaits</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            The future belongs to those who
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
              dare to accept a mission.
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            "You are not looking for a job. You are accepting a mission that matters."
          </p>
        </div>

        {/* Main CTA Button with Animation */}
        <div className="mb-12 text-center">
          <button
            onClick={() => navigate("/register")}
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD] text-white px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
          >
            {/* Animated border */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              Accept Your First Mission
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            
            {/* Pulsing effect */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-20 bg-[#A78BFA]"></div>
          </button>
          
          <p className="text-sm text-gray-400 mt-4">
            No CV required. Start in less than 24 hours.
          </p>
        </div>

        {/* Secondary CTAs - Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          {[
            {
              icon: <UserIcon className="h-5 w-5 text-[#A78BFA]" />,
              title: "For Explorers",
              desc: "Activate your talent",
              action: "Start Exploring",
              path: "/register",
              gradient: "from-[#8B5CF6]/20 to-[#A78BFA]/20"
            },
            {
              icon: <BuildingOfficeIcon className="h-5 w-5 text-[#A78BFA]" />,
              title: "For Organizations",
              desc: "Access activated talent",
              action: "Post Missions",
              path: "/organization/register",
              gradient: "from-[#7C3AED]/20 to-[#6D28D9]/20"
            },
            {
              icon: <RocketLaunchIcon className="h-5 w-5 text-[#A78BFA]" />,
              title: "Already Active?",
              desc: "Continue your journey",
              action: "Enter GOPHORA",
              path: "/login",
              gradient: "from-[#6D28D9]/20 to-[#5B21B6]/20"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-b from-[#1E1B4B]/30 to-[#2D1B69]/30 border border-[#2D1B69] rounded-xl p-4 transition-all duration-300 hover:border-[#A78BFA]/40 hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#1E1B4B]/50 to-[#2D1B69]/50 border border-[#2D1B69]">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>
                
                <p className="text-xs text-gray-400 mb-3">{item.desc}</p>
                
                <button
                  onClick={() => navigate(item.path)}
                  className="w-full text-sm font-medium py-2 rounded-lg border border-[#2D1B69] bg-gradient-to-b from-[#1E1B4B]/40 to-[#2D1B69]/40 hover:from-[#1E1B4B]/60 hover:to-[#2D1B69]/60 transition-all duration-300 hover:border-[#A78BFA]/30"
                >
                  {item.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats/Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          {[
            { value: "24h", label: "Activation Time" },
            { value: "0", label: "CV Required" },
            { value: "100%", label: "Mission Focused" },
            { value: "∞", label: "Potential" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-3 rounded-lg bg-gradient-to-b from-[#1E1B4B]/20 to-transparent border border-[#2D1B69]/50 hover:border-[#A78BFA]/30 transition-colors duration-300"
            >
              <div className="text-lg sm:text-xl font-bold text-[#A78BFA]">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Final Quote - Smaller */}
        <div className="text-center pt-8 border-t border-[#2D1B69]">
          <p className="text-sm sm:text-base text-gray-300">
            <span className="text-[#A78BFA] font-semibold">Remember:</span> 
            {" "}Nobody is ordinary when they are given a mission.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Your journey begins with a single mission.
          </p>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}