import React, { useEffect, useState } from 'react';
import { 
  Shield, Zap, Target, Cpu, UserCheck, Bolt, Signal, 
  Clock, Trophy, ArrowRight, Menu, X 
} from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router';

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const [activeStep, setActiveStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Listen for Theme Changes from Navbar
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // 2. Core Logic (Animations & AOS)
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(stepInterval);
  }, []);

  // Shared Data
  const slides = [
    { id: 1, icon: <Bolt />, title: "Immediate Activation", description: "Connect with real missions in less than 24 hours.", color: isDarkMode ? "bg-gradient-to-br from-fuchsia-600 to-purple-700" : "bg-fuchsia-100 text-fuchsia-600" },
    { id: 2, icon: <Signal />, title: "Signal-Based", description: "Analyze digital signals instead of traditional CVs.", color: isDarkMode ? "bg-gradient-to-br from-indigo-600 to-blue-700" : "bg-indigo-100 text-indigo-600" },
    { id: 3, icon: <Clock />, title: "Time is Sacred", description: "Immediate deployment is key. No unnecessary delays.", color: isDarkMode ? "bg-gradient-to-br from-purple-600 to-pink-700" : "bg-purple-100 text-purple-600" },
    { id: 4, icon: <Trophy />, title: "Mission-Driven", description: "Assign purpose-driven missions that matter.", color: isDarkMode ? "bg-gradient-to-br from-pink-600 to-rose-700" : "bg-rose-100 text-rose-600" }
  ];

  const activationPrinciples = [
    { title: "Signal-Based", desc: "Visnity AI analyzes behavior and digital signals to identify hidden potential." },
    { title: "Mission-First", desc: "We assign meaningful missions, not just tasks or jobs." },
    { title: "24h Activation", desc: "From discovery to deployment in under 24 hours." },
    { title: "PHORA System", desc: "Earn measurable reputation as proof of real-world impact." },
  ];

  const leftSteps = [
    { icon: <Bolt className="h-5 w-5" />, title: "We activate, don't hire", desc: "Infrastructure connecting people with missions in <24 hours." },
    { icon: <Signal className="h-5 w-5" />, title: "Read signals, not CVs", desc: "Skill-based matching via real-time digital proof." },
    { icon: <Trophy className="h-5 w-5" />, title: "Assign missions, not jobs", desc: "Outcome-driven engagement with measurable impact." },
    { icon: <Clock className="h-5 w-5" />, title: "Time is sacred - no delays", desc: "Eliminating bureaucracy to prioritize immediate utility." }
  ];

  // --- Theme Specific Styles ---
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514] text-gray-100" : "bg-slate-50 text-[#2d124d]",
    card: isDarkMode ? "bg-white/[0.02] border-white/5" : "bg-white border-fuchsia-100 shadow-sm",
    accentText: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400",
    phoraBox: isDarkMode ? "bg-[#0a0514]" : "bg-white",
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-700 font-sans selection:bg-fuchsia-500 overflow-x-hidden`}>
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-fuchsia-900/20' : 'bg-fuchsia-500/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-500/10'}`} />
        {!isDarkMode && <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(217,70,239,0.03)_50%,transparent_100%)] h-[20%] w-full animate-scan" />}
      </div>

      {/* HERO SECTION */}
      <section id="vision" className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full text-center ${isDarkMode ? 'opacity-5' : 'opacity-[0.03]'}`}>
          <h1 className="text-[15vw] font-serif leading-none uppercase whitespace-nowrap">GOPHORA</h1>
        </div>
        
        <div className="relative z-10 text-center w-full max-w-5xl" data-aos="fade-up">
          <span className={`inline-block px-4 py-1 mb-6 border rounded-full text-[10px] uppercase tracking-[0.4em] ${isDarkMode ? 'border-fuchsia-500/30 text-fuchsia-400 animate-pulse' : 'border-fuchsia-500/30 text-fuchsia-500 font-bold'}`}>
            Human Activation Infrastructure
          </span>
          <h2 className="text-5xl md:text-8xl font-serif leading-[1.1] mb-8">
            Nobody is <br/> 
            <span className={theme.accentText + " italic"}>Ordinary.</span>
          </h2>
          <p className={`text-sm md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12 px-4 ${isDarkMode ? 'text-gray-400' : 'opacity-70'}`}>
            "Exploration doesn't start in space. It starts in people."<br/>
            Activate your talent. Accept real missions. <br/>
            <span className={`${isDarkMode ? 'text-white' : 'text-fuchsia-600'} font-medium`}>We don't hire. We activate.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to='/register' className={`group px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-xl ${isDarkMode ? 'bg-fuchsia-600 text-white' : 'bg-[#2d124d] text-white hover:bg-fuchsia-600'}`}>
              Launch your mission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to='/login' className={`group px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all backdrop-blur-sm active:scale-95 border ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-fuchsia-100 text-[#2d124d]'}`}>
              Already an explorer
              <UserCheck className="h-4 w-4 opacity-60" />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE THESIS */}
      <section id="thesis" className={`relative py-24 px-4 md:px-8 overflow-hidden ${isDarkMode ? 'bg-[#030008]' : 'bg-white/50'}`}>
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8" data-aos="fade-right">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-[2px] ${isDarkMode ? 'bg-gradient-to-r from-fuchsia-500 to-transparent' : 'bg-fuchsia-500'}`} />
              <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${isDarkMode ? 'text-white/40' : 'text-fuchsia-600'}`}>The Core Thesis</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              The Human <br />
              <span className={`${theme.accentText} italic font-serif font-light`}>Activation</span>
              <br /> Protocol.
            </h2>
            <p className={`text-lg italic border-l-4 pl-6 max-w-md ${isDarkMode ? 'text-white/60 border-fuchsia-500/30' : 'opacity-60 border-fuchsia-500/20'}`}>
              "We are not building a job board. We are building the infrastructure for human utility."
            </p>
          </div>

          <div className={`p-8 rounded-[2.5rem] backdrop-blur-sm transition-all duration-500 ${theme.card}`} data-aos="fade-left">
            <div className="grid gap-3">
              {activationPrinciples.map((p, i) => (
                <div key={i} 
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer border ${activeIndex === i ? (isDarkMode ? "border-fuchsia-500/40 bg-fuchsia-500/5" : "bg-fuchsia-50 border-fuchsia-200") : "border-transparent opacity-40"}`}>
                  <h5 className="text-xs font-bold uppercase tracking-widest">{p.title}</h5>
                  {activeIndex === i && <p className="text-xs opacity-60 mt-2 leading-relaxed">{p.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHORA SECTION */}
     {/* PHORA SECTION */}
<section className="py-12 md:py-24 px-4 md:px-8" data-aos="fade-up">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight">
      PHORA is not a currency. <br/>
      <span className="text-fuchsia-500 italic font-serif">It's evidence.</span>
    </h2>
    <div className="p-[1px] md:p-[2px] bg-gradient-to-br from-fuchsia-500 to-indigo-600 rounded-[2rem] md:rounded-[3rem] shadow-xl md:shadow-2xl">
       <div className={`${theme.phoraBox} rounded-[1.9rem] md:rounded-[2.9rem] px-6 py-10 md:px-8 md:py-16`}>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-left items-center">
            <ul className={`space-y-3 md:space-y-4 text-xs md:text-base ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-fuchsia-500 rounded-full mt-1.5 flex-shrink-0"/> 
                Earned by executing real missions.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-fuchsia-500 rounded-full mt-1.5 flex-shrink-0"/> 
                Measures human impact.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-fuchsia-500 rounded-full mt-1.5 flex-shrink-0"/> 
                Portable global infrastructure.
              </li>
            </ul>
            <p className={`text-[11px] md:text-sm italic border-t md:border-t-0 md:border-l pt-5 md:pt-0 md:pl-10 leading-relaxed ${isDarkMode ? 'text-gray-400 border-white/10' : 'text-slate-500 border-fuchsia-100'}`}>
              "Each PHORA proves something simple: someone chose not to be ordinary."
            </p>
          </div>
       </div>
    </div>
  </div>
</section>
      {/* HOW IT WORKS */}
      {/* HOW IT WORKS */}
<section className={`py-12 md:py-24 px-4 md:px-8 ${isDarkMode ? 'bg-[#030008]' : 'bg-[#f8fafc]'}`}>
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
    <div className="space-y-6 md:space-y-8" data-aos="fade-right">
      <h2 className="text-xl md:text-3xl font-bold uppercase tracking-tighter">
        How We Work
        <span className="block text-lg md:text-2xl font-serif italic text-fuchsia-500 mt-1 md:mt-2">(Immediate Activation)</span>
      </h2>
      <div className="grid gap-2">
        {leftSteps.map((step, idx) => (
          <div key={idx} 
            className={`p-4 md:p-5 rounded-2xl border transition-all duration-700 ${activeStep === idx ? (isDarkMode ? 'bg-fuchsia-500/20 border-fuchsia-500/60 scale-[1.02]' : 'bg-white shadow-md border-fuchsia-200 scale-[1.05]') : 'border-transparent opacity-40'}`}>
            <div className="flex items-center gap-3 md:gap-4">
              <span className={`${activeStep === idx ? "text-fuchsia-500" : ""} flex-shrink-0`}>
                {React.cloneElement(step.icon, { size: 18 })}
              </span>
              <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{step.title}</h4>
            </div>
            {activeStep === idx && (
              <p className="text-[10px] md:text-[11px] opacity-60 mt-2 md:mt-3 ml-8 md:ml-10 leading-relaxed">
                {step.desc}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Right Side Slider (Stays hidden/visible based on your original preference) */}
    <div className={`relative aspect-[16/10] rounded-[2rem] md:rounded-[2.5rem] border overflow-hidden transition-all duration-700 ${isDarkMode ? 'border-white/10 bg-[#0d071b]' : 'border-fuchsia-100 bg-white shadow-2xl'}`} data-aos="fade-left">
      <div className="h-full flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 p-8 md:p-12 flex flex-col justify-center space-y-4">
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center ${slide.color}`}>
              {React.cloneElement(slide.icon, { size: 24 })}
            </div>
            <h3 className="text-xl md:text-3xl font-bold">{slide.title}</h3>
            <p className="opacity-60 text-xs md:text-base leading-relaxed">{slide.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
      <style jsx>{`
        @keyframes scan { from { transform: translateY(-100%); } to { transform: translateY(500%); } }
        .animate-scan { animation: scan 6s linear infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default LandingPage;