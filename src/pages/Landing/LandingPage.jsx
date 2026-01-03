{ /*
import React, { useEffect, useRef, useState } from 'react'
import HeroSection from './HeroSection'
import FoundationalThesis from './FoundationalThesis'
import HowWeWork from './HowItWorks'
import CallToAction from './CallToAction'

function LandingPage() {
  const [visibleSections, setVisibleSections] = useState([])
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (!visibleSections.includes(sectionId)) {
              setVisibleSections(prev => [...prev, sectionId])
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [visibleSections])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0514] text-gray-100 font-sans selection:bg-fuchsia-500 selection:text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <div 
          id="hero" 
          ref={el => sectionRefs.current[0] = el}
          className={`${visibleSections.includes('hero') ? 'section-reveal transition-all duration-700 opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <HeroSection />
        </div>
        
        {/* Foundational Thesis Section */}
        <div 
          id="thesis" 
          ref={el => sectionRefs.current[1] = el}
          className={`${visibleSections.includes('thesis') ? 'section-reveal transition-all duration-700 opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <FoundationalThesis theme="dark" />
        </div>
        
        {/* How We Work Section */}
        <div 
          id="how-it-works" 
          ref={el => sectionRefs.current[2] = el}
          className={`${visibleSections.includes('how-it-works') ? 'section-reveal transition-all duration-700 opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <HowWeWork theme="dark" />
        </div>
        
        {/* Call To Action Section */}
        <div 
          id="cta" 
          ref={el => sectionRefs.current[3] = el}
          className={`${visibleSections.includes('cta') ? 'section-reveal transition-all duration-700 opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <CallToAction theme="dark" />
        </div>
      </main>
    </div>
  )
}

export default LandingPage

*/}

import React, { useState } from 'react';
import { Shield, Zap, Target, Cpu, UserCheck, Globe } from 'lucide-react';

const LandingPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Analysis", desc: "Visnity AI scans behavior and digital signals to identify latent talent.", icon: <Cpu className="w-6 h-6" /> },
    { title: "Assignment", desc: "GOPHORA assigns a compatible mission based on detected capabilities.", icon: <Target className="w-6 h-6" /> },
    { title: "Execution", desc: "Complete the mission with total autonomy. No interviews, just action.", icon: <Zap className="w-6 h-6" /> },
    { title: "Recognition", desc: "Earn PHORA, building a measurable, non-speculative reputation.", icon: <Shield className="w-6 h-6" /> },
    { title: "Identity", desc: "Your Explorer identity is born. You stop surviving and start exploring.", icon: <UserCheck className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0a0514] text-gray-100 font-sans selection:bg-fuchsia-500 selection:text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      {/* HEADER */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 sticky top-0 z-50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-fuchsia-500 rounded-tr-xl rounded-bl-xl rotate-12 flex items-center justify-center">
            <div className="w-2 h-2 bg-fuchsia-500 animate-pulse" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">Gophora</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
          <a href="#vision" className="hover:text-fuchsia-400 transition-colors">Vision</a>
          <a href="#process" className="hover:text-fuchsia-400 transition-colors">Activation</a>
          <a href="#phora" className="hover:text-fuchsia-400 transition-colors">PHORA</a>
        </div>
        <button className="px-5 py-2 border border-fuchsia-500/50 rounded-full text-[10px] uppercase tracking-widest hover:bg-fuchsia-500 hover:text-white transition-all">
          Accept Mission
        </button>
      </nav>

      {/* HERO SECTION */}
      <section id="vision" className="relative pt-20 pb-32 px-6 flex flex-col items-center overflow-hidden">
        <div className="absolute top-10 opacity-10 select-none pointer-events-none">
          <h1 className="text-[18vw] font-serif leading-none uppercase">Ordinary</h1>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl">
          <span className="inline-block px-4 py-1 mb-6 border border-fuchsia-500/30 rounded-full text-fuchsia-400 text-[10px] uppercase tracking-[0.4em] animate-pulse">
            Human Activation Infrastructure
          </span>
          <h2 className="text-5xl md:text-8xl font-serif leading-tight mb-8">
            Nobody is <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 italic">Ordinary.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            The greatest wasted resource is human talent. Millions are waiting for an opportunity while systems remain obsolete. <br/>
            <span className="text-white font-medium">We don't hire. We activate.</span>
          </p>
        </div>

        {/* Vision Comparison */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 w-full max-w-6xl">
          {[
            { from: "Jobs", to: "Missions", color: "from-fuchsia-500" },
            { from: "CVs", to: "Human Signals", color: "from-indigo-500" },
            { from: "Waiting", to: "Immediate Activation", color: "from-purple-500" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm group hover:border-fuchsia-500/50 transition-all">
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2 line-through">No {item.from}</p>
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${item.color} to-white bg-clip-text text-transparent`}>
                {item.to}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVATION PROCESS */}
      <section id="process" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4">The 24-Hour Signal</h2>
            <div className="h-1 w-20 bg-fuchsia-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 rounded-xl cursor-pointer transition-all border ${activeStep === idx ? 'bg-fuchsia-500/10 border-fuchsia-500/50 translate-x-4' : 'border-transparent opacity-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-fuchsia-500">{step.icon}</span>
                    <h4 className="text-xl font-bold tracking-tight">{idx + 1}. {step.title}</h4>
                  </div>
                  {activeStep === idx && <p className="mt-3 text-gray-400 text-sm leading-relaxed">{step.desc}</p>}
                </div>
              ))}
            </div>
            
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-[#1a0b2e] flex items-center justify-center group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent" />
               <div className="relative text-center p-12">
                  <div className="w-48 h-48 border-4 border-fuchsia-500/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[ping_3s_linear_infinite]" />
                  <div className="w-32 h-32 border-2 border-fuchsia-500/40 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_10s_linear_infinite]" />
                  <Globe className="w-20 h-20 text-fuchsia-500 mx-auto drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]" />
                  <h3 className="mt-8 text-2xl font-serif italic">Visnity AI</h3>
                  <p className="text-[10px] uppercase tracking-widest mt-2 text-fuchsia-400">Scanning Present Signal...</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHORA SECTION */}
      <section id="phora" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">PHORA is not a currency. <br/><span className="text-fuchsia-500 italic font-serif">It's evidence.</span></h2>
          <div className="mt-12 p-1 bg-gradient-to-br from-fuchsia-500 to-indigo-600 rounded-[2rem] inline-block">
             <div className="bg-[#0a0514] rounded-[1.9rem] px-12 py-16">
                <div className="grid md:grid-cols-2 gap-12 text-left">
                  <div>
                    <h4 className="text-fuchsia-400 uppercase tracking-widest text-xs font-bold mb-4">The Reputation Economy</h4>
                    <ul className="space-y-4 text-gray-300">
                      <li>• Earned by executing real missions.</li>
                      <li>• Measures human impact, not transactions.</li>
                      <li>• Portable across the global infrastructure.</li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center border-l border-white/10 pl-12">
                    <p className="text-sm italic text-gray-400">
                      "Each PHORA proves something simple: someone chose not to be ordinary."
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CALL TO ACTION */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">Gophora</h2>
            <p className="text-gray-500 text-sm italic">
              Before an interplanetary civilization, we need a functional humanity. 
              The future belongs to those who dare to accept a mission.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Join the infrastructure</p>
            <p className="text-xl font-bold">contact@gophora.com</p>
            <div className="mt-6 flex gap-4 justify-end opacity-50 text-[10px]">
              <span>TWITTER</span>
              <span>DISCORD</span>
              <span>GITHUB</span>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center text-[10px] tracking-[0.5em] text-gray-600 uppercase">
          © 2026 Gophora. Nadie es Ordinario.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
