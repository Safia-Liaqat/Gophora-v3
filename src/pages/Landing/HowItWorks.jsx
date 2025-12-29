import React from "react";
import { 
  BoltIcon, 
  ClockIcon, 
  SignalIcon,
  TrophyIcon,
  CurrencyDollarIcon 
} from "@heroicons/react/24/solid";

export default function HowWeWork() {
  return (
    <section className="relative bg-gradient-to-b from-[#0A0F2C] to-[#0A0A2A] text-white py-16 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 purple-bg"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-[1]" />

      <div className="relative z-[2] max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            HOW WE WORK <span className="text-[#A78BFA]">(IMMEDIATE ACTIVATION)</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-2">
            The problem is not lack of talent. It is lack of immediate activation.
          </p>
          <p className="text-base text-gray-400">
            We believe time is sacred and nobody should wait months to be useful.
          </p>
        </div>

        {/* Core Principle */}
        <div className="bg-gradient-to-r from-[#8B5CF6]/15 via-[#A78BFA]/15 to-[#C4B5FD]/15 border border-[#A78BFA]/30 rounded-xl p-6 mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] mb-4">
            <BoltIcon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 leading-relaxed">
            GOPHORA is the infrastructure that connects common people with real missions in less than 24 hours.
          </h3>
        </div>

        {/* GOPHORA Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            {
              icon: <SignalIcon className="h-6 w-6 text-[#A78BFA]" />,
              title: "We don't hire, we activate.",
              desc: "Immediate talent deployment"
            },
            {
              icon: <ClockIcon className="h-6 w-6 text-[#A78BFA]" />,
              title: "We don't ask for CVs, we read signals.",
              desc: "Behavior and digital signal analysis"
            },
            {
              icon: <TrophyIcon className="h-6 w-6 text-[#A78BFA]" />,
              title: "We don't offer jobs, we assign missions.",
              desc: "Purpose-driven assignments"
            }
          ].map((principle, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-[#1E1B4B]/40 to-[#2D1B69]/40 border border-[#2D1B69] rounded-xl p-5 text-center hover:border-[#A78BFA]/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#1E1B4B] to-[#2D1B69] flex items-center justify-center mx-auto mb-4">
                {principle.icon}
              </div>
              <h4 className="text-base font-bold mb-2 leading-tight">{principle.title}</h4>
              <p className="text-sm text-gray-400">{principle.desc}</p>
            </div>
          ))}
        </div>

      {/* Activation Process - Animated Flow */}
<div className="mb-16">
  <h3 className="text-xl sm:text-2xl font-bold text-center mb-12 text-[#A78BFA]">
    The Activation Flow
  </h3>
  
  <div className="relative">
    {/* Animated background line */}
    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A78BFA]/10 to-transparent"></div>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent animate-shimmer"></div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
      {[
        {
          step: "01",
          title: "Signal Scan",
          desc: "AI analyzes behavior & digital signals",
          color: "#8B5CF6"
        },
        {
          step: "02",
          title: "Mission Match",
          desc: "Receive purpose-driven assignment",
          color: "#7C3AED"
        },
        {
          step: "03",
          title: "Execute",
          desc: "Complete mission & build reputation",
          color: "#6D28D9"
        },
        {
          step: "04",
          title: "Earn PHORA",
          desc: "Receive reputation tokens",
          color: "#5B21B6"
        },
        {
          step: "05",
          title: "Explorer",
          desc: "Access advanced opportunities",
          color: "#4C1D95"
        }
      ].map((item, index) => (
        <div 
          key={index}
          className="relative group"
        >
          {/* Animated pulse ring */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#A78BFA]/5 group-hover:to-[#A78BFA]/10 animate-pulse-ring opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-[#0A0F2C] to-[#1E1B4B] border border-[#2D1B69] rounded-xl p-5 overflow-hidden transition-all duration-500 group-hover:border-[#A78BFA]/50 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            {/* Animated gradient bar */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear'
              }}
            ></div>
            
            {/* Step indicator with animation */}
            <div className="relative w-12 h-12 mx-auto mb-4">
              <div 
                className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0A0F2C] to-[#1E1B4B] flex items-center justify-center">
                <span 
                  className="text-sm font-bold"
                  style={{ color: item.color }}
                >
                  {item.step}
                </span>
              </div>
              <div 
                className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-ping"
                style={{ borderColor: item.color }}
              ></div>
            </div>
            
            {/* Content */}
            <div className="text-center">
              <h4 className="font-bold text-sm mb-2 text-white group-hover:text-[#A78BFA] transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
            
            {/* Hover indicator dot */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#A78BFA] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Mobile flow indicator */}
          {index < 4 && (
            <div className="md:hidden flex justify-center mt-4">
              <div className="text-[#A78BFA] animate-bounce">↓</div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
        {/* PHORA Explanation */}
        <div className="bg-gradient-to-br from-[#8B5CF6]/10 via-[#A78BFA]/10 to-transparent border border-[#A78BFA]/20 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="sm:w-1/4 mb-4 sm:mb-0 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center">
                <CurrencyDollarIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="sm:w-3/4 sm:pl-6 text-center sm:text-left">
              <h4 className="text-xl font-bold mb-3">
                <span className="text-[#A78BFA]">PHORA</span> is not a currency.
              </h4>
              <p className="text-base mb-3">
                It is <span className="font-bold text-[#A78BFA]">evidence of mission accomplished</span>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="bg-gradient-to-r from-[#1E1B4B]/30 to-[#2D1B69]/30 p-3 rounded-lg">
                  <p className="text-sm font-medium">Reputation, not speculation</p>
                </div>
                <div className="bg-gradient-to-r from-[#1E1B4B]/30 to-[#2D1B69]/30 p-3 rounded-lg">
                  <p className="text-sm font-medium">Human impact, not transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}