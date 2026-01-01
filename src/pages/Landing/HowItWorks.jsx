import React, { useState, useEffect, useRef } from "react";
import { 
  BoltIcon, 
  ClockIcon, 
  SignalIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon
} from "@heroicons/react/24/solid";

export default function HowWeWork() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  const slides = [
    {
      id: 1,
      icon: <BoltIcon className="h-7 w-7 text-white" />,
      title: "Immediate Activation",
      description: "Connect with real missions in less than 24 hours. No waiting, no bureaucracy.",
      stats: "24h Activation",
      color: "bg-gradient-accent"
    },
    {
      id: 2,
      icon: <SignalIcon className="h-7 w-7 text-white" />,
      title: "Signal-Based",
      description: "Analyze digital signals instead of traditional CVs for better matching.",
      stats: "AI Matching",
      color: "bg-gradient-accent"
    },
    {
      id: 3,
      icon: <ClockIcon className="h-7 w-7 text-white" />,
      title: "Time is Sacred",
      description: "No waiting months to be useful. Immediate deployment is key.",
      stats: "0 Waiting",
      color: "bg-gradient-accent"
    },
    {
      id: 4,
      icon: <TrophyIcon className="h-7 w-7 text-white" />,
      title: "Mission-Driven",
      description: "Assign purpose-driven missions that matter, not just jobs.",
      stats: "100% Mission",
      color: "bg-gradient-accent"
    },
    {
      id: 5,
      icon: <CurrencyDollarIcon className="h-7 w-7 text-white" />,
      title: "PHORA System",
      description: "Reputation tokens as evidence of mission accomplishment.",
      stats: "Proof of Impact",
      color: "bg-gradient-accent"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative bg-primary py-10 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* Left Column - Static Content */}
          <div className="space-y-6">
            {/* Section Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-accent"></div>
                <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">
                  PROCESS
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-primary">
                How We Work
                <span className="block text-gradient-accent">
                  (Immediate Activation)
                </span>
              </h2>
              
              <p className="text-base text-secondary">
                Problem: Not lack of talent, but lack of immediate activation.
              </p>
            </div>

            {/* Compact 24-Hour Activation */}
            <div className="card">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                  <BoltIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">24-Hour Activation</h3>
                  <p className="text-sm text-secondary">
                    Infrastructure connecting people with real missions in <span className="font-semibold text-primary">less than 24 hours</span>. Eliminating waiting and bureaucracy.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Principles */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-primary">Our Principles</h3>
              <div className="space-y-2">
                {[
                  "We activate, don't hire",
                  "Read signals, not CVs",
                  "Assign missions, not jobs",
                  "Time is sacred - no delays"
                ].map((principle, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-accent"></div>
                    <span className="text-sm text-secondary">{principle}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View - Activation Flow */}
            <div className="lg:hidden mt-6 space-y-3">
              <h3 className="text-base font-bold text-primary">Activation Flow</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { step: "01", title: "Signal Scan", desc: "AI analyzes signals" },
                  { step: "02", title: "Mission Match", desc: "Purpose assignment" },
                  { step: "03", title: "Execute", desc: "Complete mission" },
                  { step: "04", title: "Earn PHORA", desc: "Get reputation tokens" },
                  { step: "05", title: "Explorer", desc: "Advanced access" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="card hover:border-accent transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-accent/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-gradient-accent">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary">{item.title}</h4>
                        <p className="text-xs text-tertiary">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Slider & PHORA */}
          <div className="space-y-4">
            {/* Slider Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-1.5 rounded-full bg-secondary border border-primary hover:border-accent transition-colors duration-300"
                >
                  {isAutoPlaying ? (
                    <PauseIcon className="h-4 w-4 text-primary" />
                  ) : (
                    <PlayIcon className="h-4 w-4 text-primary" />
                  )}
                </button>
                <span className="text-xs text-tertiary">
                  Auto {isAutoPlaying ? "ON" : "OFF"}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={prevSlide}
                  className="p-1.5 rounded-full bg-secondary border border-primary hover:border-accent transition-colors duration-300"
                >
                  <ChevronLeftIcon className="h-4 w-4 text-primary" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-1.5 rounded-full bg-secondary border border-primary hover:border-accent transition-colors duration-300"
                >
                  <ChevronRightIcon className="h-4 w-4 text-primary" />
                </button>
              </div>
            </div>

            {/* Slider Container */}
            <div className="relative h-[320px] sm:h-[340px] rounded-xl overflow-hidden border border-primary futuristic-border">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-tertiary"></div>
              
              {/* Slides */}
              <div 
                ref={sliderRef}
                className="absolute inset-0 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="flex w-full h-full">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="w-full h-full flex-shrink-0 flex items-center justify-center p-4 sm:p-6"
                    >
                      <div className="max-w-md w-full space-y-3 sm:space-y-4">
                        {/* Slide Number */}
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-semibold text-tertiary">
                            0{index + 1} / 0{slides.length}
                          </div>
                          <div className={`w-10 sm:w-12 h-1 ${slide.color}`}></div>
                        </div>
                        
                        {/* Icon */}
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${slide.color} flex items-center justify-center`}>
                          {slide.icon}
                        </div>
                        
                        {/* Content */}
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="text-lg sm:text-xl font-bold text-primary">{slide.title}</h3>
                          <p className="text-sm text-secondary leading-relaxed">
                            {slide.description}
                          </p>
                          <div className="pt-2 border-t border-primary">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-accent"></div>
                              <span className="text-xs font-semibold text-primary">{slide.stats}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-gradient-accent w-3 sm:w-4' 
                        : 'bg-primary hover:bg-tertiary'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Ultra Compact PHORA Section */}
            <div className="card">
              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-accent flex items-center justify-center mt-0.5">
                  <CurrencyDollarIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold flex items-center gap-1">
                    <span className="text-gradient-accent">
                      PHORA
                    </span>
                    <span className="text-primary">is not currency</span>
                  </h3>
                  <p className="text-xs text-secondary leading-tight">
                    Evidence of mission accomplished - reputation tokens proving impact.
                  </p>
                  
                  <div className="flex gap-2 pt-1">
                    <div className="flex-1 bg-tertiary px-2 py-1.5 rounded">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-accent"></div>
                        <span className="text-xs text-primary">Reputation</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-tertiary px-2 py-1.5 rounded">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-accent"></div>
                        <span className="text-xs text-primary">Human impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}