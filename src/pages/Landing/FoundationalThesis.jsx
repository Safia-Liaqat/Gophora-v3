import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FoundationalThesis() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,      // Animation duration
      easing: "ease-in-out", 
      once: false,        // Repeat animation when scrolling up/down
      mirror: true,       // Animate elements out while scrolling past them
    });
  }, []);

  const activationPrinciples = [
    { title: "Signal-Based", desc: "Visnity AI analyzes behavior and digital signals to identify hidden potential." },
    { title: "Mission-First", desc: "We assign meaningful missions, not just tasks or jobs." },
    { title: "24h Activation", desc: "From discovery to deployment in under 24 hours." },
    { title: "PHORA System", desc: "Earn measurable reputation as proof of real-world impact." },
  ];

  return (
    <section className="relative bg-[#030008] py-20 px-4 overflow-hidden text-white font-sans">
      {/* Background Neon Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 blur-[150px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full animate-pulse-slow" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start z-10">
        {/* LEFT */}
        <div className="space-y-10" data-aos="fade-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-purple-400 to-transparent" />
            <span className="text-xs tracking-widest text-white/60">
              THE CORE THESIS
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            <span className="block">Nobody is</span>
            <span className="relative inline-block mt-1">
              <span className="relative z-10">ordinary</span>
              <span className="absolute left-0 bottom-1 w-full h-2 bg-purple-400/20 blur-sm" />
            </span>
            <span className="block mt-1">when given a</span>
            <span className="block mt-1 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              mission.
            </span>
          </h1>

          <div className="space-y-3">
            <p className="text-lg italic text-white/70">
              "Most people are told to fit a role. We show them how to create impact."
            </p>
            <p className="text-lg font-medium">
              Real activation starts with purpose, not paperwork.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/70 text-lg">
              The most wasted resource isn’t money or technology — it’s untapped human potential waiting for activation.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-12" data-aos="fade-left">
          {/* Purpose */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:translate-y-[-2px] transition" data-aos="zoom-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs tracking-widest text-white/60">
                OUR PURPOSE
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-400 to-transparent" />
            </div>

            <h3 className="text-2xl font-semibold leading-snug">
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                GOPHORA
              </span>{" "}
              empowers explorers,
              <br />
              not just employees.
            </h3>

            <p className="text-white/70 mt-4 text-lg">
              We connect talent with purpose-driven missions, enabling measurable impact in under 24 hours.
            </p>
          </div>

          {/* Principles */}
          <div className="space-y-5">
            <h4 className="text-xl font-semibold" data-aos="fade-up">
              How We Activate Talent
            </h4>

            {/* Progress */}
            <div className="h-px bg-white/10 overflow-hidden">
              <div
                className="h-px bg-gradient-to-r from-purple-400 to-blue-500 transition-all duration-700"
                style={{ width: `${(activeIndex + 1) * 25}%` }}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {activationPrinciples.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`group p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                    activeIndex === i
                      ? "border-purple-400/40 bg-purple-400/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={i * 150}
                >
                  <div className="flex gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 transition ${
                        activeIndex === i
                          ? "bg-purple-400 scale-125"
                          : "bg-white/40"
                      }`}
                    />
                    <div>
                      <p
                        className={`font-semibold transition ${
                          activeIndex === i ? "text-purple-300" : "text-white"
                        }`}
                      >
                        {p.title}
                      </p>
                      <p className="text-sm text-white/60 mt-1">
                        {p.desc}
                      </p>

                      <div className="mt-3 h-px bg-white/10">
                        <div
                          className={`h-px bg-gradient-to-r from-purple-400 to-blue-500 transition-all duration-700 ${
                            activeIndex === i ? "w-full" : "w-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10" data-aos="fade-up">
            {[
              { value: "24h", label: "Activation Time" },
              { value: "0", label: "CV Required" },
              { value: "100%", label: "Mission Focus" },
            ].map((s, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-purple-400/10 transition"
              >
                <div className="text-2xl font-semibold">
                  {s.value}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
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
