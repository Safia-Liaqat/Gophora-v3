import React from "react";
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
import FrontendDeveloper from "../../assets/FrontendDeveloper.png";
import AiEngineer from "../../assets/AI Engineer.jpg";  // Make sure this matches your actual file name
import Founderimage from '../../assets/Founder-image.jpeg';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* --- Header --- */}
      <section className="text-center py-20 bg-gradient-to-b from-gray-900/80 to-gray-900">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
          About Gophora
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Connecting opportunity seekers with providers — empowering humanity
          through technology, collaboration, and contribution.
        </p>
      </section>

      {/* --- Innovation / Ambition / Mission / Impact --- */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-8 text-center">
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all hover:scale-[1.02]">
          <FaLightbulb className="text-purple-400 text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-purple-300">
            Innovation → Contribution
          </h3>
          <p className="text-gray-300">
            Transforming innovation into meaningful contributions — enabling
            people to create value that benefits others and the planet.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all hover:scale-[1.02]">
          <FaRocket className="text-pink-400 text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-pink-300">
            Ambition
          </h3>
          <p className="text-gray-300">
            Extending human perception — allowing people to sense and
            understand their environment through AI-powered systems.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all hover:scale-[1.02]">
          <FaUsers className="text-blue-400 text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-blue-300">
            Mission
          </h3>
          <p className="text-gray-300">
            To rescue and highlight human talent, connecting people with
            meaningful contributions that align with their purpose.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all hover:scale-[1.02]">
          <FaGlobe className="text-emerald-400 text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-emerald-300">
            Impact
          </h3>
          <p className="text-gray-300">
            Enabling people to reach independence and instantly access work,
            study, experience, or hobbies that enrich their lives.
          </p>
        </div>
      </section>

      {/* --- Founder Section --- */}
      <section className="py-20 border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Founder Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              The Visionary: Andrea Covarrubias
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Founder & Architect of Gophora • Activating human potential through mission-driven contribution
            </p>
          </div>

          <div className="grid md:grid-cols-2 items-center gap-12">
            {/* Founder Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={Founderimage}
                  alt="Founder Andrea Covarrubias"
                  className="rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] w-full max-w-md object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-sm font-medium">"Nadie es Ordinario"</div>
                  <div className="text-xs">(Nobody is Ordinary)</div>
                </div>
              </div>
            </div>

            {/* Founder Story - Clean Layout */}
            <div>
              {/* Core Thesis Box */}
              <div className="mb-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/20 rounded-xl border border-purple-500/30">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg">
                    <FaLightbulb className="text-purple-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-purple-300">The Core Thesis</h3>
                    <p className="text-gray-300 text-sm">
                      "Nobody is Ordinary" when given a mission. A person ceases to be ordinary when their 
                      talent is activated in less than 24 hours, their time is valued, and they stop surviving 
                      to start exploring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Points */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mt-1 flex-shrink-0">
                    <FaChevronRight className="text-white text-xs" />
                  </div>
                  <p className="text-gray-300">
                    Architecting a new system that connects human talent to purpose-driven missions in under 24 hours.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mt-1 flex-shrink-0">
                    <FaChevronRight className="text-white text-xs" />
                  </div>
                  <p className="text-gray-300">
                    Challenging obsolete employment systems to unlock dormant human potential globally.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mt-1 flex-shrink-0">
                    <FaChevronRight className="text-white text-xs" />
                  </div>
                  <p className="text-gray-300">
                    Transforming personal resilience into infrastructure that restores autonomy, dignity, and purpose.
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border-l-4 border-purple-500">
                <div className="text-6xl absolute -top-4 -left-2 text-purple-500/20">"</div>
                <p className="text-gray-300 italic text-center relative z-10">
                  "The future doesn't need more titles. It needs activated people."
                </p>
                <div className="text-right mt-4 text-sm text-gray-400">
                  — Andrea Covarrubias
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Team Section - Mission Cards --- */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Mission Command
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            The explorers activating the "Nobody is Ordinary" thesis
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Founder - Mission Card - #000 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl p-6">
                {/* Card Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-400 font-mono tracking-wider">EXPLORER ID</span>
                    <span className="text-xs text-gray-500 font-mono">#000</span>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>

                {/* Profile */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur"></div>
                    <img
                      src={Founderimage}
                      alt="Andrea Covarrubias"
                      className="relative w-24 h-24 rounded-full object-cover border-4 border-gray-900"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">ANDREA COVARRUBIAS</h3>
                  <div className="text-purple-300 text-sm font-mono mb-3">FOUNDER ARCHITECT</div>
                  <div className="inline-block bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                    VISION COMMAND
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="text-center mb-6">
                  <div className="text-xs text-gray-400 font-mono mb-2">ACTIVE MISSION</div>
                  <p className="text-gray-300 text-sm italic">
                    "Architecting the system that proves nobody is ordinary"
                  </p>
                </div>

                {/* Skills */}
                <div className="flex justify-center space-x-6 border-t border-gray-700/50 pt-4">
                  <div className="text-center">
                    <FaLightbulb className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">VISION</span>
                  </div>
                  <div className="text-center">
                    <FaUsers className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">LEADERSHIP</span>
                  </div>
                  <div className="text-center">
                    <FaGlobe className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">IMPACT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Frontend Developer - Mission Card - #001 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl p-6">
                {/* Card Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-400 font-mono tracking-wider">EXPLORER ID</span>
                    <span className="text-xs text-gray-500 font-mono">#001</span>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>

                {/* Profile */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur"></div>
                    <img
                      src={FrontendDeveloper}
                      alt="Safia Liaqat"
                      className="relative w-24 h-24 rounded-full object-cover border-4 border-gray-900"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">SAFIA LIAQAT</h3>
                  <div className="text-purple-300 text-sm font-mono mb-3">FRONTEND ARCHITECT</div>
                  <div className="inline-block bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                    UI/UX SYSTEMS
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="text-center mb-6">
                  <div className="text-xs text-gray-400 font-mono mb-2">ACTIVE MISSION</div>
                  <p className="text-gray-300 text-sm italic">
                    "Translating vision into interfaces that empower exploration"
                  </p>
                </div>

                {/* Skills */}
                <div className="flex justify-center space-x-6 border-t border-gray-700/50 pt-4">
                  <div className="text-center">
                    <FaPalette className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">DESIGN</span>
                  </div>
                  <div className="text-center">
                    <FaMagic className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">EXPERIENCE</span>
                  </div>
                  <div className="text-center">
                    <FaCode className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">CODE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Engineer - Mission Card - #002 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl p-6">
                {/* Card Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-400 font-mono tracking-wider">EXPLORER ID</span>
                    <span className="text-xs text-gray-500 font-mono">#002</span>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>

                {/* Profile */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur"></div>
                    <img
                      src={AiEngineer}
                      alt="Vikram"
                      className="relative w-24 h-24 rounded-full object-cover border-4 border-gray-900"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">VIKRAM</h3>
                  <div className="text-purple-300 text-sm font-mono mb-3">AI SYSTEMS ENGINEER</div>
                  <div className="inline-block bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                    INTELLIGENCE LAYER
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="text-center mb-6">
                  <div className="text-xs text-gray-400 font-mono mb-2">ACTIVE MISSION</div>
                  <p className="text-gray-300 text-sm italic">
                    "Building the intelligence that connects talent to purpose"
                  </p>
                </div>

                {/* Skills */}
                <div className="flex justify-center space-x-6 border-t border-gray-700/50 pt-4">
                  <div className="text-center">
                    <FaDatabase className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">DATA</span>
                  </div>
                  <div className="text-center">
                    <FaShieldAlt className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">SECURITY</span>
                  </div>
                  <div className="text-center">
                    <FaCogs className="text-purple-400 text-lg mx-auto mb-1" />
                    <span className="text-xs text-gray-400">SYSTEMS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}