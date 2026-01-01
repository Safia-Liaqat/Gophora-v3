import React, { useState, useEffect } from "react";

export default function FoundationalThesis() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const activationPrinciples = [
    { 
      title: "Signal-Based", 
      desc: "We analyze digital signals instead of CVs"
    },
    { 
      title: "Mission-First", 
      desc: "Assign purpose, not just tasks"
    },
    { 
      title: "24h Activation", 
      desc: "From discovery to deployment"
    },
    { 
      title: "PHORA System", 
      desc: "Reputation as proof of impact"
    },
  ];

  return (
    <section className="relative bg-primary py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Left Column - Core Thesis */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            {/* Section Label */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-1 bg-gradient-accent"></div>
              <span className="text-xs sm:text-sm font-semibold text-tertiary uppercase tracking-wider">
                THE CORE THESIS
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-primary">
              <span className="block">Nobody is</span>
              <span className="relative inline-block mt-1">
                <span className="relative z-10">ordinary</span>
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gradient-accent/20 -rotate-1"></span>
              </span>
              <span className="block mt-1">when given a</span>
              <span className="text-gradient-accent block mt-1">
                mission.
              </span>
            </h1>
            
            {/* Quote */}
            <div className="space-y-3">
              <p className="text-lg sm:text-xl text-secondary italic leading-relaxed">
                "For years, they made us believe some are born to lead and others to obey."
              </p>
              <p className="text-lg sm:text-xl text-primary font-medium">
                We discovered something different.
              </p>
            </div>

            {/* Insight */}
            <div className="pt-4 border-t border-primary">
              <p className="text-base sm:text-lg text-secondary leading-relaxed">
                The biggest wasted resource isn't money or technology — it's human talent waiting to be activated.
              </p>
            </div>
          </div>

          {/* Right Column - GOPHORA Purpose & Stats */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            {/* GOPHORA Purpose */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs sm:text-sm font-semibold text-tertiary uppercase tracking-wider">
                  OUR PURPOSE
                </span>
                <div className="w-10 h-1 bg-gradient-accent"></div>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-primary leading-tight">
                <span className="text-gradient-accent">
                  GOPHORA
                </span>{" "}
                exists to awaken explorers,
                <br />
                not to create jobs.
              </h3>
              
              <p className="text-base sm:text-lg text-secondary mt-4 leading-relaxed">
                We bridge the gap between human potential and meaningful impact, connecting talent with purpose-driven missions in under 24 hours.
              </p>
            </div>

            {/* Activation Principles with Clean Animation */}
            <div className="pt-4 border-t border-primary">
              <h4 className="text-lg sm:text-xl font-bold text-primary mb-4">
                How We Activate Talent
              </h4>
              
              {/* Auto-sliding highlight */}
              <div className="relative mb-4 h-1 bg-primary/20 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-accent transition-all duration-700 ease-in-out"
                  style={{ width: `${(activeIndex + 1) * 25}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activationPrinciples.map((principle, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative p-3 rounded-lg cursor-pointer transition-all duration-500 ${
                      activeIndex === index 
                        ? 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30' 
                        : 'bg-secondary/30 border border-transparent hover:bg-secondary/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Clean dot indicator */}
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 ${
                        activeIndex === index 
                          ? 'bg-gradient-accent scale-125' 
                          : 'bg-primary/50'
                      }`}></div>
                      
                      <div>
                        {/* Title with gradient when active */}
                        <div className={`text-sm font-bold transition-all duration-300 ${
                          activeIndex === index 
                            ? 'text-gradient-accent' 
                            : 'text-primary'
                        }`}>
                          {principle.title}
                        </div>
                        
                        {/* Description */}
                        <div className="text-xs text-tertiary mt-0.5">
                          {principle.desc}
                        </div>
                        
                        {/* Clean progress indicator */}
                        <div className="mt-2 flex items-center gap-1">
                          <div className="flex-1 h-0.5 bg-primary/10 rounded-full">
                            <div 
                              className={`h-full bg-gradient-accent transition-all duration-1000 ${
                                activeIndex === index 
                                  ? 'w-full' 
                                  : 'w-0'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center gap-1.5 mt-4">
                {activationPrinciples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-gradient-accent w-4' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to principle ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-primary">
              {[
                { value: "24h", label: "Activation Time" },
                { value: "0", label: "CV Required" },
                { value: "100%", label: "Mission Focus" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-tertiary mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}