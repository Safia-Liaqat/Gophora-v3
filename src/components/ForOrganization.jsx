// src/pages/ForOrganizations.jsx
import React, { useState } from "react";
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
  ArrowUpRightIcon
} from "@heroicons/react/24/outline";

export default function ForOrganizations() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A2A] via-[#0A0F2C] to-[#1A1F3C] text-white">
      {/* Hero Section - Compact */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Subtle Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E1B4B]/50 border border-[#2D1B69] rounded-full">
              <BuildingLibraryIcon className="h-4 w-4 text-[#A78BFA]" />
              <span className="text-sm text-[#A78BFA]">For Organizations</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Beyond Hiring
              <span className="block text-[#A78BFA] mt-2">Activating a Mission-Driven Workforce</span>
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Transform how you access talent. Move from slow hiring to instant mission activation with GOPHORA's infrastructure.
            </p>
          </div>

          {/* Stats - Horizontal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { value: "24h", label: "Activation", icon: <ClockIcon className="h-4 w-4" /> },
              { value: "0%", label: "Hiring Delay", icon: <XMarkIcon className="h-4 w-4" /> },
              { value: "10K+", label: "Talent Pool", icon: <UserGroupIcon className="h-4 w-4" /> },
              { value: "500+", label: "Orgs Trust Us", icon: <ShieldCheckIcon className="h-4 w-4" /> }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 bg-[#1E1B4B]/30 border border-[#2D1B69] rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-[#A78BFA]">{stat.icon}</div>
                  <div className="text-xl font-semibold">{stat.value}</div>
                </div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Primary CTA - Compact */}
          <div className="text-center">
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Start Activating Talent
              <ArrowRightIcon className="h-4 w-4" />
            </button>
            <p className="text-sm text-gray-500 mt-3">Register in 2 minutes • First mission free</p>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Like Xtract's "Services" */}
      <section className="py-12 px-6 bg-[#0A0F2C]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Why Traditional Hiring is Failing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Legacy systems waste human potential and create strategic liabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Inactive Talent Pools",
                description: "Capable individuals wait months while their skills remain locked away by slow recruitment cycles.",
                icon: <UserGroupIcon className="h-6 w-6" />
              },
              {
                title: "Exclusionary Systems",
                description: "Over-reliance on static CVs overlooks exceptional talent that doesn't fit conventional molds.",
                icon: <XMarkIcon className="h-6 w-6" />
              },
              {
                title: "Economic Inefficiency",
                description: "Protracted hiring procedures drain resources before any work begins.",
                icon: <CurrencyDollarIcon className="h-6 w-6" />
              }
            ].map((point, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-6 border rounded-xl transition-all duration-300 ${
                  hoveredCard === idx 
                    ? 'border-[#A78BFA] bg-[#1E1B4B]/30' 
                    : 'border-[#2D1B69] bg-[#1E1B4B]/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#8B5CF6]/10 rounded-lg">
                    <div className="text-[#A78BFA]">{point.icon}</div>
                  </div>
                  <h3 className="font-semibold">{point.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paradigm Shift - Clean Comparison */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">The GOPHORA Paradigm Shift</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              From static jobs to dynamic, outcome-oriented missions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Model */}
            <div className="p-6 border border-red-900/30 rounded-xl bg-gradient-to-br from-red-900/10 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <XMarkIcon className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold">The Obsolete Model</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: "Hiring", desc: "Slow, bureaucratic processes" },
                  { label: "Evaluating CVs", desc: "Static, exclusionary criteria" },
                  { label: "Offering Jobs", desc: "Fixed roles, limited flexibility" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-400/20 flex items-center justify-center mt-0.5">
                      <XMarkIcon className="h-2.5 w-2.5 text-red-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Model */}
            <div className="p-6 border border-emerald-900/30 rounded-xl bg-gradient-to-br from-emerald-900/10 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold">GOPHORA Activation Model</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: "Activating", desc: "Instant talent deployment" },
                  { label: "Reading Signals", desc: "AI-powered capability matching" },
                  { label: "Assigning Missions", desc: "Purpose-driven, flexible execution" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center mt-0.5">
                      <CheckCircleIcon className="h-2.5 w-2.5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Like Xtract's "Process" */}
      <section className="py-12 px-6 bg-[#0A0F2C]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">How It Works: Instant Talent Activation</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              A streamlined process that eliminates friction and connects need with capability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Define Mission",
                desc: "Create clear, executable mission with specific objective",
                icon: <SparklesIcon className="h-5 w-5" />
              },
              {
                step: "2",
                title: "AI Matching",
                desc: "Visnity AI scans behavior & signals for perfect match",
                icon: <PuzzlePieceIcon className="h-5 w-5" />
              },
              {
                step: "3",
                title: "24h Activation",
                desc: "Talent connected to mission in under 24 hours",
                icon: <BoltIcon className="h-5 w-5" />
              },
              {
                step: "4",
                title: "Execution",
                desc: "Explorer executes mission with autonomy and focus",
                icon: <RocketLaunchIcon className="h-5 w-5" />
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center p-6 border border-[#2D1B69] rounded-xl bg-[#1E1B4B]/20">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] mb-4">
                  <span className="text-white text-sm font-semibold">{step.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economy Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">The Mission-Based Economy</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              A transparent framework for value, payment, and reputation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Mission Payment",
                desc: "Pay in USDT for successful execution",
                icon: <CurrencyDollarIcon className="h-5 w-5" />,
                tag: "Direct Results"
              },
              {
                title: "Platform Commission",
                desc: "10% transparent fee on completion",
                icon: <ChartBarIcon className="h-5 w-5" />,
                tag: "Sustainable"
              },
              {
                title: "PHORA Rewards",
                desc: "Explorers earn reputation tokens",
                icon: <ShieldCheckIcon className="h-5 w-5" />,
                tag: "Verifiable Impact"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 border border-[#2D1B69] rounded-xl bg-[#1E1B4B]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#8B5CF6]/10 rounded-lg">
                    <div className="text-[#A78BFA]">{item.icon}</div>
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">{item.desc}</p>
                <div className="inline-block px-3 py-1 bg-[#2D1B69] text-xs rounded-full text-gray-300">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Advantages - Like Xtract's "Benefits" */}
      <section className="py-12 px-6 bg-[#0A0F2C]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Your Strategic Advantage</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Fundamental benefits impossible through traditional models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "24h Speed",
                desc: "Eliminate recruitment delays, activate talent instantly",
                icon: <BoltIcon className="h-5 w-5" />
              },
              {
                title: "Radical Agility",
                desc: "Scale execution capacity up or down seamlessly",
                icon: <ArrowPathIcon className="h-5 w-5" />
              },
              {
                title: "Proven Talent",
                desc: "Leverage PHORA reputation system for verified talent",
                icon: <ShieldCheckIcon className="h-5 w-5" />
              },
              {
                title: "Future Branding",
                desc: "Align with the defining shift in the future of work",
                icon: <RocketLaunchIcon className="h-5 w-5" />
              }
            ].map((advantage, idx) => (
              <div key={idx} className="p-6 border border-[#2D1B69] rounded-xl bg-[#1E1B4B]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20 rounded-lg">
                    <div className="text-[#A78BFA]">{advantage.icon}</div>
                  </div>
                  <h3 className="font-semibold text-sm">{advantage.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Compact */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 border border-[#2D1B69] rounded-2xl bg-gradient-to-br from-[#1E1B4B]/30 to-transparent">
            <RocketLaunchIcon className="h-12 w-12 text-[#A78BFA] mx-auto mb-6" />
            
            <h2 className="text-2xl font-bold mb-4">
              Don't just look for talent.
              <span className="text-[#A78BFA] block mt-1">Activate a mission.</span>
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm">
              We're building the infrastructure for a more functional humanity. Join the crew.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Post Your First Mission
              </button>
              
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 border border-[#A78BFA] text-[#A78BFA] rounded-lg hover:bg-[#A78BFA]/10 transition-colors"
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}