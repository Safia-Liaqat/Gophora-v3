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
import AOS from "aos";
import "aos/dist/aos.css";

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

  // Slide autoplay
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative bg-[#030008] py-16 px-4 overflow-hidden text-white font-sans">
      {/* Background Neon Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 blur-[150px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full animate-pulse-slow" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start z-10">
        {/* LEFT */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />
              <span className="text-xs tracking-widest text-white/60 uppercase">
                PROCESS
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-white leading-tight">
              How We Work
              <span className="block bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
                (Immediate Activation)
              </span>
            </h2>

            <p className="text-white/70 text-base">
              Problem: Not lack of talent, but lack of immediate activation.
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-5">
            {[
              {
                icon: <BoltIcon className="h-5 w-5 text-white" />,
                title: "24-Hour Activation",
                desc: "Infrastructure connecting people with real missions in less than 24 hours. Eliminating waiting and bureaucracy.",
              },
              {
                icon: <SignalIcon className="h-5 w-5 text-white" />,
                title: "Signal-Based AI",
                desc: "Analyze digital signals instead of traditional CVs for better matching.",
              },
              {
                icon: <ClockIcon className="h-5 w-5 text-white" />,
                title: "Time is Sacred",
                desc: "Immediate deployment is key, no unnecessary delays.",
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur hover:translate-y-[-2px] transition"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                    <p className="text-sm text-white/70">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Principles */}
          <div className="space-y-3 mt-5" data-aos="fade-up">
            <h3 className="text-lg font-bold text-white">Our Principles</h3>
            <div className="space-y-2">
              {[
                "We activate, don't hire",
                "Read signals, not CVs",
                "Assign missions, not jobs",
                "Time is sacred - no delays"
              ].map((principle, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-accent" />
                  <span className="text-sm text-white/70">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/40 transition"
              >
                {isAutoPlaying ? (
                  <PauseIcon className="h-4 w-4 text-white" />
                ) : (
                  <PlayIcon className="h-4 w-4 text-white" />
                )}
              </button>
              <span className="text-xs text-white/60">Auto {isAutoPlaying ? "ON" : "OFF"}</span>
            </div>

            <div className="flex gap-2">
              <button onClick={prevSlide} className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/40 transition">
                <ChevronLeftIcon className="h-4 w-4 text-white" />
              </button>
              <button onClick={nextSlide} className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/40 transition">
                <ChevronRightIcon className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="relative h-[340px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden" data-aos="fade-up">
            <div
              ref={sliderRef}
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="flex w-full h-full">
                {slides.map((slide, index) => (
                  <div key={slide.id} className="w-full h-full flex-shrink-0 flex items-center justify-center p-6">
                    <div className="max-w-md space-y-4">
                      <div className="flex justify-between text-xs text-white/60">
                        <span>0{index + 1} / 0{slides.length}</span>
                        <div className={`w-12 h-px ${slide.color}`} />
                      </div>

                      <div className={`w-16 h-16 rounded-xl ${slide.color} flex items-center justify-center`}>
                        {slide.icon}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                        <p className="text-sm text-white/70 mt-2">{slide.description}</p>

                        <div className="pt-3 border-t border-white/10 mt-3">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-accent" />
                            <span className="text-xs font-semibold text-white">{slide.stats}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-4 bg-gradient-accent" : "w-1.5 bg-white/30"}`}
                />
              ))}
            </div>
          </div>

          {/* PHORA Info */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5" data-aos="fade-up">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-accent flex items-center justify-center">
                <CurrencyDollarIcon className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold">
                  <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">PHORA</span>{" "}
                  <span className="text-white">is not currency</span>
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Evidence of mission accomplished - reputation tokens proving impact.
                </p>

                <div className="flex gap-2 mt-3">
                  <div className="flex-1 bg-white/10 px-2 py-1.5 rounded text-xs text-white">Reputation</div>
                  <div className="flex-1 bg-white/10 px-2 py-1.5 rounded text-xs text-white">Human impact</div>
                </div>
              </div>
            </div>
          </div>
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
