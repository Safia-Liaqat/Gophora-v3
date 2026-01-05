import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BoltIcon,
  UserGroupIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  XMarkIcon,
  ClockIcon,
  PuzzlePieceIcon,
  ChartPieIcon,
  SparklesIcon,
  ArrowUpRightIcon,
  LightBulbIcon,
  CogIcon,
  AcademicCapIcon,
  BeakerIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

export default function ForOrganizations() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Professional theme: strictly solid text colors for headings as requested
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-white",
    bgSecondary: isDarkMode ? "bg-[#110a1f]" : "bg-gray-50",
    text: isDarkMode ? "text-white" : "text-[#2d124d]", // Your brand black
    textSecondary: isDarkMode ? "text-gray-400" : "text-gray-600",
    textTertiary: isDarkMode ? "text-gray-500" : "text-gray-400",
    card: isDarkMode ? "bg-white/[0.02] border border-white/5" : "bg-white border border-gray-200 shadow-sm",
    btnPrimary: isDarkMode ? "bg-fuchsia-600 hover:bg-fuchsia-700" : "bg-[#2d124d] hover:bg-fuchsia-600",
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${theme.bg} ${theme.text} font-sans selection:bg-fuchsia-500`}>
      
      {/* Background Mesh */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-fuchsia-900/10' : 'bg-fuchsia-500/5'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-indigo-900/10' : 'bg-indigo-500/5'}`} />
      </div>

      <div className="w-full px-6 py-12 md:py-20">
        
        {/* Hero Section - Refined Proportions */}
        <section className="max-w-5xl mx-auto mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-500/20 mb-8">
            <BuildingLibraryIcon className="h-4 w-4 text-fuchsia-500" />
            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDarkMode ? 'text-white/60' : 'text-[#2d124d]'}`}>
              Enterprise Solutions
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
            Talent Activation. <br/>
            <span className="italic font-light opacity-80">Beyond Hiring.</span>
          </h1>
          
          <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto font-light leading-relaxed mb-12`}>
            Transform passive talent pools into active mission executors with GOPHORA's next-generation infrastructure.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { value: "24h", label: "Activation Time", icon: BoltIcon },
              { value: "10K+", label: "Verified Talent", icon: UserGroupIcon },
              { value: "500+", label: "Organizations", icon: ShieldCheckIcon },
              { value: "$0", label: "Upfront Costs", icon: CurrencyDollarIcon }
            ].map((stat, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border ${theme.card}`}>
                <stat.icon className="h-5 w-5 mx-auto mb-3 text-fuchsia-500" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className={`text-[10px] uppercase tracking-widest ${theme.textTertiary}`}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate("/register")} className={`px-8 py-4 text-white rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 ${theme.btnPrimary}`}>
              Start Free Trial <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button onClick={() => navigate("/demo")} className={`px-8 py-4 rounded-xl font-bold border ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-200 text-[#2d124d]'}`}>
              Request Demo
            </button>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className={`p-10 rounded-3xl border ${theme.card}`}>
              <div className="flex items-center gap-3 mb-8">
                <XMarkIcon className="h-6 w-6 text-red-500" />
                <h2 className="text-2xl font-bold">The Problem</h2>
              </div>
              <div className="space-y-8">
                {[
                  { title: "Static Talent Pools", desc: "Skilled individuals remain inactive for months.", icon: ClockIcon },
                  { title: "CV-Based Biases", desc: "Exceptional talent overlooked by traditional screening.", icon: AcademicCapIcon },
                  { title: "Economic Drain", desc: "Long hiring processes consume critical resources.", icon: CurrencyDollarIcon }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <item.icon className="h-6 w-6 text-red-500/50 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className={`text-sm ${theme.textSecondary}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-10 rounded-3xl border ${theme.card}`}>
              <div className="flex items-center gap-3 mb-8">
                <LightBulbIcon className="h-6 w-6 text-fuchsia-500" />
                <h2 className="text-2xl font-bold">The Solution</h2>
              </div>
              <div className="space-y-8">
                {[
                  { title: "Dynamic Activation", desc: "Deploy talent based on real-time capability signals.", icon: BoltIcon },
                  { title: "AI-Powered Matching", desc: "Visnity AI matches patterns to mission requirements.", icon: PuzzlePieceIcon },
                  { title: "Mission-Based Economy", desc: "Pay for outcomes, not time. Tokenized reputation.", icon: ArrowTrendingUpIcon }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <item.icon className="h-6 w-6 text-fuchsia-500/50 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className={`text-sm ${theme.textSecondary}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Activation Protocol (Timeline) */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Activation Protocol</h2>
            <div className="h-1 w-12 bg-fuchsia-500 mx-auto rounded-full" />
          </div>
          <div className="space-y-12 relative">
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-fuchsia-500/20" />
            {[
              { step: "01", title: "Define Mission", desc: "Create executable missions with clear objectives.", icon: SparklesIcon },
              { step: "02", title: "AI Matching", desc: "Visnity AI scans behavior signals for optimal matches.", icon: BeakerIcon },
              { step: "03", title: "24h Activation", desc: "Talent is deployed and onboarded in record time.", icon: BoltIcon },
              { step: "04", title: "Execution", desc: "Mission completion recorded as proof of utility.", icon: RocketLaunchIcon }
            ].map((s, i) => (
              <div key={i} className="flex gap-6 items-start relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#2d124d] text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg border border-white/20">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                  <p className={`${theme.textSecondary} text-sm font-light`}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Advantages Grid */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Strategic Advantages</h2>
            <p className={`${theme.textSecondary} text-sm max-w-lg mx-auto`}>Fundamental benefits impossible through traditional models.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Instant Scalability", desc: "Scale capacity within hours.", icon: ArrowPathIcon },
              { title: "Verified Excellence", desc: "Pre-verified through PHORA reputation.", icon: ShieldCheckIcon },
              { title: "Cost Efficiency", desc: "No recruitment overhead. Pay for success.", icon: CurrencyDollarIcon },
              { title: "Future Branding", desc: "Position at the forefront of the work future.", icon: RocketLaunchIcon },
              { title: "Diverse Perspectives", desc: "Access unconventional global talent.", icon: UserGroupIcon },
              { title: "Driven Insights", desc: "Leverage AI-driven execution insights.", icon: ChartBarIcon }
            ].map((adv, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border ${theme.card} hover:scale-[1.02] transition-all`}>
                <adv.icon className="h-6 w-6 mb-4 text-fuchsia-500" />
                <h3 className="text-lg font-bold mb-2">{adv.title}</h3>
                <p className={`${theme.textSecondary} text-sm font-light`}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Economy Model */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Mission-Based Economy</h2>
            <p className={`${theme.textSecondary} text-sm`}>A professional framework for value, payment, and reputation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Mission Payment", desc: "Pay in USDT for successful execution.", tag: "Direct Results", icon: CurrencyDollarIcon },
              { title: "Platform Commission", desc: "10% transparent fee on completion.", tag: "Sustainable", icon: ChartPieIcon },
              { title: "PHORA Rewards", desc: "Explorers earn reputation tokens.", tag: "Verifiable Impact", icon: ShieldCheckIcon }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${theme.card} relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <item.icon className="h-16 w-16" />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold mb-4 text-fuchsia-500">{item.tag}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className={`${theme.textSecondary} text-sm mb-6 leading-relaxed`}>{item.desc}</p>
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest opacity-40">
                  <CheckCircleIcon className="h-3 w-3 text-green-500" /> Network Verified
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto">
          <div className={`rounded-[2.5rem] p-12 text-center border ${theme.card} relative overflow-hidden`}>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="italic font-serif font-light">Activate</span>?
              </h2>
              <p className={`${theme.textSecondary} text-base mb-10 max-w-md mx-auto font-light`}>
                Join the infrastructure for human utility. No commitment required to browse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate("/register")} className={`px-10 py-4 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${theme.btnPrimary}`}>
                  Launch Your First Mission <ArrowUpRightIcon className="h-5 w-5" />
                </button>
                <button onClick={() => navigate("/contact")} className={`px-10 py-4 rounded-xl font-bold border ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-200 text-[#2d124d]'}`}>
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}