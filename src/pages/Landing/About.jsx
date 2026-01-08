import React, { useState, useEffect } from "react";
import {
  FaLightbulb,
  FaUsers,
  FaGlobe,
  FaCode,
  FaDatabase,
  FaRocket,
  FaChevronRight,
  FaShieldAlt,
  FaMagic,
  FaPalette,
  FaCogs,
} from "react-icons/fa";
import { Target, Shield, Zap, Clock, Trophy, ArrowRight } from "lucide-react";
import FrontendDeveloper from "../../assets/FrontendDeveloper.png";
import AiEngineer from "../../assets/AI Engineer.jpg";
import Founderimage from '../../assets/Founder-image.jpeg';

export default function AboutUs() {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Listen for theme changes
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

  // Professional theme with only black/white text
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-white",
    text: isDarkMode ? "text-white" : "text-black",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textTertiary: isDarkMode ? "text-gray-400" : "text-gray-500",
    card: isDarkMode ? "bg-white/[0.02] border border-white/5" : "bg-white border border-gray-200",
    accentBorder: isDarkMode ? "border-fuchsia-500/30" : "border-fuchsia-200",
    accentBg: isDarkMode ? "bg-fuchsia-500/10" : "bg-fuchsia-50",
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme.bg} ${theme.text} font-sans`}>
      
      {/* Background elements matching landing page */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-fuchsia-900/20' : 'bg-fuchsia-500/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-500/10'}`} />
        {!isDarkMode && <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(217,70,239,0.03)_50%,transparent_100%)] h-[20%] w-full animate-scan" />}
      </div>

      {/* Header */}
      <section className="relative text-center py-16 px-4 md:py-20">
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className={`inline-block px-4 py-1 mb-4 border rounded-full text-[10px] uppercase tracking-[0.4em] ${isDarkMode ? 'border-white/20 text-white/60' : 'border-gray-300 text-gray-600'}`}>
            Human Activation Infrastructure
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About Gophora
          </h1>
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${theme.textSecondary}`}>
            Connecting opportunity seekers with providers — empowering humanity through technology, collaboration, and contribution.
          </p>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-16 grid md:grid-cols-4 gap-4 md:gap-6">
        <div className={`rounded-xl p-4 md:p-6 ${theme.card} transition-all`}>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 ${theme.accentBg}`}>
            <FaLightbulb className={theme.text} size={20} />
          </div>
          <h3 className="text-base md:text-lg font-semibold mb-2">
            Innovation → Contribution
          </h3>
          <p className={`text-xs md:text-sm ${theme.textSecondary}`}>
            Transforming innovation into meaningful contributions — enabling people to create value that benefits others.
          </p>
        </div>

        <div className={`rounded-xl p-4 md:p-6 ${theme.card} transition-all`}>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 ${theme.accentBg}`}>
            <FaRocket className={theme.text} size={20} />
          </div>
          <h3 className="text-base md:text-lg font-semibold mb-2">
            Immediate Activation
          </h3>
          <p className={`text-xs md:text-sm ${theme.textSecondary}`}>
            Connect with real missions in less than 24 hours. Time is sacred.
          </p>
        </div>

        <div className={`rounded-xl p-4 md:p-6 ${theme.card} transition-all`}>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 ${theme.accentBg}`}>
            <FaUsers className={theme.text} size={20} />
          </div>
          <h3 className="text-base md:text-lg font-semibold mb-2">
            Mission-Driven
          </h3>
          <p className={`text-xs md:text-sm ${theme.textSecondary}`}>
            To rescue and highlight human talent, connecting people with meaningful contributions.
          </p>
        </div>

        <div className={`rounded-xl p-4 md:p-6 ${theme.card} transition-all`}>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 ${theme.accentBg}`}>
            <FaGlobe className={theme.text} size={20} />
          </div>
          <h3 className="text-base md:text-lg font-semibold mb-2">
            Global Impact
          </h3>
          <p className={`text-xs md:text-sm ${theme.textSecondary}`}>
            Enabling people to reach independence and access work that enriches their lives.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className={`py-8 md:py-16 px-4 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              The Visionary: Andrea Covarrubias
            </h2>
            <p className={`max-w-2xl mx-auto ${theme.textSecondary}`}>
              Founder & Architect of Gophora • Activating human potential through mission-driven contribution
            </p>
          </div>

          <div className="grid md:grid-cols-2 items-start gap-6 md:gap-12">
            {/* Founder Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className={`overflow-hidden rounded-xl ${theme.card}`}>
                  <img
                    src={Founderimage}
                    alt="Founder Andrea Covarrubias"
                    className="w-full max-w-md object-cover"
                  />
                </div>
                <div className={`absolute -bottom-3 -right-3 px-3 py-1.5 rounded-lg ${isDarkMode ? 'bg-white/10 backdrop-blur-sm' : 'bg-white shadow border border-gray-200'} ${theme.text}`}>
                  <div className="text-xs font-medium">"Nadie es Ordinario"</div>
                  <div className="text-[10px] opacity-60">(Nobody is Ordinary)</div>
                </div>
              </div>
            </div>

            {/* Founder Story */}
            <div className="space-y-4 md:space-y-6">
              {/* Core Thesis */}
              <div className={`p-4 md:p-6 rounded-xl ${theme.card}`}>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 rounded-lg ${theme.accentBg}`}>
                    <FaLightbulb className={theme.text} size={18} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-2">The Core Thesis</h3>
                    <p className={`text-sm ${theme.textSecondary}`}>
                      "Nobody is Ordinary" when given a mission. A person ceases to be ordinary when their 
                      talent is activated in less than 24 hours, their time is valued, and they stop surviving 
                      to start exploring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Points */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                  <p className={`text-sm ${theme.textSecondary}`}>
                    Architecting a new system that connects human talent to purpose-driven missions in under 24 hours.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                  <p className={`text-sm ${theme.textSecondary}`}>
                    Challenging obsolete employment systems to unlock dormant human potential globally.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                  <p className={`text-sm ${theme.textSecondary}`}>
                    Transforming personal resilience into infrastructure that restores autonomy, dignity, and purpose.
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className={`p-4 md:p-6 rounded-xl border-l-4 ${theme.accentBorder} ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`italic ${theme.text}`}>
                  "The future doesn't need more titles. It needs activated people."
                </p>
                <div className={`mt-3 text-sm ${theme.textTertiary}`}>
                  — Andrea Covarrubias
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Mission Command
            </h2>
            <p className={`max-w-2xl mx-auto ${theme.textSecondary}`}>
              The explorers activating the "Nobody is Ordinary" thesis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Founder Card */}
            <div className={`rounded-xl p-4 md:p-6 ${theme.card} transition-all`}>
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs uppercase tracking-wider ${theme.textTertiary}`}>
                    EXPLORER ID
                  </span>
                  <span className={`text-xs ${theme.textTertiary}`}>#000</span>
                </div>
                <div className={`h-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
              </div>

              <div className="flex flex-col items-center mb-4 md:mb-6">
                <div className="relative mb-3 md:mb-4">
                  <img
                    src={Founderimage}
                    alt="Andrea Covarrubias"
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-transparent"
                  />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1">ANDREA COVARRUBIAS</h3>
                <div className={`text-xs md:text-sm mb-2 ${theme.textSecondary}`}>FOUNDER ARCHITECT</div>
                <div className={`text-xs px-2 py-1 rounded-full ${theme.accentBg} ${theme.textTertiary}`}>
                  VISION COMMAND
                </div>
              </div>

              <div className="text-center mb-4 md:mb-6">
                <div className={`text-xs mb-1 ${theme.textTertiary}`}>ACTIVE MISSION</div>
                <p className={`text-sm italic ${theme.textSecondary}`}>
                  "Architecting the system that proves nobody is ordinary"
                </p>
              </div>

              <div className="flex justify-center space-x-4 border-t pt-4 border-gray-200 dark:border-white/10">
                <div className="text-center">
                  <FaLightbulb className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>VISION</span>
                </div>
                <div className="text-center">
                  <FaUsers className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>LEADERSHIP</span>
                </div>
                <div className="text-center">
                  <FaGlobe className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>IMPACT</span>
                </div>
              </div>
            </div>

            {/* Frontend Developer Card */}
            <div className={`rounded-xl p-4 md:p-6 ${theme.card} transition-all`}>
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs uppercase tracking-wider ${theme.textTertiary}`}>
                    EXPLORER ID
                  </span>
                  <span className={`text-xs ${theme.textTertiary}`}>#001</span>
                </div>
                <div className={`h-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
              </div>

              <div className="flex flex-col items-center mb-4 md:mb-6">
                <div className="relative mb-3 md:mb-4">
                  <img
                    src={FrontendDeveloper}
                    alt="Safia Liaqat"
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-transparent"
                  />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1">SAFIA LIAQAT</h3>
                <div className={`text-xs md:text-sm mb-2 ${theme.textSecondary}`}>FRONTEND ARCHITECT</div>
                <div className={`text-xs px-2 py-1 rounded-full ${theme.accentBg} ${theme.textTertiary}`}>
                  UI/UX SYSTEMS
                </div>
              </div>

              <div className="text-center mb-4 md:mb-6">
                <div className={`text-xs mb-1 ${theme.textTertiary}`}>ACTIVE MISSION</div>
                <p className={`text-sm italic ${theme.textSecondary}`}>
                  "Translating vision into interfaces that empower exploration"
                </p>
              </div>

              <div className="flex justify-center space-x-4 border-t pt-4 border-gray-200 dark:border-white/10">
                <div className="text-center">
                  <FaPalette className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>DESIGN</span>
                </div>
                <div className="text-center">
                  <FaMagic className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>EXPERIENCE</span>
                </div>
                <div className="text-center">
                  <FaCode className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>CODE</span>
                </div>
              </div>
            </div>

            {/* AI Engineer Card */}
            <div className={`rounded-xl p-4 md:p-6 ${theme.card} transition-all`}>
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs uppercase tracking-wider ${theme.textTertiary}`}>
                    EXPLORER ID
                  </span>
                  <span className={`text-xs ${theme.textTertiary}`}>#002</span>
                </div>
                <div className={`h-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
              </div>

              <div className="flex flex-col items-center mb-4 md:mb-6">
                <div className="relative mb-3 md:mb-4">
                  <img
                    src={AiEngineer}
                    alt="Vikram"
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-transparent"
                  />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1">VIKRAM</h3>
                <div className={`text-xs md:text-sm mb-2 ${theme.textSecondary}`}>AI SYSTEMS ENGINEER</div>
                <div className={`text-xs px-2 py-1 rounded-full ${theme.accentBg} ${theme.textTertiary}`}>
                  INTELLIGENCE LAYER
                </div>
              </div>

              <div className="text-center mb-4 md:mb-6">
                <div className={`text-xs mb-1 ${theme.textTertiary}`}>ACTIVE MISSION</div>
                <p className={`text-sm italic ${theme.textSecondary}`}>
                  "Building the intelligence that connects talent to purpose"
                </p>
              </div>

              <div className="flex justify-center space-x-4 border-t pt-4 border-gray-200 dark:border-white/10">
                <div className="text-center">
                  <FaDatabase className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>DATA</span>
                </div>
                <div className="text-center">
                  <FaShieldAlt className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>SECURITY</span>
                </div>
                <div className="text-center">
                  <FaCogs className={`text-base mx-auto mb-1 ${theme.text}`} />
                  <span className={`text-xs ${theme.textTertiary}`}>SYSTEMS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scan { 
          from { transform: translateY(-100%); } 
          to { transform: translateY(500%); } 
        }
        .animate-scan { 
          animation: scan 6s linear infinite; 
        }
      `}</style>
    </div>
  );
}