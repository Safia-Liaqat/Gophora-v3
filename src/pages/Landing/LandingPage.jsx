import React, { useEffect, useState } from 'react';
import { 
  Bolt, Signal, Clock, Trophy, ArrowRight, UserCheck 
} from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router';

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const [activeStep, setActiveStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Listen for Theme Changes
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

  // Core Logic (Animations & AOS)
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-out-cubic' });
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(stepInterval);
  }, []);

  const slides = [
    { id: 1, icon: <Bolt />, title: "From Jobs to Missions", description: "An economy built on contribution, not credentials." },
    { id: 2, icon: <Signal />, title: "Human Signal Intelligence", description: "Intent, exploration, and capacity become visible and actionable." },
    { id: 3, icon: <Clock />, title: "Purpose Without Delay", description: "Immediate activation without friction or bureaucracy." },
    { id: 4, icon: <Trophy />, title: "Proof of Presence", description: "Reputation earned through meaningful human contribution." }
  ];

  const activationPrinciples = [
    { title: "Signal-Based Intelligence", desc: "Visnity AI interprets intent, capacity, availability, and exploratory drive." },
    { title: "Human-Centered Automation", desc: "Automation gains meaning only when humans remain at the center." },
    { title: "Meaning Over Efficiency", desc: "Efficiency must never replace purpose or conscious contribution." },
    { title: "Structural Resistance", desc: "An infrastructure designed to preserve human relevance by design." }
  ];

  const leftSteps = [
    { icon: <Bolt className="h-5 w-5" />, title: "Mission-Based Activation", desc: "We replace static jobs with purpose-driven, time-bounded missions." },
    { icon: <Signal className="h-5 w-5" />, title: "Instant Participation", desc: "Real-time human signals replace resumes and gatekeepers." },
    { icon: <Clock className="h-5 w-5" />, title: "Human-Guided Decisions", desc: "Visnity AI assists choice without removing human agency." },
    { icon: <Trophy className="h-5 w-5" />, title: "On-Chain Proof", desc: "PHORA records contribution as permanent proof of relevance." }
  ];

  const theme = {
    bg: isDarkMode ? "bg-[#000000] text-[#FFFFFF]" : "bg-[#FFFFFF] text-[#000000]",
    card: isDarkMode ? "bg-[#333333]/20 border-[#FFFFFF]/10" : "bg-[#FFFFFF] border-[#333333]/10 shadow-sm",
    accentText: "text-[#FF4F00]",
    phoraBox: isDarkMode ? "bg-[#333333]" : "bg-[#FFFFFF]",
    smallText: isDarkMode ? "text-[#FFFFFF]/60" : "text-[#000000]/60",
    bodyText: isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]",
  };

  return (
    <div className={`min-h-screen ${theme.bg} font-body transition-colors duration-700 overflow-x-hidden`}>

      {/* BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full bg-[#FF4F00]/10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full bg-[#333333]/20" />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="relative z-10 text-center max-w-5xl" data-aos="fade-up">
          <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6">
            Activate Human Potential.
          </h2>

          <p className="font-heading text-xl md:text-2xl font-light mb-4">
            AI for Human Activation. Not for Human Replacement.
          </p>

          <span className="inline-block px-6 py-2 mb-6 rounded-full text-xs font-semibold bg-[#FF4F00] text-white">
            ACTIVATE YOUR HUMAN SIGNAL
          </span>

          <p className="text-lg md:text-xl font-light mb-12 opacity-80">
            Automation is everywhere. Direction is not.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="px-8 py-4 rounded-2xl font-bold bg-[#FF4F00] text-white flex items-center gap-3 shadow-xl">
              Activate Your Mission <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="px-8 py-4 rounded-2xl border backdrop-blur-sm flex items-center gap-3">
              Continue Your Journey <UserCheck size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE THESIS */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div data-aos="fade-right">
            <span className="text-xs uppercase tracking-widest opacity-60">
              The Activation Thesis
            </span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mt-6">
              The Human Activation <br />
              <span className="text-[#FF4F00] italic font-serif">Protocol.</span>
            </h2>
            <p className="italic mt-8 border-l-4 pl-6 opacity-60">
              “We are not building another AI.  
              We are building infrastructure for human relevance.”
            </p>
          </div>

          <div className={`p-8 rounded-[2.5rem] ${theme.card}`} data-aos="fade-left">
            {activationPrinciples.map((p, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className={`p-5 rounded-2xl transition-all cursor-pointer ${
                  activeIndex === i ? "bg-[#FF4F00]/10 border border-[#FF4F00]/20" : "opacity-40"
                }`}
              >
                <h5 className="text-xs font-bold uppercase tracking-widest">{p.title}</h5>
                {activeIndex === i && <p className="text-xs mt-2 opacity-70">{p.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHORA */}
      <section className="py-24 px-4" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
            PHORA is not money. <br />
            <span className="text-[#FF4F00] italic font-serif">It’s proof of activation.</span>
          </h2>

          <div className="p-1 bg-gradient-to-br from-[#FF4F00] to-[#333333] rounded-[3rem]">
            <div className={`${theme.phoraBox} rounded-[2.9rem] px-8 py-16`}>
              <ul className="space-y-4 text-left max-w-xl mx-auto">
                <li>• Earned by contributing to real missions</li>
                <li>• Measures human relevance and impact</li>
                <li>• Immutable proof of activation</li>
              </ul>
              <p className="italic mt-10 opacity-60">
                “PHORA is earned by being activated — not by being automated.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div data-aos="fade-right">
            <h2 className="font-heading text-3xl font-bold mb-8">
              How Activation Happens
              <span className="block italic text-[#FF4F00] mt-2">(Immediate Human Activation)</span>
            </h2>

            {leftSteps.map((step, i) => (
              <div key={i} className={`p-5 rounded-2xl mb-3 ${activeStep === i ? "bg-[#FF4F00]/10" : "opacity-40"}`}>
                <h4 className="text-xs font-bold uppercase">{step.title}</h4>
                {activeStep === i && <p className="text-xs mt-2 opacity-70">{step.desc}</p>}
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border" data-aos="fade-left">
            <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map(slide => (
                <div key={slide.id} className="min-w-full p-12">
                  <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                  <p className="opacity-60">{slide.description}</p>
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
