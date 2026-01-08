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
  AcademicCapIcon,
  BeakerIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

export default function ForOrganizations() {
  const navigate = useNavigate();

  /* ========= SCROLL ANIMATION ========= */
  useEffect(() => {
    const items = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(i => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  /* ========= THEME ========= */
  const theme = {
    bg: "bg-white",
    text: "text-black",
    textSecondary: "text-[#333333]",
    card:
      "bg-[#333333] text-white border border-[#FF4F00]/40 rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]",
    btn:
      "bg-[#FF4F00] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_18px_rgba(255,79,0,0.7)] active:scale-95"
  };

  return (
    <div className={`min-h-screen w-full ${theme.bg} ${theme.text} font-sans`}>
      {/* Background */}
      <div className="fixed inset-0 bg-white -z-10" />

      <div className="w-full px-6 py-16 md:py-24">
        {/* HERO */}
        <section
          data-animate
          className="max-w-5xl mx-auto mb-32 text-center opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF4F00]/40 mb-10">
            <BuildingLibraryIcon className="h-4 w-4 text-[#FF4F00]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black">
              Enterprise Solutions
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
            Talent Activation. <br />
            <span className="italic font-light opacity-80">
              Beyond Hiring.
            </span>
          </h1>

          <p className="text-lg text-[#333333] max-w-2xl mx-auto mb-14">
            Transform passive talent pools into active mission executors with
            GOPHORA's next-generation infrastructure.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button
              onClick={() => navigate("/register")}
              className={`px-9 py-4 flex items-center gap-2 ${theme.btn}`}
            >
              Start Free Trial <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/demo")}
              className="px-9 py-4 rounded-xl font-bold border border-[#FF4F00] text-black hover:bg-black/5 transition"
            >
              Request Demo
            </button>
          </div>
        </section>

        {/* STATS */}
        <section className="max-w-4xl mx-auto mb-32 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "24h", label: "Activation Time", icon: BoltIcon },
            { value: "10K+", label: "Verified Talent", icon: UserGroupIcon },
            { value: "500+", label: "Organizations", icon: ShieldCheckIcon },
            { value: "$0", label: "Upfront Costs", icon: CurrencyDollarIcon }
          ].map((s, i) => (
            <div
              key={i}
              data-animate
              className={`p-6 ${theme.card} opacity-0 translate-y-6`}
            >
              <s.icon className="h-6 w-6 mb-4 text-[#FF4F00]" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* PROBLEM & SOLUTION */}
        <section className="max-w-6xl mx-auto mb-32 grid lg:grid-cols-2 gap-10">
          {[{
            title: "The Problem",
            icon: XMarkIcon,
            color: "text-[#FF4F00]",
            items: [
              { t: "Static Talent Pools", d: "Skilled individuals remain inactive.", i: ClockIcon },
              { t: "CV-Based Biases", d: "Exceptional talent overlooked.", i: AcademicCapIcon },
              { t: "Economic Drain", d: "Hiring consumes resources.", i: CurrencyDollarIcon }
            ]
          },
          {
            title: "The Solution",
            icon: LightBulbIcon,
            color: "text-[#FF4F00]",
            items: [
              { t: "Dynamic Activation", d: "Real-time capability deployment.", i: BoltIcon },
              { t: "AI Matching", d: "Pattern-based mission fit.", i: PuzzlePieceIcon },
              { t: "Mission Economy", d: "Pay for outcomes.", i: ArrowTrendingUpIcon }
            ]
          }].map((block, i) => (
            <div
              key={i}
              data-animate
              className={`p-10 ${theme.card} opacity-0 translate-y-6`}
            >
              <div className="flex items-center gap-3 mb-8">
                <block.icon className={`h-6 w-6 ${block.color}`} />
                <h2 className="text-2xl font-bold">{block.title}</h2>
              </div>

              <div className="space-y-8">
                {block.items.map((it, j) => (
                  <div key={j} className="flex gap-4">
                    <it.i className="h-6 w-6 text-[#FF4F00]/70" />
                    <div>
                      <h3 className="font-bold mb-1">{it.t}</h3>
                      <p className="text-sm text-gray-300">{it.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* FINAL CTA */}
        <section
          data-animate
          className="max-w-4xl mx-auto opacity-0 translate-y-6"
        >
          <div className="p-14 rounded-[2.5rem] bg-[#333333] border border-[#FF4F00]/40 text-center hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to <span className="italic font-light">Activate</span>?
            </h2>
            <p className="text-gray-300 max-w-md mx-auto mb-10">
              Join the infrastructure for human utility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className={`px-10 py-4 flex items-center gap-3 ${theme.btn}`}
              >
                Launch Your First Mission
                <ArrowUpRightIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-10 py-4 rounded-xl font-bold border border-[#FF4F00] text-white hover:bg-white/5 transition"
              >
                Book Demo
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Animations */}
      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
