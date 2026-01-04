
import React, { useEffect, useRef, useState } from 'react';
import { 
  Shield, Zap, Target, Cpu, UserCheck, Bolt, Signal, Clock, Trophy,
  Play, Pause, ChevronLeft, ChevronRight, ArrowRight 
} from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import CallToAction from './CallToAction';

const LandingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const slides = [
    { id: 1, icon: <Bolt />, title: "Immediate Activation", description: "Connect with real missions in less than 24 hours.", stats: "24h Activation", color: "bg-gradient-to-br from-fuchsia-600 to-purple-700" },
    { id: 2, icon: <Signal />, title: "Signal-Based", description: "Analyze digital signals instead of traditional CVs.", stats: "AI Matching", color: "bg-gradient-to-br from-indigo-600 to-blue-700" },
    { id: 3, icon: <Clock />, title: "Time is Sacred", description: "Immediate deployment is key. No unnecessary delays.", stats: "0 Waiting", color: "bg-gradient-to-br from-purple-600 to-pink-700" },
    { id: 4, icon: <Trophy />, title: "Mission-Driven", description: "Assign purpose-driven missions that matter.", stats: "100% Mission", color: "bg-gradient-to-br from-pink-600 to-rose-700" }
  ];

  const leftSteps = [
    { icon: <Bolt className="h-5 w-5" />, title: "We activate, don't hire", desc: "Infrastructure connecting people with missions in <24 hours." },
    { icon: <Signal className="h-5 w-5" />, title: "Read signals, not CVs", desc: "Skill-based matching via real-time digital proof." },
    { icon: <Trophy className="h-5 w-5" />, title: "Assign missions, not jobs", desc: "Outcome-driven engagement with measurable impact." },
    { icon: <Clock className="h-5 w-5" />, title: "Time is sacred - no delays", desc: "Eliminating bureaucracy to prioritize immediate utility." }
  ];

  const activationPrinciples = [
    { title: "Signal-Based", desc: "Visnity AI analyzes behavior and digital signals to identify hidden potential." },
    { title: "Mission-First", desc: "We assign meaningful missions, not just tasks or jobs." },
    { title: "24h Activation", desc: "From discovery to deployment in under 24 hours." },
    { title: "PHORA System", desc: "Earn measurable reputation as proof of real-world impact." },
  ];

  useEffect(() => {
    // Re-initialized AOS with more sensitive settings for smooth scroll entry
    AOS.init({ 
      duration: 1000, 
      once: false, 
      mirror: true,
      easing: 'ease-out-cubic' 
    });

    // RESTORED: Auto-advancing logic for the "How We Work" highlight steps
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % leftSteps.length);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(stepInterval);
  }, [leftSteps.length, slides.length]);

  return (
    <div className="min-h-screen bg-[#0a0514] text-gray-100 font-sans selection:bg-fuchsia-500 overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] md:w-[40%] h-[40%] bg-fuchsia-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] md:w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      {/* HERO SECTION */}
      <section id="vision" className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
        {/* CENTERED BACKGROUND TEXT */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 select-none pointer-events-none w-full text-center">
          <h1 className="text-[15vw] lg:text-[12rem] font-serif leading-none uppercase whitespace-nowrap">GOPHORA</h1>
        </div>
        
        <div className="relative z-10 text-center w-full max-w-5xl" data-aos="fade-up">
          <span className="inline-block px-4 py-1 mb-6 border border-fuchsia-500/30 rounded-full text-fuchsia-400 text-[9px] md:text-[10px] uppercase tracking-[0.4em] animate-pulse">
            Human Activation Infrastructure
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif leading-[1.1] mb-8">
            Nobody is <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 italic">Ordinary.</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12 px-4">
            "Exploration doesn't start in space. It starts in people."<br className="hidden md:block"/>
            Activate your talent. Accept real missions. <br/>
            <span className="text-white font-medium">We don't hire. We activate.</span>
          </p>
           {/* NEW: RESTORED & SMALL ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8" data-aos="zoom-in" data-aos-delay="400">
            <button 
              onClick={() => navigate("/register")}
              className="group bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all active:scale-95 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
            >
              Launch your mission
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <button 
              onClick={() => navigate("/login")}
              className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all backdrop-blur-sm active:scale-95"
            >
              Already an explorer
              <UserCheck className="h-3.5 w-3.5 opacity-60" />
            </button>
          </div>
        </div>
      </section>

      {/* CORE THESIS - RESTORED LEFT/RIGHT ANIMATION */}
      <section id="thesis" className="relative bg-[#030008] py-24 px-4 md:px-8 overflow-hidden">
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Enters from Left */}
          <div className="space-y-8" data-aos="fade-right">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-gradient-to-r from-fuchsia-500 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">The Core Thesis</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Human <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 italic font-serif">Activation</span>
              <br /> Protocol.
            </h2>
            <p className="text-base md:text-lg italic text-white/60 border-l-2 border-fuchsia-500/30 pl-4 max-w-md">
              "We are not building a job board. We are building the infrastructure for human utility."
            </p>
          </div>

          {/* RIGHT: Enters from Right */}
          <div className="bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-[2.5rem] backdrop-blur-sm" data-aos="fade-left">
            <div className="grid gap-3">
              {activationPrinciples.map((p, i) => (
                <div key={i} 
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`p-4 md:p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${activeIndex === i ? "border-fuchsia-500/40 bg-fuchsia-500/5" : "border-transparent opacity-40"}`}>
                  <h5 className="text-[10px] md:text-sm font-bold uppercase tracking-widest">{p.title}</h5>
                  {activeIndex === i && <p className="text-[11px] md:text-xs text-white/50 mt-2 leading-relaxed">{p.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHORA SECTION - RESTORED SMOOTH UP REVEAL */}
      <section className="py-24 px-4 md:px-8" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">PHORA is not a currency. <br/><span className="text-fuchsia-500 italic font-serif">It's evidence.</span></h2>
          <div className="p-[1px] bg-gradient-to-br from-fuchsia-500 to-indigo-600 rounded-[2rem]">
             <div className="bg-[#0a0514] rounded-[1.9rem] px-6 py-12 md:px-12 md:py-16">
                <div className="grid md:grid-cols-2 gap-8 text-left items-center">
                  <ul className="space-y-4 text-xs md:text-base text-gray-300">
                    <li>• Earned by executing real missions.</li>
                    <li>• Measures human impact, not transactions.</li>
                    <li>• Portable across the global infrastructure.</li>
                  </ul>
                  <p className="text-sm italic text-gray-400 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                    "Each PHORA proves something simple: someone chose not to be ordinary."
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <CallToAction/>

      {/* HOW IT WORKS - RESTORED AUTO-HIGHLIGHT ANIMATION */}
      <section className="py-24 px-4 md:px-8 bg-[#030008]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8" data-aos="fade-right">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">
              How We Work
              <span className="block text-xl md:text-2xl font-serif italic text-fuchsia-500 mt-2">(Immediate Activation)</span>
            </h2>
            <div className="grid gap-2">
              {leftSteps.map((step, idx) => (
                <div key={idx} 
                  className={`p-4 rounded-xl border transition-all duration-700 ${activeStep === idx ? 'bg-fuchsia-500/20 border-fuchsia-500/60 scale-[1.02]' : 'border-transparent opacity-40'}`}>
                  <div className="flex items-center gap-3">
                    <span className={activeStep === idx ? "text-fuchsia-500" : "text-white"}>{step.icon}</span>
                    <h4 className="text-[11px] md:text-base font-bold uppercase">{step.title}</h4>
                  </div>
                  {activeStep === idx && <p className="text-[10px] md:text-xs text-white/60 mt-2 ml-8">{step.desc}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-3xl border border-white/10 bg-[#0d071b] overflow-hidden" data-aos="fade-left">
            <div className="h-full flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0 p-8 md:p-12 flex flex-col justify-center space-y-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl ${slide.color} flex items-center justify-center`}>
                    {React.cloneElement(slide.icon, { className: "h-6 w-6 md:h-8 md:w-8 text-white" })}
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold">{slide.title}</h3>
                  <p className="text-white/60 text-xs md:text-base leading-relaxed">{slide.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
